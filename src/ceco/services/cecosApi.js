const API_URL = `${process.env.REACT_APP_API_URL}/cecos`



export const ListCecos = async () => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(API_URL, config);
    const cecos = await response.json();
    return cecos;
}

export const CreateCeco = async (ceco) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ceco)
    };

    const responseApi = await fetch(API_URL, config);
    const response = await responseApi.json();
    return response;
}



export const GetCeco = async (idCeco) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/${idCeco}`, config);
    const ceco = await response.json();
    return ceco;
};


export const UpdateCeco = async (idCeco, ceco) => {

    const config = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ceco)
    };

    const responseApi = await fetch(`${API_URL}/${idCeco}`, config);
    const response = await responseApi.json();
    return response;
}

export const DeleteCeco = async (idCeco) => {

    const config = {
        method: "DELETE"
    };

    const responseApi = await fetch(`${API_URL}/${idCeco}`, config);
    const response = await responseApi.json();
    return response;
}

//estoy obteniendo el id del area y no de la sede

export const GetCecoSede = async (idCecoSede) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/sedes/${idCecoSede}`, config);
    const ceco = await response.json();
    return ceco;
};


export const updatePresupuestoCecoId = async (idCeco, presupuesto) => {
    const config = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(presupuesto)
    };

    const responseApi = await fetch(`${API_URL}/presupuesto/${idCeco}`, config);
    const response = await responseApi.json();
    return response;
}

export const GetCecoSedeUsuario = async (idCecoSede, idUsuario) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/sedes/${idCecoSede}/usuario/${idUsuario}`, config);
    const ceco = await response.json();
    return ceco;
};