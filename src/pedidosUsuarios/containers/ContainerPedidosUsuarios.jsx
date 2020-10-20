import React, { useEffect, useState } from 'react'
import PanelHeader from '../components/PanelHeader'
import ListPedidos from '../components/ListPedidos'
import { ListPedidosAPI } from '../services/pedidosApi'

const ContainerPedidosUsuarios = () => {

    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        ListPedidosAPI()
            .then(data => setPedidos(data))

    }, [])

    return (
        <>
            <PanelHeader />
            <ListPedidos pedidos={pedidos} />

        </>
    )
}

export default ContainerPedidosUsuarios