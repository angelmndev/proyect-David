import React, { useState, useEffect } from 'react'
import { Descriptions, Tabs } from 'antd'
import IngresoInventario from '../components/IngresoInventario'
import SalidInventario from '../components/SalidaInventario'
import { listaKardexAlmacenAPI, listaMovimientosAlmacenAPI } from '../services/inventarioAPI'
import KardexInventario from '../components/KardexInventario'
import MovimientosInventario from '../components/MovimientosInventario'
import InicializarInventario from '../components/InicializarInventario';
import MovimientoAlmacenes from '../components/MovimientoAlmacenes';

const InventarioContainer = () => {
    const { TabPane } = Tabs

    const [listaKardex, setKardex] = useState([])
    const [listaMovimientos, setMovimientos] = useState([])


    const ListarKardex = async () => {
        const data = await listaKardexAlmacenAPI()
        setKardex(data)
    }

    const ListarMovimientos = async () => {
        const data = await listaMovimientosAlmacenAPI()
        setMovimientos(data)
    }

    useEffect(() => {
        ListarKardex()
        ListarMovimientos()
    }, [])

    return (
        <>
            <Descriptions title="Nuestro Almacén">
                <Descriptions.Item>
                    Bienvenido a la sección Almacén.
                </Descriptions.Item>

            </Descriptions>
            <Tabs type="card" >
                <TabPane tab="Ingresos" key="1">
                    <IngresoInventario cargarKardex={ListarKardex} />

                </TabPane>
                <TabPane tab="Salidas" key="2">
                    <SalidInventario cargarKardex={ListarKardex} />

                </TabPane>
                <TabPane tab="Kardex" key="3">
                    <KardexInventario listaKardex={listaKardex} />
                </TabPane>
                <TabPane tab="Movimientos" key="4">
                    <MovimientosInventario listaMovimientos={listaMovimientos} />
                </TabPane>
                <TabPane tab="Inicializar almacen" key="5">
                    <InicializarInventario />
                </TabPane>
                <TabPane tab="Movimientos entre almacenes" key="6">
                    <MovimientoAlmacenes />
                </TabPane>
            </Tabs>

        </>
    )
}

export default InventarioContainer
