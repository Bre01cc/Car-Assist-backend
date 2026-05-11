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

// Cadastra um serviço no banco de dados
const inserirServico = async (servico, contentType) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Validação dos dados do serviço
            let validar = validarServico(servico)

            if (!validar) {

                let resultServico = await servicoDAO.postServico(servico)

                if (resultServico) {

                    let ultimoId = await servicoDAO.getSelectLastId()
                  
                    if (ultimoId) {

                        servico.id = ultimoId[0].id

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSAGENS.SUCCESS_CREATED_ITEM,
                            servico
                        )

                    } else {

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSAGENS.ERROR_INTERNAL
                        )

                    }

                } else {

                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSAGENS.ERROR_INTERNAL
                    )

                }

            } else {
                return validar
            }

        } else {

            return DEFAULT_MENSAGENS.criarResposta(
                MENSAGENS.ERROR_CONTENT_TYPE
            )

        }

    } catch (error) {
       
        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_INTERNAL_SERVER
        )

    }

}

// Atualiza um serviço pelo id
const atualizarServico = async (servico, id, contentType) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        // Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função para validar os dados do serviço
            let validar = await validarServico(servico)

            if (!validar) {

                // Verifica se o ID existe no banco
                let validarId = await buscarServicosId(id)

                if (validarId.status_code == 200) {

                    // Adiciona o ID no objeto
                    servico.id = Number(id)

                    // Chama a DAO para atualizar
                    let resultServico = await servicoDAO.putServico(servico)

                    if (resultServico) {

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSAGENS.SUCCESS_UPDATE_ITEM,
                            { servico: servico }
                        )

                    } else {

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSAGENS.ERROR_INTERNAL
                        )

                    }

                } else {

                    return validarId // retorna erro 400, 404 ou 500

                }

            } else {

                return validar // erro de validação

            }

        } else {

            return DEFAULT_MENSAGENS.criarResposta(
                MENSAGENS.ERROR_CONTENT_TYPE
            )

        }

    } catch (error) {

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_INTERNAL_SERVER
        )

    }

}
//Validar os dados do serviço
const validarServico = (servico) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    // Validação do nome do local
    if (
        servico.nome_local == undefined ||
        servico.nome_local == null ||
        servico.nome_local == '' ||
        servico.nome_local.length > 100
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Nome do local incorreto]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    // Validação da latitude
    else if (
        servico.latitude == undefined ||
        servico.latitude == null ||
        servico.latitude == '' ||
        isNaN(servico.latitude)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Latitude incorreta]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    // Validação da longitude
    else if (
        servico.longitude == undefined ||
        servico.longitude == null ||
        servico.longitude == '' ||
        isNaN(servico.longitude)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Longitude incorreta]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    // Validação da FK do tipo de serviço
    else if (
        servico.fk_id_tipo_servico == undefined ||
        servico.fk_id_tipo_servico == null ||
        servico.fk_id_tipo_servico == '' ||
        isNaN(servico.fk_id_tipo_servico)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Tipo de serviço incorreto]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    return false
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

// Deleta um serviço pelo id
const deletarServicoId = async (id) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let validarId = await buscarServicosId(id)

        if (validarId.status_code == 200) {

            let deletarServico = await servicoDAO.deleteServico(id)

            if (deletarServico) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSAGENS.SUCCESS_DELETE
                )

            } else {

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

module.exports = {
    listarServicos,
    buscarServicosId,
    buscarServicosIdTipo,
    inserirServico,
    atualizarServico,
    deletarServicoId
}