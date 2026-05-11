/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a manutenção
 * Data: 09/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do knex
const conexaoKnex = require('../../knex/index.js');

//Busca uma manutenção pelo id
const getMaintenanceById = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from tbl_manutencao where id = ?', [id]
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

//Busca manutenção pelo id do tipo manutenção
const getMaintenanceByIdType = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from tbl_manutencao where fk_id_tipo_manutencao = ?', [id]
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

//Busca manutenção pelo id do usuário
const getMaintenanceByIdUser = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from tbl_manutencao where fk_id_usuario = ?', [id]
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

//Busca manutenção pelo id do veículo
const getMaintenanceByIdVehicle = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from tbl_manutencao where fk_id_veiculo = ?', [id]
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

//Busca todos as manutenções
const getAllMaintenance = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from tbl_manutencao order by id'
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

const deleteMaintenance = async (id) => {
    try {
        const result = conexaoKnex.conexao.raw('delete * from tbl_manutencao where id = ?', [id])

        if (result[0].affectedRows > 0) {

            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

// Inserir uma manutenção
const postManutencao = async (manutencao) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            INSERT INTO tbl_manutencao(
                data_manutencao,
                custo,
                quilometragem,
                oficina,
                observacoes,
                fk_id_tipo_manutencao,
                fk_id_usuario,
                fk_id_veiculo
            )
            VALUES(
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
        `, [
            manutencao.data_manutencao,
            manutencao.custo,
            manutencao.quilometragem,
            manutencao.oficina,
            manutencao.observacoes,
            manutencao.fk_id_tipo_manutencao,
            manutencao.fk_id_usuario,
            manutencao.fk_id_veiculo
        ])

        if (result[0]) {
            return true
        } else {
            return false
        }

    } catch (error) {

        console.log(error)
        return false

    }

}


//Exports das funções
module.exports = {
    getAllMaintenance,
    getMaintenanceById,
    getMaintenanceByIdType,
    getMaintenanceByIdUser,
    getMaintenanceByIdVehicle,
    deleteMaintenance
}