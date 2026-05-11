/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do serviço
 * Data: 07/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const servicoDAO = require('../../model/DAO/servico.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')

//Retorna todos os serviços
const listarServicos = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let resultServico = await servicoDAO.getAllService()


        if (resultServico) {

            if (resultServico.length > 0) {
                let servicoFormatado = resultServico.map(
                    servico => formatarServico(servico)
                )
                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_REQUEST,
                    { servicos: servicoFormatado }
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
//Retorna um serviço pelo id
const buscarServicosId = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultServico = await servicoDAO.getServiceById(id)


            if (resultServico) {

                if (resultServico.length > 0) {
                    let servicoFormatado = formatarServico(resultServico[0])
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { servico: servicoFormatado }
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

//Retorna um serviço pelo id do tipo de serviço
const buscarServicosIdTipo = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultServico = await servicoDAO.getServiceByIdType(id)


            if (resultServico) {

                if (resultServico.length > 0) {
                    let servicoFomatado = resultServico.map(
                        servico => formatarServico(servico)
                    );

                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { servico: servicoFomatado }
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

const formatarServico = (servico) => {

    return {
        id: servico.id,
        nome_local: servico.nome_local,
        latitude: servico.latitude,
        longitude: servico.longitude,
        tipo_servico: {
            id: servico.id_tipo_servico,
            nome: servico.nome
        }
    }
}

module.exports = {
    listarServicos,
    buscarServicosId,
    buscarServicosIdTipo
}