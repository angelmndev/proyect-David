import React, { useState, useEffect } from 'react'
import { Descriptions, Tag, Tabs } from 'antd'
import NewProducto from '../components/NewProducto';
import ListProductos from '../components/ListProductos';
import { listarProductosAPI, deleteProductoAPI } from '../services/materialesApi'
import { openNotificationDelete } from '../components/Notificaciones'
import ModalProductos from '../components/ModalProductos'
// import RegistroMasivo from '../components/RegistroMasivo'

const MaterialesContainer = () => {
    const { TabPane } = Tabs;

    const [productos, setProductos] = useState([]);
    const [visible, setVisible] = useState({ value: false })
    const [idProducto, setProductoId] = useState(0);

    const obtenerProductos = async () => {
        const data = await listarProductosAPI();
        setProductos(data)
    }

    const editarProducto = (id) => {
        setVisible({
            value: true
        })
        setProductoId(id)
    }

    useEffect(() => {
        obtenerProductos()
    }, [])

    const deleteProducto = async (id) => {
        console.log(id);
        const { success } = await deleteProductoAPI(id);
        if (success) {
            obtenerProductos();
            openNotificationDelete()
        }
    }

    return (
        <>
            {/* component description */}
            <Descriptions title="Nuestros Materiales Registrados" >
                <Descriptions.Item >
                    Bienvenido a la sección materiales aqui registrarás nuevos materiales en la base de datos.
            </Descriptions.Item>
                <Descriptions.Item >
                    <p style={{ marginRight: '1em' }}> Aqui podras hacer las siguientes operaciones:</p>
                    <br />
                    <Tag color="success">Registar material</Tag>
                    <Tag color="processing">actualizar material</Tag>
                    <Tag color="error">Eliminar material</Tag>

                </Descriptions.Item>
            </Descriptions>

            <Tabs type="card" defaultActiveKey="1">

                <TabPane tab="Productos registrados" key="1" >
                    <ListProductos productos={productos} editarProducto={editarProducto} deleteProducto={deleteProducto} />
                </TabPane>
                <TabPane tab="Registrar Producto" key="2">
                    <NewProducto listarProductos={obtenerProductos} />
                </TabPane>
            </Tabs>
            {
                visible.value && <ModalProductos idProducto={idProducto} visible={visible.value} setVisible={setVisible} obtenerProductos={obtenerProductos} />
            }
        </>
    )
}

export default MaterialesContainer
