import React from 'react'
import { Table } from 'antd';

const ListaCentroCostos = ({ cecos }) => {


    const data = [];

    cecos.map((ceco, index) =>
        data.push({
            orden: index + 1,
            idCeco: ceco.idCeco,
            codigoCeco: ceco.codigoCeco,
            nombreCeco: ceco.nombreCeco,
            nombreSede: ceco.nombreSede,
            presupuestoCeco: ceco.presupuestoCeco

        })
    );

    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
            render: (orden) => <p>{orden}</p>,
        },
        {
            title: 'codigo CECO',
            dataIndex: 'codigoCeco',
            key: 'codigoCeco',
            render: text => <p>{text}</p>,
        },
        {
            title: 'nombre CECO',
            dataIndex: 'nombreCeco',
            key: 'nombreCeco',
            render: text => <p>{text}</p>,
        },
        {
            title: 'sede',
            dataIndex: 'nombreSede',
            key: 'nombreSede',
            render: text => <p>{text}</p>,
        },
        {
            title: 'presupuesto',
            dataIndex: 'presupuestoCeco',
            key: 'presupuestoCeco',
            render: text => <p>${text}</p>,
        }
    ];


    return (
        <>
            <Table
                scroll={{ x: 320 }}
                bordered columns={columns} rowKey={"idCeco"} dataSource={data} pagination={{ pageSize: 5 }} />

        </>
    )
}

export default ListaCentroCostos
