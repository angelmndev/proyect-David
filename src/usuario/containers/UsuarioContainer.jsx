import React, { useState, useEffect } from 'react'
import { Descriptions, Row, Col } from 'antd'
import { Tag } from 'antd'
import { Divider, Tabs } from 'antd'

import NewUsuario from '../components/NewUsuario';
import ListUsuarios from '../components/ListUsuarios'
import ModalUsuario from '../components/ModalUsuario';

import { getUsuariosApi, deleteUsuarioApi } from '../services/usuarioApi'
import { openNotificationDelete } from '../components/Notification';


const UsuarioContainer = () => {
    const { TabPane } = Tabs;

    const [usuarios, setUsuarios] = useState([]);

    const [visible, setVisible] = useState({ value: false })

    const [idUsuario, setIdUsuario] = useState(0);

    const setEditModalUsuario = (id) => {
        setVisible({
            value: true
        });

        setIdUsuario(id)
    };

    const listarUsuarios = async () => {
        const data = await getUsuariosApi();
        const filtrodeUser = await data.filter(user => user.nombreUsuario !== 'root@o' && user.nombreUsuario !== 'root@g' && user.nombreUsuario !== 'root@u')
        console.log(filtrodeUser);
        setUsuarios(filtrodeUser);
    }

    useEffect(() => {
        listarUsuarios()
    }, [])

    const deleteUsuarioId = async (id) => {
        const { success } = await deleteUsuarioApi(id);
        if (success) {
            listarUsuarios();
            openNotificationDelete()
        }
    }

    return (
        <>
            {/* component description */}
            <Descriptions title="Nuestros usuarios" >
                <Descriptions.Item >
                    Bienvenido a la sección usuarios.
            </Descriptions.Item>
                <Descriptions.Item >
                    <p style={{ marginRight: '1em' }}> Aqui podras hacer las siguientes operaciones:</p>
                    <br />
                    <Tag color="success">Crear usuarios</Tag>
                    <Tag color="processing">actualizar usuarios</Tag>
                    <Tag color="error">Eliminar usuarios</Tag>

                </Descriptions.Item>
            </Descriptions>
            <Divider />
            {/* component description */}
            <Row>
                <Col md={24}>
                    <Tabs type="card" defaultActiveKey="1">
                        <TabPane tab="usuarios registrados" key="1">
                            <ListUsuarios usuarios={usuarios} setEditModalUsuario={setEditModalUsuario} deleteUsuarioId={deleteUsuarioId} />
                        </TabPane>
                        <TabPane tab="Registrar usuario" key="2">
                            <NewUsuario listarUsuarios={listarUsuarios} />
                        </TabPane>

                    </Tabs>

                </Col>
            </Row>
            {/* modal */}
            {
                visible.value && <ModalUsuario listarUsuarios={listarUsuarios} visible={visible.value} setVisible={setVisible} idUsuario={idUsuario} />
            }

        </>
    )
}

export default UsuarioContainer
