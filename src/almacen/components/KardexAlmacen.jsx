import React, { useRef, useState } from 'react'
import { Table, Input, Space, Button, Badge } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import 'moment/locale/es';


const KardexAlmacen = ({ listaKardex }) => {

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


        },
        {
            title: 'Codigo Inventario',
            dataIndex: 'codigoInventario',
            key: 'codigoInventario',


        },
        {
            title: 'Descripcion Documento',
            dataIndex: 'descripcion',
            key: 'descripcion',
            ...getColumnSearchProps('descripcion'),
            width: 400
        }
        ,
        {
            title: 'Material',
            dataIndex: 'producto',
            key: 'producto',
            width: 100,
            ...getColumnSearchProps('producto')
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado'
        },
        {
            title: 'Cant. Inicial',
            dataIndex: 'cantidadInicial',
            key: 'cantidadInicial',


        },
        {
            title: 'Cant. Ingresada',
            dataIndex: 'cantidadIngreso',
            key: 'cantidadIngreso',

        },
        {
            title: 'Cant. Retirada',
            dataIndex: 'cantidadRetirada',
            key: 'cantidadRetirada',

        },
        {
            title: 'Cantidad total',
            dataIndex: 'cantidadTotal',
            key: 'cantidadTotal',
            fixed: 'right',



            render: text => <Badge count={text} style={{ backgroundColor: '#5D3C81' }} overflowCount={1000} />,
        },
    ]


    return (
        <Table scroll={{ x: 1400 }} size="small" bordered columns={columns} rowKey={"id"} dataSource={data} pagination={{ pageSize: 5 }} />

    )
}

export default KardexAlmacen
