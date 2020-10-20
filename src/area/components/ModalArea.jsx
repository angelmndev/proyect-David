import React, { useState, useEffect } from 'react'
import { Modal, Input } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'


// api area
import { editArea, updateArea } from '../services/areaApi';
//notification
import { openNotificationUpdate } from '../components/Notification'


const ModalArea = ({ listarAreas, visible, setModal, idArea }) => {

    const [newArea, setNewArea] = useState({
        nombreArea: ''
    });



    //seleccionando el fundo por su id y guardando el resultado en mi estado
    const fetchAreaId = async (idArea) => {
        const { area } = await editArea(idArea);

        setNewArea({
            nombreArea: area.nombreArea
        })
    }

    //ejecutar llamada a la api luego de renderizar modal
    useEffect(() => {
        fetchAreaId(idArea);
    }, [idArea]);




    //captar nombre de fundo
    const handleChangeEditArea = (e) => {
        setNewArea({
            ...newArea,
            nombreArea: e.target.value
        })
    }

    //actualizar fundo
    const actualizarArea = async () => {
        //enviar datos a api
        const { success } = await updateArea(idArea, newArea);

        setModal({
            visible: false,
        });

        listarAreas();

        if (success) {
            openNotificationUpdate();
        }
    }
    return (
        <Modal
            title="Editando Area"
            visible={visible}
            onOk={() => actualizarArea()}
            onCancel={() => setModal({ visible: false })}
        >

            <Input onChange={handleChangeEditArea} value={newArea.nombreArea} prefix={<EnvironmentOutlined />} placeholder="Administración" />
        </Modal>
    )
}

export default ModalArea
