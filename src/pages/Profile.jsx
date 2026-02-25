import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import ConsoleInfoCard from "./list/infoCards/ConsoleInfoCard";
import ProcessorInfoCard from "./list/infoCards/ProcessorInfoCard";
import GraphicsInfoCard from "./list/infoCards/GraphicsInfoCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import EnterpriseInfoCard from "./list/infoCards/EnterpriseInfoCard";

export default function Profile() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return (
            <Container sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h4">
                    Por favor, inicia sesión para ver tu perfil.
                </Typography>
            </Container>
        );
    }

    const FavoriteSection = ({ title, items, InfoCardComponent, navigatePath, itemPropName }) => {
        if (!items || items.length === 0) {
            return (
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>{title}</Typography>
                    <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography color="text.secondary">No tienes favoritos en esta categoría aún.</Typography>
                    </Paper>
                </Box>
            );
        }

        return (
            <Box sx={{ mb: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>{title}</Typography>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView="auto"
                    navigation
                    pagination={{ clickable: true }}
                    style={{ paddingBottom: '40px' }}
                >
                    {items.map((item) => {
                        const props = {
                            [itemPropName]: item,
                            onClick: () => navigate(`/${navigatePath}/${item.id}`)
                        };
                        return (
                            <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                                <InfoCardComponent {...props} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Box>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ py: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: 6,
                        background: 'rgba(250, 235, 215, 0.9)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'black',
                        width: '100%',
                        maxWidth: '900px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        flexDirection: { xs: 'column', sm: 'row' },
                        textAlign: { xs: 'center', sm: 'left' }
                    }}>
                        <Avatar
                            sx={{
                                width: { xs: 80, sm: 120 },
                                height: { xs: 80, sm: 120 },
                                bgcolor: '#fff',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                border: '4px solid #fff'
                            }}
                        >
                            <PersonIcon sx={{ fontSize: { xs: 50, sm: 70 }, color: '#333' }} />
                        </Avatar>
                        <Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                                    mb: 1,
                                    letterSpacing: '-1px'
                                }}
                            >
                                ¡Hola, {user.username}!
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    opacity: 0.7,
                                    fontWeight: 400,
                                    fontSize: { xs: '1rem', sm: '1.2rem' }
                                }}
                            >
                                Es un placer verte de nuevo.
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>

            <Divider sx={{ mb: 6 }} />

            {/* Favoritos del usuario */}
            <FavoriteSection
                title="Consolas Favoritas"
                items={user.consolasFavoritas}
                InfoCardComponent={ConsoleInfoCard}
                navigatePath="consoles"
                itemPropName="consola"
            />

            <FavoriteSection
                title="Procesadores Favoritos"
                items={user.procesadoresFavoritos}
                InfoCardComponent={ProcessorInfoCard}
                navigatePath="processors"
                itemPropName="procesador"
            />

            <FavoriteSection
                title="Gráficas Favoritas"
                items={user.graficasFavoritas}
                InfoCardComponent={GraphicsInfoCard}
                navigatePath="graphics"
                itemPropName="grafica"
            />

            <FavoriteSection
                title="Empresas Favoritas"
                items={user.empresasFavoritas}
                InfoCardComponent={EnterpriseInfoCard}
                navigatePath="enterprises"
                itemPropName="empresa"
            />
        </Container>
    );
}