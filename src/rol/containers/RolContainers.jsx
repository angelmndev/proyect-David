import React, { useState, useEffect } from 'react'
import { Descriptions, Row, Col } from 'antd'
import { Tag } from 'antd'
import { Divider } from 'antd'

//components
import NewRol from '../components/NewRol'
import ListRols from '../components/ListRols'

//api
import { getRolesApi, deleteRolApi } from '../services/rolApi'


//modal
import ModalRols from '../components/ModalRols';

//notification
import { openNotificationDelete } from '../components/Notification'

const RolContainers = () => {

    const [roles, setRoles] = useState([]);
    const [modal, setModal] = useState({ visible: false });
    const [idRol, setIdRol] = useState(0);

    const listarRoles = async () => {
        const roles = await getRolesApi();
        setRoles(roles);
    };

    //mostrar modal y seleccionar idfundo
    const showModalEdit = (idRol) => {
        setModal({
            visible: true
        });
        setIdRol(idRol);
    }

    useEffect(() => {
        listarRoles();
    }, []);


    const deleteRolId = async (idRol) => {
        const { success } = await deleteRolApi(idRol);
        if (success) {
            listarRoles();
            openNotificationDelete()
        }
    }

    return (
        <>
            {/* component description */}
            <Descriptions title="Registrar Roles" >
                <Descriptions.Item >
                    Bienvenido a la sección roles donde podras establecer el rol.
            </Descriptions.Item>
                <Descriptions.Item >
                    <p style={{ marginRight: '1em' }}> Aqui podras hacer las siguientes operaciones:</p>
                    <br />
                    <Tag color="success">Crear rol</Tag>
                    <Tag color="processing">actualizar rol</Tag>
                    <Tag color="error">Eliminar rol</Tag>

                </Descriptions.Item>
            </Descriptions>
            <Divider />
            {/* component description */}
            <Row>
                <Col md={8}>
                    <NewRol listarRoles={listarRoles} />
                </Col>
                <Col md={14}>
                    <ListRols roles={roles} showModalEdit={showModalEdit} deleteRolId={deleteRolId} />
                </Col>
            </Row>

            {
                modal.visible && <ModalRols listarRoles={listarRoles} visible={modal.visible} setModal={setModal} idRol={idRol} />
            }

        </>
    )
}

export default RolContainers
