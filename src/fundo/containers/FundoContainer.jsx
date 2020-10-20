import React, { useState, useEffect } from 'react'
import { Descriptions, Row, Col } from 'antd'
import { Tag } from 'antd'
import { Divider } from 'antd'
import NewFundo from '../components/NewFundo';
import ListFundo from '../components/ListFundo';
// api fundo
import { getFundos, deleteFundoApi } from '../services/fundoApi';
//modal
import ModalFundo from '../components/ModalFundo'
//notification
import { openNotificationDelete } from '../components/Notification'

const FundoContainer = () => {
    const [fundos, setFundos] = useState([]);
    const [modal, setModal] = useState({ visible: false });
    const [idFundo, setIdFundo] = useState(0);

    //traer fundos
    const fetchFundos = async () => {
        const data = await getFundos();
        setFundos(data);
    };

    //mostrar modal y seleccionar idfundo
    const showModalEdit = (idFundo) => {
        setModal({
            visible: true
        });
        setIdFundo(idFundo);
    }

    //eliminar fundo 
    const deleteFundo = async (idFundo) => {
        const { success } = await deleteFundoApi(idFundo);

        if (success) {
            openNotificationDelete();
            fetchFundos();
        }
    }


    useEffect(() => {
        fetchFundos();
    }, []);

    return (
        <>
            {/* component description */}
            <Descriptions title="Nuestros fundos">
                <Descriptions.Item>
                    Bienvenido a la sección Fundos.
            </Descriptions.Item>
                <Descriptions.Item>
                    <p style={{ marginRight: '1em' }}> Aqui podras hacer las siguientes operaciones:</p>
                    <Tag color="success">Añadir nuevo fundo</Tag>
                    <Tag color="processing">actualizar fundo</Tag>
                    <Tag color="error">Eliminar fundo</Tag>
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            {/* component description */}
            <Row>
                <Col md={8}>
                    <NewFundo listarFundos={fetchFundos} />
                </Col>
                <Col md={14}>
                    <ListFundo fundos={fundos} deleteFundo={deleteFundo} showModalEdit={showModalEdit} />
                </Col>
            </Row>
            {
                modal.visible && <ModalFundo listarFundos={fetchFundos} visible={modal.visible} setModal={setModal} idFundo={idFundo} />

            }
        </>
    )
}

export default FundoContainer
