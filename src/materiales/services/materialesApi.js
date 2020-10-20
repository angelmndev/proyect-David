const API_URL = `${process.env.REACT_APP_API_URL}/productos`

export const agregarNuevoProductoAPI = async (producto) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    };

    const responseApi = await fetch(API_URL, config);
    const response = await responseApi.json();
    return response;
}


export const listarProductosAPI = async () => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(API_URL, config);
    const productos = await response.json();
    return productos;
}

export const getProductoIdAPI = async (id) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/${id}`, config);
    const producto = await response.json();
    return producto;

};


export const updateProductoIdAPI = async (idProducto, producto) => {
    console.log(producto);
    const config = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    };

    const responseApi = await fetch(`${API_URL}/${idProducto}`, config);
    const response = await responseApi.json();
    return response;
}

export const deleteProductoAPI = async (idProducto) => {

    const config = {
        method: "DELETE"
    };

    const responseApi = await fetch(`${API_URL}/${idProducto}`, config);
    const response = await responseApi.json();
    return response;
}


//materiales por area
export const listarProductosAreasAPI = async (idArea) => {

    console.log(idArea);

    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/area/${idArea}`, config);
    const productos = await response.json();
    return productos;
}