import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Col, Row, Select, InputNumber } from 'antd'
import { openNotificationSuccess } from '../components/Notification'

import { CreateCeco } from '../services/cecosApi'
import { getSedes } from '../../sedes/services/sedesApi'

const NewCeco = ({ obtenerCecos }) => {
    const { Option } = Select;
    const [form] = Form.useForm();

    const [sedes, setSedes] = useState([]);

    const registrarCeco = async (values) => {
        const { success } = await CreateCeco(values)

        if (success) {
            openNotificationSuccess()
            form.resetFields();
            obtenerCecos()
        }
    }

    useEffect(() => {
        getSedes()
            .then(data => setSedes(data))
    }, [])
    return (
        <Form onFinish={registrarCeco} form={form}>
            <Row>
                <Col md={10}>
                    <Form.Item
                        name="codigoCeco"
                        label="Codigo CECO"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escriba el codigo CECO !' }]}>
                        <Input placeholder="00102414" />
                    </Form.Item>

                </Col>
                <Col md={10}>
                    <Form.Item
                        name="nombreCeco"
                        label="nombre del CECO"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escriba el nombre del CECO !' }]}>
                        <Input placeholder="fumigadoras" />
                    </Form.Item>
                </Col>
                <Col md={10}>
                    <Form.Item
                        name="fk_sede"
                        label="Sede"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escoge la sede !' }]}>
                        <Select
                            placeholder="Selecciona un categoria"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            {
                                sedes.map((sede) => (
                                    <Option key={sede.idSede} value={sede.idSede}>{sede.nombreSede}</Option>
                                ))
                            }

                        </Select>
                    </Form.Item>
                </Col>
                <Col md={10}>
                    <Form.Item
                        name="presupuestoCeco"
                        label="presupuesto del CECO"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escriba el presupuesto !' }]}>
                        <InputNumber
                            style={{ width: '100%' }}

                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        // onChange={onChange}
                        />
                    </Form.Item>
                </Col>
                <Col md={24} >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginTop: '1em' }}
                    >
                        Añadir CECO
                    </Button>
                </Col>
            </Row>
        </Form >
    )
}

export default NewCeco
