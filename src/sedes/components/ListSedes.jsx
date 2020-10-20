import React, { useState, useEffect } from 'react'
import { Popconfirm, Space, Table, Input } from 'antd'
import { FormOutlined, DeleteOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { Empty } from 'antd';
//notification
import { openNotificationWithIconDelete, openNotificationWithIconUpdate } from './Notification'
//modal
import { Modal } from 'antd';
//api
import { deleteSede, editSede, putSede } from '../services/sedesApi'



const ListSedes = ({ sedes, listarSedes }) => {

    //eliminar sede
    const deleteSedeView = async (idSede) => {
        const { success } = await deleteSede(idSede);
        if (success) {
            listarSedes();
            openNotificationWithIconDelete('error', 'bottomLeft');
        }
    };


    //modal
    const [modal, setModal] = useState({ visible: false });

    //editando sede almacenando nombresede y id
    const [itemSede, setItemSede] = useState({})

    //guardando lo que se escribe en el input
    const [inputNombreSede, setInputNombreSede] = useState("")

    //si itemsede cambia  setear valor al setInput
    useEffect(() => {
        setInputNombreSede(itemSede.nombreSede);
    }, [itemSede])

    const showModal = async (idSede) => {
        //seleccionando la sede
        const { sede } = await editSede(idSede);
        setItemSede(sede);
        setModal({
            visible: true,
        });
    };

    const handleInputSede = (e) => {
        setInputNombreSede(e.target.value)
    }

    const handleOk = async () => {
        const { success } = await putSede(itemSede.idSede, inputNombreSede);
        if (success) {
            openNotificationWithIconUpdate('success', 'bottomLeft');
            listarSedes();
            setItemSede({});
            setInputNombreSede("");
        }

        setModal({
            visible: false,
        });
    };

    const handleCancel = e => {
        console.log(e);
        setModal({
            visible: false,
        });
    };


    const data = [];

    sedes.map((sede, index) =>
        data.push({
            orden: index + 1,
            idSede: sede.idSede,
            nombreSede: sede.nombreSede,

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
            title: 'Acciones',
            dataIndex: 'idSede',
            key: 'idSede',
            render: (idSede) => (
                <Space size="middle">
                    <Popconfirm title="¿Deseas modificar la sede?"
                        okText="Si"
                        onConfirm={() => showModal(idSede)}
                        cancelText="No">
                        <FormOutlined />
                    </Popconfirm>

                    <Popconfirm onConfirm={() => deleteSedeView(idSede)} title="¿Deseas eliminar la sede?" okText="Si" cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    return (
        <>

            {data.length > 0 ?
                <Table bordered columns={columns} rowKey={"idSede"} dataSource={data} pagination={{ pageSize: 5 }} />
                : <Empty description={"No hay sedes registradas hasta el momento."} style={{ padding: '4em' }} />
            }
            <Modal
                title="Editar sede"
                visible={modal.visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input name="nombreSede" onChange={handleInputSede} value={inputNombreSede} size="large" placeholder="Ica" prefix={<EnvironmentOutlined />} />
            </Modal>
        </>
    )
}

export default ListSedes
