import React from 'react'
import { Space, Popconfirm, Table } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
const ListProductos = ({ productos, editarProducto, deleteProducto }) => {

    const data = [];

    productos.map((producto, index) =>
        data.push({
            orden: index + 1,
            idProducto: producto.idProducto,
            skuProducto: producto.skuProducto,
            nombreProducto: producto.nombreProducto,
            fk_categoria: producto.fk_categoria,
            tipoProducto: producto.tipoProducto,
            precioReferencialProducto: producto.precioReferencialProducto,
            unidadProducto: producto.unidadProducto,
            nombreArea: producto.nombreArea,
            nombreCeco: producto.nombreCeco,
            nombreCategoria: producto.nombreCategoria

        })
    );

    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
            width: 60,
            render: (orden) => <p>{orden}</p>,
        },
        {
            title: 'SKU',
            dataIndex: 'skuProducto',
            key: 'skuProducto',
            render: text => <p>{text}</p>,
        },
        {
            title: 'nombreProducto',
            dataIndex: 'nombreProducto',
            key: 'nombreProducto',
            render: text => <p>{text}</p>,
        },
        {
            title: 'tipo',
            dataIndex: 'tipoProducto',
            key: 'tipoProducto',
            render: text => <p>{text}</p>,
        },
        {
            title: 'categoria',
            dataIndex: 'nombreCategoria',
            key: 'nombreCategoria',
            render: text => <p>{text}</p>,
        },
        {
            title: ' precio referencial',
            dataIndex: 'precioReferencialProducto',
            key: 'precioReferencialProducto',
            render: text => <p>S/ {text}</p>,
        },
        {
            title: 'unidad',
            dataIndex: 'unidadProducto',
            key: 'unidadProducto',
            render: text => <p>{text}</p>,
        },
        {
            title: 'area',
            dataIndex: 'nombreArea',
            key: 'nombreArea',
            render: text => <p>{text}</p>,
        },
        {
            title: 'CECO',
            dataIndex: 'nombreCeco',
            key: 'nombreCeco',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Acciones',
            dataIndex: 'idProducto',
            key: 'idProducto',
            render: (idProducto) => (
                <Space size="middle">
                    <Popconfirm title="¿Deseas modificar el producto?"
                        okText="Si"
                        onConfirm={() => editarProducto(idProducto)}
                        cancelText="No">
                        <FormOutlined />
                    </Popconfirm>

                    <Popconfirm
                        onConfirm={() => deleteProducto(idProducto)}
                        title="¿Deseas eliminar el usuario?" okText="Si" cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    return (
        <>
            <Table size="small" bordered columns={columns} rowKey={"idProducto"} dataSource={data} pagination={{ pageSize: 5 }} />

        </>
    )
}

export default ListProductos
