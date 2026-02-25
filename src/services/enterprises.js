const API_URL = "http://localhost:8080";

const getEmpresas = async () => {
    const res = await fetch(`${API_URL}/empresas`);
    if (!res.ok) return false;

    try {
        let resJson = await res.json();
        return resJson;
    } catch (error) {
        return false;
    }
}

const getEmpresa = async (id) => {
    const res = await fetch(`${API_URL}/empresas/${id}`);
    if (!res.ok) return false;

    try {
        let resJson = await res.json();
        return resJson;
    } catch (error) {
        return false;
    }
}

export { getEmpresas, getEmpresa };
