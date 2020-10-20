import React, { useEffect, useState } from 'react'
import { Modal, Input } from 'antd'
// import { EnvironmentOutlined } from '@ant-design/icons'
import { getRolIdApi, updateRolApi } from '../services/rolApi'
import { openNotificationUpdate } from './Notification'

const ModalRols = ({ listarRoles, visible, setModal, idRol }) => {


    const [rol, setRol] = useState({
        nombreRol: ''
    });

    const getRolId = async (idRol) => {
        const { rol } = await getRolIdApi(idRol);
        setRol({
            nombreRol: rol.nombreRol
        })
    }


    useEffect(() => {
        getRolId(idRol);
    }, [idRol])

    const handleInputRol = (e) => {
        setRol({
            ...rol,
            nombreRol: e.target.value
        })
    }


    const actualizarRol = async () => {
        const { success } = await updateRolApi(idRol, rol.nombreRol);
        if (success) {
            setModal({ visible: false })
            listarRoles();
            openNotificationUpdate();

        }
    }

    return (
        <Modal
            title="Editando rol"
            visible={visible}
            onOk={() => actualizarRol()}
            onCancel={() => setModal({ visible: false })}
        >

            <Input value={rol.nombreRol} onChange={handleInputRol} placeholder="Administrador" />
        </Modal>
    )
}

export default ModalRols
