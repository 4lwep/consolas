import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGrafica } from "../../services/graphics";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../../pages/list/list.css";
import EnterpriseInfoCard from "../list/infoCards/EnterpriseInfoCard";
import { useNavigate } from "react-router-dom";

export default function GraphicsDetail() {
    const { id } = useParams();
    const [grafica, setGrafica] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGrafica = async () => {
            const data = await getGrafica(id);
            if (data) {
                setGrafica(data);
            }
        };
        fetchGrafica();
    }, [id]);

    if (!grafica) return <Typography sx={{ p: 4 }}>Cargando...</Typography>;

    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: "auto" }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h2" gutterBottom>{grafica.nombre}</Typography>
                <Typography variant="h5">
                    Frecuencia: {grafica.frecuencia} MHz
                </Typography>
                <Typography variant="h6">
                    API: {grafica.api}
                </Typography>
            </Box>

            <Typography variant="h4" sx={{ mb: 3 }}>Fabricante</Typography>
            <Box className="list" sx={{ padding: 0, justifyContent: "flex-start" }}>
                {grafica.empresa && (
                    <EnterpriseInfoCard empresa={grafica.empresa} onClick={() => navigate(`/enterprises/${grafica.empresa.id}`)} />
                )}
            </Box>
        </Box>
    );
}
