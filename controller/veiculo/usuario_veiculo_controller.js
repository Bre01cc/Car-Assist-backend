/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de usuário e veículo
 * Data: 07/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/


// Inserir vínculo usuário-serviço
const inserirUsuarioServico = async (usuarioServico, contentType) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarUsuarioServico(usuarioServico)

            if (!validar) {

                let resultUsuarioServico = await usuarioServicoDAO.postUserService(usuarioServico)

                if (resultUsuarioServico) {

                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_CREATED_ITEM,
                        {
                            usuario_servico: usuarioServico
                        }
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

        console.log(error)

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

// Atualizar vínculo usuário-serviço
const atualizarUsuarioServico = async (usuarioServico, fk_id_usuario, fk_id_servico, contentType) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarUsuarioServico(usuarioServico)

            if (!validar) {

                let validarRegistro = await buscarUsuarioServico(
                    fk_id_usuario,
                    fk_id_servico
                )

                if (validarRegistro.status_code == 200) {

                    usuarioServico.fk_id_usuario = Number(fk_id_usuario)
                    usuarioServico.fk_id_servico = Number(fk_id_servico)

                    let resultUsuarioServico = await usuarioServicoDAO.putUserService(usuarioServico)

                    if (resultUsuarioServico) {

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGENS.SUCCESS_UPDATE_ITEM,
                            {
                                usuario_servico: usuarioServico
                            }
                        )

                    } else {

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGENS.ERROR_INTERNAL_SERVER
                        )
                    }

                } else {

                    return validarRegistro
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

        console.log(error)

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

// Deletar vínculo usuário-serviço
const deletarUsuarioServico = async (fk_id_usuario, fk_id_servico) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let validarRegistro = await buscarUsuarioServico(
            fk_id_usuario,
            fk_id_servico
        )

        if (validarRegistro.status_code == 200) {

            let deletar = await usuarioServicoDAO.deleteUserServiceById(
                fk_id_usuario,
                fk_id_servico
            )

            if (deletar) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_DELETE
                )

            } else {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_INTERNAL_SERVER
                )
            }

        } else {

            return validarRegistro
        }

    } catch (error) {

        console.log(error)

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

// Formata objeto usuário-serviço
const formatarUsuarioServico = (usuarioServico) => {

    return {
        fk_id_usuario: usuarioServico.fk_id_usuario,
        fk_id_servico: usuarioServico.fk_id_servico,
        data_vinculo: usuarioServico.data_vinculo,
        data_desvinculo: usuarioServico.data_desvinculo,
        is_ativo: usuarioServico.is_ativo
    }
}

// Validar vínculo usuário-serviço
const validarUsuarioServico = async (usuarioServico) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    // Validação FK usuário
    if (
        usuarioServico.fk_id_usuario == undefined ||
        usuarioServico.fk_id_usuario == null ||
        usuarioServico.fk_id_usuario == '' ||
        isNaN(usuarioServico.fk_id_usuario) ||
        usuarioServico.fk_id_usuario <= 0
    ) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[Id do usuário inválido]'

        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    // Validação FK serviço
    else if (
        usuarioServico.fk_id_servico == undefined ||
        usuarioServico.fk_id_servico == null ||
        usuarioServico.fk_id_servico == '' ||
        isNaN(usuarioServico.fk_id_servico) ||
        usuarioServico.fk_id_servico <= 0
    ) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[Id do serviço inválido]'

        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    // Validação data vínculo
    else if (
        usuarioServico.data_vinculo == undefined ||
        usuarioServico.data_vinculo == null ||
        usuarioServico.data_vinculo == ''
    ) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[Data do vínculo inválida]'

        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    else {

        return false
    }
}

module.exports ={
    inserirUsuarioServico,
    atualizarUsuarioServico,
    deletarUsuarioServico
}