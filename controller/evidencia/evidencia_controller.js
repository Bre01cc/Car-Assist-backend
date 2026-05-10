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
                    let evidenciaFormatada = await formatarEvidencia(resultEvidencia[0])
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
                    let evidenciaFormatada = await formatarEvidencia(resultEvidencia[0])
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
const buscarEvidenciaIdNotMaintenance = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultEvidencia = await evidenciaDAO.getEvidenceByIdNotMaintenance(id)


            if (resultEvidencia) {

                if (resultEvidencia.length > 0) {
                    let evidenciaFormatada = await formatarEvidencia(resultEvidencia[0])
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

//Desativa um usuário pelo id
const deletarUsuarioId = async (id) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        let validarId = await buscarUsuarioId(id)
        if (validarId.status_code == 200) {

            let deletarEvidencia = await evidenciaDAO.deleteEvidence(id)

            if (deletarEvidencia) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_DELETE
                )
            }
            else {
                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_INTERNAL_SERVER
                )
            }

        } else {
            return validarId
        }
    } catch (error) {

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

//Formata objeto evidência
const formatarEvidencia = (evidencia) => {
    return {
        id: evidencia.id,
        url: evidencia.url,
        manutencao: {
            id: evidencia.id_manutencao,
            oficina: evidencia.oficina,
            data: evidencia.data
        }
    }
}

module.exports = {
    buscarEvidenciaId,
    listarEvidencia,
    buscarEvidenciaIdMaintenance,
    buscarEvidenciaIdNotMaintenance,
    deletarUsuarioId
}