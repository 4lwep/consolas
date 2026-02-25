const API_URL = "http://localhost:8080";

const getGraficas = async () => {
    const res = await fetch(`${API_URL}/graficas`);
    if (!res.ok) return false;

    try {
        let resJson = await res.json();
        return resJson;
    } catch (error) {
        return false;
    }
}

const getGrafica = async (id) => {
    const res = await fetch(`${API_URL}/graficas/${id}`);
    if (!res.ok) return false;

    try {
        let resJson = await res.json();
        return resJson;
    } catch (error) {
        return false;
    }
}

export { getGraficas, getGrafica };
