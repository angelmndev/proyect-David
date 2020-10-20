import React from 'react'
import { Card, Input, Form, Button } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons';

//notification
import { openNotificationSuccess } from './Notification'

//api
import { postArea } from '../services/areaApi'

const NewArea = ({ listarAreas }) => {
    const [form] = Form.useForm();

    const insertArea = async (value) => {
        const success = await postArea(value);

        if (success) {
            form.resetFields();
            listarAreas();
            openNotificationSuccess();
        }
    }

    return (
        <Card title="Añadir nueva área" bordered={true} style={{ marginLeft: '2em', marginRight: '2em' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={insertArea}
            >
                <Form.Item
                    label="Escribe el nombre del área"
                    name="nombreArea"
                    rules={[{ required: true, message: 'Por favor escriba un área!' }]}
                >
                    <Input prefix={<EnvironmentOutlined />} placeholder="administración" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Añadir</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default NewArea
