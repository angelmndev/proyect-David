import { notification } from 'antd'

export const openNotificationSuccess = (type = "success", placement = 'bottomLeft') => {
    notification[type]({
        message: 'Área y presupuesto registrados con exito!',
        description:
            'La nueva Area y presupuesto ha sido registrada en la base de datos.',
        placement,
    });
};



export const openNotificationDelete = (placement = 'bottomLeft') => {
    notification.open({
        message: 'El área establecida ha sido eliminada',
        placement
    });
};


export const openNotificationUpdate = (type = "success", placement = 'bottomLeft') => {
    notification[type]({
        message: 'Área establecida actualizada con exito!',
        description:
            'El área establecida ha sido actualizada en la base de datos.',
        placement,
    });
};
