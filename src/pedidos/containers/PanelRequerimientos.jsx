import React, { useState, useEffect } from 'react'
import { Layout } from 'antd';
import '../styles/requerimientos.css'


//redux
import { connect } from 'react-redux'

//componentes
import Navbar from '../components/Navbar'
import InfoUsuario from '../components/InfoUsuario'
import ListMateriales from '../components/ListMateriales';

//api
import { getUsuarioFundoAreaId } from '../../fundoArea/services/fundoAreaApi'

const PanelRequerimientos = ({ data }) => {

    const [usuario, setUsuario] = useState({
        nombre: '',
        sede: '',
        fundo: '',
        area: '',
        fk_area: 0,
        presupuesto: 0,
        fk_sede: 0

    });


    const getUsuarioId = async (data) => {

        const { fundoArea } = await getUsuarioFundoAreaId(data.id)

        setUsuario({
            nombre: data.nombrePersonal,
            sede: fundoArea.nombreSede,
            fundo: fundoArea.nombreFundo,
            presupuesto: fundoArea.presupuestoCeco,
            area: fundoArea.nombreArea,
            fk_area: fundoArea.fk_area,
            fk_sede: fundoArea.fk_sede
        })

    }

    useEffect(() => {
        getUsuarioId(data)

    }, [data])


    return (
        <Layout className="layout">
            {/* navbar */}

            <Navbar />
            {/* info de usuario responsable */}

            <InfoUsuario usuario={usuario} />
            {/* si tiene maquinas especificar mostrar select*/}

            <ListMateriales idUsuario={data.id} fk_sede={usuario.fk_sede} fk_area={usuario.fk_area} presupuesto={usuario.presupuesto} />
            {/* lista de productos a seleccionar */}

        </Layout >
    )
}

const mapStateToProps = state => ({
    data: state.sessionReducer.usuario
})

export default connect(mapStateToProps, null)(PanelRequerimientos)
