import React, { useState, useEffect } from 'react'
import { Form, Input, Row, Col, Button, Select } from 'antd'


//api
import { getRolesApi } from '../../rol/services/rolApi'
import { createUsuarioApi } from '../services/usuarioApi'


import { openNotificationSuccess } from '../components/Notification'

const NewUsuario = ({ listarUsuarios }) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]); //trae roles



    useEffect(() => {
        getRolesApi()
            .then(data => setRoles(data))

    }, []);

    const RegisterUser = async (values) => {

        const { success } = await createUsuarioApi(values);
        if (success) {
            listarUsuarios()
            openNotificationSuccess()
            form.resetFields()
        }
    }


    return (
        <Form onFinish={RegisterUser} form={form} layout="vertical" >
            <Row justify="space-around">
                <Col md={10}>
                    <Form.Item
                        name="nombrePersonalUsuario"
                        label="Nombres"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'ingresa los nombres' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={10}>
                    <Form.Item
                        name="apellidoPersonalUsuario"
                        label="Apellidos"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'ingresa los apellidos' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={10}>
                    <Form.Item
                        extra="El nombre de usuario solo puede ser de 6 caracteres."
                        name="nombreUsuario"
                        label="nombre de usuario"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'ingresa el nombre de usuario' }]}
                    >
                        <Input maxLength={6} />
                    </Form.Item>
                </Col>
                <Col md={10}>
                    <Form.Item
                        name="claveUsuario"
                        label="clave de usuario"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'ingresa la clave' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col md={22}>
                    <Form.Item
                        name="fk_rol"
                        label="seleccione el rol de usuario"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'ingrese el rol' }]}
                    >
                        <Select
                            placeholder="Selecciona un rol"
                            allowClear
                        >
                            {
                                roles.map((rol) => (
                                    <Option key={rol.idRol} value={rol.idRol}>{rol.nombreRol}</Option>
                                ))
                            }

                        </Select>
                    </Form.Item>
                </Col>
                <Col md={22}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Registrar
                         </Button>
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    )
}

export default NewUsuario
