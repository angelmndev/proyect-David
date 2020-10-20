import React from 'react'
import { Row, Col, Form, Input, Button, Typography } from 'antd'
import styles from '../styles/loginStyles'
import '../styles/login.css'
import imageForm from '../images/form-logo.svg'
import betaLogo from '../images/beta-logo.png'

//redux
import { sessionLoginAction } from '../../redux/actions/actionLogin'
import { connect } from 'react-redux'

const { Title } = Typography;

const Login = ({ loginUsuario }) => {
    const [form] = Form.useForm();

    const loginView = (values) => {
        const { nombreUsuario, claveUsuario } = values;
        loginUsuario(nombreUsuario, claveUsuario)

    }
    return (
        <Row style={styles.layoutLogin}>
            <Col xs={24} lg={8}>
                <Row style={styles.layoutForm} >
                    <Col xs={18} >
                        <Title style={styles.title} level={3}>LOGÍSTICA-SPA</Title>
                        <img src={imageForm} alt="Imagen del formulario" />
                        <Form
                            layout={`vertical`}
                            form={form}
                            onFinish={loginView}

                        >
                            <Form.Item
                                label="Tu codigo de usuario"
                                name="nombreUsuario"
                                rules={[{ required: true, message: 'Por favor Ingrese su nombre de usuario!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Tu contraseña"
                                name="claveUsuario"
                                rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button block htmlType="submit" type="primary">Iniciar sesión</Button>
                            </Form.Item>

                        </Form>
                    </Col>
                </Row>
            </Col>
            <Col className="wallpaper" style={styles.wallpaperLogin} span={16}>
                <div style={styles.capa}>
                    <span className="linea__before"></span>
                    <img style={styles.imageLogo} className="logo__beta" src={betaLogo} alt="Logo de beta" />
                    <span className="linea__after"></span>
                </div>
            </Col>
        </Row>
    )
}

const mapDispatchToProps = (dispatch) => ({
    loginUsuario: (nombreUsuario, claveUsuario) => {
        dispatch(sessionLoginAction(nombreUsuario, claveUsuario))
    }
})

export default connect(null, mapDispatchToProps)(Login)