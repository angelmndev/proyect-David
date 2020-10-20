import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Col, Row, Select, InputNumber } from 'antd'
import { agregarNuevoProductoAPI } from '../services/materialesApi'
import { openNotificationSuccess } from './Notificaciones'
import { getAreas } from '../../area/services/areaApi'
import { ListCecos } from '../../ceco/services/cecosApi'
import { getCategoriasProductosAPI } from '../../categoriaProducto/services/categoriaProductosApi'

const NewProducto = ({ listarProductos }) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [areas, guardarArea] = useState([]);
    const [cecos, guardarCeco] = useState([]);
    const [categorias, guardarCategorias] = useState([]);


    const registrarProducto = async (values) => {
        const { success } = await agregarNuevoProductoAPI(values)

        if (success) {
            openNotificationSuccess()
            form.resetFields();
            listarProductos()
        }
    }

    useEffect(() => {
        getAreas()
            .then(areas => guardarArea(areas))

        ListCecos()
            .then(cecos => guardarCeco(cecos))

        getCategoriasProductosAPI()
            .then(categorias => guardarCategorias(categorias))
    }, [])



    return (
        <Form onFinish={registrarProducto} form={form}>
            <Row>
                <Col md={8}>
                    <Form.Item
                        name="skuProducto"
                        label="SKU Material"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escriba el SKU del material !' }]}>
                        <Input placeholder="00102414" />
                    </Form.Item>

                </Col>
                <Col md={8}>
                    <Form.Item
                        name="nombreProducto"
                        label="nombre del material"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escriba el nombre del material !' }]}>
                        <Input placeholder="radiador v3" />
                    </Form.Item>
                </Col>
                <Col md={8}>
                    <Form.Item
                        name="fk_categoria"
                        label="Categoria del material"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escriba la categoria del material !' }]}>
                        <Select
                            placeholder="Selecciona un categoria"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            {
                                categorias.map(categoria => (
                                    <Option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nombreCategoria}</Option>
                                ))
                            }

                        </Select>
                    </Form.Item>
                </Col>
                <Col md={8}>
                    <Form.Item
                        name="tipoProducto"
                        label="Tipo de mateiral"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escriba el tipo del material !' }]}>
                        <Select
                            placeholder="Selecciona el tipo de material"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="FUNGIBLE">FUNGIBLE</Option>
                            <Option value="NO FUNGIBLE">NO FUNGIBLE</Option>

                        </Select>
                    </Form.Item>
                </Col>
                <Col md={8}>
                    <Form.Item
                        name="precioReferencialProducto"
                        label="precio referencial del material"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escriba el nombre del producto !' }]}>
                        <InputNumber
                            style={{ width: '100%' }}

                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        // onChange={onChange}
                        />
                    </Form.Item>
                </Col>
                <Col md={8}>
                    <Form.Item
                        name="unidadProducto"
                        label="unidad del material"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escriba el tipo del material !' }]}>
                        <Select
                            placeholder="Selecciona unidad"
                            // onChange={onGenderChange}
                            allowClear
                        >


                            <Option value="UND">UND</Option>
                            <Option value="JGO">JGO</Option>
                            <Option value="GLN">GLN</Option>
                            <Option value="PAA">PAA</Option>
                            <Option value="KG">KG</Option>
                            <Option value="M">M</Option>
                            <Option value="M2">M2</Option>




                        </Select>
                    </Form.Item>
                    {/* <Form.Item
                        name="unidadProducto"
                        label="unidad del material"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        initialValue="UND"
                    >
                        <Input defaultValue={'UND'} disabled />
                    </Form.Item> */}
                </Col>
                <Col md={8}>
                    <Form.Item
                        name="fk_area"
                        label="area perteneciente del material"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escriba el area del material !' }]}>
                        <Select
                            placeholder="Selecciona un area"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            {
                                areas.map((area) => (
                                    <Option key={area.idArea} value={area.idArea}>{area.nombreArea}</Option>
                                ))
                            }

                        </Select>
                    </Form.Item>
                </Col>
                <Col md={8}>
                    <Form.Item
                        name="fk_ceco"
                        label="ceco perteneciente del material"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ required: true, message: 'Escriba el ceco del material !' }]}>
                        <Select
                            placeholder="Selecciona un ceco"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            {
                                cecos.map((ceco) => (
                                    <Option key={ceco.idCeco} value={ceco.idCeco}>{ceco.nombreCeco}-{ceco.nombreSede}</Option>
                                ))
                            }

                        </Select>
                    </Form.Item>
                </Col>
                <Col md={24} >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginTop: '1em' }}
                    >
                        Añadir material
                    </Button>



                </Col>
            </Row>
        </Form >
    )
}

export default NewProducto
