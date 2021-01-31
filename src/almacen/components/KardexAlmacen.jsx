import React, { useRef, useState } from 'react'
import { Table, Input, Space, Button, Badge, Card, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import { CSVLink } from "react-csv";

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
            fecha: kardex.fecha,
            sede: kardex.nombreSede,
            tipoAlmacen: kardex.abr,
            descripcion: kardex.descripcionMovimientoKardex,
            producto: kardex.nombreProducto,
            estado: kardex.movimientoKardex,
            cantidadInicial: kardex.inicial,
            cantidadIngreso: kardex.ingresos,
            cantidadRetirada: kardex.salidas,
            cantidadTotal: kardex.total,

        })
    );

    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
            width: 60

        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
            ...getColumnSearchProps('fecha')
        },
        {
            title: 'Sede',
            dataIndex: 'sede',
            key: 'sede',


        },
        {
            title: 'Almacen',
            dataIndex: 'tipoAlmacen',
            key: 'tipoAlmacen',


        },
        {
            title: 'Descripcion Documento',
            dataIndex: 'descripcion',
            key: 'descripcion',
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('descripcion'),
            render: descripcion => (
                <Tooltip placement="topLeft" title={descripcion}>
                    {descripcion}
                </Tooltip>
            ),
            width: '20%'

        }
        ,
        {
            title: 'Material',
            dataIndex: 'producto',
            key: 'producto',
            width: 100,
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('producto'),
            render: producto => (
                <Tooltip placement="topLeft" title={producto}>
                    {producto}
                </Tooltip>
            ),
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
            render: cantidadTotal => {
                if (cantidadTotal === 0) {
                    return <Badge showZero count={cantidadTotal} style={{ backgroundColor: 'red' }} overflowCount={1000} />
                } else {
                    return <Badge showZero count={cantidadTotal} style={{ backgroundColor: '#5D3C81' }} overflowCount={1000} />
                }
            },
        },
    ]



    return (
        <>
            <Table id="kardex" size="small" bordered columns={columns} rowKey={"id"} dataSource={data} pagination={{ pageSize: 10 }} />
            <Card style={{ width: 200, textAlign: 'center' }}>
                <CSVLink data={data}
                    filename="kardex.csv"
                >
                    exportar kardex
                 </CSVLink>
            </Card>
            <br />


        </>
    )
}

export default KardexAlmacen
