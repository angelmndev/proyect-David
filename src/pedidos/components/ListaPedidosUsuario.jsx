import React, { useState } from 'react'
import { Table, Tag } from 'antd';
import { Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons'
import PedidoUsuarioDetalle from './PedidoUsuarioDetalle'
import { getDetallesPedidosId } from '../../pedidosUsuarios/services/pedidosApi'


const ListaPedidosUsuario = ({ pedidos }) => {

    const [detalle, setDetalle] = useState({ visible: false, pedidos: [] });

    const listaPedidos = []


    const verDetalle = async (idPedido) => {
        const pedidos = await getDetallesPedidosId(idPedido)

        setDetalle({
            visible: true,
            pedidos: pedidos
        })


    }




    pedidos.map((pedido, index) => (
        listaPedidos.push({
            orden: index + 1,
            fecha: pedido.fecha,
            estado: pedido.estado,
            idPedido: pedido.idPedido

        })
    ))



    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
            // eslint-disable-next-line
            render: orden => <a>{orden}</a>,
        },
        {
            title: 'fecha solicitada',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (estado) => {
                switch (estado) {
                    case 'pendiente':
                        return <Tag color="orange">{estado}</Tag>
                    case 'aprobado':
                        return <Tag color="green">{estado}</Tag>
                    case 'rechazado':
                        return <Tag color="red">{estado}</Tag>
                    default:
                        break;
                }
            }
        },
        {
            title: 'Acciones',
            dataIndex: 'idPedido',
            key: 'idPedido',

            render: (idPedido) => (

                <Space size="middle">


                    <EyeOutlined
                        onClick={() => verDetalle(idPedido)}
                    />
                </Space>

            ),
        },
    ];

    return (

        !detalle.visible ?
            <Table rowKey="idPedido" columns={columns} dataSource={listaPedidos} />
            :

            <PedidoUsuarioDetalle pedidoEscogido={detalle.pedidos} setDetalle={setDetalle} />


    )
}

export default ListaPedidosUsuario
