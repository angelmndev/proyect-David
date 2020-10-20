import React, { useState, useEffect } from 'react'
import { Card, Input, Form, Button, Select } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons';
import { openNotificationSuccess } from './Notification'
//api sede
import { getSedes } from '../../sedes/services/sedesApi'
//api fundo 
import { postFundo } from '../services/fundoApi'

const NewFundo = ({ listarFundos }) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [sedes, setSedes] = useState([]);


    const fetchSedes = async () => {
        const sedes = await getSedes();
        setSedes(sedes);
    }

    useEffect(() => {
        fetchSedes()
    }, [])

    const insertFundo = async (values) => {
        const { success } = await postFundo(values);
        if (success) {
            openNotificationSuccess();
            listarFundos()
            form.resetFields();
        }
    }


    return (
        <Card title="Añadir nuevo fundo" bordered={true} style={{ marginLeft: '2em', marginRight: '2em' }}>
            <Form
                layout="vertical"
                onFinish={insertFundo}
                form={form}
            >
                <Form.Item name="fk_sede" label="Seleccione la sede que pertenecerá al fundo" rules={[{ required: true, message: 'Por favor seleccione una sede!' }]}>
                    <Select
                        placeholder="Seleccione la sede"
                        allowClear
                    >
                        {
                            sedes.map((item) => (
                                <Option key={item.idSede} value={item.idSede}>{item.nombreSede}</Option>
                            ))
                        }

                    </Select>
                </Form.Item>

                <Form.Item
                    label="Escribe el nombre del fundo"
                    name="nombreFundo"
                    rules={[{ required: true, message: 'Por favor escriba el nombre del fundo!' }]}
                >
                    <Input prefix={<EnvironmentOutlined />} placeholder="castillos" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Añadir</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default NewFundo
