import { createContext, useState } from "react";
import { getUser, postUser } from "../services/user";
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async ({ nombre, password }) => {
        try {
            const data = await getUser(nombre);

            if (!data || data.contrasenya !== password) {
                toast.error("Usuario o contraseña incorrectos");
                return false;
            }

            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            toast.success(`¡Bienvenido de nuevo, ${data.username}!`);
            return true;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            toast.error("Error crítico al iniciar sesión");
            return false;
        }
    };

    const register = async (userName, userPass) => {
        const newUser = {
            username: userName,
            contrasenya: userPass,
            admin: false,
        };

        const createRes = await postUser(newUser);

        if (!createRes) {
            toast.error("Error al crear el usuario. ¿Ya existe?");
            return;
        }

        toast.success("¡Registro completado con éxito! Ya puedes iniciar sesión.");
    }

    const refreshUser = async () => {
        if (!user) return;
        try {
            const data = await getUser(user.username);
            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            }
        } catch (error) {
            console.error("Error al refrescar usuario:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}
