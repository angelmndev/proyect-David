
import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Select, Button, InputNumber, Spin, notification, Alert } from 'antd'
import ListInicializacionDeAlmacen from './inicializacionDeAlmacen/ListInicializacionDeAlmacen';
import { getSedes } from '../../sedes/services/sedesApi'
import { obtenerAlmacenPorSede, obtenerMaterialesPorSede, validarMaterialExistente, registrarInicializacionAlmacen } from '../services/AlmacenAPI';

const InicializacionDeAlmacen = ({ listarKardex }) => {

    //states
    let date = new Date()

    const [sedes, setSedes] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [ingreso, setIngreso] = useState({
        movimiento: 'INICIALIZACIÓN',
        fecha: date.toLocaleDateString(),
        sede: 0,
        idAlmacen: '',
        materiales: []
    })


    const [listMateriales, setListaMateriales] = useState([]);

    const [material, setMaterial] = useState({
        idProducto: 0,
        nombre: 'Aqui se mostrará el nombre del material escogido',
        cantidadIngresada: 0,
        unidad: '',
        precio: 0
    })

    const [existeMaterial, setExisteMaterial] = useState({
        value: false,
        message: 'El material escogido ya existe en el almacén seleccionado.'
    })

    const handleChangeSede = async (idSede) => {
        setIngreso({
            ...ingreso,
            sede: idSede
        })

        setLoading(true);

        const { almacenes } = await obtenerAlmacenPorSede(idSede);
        setAlmacenes(almacenes);


        const { materiales, success } = await obtenerMaterialesPorSede(idSede);

        if (success) {
            setListaMateriales(materiales);
            setLoading(false)
        }

    }

    const handleChangeAlmacen = (codigoAlmacen) => {

        setIngreso({
            ...ingreso,
            idAlmacen: codigoAlmacen
        })

    }



    const handleSelectMaterial = async (idProducto) => {
        const { idAlmacen } = ingreso;
        const { success } = await validarMaterialExistente(idProducto, idAlmacen)

        if (success) {
            setExisteMaterial({
                ...existeMaterial,
                value: true
            })
        } else {
            setExisteMaterial({
                ...existeMaterial,
                value: false
            })
        }
        let response = listMateriales.filter(material => material.idProducto === idProducto);
        let materialEscogido = response[0];
        console.log(materialEscogido)

        setMaterial({
            ...material,
            idProducto: materialEscogido.idProducto,
            nombre: materialEscogido.nombreProducto,
            cantidadIngresada: 0,
            unidad: materialEscogido.unidadProducto,
            precio: 0
        })

        setDisabled(false)
    }

    const handleChangeCantidadIngresada = (value) => {
        setMaterial({
            ...material,
            cantidadIngresada: value
        })


    }

    const handleChangePrecioIngresado = (value) => {
        setMaterial({
            ...material,
            precio: value
        })


    }

    const addMaterialToListMateriales = () => {
        setIngreso({
            ...ingreso,
            materiales: [...ingreso.materiales, material]
        })

        setMaterial({
            idProducto: 0,
            nombre: 'Aqui se mostrará el nombre del material escogido',
            cantidadActual: 0,
            unidad: '',
            cantidadIngresada: 0
        })
        setDisabled(true)
    }

    const removeMaterial = (idProducto) => {

        let response = ingreso.materiales.filter(material => material.idProducto !== idProducto);


        setIngreso({
            ...ingreso,
            materiales: response
        })
    }

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Materiales inicializados!',
            description:
                'Hola, acabas de inicializar materiales del almacén.',
        });
    };
    const ingresarMateriales = async () => {
        const { success } = await registrarInicializacionAlmacen(ingreso)

        if (success) {
            openNotificationWithIcon('success');

            setIngreso({
                ...ingreso,
                sede: 0,
                fk_inventario: '',
                materiales: []
            })

            setDisabled(true);
            listarKardex()
        }
    }
    // ui antdesign
    const { Option } = Select;

    useEffect(() => {
        getSedes()
            .then(data => setSedes(data));


    }, [])

    const { movimiento, fecha, materiales } = ingreso;
    const { nombre, cantidadIngresada, precio } = material;

    return (
        <>
            <Row gutter={[24, 16]}>
                <Col md={12}>
                    <Card style={{ paddingBottom: '.2em' }}>
                        <Row gutter={[24, 24]} justify="space-around">
                            <Col span={16}>
                                <p>Tipo de movimiento: <strong style={{ color: '#5D3C81', fontWeight: 'bold' }}>{movimiento}</strong></p>
                            </Col>
                            <Col span={6}>
                                <p>Fecha: <strong style={{ color: '#5D3C81', fontWeight: 'bold' }}>{fecha}</strong></p>
                            </Col>
                        </Row>
                        <Row gutter={[16, 12]} justify="space-around">
                            <Col span={8}>
                                <p>Selecciona la sede:</p>
                            </Col>
                            <Col span={14}>
                                <Select placeholder="Aquí están las sedes" style={{ width: '100%' }} onChange={handleChangeSede}>
                                    {
                                        sedes.map((sede) => (
                                            <Option key={sede.idSede} value={sede.idSede}>{sede.nombreSede}</Option>

                                        ))
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={[16, 12]} justify="space-around">
                            <Col span={8}>Selecciona el almacén: </Col>
                            <Col span={14}>
                                <Select placeholder="Aquí están los almacenes" style={{ width: '100%' }} onChange={handleChangeAlmacen}>
                                    {
                                        almacenes.map((almacen) => (
                                            <Option key={almacen.codigoInventario} value={almacen.codigoInventario}>{almacen.nombreInventario}</Option>

                                        ))
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={[16, 12]} justify="space-around">
                            <Col span={8}> </Col>
                            <Col span={14}></Col>
                        </Row>



                    </Card>
                </Col>
                <Col md={10}>
                    <Card>
                        <Spin tip="Cargando..." spinning={loading}>
                            <Row gutter={[24, 16]} justify="space-around">
                                <Col span={24}>
                                    <p style={{ color: '#5D3C81', fontWeight: 'bold' }}>
                                        Busca el material a inicializar:
                                    </p>
                                </Col>
                                <Col span={24}>

                                    <Select

                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Escribe tu material"
                                        optionFilterProp="children"
                                        onChange={handleSelectMaterial}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            listMateriales.map((item) => (
                                                <Option key={item.idProducto} value={item.idProducto}>{item.nombreProducto}</Option>
                                            ))
                                        }

                                    </Select>
                                </Col>

                                {
                                    existeMaterial.value ?
                                        <Alert
                                            message="Advertencia"
                                            description={existeMaterial.message}
                                            type="warning"
                                            showIcon

                                        /> :
                                        <>
                                            <Col span={24}>

                                                <div
                                                    style={{
                                                        width: '100%',
                                                        backgroundColor: '#F8F8F8',
                                                        padding: '1em',
                                                        borderRadius: '5px'
                                                    }}
                                                >
                                                    <p style={{ color: '#5D3C81', fontWeight: 'bold' }}>{nombre}</p>

                                                </div>



                                            </Col>
                                            <Col span={8}>
                                                <label>Cantidad a inicializar:</label>
                                            </Col>
                                            <Col span={16}>
                                                <InputNumber onChange={handleChangeCantidadIngresada} value={cantidadIngresada} min={0} max={9999} placeholder="0" style={{ width: '100%' }} />
                                            </Col>
                                            <Col span={8}>
                                                <label>Precio unitario:</label>
                                            </Col>
                                            <Col span={16}>
                                                <InputNumber
                                                    defaultValue={precio}
                                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                    onChange={handleChangePrecioIngresado}
                                                    min={0} max={999999}
                                                    placeholder="0" style={{ width: '100%' }} />
                                            </Col>
                                            <Col span={24}>
                                                <Button onClick={addMaterialToListMateriales} disabled={disabled} type="primary" block>Agregar</Button>
                                            </Col>
                                        </>
                                }

                            </Row>
                        </Spin>
                    </Card>
                </Col>
            </Row>
            {
                materiales.length > 0 &&
                <Row gutter={[24, 16]}>
                    <Col span={22}>
                        <Card>
                            <ListInicializacionDeAlmacen materiales={materiales} removeMaterial={removeMaterial} />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Button onClick={ingresarMateriales} type="primary" >Ingresar esta lista de materiales</Button>
                    </Col>
                </Row>
            }

        </>

    )
}

export default InicializacionDeAlmacen
