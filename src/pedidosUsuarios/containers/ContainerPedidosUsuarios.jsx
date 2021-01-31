import React, { useEffect, useState } from 'react'
import PanelHeader from '../components/PanelHeader'
import ListPedidos from '../components/ListPedidos'
import { ListPedidosAPI } from '../services/pedidosApi'

const ContainerPedidosUsuarios = () => {

    const [pedidos, setPedidos] = useState([])

    const listarPedidos = async () => {
        const data = await ListPedidosAPI();
        setPedidos(data);
    }
    useEffect(() => {
        listarPedidos()

    }, [])

    return (
        <>
            <PanelHeader />
            <ListPedidos pedidos={pedidos} listarPedidos={listarPedidos} />

        </>
    )
}

export default ContainerPedidosUsuarios