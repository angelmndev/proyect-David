import React, { useState, useEffect } from 'react'
import moment from 'moment';
import 'moment/locale/es';
import locale from 'antd/es/locale/es_ES';
import { Card, Row, Col, Form, Select, InputNumber, Button, DatePicker, ConfigProvider, Space } from 'antd'
import {
    obtenerPrecioReferencialProductoAPI,
    listaCodInventarioSedeAPI,
    obtenerProductosPorSede,
    obtenerSedeInventarioAPI,
    registrarInventarioInicial
} from '../services/inventarioAPI'

import { openNoticationProductoInicializado } from './Notificaciones'
const InicializarInventario = () => {

    const { Option } = Select
    const [form] = Form.useForm();
    const fecha = new Date()

    //cod inventario por sede
    const [listCodInventario, setListCodInventario] = useState([])

    //lista de productos
    const [listaDeProductos, setListaDeProductos] = useState([])

    //precio productoBase
    const [precio, setPrecio] = useState(0)

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



    }

    const onChagePrecioActual = (valor) => {
        setPrecio(valor)
    }

    //registrar producto en inventario inicial
    const finish = async (material) => {

        //asignando fecha al objeto
        const nuevoMaterial = {
            ...material,
            fechaCliente: material['fecha'].format('YYYY-MM-DD')
        }

        const { success } = await registrarInventarioInicial(nuevoMaterial)
        if (success) {
            form.resetFields()
            openNoticationProductoInicializado('success')
        }
    }



    const buttonCancelar = () => {
        setPrecio(0)
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
                                placeholder="ICA-0061"
                                allowClear
                                onChange={handleAlmacenInventario}
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
                            rules={[{ required: true, message: 'Escriba el precio del material !' }]}>
                            <InputNumber

                                onChange={onChagePrecioActual}
                                style={{ width: '100%' }}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item

                            name="cantidadProductoAlmacen"
                            label="Cantidad del material"
                            rules={[{ required: true, message: 'Escriba la cantidad  del material !' }]}>
                            <InputNumber
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>

                    <Col md={12}>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginTop: '1em' }}
                            >
                                Registrar producto actual en almacén
                        </Button>
                            <Button
                                type="primary"
                                onClick={buttonCancelar}
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

export default InicializarInventario
