const API_URL = `${process.env.REACT_APP_API_URL}/login`

export const sessionLogin = async (nombreUsuario, claveUsuario) => {

    const usuario = {
        nombreUsuario,
        claveUsuario
    }

    const request = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    }


    try {
        const responseServer = await fetch(API_URL, request)
        const { success, token } = await responseServer.json()

        if (success) {
            localStorage.setItem('token', token)
            return success;
        }
        return success

    } catch (error) {

        console.log(error);
    }



}

