/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo dados no MySQL referente ao reset_senha
 * Data: 29/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

const crypto = require('crypto');

const getPasswordResetByIdUser = async (idUsuario) => {
    try {
        let result = conexaoKnex.conexao.raw(
            `select * from tbl_reset_senha where id_usuario = ?`,
            [idUsuario]
        );

        if (result && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const generateToken = async () => {

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
const postPasswordReset = async (dados) => {

    try {

        let token = generateToken()

        if (token) {
            let result = conexaoKnex.conexao.raw(
                `insert into tbl_reset_senha(
             id_usuario,
             token_hash
            )values(
            ?,
            ?
            )`,
                [
                    dados.id_usuario,
                    token.tokenHash
                ]
            );

            if (result[0].affectedRows > 0) {
                return true
            } else {
                return false
            }
        }

    } catch (error) {

        return false
    }
}
