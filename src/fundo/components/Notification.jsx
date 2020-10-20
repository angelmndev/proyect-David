import { notification } from 'antd'

export const openNotificationSuccess = (type = "success", placement = 'bottomLeft') => {
    notification[type]({
        message: 'Fundo registrada con exito!',
        description:
            'El nuevo fundo ha sido registrada en la base de datos.',
        placement,
    });
};



export const openNotificationDelete = (placement = 'bottomLeft') => {
    notification.open({
        message: 'El fundo ha sido eliminada',
        placement
    });
};


export const openNotificationUpdate = (type = "success", placement = 'bottomLeft') => {
    notification[type]({
        message: 'Fundo actualizado con exito!',
        description:
            'El fundo ha sido actualizada en la base de datos.',
        placement,
    });
};
