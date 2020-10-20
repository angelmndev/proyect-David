import React, { useEffect, useState } from 'react'
import { Drawer, Button, Col, Row, Input, Select, InputNumber } from 'antd';

import { getProductoIdAPI, updateProductoIdAPI } from '../services/materialesApi'
import { getCategoriasProductosAPI } from '../../categoriaProducto/services/categoriaProductosApi'
import { openNotificationUpdate } from '../components/Notificaciones'

import { getAreas } from '../../area/services/areaApi'
import { ListCecos } from '../../ceco/services/cecosApi'

const ModalProductos = ({ visible, setVisible, idProducto, obtenerProductos }) => {

    const { Option } = Select;
    const [producto, setProducto] = useState({
        skuProducto: '',
        nombreProducto: '',
        tipoProducto: '',
        precioReferencialProducto: 0,
        unidadProducto: '',
        fk_categoria: 0,
        fk_area: 0,
        fk_ceco: 0
    });

    const [categorias, setCategorias] = useState([])
    const [areas, guardarAreas] = useState([])
    const [cecos, guardarCecos] = useState([])

    const getProductoId = async (idProducto) => {
        const { producto } = await getProductoIdAPI(idProducto);

        setProducto({
            skuProducto: producto.skuProducto,
            nombreProducto: producto.nombreProducto,
            tipoProducto: producto.tipoProducto,
            precioReferencialProducto: producto.precioReferencialProducto,
            unidadProducto: producto.unidadProducto,
            fk_categoria: producto.fk_categoria,
            fk_area: producto.fk_area,
            fk_ceco: producto.fk_ceco

        });
    }
    useEffect(() => {
        getProductoId(idProducto)

        getCategoriasProductosAPI()
            .then(data => setCategorias(data))

        getAreas()
            .then(areas => guardarAreas(areas))


        ListCecos()
            .then(cecos => guardarCecos(cecos))


    }, [idProducto])

    const handleChangeInput = (values) => {
        setProducto({
            ...producto,
            [values.target.name]: values.target.value
        })
    }

    const handleChangeInputSelectTipo = (values) => {
        setProducto({
            ...producto,
            tipoProducto: values
        })
    }

    const handleChangeInputSelectCategoria = (values) => {
        setProducto({
            ...producto,
            fk_categoria: values
        })
    }

    const handleChangeInputPrecio = (value) => {
        setProducto({
            ...producto,
            precioReferencialProducto: value
        })
    }

    const handleChangeInputSelectArea = (value) => {
        setProducto({
            ...producto,
            fk_area: value
        })
    }

    const handleChangeInputSelecCeco = (value) => {
        setProducto({
            ...producto,
            fk_ceco: value
        })
    }

    const handleChangeUnidad = (value) => {
        setProducto({
            ...producto,
            unidadProducto: value
        })
    }

    //update
    const actualizarProducto = async () => {
        const { success } = await updateProductoIdAPI(idProducto, producto);
        console.log(success);
        if (success) {
            setVisible({
                value: false
            })
            obtenerProductos()
            openNotificationUpdate()

        }
    }

    return (
        <>
            <Drawer
                title="Editando producto"
                width={720}
                onClose={() => setVisible({ value: false })}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div style={{ textAlign: 'right' }} >
                        <Button onClick={() => setVisible({ value: false })}
                            style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary"
                            onClick={() => actualizarProducto()}
                        >
                            Actualizar
                        </Button>
                    </div>
                }
            >

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12} >
                        <p>SKU</p>
                        <Input
                            name="skuProducto"
                            value={producto.skuProducto}
                            onChange={handleChangeInput}

                        />
                    </Col>
                    <Col span={12} >
                        <p>Nombre del material</p>
                        <Input
                            name="nombreProducto"
                            value={producto.nombreProducto}
                            onChange={handleChangeInput}
                        />
                    </Col>
                    <Col span={12} >
                        <p>Tipo de material</p>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="selecciona el tipo"
                            value={producto.tipoProducto}
                            onChange={handleChangeInputSelectTipo}
                        >
                            <Option value="fungible">Fungible</Option>
                            <Option value="no fungible">No fungible</Option>
                        </Select>
                    </Col>
                    <Col span={12} >
                        <p>Categoria de material</p>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Selecciona categoria"
                            optionFilterProp="children"
                            value={producto.fk_categoria}
                            onChange={handleChangeInputSelectCategoria}
                            // onFocus={onFocus}
                            // onBlur={onBlur}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >

                            {
                                categorias.map((item) => (
                                    <Option key={item.idCategoria} value={item.idCategoria}>{item.nombreCategoria}</Option>
                                ))
                            }
                        </Select>,
                    </Col>
                    <Col span={12} >
                        <p>Precio referencial</p>
                        <InputNumber
                            style={{ width: '100%' }}
                            name="precioReferencialProducto"
                            value={producto.precioReferencialProducto}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={handleChangeInputPrecio}
                        />
                    </Col>
                    <Col span={12} >
                        <p>Unidad</p>

                        <Select
                            style={{ width: '100%' }}
                            value={producto.unidadProducto}
                            placeholder="Selecciona unidad"
                            onChange={handleChangeUnidad}
                            allowClear
                        >
                            <Option value="UND">UND</Option>
                            <Option value="JGO">JGO</Option>
                            <Option value="GLN">GLN</Option>
                            <Option value="PAA">PAA</Option>
                            <Option value="KG">KG</Option>
                            <Option value="M">M</Option>
                            <Option value="M2">M2</Option>
                        </Select>


                    </Col>
                    <Col span={12} >
                        <p>área a la que pertenece el material</p>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="selecciona el área"
                            value={producto.fk_area}
                            onChange={handleChangeInputSelectArea}
                        >
                            {
                                areas.map((area) => (
                                    <Option key={area.idArea} value={area.idArea}>{area.nombreArea}</Option>
                                ))
                            }

                        </Select>
                    </Col>
                    <Col span={12} >
                        <p>ceco a la que pertenece el material</p>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="selecciona el ceco"
                            value={producto.fk_ceco}
                            onChange={handleChangeInputSelecCeco}
                        >
                            {
                                cecos.map((ceco) => (
                                    <Option key={ceco.idCeco} value={ceco.idCeco}>{ceco.nombreCeco}</Option>
                                ))
                            }

                        </Select>
                    </Col>

                </Row>

            </Drawer >
        </>
    );
}

export default ModalProductos
