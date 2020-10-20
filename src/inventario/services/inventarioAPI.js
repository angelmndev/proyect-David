const API_URL = `${process.env.REACT_APP_API_URL}/inventarios`


export const registroIngresoAlmacenAPI = async (material) => {


    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
    };

    const responseApi = await fetch(API_URL, config);
    const response = await responseApi.json();
    return response;

}


export const registroSalidaAlmacenAPI = async (material) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
    };

    const responseApi = await fetch(`${API_URL}/salidas`, config);
    const response = await responseApi.json();
    return response;

}


export const listaKardexAlmacenAPI = async () => {
    const config = {
        method: 'GET'
    }
    const responseApi = await fetch(API_URL, config)
    const response = await responseApi.json()
    return response


}

export const listaMovimientosAlmacenAPI = async () => {
    const config = {
        method: 'GET'
    }
    const responseApi = await fetch(`${API_URL}/movimientos`, config)
    const response = await responseApi.json()
    return response

}

export const listaCodInventarioSedeAPI = async () => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/inventarioSede`, config)
    const inventario = await response.json();
    return inventario;

}



export const obtenerSedeInventarioAPI = async (idInventario) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/${idInventario}`, config)
    const inventario = await response.json();
    return inventario;
}

export const obtenerProductosPorSede = async (fk_sede) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/productos/${fk_sede}`, config)
    const inventario = await response.json();
    return inventario;
}


export const obtenerPrecioReferencialProductoAPI = async (idProducto) => {

    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/producto/precio/${idProducto}`, config)
    const inventario = await response.json();
    return inventario;
}

export const obtenerCantidadProductoAPI = async (idProducto) => {

    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/producto/cantidad/${idProducto}`, config)
    const inventario = await response.json();
    return inventario;
}

export const validadExistenciaProducto = async (idProducto) => {

    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/producto/validarExistencia/${idProducto}`, config)
    const inventario = await response.json();
    return inventario;
}

export const registrarInventarioInicial = async (material) => {
    console.log(material)
    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
    };

    const responseApi = await fetch(`${API_URL}/registro/inicial`, config);
    const response = await responseApi.json();
    return response;
}