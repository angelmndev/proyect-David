import React from 'react'
import { Card, Input, Form, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons';

import { createRolApi } from '../services/rolApi'

//notification
import { openNotificationSuccess } from '../components/Notification'

const NewRol = ({ listarRoles }) => {
    const [form] = Form.useForm();
    const insertarRol = async (values) => {
        const { success } = await createRolApi(values)

        if (success) {
            listarRoles()
            openNotificationSuccess()
            form.resetFields();
        }
    }

    return (
        <Card title="Añadir nuevo rol" bordered={true} style={{ marginLeft: '2em', marginRight: '2em' }}>
            <Form
                layout="vertical"
                onFinish={insertarRol}
                form={form}
            >
                <Form.Item
                    label="Escribe el Rol"
                    name="nombreRol"
                    rules={[{ required: true, message: 'Por favor escriba un rol!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Administrador" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Añadir</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default NewRol
