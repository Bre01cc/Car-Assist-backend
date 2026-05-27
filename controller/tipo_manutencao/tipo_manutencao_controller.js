/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do tipo de manutenção
 * Data: 11/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const tipoManutencaoDAO = require('../../model/DAO/tipo_manutencao.js');

const DEFAULT_MESSAGES = require('../modulo/config_messages.js');


//Retorna todos os tipos de manutenção
const listarTiposManutencao = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let resultTipoManutencao = await tipoManutencaoDAO.getAllMaintenanceType();

        if (resultTipoManutencao) {

            if (resultTipoManutencao.length > 0) {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { tipos_manutencao: resultTipoManutencao }
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
            MESSAGES.ERROR_INTERNAL
        )
    }
}
//Retorna um tipo de manutenção pelo id
const buscarTipoManutencaoId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {

            let resultTipoManutencao = await tipoManutencaoDAO.getMaintenanceTypeById(id);

            if (resultTipoManutencao) {

                if (resultTipoManutencao.length > 0) {
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { tipos_manutencao: resultTipoManutencao }
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

module.exports = {
    listarTiposManutencao,
    buscarTipoManutencaoId
}