/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao serviço
 * Data: 10/04/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js')

//Busca todos os serviços
const getAllService = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_servicos'
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

//Busca um serviço pelo id
const getServiceById = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_servicos WHERE id = ?',
            [id]
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

//Busca um serviço pelo id
const getServiceByIdType = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_servicos WHERE id_tipo_servico = ?',
            [id]
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

module.exports = {
    getAllService,
    getServiceById,
    getServiceByIdType
}