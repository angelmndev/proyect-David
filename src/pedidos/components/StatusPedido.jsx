import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { getListPedidosUsuarioApi } from '../services/pedidosApi'
import ListaPedidosUsuario from '../components/ListaPedidosUsuario'

const StatusPedido = () => {

    const [miPedido, setMiPedido] = useState([])

    const cargarMisPedidos = async () => {
        const { id } = JSON.parse(localStorage.getItem('usuario'))
        const { pedidos } = await getListPedidosUsuarioApi(id)
        setMiPedido(pedidos)
    }
    useEffect(() => {

        cargarMisPedidos()
    }, [])

    return (
        <Row justify="center" >
            <Col xs={24}>
                <h1
                    style={{
                        display: 'block',
                        textAlign: 'center',
                        background: '#5D3C81',
                        padding: '.1em  .5em',
                        color: '#FFFFFF',
                        margin: '0'
                    }}>Estado de mi pedido</h1>
            </Col>
            <Col xs={24} >
                <ListaPedidosUsuario pedidos={miPedido} />

            </Col>
        </Row>
    )
}

export default StatusPedido
