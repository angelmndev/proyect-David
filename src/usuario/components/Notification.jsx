import { notification } from 'antd'

export const openNotificationSuccess = (type = "success", placement = 'bottomLeft') => {
    notification[type]({
        message: 'Usuario registrados con exito!',
        description:
            'El nuevo usuario ha sido registrada en la base de datos.',
        placement,
    });
};



export const openNotificationDelete = (placement = 'bottomLeft') => {
    notification.open({
        message: 'El usuario establecida ha sido eliminada',
        placement
    });
};


export const openNotificationUpdate = (type = "success", placement = 'bottomLeft') => {
    notification[type]({
        message: 'Usuario establecida actualizada con exito!',
        description:
            'El usuario ha sido actualizada en la base de datos.',
        placement,
    });
};
