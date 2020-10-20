import { notification } from 'antd'



export const openNotificationCantidadNoExiste = type => {
    notification[type]({
        message: 'El producto no cuenta con existencias!',
        description:
            'Hola, no puedes sacar este producto por qué se te agoto el stock.',
    });
};


export const openNotificationIngresoInventario = type => {
    notification[type]({
        message: 'Producto ingresado con exito!'

    });
}


export const openNotificationSalidaInventario = type => {
    notification[type]({
        message: 'Producto retirado con exito!'
    });
}


export const openNotificationValidacionProducto = type => {
    notification[type]({
        message: 'El producto seleccionado no ha sido inicializado en el almacen!',
        description:
            'Hola, para poder ingresa inicialize el producto en el almacen'

    });
}

export const openNoticationProductoInicializado = type => {
    notification[type]({
        message: 'Los productos han sido inicializados!',
        description:
            'Hola, acabas de registrar productos en el almacen esto te permitirá las siguientes opciones INGRESOS Y SALIDAS'

    });
}


export const openNoticationProductoYaExiste = type => {
    notification[type]({
        message: 'El producto ya ha sido registrado!',
        description:
            'Debes de retirarlo para evitar duplicidad de materiales'

    });
}


