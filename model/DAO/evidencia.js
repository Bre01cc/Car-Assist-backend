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
            'select * from tbl_categoria_gasto where id = ?', [id]
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        }

        return false

    } catch (error) {
        return false
    }
}

//Busca todos as categorias de gastos
const getAllcategoryTypes = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from tbl_categoria_gasto order by id'
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        }

        return false


    } catch (error) {
        return false
    }
}
