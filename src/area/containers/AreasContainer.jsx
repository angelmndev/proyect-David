import React, { useState, useEffect } from 'react'
import { Descriptions, Row, Col } from 'antd'
import { Tag } from 'antd'
import { Divider } from 'antd'

//modulos
import NewArea from '../components/NewArea'
import ListAreas from '../components/ListAreas'
import ModalArea from '../components/ModalArea'
//api
import { getAreas, deleteAreaApi } from '../services/areaApi'
//notification
import { openNotificationDelete } from '../components/Notification'

const AreasContainer = () => {


    const [areas, setAreas] = useState([]);
    const [modal, setModal] = useState({ visible: false });
    const [idArea, setIdArea] = useState(0);

    //traer areas
    const fetchAreas = async () => {
        const data = await getAreas();
        setAreas(data);
    };

    //mostrar modal y seleccionar idArea
    const showModalEdit = (idArea) => {
        setModal({
            visible: true
        });
        setIdArea(idArea);
    }

    //eliminar areas 
    const deleteArea = async (idArea) => {
        const { success } = await deleteAreaApi(idArea);

        if (success) {
            openNotificationDelete();
            fetchAreas();
        }
    }


    useEffect(() => {
        fetchAreas();
    }, []);

    return (
        <>
            {/* component description */}
            <Descriptions title="Nuestros Areas">
                <Descriptions.Item>
                    Bienvenido a la sección Areas.
            </Descriptions.Item>
                <Descriptions.Item>
                    <p style={{ marginRight: '1em' }}> Aqui podras hacer las siguientes operaciones:</p>
                    <Tag color="success">Añadir nueva Area</Tag>
                    <Tag color="processing">actualizar Area</Tag>
                    <Tag color="error">Eliminar Area</Tag>
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            {/* component description */}
            <Row>
                <Col md={8}>
                    <NewArea listarAreas={fetchAreas} />
                </Col>
                <Col md={14}>
                    <ListAreas areas={areas} deleteArea={deleteArea} showModalEdit={showModalEdit} />
                </Col>
            </Row>
            {
                modal.visible && <ModalArea listarAreas={fetchAreas} visible={modal.visible} setModal={setModal} idArea={idArea} />
            }
        </>
    )
}

export default AreasContainer
