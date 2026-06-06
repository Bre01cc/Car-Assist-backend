/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL da manutenção
 * Data: 11/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const manutencaoDAO = require('../../model/DAO/manutencao.js');

const controllerEvidencia = require('../evidencia/evidencia_controller.js');

const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

//Import da controller que faz upload da foto
const UPLOAD = require('../upload/controller_upload_azure.js');

//Retorna todas as manutenções
const listarManutencao = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let resultManutencao = await manutencaoDAO.getAllMaintenance();

        if (resultManutencao) {

            if (resultManutencao.length > 0) {

                const manutencao = await Promise.all(
                    resultManutencao.map(async (manutencao) => {

                        let evidencia = await controllerEvidencia
                            .buscarEvidenciaIdMaintenance(manutencao.id)

                        manutencao.evidencia = evidencia.data?.evidencia || []
                        let manutencaoFormatada = formatarManutencao(manutencao)
                        return manutencaoFormatada

                    })
                )

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { manutencoes: manutencao }
                )


            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )//404
            }

        } else {
            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_NOT_FOUND
            )//404
        }


    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}
//Retorna uma manutenção pelo id
const buscarManutencaoId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {

            let resultManutencao = await manutencaoDAO.getMaintenanceById(id)

            if (resultManutencao) {

                if (resultManutencao.length > 0) {

                    const manutencao = await Promise.all(
                        resultManutencao.map(async (manutencao) => {

                            let evidencia = await controllerEvidencia
                                .buscarEvidenciaIdMaintenance(manutencao.id)

                            manutencao.evidencia = evidencia.data?.evidencia || []

                            let manutencaoFormatada = formatarManutencao(manutencao)

                            return manutencaoFormatada
                        })
                    )

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { manutencao: manutencao }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )

                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }
        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

//Retorna uma manutenção pelo id do tipo de manutenção
const buscarManutencaoIdTipo = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {

            let resultManutencao = await manutencaoDAO.getMaintenanceByIdType(id);

            if (resultManutencao) {

                if (resultManutencao.length > 0) {

                    const manutencaoFormatada = await Promise.all(
                        resultManutencao.map(async (manutencao) => {

                            let evidencia = await controllerEvidencia
                                .buscarEvidenciaIdMaintenance(manutencao.id)

                            manutencao.evidencia = evidencia.data?.evidencia || []
                            let manutencaoFormatada = formatarManutencao(manutencao)
                            return manutencaoFormatada

                        })
                    )

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { manutencao: manutencaoFormatada }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

//Retorna uma manutenção pelo id do usuário
const buscarManutencaoIdUsuario = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {

            let resultManutencao = await manutencaoDAO.getMaintenanceByIdUser(id);

            if (resultManutencao) {

                if (resultManutencao.length > 0) {

                    const manutencaoFormatada = await Promise.all(
                        resultManutencao.map(async (manutencao) => {

                            let evidencia = await controllerEvidencia
                                .buscarEvidenciaIdMaintenance(manutencao.id)

                            manutencao.evidencia = evidencia.data?.evidencia || []

                            let manutencaoFormatada = formatarManutencao(manutencao)

                            return manutencaoFormatada

                        })
                    )

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { manutencao: manutencaoFormatada }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

//Retorna uma manutenção pelo id do usuário
const buscarManutencaoIdVeiculo = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {

            let resultManutencao = await manutencaoDAO.getMaintenanceByIdVehicle(id);

            if (resultManutencao) {

                if (resultManutencao.length > 0) {

                    const manutencaoFormatada = await Promise.all(
                        resultManutencao.map(async (manutencao) => {

                            let evidencia = await controllerEvidencia
                                .buscarEvidenciaIdMaintenance(manutencao.id)

                            manutencao.evidencia = evidencia.data?.evidencia || []

                            let manutencaoFormatada = formatarManutencao(manutencao)

                            return manutencaoFormatada

                        })
                    )
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { manutencao: manutencaoFormatada }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}
//Cadastra uma manutenção no banco de dados
const inserirManutencao = async (manutencao, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (String(contentType).toUpperCase() == 'MULTIPART/FORM-DATA') {

            //Validação dos dados da manutenção
            let validar = validarManutencao(manutencao);

            if (!validar) {

                let resultManutencao = await manutencaoDAO.postManutencao(manutencao);

                if (resultManutencao) {

                    let ultimoId = await manutencaoDAO.getSelectLastId();

                    if (ultimoId) {

                        manutencao.id = ultimoId;

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_CREATED_ITEM,
                            { manutencao: manutencao }
                        )

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_INTERNAL
                        )
                    }

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_INTERNAL_SERVER
                    )
                }

            } else {

                return validar
            }

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )

    }

}

const inserirManutencaoComEvidencia = async (manutencao, contentType, evidencias) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (String(contentType).toUpperCase().includes('MULTIPART/FORM-DATA')) {

            //Validação dos dados da manutenção
            let validar = validarManutencao(manutencao);

            if (!validar) {

                let resultManutencao = await manutencaoDAO.postManutencao(manutencao);

                if (resultManutencao) {

                    let ultimoId = await manutencaoDAO.getSelectLastId();


                    if (ultimoId) {

                        manutencao.id = ultimoId;

                        if (evidencias != undefined) {

                            for (let evidencia of evidencias) {

                                let evidenciaManutencao = {
                                    fk_id_manutencao: manutencao.id
                                }

                                let resultEvidencia = await controllerEvidencia.inserirEvidencia(evidenciaManutencao, contentType, evidencia);

                                if (resultEvidencia.status_code != 201) {

                                    MESSAGES.ERROR_RELATION_TABLE.message += 'Evidência'

                                    return MESSAGES.ERROR_RELATION_TABLE

                                } else {

                                    delete manutencao.evidencia

                                    let resultManutencaoEvidencia = await controllerEvidencia.buscarEvidenciaIdMaintenance(manutencao.id);

                                    manutencao.evidencia = resultManutencaoEvidencia.data.evidencia;

                                }
                            }

                        } else {

                            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Faltou Evidências]';

                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.ERROR_REQUIRED_FIELDS
                            )
                        }

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_CREATED_ITEM,
                            { manutencao: manutencao }
                        )

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_INTERNAL_SERVER
                        )

                    }

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_INTERNAL_SERVER
                    )

                }

            } else {

                return validar

            }

        } else {

            MESSAGES.ERROR_CONTENT_TYPE.message += '[MULTIPART/FORM-DATA]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE
            )

        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )

    }
}

//Atualiza uma manutenção pelo id
const atualizarManutencao = async (manutencao, id, contentType, evidencias) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        //Validação do content-type
        if (String(contentType).toUpperCase().includes('MULTIPART/FORM-DATA')) {

            //Validação dos dados da manutenção
            console.log(manutencao)
            let validar = validarManutencao(manutencao, true);
            console.log(validar)
            if (!validar) {

                //Verifica se o ID existe
                let validarId = await buscarManutencaoId(id);
                console.log(validarId)
                if (validarId.status_code == 200) {

                    //Adiciona o ID no objeto
                    manutencao.id = Number(id);

                    //Chama a DAO para atualizar
                    let resultManutencao = await manutencaoDAO.putManutencao(manutencao);
                    console.log(resultManutencao)
                    if (resultManutencao) {

                        if (validarId.data.manutencao[0].evidencia) {

                            for (let evidencia of validarId.data.manutencao[0].evidencia) {

                                let nomeArquivo = evidencia.url.split('/').pop()

                                let deleteImg = await UPLOAD.deleteUploadFiles(nomeArquivo)

                                if (!deleteImg) {

                                    return DEFAULT_MESSAGES.criarResposta(
                                        MESSAGES.ERROR_UPLOAD_IMAGE_DELETE
                                    )
                                }
                            }
                        }

                        let resultEvidenciaDelete = await controllerEvidencia.deletarEvidenciaIdManutencao(manutencao.id);
                        console.log(resultEvidenciaDelete)

                        if (resultEvidenciaDelete.status_code == 200 || resultEvidenciaDelete.status_code == 404) {

                            if (evidencias != undefined) {

                                for (let evidencia of evidencias) {

                                    let evidenciaManutencao = {
                                        fk_id_manutencao: manutencao.id
                                    }

                                    let resultEvidencia = await controllerEvidencia.inserirEvidencia(evidenciaManutencao, contentType, evidencia);

                                    if (resultEvidencia.status_code != 201) {

                                        MESSAGES.ERROR_RELATION_TABLE.message += 'Evidência'

                                        return MESSAGES.ERROR_RELATION_TABLE

                                    } else {

                                        delete manutencao.evidencia

                                        let resultManutencaoEvidencia = await controllerEvidencia.buscarEvidenciaIdMaintenance(manutencao.id);

                                        manutencao.evidencia = resultManutencaoEvidencia.data.evidencia;

                                    }
                                }

                            } else {

                                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Faltou Evidências]';

                                return DEFAULT_MESSAGES.criarResposta(
                                    MESSAGES.ERROR_REQUIRED_FIELDS
                                )
                            }

                        } else {

                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.ERROR_DELETE_OLD_EVIDENCES
                            )
                        }

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_UPDATE_ITEM,
                            { manutencao: manutencao }
                        )

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_INTERNAL_SERVER
                        )
                    }

                } else {

                    return validarId
                }

            } else {

                return validar
            }

        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += '[MULTIPART/FORM-DATA]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE
            )
        }
    } catch (error) {
        console.log(error)
        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}
//Valida os dados da manutenção
const validarManutencao = (manutencao) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    // Validação da data da manutenção
    if (
        manutencao.data_manutencao == undefined ||
        manutencao.data_manutencao == null ||
        manutencao.data_manutencao == '' ||
        manutencao.data_manutencao.length < 10
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Data da manutenção incorreta]'

        return DEFAULT_MESSAGES.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }

    // Validação do custo
    if (
        manutencao.custo == undefined ||
        manutencao.custo == null ||
        manutencao.custo == '' ||
        isNaN(manutencao.custo)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Custo incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }

    // Validação da quilometragem
    if (
        manutencao.quilometragem == undefined ||
        manutencao.quilometragem == null ||
        manutencao.quilometragem == '' ||
        isNaN(manutencao.quilometragem)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Quilometragem incorreta]'

        return DEFAULT_MESSAGES.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }


    // Validação da oficina (opcional)
    if (manutencao.oficina != undefined) {
        if (

            manutencao.oficina != null &&
            manutencao.oficina != '' &&
            typeof manutencao.oficina !== 'string' &&
            manutencao.oficina.length > 100
        ) {

            MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Oficina inválida]'

            return DEFAULT_MESSAGES.criarResposta(
                MENSAGENS.ERROR_REQUIRED_FIELDS
            )
        }
    }

    // Validação das observações (opcional)
    if (
        manutencao.observacoes != undefined &&
        manutencao.observacoes != null &&
        manutencao.observacoes.length > 1000
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Observações inválidas]'

        return DEFAULT_MESSAGES.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }

    // Validação do tipo de manutenção
    if (
        manutencao.fk_id_tipo_manutencao == undefined ||
        manutencao.fk_id_tipo_manutencao == null ||
        manutencao.fk_id_tipo_manutencao == '' ||
        isNaN(manutencao.fk_id_tipo_manutencao)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Tipo de manutenção incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }

    if (manutencao.pecas != undefined) {

        if (manutencao.pecas == null || typeof manutencao.pecas !== 'string' || manutencao.pecas.trim() == "") {
            MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Peças incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MENSAGENS.ERROR_REQUIRED_FIELDS
            )
        }

    }
    // Validação do usuário
    if (
        manutencao.fk_id_usuario == undefined ||
        manutencao.fk_id_usuario == null ||
        manutencao.fk_id_usuario == '' ||
        isNaN(manutencao.fk_id_usuario)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Usuário incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }

    // Validação do veículo
    if (
        manutencao.fk_id_veiculo == undefined ||
        manutencao.fk_id_veiculo == null ||
        manutencao.fk_id_veiculo == '' ||
        isNaN(manutencao.fk_id_veiculo)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Veículo incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    return false


}

// Deleta uma manutenção pelo ID
const deletarManutencao = async function (id) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await buscarManutencaoId(id)

        if (validarId.status_code == 200) {

            let result = await manutencaoDAO.deleteMaintenance(id)

            if (result) {
                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_DELETE
                )
            } else {
                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_INTERNAL_SERVER
                )
            }

        } else {
            return validarId
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}

// Deleta todas as manutenções de um veículo
const deletarManutencaoPorVeiculo = async function (idVeiculo) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let result = await manutencaoDAO.deleteMaintenanceByIdVehicle(idVeiculo)

        if (result) {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.SUCCESS_DELETE
            )

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_NOT_FOUND
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}

// Deleta todas as manutenções de um usuário
const deletarManutencaoPorUsuario = async function (idUsuario) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let result = await manutencaoDAO.deleteMaintenanceByIdUser(idUsuario)

        if (result) {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.SUCCESS_DELETE
            )

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_NOT_FOUND
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}

const formatarManutencao = (manutencao) => {

    return {
        id: manutencao.id,
        id_usuario: manutencao.id_usuario,
        id_veiculo: manutencao.id_veiculo,
        data_manutencao: manutencao.data_manutencao,
        custo: manutencao.custo,
        quilometragem: manutencao.quilometragem,
        oficina: manutencao.oficina ?? null,
        pecas: manutencao.pecas,
        observacoes: manutencao.observacoes,
        is_ativo: manutencao.is_ativo,
        data: manutencao.data_criacao,
        tipo_manutencao: {
            id: manutencao.id_tipo_manutencao,
            nome: manutencao.nome_tipo_manutencao,
        },
        evidencia: manutencao.evidencia
    }

}

module.exports = {
    listarManutencao,
    buscarManutencaoId,
    buscarManutencaoIdTipo,
    buscarManutencaoIdUsuario,
    buscarManutencaoIdVeiculo,
    atualizarManutencao,
    inserirManutencao,
    inserirManutencaoComEvidencia,
    deletarManutencao,
    deletarManutencaoPorUsuario,
    deletarManutencaoPorVeiculo
}