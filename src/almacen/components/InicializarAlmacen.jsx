import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, DatePicker, Select, Space, Button, InputNumber } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

//api sedes
import { getSedes } from '../../sedes/services/sedesApi'
//api inventarios
import {
    obtenerAlmacenPorSede,
    obtenerMaterialesPorAlmacen,
    registrarInicializacionAlmacen,
    validarMaterialExistente
} from '../services/AlmacenAPI'

//notificacion
import { openNoticationProductoInicializado, openNoticationProductoYaExiste } from './Notificacion'

const InicializarAlmacen = () => {
    const { Option } = Select


    const [form] = Form.useForm();

    const [sedes, setSedes] = useState([])
    const [almacenes, setAlmacenes] = useState([])
    const [materiales, setMateriales] = useState([])

    useEffect(() => {
        getSedes()
            .then(response => setSedes(response))
            .catch(err => console.log(err))
    }, [])

    //cambiar sede
    const cambiarSelectSede = async (fk_sede) => {

        //obteniendo almacenes por sede
        const { almacenes } = await obtenerAlmacenPorSede(fk_sede)
        setAlmacenes(almacenes)

        //obteniendo materiales por sede
        const { materiales } = await obtenerMaterialesPorAlmacen(fk_sede)
        setMateriales(materiales)
    }


    const onChangeMaterial = async (idProducto) => {
        const fk_inventario = form.getFieldValue('fk_inventario')
        const { success } = await validarMaterialExistente(idProducto, fk_inventario)
        if (success) {
            openNoticationProductoYaExiste('warning')
        }
    }

    const registrarMateriales = async (values) => {

        //asignando fecha al objeto
        const nuevoMaterial = {
            ...values,
            fecha: values['fecha'].format('YYYY-MM-DD')
        }

        const { success } = await registrarInicializacionAlmacen(nuevoMaterial)

        if (success) {
            openNoticationProductoInicializado('success')
            form.resetFields()

        }
    }

    return (
        <>
            <Form
                onFinish={registrarMateriales}
                layout="vertical"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 20 }}
                form={form}
            >

                <Card>
                    <Row justify="center">
                        <Col md={4}>
                            <Form.Item
                                name="fecha"
                                label="Fecha"
                                initialValue={moment()}
                            >
                                <DatePicker disabled />
                            </Form.Item>
                        </Col>
                        <Col md={5}>
                            <Form.Item
                                label="Seleccione su sede"
                                name="fk_sede"
                                rules={[{ required: true, message: 'falta escoger su sede' }]}
                            >
                                <Select
                                    placeholder="escoga su sede"
                                    allowClear
                                    onChange={cambiarSelectSede}
                                >
                                    {
                                        sedes.map((sede) => (
                                            <Option
                                                key={sede.idSede}
                                                value={sede.idSede}
                                            >
                                                {sede.nombreSede}
                                            </Option>
                                        ))
                                    }

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={6}>
                            <Form.Item
                                label="Seleccione su almacen"
                                name="fk_inventario"
                                rules={[{ required: true, message: 'falta escoger su almacén' }]}
                            >
                                <Select
                                    placeholder="escoga su almacén"
                                    allowClear

                                >
                                    {
                                        almacenes.map((almacen) => (
                                            <Option
                                                key={almacen.codigoInventario}
                                                value={almacen.codigoInventario}
                                            >
                                                {almacen.nombreInventario}
                                            </Option>
                                        ))
                                    }

                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ marginTop: '2em' }}>
                    <Row justify='center'>
                        <Col md={14}>
                            <Form.List name="materiales">
                                {(fields, { add, remove }) => {
                                    return (
                                        <div>
                                            {fields.map((field) => (
                                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">

                                                    <Form.Item
                                                        {...field}
                                                        label="Material"
                                                        name={[field.name, 'material']}
                                                        fieldKey={[field.fieldKey, 'material']}
                                                        rules={[{ required: true, message: 'escoge tu material' }]}
                                                    >

                                                        <Select
                                                            showSearch
                                                            style={{ width: 400 }}
                                                            placeholder="Selecciona un material"
                                                            optionFilterProp="children"
                                                            onChange={onChangeMaterial}
                                                            // onFocus={onFocus}
                                                            // onBlur={onBlur}
                                                            // onSearch={onSearch}
                                                            filterOption={(input, option) =>
                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                            }
                                                        >
                                                            {
                                                                materiales.map((material) => (
                                                                    <Option key={material.idProducto} value={material.idProducto}>{material.nombreProducto}</Option>
                                                                ))
                                                            }

                                                        </Select>


                                                    </Form.Item>
                                                    <Form.Item

                                                        {...field}
                                                        label="Precio"

                                                        name={[field.name, 'precio']}
                                                        fieldKey={[field.fieldKey, 'precio']}

                                                        rules={[{ required: true, message: 'Escriba el precio del material !' }]}>
                                                        <InputNumber
                                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                        />
                                                    </Form.Item>

                                                    <Form.Item
                                                        {...field}
                                                        label="Cantidad"

                                                        name={[field.name, 'cantidad']}
                                                        fieldKey={[field.fieldKey, 'cantidad']}

                                                        rules={[{ required: true, message: 'ingrese la cantidad' }]}
                                                    >
                                                        <InputNumber />
                                                    </Form.Item>


                                                    <MinusCircleOutlined
                                                        onClick={() => {
                                                            remove(field.name);
                                                        }}
                                                    />
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => {
                                                        add();
                                                    }}
                                                    block
                                                >
                                                    <PlusOutlined /> Agregar material
                                                    </Button>
                                            </Form.Item>
                                        </div>
                                    );
                                }}
                            </Form.List>

                        </Col>
                        <Col md={16}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block >
                                    Registrar materiales
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

            </Form>
        </>
    )
}

export default InicializarAlmacen
