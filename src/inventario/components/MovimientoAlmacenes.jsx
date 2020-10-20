import React from 'react'
import moment from 'moment';
import 'moment/locale/es';
import locale from 'antd/es/locale/es_ES';
import { Card, Form, Row, Col, DatePicker, ConfigProvider, Select, Input, Space, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const MovimientoAlmacenes = () => {
    const { Option } = Select
    const [form] = Form.useForm();
    const fecha = new Date()
    return (
        <>
            <Form
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
                                    placeholder="Escoge tu almacen origen"
                                >
                                    <Option value="GENERAL">ALMACEN GENERAL</Option>
                                    <Option value="MANTENIMIENTO">ALMACEN MANTENIMIENTO</Option>
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
                                    <Option value="GENERAL">ALMACEN GENERAL</Option>
                                    <Option value="MANTENIMIENTO">ALMACEN MANTENIMIENTO</Option>
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
                            <Form.List name="users">
                                {(fields, { add, remove }) => {
                                    return (
                                        <div>
                                            {fields.map(field => (
                                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                                    <Form.Item
                                                        {...field}
                                                        label="Escoga el material"
                                                        name={[field.name, 'first']}
                                                        fieldKey={[field.fieldKey, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <Input style={{ width: '385px' }} placeholder="First Name" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        label="Ingrese la cantidad"
                                                        name={[field.name, 'last']}
                                                        fieldKey={[field.fieldKey, 'last']}
                                                        rules={[{ required: true, message: 'Missing last name' }]}
                                                    >
                                                        <Input style={{ width: '100px' }} placeholder="Last Name" />
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
                                                    <PlusOutlined /> Agregar materiales a enviar
                </Button>
                                            </Form.Item>
                                        </div>
                                    );
                                }}
                            </Form.List>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Enviar materiales
        </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

            </Form>
        </>
    )
}

export default MovimientoAlmacenes
