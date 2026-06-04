/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo dados no MySQL referente ao reset_senha
 * Data: 29/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

const bcrypt = require('bcrypt');



const getPasswordResetByIdUser = async (idUsuario) => {
    try {
        let result = await conexaoKnex.conexao.raw(
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

const postPasswordReset = async (dados) => {

    try {

            let result = await conexaoKnex.conexao.raw(
                `insert into tbl_reset_senha(
             id_usuario,
             token_hash
            )values(
            ?,
            ?
            )`,
                [
                    dados.id_usuario,
                    dados.tokenHash
                ]
            );

            if (result[0].affectedRows > 0) {
                return true
            } else {
                return false
            }

    } catch (error) {

        return false
    }
}

const validateResetToken = async (tokenHash) => {
    try {
        let result = await conexaoKnex.conexao.raw(`
            SELECT * FROM tbl_reset_senha 
            WHERE token_hash = ? 
              AND data_expiracao > NOW() 
              AND data_uso IS NULL
            LIMIT 1
        `, [tokenHash]);

        // Retorna o registro completo (contendo o id_usuario) se for válido
        if (result && result[0] && result[0].length > 0) {
            return result[0][0];
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

const resetUserPassword = async (idUsuario, idToken, novaSenha) => {

    try {
       
        let senhaCriptografada = await bcrypt.hash(novaSenha, 10);

        // Atualiza a senha do usuário
        let result = await conexaoKnex.conexao.raw(`
            UPDATE tbl_usuario 
            SET senha = ? 
            WHERE id = ?
        `, [senhaCriptografada, idUsuario]);


        if (result[0].affectedRows>0) {
          let invalidar = await invalidateToken(idToken)
          if(invalidar){
            return true
          }else{
            return false
          }
        }else{
            return false
        }

    } catch (error) {

        return false;
    }
}

const invalidateToken = async (idToken) => {

    try {

        let result = await conexaoKnex.conexao.raw(`
            UPDATE tbl_reset_senha 
            SET data_uso = NOW() 
            WHERE id = ?`,
            [idToken]
        );

        if (result[0].affectedRows > 0) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

module.exports = {
getPasswordResetByIdUser,
postPasswordReset,
resetUserPassword
}