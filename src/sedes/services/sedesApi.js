const API_URL = `${process.env.REACT_APP_API_URL}/sedes`

export const getSedes = async () => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(API_URL, config);
    const sedes = await response.json();
    return sedes;
}

export const postSede = async (nombreSede) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nombreSede)
    };

    const response = await fetch(API_URL, config);
    const sedes = await response.json();
    return sedes;
}


export const deleteSede = async (idSede) => {

    const config = {
        method: "DELETE"
    };

    const response = await fetch(`${API_URL}/${idSede}`, config);
    const sedes = await response.json();
    return sedes;
}

export const editSede = async (idSede) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/${idSede}`, config);
    const sedes = await response.json();
    return sedes;
};


export const putSede = async (idSede, nombreSede) => {

    const config = {

        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idSede, nombreSede })
    };

    const response = await fetch(`${API_URL}/${idSede}`, config);
    const sedes = await response.json();
    return sedes;
}