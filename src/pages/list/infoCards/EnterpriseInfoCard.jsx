import MediaCard from "../../../components/card/MediaCard";

export default function EnterpriseInfoCard({ empresa, onClick }) {
    return (
        <MediaCard
            id={empresa.id}
            itemType="empresas"
            nombre={empresa.empresaNombre}
            logo={empresa.empresaLogo}
            onClick={onClick}
            attributes={[
                { label: "País", value: empresa.empresaPaisOrigen },
                { label: "Fundada", value: empresa.empresaFechaCreacion }
            ]}
        />
    )
}