/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao usuário
 * Data: 10/04/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');
const bcrypt = require('bcrypt')

//Busca todos os usuários
const getAllUsers = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_usuario'
        )
        if (result && result[0] && result[0].length > 0) {
            return result[0];
        } else {
            return false;
        }

    } catch (error) {
        return false
    }
}

//Busca um usuário pelo id
const getUserById = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_usuario WHERE id = ?',
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

//Busca um usuário pelo id
const getUserByIdAndPassword = async (id, senha) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_usuario WHERE id = ?',
            [id]
        );

        senhaBanco = result[0][0].senha
        const senhaCorreta = await bcrypt.compare(senha, senhaBanco)
        if (result[0] && result[0].length > 0 && senhaCorreta) {
            return result[0];
        } else {
            return false;
        }

    } catch (error) {

        return false;
    }
}

//Busca um usuário pelo id e status
const getUserByAtivo = async (id, status) => {
    try {

        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_usuario WHERE id = ? and is_ativo = ?',
            [id, status]
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

//Busca usuário pelo email
const getUserByEmail = async (email) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM tbl_usuario where email = ?',
            [email]
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

//Busca o último id de usuário
const getSelectLastId = async () => {
    try {

        let result = await conexaoKnex.conexao
            .select('id')
            .from('tbl_usuario')
            .orderBy('id', 'desc')
            .limit(1)

        if (result.length > 0) {
            return Number(result[0].id)
        } else {
            return false
        }

    } catch (error) {

        return false
    }
}

//Busca usuário pelo email e senha
const getUserByEmailAndPassword = async (email, senha) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM tbl_usuario WHERE email = ?',
            [email]
        );

        senhaBanco = result[0][0].senha
        const senhaCorreta = await bcrypt.compare(senha, senhaBanco)
        if (result[0] && result[0].length > 0 && senhaCorreta) {
            return result[0];
        } else {
            return false;
        }

    } catch (error) {
        console.log(error)
        return false;
    }
}

//Busca usuário pelo CPF
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

//Inserir um usuário
const postUser = async (usuario) => {

    try {
        //10 será refente ao custo de processamento, quanto maior mais seguro e lento será.
        const senhaCriptografada = await bcrypt.hash(usuario.senha, 10)
        console.log(usuario.senha)
        console.log(senhaCriptografada)
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
            senhaCriptografada
        ]);

        if (result[0]) {
            return true
        } else {
            return false
        }


    } catch (error) {
        console.log(error)
        return false
    }

}

//Atualiza um usuário
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

        if (result[0].affectedRows > 0) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Desativa um usuário
const deleteUser = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(`
            Update tbl_usuario
            set is_ativo = ? where id = ?
            `, [
            0,
            id
        ])
        if (result[0].affectedRows > 0) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false

    }
}

//Exports das funções
module.exports = {
    getUserById,
    postUser,
    putUser,
    deleteUser,
    getSelectLastId,
    getUserByEmailAndPassword,
    getUserByIdAndPassword,
    getUserByAtivo,
    getAllUsers,
    getUserByEmail,
    getUserByCPF
}

