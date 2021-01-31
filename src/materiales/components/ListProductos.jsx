import React, { useRef, useState } from 'react'
import { Space, Input, Button, Popconfirm, Table, Tooltip } from 'antd';
import { FormOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import { moneyFormat } from '../../utils/moneyFormat'

const ListProductos = ({ productos, editarProducto, deleteProducto }) => {
    //state
    const [state, setState] = useState({
        searchText: '',
        searchedColumn: '',
    })

    //REF
    let searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setState({ searchText: '' });
    };



    //filters metodos
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Buscar
          </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Resetear
          </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });

    // filtro de busqueda table
    const data = [];

    productos.map((producto, index) =>
        data.push({
            orden: index + 1,
            idProducto: producto.idProducto,
            skuProducto: producto.skuProducto,
            nombreProducto: producto.nombreProducto,
            fk_categoria: producto.fk_categoria,
            tipoProducto: producto.tipoProducto,
            precioReferencialProducto: producto.precioReferencialProducto,
            unidadProducto: producto.unidadProducto,
            nombreArea: producto.nombreArea,
            nombreCeco: producto.nombreCeco,
            nombreCategoria: producto.nombreCategoria

        })
    );

    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
            width: 58,
            render: (orden) => <p>{orden}</p>,
        },
        {
            title: 'SKU',
            dataIndex: 'skuProducto',
            key: 'skuProducto',
            width: '8%',
            ...getColumnSearchProps('skuProducto')
        },
        {
            title: 'nombreProducto',
            dataIndex: 'nombreProducto',
            key: 'nombreProducto',
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('nombreProducto'),
            render: nombreProducto => (
                <Tooltip placement="topLeft" title={nombreProducto}>
                    {nombreProducto}
                </Tooltip>
            ),
        },
        {
            title: 'tipo',
            dataIndex: 'tipoProducto',
            key: 'tipoProducto',
            render: text => <p>{text}</p>,
        },
        {
            title: 'categoria',
            dataIndex: 'nombreCategoria',
            key: 'nombreCategoria',
            render: text => <p>{text}</p>,
        },
        {
            title: ' precio referencial',
            dataIndex: 'precioReferencialProducto',
            key: 'precioReferencialProducto',
            width: '8%',
            render: text => <p>S/ {moneyFormat(text)}</p>,
        },
        {
            title: 'unidad',
            dataIndex: 'unidadProducto',
            key: 'unidadProducto',
            render: text => <p>{text}</p>,
            width: '5%'
        },
        {
            title: 'area',
            dataIndex: 'nombreArea',
            key: 'nombreArea',
            render: text => <p>{text}</p>,
        },
        {
            title: 'CECO',
            dataIndex: 'nombreCeco',
            key: 'nombreCeco',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Acciones',
            dataIndex: 'idProducto',
            key: 'idProducto',
            width: '6%',
            render: (idProducto) => (
                <Space size="middle">
                    <Popconfirm title="¿Deseas modificar el producto?"
                        okText="Si"
                        onConfirm={() => editarProducto(idProducto)}
                        cancelText="No">
                        <FormOutlined />
                    </Popconfirm>

                    <Popconfirm
                        onConfirm={() => deleteProducto(idProducto)}
                        title="¿Deseas eliminar el material?" okText="Si" cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    return (
        <>
            <Table size="small" bordered columns={columns} rowKey={"idProducto"} dataSource={data} pagination={{ pageSize: 10 }} />

        </>
    )
}

export default ListProductos
