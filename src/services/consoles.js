const API_URL = "http://localhost:8080";

const getConsolas = async () => {
    const res = await fetch(`${API_URL}/consolas`);
    if (!res.ok) return false;

    try {
        let resJson = await res.json();
        return resJson;
    } catch (error) {
        return false;
    }
}

const getConsola = async (id) => {
    const res = await fetch(`${API_URL}/consolas/${id}`);
    if (!res.ok) return false;

    try {
        let resJson = await res.json();
        return resJson;
    } catch (error) {
        return false;
    }
}

export { getConsolas, getConsola };
