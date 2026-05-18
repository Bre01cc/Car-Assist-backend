/***********************************************************************************************************************
 * Objetivo: Controller responsável pelo CRUD da tabela usuário_serviço
 * Data: 13/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const usuarioServicoDAO = require('../../model/DAO/usuario_servico.js')
const servicoController = require('../servico/servico_controller.js')
const usuarioController = require('./usuario_controller.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')


//Retorna todos os registro da tabela relacional 
const listarUsuariosServicos = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let resultUsuarioServico = await usuarioServicoDAO.getAllUserService()


        if (resultUsuarioServico) {

            if (resultUsuarioServico.length > 0) {
                resultFormatado = resultUsuarioServico.map(
                    usuarioServico => formatarUsuarioServico(usuarioServico)
                )
                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_REQUEST,
                    { usuario_servico: resultFormatado }
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

const buscarUsuarioServicoByIdUsuario = async (idUsuario) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        if (!isNaN(idUsuario) && idUsuario != null && idUsuario > 0) {
            let resultUsuarioervico = await usuarioServicoDAO.getUserServiceByIdUser(idUsuario)


            if (resultUsuarioervico) {

                if (resultUsuarioervico.length > 0) {
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { usuario: resultUsuarioervico }
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
            MENSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

// Vincula um usuário a um serviço
const inserirUsuarioServico = async (usuarioServico, contentType) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    console.log(usuarioServico)
    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarUsuarioServico(usuarioServico)

            if (!validar) {

                let resultUsuarioServico = await usuarioServicoDAO.postUserService(usuarioServico)

                if (resultUsuarioServico) {
                    let ultimoId = await usuarioServicoDAO.getSelectLastId()
                    usuarioServico.id = ultimoId
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSAGENS.SUCCESS_CREATED_ITEM,
                        usuarioServico
                    )

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
        console.log(error)
        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

const buscarUsuarioServico = async (idUsuario, idServico) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {

        let validarUsuario = await usuarioController.buscarUsuarioId(idUsuario)

        if (validarUsuario.status_code == 200) {

            let validarServico = await servicoController.buscarServicosId(idServico)

            if (validarServico.status_code == 200) {
                let result = await usuarioServicoDAO.getUserServiceByIdServiceAndUser(idUsuario, idServico)

                if (result.length > 0) {
                    resultFormatado = result.map(
                        usuarioServico => formatarUsuarioServico(usuarioServico)
                    )
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSAGENS.SUCCESS_REQUEST,
                        { usuario_servico: resultFormatado }
                    )
                } else {
                    MENSAGENS.ERROR_NOT_FOUND.message += '[id do usuario servico]'
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSAGENS.ERROR_NOT_FOUND
                    )
                }

            } else {
                MENSAGENS.ERROR_NOT_FOUND.message += '[id do serviço]'
                return DEFAULT_MENSAGENS.criarResposta(
                    MENSAGENS.ERROR_NOT_FOUND
                )
            }
        } else {
            MENSAGENS.ERROR_NOT_FOUND.message += '[id do usuário]'
            return DEFAULT_MENSAGENS.criarResposta(
                MENSAGENS.ERROR_NOT_FOUND)
        }

    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

// Valida os dados da tabela usuário_serviço
const validarUsuarioServico = async (usuarioServico) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    // Validação do ID do serviço
    if (
        usuarioServico.fk_id_servico == undefined ||
        usuarioServico.fk_id_servico == null ||
        usuarioServico.fk_id_servico == '' ||
        isNaN(usuarioServico.fk_id_servico)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [ID do serviço inválido]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }

    // Validação do ID do usuário
    else if (
        usuarioServico.fk_id_usuario == undefined ||
        usuarioServico.fk_id_usuario == null ||
        usuarioServico.fk_id_usuario == '' ||
        isNaN(usuarioServico.fk_id_usuario)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [ID do usuário inválido]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }

    // Verifica se o serviço existe
    let validarServico = await servicoController.buscarServicosId(usuarioServico.fk_id_servicos)

    if (validarServico.status_code != 200) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Serviço não encontrado]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }

    // Verifica se o usuário existe
    let validarUsuario = await controllerUsuario.buscarUsuarioId(usuarioServico.fk_id_usuario)

    if (validarUsuario.status_code != 200) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Usuário não encontrado]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }

    return false
}

const buscarUsuarioServico = async () => {
    try {
        
    } catch (error) {

    }
}

// Deleta vínculo usuário-serviço
const deletarUsuarioServico = async (idUsuario, idServico) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let validar = await buscarUsuarioServico(idUsuario, idServico)

        if (validar.status_code == 200) {

            let result = await usuarioServicoDAO.deleteUserServiceByIdUserAndService(idUsuario, idServico)

            if (result) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSAGENS.SUCCESS_DELETE
                )

            } else {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSAGENS.ERROR_INTERNAL_SERVER
                )
            }

        } else {

            return validar
        }

    } catch (error) {

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

const deleteUsuarioServicoByIdUser = async (idUsuario) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        let validarId = await buscarUsuarioServicoByIdUsuario(idUsuario)
        if (validarId.status_code == 200) {

            let deletarUsuario = await usuarioServicoDAO.deleteUserServiceByIdUser(idUsuario)

            if (deletarUsuario) {

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
        console.log(error)
        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

const formatarUsuarioServico = (usuarioServico) => {
    return {
        id: usuarioServico.id,
        data_vinculo: usuarioServico.data_vinculo,
        data_desvinculo: usuarioServico.data_desvinculo,
        usuario: {
            id: usuarioServico.id_usuario
        },
        servico: {
            id: usuarioServico.id_servico,
            nome: usuarioServico.nome_local,
            latitude: usuarioServico.latitude,
            longitude: usuarioServico.longitude,
        },
        tipo_servico: {
            id: usuarioServico.id_tipo_servico,
            nome: usuarioServico.nome
        },
        endereco: {
            id: usuarioServico.id_endereco,
            logradouro: usuarioServico.logradouro,
            cep: usuarioServico.cep,
            complemento: usuarioServico.complemento
        }
    }
}

module.exports = {
    inserirUsuarioServico,
    deletarUsuarioServico,
    buscarUsuarioServico,
    listarUsuariosServicos,
    deleteUsuarioServicoByIdUser
}