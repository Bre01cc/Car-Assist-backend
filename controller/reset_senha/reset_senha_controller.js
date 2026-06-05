/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do reset de senha
 * Data: 04/06/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/


const DEFAULT_MESSAGES = require('../modulo/config_messages.js');
const crypto = require('crypto');
const usuarioDAO = require('../../model/DAO/usuario.js')

const generateToken = () => {

    try {
        //utilizando biblioteca nativa do node pra gerar um token e=hexadecimal
        const token = crypto.randomBytes(64).toString('hex');

        //gerando uma hash e passando para ela o token, por fim gera token que será guardado no banco
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

        return {
            token,
            tokenHash
        }

    } catch (error) {
        return false
    }

}

const solicitarResetSenha = async (dados, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        // Validação do Content-Type
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
            let email = dados.email;

          
            if (
                email !== undefined &&
                email !== null &&
                email !== '' &&
                email.length < 100 &&
                email.includes('@')
            ) {
                
                let resultUsuario = await usuarioDAO.getUserByEmail(email);

                if (resultUsuario) {
                 

                    let tokenGerado = generateToken()
                    dados.tokenHash = tokenGerado.tokenHash

                    let resultToken = await passwordResetDAO.postPasswordReset(dados);

                    if (resultToken) {
                        //  { 
                        //         mensagem: "Token gerado com sucesso.",
                        //         email_usuario: usuario.email,
                        //         nome_usuario: usuario.nome,
                        //         token: tokenPuro // Este cara vai para o e-mail
                        //     }

                        // IMPORTANTE: Retornamos o tokenPuro aqui para que sua rota/serviço possa 
                        // capturá-lo e enviar no corpo do e-mail do usuário.
                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_REQUEST            
                        );
                    } else {
                        return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_INTERNAL_SERVER);
                    }

                } else {
                   
                    return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_NOT_FOUND);
                }

            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Email incorreto ou ausente]';
                return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_REQUIRED_FIELDS);
            }

        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += ' [JSON]';
            return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_CONTENT_TYPE);
        }

    } catch (error) {
        return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_INTERNAL_SERVER);
    }
};


const efetuarResetSenha = async (dados, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
            let tokenPuro = dados.token;
            let novaSenha = dados.senha;

           
            if (
                tokenPuro !== undefined && tokenPuro !== null && tokenPuro !== '' &&
                novaSenha !== undefined && novaSenha !== null && novaSenha !== '' &&
                novaSenha.length >= 6 && novaSenha.length <= 255
            ) {
               
                const hashParaBuscar = crypto.createHash('sha256').update(tokenPuro).digest('hex');

              
                let tokenInformacoes = await passwordResetDAO.validateResetToken(hashParaBuscar);

                if (tokenInformacoes) {
                    
                    let atualizouSenha = await passwordResetDAO.resetUserPassword(
                        tokenInformacoes.id_usuario,
                        tokenInformacoes.id,
                        novaSenha
                    );

                    if (atualizouSenha) {
                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_UPDATE_ITEM, 
                            { mensagem: "Senha redefinida com sucesso!" }
                        );
                    } else {
                        return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_INTERNAL_SERVER);
                    }

                } else {
                    
                    MESSAGES.ERROR_REQUIRED_FIELDS.message = 'Este link de recuperação é inválido ou já expirou.';
                    return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_REQUIRED_FIELDS);
                }

            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Token ou Senha inválidos]';
                return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_REQUIRED_FIELDS);
            }

        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += ' [JSON]';
            return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_CONTENT_TYPE);
        }

    } catch (error) {
        return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_INTERNAL_SERVER);
    }
};

module.exports = {
    solicitarResetSenha,
    efetuarResetSenha
}