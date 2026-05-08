/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do tipo de serviço
 * Data: 08/05/2026
 * Autor: Nikolas Fernandes Vieira
 * Versão: 1.0
 ***********************************************************************************************************************/

const tipoServicoDAO = require('../../model/DAO/tipo_servico.js')
const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')

const listarTodosTiposServicos = async () => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        let resultTipos = await tipoServicoDAO.getAllTypes()

        if (resultTipos) {

            if (resultTipos.length > 0) {

                MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                MENSSAGENS.DEFAULT_HEADER.data.tipos_servico = resultTipos

                return MENSSAGENS.DEFAULT_HEADER

            } else {
                return MENSSAGENS.ERROR_NOT_FOUND
            }

        } else {
            return MENSSAGENS.ERROR_INTERNAL
        }

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL_SERVER
    }

}

module.exports = {
    listarTodosTiposServicos
}