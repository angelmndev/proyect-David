import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown } from 'antd'
import { LogoutOutlined, CodeSandboxOutlined, DownOutlined } from '@ant-design/icons';

//redux
import store from '../../../redux/store'
import { logoutAction } from '../../../redux/actions/actionLogin'
import { connect } from 'react-redux'
import { removeTokens } from '../../../helpers/removeTokens'
const Navbar = ({ usuario }) => {

    const history = useHistory();

    const { Header } = Layout;
    //avatar
    const usuarios = 'DM'
    const colores = '#89B545';

    const [user, setUser] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        setUser(usuarios)
        setColor(colores)
    }, [])

    const cerrarSesion = () => {
        //remove token and user
        removeTokens()
        store.dispatch(logoutAction)
        history.push('/');

    }
    const menu = (<Menu>
        <Menu.Item>
            <LogoutOutlined />
            <button className="session_salir" onClick={() => cerrarSesion()}>
                Cerrar sessión
            </button>
        </Menu.Item>

    </Menu>);


    return (
        <Header className="header">
            <div>
                <h2 className="title__dashboard"><CodeSandboxOutlined /> Logística SPA</h2>
            </div>
            <div>
                <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large">
                    {user}
                </Avatar>
                <Dropdown overlay={menu}>
                    <button className="user__action" style={{ background: 'none', border: 'none' }} href="#nolink">
                        {usuario.nombrePersonal} <DownOutlined />
                    </button>
                </Dropdown>
            </div>

        </Header>
    )
}

const mapStateToProps = state => ({
    usuario: state.sessionReducer.usuario
})
export default connect(mapStateToProps, null)(Navbar)
