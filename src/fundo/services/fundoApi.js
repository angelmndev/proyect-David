const API_URL = `${process.env.REACT_APP_API_URL}/fundos`



export const getFundos = async () => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(API_URL, config);
    const fundos = await response.json();
    return fundos;
}

export const postFundo = async (fundo) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fundo)
    };

    const responseApi = await fetch(API_URL, config);
    const response = await responseApi.json();
    return response;
}




export const editFundo = async (idFundo) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/${idFundo}`, config);
    const fundo = await response.json();
    return fundo;
};


export const updateSede = async (idFundo, { nombreFundo, fk_sede }) => {

    const config = {

        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreFundo, fk_sede })
    };

    const responseApi = await fetch(`${API_URL}/${idFundo}`, config);
    const response = await responseApi.json();
    return response;
}

export const deleteFundoApi = async (idFundo) => {

    const config = {
        method: "DELETE"
    };

    const responseApi = await fetch(`${API_URL}/${idFundo}`, config);
    const response = await responseApi.json();
    return response;

}





export const getFundoSede = async (idFundo) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/${idFundo}`, config);
    const { fundo } = await response.json();

    return fundo.fk_sede;

}


export const obtenerFundoPorSede = async (idSede) => {
    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/sedes/${idSede}`, config);
    const { fundos } = await response.json();

    return fundos;
}