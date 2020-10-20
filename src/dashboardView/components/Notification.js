import { notification } from 'antd'

export const openNotificationAprobado = type => {
    notification[type]({
        message: 'Pedido Aprobado!'
    });
};


export const openNotificationRechazado = type => {
    notification[type]({
        message: 'Pedido rechazado!'
    });
};
