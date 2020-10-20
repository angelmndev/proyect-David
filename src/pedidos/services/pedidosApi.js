const API_URL = `${process.env.REACT_APP_API_URL}/pedidos`

export const createPedido = async ({ fk_ceco, materiales }) => {

    const date = new Date()

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const pedido = {
        fk_ceco: fk_ceco,
        listaMateriales: materiales,
        fk_usuario: usuario.id,
        fecha: date.toLocaleDateString()
    }



    const config = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    };

    const responseApi = await fetch(API_URL, config);
    const response = await responseApi.json();
    console.log(response);
    return response;
}

export const listarProductosPorCecosAPI = async (id) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/productosPorCecos/${id}`, config);
    const producto = await response.json();

    return producto;
}


export const obtenerCantidadProducto = async (idProducto) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/productosPorCantidad/${idProducto}`, config);
    const producto = await response.json();

    return producto;
}