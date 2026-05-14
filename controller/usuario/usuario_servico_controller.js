/***********************************************************************************************************************
 * Objetivo: Controller responsável pelo CRUD da tabela usuário_serviço
 * Data: 13/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const usuarioServicoDAO = require('../../model/DAO/usuario_servico.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages')
const controllerUsuario = require('./usuario_controller.js')
const controllerServico = require('../servico/servico_controller.js')

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

//Atualiza um vínculo entre usuário e serviço
// const atualizarUsuarioServico = async (usuarioServico, idUsuario, idServico, contentType) => {

//     let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

//     try {

//         // Validação do content-type
//         if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

//             // Validação dos dados
//             let validar = await validarUsuarioServico(usuarioServico, true)

//             if (!validar) {

//                 // Verifica se o usuário existe
//                 // let validarUsuario = await buscarUsuarioId(idUsuario)

//                 // Verifica se o serviço existe
//                 let validarServico = await buscarServicoId(idServico)

//                 if (
//                     validarUsuario.status_code == 200 &&
//                     validarServico.status_code == 200
//                 ) {

//                     // Adiciona os IDs no objeto
//                     usuarioServico.fk_id_usuario = Number(idUsuario)
//                     usuarioServico.fk_id_servicos = Number(idServico)

//                     // Atualiza o vínculo
//                     let resultUsuarioServico =
//                         await usuarioServicoDAO.putUsuarioServico(usuarioServico)

//                     if (resultUsuarioServico) {

//                         return DEFAULT_MENSAGENS.criarResposta(
//                             MENSSAGENS.SUCCESS_UPDATE_ITEM,
//                             { usuario_servico: usuarioServico }
//                         )

//                     } else {

//                         return DEFAULT_MENSAGENS.criarResposta(
//                             MENSSAGENS.ERROR_INTERNAL
//                         )
//                     }

//                 } else {

//                     return DEFAULT_MENSAGENS.criarResposta(
//                         MENSSAGENS.ERROR_NOT_FOUND
//                     )
//                 }

//             } else {

//                 return validar
//             }

//         } else {

//             return DEFAULT_MENSAGENS.criarResposta(
//                 MENSSAGENS.ERROR_CONTENT_TYPE
//             )
//         }

//     } catch (error) {

//         return DEFAULT_MENSAGENS.criarResposta(
//             MENSSAGENS.ERROR_INTERNAL_SERVER
//         )
//     }
// }

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
    let validarServico = await controllerServico.buscarServicosId(usuarioServico.fk_id_servico)

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