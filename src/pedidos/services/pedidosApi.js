const API_URL = `${process.env.REACT_APP_API_URL}/pedidos`



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

export const buscarProdutoApi = async (codigo) => {
    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/buscarProducto/${codigo}`, config);
    const producto = await response.json();

    return producto;
}




export const crearPedidoApi = async ({ ceco, maquinaDestino, tipoMantenimiento, materiales }) => {

    const date = new Date()

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const idArea = JSON.parse(localStorage.getItem('idArea'))

    const pedido = {
        fk_ceco: ceco,
        maquinaDestino: maquinaDestino,
        tipoMantenimiento: tipoMantenimiento,
        materiales: materiales,
        fk_usuario: usuario.id,
        fk_area: idArea,
        fecha: date.toLocaleDateString()
    }


    const config = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    };

    const responseApi = await fetch(API_URL, config);
    const response = await responseApi.json();

    return response;
}



export const getListPedidosUsuarioApi = async (idUsuario) => {
    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/pedidos/status/usuario/${idUsuario}`, config);
    const producto = await response.json();

    return producto;
}