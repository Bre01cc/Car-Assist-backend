/***********************************************************************************************************************
 * Objetivo: Controller responsável pelo CRUD da tabela usuário_serviço
 * Data: 13/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const usuarioServicoDAO = require('../../model/DAO/usuario_servico')
const servicoController = require('../servico/servico_controller')
const usuarioController = require('../usuario/usuario_controller')

const { DEFAULT_MENSAGENS } = require('../../modulo/config')

// Vincula um usuário a um serviço
const inserirUsuarioServico = async (usuarioServico, contentType) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarUsuarioServico(usuarioServico)

            if (!validar) {

                let resultUsuarioServico = await usuarioServicoDAO.postUserService(usuarioServico)

                if (resultUsuarioServico) {

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
        usuarioServico.fk_id_servicos == undefined ||
        usuarioServico.fk_id_servicos == null ||
        usuarioServico.fk_id_servicos == '' ||
        isNaN(usuarioServico.fk_id_servicos)
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
    let validarServico = await servicoController.buscarServicoId(usuarioServico.fk_id_servicos)

    if (validarServico.status_code != 200) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Serviço não encontrado]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }

    // Verifica se o usuário existe
    let validarUsuario = await usuarioController.buscarUsuarioId(usuarioServico.fk_id_usuario)

    if (validarUsuario.status_code != 200) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Usuário não encontrado]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )
    }

    return false
}

// Deleta vínculo usuário-serviço
const deletarUsuarioServico = async (idUsuario, idServico) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let validar = await buscarUsuarioServico(idUsuario, idServico)

        if (validar.status_code == 200) {

            let result = await usuarioServicoDAO.deleteUsuarioServico(idUsuario, idServico)

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

module.exports = {
    inserirUsuarioServico,
    deletarUsuarioServico
}