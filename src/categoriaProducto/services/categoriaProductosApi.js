const API_URL = `${process.env.REACT_APP_API_URL}/categorias`




export const getCategoriasProductosAPI = async () => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(API_URL, config);
    const productos = await response.json();
    return productos;
}
