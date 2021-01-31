import React, { useState } from 'react'
import { Row, Col, Input, Alert } from 'antd'

import { buscarProdutoApi } from '../services/pedidosApi'
const VerAlmacen = () => {

    const { Search } = Input;

    //producto Buscado
    const [showCard, setCard] = useState(false)
    const [showError, setError] = useState(false)
    const [material, setMaterial] = useState({
        materialNombre: '',
        codigo: '',
        idProducto: 0,
        cantidadAlmacenGeneral: 0,
        cantidadAlmacenMantenimiento: 0

    })

    const buscarProductoEnAlmacen = async (value) => {

        const { success, producto } = await buscarProdutoApi(value);
        const { nombreProducto, CantAlmacenGeneral, CantAlmacenMantenimiento, skuProducto, idProducto } = producto;

        if (!success) {
            setError(true)

            setCard(false)

        } else {
            setMaterial({
                ...material,
                materialNombre: nombreProducto,
                idProducto: idProducto,
                codigo: skuProducto,
                cantidadAlmacenGeneral: CantAlmacenGeneral,
                cantidadAlmacenMantenimiento: CantAlmacenMantenimiento
            })
            setCard(true)
            setError(false)
        }
    }


    return (

        <Row justify="center" gutter={[16, 32]} style={{ marginRight: 0 }} >
            <Col xs={24} style={{ paddingRight: '0' }}>
                <h1
                    style={{
                        display: 'block',
                        textAlign: 'center',
                        background: '#5D3C81',
                        padding: '.1em  .5em',
                        color: '#FFFFFF'
                    }}>Buscador de materiales</h1>
            </Col>
            <Col xs={22} span={8}>
                {/* buscador */}
                <p style={{ color: '#5D3C81', }}> Busca tu material:</p>
                <Search placeholder="ingresa el codigo"
                    onSearch={buscarProductoEnAlmacen}
                    enterButton />

            </Col>
            <Col xs={22} span={8}>
                {
                    showCard &&
                    <div
                        style={{
                            background: '#F8F8F8',
                            width: '100%',
                            padding: '1em',
                            display: 'grid',

                        }}
                    >
                        <p
                            style={{ fontSize: '1em', fontWeight: 'bold', color: '#5D3C81' }}
                        >
                            {material.materialNombre}
                        </p>
                        <p>Cantidad en almacen general : <strong>{material.cantidadAlmacenGeneral}</strong> </p>
                        <p>Cantidad en almacen mantenimiento : <strong>{material.cantidadAlmacenMantenimiento}</strong> </p>

                    </div>

                }
                {
                    showError &&
                    <Alert
                        message="Advertencia"
                        description="No existen cantidades de este producto en el almacen."
                        type="warning"
                        showIcon
                        closable
                        onClose={() => setError(false)}
                    />

                }

            </Col>
        </Row>



    )
}

export default VerAlmacen
