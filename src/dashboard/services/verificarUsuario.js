const API_URL = `${process.env.REACT_APP_API_URL}/dashboard`


export const verificarUsuario = async () => {
    const token = localStorage.getItem('token')
    const config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }

    }



    const responseApi = await fetch(API_URL, config)
    const { usuario } = await responseApi.json()
    const { idUsuario, nombrePersonalUsuario, nombreRol } = usuario;
    localStorage.setItem('usuario', JSON.stringify({ id: idUsuario, rol: nombreRol, nombrePersonal: nombrePersonalUsuario }))
    return { idUsuario, nombrePersonalUsuario, nombreRol }
}