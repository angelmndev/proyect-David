import React from 'react'
import { PageHeader, Table } from 'antd'

const DetallePedido = ({ pedidoEscogido, setDetalle }) => {

    const data = []
    pedidoEscogido.map((pedido, index) => (
        data.push({
            orden: index + 1,
            producto: pedido.nombreProducto,
            cantidad: pedido.cantidadPedido,
            precio: pedido.precioReferencialProducto,
            total: pedido.total,
            area: pedido.nombreArea,
            ceco: pedido.nombreCeco
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
        },
        {
            title: 'precio',
            dataIndex: 'precio',
            key: 'precio',
            render: (precio) => (<p>$ {precio}</p>)
        },
        {
            title: 'total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => (<p>$ {total}</p>)
        },
        {
            title: 'area',
            dataIndex: 'area',
            key: 'area',
        },
        {
            title: 'ceco',
            dataIndex: 'ceco',
            key: 'ceco',
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
            <Table dataSource={data} columns={columns} />
        </>

    )
}

export default DetallePedido
