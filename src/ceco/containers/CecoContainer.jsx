import React, { useState, useEffect } from 'react'
import { Descriptions, Tag, Tabs } from 'antd'
import NewCeco from '../components/NewCeco';
import ListaCeco from '../components/ListaCeco';
import { openNotificationDelete } from '../components/Notification'
import ModalCecos from '../components/ModalCecos'


import { ListCecos, DeleteCeco } from '../services/cecosApi';

const CecoContainer = () => {
    const { TabPane } = Tabs;

    const [cecos, setCecos] = useState([]);
    const [visible, setVisible] = useState({ value: false })
    const [idCeco, setCecoId] = useState(0);

    const obtenerCecos = async () => {
        const data = await ListCecos();
        setCecos(data)
    }

    const editarCeco = (id) => {
        console.log(id);
        setVisible({
            value: true
        })
        setCecoId(id)
    }

    useEffect(() => {
        obtenerCecos()
    }, [])

    const deleteCeco = async (id) => {
        const { success } = await DeleteCeco(id);
        if (success) {
            obtenerCecos();
            openNotificationDelete()
        }
    }

    return (
        <>
            {/* component description */}
            <Descriptions title="Nuestros Centro de costos" >
                <Descriptions.Item >
                    Bienvenido a la sección centro de costos (CECOS).
            </Descriptions.Item>
                <Descriptions.Item >
                    <p style={{ marginRight: '1em' }}> Aqui podras hacer las siguientes operaciones:</p>
                    <br />
                    <Tag color="success">Registar ceco</Tag>
                    <Tag color="processing">actualizar ceco</Tag>
                    <Tag color="error">Eliminar ceco</Tag>

                </Descriptions.Item>
            </Descriptions>

            <Tabs type="card" defaultActiveKey="1">
                <TabPane tab="CECOS registrados" key="1">
                    <ListaCeco obtenerCecos={obtenerCecos} cecos={cecos} editarCeco={editarCeco} deleteCeco={deleteCeco} />
                </TabPane>
                <TabPane tab="Registrar CECO" key="2">
                    <NewCeco obtenerCecos={obtenerCecos} />
                </TabPane>

            </Tabs>
            {
                visible.value && <ModalCecos idCeco={idCeco} visible={visible.value} setVisible={setVisible} obtenerCecos={obtenerCecos} />
            }
        </>
    )
}

export default CecoContainer
