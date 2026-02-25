import MediaCard from "../../../components/card/MediaCard";

export default function GraphicsInfoCard({ grafica, onClick }) {
    return (
        <MediaCard
            id={grafica.id}
            itemType="graficas"
            nombre={grafica.nombre}
            onClick={onClick}
            attributes={[
                { label: "Frecuencia", value: `${grafica.frecuencia} MHz` },
                { label: "API", value: grafica.api },
                { label: "Empresa", value: grafica.empresa?.empresaNombre || "N/A" }
            ]}
        />
    )
}