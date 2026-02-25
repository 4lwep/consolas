import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmpresa } from "../../services/enterprises";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../../styles/list.css";

export default function Enterprise() {
    const { id } = useParams();
    const [empresa, setEmpresa] = useState(null);

    useEffect(() => {
        const fetchEmpresa = async () => {
            const data = await getEmpresa(id);
            if (data) {
                setEmpresa(data);
            }
        };
        fetchEmpresa();
    }, [id]);

    if (!empresa) return <Typography sx={{ p: 4 }}>Cargando...</Typography>;

    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: "auto" }}>
            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' }, mb: 6, alignItems: 'center' }}>
                {empresa.empresaLogo ? (
                    <Box
                        component="img"
                        src={empresa.empresaLogo}
                        alt={empresa.empresaNombre}
                        sx={{ width: { xs: '100%', md: 300 }, borderRadius: 2, boxShadow: 3 }}
                    />
                ) : (
                    <Box sx={{ width: { xs: '100%', md: 300 }, height: 200, bgcolor: 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                        <Typography variant="h6" color="text.secondary">Sin Logo</Typography>
                    </Box>
                )}
                <Box>
                    <Typography variant="h2" gutterBottom>{empresa.empresaNombre}</Typography>
                    <Typography variant="h5" gutterBottom>
                        Sede: {empresa.empresaPaisOrigen}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Fundada: {empresa.empresaFechaCreacion}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
