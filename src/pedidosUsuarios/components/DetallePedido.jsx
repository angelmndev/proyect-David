import React from 'react'
import { PageHeader, Table, Typography } from 'antd'

const DetallePedido = ({ pedidoEscogido, setDetalle }) => {
    const { Text } = Typography
    const data = []
    pedidoEscogido.map((pedido, index) => (
        data.push({
            orden: index + 1,
            producto: pedido.nombreProducto,
            sku: pedido.skuProducto,
            cantidad: pedido.cantidadPedido,
            unidad: pedido.unidad,
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
            title: 'Codigo material',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Material',
            dataIndex: 'producto',
            key: 'producto',
        },
        {
            title: 'cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'unidad',
            dataIndex: 'unidad',
            key: 'unidad',
        },
        {
            title: 'precio',
            dataIndex: 'precio',
            key: 'precio',
            render: (precio) => (<p>S/ {precio}</p>)
        },
        {
            title: 'total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => (<p>S/ {total}</p>)
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
            <Table
                size="small"
                rowKey="idDetalle_pedido"
                dataSource={data}
                columns={columns}
                summary={pageData => {
                    let montoFinal = 0;

                    pageData.forEach(({ total }) => {
                        montoFinal += total;

                        ;
                    });

                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell>Total</Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    <Text type="danger">S/ {montoFinal}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                            </Table.Summary.Row>

                        </>
                    );
                }}
            />
        </>

    )
}

export default DetallePedido
