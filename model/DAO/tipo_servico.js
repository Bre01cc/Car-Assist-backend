/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no MySQL referente ao tipo de serviço
 * Data: 08/05/2026
 * Autor: Nikolas Fernandes Vieira
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

const getAllTypes = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM tbl_tipo_servico ORDER BY id DESC'
        );

        if (result && result && result.length > 0) {
            return result;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
}

module.exports = {
    getAllTypes
}