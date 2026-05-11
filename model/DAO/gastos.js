/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos gastos
 * Data: 11/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

const getAllExpenses = async () => {
    try {
        let sql = 'select * from tbl_gastos where is_ativo = true order by id desc';
        let result = await conexaoKnex.raw(sql);

        if (result.length > 0)
            return result;
        else
            return false;
    } catch (error) {
        return false;
    }
}

const getExpenseById = async (id) => {
    try {
        let sql = `select * from tbl_gastos where id = ${id}`;
        let result = await conexaoKnex.raw(sql);

        if (result.length > 0)
            return result;
        else
            return false;
    } catch (error) {
        return false;
    }
}

const postExpense = async (dados) => {
    try {
        let sql = `insert into tbl_gastos (
                        data_gasto, 
                        valor, 
                        fk_id_veiculo, 
                        fk_id_categoria
                    ) values (
                        '${dados.data_gasto}', 
                        ${dados.valor}, 
                        ${dados.fk_id_veiculo}, 
                        ${dados.fk_id_categoria}
                    )`;

        let result = await conexaoKnex.raw(sql);

        if (result)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}

const putExpense = async (id, dados) => {
    try {
        let sql = `update tbl_gastos set 
                        data_gasto = '${dados.data_gasto}', 
                        valor = ${dados.valor}, 
                        fk_id_veiculo = ${dados.fk_id_veiculo}, 
                        fk_id_categoria = ${dados.fk_id_categoria},
                        is_ativo = ${dados.is_ativo}
                    where id = ${id}`;

        let result = await conexaoKnex.raw(sql);

        if (result)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}

const deleteExpense = async (id) => {
    try {
        let sql = `update tbl_gastos set is_ativo = false where id = ${id}`;
        let result = await conexaoKnex.raw(sql);

        if (result)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}

const getSelectLastId = async () => {
    try {
        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_gastos limit 1';
        let result = await conexaoKnex.raw(sql);

        if (result.length > 0)
            return result;
        else
            return false;
    } catch (error) {
        return false;
    }
}

module.exports = {
    getAllExpenses,
    getExpenseById,
    postExpense,
    putExpense,
    deleteExpense,
    getSelectLastId
}