import MediaCard from "../../../components/card/MediaCard";

export default function ConsoleInfoCard({ consola, onClick }) {
    return (
        <MediaCard
            id={consola.id}
            itemType="consolas"
            nombre={consola.nombre}
            logo={consola.imagen}
            onClick={onClick}
            attributes={[
                { label: "Lanzamiento", value: consola.fechaSalida },
                { label: "Empresa", value: consola.empresa?.empresaNombre || "N/A" },
                { label: "Procesador", value: consola.procesador?.nombre || "N/A" },
                { label: "Gráfica", value: consola.grafica?.nombre || "N/A" }
            ]}
        />
    )
}