import { useEffect, useState } from "react";
import { getEmpresas } from "../../services/enterprises";
import { useNavigate } from "react-router-dom";
import "../../styles/list.css";
import EnterpriseInfoCard from "./infoCards/EnterpriseInfoCard";
import ListToolbar from "../../components/listToolbar/ListToolbar";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function Enterprises() {
    const [empresas, setEmpresas] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("name");
    const [filterPais, setFilterPais] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmpresas = async () => {
            const data = await getEmpresas();
            if (data) {
                setEmpresas(data);
            }
        };
        fetchEmpresas();
    }, []);

    const paises = [...new Set(empresas.map(e => e.empresaPaisOrigen).filter(Boolean))].sort();

    const filtered = empresas
        .filter(e => !filterPais || e.empresaPaisOrigen === filterPais)
        .filter(e => (e.empresaNombre || "").toLowerCase().includes(search.toLowerCase()));

    const sorted = [...filtered].sort((a, b) => {
        let comparison = 0;
        if (sortBy === "name") {
            comparison = (a.empresaNombre || "").localeCompare(b.empresaNombre || "");
        } else {
            comparison = (a.empresaFechaCreacion || "").localeCompare(b.empresaFechaCreacion || "");
        }
        return sortOrder === "asc" ? comparison : -comparison;
    });

    return (
        <div className="list-container">
            <h1>EMPRESAS</h1>
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
                    <InputLabel sx={{ color: 'rgba(255,255,255,0.6)' }}>País</InputLabel>
                    <Select
                        value={filterPais}
                        label="País"
                        onChange={(e) => setFilterPais(e.target.value)}
                        sx={{
                            color: '#faebd7',
                            '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(250,235,215,0.2)' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(250,235,215,0.4)' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#faebd7' },
                            '.MuiSvgIcon-root': { color: 'rgba(255,255,255,0.6)' },
                        }}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        {paises.map(pais => (
                            <MenuItem key={pais} value={pais}>{pais}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </ListToolbar>
            <div className="list">
                {sorted.map((empresa) => (
                    <EnterpriseInfoCard key={empresa.id} empresa={empresa} onClick={() => navigate(`/enterprises/${empresa.id}`)} />
                ))}
            </div>
        </div>
    );
}