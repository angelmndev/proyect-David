import React from 'react'
import { Space, Popconfirm, Table, Empty } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'


const ListAreaFundo = ({ fundosAreas, showModal, deleteFundoAreaId }) => {

    const data = [];
    fundosAreas.map((fundoArea, index) =>
        data.push({
            orden: index + 1,
            idFundoArea: fundoArea.idFundoArea,
            nombreSede: fundoArea.nombreSede,
            nombreFundo: fundoArea.nombreFundo,
            nombreArea: fundoArea.nombreArea,
            nombreCeco: fundoArea.nombreCeco,
            nombrePersonalUsuario: fundoArea.nombrePersonalUsuario
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
            title: 'Sedes',
            dataIndex: 'nombreSede',
            key: 'nombreSede',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Fundos',
            dataIndex: 'nombreFundo',
            key: 'nombreFundo',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Áreas',
            dataIndex: 'nombreArea',
            key: 'nombreArea',
            render: text => <p>{text}</p>,
        },
        {
            title: 'CECO',
            dataIndex: 'nombreCeco',
            key: 'nombreCeco',
            render: ceco => <p>{`${ceco}`}</p>,
        },
        {
            title: 'Responsable',
            dataIndex: 'nombrePersonalUsuario',
            key: 'nombrePersonalUsuario',
            render: nombre => <p>{`${nombre}`}</p>,
        },

        {
            title: 'Acciones',
            dataIndex: 'idFundoArea',
            key: 'idFundoArea',
            render: (idFundoArea) => (
                <Space size="middle">
                    <Popconfirm title="¿Deseas modificar el área asignada?"
                        okText="Si"
                        onConfirm={() => showModal(idFundoArea)}
                        cancelText="No">
                        <FormOutlined />
                    </Popconfirm>

                    <Popconfirm
                        onConfirm={() => deleteFundoAreaId(idFundoArea)}
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
                <Table size="small" bordered columns={columns} rowKey={"idFundoArea"} dataSource={data} pagination={{ pageSize: 5 }} />
                : <Empty description={"No hay áreas asignadas registradas hasta el momento."} style={{ padding: '4em' }} />
            }
        </>
    )
}

export default ListAreaFundo
