import React from 'react'
import { Space, Popconfirm, Table, Empty } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'

const ListFundo = ({ fundos, showModalEdit, deleteFundo }) => {


    const data = [];
    fundos.map((fundo, index) =>
        data.push({
            orden: index + 1,
            idFundo: fundo.idFundo,
            nombreFundo: fundo.nombreFundo,
            nombreSede: fundo.nombreSede
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
            title: 'Fundos',
            dataIndex: 'nombreFundo',
            key: 'nombreFundo',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Sedes',
            dataIndex: 'nombreSede',
            key: 'nombreSede',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Acciones',
            dataIndex: 'idFundo',
            key: 'idFundo',
            render: (idFundo) => (
                <Space size="middle">
                    <Popconfirm title="¿Deseas modificar el fundo?"
                        okText="Si"
                        onConfirm={() => showModalEdit(idFundo)}
                        cancelText="No">
                        <FormOutlined />
                    </Popconfirm>

                    <Popconfirm
                        onConfirm={() => deleteFundo(idFundo)}
                        title="¿Deseas eliminar el fundo?" okText="Si" cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    return (
        <>
            {data.length > 0 ?
                <Table bordered columns={columns} rowKey={"idFundo"} dataSource={data} pagination={{ pageSize: 5 }} />
                : <Empty description={"No hay fundos registradas hasta el momento."} style={{ padding: '4em' }} />
            }
        </>
    )
}

export default ListFundo
