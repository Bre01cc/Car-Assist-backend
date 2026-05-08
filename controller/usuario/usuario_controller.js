/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do usuário
 * Data: 07/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const usuarioDAO = require('../../model/DAO/usuario.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')


//Retorna um usuário pelo id
const buscarUsuarioId = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultUsuario = await usuarioDAO.getUserById(id)


            if (resultUsuario) {

                if (resultUsuario.length > 0) {

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

//Retorna um usuário pelo email e senha
const buscarUsuarioEmailComSenha = async (email, senha) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        console.log(email, senha)
        //Validação da chegada do ID
        if (email != undefined &&
            email != null &&
            email != '' &&
            email.length < 100 &&
            email.includes('@')
            && senha != undefined &&
            senha != null &&
            senha != '' &&
            senha.length < 255
        ) {

            let resultUsuario = await usuarioDAO.getUserByEmailAndPassword(email, senha)

            if (resultUsuario) {

                if (resultUsuario.length > 0) {

                    const usuario = await usuarioDAO.getUserById(resultUsuario[0].id)

                    if (usuario) {

                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                        MENSSAGENS.DEFAULT_HEADER.data.usuario = usuario

                        return MENSSAGENS.DEFAULT_HEADER

                    } else {
                        return MENSSAGENS.ERROR_INTERNAL
                    }


                } else {
                    return MENSSAGENS.ERROR_NOT_FOUND//404
                }

            } else {
                return MENSSAGENS.ERROR_NOT_FOUND
            }
        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[Email incorreto] ou [Senha incorreta]'
            return MENSSAGENS.ERROR_REQUIRED_FIELDS//400
        }

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL
    }

}

//Retorna um usuário ativo pelo id 
const buscarUsuarioAtivo = async (id, status) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (status == 0 || status == 1 || status == 'false' || status == 'true') {

            if(status == 'false'){
                status = 0
            }else if(status == 'true'){
                 status = 1
            }
            //Validação da chegada do ID
            if (!isNaN(id) && id != null && id > 0) {
                let resultUsuario = await usuarioDAO.getUserByAtivo(id,status)


                if (resultUsuario) {

                    if (resultUsuario.length > 0) {

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
        }else{
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[Status incorreto]'
            return MENSSAGENS.ERROR_REQUIRED_FIELDS//400
        }

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL
    }

}

//Cadastra um usuario no banco de dados
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

//Atualiza um usuário pelo id
const atualizarUsuario = async (usuario, id, contentType) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        // Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função para validar os dados do usuário
            let validar = await validarUsuario(usuario, true)

            if (!validar) {

                // Verifica se o ID existe no banco
                let validarId = await buscarUsuarioId(id)

                if (validarId.status_code == 200) {

                    // Adiciona o ID no objeto
                    usuario.id = Number(id)

                    // Chama a DAO para atualizar
                    let resultUsuario = await usuarioDAO.putUser(usuario)

                    if (resultUsuario) {

                        MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_UPDATE_ITEM.status
                        MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_UPDATE_ITEM.message

                        MENSSAGES.DEFAULT_HEADER.data.usuario = usuario

                        return MENSSAGES.DEFAULT_HEADER // 200

                    } else {
                        return MENSSAGES.ERROR_INTERNAL // 500 model
                    }

                } else {
                    return validarId // retorna erro 400, 404 ou 500
                }
            } else {
                return validar // erro de validação
            }

        } else {
            return MENSSAGES.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        return MENSSAGES.ERROR_INTERNAL_SERVER
    }
}

//Valida os dados de um usuário
const validarUsuario = (usuario, validar) => {

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
        usuario.senha.length < 6 && usuario.senha.length > 255
    ) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Senha incorreta]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

    // Validação da foto (opcional)
    if (validar) {
        if (
            usuario.foto_usuario != undefined &&
            usuario.foto_usuario != null &&
            usuario.foto_usuario != '' &&
            usuario.foto_usuario.length > 255
        ) {
            MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto inválida]'
            return MENSSAGES.ERROR_REQUIRED_FIELDS
        }
    }

    // is_ativo não precisa validar (BOOLEAN default TRUE no banco)

    return false
}

//Desativa um usuário pelo id
const deletarUsuarioId = async (id) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        let validarId = await buscarUsuarioId(id)
        if (validarId.status_code == 200) {

            let deletarUsuario = await usuarioDAO.deleteUser(id)

            if (deletarUsuario) {

                MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                MENSAGENS.DEFAULT_HEADER.message = MENSAGENS.SUCCESS_DELETE.message
                delete MENSAGENS.DEFAULT_HEADER.data

                return MENSAGENS.DEFAULT_HEADER
            }
            else {
                return MENSAGENS.ERROR_INTERNAL
            }

        } else {
            return validarId
        }
    } catch (error) {

        return MENSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Exports das funções
module.exports = {
    buscarUsuarioId,
    inserirUsuario,
    deletarUsuarioId,
    atualizarUsuario,
    buscarUsuarioEmailComSenha,
    buscarUsuarioAtivo
}