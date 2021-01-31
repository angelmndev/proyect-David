import React from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Avatar } from 'antd';
//navbar
import { Menu, Dropdown, Affix } from 'antd';


//remove tokens
import { removeTokens } from '../../helpers/removeTokens'
//redux
import store from '../../redux/store'
import { logoutAction } from '../../redux/actions/actionLogin'

import { UserOutlined, PieChartOutlined } from '@ant-design/icons'
const Navbar = () => {
    const history = useHistory();
    const { Header } = Layout;


    const cerrarSesion = () => {
        removeTokens()
        store.dispatch(logoutAction)
        history.push('/')
    }

    const menu = (
        <Menu >
            <Menu.Item key="0" disabled>
                <button className="boton_navbar_r"  >Configuración</button>
            </Menu.Item>
            <Menu.Item key="1" disabled>
                <button className="boton_navbar_r" >Perfil</button>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">
                <button className="session_salir" onClick={() => cerrarSesion()}>
                    Cerrar sessión
                </button>
            </Menu.Item>
        </Menu>
    );


    return (
        <Affix offsetTop={0}>
            <Header className="header__navbar" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <div className="title__navbar">
                    <h2 className="title__dashboard"><PieChartOutlined /> Vista general</h2>
                </div>
                <div className="avatar__navbar">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <button style={{ background: 'none', border: 'none' }} className="boton_navbar_r" onClick={e => e.preventDefault()}>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </button>
                    </Dropdown>
                </div>
            </Header>
        </Affix>
    )
}

export default Navbar
