import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function User({ onLinkClick }) {
    const { user, logout } = useContext(AuthContext);

    const handleClick = () => {
        if (onLinkClick) onLinkClick();
    };

    if (user) {
        return (
            <div className="user-links">
                <Link to="/profile" onClick={handleClick}>Cuenta</Link>
                <Link to="/" onClick={() => { logout(); handleClick(); }}>Salir</Link>
            </div>
        )
    } else {
        return (
            <div className="user-links">
                <Link to="/login" onClick={handleClick}>Entrar</Link>
                <Link to="/register" onClick={handleClick}>Registrarse</Link>
            </div>
        )
    }
}