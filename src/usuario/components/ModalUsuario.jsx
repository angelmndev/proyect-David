import React, { useState, useEffect } from 'react'
import { Drawer, Button, Col, Row, Input, Select } from 'antd';
import { getUsuarioIdApi, updateUsuarioApi } from '../services/usuarioApi'
import { getRolesApi } from '../../rol/services/rolApi'


//notification
import { openNotificationUpdate } from '../components/Notification'

const { Option } = Select;



const ModalUsuarios = ({ listarUsuarios, visible, setVisible, idUsuario }) => {




    const [usuarioAeditar, setUsuarioAeditar] = useState({
        nombrePersonalUsuario: '',
        apellidoPersonalUsuario: '',
        nombreUsuario: '',
        claveUsuario: '',
        fk_rol: 0

    })

    const [roles, setRoles] = useState([]); //trae roles

    const onClose = () => {
        setVisible({
            value: false,
        });
    };


    const getUsuarioId = async (idUsuario) => {

        const { usuario } = await getUsuarioIdApi(idUsuario)

        setUsuarioAeditar({
            nombrePersonalUsuario: usuario.nombrePersonalUsuario,
            apellidoPersonalUsuario: usuario.apellidoPersonalUsuario,
            nombreUsuario: usuario.nombreUsuario,
            claveUsuario: usuario.claveUsuario,
            fk_rol: usuario.fk_rol
        })

    }

    useEffect(() => {
        getUsuarioId(idUsuario)

        getRolesApi()
            .then(data => setRoles(data))

    }, [idUsuario])



    //cambios de estado para update
    const handleChange = (e) => {
        setUsuarioAeditar({
            ...usuarioAeditar,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeSelectRol = (value) => {
        setUsuarioAeditar({
            ...usuarioAeditar,
            fk_rol: value
        })
    }


    const updateUser = async () => {

        const { success } = await updateUsuarioApi(idUsuario, usuarioAeditar)

        if (success) {
            onClose()
            openNotificationUpdate()
            listarUsuarios()
        }
    }

    return (
        <>
            <Drawer
                title="Editando usuario"
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div style={{ textAlign: 'right' }} >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={() => updateUser()}>
                            Actualizar
                        </Button>
                    </div>
                }
            >

                <Row gutter={16} style={{ marginBottom: '1em' }}>
                    <Col span={12}>
                        <p>Nombre del trabajador</p>
                        <Input onChange={handleChange} value={usuarioAeditar.nombrePersonalUsuario} name="nombrePersonalUsuario" placeholder="David Mario" />
                    </Col>
                    <Col span={12}>
                        <p>Apellido del trabajador</p>
                        <Input onChange={handleChange} value={usuarioAeditar.apellidoPersonalUsuario} name="apellidoPersonalUsuario" placeholder="Licla Carpio" />
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: '1em' }}>
                    <Col span={24}>
                        <p>Nombre de usuario</p>
                        <Input maxLength={6} onChange={handleChange} value={usuarioAeditar.nombreUsuario} name="nombreUsuario" placeholder="442379" />

                    </Col>

                </Row>
                <Row gutter={16} style={{ marginBottom: '1em' }}>
                    <Col span={24}>
                        <p>designe un rol al usuario</p>
                        <Select
                            value={usuarioAeditar.fk_rol}
                            name="fk_rol"
                            style={{ width: '100%' }}
                            placeholder="Selecciona un rol"
                            onChange={handleChangeSelectRol}
                            allowClear
                        >
                            {
                                roles.map((rol) => (
                                    <Option key={rol.idRol} value={rol.idRol}>{rol.nombreRol}</Option>
                                ))
                            }
                        </Select>

                    </Col>
                </Row>

            </Drawer>
        </>
    );
}

export default ModalUsuarios
