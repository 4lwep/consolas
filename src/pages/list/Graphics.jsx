import { useEffect, useState } from "react";
import { getGraficas } from "../../services/graphics";
import { useNavigate } from "react-router-dom";
import "../../styles/list.css";
import GraphicsInfoCard from "./infoCards/GraphicsInfoCard";
import ListToolbar from "../../components/listToolbar/ListToolbar";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function Graphics() {
    const [graficas, setGraficas] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filterEmpresa, setFilterEmpresa] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGraficas = async () => {
            const data = await getGraficas();
            if (data) {
                setGraficas(data);
            }
        };
        fetchGraficas();
    }, []);

    const empresas = [...new Set(graficas.map(g => g.empresa?.empresaNombre).filter(Boolean))].sort();

    const filtered = graficas
        .filter(g => !filterEmpresa || g.empresa?.empresaNombre === filterEmpresa)
        .filter(g => (g.nombre || "").toLowerCase().includes(search.toLowerCase()));

    const sorted = [...filtered].sort((a, b) => {
        const comparison = (a.nombre || "").localeCompare(b.nombre || "");
        return sortOrder === "asc" ? comparison : -comparison;
    });

    return (
        <div className="list-container">
            <h1>TARJETAS GRAFICAS</h1>
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
                {sorted.map((graf) => (
                    <GraphicsInfoCard key={graf.id} grafica={graf} onClick={() => navigate(`/graphics/${graf.id}`)} />
                ))}
            </div>
        </div>
    )
}