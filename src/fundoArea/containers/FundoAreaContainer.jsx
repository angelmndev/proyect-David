import React, { useState, useEffect } from 'react'
import { Descriptions, Row, Col } from 'antd'
import { Tag } from 'antd'
import { Divider } from 'antd'

//modulos
import NewFundoArea from '../components/NewFundoArea'
import ListFundosAreas from '../components/ListFundoArea'
//api
import { getFundosAreas, deleteFundoAreaApi } from '../services/fundoAreaApi'
//modal
import ModalFundoArea from '../components/ModalFundoArea'
import { openNotificationDelete } from '../components/Notification'

const FundoAreaContainer = () => {

    /*API fundos-areas*/
    const [fundosAreas, setFundoAreas] = useState([]);

    const fetchFundosAreas = async () => {
        const data = await getFundosAreas();
        setFundoAreas(data);
    };

    useEffect(() => {
        fetchFundosAreas();
    }, []);

    /*modal*/
    const [modal, setModal] = useState({ visible: false });
    const [idFundoArea, setIdFundoArea] = useState(0);

    const showModal = (value) => {

        setIdFundoArea(value);
        setModal({ visible: true });
    }

    /**delete */
    const deleteFundoAreaId = async (idFundoArea) => {
        const { success } = await deleteFundoAreaApi(idFundoArea);
        if (success) {
            fetchFundosAreas()
            openNotificationDelete();
        }

    }

    return (
        <>
            {/* component description */}
            <Descriptions title="Designación general" >
                <Descriptions.Item >
                    Aquí se podra designar el fundo segun su respectiva sede, que area pertenece a ese fundo, su CECO y su responsable de area.
            </Descriptions.Item>
                <Descriptions.Item >
                    <p style={{ marginRight: '1em' }}> Aqui podras hacer las siguientes operaciones:</p>
                    <br />
                    <Tag color="success">Asignar área</Tag>
                    <Tag color="processing">actualizar área asignada</Tag>
                    <Tag color="error">Eliminar área asignada</Tag>

                </Descriptions.Item>
            </Descriptions>
            <Divider />
            {/* component description */}
            <Row>
                <Col md={8}>
                    <NewFundoArea listFundosAreas={fetchFundosAreas} />
                </Col>
                <Col md={14}>
                    <ListFundosAreas fundosAreas={fundosAreas} showModal={showModal} deleteFundoAreaId={deleteFundoAreaId} />
                </Col>
            </Row>
            {
                modal.visible && <ModalFundoArea listarFundosAreas={fetchFundosAreas} visible={modal.visible} setModal={setModal} idFundoArea={idFundoArea} />
            }
        </>
    )
}

export default FundoAreaContainer
