const API_URL = `${process.env.REACT_APP_API_URL}/areas`


export const getAreas = async () => {

    const config = {
        method: 'GET'
    }

    const response = await fetch(API_URL, config);
    const areas = await response.json();
    return areas;


}
export const postArea = async (nombreArea) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nombreArea)
    };

    const response = await fetch(API_URL, config);
    const areas = await response.json();
    return areas;
}


export const editArea = async (idArea) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/${idArea}`, config);
    const area = await response.json();
    return area;
};


export const updateArea = async (idArea, { nombreArea }) => {

    const config = {

        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreArea })
    };

    const responseApi = await fetch(`${API_URL}/${idArea}`, config);
    const response = await responseApi.json();
    return response;
}


export const deleteAreaApi = async (idArea) => {

    const config = {
        method: "DELETE"
    };

    const responseApi = await fetch(`${API_URL}/${idArea}`, config);
    const response = await responseApi.json();
    return response;

}

