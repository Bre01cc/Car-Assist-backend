/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao usuário
 * Data: 10/04/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

//Busca um usuario pelo id
const getUserById = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM tbl_usuario WHERE id = ?',
            [id]
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0];
        }

        return false;

    } catch (error) {
      
        return false;
    }
}

//Retorna todos os usuários
const getAllUsers = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM tbl_usuario ORDER BY id'
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0];
        }

        return false;

    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports ={
    getAllUsers,
    getUserById
}

