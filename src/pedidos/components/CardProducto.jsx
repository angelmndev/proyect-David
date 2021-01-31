import React from 'react'
import { Button, InputNumber } from 'antd'

const CardProducto = ({ material, cambiarCantidadMaterial, agregarMaterial }) => {


    return (
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <InputNumber
                    size="small"
                    min={1}
                    // max={10}
                    defaultValue={material.cantidad}
                    onChange={cambiarCantidadMaterial}
                />
                <p style={{ margin: '0', paddingRight: '5em' }}>{material.unidadProducto}</p>
                <Button onClick={agregarMaterial} size="small" type="primary">Añadir</Button>
            </div>
        </div>
    )
}

export default CardProducto
