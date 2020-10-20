import React, { useState, useEffect } from 'react'
import { Button, InputNumber, Space, Select, message } from 'antd'
import { Form } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { createPedido, listarProductosPorCecosAPI } from '../services/pedidosApi'
// import { listarProductosAreasAPI } from '../../materiales/services/materialesApi'
import { GetCecoSedeUsuario } from '../../ceco/services/cecosApi'

const ListMateriales = ({ fk_area, fk_sede, presupuesto, idUsuario }) => {



    const { Option } = Select
    const [productos, setProductos] = useState([])
    const [cecos, setCecos] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {

        GetCecoSedeUsuario(fk_sede, idUsuario)
            .then(data => setCecos(data))

    }, [fk_sede, idUsuario])

    const history = useHistory()


    const onFinish = async values => {

        console.log(values);
        const { success, cantidadExceso } = await createPedido(values)
        if (success) {
            history.push('/')
            message.success('Su Pedido ha sido enviado con exito.');

        } else {
            message.error(`Su pedido excede el presupuesto de tu ceco por S/${cantidadExceso}`);

        }
    };

    //cambiar cecos
    const cambiarCecoSelect = async (id) => {
        const { productos } = await listarProductosPorCecosAPI(id)
        console.log(productos);
        setProductos(productos)
    }



    // ----------autocompletado producto---------------
    const cambiarMaterial = async (e) => {
        message.info('This is a normal message ' + e, 5);
    }


    return (
        <>

            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" form={form}>

                <Form.Item
                    style={{ padding: '1em' }}
                    name='fk_ceco'
                >
                    <Select
                        placeholder="selecciona tu ceco"
                        onChange={cambiarCecoSelect}
                        style={{ width: '100%' }}
                    >
                        {
                            cecos.map((c) => (
                                <Option key={c.idCeco} value={c.idCeco}>{c.nombreCeco}</Option>
                            ))
                        }

                    </Select>
                </Form.Item>
                <Form.List name="materiales">
                    {(fields, { add, remove }) => {

                        return (
                            <div>
                                {fields.map(field => (

                                    <Space key={field.key} style={{ display: 'flex', margin: 8 }} align="start">
                                        {/* ------search -----*/}
                                        <Form.Item

                                            {...field}
                                            label="COD.MATERIAL"
                                            labelCol={24}
                                            wrapperCol={24}
                                            name={[field.name, 'fk_producto_almacen']}
                                            fieldKey={[field.fieldKey, 'fk_producto_almacen']}
                                            style={{ width: '120' }}

                                        >
                                            {/* input */}

                                            <Select
                                                onChange={cambiarMaterial}
                                                showSearch
                                                style={{ width: '210px' }}
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {
                                                    productos.map((item) =>
                                                        (
                                                            <Option key={item.idProductoAlmacen} value={item.idProductoAlmacen}>
                                                                {item.skuProducto} - STOCK:{item.cantidadProductoAlmacen}
                                                            </Option>
                                                        ))
                                                }

                                            </Select>

                                            {/* input */}

                                        </Form.Item>


                                        {/* ----search-------- */}
                                        <Form.Item
                                            {...field}
                                            label="CANTIDAD"

                                            name={[field.name, 'cantidadProducto']}
                                            fieldKey={[field.fieldKey, 'cantidadProducto']}
                                            rules={[{ required: true, message: 'cantidad' }]}
                                        >
                                            <InputNumber placeholder="cantidad producto" />
                                        </Form.Item>




                                        <MinusCircleOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    </Space>
                                ))}

                                <Form.Item
                                    style={{ padding: '1em' }}
                                >
                                    <Button
                                        style={{ marginTop: '1em' }}
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

                <Form.Item style={{ padding: '1em' }}>

                    {
                        presupuesto <= 0 ?
                            <Button type="primary" htmlType="submit" block disabled>
                                Envia pedido
                    </Button>
                            :
                            <Button type="primary" htmlType="submit" block >
                                Envia pedido
                 </Button>
                    }
                </Form.Item>
            </Form>
        </>

    )
}

export default ListMateriales