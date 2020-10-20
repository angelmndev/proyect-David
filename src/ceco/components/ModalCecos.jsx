import React, { useEffect, useState } from 'react'
import { Drawer, Button, Col, Row, Input, Select, InputNumber } from 'antd';

import { GetCeco, UpdateCeco } from '../services/cecosApi'
import { getSedes } from '../../sedes/services/sedesApi'

import { openNotificationUpdate } from '../components/Notification'

const ModalCecos = ({ visible, setVisible, idCeco, obtenerCecos }) => {
    const { Option } = Select;
    const [ceco, setCeco] = useState({
        codigoCeco: '',
        nombreCeco: '',
        fk_sede: 0,
        presupuestoCeco: 0
    });

    const [sedes, setSedes] = useState([])

    useEffect(() => {
        GetCeco(idCeco)
            .then(({ ceco }) => setCeco({
                codigoCeco: ceco.codigoCeco,
                nombreCeco: ceco.nombreCeco,
                fk_sede: ceco.fk_sede,
                presupuestoCeco: ceco.presupuestoCeco

            }));

        getSedes()
            .then(data => setSedes(data))




    }, [idCeco])

    const handleChangeInput = (values) => {
        setCeco({
            ...ceco,
            [values.target.name]: values.target.value
        })
    }

    const handleChangeInputSelectSede = (values) => {
        setCeco({
            ...ceco,
            fk_sede: values
        })
    }



    const handleChangeInputPresupuesto = (value) => {
        setCeco({
            ...ceco,
            presupuestoCeco: value
        })
    }

    //update
    const actualizarCeco = async () => {
        const { success } = await UpdateCeco(idCeco, ceco);
        console.log(success);
        if (success) {
            setVisible({
                value: false
            })
            obtenerCecos()
            openNotificationUpdate()

        }
    }

    return (
        <>
            <Drawer
                title="Editando producto"
                width={720}
                onClose={() => setVisible({ value: false })}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div style={{ textAlign: 'right' }} >
                        <Button onClick={() => setVisible({ value: false })}
                            style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary"
                            onClick={() => actualizarCeco()}
                        >
                            Actualizar
                        </Button>
                    </div>
                }
            >

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12} >
                        <p>codigo CECO</p>
                        <Input
                            name="codigoCeco"
                            value={ceco.codigoCeco}
                            onChange={handleChangeInput}

                        />
                    </Col>
                    <Col span={12} >
                        <p>Nombre CECO</p>
                        <Input
                            name="nombreCeco"
                            value={ceco.nombreCeco}
                            onChange={handleChangeInput}
                        />
                    </Col>
                    <Col span={12} >
                        <p>Sede CECO</p>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="seleccione la sede"
                            value={ceco.fk_sede}
                            onChange={handleChangeInputSelectSede}
                        >
                            {
                                sedes.map((sede) => (
                                    <Option value={sede.idSede}>{sede.nombreSede}</Option>
                                ))
                            }

                        </Select>
                    </Col>

                    <Col span={12} >
                        <p>Presupuesto CECO</p>
                        <InputNumber
                            style={{ width: '100%' }}
                            name="presupuestoCeco"
                            value={ceco.presupuestoCeco}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={handleChangeInputPresupuesto}
                        />
                    </Col>
                </Row>

            </Drawer >
        </>
    );
}

export default ModalCecos
