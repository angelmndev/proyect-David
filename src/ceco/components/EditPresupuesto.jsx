import React, { useState } from 'react'

import { Modal, Row, Col, Statistic, InputNumber } from 'antd';
import { updatePresupuestoCecoId } from '../services/cecosApi'
const EditPresupuesto = ({ modal, setModal, ceco, obtenerCecos }) => {

    const { presupuestoCeco, idCeco } = ceco;

    const [monto, setMonto] = useState(0)

    const actualizarPresupuesto = async () => {
        setModal({
            visible: false
        })
        const { success } = await updatePresupuestoCecoId(idCeco, monto)

        if (success) {
            obtenerCecos()
        }
    }

    const cancelarActualizarPresupuesto = () => {
        setModal({
            visible: false
        })
    }

    const montoAgregado = (value) => {

        setMonto({
            ...monto,
            monto: value
        })
    }


    return (
        <>
            <Modal
                title="Recargando presupuesto"
                visible={modal.visible}
                onOk={actualizarPresupuesto}
                onCancel={cancelarActualizarPresupuesto}
            >
                <Row justify="center"  >
                    <Col md={13} justify="center">

                        <Statistic
                            style={{ textAlign: 'center' }}
                            title="Presupuesto Actual"
                            prefix="$"
                            value={presupuestoCeco}

                        />
                    </Col>
                    <Col md={12} justify="center" style={{ textAlign: 'center', paddingTop: '1em' }}>

                        <InputNumber
                            name="presupuestoCeco"
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={montoAgregado}
                            style={{ width: '180px' }} />
                    </Col>

                </Row>

            </Modal>
        </>
    );

}

export default EditPresupuesto