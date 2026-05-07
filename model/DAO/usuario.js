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
        } else {
            return false;
        }



    } catch (error) {
      
        return false;
    }
}

const getSelectLastId = async () => {
    try {

        let result = await conexaoKnex
            .select('id')
            .from('tbl_usuario')
            .orderBy('id', 'desc')
            .limit(1)

        if (Array.isArray(result) && result.length > 0) {
            return Number(result[0].id)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const postUser = async (usuario) => {

    try {
        const result = await conexaoKnex.conexao.raw(`
       Insert into tbl_usuario(
       )
        nome,
        email,
        cpf,
        data_nascimento,
        senha
        )
        values(
            ?,
            ?,
            ?,
            ?,
            ?
        )
        `, [
            usuario.nome,
            usuario.email,
            usuario.cpf,
            usuario.data_nascimento,
            usuario.senha
        ]);

        if (result[0]) {
            return true
        }


    } catch (error) {

        return false
    }

}

const putUser = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(`
          Update tbl_usuario
          set nome = ?,
          email = ?,
          cpf = ?,
          senha = ?,
          foto_usuario = ?     
        where id = ?`, [
            usuario.nome,
            usuario.email,
            usuario.cpf,
            usuario.senha,
            usuario.foto_usuario,
            usuario.id
        ])

    } catch (error) {
        return false
    }
}

const deleteUser = async () => {

    try {
        const result = await conexaoKnex.conexao.raw(`
            Update tbl_usuario
            set is_ativo = ?
            `,
            0)
    } catch (error) {
        return false

    }
}

const getUserByEmail = async () =>{
    
}

module.exports = {
    getUserById,
    postUser,
    putUser,
    deleteUser,
    getSelectLastId
}

