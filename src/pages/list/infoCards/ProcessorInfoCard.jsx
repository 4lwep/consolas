import MediaCard from "../../../components/card/MediaCard";

export default function ProcessorInfoCard({ procesador, onClick }) {
    return (
        <MediaCard
            id={procesador.id}
            itemType="procesadores"
            nombre={procesador.nombre}
            onClick={onClick}
            attributes={[
                { label: "Familia", value: procesador.familia },
                { label: "Núcleos", value: procesador.nucleos },
                { label: "Empresa", value: procesador.empresa?.empresaNombre || "N/A" }
            ]}
        />
    )
}