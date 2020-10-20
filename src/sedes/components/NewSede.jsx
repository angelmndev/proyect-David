import React from 'react'
import { Card, Input, Form, Button } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons';

//notification
import { openNotificationWithIcon } from './Notification'

//api
import { postSede } from '../services/sedesApi'

const NewSede = ({ fetchSedes }) => {


    const insertSede = async (value) => {
        const success = await postSede(value);

        if (success) {
            fetchSedes();
            openNotificationWithIcon('success', 'bottomLeft')
        }



    }

    return (
        <Card title="Añadir nueva sede" bordered={true} style={{ marginLeft: '2em', marginRight: '2em' }}>
            <Form
                layout="vertical"
                onFinish={insertSede}
            >
                <Form.Item
                    label="Escribe la sede"
                    name="nombreSede"
                    rules={[{ required: true, message: 'Por favor escriba un sede!' }]}
                >
                    <Input prefix={<EnvironmentOutlined />} placeholder="Ica" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Añadir</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default NewSede
