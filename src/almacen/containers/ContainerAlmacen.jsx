import React, { useState, useEffect } from 'react'
import { Tabs, Descriptions } from 'antd'
import InicializarAlmacen from '../components/InicializarAlmacen'
import IngresoAlmacen from '../components/IngresoAlmacen'
import SalidaAlmacen from '../components/SalidaAlmacen'
import KardexAlmacen from '../components/KardexAlmacen'
import { listaKardexAlmacenAPI, listaMovimientosAlmacenAPI } from '../services/AlmacenAPI'
import MovimientosAlmacen from '../components/MovimientosAlmacen'
import AlmacenesMovimientos from '../components/AlmacenesMovimientos'
import ProductosPorSedesAlmacen from '../components/ProductosPorSedesAlmacen'

const ContainerAlmacen = () => {

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
                    <IngresoAlmacen listaKardex={ListarKardex} ListarMovimientos={ListarMovimientos} />

                </TabPane>
                <TabPane tab="Salidas" key="2">
                    <SalidaAlmacen listaKardex={ListarKardex} ListarMovimientos={ListarMovimientos} />

                </TabPane>
                <TabPane tab="Kardex" key="3">
                    <KardexAlmacen listaKardex={listaKardex} />
                </TabPane>
                <TabPane tab="Movimientos" key="4">
                    <MovimientosAlmacen listaMovimientos={listaMovimientos} ListarKardex={ListarKardex} />
                </TabPane>
                <TabPane tab="Inicializar almacen" key="5">
                    <InicializarAlmacen />
                </TabPane>
                <TabPane tab="Movimientos entre almacenes" key="6">
                    <AlmacenesMovimientos listarKardex={ListarKardex} />
                </TabPane>
                <TabPane tab="Productos por sedes y almacén" key="7">
                    <ProductosPorSedesAlmacen />
                </TabPane>
            </Tabs>
        </>
    )
}

export default ContainerAlmacen
