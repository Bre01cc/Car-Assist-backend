/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do tipo de manutenção
 * Data: 10/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const tipoManutencaoDAO = require('../../model/DAO/tipo_manutencao.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')


//Retorna todos os tipos de manutenção
const listarTiposManutencao = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let resultTipoManutencao = await tipoManutencaoDAO.getAllMaintenanceType()

        if (resultTipoManutencao) {

            if (resultTipoManutencao.length > 0) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_REQUEST,
                    { tipos_manutencao: resultTipoManutencao }
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
//Retorna um tipo de manutenção pelo id
const buscarTipoManutencaoId = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultTipoManutencao = await tipoManutencaoDAO.getMaintenanceTypeById(id)


            if (resultTipoManutencao) {

                if (resultTipoManutencao.length > 0) {
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { usuario: resultTipoManutencao }
                    )

                } else {

                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.ERROR_NOT_FOUND
                    )

                }

            } else {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_NOT_FOUND
                )
            }
        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return DEFAULT_MENSAGENS.criarResposta(
                MENSSAGENS.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )
    }

}

module.exports = {
    listarTiposManutencao,
    buscarTipoManutencaoId
}