import React from 'react'
import { Table } from 'antd'
import 'moment/locale/es';


const MovimientosInventario = ({ listaMovimientos }) => {
    const data = [];

    listaMovimientos.map((movimiento, index) =>
        data.push({
            orden: index + 1,
            id: movimiento.idDetalleMovimientoInventario,
            tipoMovimiento: movimiento.tipoMovimiento,
            fecha: movimiento.fecha,
            sede: movimiento.nombreSede,
            documento: movimiento.codigoDocumento,
            responsable: movimiento.personaResponsable

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
            title: 'Movimiento',
            dataIndex: 'tipoMovimiento',
            key: 'tipoMovimiento',
            width: 10,
            render: tipoMovimiento => <p>{tipoMovimiento}</p>,
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
            width: 10,
            render: fecha => <p>{fecha}</p>,
        },
        {
            title: 'Sede',
            dataIndex: 'sede',
            key: 'sede',
            width: 50,
            render: sede => <p>{sede}</p>,
        },
        {
            title: 'Codigo documento',
            dataIndex: 'documento',
            key: 'documento',
            width: 40,
            render: documento => <p>{documento}</p>,
        },
        {
            title: 'Responsable',
            dataIndex: 'responsable',
            key: 'responsable',
            width: 60,
            render: responsable => <p>{responsable}</p>,
        }
    ]

    return (
        <Table size="small" bordered columns={columns} rowKey={"id"} dataSource={data} pagination={{ pageSize: 5 }} />

    )
}

export default MovimientosInventario
