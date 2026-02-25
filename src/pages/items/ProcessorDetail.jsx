import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProcesador } from "../../services/processors";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../../styles/list.css";
import EnterpriseInfoCard from "../list/infoCards/EnterpriseInfoCard";
import { useNavigate } from "react-router-dom";

export default function ProcessorDetail() {
    const { id } = useParams();
    const [procesador, setProcesador] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProcesador = async () => {
            const data = await getProcesador(id);
            if (data) {
                setProcesador(data);
            }
        };
        fetchProcesador();
    }, [id]);

    if (!procesador) return <Typography sx={{ p: 4 }}>Cargando...</Typography>;

    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: "auto" }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h2" gutterBottom>{procesador.nombre}</Typography>
                <Typography variant="h5">
                    Familia: {procesador.familia}
                </Typography>
                <Typography variant="h6">
                    Núcleos: {procesador.nucleos}
                </Typography>
            </Box>

            <Typography variant="h4" sx={{ mb: 3 }}>Fabricante</Typography>
            <Box className="list" sx={{ padding: 0, justifyContent: "flex-start" }}>
                {procesador.empresa && (
                    <EnterpriseInfoCard empresa={procesador.empresa} onClick={() => navigate(`/enterprises/${procesador.empresa.id}`)} />
                )}
            </Box>
        </Box>
    );
}
