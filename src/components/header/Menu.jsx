import { Link } from "react-router-dom";

export default function Menu({ entradas, onLinkClick }) {
    return (
        <div className="menu-links">
            {
                entradas.map((entrada) => {
                    return (
                        <Link
                            to={entrada.enlace}
                            key={entrada.nombre}
                            onClick={onLinkClick}
                        >
                            {entrada.nombre}
                        </Link>
                    )
                })
            }
        </div>
    )
}