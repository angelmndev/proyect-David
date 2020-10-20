import React, { useRef, useState } from 'react'
import { Table, Input, Space, Button, Badge } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import 'moment/locale/es';


const KardexInventario = ({ listaKardex }) => {

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



    //data de kardex 
    const data = [];

    listaKardex.map((kardex, index) =>
        data.push({
            orden: index + 1,
            id: kardex.idKardexDetalle,
            fecha: kardex.fecha,
            sede: kardex.nombreSede,
            codigoInventario: kardex.codigoInventario,
            descripcion: kardex.descripcionMovimientoKardex,
            producto: kardex.nombreProducto,
            estado: kardex.movimientoKardex,
            cantidadInicial: kardex.inicial,
            cantidadIngreso: kardex.ingresos,
            cantidadRetirada: kardex.salidas,
            cantidadTotal: kardex.total,
            costo: kardex.costo,


        })
    );

    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
            width: 60,
            render: (orden) => <p>{orden}</p>,
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
            width: 100,
            ...getColumnSearchProps('fecha')
        },
        {
            title: 'Sede',
            dataIndex: 'sede',
            key: 'sede',
            width: 50,
            render: text => <p>{text}</p>,
        },
        {
            title: 'Codigo Inventario',
            dataIndex: 'codigoInventario',
            key: 'codigoInventario',
            width: 90,
            render: text => <p>{text}</p>,
        },
        {
            title: 'Descripcion Documento',
            dataIndex: 'descripcion',
            key: 'descripcion',
            width: 150,
            ...getColumnSearchProps('descripcion')
        }
        ,
        {
            title: 'Material',
            dataIndex: 'producto',
            key: 'producto',
            width: 250,
            ...getColumnSearchProps('producto')
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado'
        },
        {
            title: 'Cantidad Inicial',
            dataIndex: 'cantidadInicial',
            key: 'cantidadInicial',

            render: text => <p>{text}</p>,
        },
        {
            title: 'Cantidad Ingresada',
            dataIndex: 'cantidadIngreso',
            key: 'cantidadIngreso',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Cantidad Retirada',
            dataIndex: 'cantidadRetirada',
            key: 'cantidadRetirada',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Cantidad total',
            dataIndex: 'cantidadTotal',
            key: 'cantidadTotal',
            fixed: 'right',
            width: 100,

            render: text => <Badge count={text} style={{ backgroundColor: '#5D3C81' }} overflowCount={1000} />,
        },
    ]


    return (
        <Table size="small" scroll={{ x: 1100 }} bordered columns={columns} rowKey={"id"} dataSource={data} pagination={{ pageSize: 5 }} />

    )
}

export default KardexInventario
