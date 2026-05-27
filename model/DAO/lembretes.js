/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos Lembretes
 * Data: 11/05/2026
 * Autor: Nikolas Fernandes Vieira
 * Versão: 1.0
 ***********************************************************************************************************************/

// Import do knex
const conexaoKnex = require('../../knex/index.js');

// Selecionar todos os lembretes
const getAllReminders = async () => {

    try {
   
        let result = await conexaoKnex.conexao.raw('select * from tbl_lembretes order by id desc');

        if (result[0].length > 0)
            return result[0];
        else
            return false;

    } catch (error) {
        return false;
    }
}

// Selecionar um lembrete pelo ID
const getReminderById = async (id) => {

    try {

        let result = await conexaoKnex.conexao.raw(`select * from tbl_lembretes where id = ? `);

        if (result[0].length > 0)
            return result[0];
        else
            return false;

    } catch (error) {
        return false;
    }
}

// Inserir um novo lembrete
const insertReminder = async (dados) => {

    try {

        let result = await conexaoKnex.conexao.raw(
            `insert into tbl_lembretes (
                        titulo, 
                        descricao, 
                        data_vencimento, 
                        status, 
                        fk_id_veiculo
                    ) values (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )`, [
            dados.titulo,
            dados.descricao,
            dados.data_vencimento,
            dados.status,
            dados.fk_id_veiculo
        ]
        );

        if (result[0].affectedRows > 0)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }

}

// Atualizar um lembrete
const updateReminder = async (id, dados) => {

    try {

        let result = await conexaoKnex.conexao.raw(
            `update tbl_lembretes set 
                        titulo = ?, 
                        descricao = ?, 
                        data_vencimento = ?, 
                        status = ?, 
                        fk_id_veiculo = ?
                    where id = ?`, [
            dados.titulo,
            dados.descricao,
            dados.data_vencimento,
            dados.status,
            dados.fk_id_veiculo,
            id
        ]
        );

        if (result[0].affectedRows > 0)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }

}

// Excluir um lembrete
const deleteReminder = async (id) => {

    try {
        

        let result = await conexaoKnex.raw(
            `delete from tbl_lembretes where id = ?`,
        [id]
        );

        if (result[0].affectedRows > 0)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
    
}

module.exports = {
    getAllReminders,
    getReminderById,
    insertReminder,
    updateReminder,
    deleteReminder
}
