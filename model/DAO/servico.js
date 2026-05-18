/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao serviço
 * Data: 10/04/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js')

// Busca todos os serviços
const getAllService = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_servicos ORDER BY id'
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

// Busca um serviço pelo id
const getServiceById = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_servicos WHERE id = ?',
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

// Busca um serviço pelo id
const getServiceByIdType = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_servicos WHERE id_tipo_servico = ? ORDER BY id',
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
        const result = await conexaoKnex.conexao.raw('select * from vw_servicos order by id desc limit 1')
        
        if (result[0].length > 0) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }


}

// Inserir um serviço
const postServico = async (servico) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            INSERT INTO tbl_servicos(
                nome_local,
                latitude,
                longitude,
                fk_id_tipo_servico
            )
            VALUES(
                ?,
                ?,
                ?,
                ?
            )
        `, [
            servico.nome_local,
            servico.latitude,
            servico.longitude,
            servico.fk_id_tipo_servico
        ])

        if (result[0]) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Atualiza um serviço
const putServico = async (servico) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            UPDATE tbl_servicos
            SET nome_local = ?,
                latitude = ?,
                longitude = ?,
                fk_id_tipo_servico = ?
            WHERE id = ?
        `, [
            servico.nome_local,
            servico.latitude,
            servico.longitude,
            servico.fk_id_tipo_servico,
            servico.id
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

// Deleta um serviço
const deleteServico = async (id) => {
    try {
        const result = conexaoKnex.conexao.raw('delete * from tbl_servicos where id = ?', [id])

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
    getAllService,
    getServiceById,
    getServiceByIdType,
    getSelectLastId,
    putServico,
    postServico,
    deleteServico
}