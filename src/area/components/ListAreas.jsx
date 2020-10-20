import React from 'react'
import { Space, Popconfirm, Table, Empty } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'

const ListFundo = ({ areas, showModalEdit, deleteArea }) => {
    const data = [];
    areas.map((area, index) =>
        data.push({
            orden: index + 1,
            idArea: area.idArea,
            nombreArea: area.nombreArea
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
            title: 'Areas',
            dataIndex: 'nombreArea',
            key: 'nombreArea',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Acciones',
            dataIndex: 'idArea',
            key: 'idArea',
            render: (idArea) => (
                <Space size="middle">
                    <Popconfirm title="¿Deseas modificar el área?"
                        okText="Si"
                        onConfirm={() => showModalEdit(idArea)}
                        cancelText="No">
                        <FormOutlined />
                    </Popconfirm>

                    <Popconfirm
                        onConfirm={() => deleteArea(idArea)}
                        title="¿Deseas eliminar el área?" okText="Si" cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    return (
        <>
            {data.length > 0 ?
                <Table bordered columns={columns} rowKey={"idArea"} dataSource={data} pagination={{ pageSize: 5 }} />
                : <Empty description={"No hay áreas registradas hasta el momento."} style={{ padding: '4em' }} />
            }
        </>
    )
}

export default ListFundo
