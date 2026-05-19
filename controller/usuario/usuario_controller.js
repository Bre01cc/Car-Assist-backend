/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do usuário
 * Data: 07/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const usuarioDAO = require('../../model/DAO/usuario.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')



//Retorna todos os usuários
const listarUsuarios = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let resultUsuario = await usuarioDAO.getAllUsers()


        if (resultUsuario) {

            if (resultUsuario.length > 0) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_REQUEST,
                    { usuarios: resultUsuario }
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
//Retorna um usuário pelo id
const buscarUsuarioId = async (id) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultUsuario = await usuarioDAO.getUserById(id)


            if (resultUsuario) {

                if (resultUsuario.length > 0) {
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { usuario: resultUsuario }
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

const buscarUsuarioCPF = async (cpf) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (cpf != undefined &&
            cpf != null &&
            cpf != '' &&
            cpf.length == 11 &&
            !isNaN(cpf)) {
            let resultUsuario = await usuarioDAO.getUserByCPF(cpf)


            if (resultUsuario) {

                if (resultUsuario.length > 0) {
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { usuario: resultUsuario }
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

const buscarUsuarioEmail = async (email) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (email != undefined &&
            email != null &&
            email != '' &&
            email.length < 100 &&
            email.includes('@')) {
            let resultUsuario = await usuarioDAO.getUserByEmail(email)


            if (resultUsuario) {

                if (resultUsuario.length > 0) {
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { usuario: resultUsuario }
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

//Retorna um usuário pelo email e senha
const buscarUsuarioEmailComSenha = async (usuario, contentType) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let email = usuario.email
            let senha = usuario.password

            if (
                email != undefined &&
                email != null &&
                email != '' &&
                email.length < 100 &&
                email.includes('@') &&

                senha != undefined &&
                senha != null &&
                senha != '' &&
                senha.length < 255
            ) {

                let resultUsuario = await usuarioDAO.getUserByEmailAndPassword(email, senha)

                if (resultUsuario) {

                    if (resultUsuario.length > 0) {
                        let usuarioFiltrado = usuarioFormatado(resultUsuario[0])

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGENS.SUCCESS_REQUEST,
                            { usuario: usuarioFiltrado },
                            "Guilherme Moreira de Souza"
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

                MENSSAGENS.ERROR_REQUIRED_FIELDS.message += ' [id incorreto] ou [Senha incorreta]'

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_REQUIRED_FIELDS
                )

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
//Retorna um usuário pelo email e senha
const buscarUsuarioIDComSenha = async (usuario, contentType) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let id = usuario.id
            let senha = usuario.password

            if (
               !isNaN(id) && id != null && id > 0 &&

                senha != undefined &&
                senha != null &&
                senha != '' &&
                senha.length < 255
            ) {

                let resultUsuario = await usuarioDAO.getUserByIdAndPassword(id, senha)

                if (resultUsuario) {

                    if (resultUsuario.length > 0) {
                        let usuarioFiltrado = usuarioFormatado(resultUsuario[0])

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGENS.SUCCESS_REQUEST,
                            { usuario: usuarioFiltrado },
                            "Guilherme Moreira de Souza"
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

                MENSSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Email incorreto] ou [Senha incorreta]'

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_REQUIRED_FIELDS
                )

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

//Retorna um usuário ativo pelo id 
const buscarUsuarioAtivo = async (id, status) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (status == 0 || status == 1 || status == 'false' || status == 'true') {

            if (status == 'false') {
                status = 0
            } else if (status == 'true') {
                status = 1
            }
            //Validação da chegada do ID
            if (!isNaN(id) && id != null && id > 0) {
                let resultUsuario = await usuarioDAO.getUserByAtivo(id, status)


                if (resultUsuario) {

                    if (resultUsuario.length > 0) {

                        return criarResposta(
                            MENSSAGENS.SUCCESS_REQUEST,
                            { usuario: resultUsuario }
                        );

                    } else {
                        return criarResposta(
                            MENSSAGENS.ERROR_NOT_FOUND
                        )
                    }

                } else {
                    return criarResposta(
                        MENSSAGENS.ERROR_NOT_FOUND
                    );
                }
            } else {

                MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]';

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_REQUIRED_FIELDS
                );
            }
        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[Status incorreto]';

            return DEFAULT_MENSAGENS.criarResposta(
                MENSSAGENS.ERROR_REQUIRED_FIELDS
            );
        }

    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )
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

                let resultCPF = await buscarUsuarioCPF(usuario.cpf);

                if (resultCPF.status_code == 200) {
                    MENSSAGENS.ERROR_EXISTING.message += 'CPF'
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.ERROR_EXISTING
                    )
                } else {

                    let resultEmail = await buscarUsuarioEmail(usuario.email);
               
                    if (resultEmail.status_code == 200) {
                        MENSSAGENS.ERROR_EXISTING.message += 'Email'
                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGENS.ERROR_EXISTING
                        )
                    } else {

                        let resultUsuario = await usuarioDAO.postUser(usuario)
                  
                        if (resultUsuario) {

                            let ultimoId = await usuarioDAO.getSelectLastId()

                            if (ultimoId) {

                                usuario.id = ultimoId

                                return DEFAULT_MENSAGENS.criarResposta(
                                    MENSSAGENS.SUCCESS_CREATED_ITEM, usuario
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
                    }

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

//Atualiza um usuário pelo id
const atualizarUsuario = async (usuario, id, contentType) => {
  
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        console.log('CONTENT TYPE:', contentType)
console.log(
    String(contentType).toUpperCase() == 'APPLICATION/JSON'
)

        // Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função para validar os dados do usuário
            let validar = validarUsuario(usuario, true)

            if (!validar) {

                // Verifica se o ID existe no banco
                 usuario.id = Number(id)
                 console.log(id)
                usuario.password = usuario.senha
                let validarId = await buscarUsuarioIDComSenha(usuario,contentType)
                console.log (validarId)

                delete  usuario.password

                if (validarId.status_code == 200) {

                    // Adiciona o ID no objeto
                   

                    // Chama a DAO para atualizar
                    let resultUsuario = await usuarioDAO.putUser(usuario)

                    if (resultUsuario) {

                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGES.SUCCESS_UPDATE_ITEM,
                            { usuario: usuario }
                        )


                    } else {
                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSSAGES.ERROR_INTERNAL_SERVER
                        ) // 500 model
                    }

                } else {
                    return validarId // retorna erro 400, 404 ou 500
                }
            } else {
                return validar // erro de validação
            }

        } else {
            return DEFAULT_MENSAGENS.criarResposta(
                MENSSAGES.ERROR_CONTENT_TYPE
            ) // 415
        }

    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(
        MENSSAGES.ERROR_INTERNAL_SERVER
        )
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
        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGES.ERROR_REQUIRED_FIELDS
        )
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
        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGES.ERROR_REQUIRED_FIELDS
        )
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
        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGES.ERROR_REQUIRED_FIELDS
        )
    }

    // Validação da data de nascimento (opcional)
    else if (
        usuario.data_nascimento != undefined &&
        usuario.data_nascimento != null &&
        usuario.data_nascimento != '' &&
        usuario.data_nascimento.length != 10
    ) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de nascimento incorreta]'
        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGES.ERROR_REQUIRED_FIELDS
        )
    }

    // Validação da senha
    else if (
        usuario.senha == undefined ||
        usuario.senha == null ||
        usuario.senha == '' ||
        usuario.senha.length < 6 || usuario.senha.length > 255
    ) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Senha incorreta]'
        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGES.ERROR_REQUIRED_FIELDS
        )

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
            return DEFAULT_MENSAGENS.criarResposta(
                MENSSAGES.ERROR_REQUIRED_FIELDS
            )

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

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )
    }
}

const usuarioFormatado = (usuario) => {
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        data_nascimento: usuario.data_nascimento,
        foto_usuario: usuario.foto_usuario,
        is_ativo: usuario.is_ativo
    }
}

//Exports das funções
module.exports = {
    buscarUsuarioId,
    inserirUsuario,
    deletarUsuarioId,
    atualizarUsuario,
    buscarUsuarioEmailComSenha,
    buscarUsuarioAtivo,
    listarUsuarios
}