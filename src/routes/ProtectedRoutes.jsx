import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import DashboardLogistica from '../dashboard/components/Dashboard'
// import PanelRequerimientos from '../pedidos/containers/PanelRequerimientos'
import PanelRequerimientos from '../pedidos/containers/PanelRequerimientosv2'

import DashboardView from '../dashboardView/components/DashboardView'

const ProtectedRoutes = ({ auth, rol, component: Component, ...rest }) => {



    if (auth && rol === 'gerente') {

        return <Route {...rest} component={DashboardView} />

    }
    else if (auth && rol === 'Administrador') {

        return <Route {...rest} component={DashboardLogistica} />
    }
    else if (auth && rol === 'usuario') {

        return <Route {...rest} component={PanelRequerimientos} />
    }
    else {


        return <Redirect to="/login" />
    }

}

const mapStateToProps = state => ({
    auth: state.sessionReducer.token,
    rol: state.sessionReducer.usuario.rol
})

export default connect(mapStateToProps, null)(ProtectedRoutes)
