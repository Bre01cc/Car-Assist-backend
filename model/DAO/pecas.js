/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no MySQL referente ao peças
 * Data: 10/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do knex
const conexaoKnex = require('../../knex/index.js');

//Busca peça pelo ID
const getPartsById = async (id) => {

    try {

        const result = await conexaoKnex.conexao.raw(
            'select * from vw_pecas where id = ?', [id]
        )

        if (result && result[0] && result[0].length > 0) {

            return result[0]

        } else {

            return false
        }

    } catch (error) {

        return false
    }
}

//Busca último ID cadastrado
const getSelectLastId = async () => {

    try {

        const result = await conexaoKnex.conexao.raw(
            'select * from vw_pecas order by id desc limit 1'
        )

        if (result[0].length > 0) {

            return result[0]

        } else {

            return false
        }

    } catch (error) {

        return false
    }
}

//Busca peças pelo ID da manutenção
const getPartsByMaintenance = async (id) => {

    try {

        const result = await conexaoKnex.conexao.raw(
            'select * from vw_pecas where id_manutencao = ?', [id]
        )

        if (result && result[0] && result[0].length > 0) {

            return result[0]

        } else {

            return false
        }

    } catch (error) {

        return false
    }
}

//Busca todas as peças
const getAllParts = async () => {

    try {

        const result = await conexaoKnex.conexao.raw(
            'select * from vw_pecas order by id'
        )

        if (result && result[0] && result[0].length > 0) {

            return result[0]

        } else {

            return false
        }

    } catch (error) {

        return false
    }
}

//Deleta peça
const deleteParts = async (id) => {

    try {

        const result = await conexaoKnex.conexao.raw(
            'delete from tbl_pecas where id = ?', [id]
        )

        if (result[0].affectedRows > 0) {

            return true

        } else {

            return false
        }

    } catch (error) {

        return false
    }
}

//Insere peça
const postParts = async (peca) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            insert into tbl_pecas(
                nome,
                fk_id_manutencao
            )
            values(
                ?,
                ?
            )
        `, [
            peca.nome,
            peca.fk_id_manutencao
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

//Atualiza peça
const putParts = async (peca) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            update tbl_pecas
            set nome = ?,
                fk_id_manutencao = ?
            where id = ?
        `, [
            peca.nome,
            peca.fk_id_manutencao,
            peca.id
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

module.exports ={
    getAllParts,
    getPartsById,
    getPartsByMaintenance,
    getSelectLastId,
    postParts,
    putParts,
    deleteParts

}
