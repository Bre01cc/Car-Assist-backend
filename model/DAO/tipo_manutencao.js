/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no MySQL referente ao tipo de manutenção
 * Data: 09/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do knex
const conexaoKnex = require('../../knex/index.js');

//Busca uma tipo de serviço pelo id
const getMaintenanceTypeById = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from tbl_tipo_manutencao where id = ?', [id]
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

//Busca todos os tipos de serviços
const getAllMaintenanceType = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from tbl_tipo_manutencao order by id'
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

module.exports = {
    getMaintenanceTypeById,
    getAllMaintenanceType
}