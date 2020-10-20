import { notification } from 'antd'

export const openNotificationWithIcon = (type, placement) => {
    notification[type]({
        message: 'Sede registrada con exito!',
        description:
            'La nueva sede ha sido registrada en la base de datos.',
        placement,
    });
};



export const openNotificationWithIconDelete = (type, placement) => {
    notification.open({
        message: 'La sede a sido eliminada',
        placement
    });
};


export const openNotificationWithIconUpdate = (type, placement) => {
    notification[type]({
        message: 'Sede actualizada con exito!',
        description:
            'La nueva sede ha sido actualizada en la base de datos.',
        placement,
    });
};
