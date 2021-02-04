import React, { useState, useEffect } from 'react'
import { PageHeader, Table, Space, Popconfirm, Drawer, Button,Tag, InputNumber, Typography } from 'antd'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'

import { updateCantidadPedidoEscogidoId, actualizarCantidadAPI, deleteProductoAPI, getDetallesPedidosId } from '../../pedidosUsuarios/services/pedidosApi'
import { Fragment } from 'react'
const DetallePedido = ({ idPedido, setViewDetalle }) => {
    const { Text } = Typography
    const [visible, setVisible] = useState(false);
    //mis pedidos
    const [listPedidos, setListaPedidos] = useState([])

    //pedido escogido
    const [editPedido, setEditPedido] = useState({})

    //trayendo pedidos
    const listaDetallePedidos = async (idPedido) => {
        const pedidos = await await getDetallesPedidosId(idPedido)
        setListaPedidos(pedidos)
    }


    useEffect(() => {
        listaDetallePedidos(idPedido)
    }, [idPedido])



    const showEdit = async (id) => {
        setVisible(true);
        const pedido = await updateCantidadPedidoEscogidoId(id)
        setEditPedido(pedido)

    }
    const onClose = () => {
        setVisible(false);
    };

    const cambiarCantidad = (value) => {
        setEditPedido({
            ...editPedido,
            cantidadPedido: value
        })
    }

    const actualizarCantidad = async () => {
        await actualizarCantidadAPI(editPedido.idDetalle_pedido, editPedido)
        setVisible(false);
        listaDetallePedidos(idPedido)

    }

    const deletePedido = async (id) => {
        await deleteProductoAPI(id)
        listaDetallePedidos(idPedido)

    }

    const data = []


    listPedidos.map((pedido, index) => (        
        data.push({
            orden: index + 1,
            producto: pedido.nombreProducto,
            sku: pedido.skuProducto,
            cantidad: pedido.cantidadPedido,
            unidad: pedido.unidad,
            precio: pedido.precioReferencialProducto,
            total: pedido.total,
            area: pedido.nombreArea,
            ceco: pedido.nombreCeco,
            idDetalle_pedido: pedido.idDetalle_pedido,
            almacen: pedido.almacen
        })
    ))



    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
        },

        {
            title: 'ceco',
            dataIndex: 'ceco',
            key: 'ceco',
        },
        {
            title: 'area',
            dataIndex: 'area',
            key: 'area',
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
            title: 'Almacen',
            dataIndex: 'almacen',
            key: 'almacen',
            render: (almacen) => {
                               
                let almacenArray = almacen.split(" ");
                let cantidadArray = almacenArray[1].split(":");
                let catidadArrayCastillos = almacenArray[2].split(":");
                let catidadArrayVid = almacenArray[3].split(":");
                console.log(cantidadArray);

                return(
                    <Fragment>
                        <Tag width="10px" color={parseInt(cantidadArray[1])>0?"green":"red"}>{almacenArray[1]}</Tag>
                        <Tag color={parseInt(catidadArrayCastillos[1])>0?"green":"red"}>{almacenArray[2]}</Tag>
                        <Tag color={parseInt(catidadArrayVid[1])>0?"green":"red"}>{almacenArray[3]}</Tag>
                    </Fragment>
                    
                )

            }
        },

        {
            title: 'Action',
            dataIndex: 'idDetalle_pedido',
            key: 'idDetalle_pedido',

            render: (idDetalle_pedido) => (

                <Space size="middle">

                    <Popconfirm title="¿Deseas modificar la cantidad del producto?"
                        okText="Si"
                        onConfirm={() => showEdit(idDetalle_pedido)}
                        cancelText="No">
                        <FormOutlined />
                    </Popconfirm>
                    <Popconfirm title="¿Deseas quitar este producto?"
                        okText="Si"
                        onConfirm={() => deletePedido(idDetalle_pedido)}
                        cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>

                </Space>
            ),
        }
    ];


    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => setViewDetalle({ visible: false })}
                title="Regresar"
                subTitle="volver a la lista de pedidos"
            />
            <Table rowKey="idDetalle_pedido"
                dataSource={data}
                columns={columns}
                scroll={{ x: 320 }}
                size="small"
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
                                <Table.Summary.Cell>Total</Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    <Text type="danger">S/ {montoFinal}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                            </Table.Summary.Row>

                        </>
                    );
                }}


            />
            {
                visible &&
                <Drawer
                    title="Modificando cantidad"
                    placement="bottom"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    footer={
                        <div
                            style={{
                                textAlign: 'left',
                            }}
                        >
                            <Button onClick={onClose} style={{ marginRight: 8 }}>
                                Cancel
                          </Button>
                            <Button onClick={actualizarCantidad} type="primary">
                                Actualizar
                          </Button>
                        </div>
                    }
                >
                    <InputNumber style={{ width: '100%' }} name="nueva_cantidad" value={editPedido.cantidadPedido} onChange={cambiarCantidad} />
                </Drawer>
            }
        </>

    )
}

export default DetallePedido
