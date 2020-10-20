import { notification } from 'antd'

export const openNotificationSuccess = (type = "success", placement = 'bottomLeft') => {
    notification[type]({
        message: 'Rol registrado con exito!',
        description:
            'El nuevo rol ha sido registrado en la base de datos.',
        placement,
    });
};



export const openNotificationDelete = (placement = 'bottomLeft') => {
    notification.open({
        message: 'El rol ha sido eliminada',
        placement
    });
};


export const openNotificationUpdate = (type = "success", placement = 'bottomLeft') => {
    notification[type]({
        message: 'Rol actualizado con exito!',
        description:
            'El rol ha sido actualizado en la base de datos.',
        placement,
    });
};


export const openNotificatioUpdate = (type, placement) => {
    notification[type]({
        message: 'Rol actualizado con exito!',
        description:
            'El nuevo rol ha sido Actualizado en la base de datos.',
        placement,
    });
};
