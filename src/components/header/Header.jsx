import { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "./Menu";
import User from "./User";
import "./header.css";
import Logo from "/logo.jpg";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const entradas = [
    { nombre: "Consolas", enlace: "/list/consoles" },
    { nombre: "Empresas", enlace: "/list/enterprises" },
    { nombre: "Procesadores", enlace: "/list/processors" },
    { nombre: "Gráficas", enlace: "/list/graphics-cards" },
  ];

  return (
    <nav className="header-nav">
      <Link to="/" className="header-logo" onClick={closeMenu}>
        <img src={Logo} alt="Logo" />
      </Link>

      {/* Botón hamburguesa (solo visible en móvil por CSS) */}
      <div className="mobile-menu-button">
        <IconButton onClick={toggleMenu} sx={{ color: '#000' }}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      {/* Contenedor de enlaces (responsivo por CSS) */}
      <div className={`nav-links-container ${isMenuOpen ? "open" : ""}`}>
        <Menu entradas={entradas} onLinkClick={closeMenu} />
        <div className="nav-separator"></div>
        <User onLinkClick={closeMenu} />
      </div>
    </nav>
  );
}

export default Header;
