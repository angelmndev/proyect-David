import React from 'react'
import { Table, Tag } from 'antd'
const ListaProductosFiltradosPorSedeAlmacen = ({ listaProductos }) => {

    const dataSource = [];

    // eslint-disable-next-line
    listaProductos.map((item, index) => {

        dataSource.push({
            orden: index + 1,
            nombreAlmacen: item.nombreInventario,
            nombreMaterial: item.nombreProducto,
            cantidadMaterial: item.cantidadProductoAlmacen,
            costoUnidad: item.costoProductoAlmacen
        })
    })

    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
        },
        {
            title: 'Almacen',
            dataIndex: 'nombreAlmacen',
            key: 'nombreAlmacen',
            render: (nombreAlmacen) => {
                switch (nombreAlmacen) {
                    case 'ALMACEN  GENERAL':
                        return <Tag color="purple">{nombreAlmacen}</Tag>

                    case 'ALMACEN MANTENIMIENTO':
                        return <Tag Tag color="green" > {nombreAlmacen}</Tag>
                    default:
                        break;
                }


            }

        },
        {
            title: 'Material',
            dataIndex: 'nombreMaterial',
            key: 'nombreMaterial',
        },
        {
            title: 'Cantidad total',
            dataIndex: 'cantidadMaterial',
            key: 'cantidadMaterial',
        },
        {
            title: 'Costo unitario',
            dataIndex: 'costoUnidad',
            key: 'costoUnidad',
            render: (costo) => `S/ ${costo}`
        },
    ];

    return (<Table size="small" bordered columns={columns} rowKey={"id"} dataSource={dataSource} pagination={{ pageSize: 5 }} />)
}

export default ListaProductosFiltradosPorSedeAlmacen
