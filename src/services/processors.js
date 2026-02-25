const API_URL = "http://localhost:8080";

const getProcesadores = async () => {
    const res = await fetch(`${API_URL}/procesadores`);
    if (!res.ok) return false;

    try {
        let resJson = await res.json();
        return resJson;
    } catch (error) {
        return false;
    }
}

const getProcesador = async (id) => {
    const res = await fetch(`${API_URL}/procesadores/${id}`);
    if (!res.ok) return false;

    try {
        let resJson = await res.json();
        return resJson;
    } catch (error) {
        return false;
    }
}

export { getProcesadores, getProcesador };
