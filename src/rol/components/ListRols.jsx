import React from 'react'
import { Space, Popconfirm, Table, Empty } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'

const ListRols = ({ roles, showModalEdit, deleteRolId }) => {
    const data = [];

    roles.map((rol, index) =>
        data.push({
            orden: index + 1,
            idRol: rol.idRol,
            nombreRol: rol.nombreRol
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
            title: 'Roles',
            dataIndex: 'nombreRol',
            key: 'nombreRol',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Acciones',
            dataIndex: 'idRol',
            key: 'idRol',
            render: (idRol) => (
                <Space size="middle">
                    <Popconfirm title="¿Deseas modificar el rol?"
                        okText="Si"
                        onConfirm={() => showModalEdit(idRol)}
                        cancelText="No">
                        <FormOutlined />
                    </Popconfirm>

                    <Popconfirm
                        onConfirm={() => deleteRolId(idRol)}
                        title="¿Deseas eliminar el rol?" okText="Si" cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    return (
        <>
            {data.length > 0 ?
                <Table bordered columns={columns} rowKey={"idRol"} dataSource={data} pagination={{ pageSize: 5 }} />
                : <Empty description={"No hay roles registradas hasta el momento."} style={{ padding: '4em' }} />
            }
        </>
    )
}

export default ListRols
