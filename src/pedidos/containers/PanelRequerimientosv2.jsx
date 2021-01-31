import React, { useEffect } from 'react'
import { Route, useRouteMatch, Link, Switch, BrowserRouter } from 'react-router-dom'
import { SearchOutlined, AuditOutlined, CodeSandboxOutlined, UserOutlined } from '@ant-design/icons'
import '../styles/uiUsuario.css'

import PedidoFirstForm from '../components/PedidoFirstForm';
import Perfil from '../components/Perfil'
import StatusPedido from '../components/StatusPedido'
import VerAlmacen from '../components/VerAlmacen'
import { connect } from 'react-redux'
import { getUsuarioFundoAreaId } from '../../fundoArea/services/fundoAreaApi'

const PanelRequerimientosv2 = ({ usuarioStore }) => {
    let { path } = useRouteMatch();
    let { url } = useRouteMatch();



    const getUsuarioId = async (usuario) => {
        const { fundoArea } = await getUsuarioFundoAreaId(usuario.id)
        localStorage.setItem('idArea', fundoArea.idArea)

    }

    useEffect(() => {
        getUsuarioId(usuarioStore)
    }, [usuarioStore])

    return (
        <BrowserRouter>


            <div>
                <Switch>
                    {/* <Redirect to={`${path}/pedido`}/> */}
                    <Route exact path={`${path}/vistaAlmacen`} component={VerAlmacen} />
                    <Route exact path={`${path}/pedido`} component={PedidoFirstForm} />
                    <Route exact path={`${path}/perfil`} component={Perfil} />
                    <Route exact path={`${path}/MiPedido`} component={StatusPedido} />
                </Switch>

            </div>
            <div style={{
                width: '100%',
                height: '5em',
                backgroundColor: '#5D3C81',
                position: 'fixed',
                bottom: '0',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',


            }}>


                <Link to={`${url}/vistaAlmacen`} style={{ color: '#FFF', textAlign: 'center' }}>
                    <div>

                        <SearchOutlined />
                        <p style={{ fontSize: '.9em' }}>Almacen</p>
                    </div>
                </Link>

                <Link to={`${url}/pedido`} style={{ color: '#FFF', textAlign: 'center' }}>
                    <div>
                        <AuditOutlined />
                        <p style={{ fontSize: '.9em' }}>Pedir materiales</p>
                    </div>
                </Link>
                <Link to={`${url}/MiPedido`} style={{ color: '#FFF', textAlign: 'center' }}>
                    <div>
                        <CodeSandboxOutlined />
                        <p style={{ fontSize: '.9em' }}>Mi pedido</p>
                    </div>
                </Link>
                <Link to={`${url}/perfil`} style={{ color: '#FFF', textAlign: 'center' }}>
                    <div>
                        <UserOutlined />
                        <p style={{ fontSize: '.9em' }}>Mi perfil</p>
                    </div>
                </Link>

            </div>
        </BrowserRouter >
    )
}

const mapStateToProps = state => ({
    usuarioStore: state.sessionReducer.usuario
})

export default connect(mapStateToProps, null)(PanelRequerimientosv2)
