import React from 'react'
import { Drawer, Table, Space, Input, Button } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { obtenerDetalleMovimientoId, actualizarCantidadProductoAPI } from '../services/AlmacenAPI'

const DetalleMovimiento = ({ setViewDetalle, movimientosDetalles, visible, ListarKardex }) => {
    const data = []
    movimientosDetalles.map((movimiento, index) => (
        data.push({
            orden: index + 1,
            idDetalleMovimiento: movimiento.idDetalleMovimientoInventario,
            producto: movimiento.nombreProducto,
            cantidad: movimiento.cantidad,
            movimiento: movimiento.tipoMovimiento,
            codigoDocumento: movimiento.codigoDocumento

        })
    ))

    const [mostrarEditMovimientoDetalle, setMostrarEditMovimientoDetalle] = useState(false)

    const [material, setMaterial] = useState({
        nombre: '',
        cantidad: 0,
        idDetalleMovimientoInventario: 0,
        fk_productoAlmacen: 0
    })

    const editarCantidadDetalleMovimiento = async (idDetalleMovimiento) => {

        const { nombreProducto, cantidad, idDetalleMovimientoInventario, fk_productoAlmacen } = await obtenerDetalleMovimientoId(idDetalleMovimiento)
        setMaterial({
            nombre: nombreProducto,
            cantidad: cantidad,
            idDetalleMovimientoInventario: idDetalleMovimientoInventario,
            fk_productoAlmacen: fk_productoAlmacen
        })

        setMostrarEditMovimientoDetalle(true)
    }

    const onChangeCantidad = (e) => {
        setMaterial({
            ...material,
            cantidad: parseInt(e.target.value)
        })
    }

    const actualizarCantidadProducto = async () => {
        console.log(material);
        const data = await actualizarCantidadProductoAPI(material.idDetalleMovimientoInventario, material.fk_productoAlmacen, material.cantidad)
        console.log(data);
        ListarKardex();
    }

    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
        },
        {
            title: 'Codigo documento',
            dataIndex: 'codigoDocumento',
            key: 'codigoDocumento',
        },
        {
            title: 'Producto',
            dataIndex: 'producto',
            key: 'producto',
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'Movimiento',
            dataIndex: 'movimiento',
            key: 'movimiento',
        },
        {
            title: 'Action',
            dataIndex: 'idDetalleMovimiento',
            key: 'idDetalleMovimiento',
            width: 60,
            render: (idDetalleMovimiento) => (

                <Space size="middle">
                    <EyeOutlined
                        onClick={() => editarCantidadDetalleMovimiento(idDetalleMovimiento)}
                    />
                </Space>
            ),
        }

    ];


    return (

        <Drawer
            title="Detalles del movimiento"
            placement={'bottom'}
            closable={false}
            onClose={() => setViewDetalle(false)}
            visible={visible}
            key={'bottom'}
        >
            <Table size="small" dataSource={data} columns={columns} />

            {/* editando la cantidad */}
            <Drawer
                placement="bottom"
                title="Editando cantidad del material"
                width={320}
                closable={false}
                onClose={() => setMostrarEditMovimientoDetalle(false)}
                visible={mostrarEditMovimientoDetalle}
            >
                <p>{material.nombre}</p>
                <Space>
                    <Input value={material.cantidad} onChange={onChangeCantidad} />
                    <Button type="primary" onClick={() => actualizarCantidadProducto()}>Actualizar</Button>
                </Space>
            </Drawer>

        </Drawer>



    )
}

export default DetalleMovimiento
