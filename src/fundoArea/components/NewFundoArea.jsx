import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Select } from 'antd'

//api
import { getSedes } from '../../sedes/services/sedesApi'
import { obtenerFundoPorSede } from '../../fundo/services/fundoApi'
import { getAreas } from '../../area/services/areaApi'
import { insertarFundoAreaApi } from '../services/fundoAreaApi'
import { GetCecoSede } from '../../ceco/services/cecosApi'
import { getUsuariosApi } from '../../usuario/services/usuarioApi'
//notification
import { openNotificationSuccess } from '../components/Notification'

const NewAreaFundo = ({ listFundosAreas }) => {
    const { Option } = Select;
    const [form] = Form.useForm();

    const [sedes, guardarSedes] = useState([]);
    const [fundos, guardarFundos] = useState([]);
    const [areas, guardarAreas] = useState([]);
    const [cecos, guardarCecos] = useState([]);
    const [usuarios, guardarUsuarios] = useState([]);

    useEffect(() => {
        getSedes()
            .then(sedes => guardarSedes(sedes))
            .catch(error => console.log(error))

        getAreas()
            .then(areas => guardarAreas(areas))
            .catch(error => console.log(error))

        getUsuariosApi()
            .then(usuarios => guardarUsuarios(usuarios))
            .catch(error => console.log(error))

    }, [])

    //filtros por selects

    //cambiar sede y establecer fundo
    const changeSedes = async (idSede) => {
        const responseFundos = await obtenerFundoPorSede(idSede)
        const responseCecos = await GetCecoSede(idSede)
        guardarCecos(responseCecos)
        guardarFundos(responseFundos)
    }



    const insertarFundoArea = async (values) => {

        const { success } = await insertarFundoAreaApi(values);
        if (success) {
            openNotificationSuccess()
            listFundosAreas()
            form.resetFields();

        }
    }

    return (
        <Card title="Designación general" bordered={true} style={{ marginLeft: '2em', marginRight: '2em' }}>
            <Form
                layout="vertical"
                onFinish={insertarFundoArea}
                form={form}
            >

                <Form.Item
                    name="fk_sede"
                    label="Seleccione la sede"
                    rules={[{ required: true, message: 'Por favor seleccione una sede!' }]}
                >
                    <Select
                        placeholder="escoge la sede"
                        onChange={changeSedes}
                    >
                        {
                            sedes.map((item) => (
                                <Option key={item.idSede} value={item.idSede}>{item.nombreSede}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="fk_fundo"
                    label="Seleccione el fundo"
                    rules={[{ required: true, message: 'Por favor seleccione una fundo!' }]}>
                    <Select placeholder="escoge el fundo">
                        {
                            fundos.map((item) => (
                                <Option key={item.idFundo} value={item.idFundo}>{item.nombreFundo}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item name="fk_area" label="Seleccione el área" rules={[{ required: true, message: 'Por favor seleccione una area!' }]}>
                    <Select
                        placeholder="Seleccione el área"
                        allowClear
                    >
                        {
                            areas.map((item) => (
                                <Option key={item.idArea} value={item.idArea}>{item.nombreArea}</Option>
                            ))
                        }

                    </Select>
                </Form.Item>

                <Form.Item name="fk_ceco" label="Designe el ceco" rules={[{ required: true, message: 'Por favor seleccione una ceco!' }]}>
                    <Select
                        placeholder="Designe el ceco"
                        allowClear
                    >
                        {
                            cecos.map((item) => (
                                <Option key={item.idCeco} value={item.idCeco}>{item.nombreCeco}</Option>
                            ))
                        }

                    </Select>
                </Form.Item>
                <Form.Item name="fk_usuario" label="Designe usuario" rules={[{ required: true, message: 'Por favor designe un usuario!' }]}>
                    <Select
                        placeholder="Designe el usuario"
                        allowClear
                    >
                        {
                            usuarios.map((item) => (
                                <Option key={item.idUsuario} value={item.idUsuario}>{item.nombrePersonalUsuario}-{item.apellidoPersonalUsuario}</Option>
                            ))
                        }

                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" type="primary">Designar</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default NewAreaFundo
