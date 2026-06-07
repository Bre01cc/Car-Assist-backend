/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do reset de senha com envio de e-mail
 * Data: 06/06/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.1
 ***********************************************************************************************************************/

const DEFAULT_MESSAGES = require('../modulo/config_messages.js');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const usuarioDAO = require('../../model/DAO/usuario.js');

const passwordResetDAO = require('../../model/DAO/reset_senha.js');

require('dotenv').config();

const templateResetSenha = (nomeUsuario, tokenPuro) => {

    return {
        subject: 'Seu Token de Recuperação de Senha',

        text: `Olá, ${nomeUsuario}. Use o seguinte token para redefinir sua senha: ${tokenPuro}`,

        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #333;">Olá, ${nomeUsuario}!</h2>

                <p style="color: #555; font-size: 16px;">
                    Recebemos uma solicitação para redefinir a senha da sua conta.
                </p>

                <p style="color: #555; font-size: 16px;">
                    Utilize o código de verificação abaixo para prosseguir.
                    Ele é válido por 15 minutos.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <span style="background-color: #f4f4f4; color: #333; padding: 12px 24px; font-family: monospace; font-size: 18px; border: 1px dashed #007BFF; border-radius: 5px; font-weight: bold; display: inline-block; letter-spacing: 1px;">
                        ${tokenPuro}
                    </span>
                </div>

                <p style="color: #999; font-size: 12px;">
                    Se você não solicitou essa alteração, pode ignorar este e-mail com segurança.
                </p>
            </div>
        `
    }
}

//Responsavl pr enviar o codigo para o email do usuário
const enviarEmailToken = async (emailDestinatario, nomeUsuario, tokenPuro) => {
    try {

        const transport = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT),
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        const template = templateResetSenha(
            nomeUsuario,
            tokenPuro
        );

        await transport.sendMail({
            from: '"Car Assist" <suporte@carassist.com>',
            to: emailDestinatario,
            subject: template.subject,
            text: template.text,
            html: template.html
        });

        return true;

    } catch (error) {
       
        return false;
    }
};


const generateToken = () => {

    try {
        const token = crypto.randomBytes(32).toString('hex');

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

        return { token, tokenHash };

    } catch (error) {

        return false;
    }

};

const solicitarResetSenha = async (dados, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

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


                if (resultUsuario && resultUsuario.length > 0) {
                    const usuarioEncontrado = resultUsuario[0];

                    let tokenGerado = generateToken();


                    let dadosToken = {
                        id_usuario: usuarioEncontrado.id,
                        token_hash: tokenGerado.tokenHash
                    };

                    let resultToken = await passwordResetDAO.postPasswordReset(dadosToken);

                    if (resultToken) {

                        enviarEmailToken(usuarioEncontrado.email, usuarioEncontrado.nome, tokenGerado.token);


                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_REQUEST,
                            {
                                mensagem: "Token enviado com sucesso para o e-mail cadastrado.",
                                email: usuarioEncontrado.email
                            }
                        );
                    } else {
                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_INTERNAL_SERVER
                        );
                    }

                } else {
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    );
                }

            } else {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Email incorreto ou ausente]';

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_REQUIRED_FIELDS
                );
            }

        } else {

            MESSAGES.ERROR_CONTENT_TYPE.message += ' [JSON]';

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE
            );
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        );
    }
}

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

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_INTERNAL_SERVER
                        );
                    }

                } else {

                    MESSAGES.ERROR_REQUIRED_FIELDS.message = 'Este link de recuperação é inválido ou já expirou.';

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_REQUIRED_FIELDS
                    );
                }

            } else {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Token ou Senha inválidos]';

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_REQUIRED_FIELDS
                );
            }

        } else {
            
            MESSAGES.ERROR_CONTENT_TYPE.message += ' [JSON]';

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE
            );
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        );
    }
};

module.exports = {
    solicitarResetSenha,
    efetuarResetSenha
}