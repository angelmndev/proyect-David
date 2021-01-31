import React from 'react'
import { Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';

const ListMovimientoDeAlmacenes = ({ materiales, removeMaterial }) => {

    const listaDeMaterialesWithOrden = materiales.map((item, index) => {
        item.orden = index + 1;
        return item;
    })



    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
        },
        {
            title: 'Material',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Cantidad a Ingresar',
            dataIndex: 'cantidadIngresada',
            key: 'cantidad',
        },
        {
            title: 'Unidad',
            dataIndex: 'unidad',
            key: 'unidad',
        },
        {
            title: 'Acciones',
            dataIndex: 'idProducto',
            key: 'idProducto',
            render: idProducto => (
                <DeleteOutlined onClick={() => removeMaterial(idProducto)} />
            )

        },
    ];

    return (

        <Table rowKey={"orden"} dataSource={listaDeMaterialesWithOrden} columns={columns} />


    )
}

export default ListMovimientoDeAlmacenes
