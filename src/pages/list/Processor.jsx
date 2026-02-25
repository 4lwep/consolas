import { useEffect, useState } from "react";
import { getProcesadores } from "../../services/processors";
import { useNavigate } from "react-router-dom";
import "../../styles/list.css";
import ProcessorInfoCard from "./infoCards/ProcessorInfoCard";
import ListToolbar from "../../components/listToolbar/ListToolbar";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function Processor() {
    const [procesadores, setProcesadores] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filterEmpresa, setFilterEmpresa] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProcesadores = async () => {
            const data = await getProcesadores();
            if (data) {
                setProcesadores(data);
            }
        };
        fetchProcesadores();
    }, []);

    const empresas = [...new Set(procesadores.map(p => p.empresa?.empresaNombre).filter(Boolean))].sort();

    const filtered = procesadores
        .filter(p => !filterEmpresa || p.empresa?.empresaNombre === filterEmpresa)
        .filter(p => (p.nombre || "").toLowerCase().includes(search.toLowerCase()));

    const sorted = [...filtered].sort((a, b) => {
        const comparison = (a.nombre || "").localeCompare(b.nombre || "");
        return sortOrder === "asc" ? comparison : -comparison;
    });

    return (
        <div className="list-container">
            <h1>PROCESADORES</h1>
            <ListToolbar sortOrder={sortOrder} onSortChange={setSortOrder} searchValue={search} onSearchChange={setSearch}>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel sx={{ color: 'rgba(255,255,255,0.6)' }}>Empresa</InputLabel>
                    <Select
                        value={filterEmpresa}
                        label="Empresa"
                        onChange={(e) => setFilterEmpresa(e.target.value)}
                        sx={{
                            color: '#faebd7',
                            '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(250,235,215,0.2)' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(250,235,215,0.4)' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#faebd7' },
                            '.MuiSvgIcon-root': { color: 'rgba(255,255,255,0.6)' },
                        }}
                    >
                        <MenuItem value="">Todas</MenuItem>
                        {empresas.map(emp => (
                            <MenuItem key={emp} value={emp}>{emp}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </ListToolbar>
            <div className="list">
                {sorted.map((proc) => (
                    <ProcessorInfoCard key={proc.id} procesador={proc} onClick={() => navigate(`/processors/${proc.id}`)} />
                ))}
            </div>
        </div>
    )
}