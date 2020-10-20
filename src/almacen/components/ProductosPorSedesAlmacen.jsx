import React, { useEffect, useState } from 'react'
import { Select, Card, Col, Row, Button, Space } from 'antd';

//APIS
import { getSedes } from '../../sedes/services/sedesApi'
import { obtenerAlmacenPorSede, listarProductosSedesAlmacen } from '../services/AlmacenAPI'
import ListaProductosFiltradosPorSedeAlmacen from './ListaProductosFiltradosPorSedeAlmacen'
const ProductosPorSedesAlmacen = () => {
    const { Option } = Select;



    const [sedes, setSedes] = useState([])
    const [almacenes, setAlmacenes] = useState([])

    //state de mi filtro personalizado
    const [sedeyAlmacenEscogido, setSedeyAlmacenEscogido] = useState({
        sede: 0,
        todos: false,
        almacen: ''
    })

    useEffect(() => {
        getSedes()
            .then(data => setSedes(data))
    }, [])

    const handleChangeSede = async (value) => {
        console.log(`selected sede id: ${value}`);
        const { almacenes } = await obtenerAlmacenPorSede(value);
        setAlmacenes(almacenes)

        setSedeyAlmacenEscogido({
            ...sedeyAlmacenEscogido,
            sede: value
        })
    }

    const handleChangeAlmacen = (value) => {
        console.log(`selected almacen id:${value}`);

        if (value === 'TODOS') {

            setSedeyAlmacenEscogido({
                ...sedeyAlmacenEscogido,
                todos: true
            })

        } else {
            setSedeyAlmacenEscogido({
                ...sedeyAlmacenEscogido,
                todos: false,
                almacen: value
            })
        }

    }


    const filtrarProductos = async () => {
        const respuestadeApi = await listarProductosSedesAlmacen(sedeyAlmacenEscogido)


        /**
         * estos datos obtenidos de la api tendra q trabajarlo el frontend
         * y mostrarlos en la tabla.
         */
        console.log(respuestadeApi);
    }
    return (
        <>
            <Card>
                <Row justify="center">
                    <Space>
                        <Col>

                            <Select
                                placeholder="ESCOGE LA SEDE"
                                style={{ width: 200 }}
                                onChange={handleChangeSede}>

                                {
                                    sedes.map((item) => (
                                        <Option key={item.idSede} value={item.idSede}>{item.nombreSede}</Option>
                                    ))
                                }

                            </Select>
                        </Col>
                        <Col>

                            <Select
                                placeholder="ESCOGE EL ALMACEN"
                                style={{ width: 300 }}
                                onChange={handleChangeAlmacen}>
                                <Option value="TODOS">TODOS</Option>
                                {

                                    almacenes.map((item) => (
                                        <Option key={item.codigoInventario} value={item.codigoInventario}>{item.nombreInventario}</Option>
                                    ))
                                }

                            </Select>
                        </Col>
                        <Col>
                            <Button onClick={filtrarProductos} type="primary" block>Filtrar</Button>
                        </Col>
                    </Space>
                </Row>

            </Card>
            <Card style={{ marginTop: '1em' }}>
                {/* mis productos estaran listados aqui dentro de este componente */}
                <ListaProductosFiltradosPorSedeAlmacen />
            </Card>
        </>
    )
}

export default ProductosPorSedesAlmacen
