import React, { useState, useEffect } from 'react'
import { Modal, Select } from 'antd'
import { } from '@ant-design/icons'


// api FundoArea
import { getFundoAreaIdApi, updateFundoAreaApi } from '../services/fundoAreaApi'
import { getFundos, getFundoSede } from '../../fundo/services/fundoApi'
import { getAreas } from '../../area/services/areaApi'
import { GetCecoSede } from '../../ceco/services/cecosApi'
import { getUsuariosApi } from '../../usuario/services/usuarioApi'
//notification
import { openNotificationUpdate } from './Notification'

const ModalFundoArea = ({ listarFundosAreas, visible, setModal, idFundoArea }) => {
    const { Option } = Select;

    //get fundoAreaId
    const [fundoArea, guardarFundoArea] = useState({
        fk_fundo: 0,
        fk_area: 0,
        fk_ceco: 0,
        fk_usuario: 0
    });
    //gets fundos-areas
    const [fundos, guardarFundos] = useState([]);
    const [areas, guardarAreas] = useState([]);
    const [cecos, guardarCecos] = useState([]);
    const [usuarios, guardarUsuarios] = useState([]);

    useEffect(() => {
        getFundoAreaIdApi(idFundoArea)
            .then(async ({ fundoArea }) => {
                guardarFundoArea({
                    fk_fundo: fundoArea.fk_fundo,
                    fk_area: fundoArea.fk_area,
                    fk_ceco: fundoArea.fk_ceco,
                    fk_usuario: fundoArea.fk_usuario
                })
                const fksede = await getFundoSede(fundoArea.fk_fundo);
                const cecoEscogidos = await GetCecoSede(fksede)
                guardarCecos(cecoEscogidos);

                guardarFundoArea({
                    ...fundoArea,
                    fk_fundo: fundoArea.fk_fundo
                });

            })
            .catch(error => console.log(error));

        getFundos()
            .then(fundos => guardarFundos(fundos))
            .catch(error => console.log(error))

        getAreas()
            .then(areas => guardarAreas(areas))
            .catch(error => console.log(error))

        getUsuariosApi()
            .then(usuarios => guardarUsuarios(usuarios))
            .catch(error => console.log(error))


    }, [idFundoArea]);





    const handleSelectFundoArea = async (value) => {

        const fksede = await getFundoSede(value);
        const cecoEscogidos = await GetCecoSede(fksede)
        guardarCecos(cecoEscogidos);

        guardarFundoArea({
            ...fundoArea,
            fk_fundo: value
        });

    }

    const handleSelectArea = (value) => {
        guardarFundoArea({
            ...fundoArea,
            fk_area: value
        });
    }

    const handleSelectCeco = (value) => {
        guardarFundoArea({
            ...fundoArea,
            fk_ceco: value
        });
    }

    const handleSelectUsuario = (value) => {
        guardarFundoArea({
            ...fundoArea,
            fk_usuario: value
        });
    }



    const actualizarFundoArea = async () => {
        const { success } = await updateFundoAreaApi(idFundoArea, fundoArea);

        if (success) {
            listarFundosAreas()
            openNotificationUpdate()
            setModal({
                visible: false
            })
        }
    }

    return (
        <Modal
            title="Editando Area establecida"
            visible={visible}
            onOk={() => actualizarFundoArea()}
            onCancel={() => setModal({ visible: false })}
        >
            <p>escoge fundo</p>
            <Select value={fundoArea.fk_fundo} onChange={handleSelectFundoArea} placeholder="escoge el fundo" style={{ width: '100%', marginBottom: '1em' }}>
                {
                    fundos.map((item) => (
                        <Option key={item.idFundo} value={item.idFundo}>{item.nombreFundo}</Option>
                    ))
                }

            </Select>
            <p>escoge area</p>
            <Select value={fundoArea.fk_area} onChange={handleSelectArea} placeholder="escoge el área" style={{ width: '100%', marginBottom: '1em' }}>
                {areas.map((item) => (
                    <Option key={item.idArea} value={item.idArea}>{item.nombreArea}</Option>
                ))}
            </Select>
            <p>escoge ceco</p>
            <Select value={fundoArea.fk_ceco} onChange={handleSelectCeco} placeholder="escoge el área" style={{ width: '100%', marginBottom: '1em' }}>
                {cecos.map((item) => (
                    <Option key={item.idCeco} value={item.idCeco}>{item.nombreCeco}</Option>
                ))}
            </Select>
            <p>designa al usuario responsable</p>
            <Select value={fundoArea.fk_usuario} onChange={handleSelectUsuario} placeholder="escoge el área" style={{ width: '100%', marginBottom: '1em' }}>
                {usuarios.map((item) => (
                    <Option key={item.idUsuario} value={item.idUsuario}>{item.nombrePersonalUsuario}-{item.apellidoPersonalUsuario}</Option>
                ))}
            </Select>
        </Modal>
    )
}

export default ModalFundoArea
