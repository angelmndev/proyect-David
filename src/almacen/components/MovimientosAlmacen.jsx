import React from 'react'
import { Table, Space } from 'antd'
import 'moment/locale/es';
import { EyeOutlined } from '@ant-design/icons'
import DetalleMovimiento from './DetalleMovimiento'
import { useState } from 'react';
import { obtenerMovimientosDetalles } from '../services/AlmacenAPI'

const MovimientosAlmacen = ({ listaMovimientos,ListarKardex }) => {
    const data = [];

    listaMovimientos.map((movimiento, index) =>
        data.push({
            orden: index + 1,
            idMovimiento: movimiento.idMovimiento,
            tipoMovimiento: movimiento.tipoMovimiento,
            fecha: movimiento.fecha,
            sede: movimiento.nombreSede,
            documento: movimiento.codigoDocumento,
            responsable: movimiento.personaResponsable

        })
    );


    const [viewDetalle, setViewDetalle] = useState(false)
    const [movimientosDetalles, setMovimientosDetalles] = useState([])

    const mostrarDetalleMovimiento = async (idMovimiento) => {
        const data = await obtenerMovimientosDetalles(idMovimiento)
        setMovimientosDetalles(data);
        setViewDetalle(true)
    }

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
        },
        {
            title: 'Action',
            dataIndex: 'idMovimiento',
            key: 'idMovimiento',
            width: 60,
            render: (idMovimiento) => (

                <Space size="middle">
                    <EyeOutlined onClick={() => mostrarDetalleMovimiento(idMovimiento)} />
                </Space>
            ),
        }
    ]

    return (
        <>
            <Table size="small" bordered columns={columns} rowKey={"idMovimiento"} dataSource={data} pagination={{ pageSize: 5 }} />
            {
                viewDetalle && <DetalleMovimiento
               
                ListarKardex={ListarKardex}
                setViewDetalle={setViewDetalle} 
                movimientosDetalles={movimientosDetalles} 
                visible={viewDetalle} />
            }
        </>
    )
}

export default MovimientosAlmacen
