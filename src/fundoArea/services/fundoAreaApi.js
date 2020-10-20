const API_URL = `${process.env.REACT_APP_API_URL}/fundosAreas`

export const getFundosAreas = async () => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(API_URL, config);
    const fundosAreas = await response.json();
    return fundosAreas;
}

export const insertarFundoAreaApi = async (fundoArea) => {
    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fundoArea)
    };

    const responseApi = await fetch(API_URL, config);
    const response = await responseApi.json();
    return response;
}


export const getFundoAreaIdApi = async (idFundoArea) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/${idFundoArea}`, config);
    const fundoArea = await response.json();
    return fundoArea;
};


export const updateFundoAreaApi = async (idFundoArea, { fk_fundo, fk_area, fk_ceco, fk_usuario }) => {

    const config = {

        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fk_fundo, fk_area, fk_ceco, fk_usuario })
    };

    const responseApi = await fetch(`${API_URL}/${idFundoArea}`, config);
    const response = await responseApi.json();
    return response;
}


export const deleteFundoAreaApi = async (idFundoArea) => {

    const config = {
        method: "DELETE"
    };

    const responseApi = await fetch(`${API_URL}/${idFundoArea}`, config);
    const response = await responseApi.json();
    return response;

}

export const getUsuarioFundoAreaId = async (idUsuario) => {
    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/usuario/${idUsuario}`, config);
    const fundoArea = await response.json();
    return fundoArea;
}

