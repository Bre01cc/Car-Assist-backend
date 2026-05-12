/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do tipo de serviço
 * Data: 10/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import da model 
const tipoServico = require('../../model/DAO/tipo_servico.js')

//Import do arquivo de menssagens
const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')

//Retorna todas as tipo de serviço
const listarTipoServico = async () => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let resultTipoServico = await tipoServico.getAllService()

        if (resultTipoServico) {
            if (resultTipoServico.length > 0) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_REQUEST,
                    { tipos_servicos: resultTipoServico }
                )

            }

        } else {
            return DEFAULT_MENSAGENS.criarResposta(
                MENSSAGENS.ERROR_INTERNAL_SERVER
            )
        }

    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

//Retorna um tipo de serviço
const buscarTipoServicoId = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultTipoServico = await tipoServico.getServiceById(id)

            if (resultTipoServico) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_REQUEST,
                    {tipos_servico: resultTipoServico[0]},
               
                )

            } else {
                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_INTERNAL_SERVER
                )
            }

        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS + "[ID incorreto]"
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

module.exports ={
    listarTipoServico,
    buscarTipoServicoId
}