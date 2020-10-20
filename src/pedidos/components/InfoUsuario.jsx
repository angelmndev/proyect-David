import React from 'react'
import { Col, Row, Statistic, Layout } from 'antd';

const InfoUsuario = ({ usuario }) => {
    const { Content } = Layout;
    return (
        <Content style={{ padding: '1em' }} className="site-layout-content">
            <Row style={{ textAlign: "center" }} >
                <Col span={24}>
                    <Statistic title="Nombre de usuario" value={usuario.nombre} />
                </Col>
                <Col span={24}>
                    <Row style={{ textAlign: "center" }}>
                        <Col span={12} style={{ textAlign: 'center' }} >
                            <Statistic title="Sede" value={usuario.sede} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Fundo" value={usuario.fundo} />
                        </Col>
                    </Row>
                </Col>
                <Col span={24} >
                    <Statistic title="Area Responsable" value={usuario.area} />

                </Col>

            </Row>

        </Content>
    )
}

export default InfoUsuario
