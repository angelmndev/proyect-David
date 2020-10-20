import { notification } from 'antd'

export const openNotificationSuccess = (type = "success", placement = 'bottomLeft') => {
    notification[type]({
        message: 'Cecos registrados con exito!',
        description:
            'El nuevo Ceco ha sido registrada en la base de datos.',
        placement,
    });
};



export const openNotificationDelete = (placement = 'bottomLeft') => {
    notification.open({
        message: 'El Ceco establecida ha sido eliminada',
        placement
    });
};


export const openNotificationUpdate = (type = "success", placement = 'bottomLeft') => {
    notification[type]({
        message: 'Ceco actualizada con exito!',
        description:
            'El Ceco ha sido actualizada en la base de datos.',
        placement,
    });
};
