/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do usuário
 * Data: 07/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const usuarioDAO = require('../../model/DAO/usuario.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')


const buscarUsuarioId = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultUsuario = await usuarioDAO.getUserById(id)


            if (resultUsuario) {

                if (resultUsuario.length > 0) {
                    console.log(resultUsuario)


                    MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                    MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                    MENSSAGENS.DEFAULT_HEADER.data.usuario = resultUsuario

                    return MENSSAGENS.DEFAULT_HEADER


                } else {
                    return MENSSAGENS.ERROR_NOT_FOUND//404
                }

            } else {
                return MENSSAGENS.ERROR_NOT_FOUND
            }
        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MENSSAGENS.ERROR_REQUIRED_FIELDS//400
        }

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL
    }

}

const inserirUsuario = async (usuario, contentType) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Validação dos dados do usuário
            let validar = validarUsuario(usuario)

            if (!validar) {

                let resultUsuario = await usuarioDAO.postUser(usuario)

                if (resultUsuario) {

                    let ultimoId = await usuarioDAO.getSelectLastId()

                    if (ultimoId) {

                        usuario.id = ultimoId

                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_CREATED_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_CREATED_ITEM.message

                        MENSSAGENS.DEFAULT_HEADER.data = usuario

                        return MENSSAGENS.DEFAULT_HEADER

                    } else {
                        return MENSSAGENS.ERROR_INTERNAL
                    }

                } else {
                    return MENSSAGENS.ERROR_INTERNAL
                }

            } else {
                return validar
            }

        } else {
            return MENSSAGENS.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL_SERVER
    }
}

//Valida os dados de um usuário
const validarUsuario = (usuario) => {

    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    // Validação do nome
    if (
        usuario.nome == undefined ||
        usuario.nome == null ||
        usuario.nome == '' ||
        usuario.nome.length > 100
    ) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

    // Validação do email
    else if (
        usuario.email == undefined ||
        usuario.email == null ||
        usuario.email == '' ||
        usuario.email.length > 100 ||
        !usuario.email.includes('@')
    ) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Email incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

    // Validação do CPF
    else if (
        usuario.cpf == undefined ||
        usuario.cpf == null ||
        usuario.cpf == '' ||
        usuario.cpf.length != 11 ||
        isNaN(usuario.cpf)
    ) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [CPF incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

    // Validação da data de nascimento (opcional)
    else if (
        usuario.data_nascimento != undefined &&
        usuario.data_nascimento != null &&
        usuario.data_nascimento != '' &&
        usuario.data_nascimento.length != 10
    ) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de nascimento incorreta]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

    // Validação da senha
    else if (
        usuario.senha == undefined ||
        usuario.senha == null ||
        usuario.senha == '' ||
        usuario.senha.length < 6
    ) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Senha incorreta]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

    // Validação da foto (opcional)
    else if (
        usuario.foto_usuario != undefined &&
        usuario.foto_usuario != null &&
        usuario.foto_usuario != '' &&
        usuario.foto_usuario.length > 255
    ) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto inválida]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

    // is_ativo não precisa validar (BOOLEAN default TRUE no banco)

    else {
        return false
    }
}

module.exports = {
    buscarUsuarioId,
    inserirUsuario

}