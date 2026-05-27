/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelos dados no MySQL referente evidencia
 * Data: 06/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do knex
const conexaoKnex = require('../../knex/index.js');

//Busca uma categoria pelo id
const getEvidenceById = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from vw_evidencia where id = ?', [id]
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const getSelectLastId = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from vw_evidencia order by id desc LIMIT 1 '
        );

        if (result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const getEvidenceByIdMaintenance = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from vw_evidencia where id_manutencao = ?', [id]
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Busca todos as categorias de gastos
const getAllEvidences = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from vw_evidencia order by id'
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        }

        return false


    } catch (error) {
        return false
    }
}

const getEvidenceByIdNotMaintenance = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from vw_evidencia_data where id = ?', [id]
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        
        return false
    }
}

const deleteEvidence = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'delete from tbl_evidencia where id = ?', [id]
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

const postEvidence = async (evidencia) => {
    try {
        const result = await conexaoKnex.conexao.raw(`
            insert into tbl_evidencia(
                url,
                fk_id_manutencao
            )
            values(
                ?,
                ?
                )`, [
            evidencia.url,
            evidencia.fk_id_manutencao
        ]);

        if (result[0].affectedRows > 0) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false

    }
}

const putEvidence = async (evidencia) => {
    try {

        const result = await conexaoKnex.conexao.raw(`
            update tbl_evidencia
            set url = ?,
                fk_id_manutencao = ?
            where id = ?
        `, [
            evidencia.url,
            evidencia.fk_id_manutencao,
            evidencia.id
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

module.exports = {
    getAllEvidences,
    getEvidenceById,
    deleteEvidence,
    postEvidence,
    putEvidence,
    getEvidenceByIdMaintenance,
    getEvidenceByIdNotMaintenance,
    getSelectLastId
}