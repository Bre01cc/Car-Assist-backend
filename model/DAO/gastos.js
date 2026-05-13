/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos gastos
 * Data: 11/05/2026
 * Autor: Nikolas Fernandes
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

const getAllExpenses = async () => {
    try {
        let sql = 'select * from vw_gasto where is_ativo = true order by id desc';
        let result = await conexaoKnex.conexao.raw(sql);
        console.log(result)
        if (result[0].length > 0)
            return result[0];
        else
            return false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

const getExpenseById = async (id) => {
    try {
        let sql = `select * from vw_gasto where id = ${id}`;
        let result = await conexaoKnex.conexao.raw(sql);

        if (result[0].length > 0)
            return result[0];
        else
            return false;
    } catch (error) {
        return false;
    }
}

const getExpenseByIdVehicle = async (id) => {
    try {
        let sql = `select * from vw_gasto where id_veiculo = ${id}`;
        let result = await conexaoKnex.conexao.raw(sql);

        if (result[0].length > 0)
            return result[0];
        else
            return false;
    } catch (error) {
        return false;
    }
}
const getExpenseByIdVehicleAndType = async (id_veiculo, id_tipo) => {
    try {
    
        let result = await conexaoKnex.conexao.raw('select * from vw_gasto where id_veiculo = ? and id_tipo_gasto = ?',[
            id_veiculo,id_tipo
        ]);

        if (result[0].length > 0)
            return result[0];
        else
            return false;
    } catch (error) {
        return false;
    }
}

const getExpenseByIdType = async (id) => {
    try {
        let sql = `select * from vw_gasto where id_tipo_gasto = ${id}`;
        let result = await conexaoKnex.conexao.raw(sql);

        if (result[0].length > 0)
            return result[0];
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

        let result = await conexaoKnex.conexao.raw(sql);

        if (result[0].affectedRows > 0)
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

        let result = await conexaoKnex.conexao.raw(sql);

        if (result[0].affectedRows > 0)
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
        let result = await conexaoKnex.conexao.raw(sql);

        if (result[0].affectedRows > 0)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}

const getSelectLastId = async () => {
    try {
        let sql = 'select * from vw_gasto order by id desc limit 1';
        let result = await conexaoKnex.conexao.raw(sql);
console.log(result)
        if (result[0].length > 0)
            return result[0];
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
    getSelectLastId,
    getExpenseByIdType,
    getExpenseByIdVehicle,
    getExpenseByIdVehicleAndType
}