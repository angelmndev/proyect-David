import React from 'react'
import { PageHeader, Table } from 'antd'

const PedidoUsuarioDetalle = ({ pedidoEscogido, setDetalle }) => {

    const data = []

    pedidoEscogido.map((pedido, index) => (
        data.push({
            orden: index + 1,
            producto: pedido.nombreProducto,
            cantidad: pedido.cantidadPedido
        })
    ))

    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
        },
        {
            title: 'producto',
            dataIndex: 'producto',
            key: 'producto',
        },
        {
            title: 'cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        }
    ];


    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => setDetalle({ visible: false })}
                title="Regresar"
                subTitle="volver a la lista de pedidos"
            />
            <Table
                rowKey="idDetalle_pedido"
                dataSource={data}
                columns={columns}

            />
        </>

    )
}

export default PedidoUsuarioDetalle
