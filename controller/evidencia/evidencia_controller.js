/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL da evidencia
 * Data: 08/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const evidenciaDAO = require('../../model/DAO/evidencia.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')

//Retorna todas as evidências
const listarEvidencia = async () => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let resultEvidencia = await evidenciaDAO.getAllEvidences()


        if (resultEvidencia) {

            if (resultEvidencia.length > 0) {

                let evidenciasFormatadas = resultEvidencia.map(
                    evidencia => formatarEvidencia(evidencia)

                )

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_REQUEST,
                    { evidencias: evidenciasFormatadas }
                )


            } else {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_NOT_FOUND
                )//404
            }

        } else {
            return DEFAULT_MENSAGENS.criarResposta(
                MENSSAGENS.ERROR_NOT_FOUND
            )//404
        }


    } catch (error) {

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL
        )
    }

}

//Retorna um evidencia pelo id
const buscarEvidenciaId = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultEvidencia = await evidenciaDAO.getEvidenceById(id)


            if (resultEvidencia) {

                if (resultEvidencia.length > 0) {
                    let evidenciaFormatada = formatarEvidencia(resultEvidencia[0])
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { evidencia: evidenciaFormatada }
                    )


                } else {

                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.ERROR_NOT_FOUND
                    )//404
                }

            } else {
                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_NOT_FOUND
                )//404
            }
        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return DEFAULT_MENSAGENS.criarResposta(
                MENSSAGENS.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL
        )
    }

}

//Retorna um evidencia pelo id da manutenção
const buscarEvidenciaIdMaintenance = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultEvidencia = await evidenciaDAO.getEvidenceByIdMaintenance(id)


            if (resultEvidencia) {

                if (resultEvidencia.length > 0) {
                 
                    let evidenciaFormatada = resultEvidencia.map(
                        evidencia => formatarEvidencia(evidencia)
                    )
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { evidencia: evidenciaFormatada }
                    )


                } else {

                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.ERROR_NOT_FOUND
                    )//404
                }

            } else {
                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_NOT_FOUND
                )//404
            }
        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return DEFAULT_MENSAGENS.criarResposta(
                MENSSAGENS.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL
        )
    }

}

// Cadastra uma evidência no banco de dados
const inserirEvidencia = async (evidencia, contentType) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Validação dos dados da evidência
            let validar = await validarEvidencia(evidencia)


            if (!validar) {

                let resultEvidencia = await evidenciaDAO.postEvidence(evidencia)

                if (resultEvidencia) {

                    let ultimoId = await evidenciaDAO.getSelectLastId()

                    if (ultimoId) {

                        let evidenciaFormatada = formatarEvidencia(ultimoId[0])

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGENS.SUCCESS_CREATED_ITEM,
                            evidenciaFormatada
                        )

                    } else {
                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGENS.ERROR_INTERNAL
                        )

                    }

                } else {
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.ERROR_INTERNAL
                    )

                }

            } else {
                return validar
            }

        } else {
            return DEFAULT_MENSAGENS.criarResposta(
                MENSSAGENS.ERROR_CONTENT_TYPE
            )

        }

    } catch (error) {


        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )

    }
}

// Atualiza uma evidência pelo id
const atualizarEvidencia = async (evidencia, id, contentType) => {

    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        // Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função para validar os dados da evidência
            let validar = await validarEvidencia(evidencia)

            if (!validar) {

                // Verifica se o ID existe no banco
                let validarId = await buscarEvidenciaId(id)

                if (validarId.status_code == 200) {

                    // Adiciona o ID no objeto
                    evidencia.id = Number(id)

                    // Chama a DAO para atualizar
                    let resultEvidencia = await evidenciaDAO.putEvidence(evidencia)

                    if (resultEvidencia) {

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGES.SUCCESS_UPDATE_ITEM,
                            { evidencia: evidencia }
                        )

                    } else {
                        return MENSSAGES.ERROR_INTERNAL
                    }

                } else {
                    return validarId
                }

            } else {
                return validar
            }

        } else {
            return MENSSAGES.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )

    }
}

//Desativa um usuário pelo id
const deletarEvidenciad = async (id) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        let validarId = await buscarEvidenciaId(id)

        if (validarId.status_code == 200) {

            let deletarEvidencia = await evidenciaDAO.deleteEvidence(id)

            if (deletarEvidencia) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSAGENS.SUCCESS_DELETE
                )
            }
            else {
                return DEFAULT_MENSAGENS.criarResposta(
                    MENSAGENS.ERROR_INTERNAL_SERVER
                )
            }

        } else {
            return validarId
        }
    } catch (error) {

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

//Formata objeto evidência
const formatarEvidencia = (evidencia) => {
    return {
        id: evidencia.id,
        url: evidencia.url
    }
}

//Validas os dados da evidência
const validarEvidencia = async (evidencia) => {

    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    // Validação da URL
    if (
        evidencia.url == undefined ||
        evidencia.url == null ||
        evidencia.url == '' ||
        evidencia.url.length > 255
    ) {

        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[URL da evidência inválida]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS

    }

    // Validação da FK manutenção
    else if (
        evidencia.fk_id_manutencao <= 0 ||
        isNaN(evidencia.fk_id_manutencao) ||
        evidencia.fk_id_manutencao == undefined ||
        evidencia.fk_id_manutencao == null ||
        evidencia.fk_id_manutencao == ''
    ) {

        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Id da manutenção incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS

    }

    else {
        return false
    }
}

//Exports das funções 
module.exports = {
    buscarEvidenciaId,
    listarEvidencia,
    buscarEvidenciaIdMaintenance,
    deletarEvidenciad,
    inserirEvidencia,
    atualizarEvidencia
}