import React, { useState } from 'react'
import { Space, Popconfirm, Table } from 'antd';
import { FormOutlined, DeleteOutlined, DollarCircleOutlined } from '@ant-design/icons'
import EditPresupuesto from './EditPresupuesto'
import { GetCeco } from '../services/cecosApi'
const ListaCeco = ({ cecos, editarCeco, deleteCeco, obtenerCecos }) => {

    //state modal
    const [modal, setModal] = useState({
        visible: false
    })

    const [ceco, setCeco] = useState({})

    //mostrarModal
    const mostrarModalPresupuesto = async (id) => {
        const { ceco } = await GetCeco(id)
        setCeco(ceco)
        setModal({
            visible: true
        })
    }


    const data = [];

    cecos.map((ceco, index) =>
        data.push({
            orden: index + 1,
            idCeco: ceco.idCeco,
            codigoCeco: ceco.codigoCeco,
            nombreCeco: ceco.nombreCeco,
            nombreSede: ceco.nombreSede,
            presupuestoCeco: ceco.presupuestoCeco

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
            title: 'codigo CECO',
            dataIndex: 'codigoCeco',
            key: 'codigoCeco',
            render: text => <p>{text}</p>,
        },
        {
            title: 'nombre CECO',
            dataIndex: 'nombreCeco',
            key: 'nombreCeco',
            render: text => <p>{text}</p>,
        },
        {
            title: 'sede',
            dataIndex: 'nombreSede',
            key: 'nombreSede',
            render: text => <p>{text}</p>,
        },
        {
            title: 'presupuesto',
            dataIndex: 'presupuestoCeco',
            key: 'presupuestoCeco',
            render: text => <p>${text}</p>,
        },
        {
            title: 'Acciones',
            dataIndex: 'idCeco',
            key: 'idCeco',
            render: (idCeco) => (
                <Space size="middle">
                    <Popconfirm title="¿Deseas modificar el ceco?"
                        okText="Si"
                        onConfirm={() => editarCeco(idCeco)}
                        cancelText="No">
                        <FormOutlined />
                    </Popconfirm>

                    <Popconfirm
                        onConfirm={() => deleteCeco(idCeco)}
                        title="¿Deseas eliminar el ceco?" okText="Si" cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>
                    <Popconfirm
                        onConfirm={() => mostrarModalPresupuesto(idCeco)}
                        title="¿Deseas agregar saldo al presupuesto?" okText="Si" cancelText="No">
                        <DollarCircleOutlined />
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <>
            <Table bordered columns={columns} rowKey={"idCeco"} dataSource={data} pagination={{ pageSize: 5 }} />
            {
                modal.visible && <EditPresupuesto obtenerCecos={obtenerCecos} ceco={ceco} modal={modal} setModal={setModal} />

            }
        </>
    )
}

export default ListaCeco
