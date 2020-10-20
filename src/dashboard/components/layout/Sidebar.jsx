import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import { AppstoreOutlined, GoldOutlined, DeploymentUnitOutlined, TeamOutlined, CodepenOutlined, PartitionOutlined, EnvironmentOutlined, DollarOutlined } from '@ant-design/icons';

const Sidebar = () => {

    const { SubMenu } = Menu;
    const { Sider } = Layout;
    const { url } = useRouteMatch();

    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"

                style={{ height: '100%', borderRight: 0 }}
            >



                <Menu.Item key="main1" icon={<EnvironmentOutlined />}>
                    <Link to={`${url}/sedes`}>Sedes</Link>
                </Menu.Item>

                <Menu.Item key="main2" icon={<EnvironmentOutlined />}>
                    <Link to={`${url}/fundos`}>Fundos</Link>
                </Menu.Item>
                <Menu.Item key="sub4-1" icon={<PartitionOutlined />}>
                    <Link to={`${url}/areas`}>Ver áreas</Link>
                </Menu.Item>
                <Menu.Item key="sub8" icon={<DollarOutlined />}>
                    <Link to={`${url}/cecos`}>Cecos</Link>
                </Menu.Item>
                <SubMenu key="sub5" icon={<TeamOutlined />} title="Usuarios">
                    <Menu.Item key="sub5-1">
                        <Link to={`${url}/usuarios`}>Ver usuarios</Link>
                    </Menu.Item>
                    <Menu.Item key="sub5-2"><Link to={`${url}/roles`}></Link>Roles</Menu.Item>
                </SubMenu>
                <Menu.Item key="sub4-2" icon={<DeploymentUnitOutlined />}>
                    <Link to={`${url}/designacion`}>Designación general</Link>
                </Menu.Item>


                {/* <Menu.Item key="sub9" icon={<AppstoreOutlined />}>
                    <Link to={`${url}/inventario`}>Inventario</Link>
                </Menu.Item> */}
                <Menu.Item key="sub10" icon={<AppstoreOutlined />}>
                    <Link to={`${url}/almacen`}>Almacén</Link>
                </Menu.Item>
                {/* <Menu.Item key="sub8" icon={<AppstoreOutlined />}>
                    <Link to={`${url}/inventario`}>Inventario General</Link>
                </Menu.Item> */}
                <Menu.Item key="sub6" icon={<GoldOutlined />}>
                    <Link to={`${url}/materiales`}>Materiales</Link>
                </Menu.Item>
                <Menu.Item key="sub7" icon={<CodepenOutlined />}>
                    <Link to={`${url}/pedidos`}>Pedidos</Link>
                </Menu.Item>

            </Menu>
        </Sider>
    )
}

export default Sidebar
