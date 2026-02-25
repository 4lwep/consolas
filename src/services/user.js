const API_URL = "http://localhost:8080";

const getUser = async (username) => {
    const res = await fetch(`${API_URL}/user/${username}`);
    if (!res.ok) return false;

    try {
        let resJson = await res.json();
        return resJson;
    } catch (error) {
        return false;
    }
}

const userExists = async (username) => {
    const user = await getUser(username);

    if (!user) return false;

    return true;
}

const postUser = async (newUser) => {
    const user = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    });

    if (user.ok) {
        return user;
    } else return null;
}

const addFavorite = async (username, type, id) => {
    const res = await fetch(`${API_URL}/user/${username}/${type}/${id}`, {
        method: "POST"
    });
    return res.ok;
}

const removeFavorite = async (username, type, id) => {
    const res = await fetch(`${API_URL}/user/${username}/${type}/${id}/delete`, {
        method: "POST"
    });
    return res.ok;
}

export { getUser, userExists, postUser, addFavorite, removeFavorite };
