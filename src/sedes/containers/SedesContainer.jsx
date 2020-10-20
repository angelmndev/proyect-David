import React, { useState, useEffect } from 'react'
import { Descriptions, Row, Col } from 'antd'
import { Tag } from 'antd'
import { Divider } from 'antd'
import '../styles/sedes.css'


import NewSede from '../components/NewSede'
import ListSedes from '../components/ListSedes'

import { getSedes } from '../services/sedesApi'

const SedesContainer = () => {

    const [sedes, setSedes] = useState([]);

    const fetchSedes = async () => {
        const data = await getSedes();
        setSedes(data);
    }


    useEffect(() => {
        fetchSedes();
    }, []);

    return (
        <>
            {/* component description */}
            <Descriptions title="Nuestras sedes">
                <Descriptions.Item>
                    Bienvenido a la sección sedes.
                </Descriptions.Item>
                <Descriptions.Item>
                    <p style={{ marginRight: '1em' }}> Aqui podras hacer las siguientes operaciones:</p>
                    <Tag color="success">Añadir nueva sede</Tag>
                    <Tag color="processing">actualizar sede</Tag>
                    <Tag color="error">Eliminar sede</Tag>
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            {/* component description */}
            <Row>
                <Col md={8}>
                    <NewSede fetchSedes={fetchSedes} />
                </Col>
                <Col md={14}>
                    <ListSedes sedes={sedes} listarSedes={fetchSedes} />
                </Col>
            </Row>
        </>
    )
}

export default SedesContainer
