import React from 'react'
import { Space, Popconfirm, Table, Empty } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
const ListUsuarios = ({ usuarios, setEditModalUsuario, deleteUsuarioId }) => {
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

                </Space>
            ),
        },
    ];


    return (
        <>
            {data.length > 0 ?
                <Table bordered columns={columns} rowKey={"idUsuario"} dataSource={data} pagination={{ pageSize: 5 }} />
                : <Empty description={"No hay usuarios registradas hasta el momento."} style={{ padding: '4em' }} />
            }
        </>
    )
}

export default ListUsuarios
