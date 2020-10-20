import { LOGIN, VERIFICAR_USUARIO, LOGOUT } from '../actionTypes/actionTypes'
import { sessionLogin } from '../../login/services/session'
import { verificarUsuario } from '../../dashboard/services/verificarUsuario'
export const sessionLoginAction = (nombreUsuario, claveUsuario) => async dispatch => {


    const responseService = await sessionLogin(nombreUsuario, claveUsuario)

    if (responseService) {
        dispatch({ type: LOGIN, success: responseService })
        dispatch(verificarUsuarioAction)
    }


}


export const verificarUsuarioAction = async (dispatch) => {

    const usuario = await verificarUsuario()


    dispatch({ type: VERIFICAR_USUARIO, usuario: usuario })
}

export const logoutAction = async (dispatch) => {
    dispatch({ type: LOGOUT, auth: false })
}