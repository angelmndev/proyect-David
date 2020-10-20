import React, { useState, useEffect } from 'react'
import moment from 'moment';
import 'moment/locale/es';
import locale from 'antd/es/locale/es_ES';
import { Card, Row, Col, Form, Select, Input, InputNumber, Button, DatePicker, ConfigProvider, Space } from 'antd'
import {
    listaCodInventarioSedeAPI,
    obtenerSedeInventarioAPI,
    obtenerProductosPorSede,
    obtenerPrecioReferencialProductoAPI,
    registroSalidaAlmacenAPI,
    obtenerCantidadProductoAPI
} from '../services/inventarioAPI'

import { openNotificationCantidadNoExiste, openNotificationSalidaInventario } from './Notificaciones'

const SalidaInventario = ({ cargarKardex }) => {
    const { Option } = Select
    const [form] = Form.useForm();
    const fecha = new Date()


    //cod inventario por sede
    const [listCodInventario, setListCodInventario] = useState([])

    //lista de productos
    const [listaDeProductos, setListaDeProductos] = useState([])

    //precio productoBase
    const [precio, setPrecio] = useState(0)

    //cantidadActual
    const [cantidadActual, setCantidadActual] = useState(0)
    //listando inventarios code
    const listarCodInventario = async () => {
        const response = await listaCodInventarioSedeAPI()
        setListCodInventario(response)
    }

    //cambiar idInventario y obtener sede
    const handleAlmacenInventario = async (idInventario) => {

        const { fk_sede } = await obtenerSedeInventarioAPI(idInventario)
        const productos = await obtenerProductosPorSede(fk_sede)
        setListaDeProductos(productos)
    }



    //obtener referencial del producto 
    const obtenerPrecioReferencialProducto = async (idProducto) => {

        const producto = await obtenerPrecioReferencialProductoAPI(idProducto)
        const precioActual = producto.precio
        form.setFieldsValue({ costoProductoAlmacen: precioActual })
        setPrecio(precioActual)


        //mostrando cantidad
        const { productoCantidad, success } = await obtenerCantidadProductoAPI(idProducto)

        if (success) {
            const cantidadActual = productoCantidad.cantidadProductoAlmacen
            setCantidadActual(cantidadActual)
            form.setFieldsValue({ cantidadProductoAlmacenVista: cantidadActual })

        } else {
            openNotificationCantidadNoExiste('warning')
            setCantidadActual(0)
            form.setFieldsValue({ cantidadProductoAlmacenVista: 0 })

        }





    }

    const onChagePrecioActual = (valor) => {
        setPrecio(valor)
    }

    const finish = async (material) => {

        //asignando fecha al objeto
        const nuevoMaterial = {
            ...material,
            fechaCliente: material['fecha'].format('YYYY-MM-DD')
        }

        const { success } = await registroSalidaAlmacenAPI(nuevoMaterial)
        if (success) {
            setPrecio(0)
            form.resetFields()
            openNotificationSalidaInventario('success')
            cargarKardex()
        }
    }


    const limpiarCampos = () => {
        form.resetFields()
    }

    useEffect(() => {
        listarCodInventario()
    }, [])




    return (
        <Card>
            <Form
                form={form}
                onFinish={finish}
                layout="vertical"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 20 }}
            >
                <Row>
                    <Col md={8}>
                        <Form.Item
                            name="movimiento"
                            label="Tipo de movimiento"
                            initialValue="SALIDA"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="fecha"
                            label="Fecha"
                            style={{ width: '100%' }}
                            initialValue={moment(fecha, 'YYYY-MM-DD')}
                        >

                            <ConfigProvider locale={locale}>
                                <DatePicker
                                    disabled
                                    defaultValue={moment(fecha, 'YYYY-MM-DD')}
                                    style={{ width: '100%' }}

                                />
                            </ConfigProvider>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            label="Seleccione su codigo de almacen"
                            name="fk_inventario"
                            rules={[{ required: true, message: 'Seleccione su almacen !' }]}
                        >
                            <Select
                                onChange={handleAlmacenInventario}
                                placeholder="Selecciona el inventario"
                                allowClear
                            >
                                {
                                    listCodInventario.map((inventario) => (
                                        <Option
                                            key={inventario.codigoInventario}
                                            value={inventario.codigoInventario}
                                        >
                                            {`${inventario.nombreSede} - ${inventario.codigoInventario}`}
                                        </Option>
                                    ))
                                }

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col md={8}>
                        <Form.Item
                            name="fk_producto"
                            label="Seleccione el material"
                            rules={[{ required: true, message: 'Escriba el nombre del material !' }]}>
                            <Select
                                onChange={obtenerPrecioReferencialProducto}
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Seleccione el material a ingresar"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >

                                {
                                    listaDeProductos.map((producto) => (
                                        <Option key={producto.idProducto} value={producto.idProducto}>{producto.nombreProducto}</Option>
                                    ))
                                }


                            </Select>
                        </Form.Item>
                    </Col>

                    <Col md={8}>
                        <Form.Item
                            name="costoProductoAlmacen"
                            label="Precio del material"
                            initialValue={precio}

                        >
                            <InputNumber
                                disabled
                                onChange={onChagePrecioActual}
                                style={{ width: '100%' }}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="cantidadProductoAlmacenVista"
                            label="Cantidad del material Actual"
                        >
                            <InputNumber
                                disabled
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="cantidadProductoAlmacen"
                            label="Cantidad del material a retirar"
                            rules={[{ required: true, message: 'Escriba la cantidad  del material !' }]}>
                            <InputNumber
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="personaResponsable"
                            label="Escriba la persona que recibio los materiales"
                            rules={[{ required: true, message: 'Escriba el nombre de la persona !' }]}>
                            <Input placeholder="nombre de la persona" />
                        </Form.Item>
                    </Col>

                    <Col md={24}>
                        <Space>
                            {
                                cantidadActual > 0 ?
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ marginTop: '1em' }}
                                    >
                                        Registrar Salida del material en almacén
                                </Button>
                                    : <Button
                                        disabled
                                        type="primary"
                                        htmlType="submit"
                                        style={{ marginTop: '1em' }}
                                    >
                                        Registrar Salida del material en almacén
                            </Button>
                            }
                            <Button

                                type="primary"
                                onClick={limpiarCampos}
                                style={{ marginTop: '1em' }}
                            >
                                Limpiar campos
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </Card >
    )
}

export default SalidaInventario
