/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do usuário
 * Data: 07/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const usuarioDAO = require('../../model/DAO/usuario.js');

const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

//Import da controller que faz upload da foto
const UPLOAD = require('../upload/controller_upload_azure.js');

//Retorna todos os usuários
const listarUsuarios = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let resultUsuario = await usuarioDAO.getAllUsers()

        if (resultUsuario) {

            if (resultUsuario.length > 0) {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { usuarios: resultUsuario }
                )


            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )//404
            }

        } else {
            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_NOT_FOUND
            )//404
        }


    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL
        )
    }
}
//Retorna um usuário pelo id
const buscarUsuarioId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultUsuario = await usuarioDAO.getUserById(id)


            if (resultUsuario) {

                if (resultUsuario.length > 0) {
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { usuario: resultUsuario }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )

                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

const buscarUsuarioCPF = async (cpf) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (cpf != undefined &&
            cpf != null &&
            cpf != '' &&
            cpf.length == 11 &&
            !isNaN(cpf)
        ) {

            let resultUsuario = await usuarioDAO.getUserByCPF(cpf);

            if (resultUsuario) {

                if (resultUsuario.length > 0) {
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { usuario: resultUsuario }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )

                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }
        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[CPF incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

const buscarUsuarioCPFAtualizar = async (cpf, id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (cpf != undefined &&
            cpf != null &&
            cpf != '' &&
            cpf.length == 11 &&
            !isNaN(cpf)
        ) {

            let resultUsuario = await usuarioDAO.getUserByCPFPut(cpf, id);


            if (resultUsuario) {

                if (resultUsuario.length > 0) {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { usuario: resultUsuario }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {
        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

const buscarUsuarioEmail = async (email) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (email != undefined &&
            email != null &&
            email != '' &&
            email.length < 100 &&
            email.includes('@')
        ) {

            let resultUsuario = await usuarioDAO.getUserByEmail(email);

            if (resultUsuario) {

                if (resultUsuario.length > 0) {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { usuario: resultUsuario }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

const buscarUsuarioEmailPut = async (email, id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (email != undefined &&
            email != null &&
            email != '' &&
            email.length < 100 &&
            email.includes('@')
        ) {

            let resultUsuario = await usuarioDAO.getUserByEmailPut(email, id);

            if (resultUsuario) {

                if (resultUsuario.length > 0) {
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { usuario: resultUsuario }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )

                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

//Retorna um usuário pelo email e senha
const buscarUsuarioEmailComSenha = async (usuario, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    // IMport para retornar o token de acesso
    // const jwt = require('../../middlewares/middlewareJWT.js')

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

                let resultUsuario = await usuarioDAO.getUserByEmailAndPassword(email, senha);

                if (resultUsuario) {

                    if (resultUsuario.length > 0) {

                        let usuarioFiltrado = usuarioFormatado(resultUsuario[0]);

                        // let tokenUser = await jwt.createJWT(usuarioFiltrado.id);

                        // Adiciona uma chave no JSON com o token do usuário
                        // usuarioFiltrado.token = tokenUser;

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_REQUEST,
                            { usuario: usuarioFiltrado },
                            "Guilherme Moreira de Souza"
                        )

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_NOT_FOUND
                        )

                    }

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )

                }

            } else {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id incorreto] ou [Senha incorreta]'

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_REQUIRED_FIELDS
                )

            }

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}
//Retorna um usuário pelo email e senha
const buscarUsuarioIDComSenha = async (usuario, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

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

                let resultUsuario = await usuarioDAO.getUserByIdAndPassword(id, senha);

                if (resultUsuario) {

                    if (resultUsuario.length > 0) {

                        let usuarioFiltrado = usuarioFormatado(resultUsuario[0]);

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_REQUEST,
                            { usuario: usuarioFiltrado },
                            "Guilherme Moreira de Souza"
                        )

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_NOT_FOUND
                        )
                    }

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Email incorreto] ou [Senha incorreta]'

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_REQUIRED_FIELDS
                )

            }

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE
            )

        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )

    }
}

//Retorna um usuário ativo pelo id 
const buscarUsuarioAtivo = async (id, status) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

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
                            MESSAGES.SUCCESS_REQUEST,
                            { usuario: resultUsuario }
                        );

                    } else {
                        return criarResposta(
                            MESSAGES.ERROR_NOT_FOUND
                        )
                    }

                } else {
                    return criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    );
                }
            } else {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]';

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_REQUIRED_FIELDS
                );
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Status incorreto]';

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            );
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

//Cadastra um usuario no banco de dados
const inserirUsuario = async (usuario, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Validação dos dados do usuário
            let validar = validarUsuario(usuario)


            if (!validar) {

                let resultCPF = await buscarUsuarioCPF(usuario.cpf);

                if (resultCPF.status_code == 200) {

                    MESSAGES.ERROR_EXISTING.message += 'CPF'
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_EXISTING
                    )

                } else {

                    let resultEmail = await buscarUsuarioEmail(usuario.email);

                    if (resultEmail.status_code == 200) {

                        MESSAGES.ERROR_EXISTING.message += 'Email'
                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_EXISTING
                        )

                    } else {

                        let resultUsuario = await usuarioDAO.postUser(usuario);

                        if (resultUsuario) {

                            let ultimoId = await usuarioDAO.getSelectLastId();

                            if (ultimoId) {

                                usuario.id = ultimoId;

                                return DEFAULT_MESSAGES.criarResposta(
                                    MESSAGES.SUCCESS_CREATED_ITEM, usuario
                                )

                            } else {

                                return DEFAULT_MESSAGES.criarResposta(
                                    MESSAGES.ERROR_INTERNAL_SERVER
                                )
                            }

                        } else {

                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.ERROR_INTERNAL_SERVER
                            )
                        }
                    }

                }

            } else {

                return validar
            }

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

//Atualiza um usuário pelo id
const atualizarUsuario = async (usuario, id, contentType, foto) => {
    console.log(contentType)
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        // Validação do content-type
        if (String(contentType).toUpperCase().includes('MULTIPART/FORM-DATA')) {

            // Chama a função para validar os dados do usuário
            let validar = validarUsuario(usuario, true)

            if (!validar) {

                // Verifica se o ID existe no banco
                usuario.id = Number(id)

                usuario.password = usuario.senha


                let validarId = await buscarUsuarioIDComSenha(usuario, 'APPLICATION/JSON');
                console.log(validarId)

                delete usuario.password

                if (validarId.status_code == 200) {

                    let resultCPF = await buscarUsuarioCPFAtualizar(usuario.cpf, usuario.id);

                    if (resultCPF.status_code == 200) {

                        MESSAGES.ERROR_EXISTING.message += 'CPF'
                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_EXISTING
                        )

                    } else {

                        let resultEmail = await buscarUsuarioEmailPut(usuario.email, usuario.id);

                        if (resultEmail.status_code == 200) {

                            MESSAGES.ERROR_EXISTING.message += 'Email'
                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.ERROR_EXISTING
                            )

                        } else {

                            if (foto) {

                                if (validarId.data.usuario.foto_usuario) {

                                    let deleteImg = await UPLOAD.deleteUploadFiles(validarId.data.usuario.foto_usuario.split('/').pop())

                                    if (!deleteImg) {

                                        return DEFAULT_MESSAGES.criarResposta(
                                            MESSAGES.ERROR_UPLOAD_IMAGE_DELETE,
                                        )
                                    }
                                }

                                let urlFoto = await UPLOAD.uploadFiles(foto);

                                if (urlFoto) {

                                    usuario.foto_usuario = urlFoto

                                } else {
                                    return DEFAULT_MESSAGES.criarResposta(
                                        MESSAGES.ERROR_UPLOAD_IMAGE
                                    )
                                }
                            }


                            let resultUsuario = await usuarioDAO.putUser(usuario)

                            if (resultUsuario) {

                                return DEFAULT_MESSAGES.criarResposta(
                                    MESSAGES.SUCCESS_UPDATE_ITEM,
                                    { usuario: usuario }
                                )

                            } else {

                                return DEFAULT_MESSAGES.criarResposta(
                                    MESSAGES.ERROR_INTERNAL_SERVER
                                ) // 500 model
                            }
                        }

                    }

                } else {

                    return validarId // retorna erro 400, 404 ou 500
                }

            } else {

                return validar // erro de validação
            }

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE
            ) // 415
        }

    } catch (error) {
        console.log(error)
        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

//Valida os dados de um usuário
const validarUsuario = (usuario, validar) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    // Validação do nome
    if (
        usuario.nome == undefined ||
        usuario.nome == null ||
        usuario.nome == '' ||
        usuario.nome.length > 100
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS
        )
    }

    // Validação do email
    if (
        usuario.email == undefined ||
        usuario.email == null ||
        usuario.email == '' ||
        usuario.email.length > 100 ||
        !usuario.email.includes('@')
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Email incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS
        )
    }

    // Validação do CPF
    if (
        usuario.cpf == undefined ||
        usuario.cpf == null ||
        usuario.cpf == '' ||
        usuario.cpf.length != 11 ||
        isNaN(usuario.cpf)
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CPF incorreto]'
        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS
        )
    }

    // Validação da data de nascimento (opcional)
    if (
        usuario.data_nascimento != undefined &&
        usuario.data_nascimento != null &&
        usuario.data_nascimento != '' &&
        usuario.data_nascimento.length != 10
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de nascimento incorreta]'
        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS
        )
    }

    // Validação da senha
    if (
        usuario.senha == undefined ||
        usuario.senha == null ||
        usuario.senha == '' ||
        usuario.senha.length < 6 || usuario.senha.length > 255
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Senha incorreta]'
        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS
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

            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto inválida]'
            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }
    }

    return false
}

//Desativa um usuário pelo id
const deletarUsuarioId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await buscarUsuarioId(id);

        if (validarId.status_code == 200) {

            let deletarUsuario = await usuarioDAO.deleteUser(id);

            if (deletarUsuario) {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_DELETE
                )
            }
            else {
                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_INTERNAL_SERVER
                )
            }

        } else {
            return validarId
        }
    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
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