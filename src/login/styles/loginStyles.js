import wallpaperFondo from '../images/wallpaper-fondo.jpg'
const styles = {
    layoutLogin: {
        minHeight: '100vh'
    },
    layoutForm: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        color: '#5D3C81',
        fontWeight: 'bold'
    },
    wallpaperLogin: {
        backgroundImage: `url(${wallpaperFondo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',


    },
    capa: {

        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(93, 60, 129, .8)',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

    },
    imageLogo: {
        display: 'block',
        maxWidth: '100%',
        padding: '4em 2em'
    }


}

export default styles