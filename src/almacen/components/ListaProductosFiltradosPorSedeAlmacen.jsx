import React, { useRef, useState } from 'react'
import { Table, Tag, Input, Space, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import { moneyFormat } from '../../utils/moneyFormat'
const ListaProductosFiltradosPorSedeAlmacen = ({ listaProductos }) => {
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

    const dataSource = [];

    // eslint-disable-next-line
    listaProductos.map((item, index) => {

        dataSource.push({
            orden: index + 1,
            nombreAlmacen: item.nombreInventario,
            nombreMaterial: item.nombreProducto,
            cantidadMaterial: item.cantidadProductoAlmacen,
            costoUnidad: item.costoProductoAlmacen
        })
    })

    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
        },
        {
            title: 'Almacen',
            dataIndex: 'nombreAlmacen',
            key: 'nombreAlmacen',
            render: (nombreAlmacen) => {
                switch (nombreAlmacen) {
                    case 'ALMACEN  GENERAL':
                        return <Tag color="blue">{nombreAlmacen}</Tag>

                    case 'ALMACEN MANTENIMIENTO CASTILLOS':
                        return <Tag Tag color="green" > {nombreAlmacen}</Tag>

                    case 'ALMACEN MANTENIMIENTO VID':
                        return <Tag Tag color="purple" > {nombreAlmacen}</Tag>

                    default:
                        break;
                }


            }

        },
        {
            title: 'Material',
            dataIndex: 'nombreMaterial',
            key: 'nombreMaterial',
            ...getColumnSearchProps('nombreMaterial')
        },
        {
            title: 'Cantidad total',
            dataIndex: 'cantidadMaterial',
            key: 'cantidadMaterial',
        },
        {
            title: 'Costo unitario',
            dataIndex: 'costoUnidad',
            key: 'costoUnidad',
            render: (costo) => `S/ ${moneyFormat(costo)}`
        },
    ];

    return (<Table

        scroll={{ x: 320 }}
        size="small" bordered columns={columns} rowKey={"orden"} dataSource={dataSource} pagination={{ pageSize: 10 }} />)
}

export default ListaProductosFiltradosPorSedeAlmacen
