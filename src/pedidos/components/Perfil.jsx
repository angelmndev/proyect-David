import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
//remove tokens
import { removeTokens } from '../../helpers/removeTokens'
//redux
import store from '../../redux/store'
import { logoutAction } from '../../redux/actions/actionLogin'

//api
import { getUsuarioFundoAreaId } from '../../fundoArea/services/fundoAreaApi'


const Perfil = ({ usuarioStore }) => {

    const history = useHistory();
    const { Title } = Typography

    const [usuario, setUsuario] = useState({})


    const getUsuarioId = async (data) => {

        const { fundoArea } = await getUsuarioFundoAreaId(data.id)
        setUsuario({
            nombre: fundoArea.nombrePersonalUsuario,
            apellido: fundoArea.apellidoPersonalUsuario,
            sede: fundoArea.nombreSede,
            fundo: fundoArea.nombreFundo,
            area: fundoArea.nombreArea,
            fk_ceco: fundoArea.idCeco
        })

    }

    const cerrarSesion = () => {
        removeTokens()
        store.dispatch(logoutAction)
        history.push('/')
    }


    useEffect(() => {

        getUsuarioId(usuarioStore)

    }, [usuarioStore])


    const { nombre, apellido, sede, fundo, area } = usuario;

    return (
        <Row justify="center" gutter={[16, 32]} style={{ marginRight: 0 }}>
            <Col xs={24} style={{ paddingRight: '0' }}>
                <h1 style={{ display: 'block', textAlign: 'center', background: '#5D3C81', padding: '.1em  .5em', color: '#FFFFFF' }}>Mi perfil</h1>
            </Col>
            <Col xs={24}>
                <Title
                    level={4}
                    style={{ display: 'block', textAlign: 'center' }}

                >{nombre} {apellido}</Title>
            </Col>
            <Col xs={24} >
                <h4
                    level={5}
                    style={{ display: 'block', textAlign: 'center' }}

                >Sede: {sede}</h4>
            </Col>
            <Col xs={24} >
                <h4
                    level={5}
                    style={{ display: 'block', textAlign: 'center' }}

                >Fundo: {fundo}</h4>
            </Col>
            <Col xs={24} >
                <h4
                    level={5}
                    style={{ display: 'block', textAlign: 'center' }}

                >Area: {area}</h4>
            </Col>
            <Col xs={22} span={20}>
                <Button
                    onClick={cerrarSesion}
                    style={{ marginBottom: '4em' }}
                    size="large" type="primary" block>Salir</Button>
            </Col>
        </Row>
    )


}


const mapStateToProps = state => ({
    usuarioStore: state.sessionReducer.usuario
})

export default connect(mapStateToProps, null)(Perfil)