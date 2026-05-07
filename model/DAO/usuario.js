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

const getUserByAtivo = async (id) => {

}

const getUserAndVehicle = () => {

}

const getSelectLastId = async () => {
    try {

        let result = await conexaoKnex.conexao
            .select('id')
            .from('tbl_usuario')
            .orderBy('id', 'desc')
            .limit(1)

        if (result[0]) {
            return Number(result[0].id)
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

const getUserByEmail = async (email) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM tbl_usuario WHERE email = ?',
            [email]
        );
        console.log(result)

        if (result && result[0] && result[0].length > 0) {
            return result[0];
        } else {
            return false;
        }

    } catch (error) {

        return false;
    }
}

const getUserByCPF = async (cpf) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM tbl_usuario WHERE cpf = ?',
            [cpf]
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

const postUser = async (usuario) => {

    try {

    const result = await conexaoKnex.conexao.raw(`
       Insert into tbl_usuario(
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
        console.log(error)
        return false
    }

}

const putUser = async (usuario) => {
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

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteUser = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(`
            Update tbl_usuario
            set is_ativo = ? where id = ?
            `, [
            0,
            id
        ])
        if (result) {
            return true
        } else {
            return true
        }
    } catch (error) {
        return false

    }
}


module.exports = {
    getUserById,
    postUser,
    putUser,
    deleteUser,
    getSelectLastId,
    getUserByEmail
}

