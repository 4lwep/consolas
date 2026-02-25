import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DevicesIcon from '@mui/icons-material/Devices';
import BusinessIcon from '@mui/icons-material/Business';
import MemoryIcon from '@mui/icons-material/Memory';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';

export default function Home() {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Consolas",
            desc: "Explora las máquinas que definieron generaciones de videojuegos.",
            icon: <DevicesIcon sx={{ fontSize: 40 }} />,
            path: "/list/consoles",
            color: "#673ab7",
            image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&q=80&w=400"
        },
        {
            title: "Empresas",
            desc: "Conoce a los titanes detrás del hardware y el software.",
            icon: <BusinessIcon sx={{ fontSize: 40 }} />,
            path: "/list/enterprises",
            color: "#2196f3",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400"
        },
        {
            title: "Procesadores",
            desc: "El corazón latiente de cada sistema y su evolución técnica.",
            icon: <MemoryIcon sx={{ fontSize: 40 }} />,
            path: "/list/processors",
            color: "#ff9800",
            image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400"
        },
        {
            title: "Gráficas",
            desc: "La potencia visual que ha impulsado la industria hacia adelante.",
            icon: <SettingsInputComponentIcon sx={{ fontSize: 40 }} />,
            path: "/list/graphics-cards",
            color: "#4caf50",
            image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400"
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#242424', color: '#fff', pb: 8 }}>
            <Box
                sx={{
                    background: 'linear-gradient(45deg, #1a1a1a 30%, #2c3e50 90%)',
                    py: { xs: 8, md: 15 },
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(250, 235, 215, 0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at center, transparent 0%, #242424 100%)',
                        opacity: 0.5,
                    }
                }}
            >
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            fontWeight: 900,
                            mb: 2,
                            letterSpacing: '-1px',
                            background: 'linear-gradient(to right, #faebd7, #fff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Console Gaming
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: 'rgba(255,255,255,0.7)',
                            mb: 4,
                            maxWidth: '600px',
                            mx: 'auto',
                            fontWeight: 300,
                            lineHeight: 1.6
                        }}
                    >
                        Una enciclopedia sobre la tecnología que hace posible el gaming en consolas. Descubre el hardware, su evolución, y las empresas detrás de estos productos.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/list/consoles')}
                        sx={{
                            backgroundColor: '#faebd7',
                            color: '#000',
                            fontWeight: 'bold',
                            px: 4,
                            py: 1.5,
                            borderRadius: '50px',
                            '&:hover': {
                                backgroundColor: '#fff',
                                transform: 'translateY(-3px)',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                        endIcon={<ArrowForwardIcon />}
                    >
                        Empezar a Explorar
                    </Button>
                </Container>
            </Box>

            {/* Categorías */}
            <Container maxWidth="lg" sx={{ mt: -5, position: 'relative', zIndex: 2 }}>
                <Grid container spacing={4}>
                    {sections.map((section, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                onClick={() => navigate(section.path)}
                                sx={{
                                    height: '100%',
                                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        borderColor: '#faebd7',
                                        boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${section.color}33`,
                                        '& .MuiCardMedia-root': {
                                            filter: 'grayscale(0%)',
                                            transform: 'scale(1.1)'
                                        }
                                    }
                                }}
                            >
                                <Box sx={{ overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={section.image}
                                        alt={section.title}
                                        sx={{
                                            filter: 'grayscale(60%)',
                                            transition: 'all 0.5s ease',
                                        }}
                                    />
                                </Box>
                                <CardContent sx={{ textAlign: 'center', pt: 3 }}>
                                    <Box sx={{
                                        display: 'inline-flex',
                                        p: 1.5,
                                        borderRadius: '15px',
                                        backgroundColor: `${section.color}15`,
                                        color: section.color,
                                        mb: 2
                                    }}>
                                        {section.icon}
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                        {section.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                                        {section.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}