import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getConsolas } from "../../services/consoles";
import "../../styles/list.css";
import ConsoleInfoCard from "./infoCards/ConsoleInfoCard";
import ListToolbar from "../../components/listToolbar/ListToolbar";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function Consoles() {
    const [consolas, setConsolas] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("name");
    const [filterEmpresa, setFilterEmpresa] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConsolas = async () => {
            const data = await getConsolas();
            if (data) {
                setConsolas(data);
            }
        };
        fetchConsolas();
    }, []);

    // Extraer empresas únicas para el select
    const empresas = [...new Set(consolas.map(c => c.empresa?.empresaNombre).filter(Boolean))].sort();

    // Filtrar y ordenar
    const filtered = consolas
        .filter(c => !filterEmpresa || c.empresa?.empresaNombre === filterEmpresa)
        .filter(c => (c.nombre || "").toLowerCase().includes(search.toLowerCase()));

    const sorted = [...filtered].sort((a, b) => {
        let comparison = 0;
        if (sortBy === "name") {
            comparison = (a.nombre || "").localeCompare(b.nombre || "");
        } else {
            comparison = (a.fechaSalida || "").localeCompare(b.fechaSalida || "");
        }
        return sortOrder === "asc" ? comparison : -comparison;
    });

    return (
        <div className="list-container">
            <h1>CONSOLAS</h1>
            <ListToolbar
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
                searchValue={search}
                onSearchChange={setSearch}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                showDateSort={true}
            >
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
                {sorted.map((consola) => (
                    <ConsoleInfoCard key={consola.id} consola={consola} onClick={() => navigate(`/consoles/${consola.id}`)} />
                ))}
            </div>
        </div>
    )
}