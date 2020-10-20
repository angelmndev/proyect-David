const API_URL = `${process.env.REACT_APP_API_URL}/almacen`

export const obtenerAlmacenPorSede = async (fk_sede) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/almacenPorSede/${fk_sede}`, config)
    const inventario = await response.json();
    return inventario;
}


export const obtenerMaterialesPorAlmacen = async (idSede) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/materiales/${idSede}`, config)
    const inventario = await response.json();
    return inventario;
}


export const getMaterialbyStock = async (idAlmacen) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/materialPorAlmacen/${idAlmacen}`, config)
    const inventario = await response.json();
    return inventario;
}

export const registrarInicializacionAlmacen = async ({ fecha, fk_sede, fk_inventario, materiales }) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fecha: fecha,
            fk_sede,
            fk_inventario,
            materiales

        })
    };

    const responseApi = await fetch(API_URL, config);
    const response = await responseApi.json();
    return response;
}

export const validarMaterialExistente = async (idProducto, idAlmacen) => {
    console.log(idProducto, idAlmacen);
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/material/${idProducto}/almacen/${idAlmacen}`, config)
    const inventario = await response.json();
    return inventario;
}

export const registrarIngresoMaterial = async (material) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
    };

    const responseApi = await fetch(`${API_URL}/ingreso`, config);
    const response = await responseApi.json();
    return response;

}

export const registrarSalidaMaterial = async (material) => {
    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
    };

    const responseApi = await fetch(`${API_URL}/salida`, config);
    const response = await responseApi.json();
    return response;
}


export const listaKardexAlmacenAPI = async () => {
    const config = {
        method: 'GET'
    }

    const responseApi = await fetch(`${API_URL}/kardex`, config)
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
export const obtenerMovimientosDetalles = async (idMovimiento) => {
    const config = {
        method: 'GET'
    }
    const responseApi = await fetch(`${API_URL}/movimientos/detalles/${idMovimiento}`, config)
    const response = await responseApi.json()
    return response
}

export const obtenerDetalleMovimientoId = async (idMovimientoDetalle) => {
    const config = {
        method: 'GET'
    }
    const responseApi = await fetch(`${API_URL}/movimientos/detalles/editar/${idMovimientoDetalle}`, config)
    const response = await responseApi.json()
    return response
}

export const actualizarCantidadProductoAPI = async (idMovimientoDetalle, fk_productoAlmacen, cantidadProducto) => {
    const config = {

        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fk_productoAlmacen: fk_productoAlmacen,
            cantidadProducto: cantidadProducto
        })
    };

    const responseApi = await fetch(`${API_URL}/movimientos/detalles/actualizar/${idMovimientoDetalle}`, config);
    const response = await responseApi.json();
    return response;
}

export const moverMateriales = async (material) => {

    const config = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
    };

    const responseApi = await fetch(`${API_URL}/moverMaterial`, config);
    const response = await responseApi.json();
    return response;

}

//filtro de los productos por sede y almacen

export const listarProductosSedesAlmacen = async (filtro) => {

    const { sede, almacen, todos } = filtro;

    const config = {
        method: 'GET'

    }

    if (todos) {
        const response = await fetch(`${API_URL}/filtroProductoSedeAlmacen`, config)
        const inventario = await response.json();
        return inventario;

    } else {
        const response = await fetch(`${API_URL}/filtroProductoSedeAlmacen/sede/${sede}/almacen/${almacen}`, config)
        const inventario = await response.json();
        return inventario;
    }





}