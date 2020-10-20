import React, { useState } from 'react'
import moment from 'moment';
import 'moment/locale/es';
import locale from 'antd/es/locale/es_ES';
import { Card, Form, Row, Col, DatePicker, ConfigProvider, Select, Input, InputNumber, Space, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { openNotificationIngresoInventario } from './Notificacion';
import {
    getMaterialbyStock,
    validarMaterialExistente,
    moverMateriales
} from '../services/AlmacenAPI'

const AlmacenesMovimientos = ({ listarKardex }) => {
    const [materiales, setMateriales] = useState([])
    const { Option } = Select
    const [form] = Form.useForm();
    const fecha = new Date()
    const onChangeMaterial = async (idProducto) => {
        const almacenOrigen = form.getFieldValue('almacenOrigen')
        const { success } = await validarMaterialExistente(idProducto, almacenOrigen)
        if (success) {

        }
    }
    const onChangeAlmacenOrigen = async (idAlmacen) => {
        // alert(idAlmacen)
        const { materiales } = await getMaterialbyStock(idAlmacen);
        setMateriales(materiales);
    }

    const movimientoMateriales = async (values) => {

        //asignando fecha al objeto
        const nuevoMaterial = {
            ...values,
            fecha: values['fecha'].format('YYYY-MM-DD')
        }

        const { success } = await moverMateriales(nuevoMaterial)
        console.log(success)
        if (success) {
            openNotificationIngresoInventario('success')
            listarKardex()
            form.resetFields()
        }
    }
    return (
        <>
            <Form
                onFinish={movimientoMateriales}
                form={form}
                layout="vertical"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 20 }}
            >

                <Card>
                    <Row justify="center">
                        <Col md={4}>
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
                        <Col md={4}>
                            <Form.Item
                                name="codigoDocumento"
                                label="Codigo de documento"
                                rules={[{ required: true, message: 'Escriba el codigo de documento !' }]}>
                                <Input placeholder="00-000-000" />
                            </Form.Item>
                        </Col>
                        <Col md={6}>
                            <Form.Item
                                label="Almacén origen"
                                name="almacenOrigen"
                                rules={[{ required: true, message: 'Escoge tu almacén origen !' }]}
                            >
                                <Select
                                    // style={{ width: 200 }}
                                    allowClear
                                    onChange={onChangeAlmacenOrigen}
                                    placeholder="Escoge tu almacen origen"
                                >
                                    <Option selected value="0061">ALMACEN GENERAL</Option>
                                    {/* <Option value="0062">ALMACEN MANTENIMIENTO</Option> */}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={6}>
                            <Form.Item
                                label="Almacén destino"
                                name="almacenDestino"
                                rules={[{ required: true, message: 'Escoge tu almacén destino !' }]}
                            >
                                <Select
                                    // style={{ width: 200 }}
                                    allowClear
                                    placeholder="Escoge tu almacen destino"
                                >
                                    {/* <Option value="0061">ALMACEN GENERAL</Option> */}
                                    <Option selected value="0062">ALMACEN MANTENIMIENTO</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={4}>
                            <Form.Item
                                name="usuarioResponsable"
                                label="Usuario responsable"
                                rules={[{ required: true, message: 'Escriba el nombre del usuario !' }]}
                            >
                                <Input placeholder="Escribe aqui el nombre" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ marginTop: '2em' }}>
                    <Row justify="center">
                        <Col md={12}>
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

export default AlmacenesMovimientos
