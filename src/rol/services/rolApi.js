// const API_URL = 'http://localhost:5000/roles';
const API_URL = 'http://64.227.9.165:5000/roles';


export const getRolesApi = async () => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(API_URL, config);
    const roles = await response.json();
    return roles;
}

export const createRolApi = async (nombreRol) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nombreRol)
    };

    const response = await fetch(API_URL, config);
    const rol = await response.json();
    return rol;
}



export const getRolIdApi = async (idRol) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/${idRol}`, config);
    const rol = await response.json();
    return rol;
};


export const updateRolApi = async (idRol, nombreRol) => {

    const config = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idRol, nombreRol })
    };

    const response = await fetch(`${API_URL}/${idRol}`, config);
    const role = await response.json();
    return role;
}

export const deleteRolApi = async (idRol) => {

    const config = {
        method: "DELETE"
    };

    const response = await fetch(`${API_URL}/${idRol}`, config);
    const rol = await response.json();
    return rol;
}
