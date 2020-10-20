import React, { useState, useEffect } from 'react'
import { Modal, Select, Input } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import '../styles/modal.css'
// api fundo
import { editFundo, updateSede } from '../services/fundoApi';
import { getSedes } from '../../sedes/services/sedesApi'
//notification
import { openNotificationUpdate } from '../components/Notification'

const ModalFundo = ({ listarFundos, visible, setModal, idFundo }) => {
    const { Option } = Select;

    const [sedes, setSedes] = useState([]);

    const [newFundo, setNewFundo] = useState({
        nombreFundo: '',
        fk_sede: 0
    });



    //seleccionando el fundo por su id y guardando el resultado en mi estado
    const fetchFundoId = async (idFundo) => {
        const { fundo } = await editFundo(idFundo);

        setNewFundo({
            fk_sede: fundo.idSede,
            nombreFundo: fundo.nombreFundo
        })
    }

    //trayendo sedes para el select
    const fetchSedes = async () => {
        const sedes = await getSedes();
        setSedes(sedes);
    }

    //ejecutar llamada a la api luego de renderizar modal
    useEffect(() => {
        fetchSedes();
        fetchFundoId(idFundo);


    }, [idFundo]);


    //captar sede seleccionada
    const handleChangeSelectSede = (idSede) => {
        setNewFundo({
            ...newFundo,
            fk_sede: idSede
        })
    }

    //captar nombre de fundo
    const handleChangeEditFundo = (e) => {
        setNewFundo({
            ...newFundo,
            nombreFundo: e.target.value
        })
    }

    //actualizar fundo
    const actualizarFundo = async () => {
        //enviar datos a api
        const { success } = await updateSede(idFundo, newFundo);

        setModal({
            visible: false,
        });

        listarFundos();

        if (success) {
            openNotificationUpdate();
        }
    }

    return (
        <Modal
            title="Editando Fundo"
            visible={visible}
            onOk={() => actualizarFundo()}
            onCancel={() => setModal({ visible: false })}
        >
            <Select onChange={handleChangeSelectSede} value={newFundo.fk_sede} className="select__Edit">
                {sedes.map((item) => (
                    <Option key={item.idSede} value={item.idSede}>{item.nombreSede}</Option>
                ))}
            </Select>
            <Input onChange={handleChangeEditFundo} value={newFundo.nombreFundo} prefix={<EnvironmentOutlined />} placeholder="castillos" />
        </Modal>
    )
}

export default ModalFundo
