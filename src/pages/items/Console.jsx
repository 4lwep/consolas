import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConsola } from "../../services/consoles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../../pages/list/list.css";
import ProcessorInfoCard from "../list/infoCards/ProcessorInfoCard";
import EnterpriseInfoCard from "../list/infoCards/EnterpriseInfoCard";
import GraphicsInfoCard from "../list/infoCards/GraphicsInfoCard";
import { useNavigate } from "react-router-dom";

export default function Console() {
    const { id } = useParams();
    const [consola, setConsola] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConsola = async () => {
            const data = await getConsola(id);
            if (data) {
                setConsola(data);
            }
        };
        fetchConsola();
    }, [id]);

    if (!consola) return <Typography sx={{ p: 4 }}>Cargando...</Typography>;

    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: "auto" }}>
            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' }, mb: 6 }}>
                {consola.imagen && (
                    <Box
                        component="img"
                        src={consola.imagen}
                        alt={consola.nombre}
                        sx={{ width: { xs: '100%', md: 400 }, borderRadius: 2, boxShadow: 3 }}
                    />
                )}
                <Box>
                    <Typography variant="h2" gutterBottom>{consola.nombre}</Typography>
                    <Typography variant="h5" gutterBottom>
                        Lanzamiento: {consola.fechaSalida}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem' }}>
                        {consola.descripcion}
                    </Typography>
                </Box>
            </Box>

            <Typography variant="h4" sx={{ mb: 3 }}>Especificaciones Técnicas</Typography>

            <Box className="list" sx={{ padding: 0, justifyContent: "flex-start" }}>
                {consola.empresa && (
                    <EnterpriseInfoCard empresa={consola.empresa} onClick={() => navigate(`/enterprises/${consola.empresa.id}`)} />
                )}

                {consola.procesador && (
                    <ProcessorInfoCard procesador={consola.procesador} onClick={() => navigate(`/processors/${consola.procesador.id}`)} />
                )}

                {consola.grafica && (
                    <GraphicsInfoCard grafica={consola.grafica} onClick={() => navigate(`/graphics/${consola.grafica.id}`)} />
                )}
            </Box>
        </Box>
    );
}
