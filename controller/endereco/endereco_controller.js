/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do endereço
 * Data: 15/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const enderecoDAO = require('../../model/DAO/endereco.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')

//Retorna todos os endereços
const listarEnderecos = async () => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let resultEndereco = await enderecoDAO.getAllEnderecos()

        if (resultEndereco) {

            if (resultEndereco.length > 0) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_REQUEST,
                    { enderecos: resultEndereco }
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

    } catch (error) {

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )

    }

}

//Retorna endereço pelo ID
const buscarEnderecoId = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (!isNaN(id) && id != null && id > 0) {

            let resultEndereco = await enderecoDAO.getEnderecoById(id)

            if (resultEndereco) {

                if (resultEndereco.length > 0) {

                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { endereco: resultEndereco }
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

            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'

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

//Retorna endereço pelo serviço
const buscarEnderecoServico = async (fk_id_servico) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (!isNaN(fk_id_servico) && fk_id_servico != null && fk_id_servico > 0) {

            let resultEndereco = await enderecoDAO.getEnderecoByServico(fk_id_servico)

            if (resultEndereco) {

                if (resultEndereco.length > 0) {

                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { enderecos: resultEndereco }
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

            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += ' [ID do serviço incorreto]'

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

//Insere um endereço
const inserirEndereco = async (endereco, contentType) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarEndereco(endereco)

            if (!validar) {

                let resultEndereco = await enderecoDAO.postEndereco(endereco)

                if (resultEndereco) {

                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_CREATED_ITEM,
                        endereco
                    )

                } else {

                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.ERROR_INTERNAL_SERVER
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

//Atualiza um endereço
const atualizarEndereco = async (endereco, id, contentType) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarEndereco(endereco)

            if (!validar) {

                let validarId = await buscarEnderecoId(id)

                if (validarId.status_code == 200) {

                    endereco.id = Number(id)

                    let resultEndereco = await enderecoDAO.putEndereco(endereco)

                    if (resultEndereco) {

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGENS.SUCCESS_UPDATE_ITEM,
                            { endereco }
                        )

                    } else {

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGENS.ERROR_INTERNAL_SERVER
                        )

                    }

                } else {

                    return validarId

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

//Deleta endereço
const deletarEndereco = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let validarId = await buscarEnderecoId(id)

        if (validarId.status_code == 200) {

            let resultEndereco = await enderecoDAO.deleteEndereco(id)

            if (resultEndereco) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_DELETE
                )

            } else {

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

//Valida endereço
const validarEndereco = (endereco) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    //logradouro
    if (
        endereco.logradouro == undefined ||
        endereco.logradouro == null ||
        endereco.logradouro == '' ||
        endereco.logradouro.length > 100
    ) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Logradouro incorreto]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    //cep
    else if (
        endereco.cep == undefined ||
        endereco.cep == null ||
        endereco.cep == '' ||
        endereco.cep.length > 12
    ) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += ' [CEP incorreto]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    //complemento
    else if (
        endereco.complemento != undefined &&
        endereco.complemento != null &&
        endereco.complemento.length > 150
    ) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Complemento incorreto]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    //fk_id_servico
    else if (
        endereco.fk_id_servico == undefined ||
        endereco.fk_id_servico == null ||
        endereco.fk_id_servico == '' ||
        isNaN(endereco.fk_id_servico)
    ) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += ' [ID do serviço incorreto]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    return false

}

module.exports = {
    listarEnderecos,
    buscarEnderecoId,
    buscarEnderecoServico,
    inserirEndereco,
    atualizarEndereco,
    deletarEndereco
}