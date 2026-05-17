/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL de endereço
 * Data: 13/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const enderecoDAO = require('../../model/DAO/endereco.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')

//Retorna todos os endereços
const listarEnderecos = async () => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let resultEndereco = await enderecoDAO.getAllAddresses()

        if (resultEndereco) {

            if (resultEndereco.length > 0) {
               
                let enderecoFormatado = resultEndereco.map(
                    endereco=> formatarEnderecos(endereco)
                );
                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_REQUEST,
                    { enderecos: enderecoFormatado }
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

//Retorna endereço pelo id
const buscarEnderecoId = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (!isNaN(id) && id != null && id > 0) {

            let resultEndereco = await enderecoDAO.getAddressById(id)

            if (resultEndereco) {

                if (resultEndereco.length > 0) {
                    
                    let enderecoFormatado = formatarEnderecos(resultEndereco[0])
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { endereco: enderecoFormatado }
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

//Retorna endereço pelo id do serviço
const buscarEnderecoServico = async (idServico) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (!isNaN(idServico) && idServico != null && idServico > 0) {

            let resultEndereco = await enderecoDAO.getAddressByServiceId(idServico)
          
            if (resultEndereco) {

                if (resultEndereco.length > 0) {
                    let enderecoFormatado = resultEndereco.map(
                        endereco=> formatarEnderecos(endereco)
                    )
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { endereco: enderecoFormatado }
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

                let resultEndereco = await enderecoDAO.postAddress(endereco)

                if (resultEndereco) {

                    let ultimoId = await enderecoDAO.getSelectLastId()

                    if (ultimoId) {

                        endereco.id = ultimoId

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

                    let resultEndereco = await enderecoDAO.putAddress(endereco)

                    if (resultEndereco) {

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGENS.SUCCESS_UPDATE_ITEM,
                            { endereco: endereco }
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

//Valida os dados do endereço
const validarEndereco = (endereco) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    //Validação do logradouro
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

    //Validação do CEP
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

    //Validação do complemento
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

    //Validação da FK serviço
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

//Deleta um endereço
const deletarEndereco = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let validarId = await buscarEnderecoId(id)

        if (validarId.status_code == 200) {

            let resultEndereco = await enderecoDAO.deleteAddress(id)

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


const formatarEnderecos = (endereco) =>{
    return{
        id: endereco.id,
        logradouro: endereco.logradouro,
        cep:endereco.cep,
        complemento:endereco.complemento,
        servico:{
            id: endereco.id_servico,
            nome: endereco.nome_local
        }
    }
}

//Exports
module.exports = {
    listarEnderecos,
    buscarEnderecoId,
    buscarEnderecoServico,
    inserirEndereco,
    atualizarEndereco,
    deletarEndereco
}