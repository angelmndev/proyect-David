
const API_URL = `${process.env.REACT_APP_API_URL}/pedidos`

export const ListPedidosAPI = async () => {

    const config = {
        method: 'GET'
    }

    const response = await fetch(API_URL, config);
    const pedidos = await response.json();
    
    return pedidos;
}

export const getDetallesPedidosId = async (id) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/detalles/${id}`, config);
    const pedidos = await response.json();
    return pedidos;
}

export const updateCantidadPedidoEscogidoId = async (idPedidoDetalle) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/detalleProducto/${idPedidoDetalle}`, config);
    const pedidos = await response.json();
    return pedidos;
}

export const actualizarCantidadAPI = async (id, pedido) => {


    const config = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    }

    const response = await fetch(`${API_URL}/detalleProducto/${id}`, config);
    const pedidos = await response.json();
    return pedidos;
}

//estee es delete pedido del detalle
export const deleteProductoAPI = async (id) => {

    const config = {
        method: "DELETE"
    };

    const responseApi = await fetch(`${API_URL}/detalleProducto/${id}`, config);
    const response = await responseApi.json();
    return response;
}



export const aprobarPedidoAPI = async (id, idCeco) => {

    const config = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCeco })
    }

    const response = await fetch(`${API_URL}/${id}`, config);
    const pedidos = await response.json();
    return pedidos;
}

export const rechazarPedidoAPI = async (id) => {
    const config = {
        method: 'DELETE'
    }

    const response = await fetch(`${API_URL}/${id}`, config);
    const pedidos = await response.json();
    return pedidos;
}

export const exportarExcelApi = async (id) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/exportar/${id}`, config);
    const pedidos = await response.json();
    return pedidos;
}


export const deletePedidoId = async (id) => {
    const config = {
        method: "DELETE"
    };

    const responseApi = await fetch(`${API_URL}/deletePedido/${id}`, config);
    const response = await responseApi.json();
    return response;
}