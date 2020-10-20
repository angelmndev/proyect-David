import React, { useState } from 'react'
import { Table, Tag } from 'antd';
import { Space, Popconfirm } from 'antd';
import { EyeOutlined } from '@ant-design/icons'
import DetallePedido from './DetallePedido'
import { getDetallesPedidosId } from '../services/pedidosApi'

const ListPedidos = ({ pedidos }) => {

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
            usuario: pedido.nombrePersonalUsuario,
            ceco: pedido.nombreCeco,
            sede: pedido.nombreSede,
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
            title: 'fecha',
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
            title: 'usuario',
            key: 'usuario',
            dataIndex: 'usuario',

        },
        {
            title: 'ceco',
            key: 'ceco',
            dataIndex: 'ceco',

        },
        {
            title: 'sede',
            key: 'sede',
            dataIndex: 'sede',
        },
        {
            title: 'Action',
            dataIndex: 'idPedido',
            key: 'idPedido',

            render: (idPedido) => (

                <Space size="middle">

                    <Popconfirm title="¿Deseas ver los detalles del pedido?"
                        okText="Si"
                        onConfirm={() => verDetalle(idPedido)}
                        cancelText="No">
                        <EyeOutlined />
                    </Popconfirm>
                    {/* <Popconfirm title="¿Deseas aprobar el pedido?"
                        okText="Si"
                        // onConfirm={() => editarProducto(idProducto)}
                        cancelText="No">
                        <LikeOutlined />
                    </Popconfirm> */}

                </Space>
            ),
        },
    ];

    return (

        !detalle.visible ?
            <Table rowKey="idPedido" columns={columns} dataSource={listaPedidos} />
            : <DetallePedido pedidoEscogido={detalle.pedidos} setDetalle={setDetalle} />


    )
}

export default ListPedidos
