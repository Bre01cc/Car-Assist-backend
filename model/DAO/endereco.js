
/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a tabela dendereço
 * Data: 15/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

// Busca todos os endereços
const getAllEnderecos = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_endereco'
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0];
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

// Busca endereço por ID
const getEnderecoById = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_endereco WHERE id = ?',
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
};

// Busca endereços por serviço (fk_id_servico)
const getEnderecoByServico = async (fk_id_servico) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_enderecos WHERE id_servico = ?',
            [fk_id_servico]
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0];
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

// Inserir endereço
const postEndereco = async (endereco) => {
    try {
        const result = await conexaoKnex.conexao.raw(`
            INSERT INTO tbl_enderecos (
                logradouro,
                cep,
                complemento,
                fk_id_servico
            )
            VALUES (?, ?, ?, ?)
        `, [
            endereco.logradouro,
            endereco.cep,
            endereco.complemento,
            endereco.fk_id_servico
        ]);

        if (result[0]) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

// Atualizar endereço
const putEndereco = async (endereco) => {
    try {
        const result = await conexaoKnex.conexao.raw(`
            UPDATE tbl_enderecos
            SET logradouro = ?,
                cep = ?,
                complemento = ?,
                fk_id_servico = ?
            WHERE id = ?
        `, [
            endereco.logradouro,
            endereco.cep,
            endereco.complemento,
            endereco.fk_id_servico,
            endereco.id
        ]);

        if (result[0].affectedRows > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

// Deletar endereço
const deleteEndereco = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(`
            DELETE FROM tbl_enderecos
            WHERE id = ?
        `, [id]);

        if (result[0].affectedRows > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

module.exports = {
    getAllEnderecos,
    getEnderecoById,
    getEnderecoByServico,
    postEndereco,
    putEndereco,
    deleteEndereco
};