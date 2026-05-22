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
            'select * from vw_manutencao where id = ?', [id]
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

//Busca manutenção pelo id do tipo manutenção
const getMaintenanceByIdType = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from vw_manutencao where id_tipo_manutencao = ?', [id]
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

//Busca manutenção pelo id do usuário
const getMaintenanceByIdUser = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from vw_manutencao where id_usuario = ?', [id]
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

//Busca manutenção pelo id do veículo
const getMaintenanceByIdVehicle = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from vw_manutencao where id_veiculo = ?', [id]
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

//Busca todos as manutenções
const getAllMaintenance = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from vw_manutencao order by id'
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
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
        console.log(error)
        return false
    }
}

//Desativa um usuário
const statusMaintenance = async (id, status) => {
    try {
        const result = await conexaoKnex.conexao.raw(`
            Update tbl_manutencao
            set is_ativo = ? where id = ?
            `, [
            status,
            id
        ])
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
                pecas,
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
                ?,
                ?
            )
        `, [
            manutencao.data_manutencao,
            manutencao.custo,
            manutencao.quilometragem,
            manutencao.oficina ?? null,
            manutencao.observacoes,
            manutencao.fk_id_tipo_manutencao,
            manutencao.pecas ?? null,
            manutencao.fk_id_usuario,
            manutencao.fk_id_veiculo
        ])


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

//Atualiza uma manutenção
const putManutencao = async (manutencao) => {
    try {

        const result = await conexaoKnex.conexao.raw(`
            UPDATE tbl_manutencao
            SET 
                data_manutencao = ?,
                custo = ?,
                quilometragem = ?,
                oficina = ?,
                observacoes = ?,
                is_ativo = ?,
                fk_id_tipo_manutencao = ?,
                pecas,
                fk_id_usuario = ?,
                fk_id_veiculo = ?
            WHERE id = ?
        `, [
            manutencao.data_manutencao,
            manutencao.custo,
            manutencao.quilometragem,
            manutencao.oficina ?? null,
            manutencao.observacoes,
            manutencao.fk_id_tipo_manutencao,
            manutencao.pecas ?? null,
            manutencao.fk_id_usuario,
            manutencao.fk_id_veiculo,
            manutencao.id
        ])

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

//Busca o último id de manutenção
const getSelectLastId = async () => {

    try {

        let result = await conexaoKnex.conexao
            .select('id')
            .from('tbl_manutencao')
            .orderBy('id', 'desc')
            .limit(1)

        if (result.length > 0) {

            return Number(result[0].id)

        } else {
            return false
        }

    } catch (error) {

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
    deleteMaintenance,
    statusMaintenance,
    postManutencao,
    putManutencao,
    getSelectLastId
}