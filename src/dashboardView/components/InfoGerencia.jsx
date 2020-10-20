import React, { useState, useEffect } from 'react'
import { PageHeader, Tag, Typography, Row, Col, Layout, Divider } from 'antd';
// import { EllipsisOutlined } from '@ant-design/icons';
import '../styles/styles.css'
import gerente from '../images/gerente.svg'

import ListaPedidos from '../components/ListaPedidos'
import ListaCentroCostos from '../components/ListaCentroCostos'
import { ListPedidosAPI } from '../../pedidosUsuarios/services/pedidosApi'
import { ListCecos } from '../../ceco/services/cecosApi'

const { Paragraph } = Typography;
const { Content } = Layout


const InfoGerencia = () => {

    const [pedidos, setPedidos] = useState([])
    const [cecos, setCecos] = useState([])

    const listarPedidos = async () => {
        const data = await ListPedidosAPI()
        setPedidos(data)
    }

    const listarCentroCostos = async () => {
        const data = await ListCecos()
        setCecos(data)
    }

    useEffect(() => {
        listarPedidos()
        listarCentroCostos()
    }, [])


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PageHeader

                    title="Rubén"
                    tags={<Tag color="green">Gerente</Tag>}
                    avatar={{
                        src: gerente
                    }}

                >
                    <Content >
                        <Row >
                            <Col>
                                <Paragraph >

                                    Bienvenido al panel administrativo de la gerencia, aqui podras: <br />
                                    <Tag>ver pedidos</Tag>
                                    <Tag>ver presupuesto CECO</Tag>
                                </Paragraph>

                            </Col>
                        </Row>
                    </Content>
                </PageHeader>

            </div >
            <Row justify="space-around">
                <Col md={18}>
                    <Divider orientation="left">Pedidos</Divider>
                    <ListaPedidos listarCentroCostos={listarCentroCostos} listarPedidos={listarPedidos} pedidos={pedidos} />
                </Col>
                <Col md={18}>
                    <Divider orientation="left">Presupuesto actual de los centro de costos</Divider>
                    <ListaCentroCostos cecos={cecos} />
                </Col>
            </Row>
        </>
    )
}

export default InfoGerencia
