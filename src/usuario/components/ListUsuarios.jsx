import React, { useState } from 'react'
import { Space, Popconfirm, Table, Empty, Modal, Input, notification } from 'antd';
import { FormOutlined, DeleteOutlined, LockOutlined } from '@ant-design/icons'
import { changePasswordApi } from '../services/usuarioApi'
const ListUsuarios = ({ usuarios, setEditModalUsuario, deleteUsuarioId }) => {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [user, setUser] = useState({
        id: 0,
        password: ''
    })
    const data = [];

    usuarios.map((usuario, index) =>
        data.push({
            orden: index + 1,
            idUsuario: usuario.idUsuario,
            nombreUsuario: usuario.nombreUsuario,
            nombreRol: usuario.nombreRol,
            nombrePersonalUsuario: usuario.nombrePersonalUsuario,
            apellidoPersonalUsuario: usuario.apellidoPersonalUsuario
        })
    );

    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
            render: (orden) => <p>{orden}</p>,
        },
        {
            title: 'usuario',
            dataIndex: 'nombreUsuario',
            key: 'nombreUsuario',
            render: text => <p>{text}</p>,
        },
        {
            title: 'rol',
            dataIndex: 'nombreRol',
            key: 'nombreRol',
            render: text => <p>{text}</p>,
        },
        {
            title: 'nombres',
            dataIndex: 'nombrePersonalUsuario',
            key: 'nombrePersonalUsuario',
            render: text => <p>{text}</p>,
        },
        {
            title: ' apellidos',
            dataIndex: 'apellidoPersonalUsuario',
            key: 'apellidoPersonalUsuario',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Acciones',
            dataIndex: 'idUsuario',
            key: 'idUsuario',
            render: (idUsuario) => (
                <Space size="middle">
                    <Popconfirm title="¿Deseas modificar el usuario?"
                        okText="Si"
                        onConfirm={() => setEditModalUsuario(idUsuario)}
                        cancelText="No">
                        <FormOutlined />
                    </Popconfirm>

                    <Popconfirm
                        onConfirm={() => deleteUsuarioId(idUsuario)}
                        title="¿Deseas eliminar el usuario?" okText="Si" cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>
                    <Popconfirm
                        onConfirm={() => showModal(idUsuario)}
                        title="¿Deseas cambiar la contraseña de este usuario?" okText="Si" cancelText="No">
                        <LockOutlined />
                    </Popconfirm>


                </Space>
            ),
        },
    ];

    //
    const showModal = (idUsuario) => {
        setVisible(true);
        setUser({
            id: idUsuario
        })
    };
    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Cambio de contraseña exitoso!',
            description:
                'Su contraseña ha sido cambiada.',
            placement: 'bottomLeft'
        });
    };
    //show modal
    const handleOk = async () => {
        setConfirmLoading(true);
        const { id, password } = user;
        const { success } = await changePasswordApi(id, password)

        if (success) {
            setVisible(false);
            setConfirmLoading(false);
            setUser({
                id: 0,
                password: ''
            })
            openNotificationWithIcon('success')
        }

    };

    //hide modal
    const handleCancel = () => {
        setConfirmLoading(false);
        setVisible(false);
        setUser({
            id: 0,
            password: ''
        })
    };

    const handlerChangePassword = (e) => {
        setUser({
            ...user,
            password: e.target.value
        })
    }

    return (
        <>
            {data.length > 0 ?
                <Table size="small" bordered columns={columns} rowKey={"idUsuario"} dataSource={data} pagination={{ pageSize: 5 }} />
                : <Empty description={"No hay usuarios registradas hasta el momento."} style={{ padding: '4em' }} />
            }
            <Modal
                title="Cambiando la contraseña "
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >

                <label>Ingresa la nueva contraseña:</label>
                <Input.Password name="password" onChange={handlerChangePassword} value={user.password} placeholder="nueva contraseña" />

            </Modal>
        </>
    )
}

export default ListUsuarios
