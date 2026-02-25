import { useState, useContext } from "react";
import { Tabs, Tab, TextField, Button, Box, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { userExists } from "../services/user";
import { toast } from "react-toastify";

export default function UserActions({ registerTab }) {
    const [currentTab, setCurrentTab] = useState(registerTab);
    const { login, register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loginNombre, setLoginNombre] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [regNombre, setRegNombre] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regRepeatPassword, setRegRepeatPassword] = useState("");

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
        }}>
            <Box sx={{
                width: 400,
                bgcolor: "#2e2e2e",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
            }}>
                <Tabs
                    value={currentTab}
                    onChange={(e, v) => setCurrentTab(v)}
                    variant="fullWidth"
                    sx={{
                        bgcolor: "#3a3a3a",
                        "& .MuiTab-root": { color: "#aaa" },
                        "& .Mui-selected": { color: "antiquewhite" },
                        "& .MuiTabs-indicator": { bgcolor: "antiquewhite" },
                    }}
                >
                    <Tab label="Iniciar Sesión" />
                    <Tab label="Registrarse" />
                </Tabs>

                <Box sx={{ p: 3 }}>
                    {currentTab === 0 ? (
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const ok = await login({ nombre: loginNombre, password: loginPassword });
                            if (ok) navigate("/profile");
                        }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Typography variant="h6" sx={{ color: "antiquewhite", textAlign: "center" }}>
                                    Bienvenido de nuevo
                                </Typography>
                                <TextField label="Nombre" type="text" variant="outlined" size="small"
                                    onChange={(e) => setLoginNombre(e.target.value)}
                                    sx={{ input: { color: "#fff" }, label: { color: "#aaa" } }} />
                                <TextField label="Contraseña" type="password" variant="outlined" size="small"
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    sx={{ input: { color: "#fff" }, label: { color: "#aaa" } }} />
                                <Button variant="contained" type="submit"
                                    sx={{ bgcolor: "antiquewhite", color: "#242424", "&:hover": { bgcolor: "#d2b48c" } }}>
                                    Entrar
                                </Button>
                            </Box>
                        </form>
                    ) : (
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            if (regPassword !== regRepeatPassword) {
                                toast.warning("Las contraseñas no coinciden");
                                return;
                            }

                            try {
                                const nombre = regNombre;
                                const password = regPassword;

                                if (await userExists(nombre)) {
                                    toast.error("El nombre de usuario ya existe");
                                    return;
                                }

                                await register(nombre, password);

                                // Iniciar sesión automáticamente
                                const ok = await login({ nombre, password });
                                if (ok) {
                                    navigate("/profile");
                                } else {
                                    setCurrentTab(0);
                                }

                            } catch (error) {
                                console.error("Error en el registro:", error);
                                toast.error("Error de conexión con el servidor");
                            }
                        }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Typography variant="h6" sx={{ color: "antiquewhite", textAlign: "center" }}>
                                    Crear cuenta
                                </Typography>
                                <TextField label="Nombre" type="text" variant="outlined" size="small"
                                    onChange={(e) => setRegNombre(e.target.value)}
                                    sx={{ input: { color: "#fff" }, label: { color: "#aaa" } }} />
                                <TextField label="Contraseña" type="password" variant="outlined" size="small"
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    sx={{ input: { color: "#fff" }, label: { color: "#aaa" } }} />
                                <TextField label="Repetir contraseña" type="password" variant="outlined" size="small"
                                    onChange={(e) => setRegRepeatPassword(e.target.value)}
                                    onBlur={() => {
                                        if (regRepeatPassword && regPassword !== regRepeatPassword) {
                                            toast.warning("Las contraseñas no coinciden");
                                        }
                                    }}
                                    sx={{ input: { color: "#fff" }, label: { color: "#aaa" } }} />
                                <Button variant="contained" type="submit"
                                    sx={{ bgcolor: "antiquewhite", color: "#242424", "&:hover": { bgcolor: "#d2b48c" } }}>
                                    Registrarse
                                </Button>
                            </Box>
                        </form>
                    )}
                </Box>
            </Box>
        </Box >

    );
}