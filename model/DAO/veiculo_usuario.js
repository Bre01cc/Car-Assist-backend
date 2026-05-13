/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a tabela relacional do veículo com usuário
 * Data: 09/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do knex
const conexaoKnex = require('../../knex/index.js');

// Inserir vínculo usuário-veículo
const postUserVehicles = async (usuarioVeiculo) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            INSERT INTO tbl_usuario_veiculo(
                fk_id_usuario,
                fk_id_veiculo,
                papel_usuario,
                data_vinculo,
                data_desvinculo,
                is_ativo
            )
            VALUES(
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
        `, [
            usuarioVeiculo.fk_id_usuario,
            usuarioVeiculo.fk_id_veiculo,
            usuarioVeiculo.papel_usuario,
            usuarioVeiculo.data_vinculo,
            usuarioVeiculo.data_desvinculo,
            usuarioVeiculo.is_ativo
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

// Atualizar vínculo usuário-veículo
const putUserVehicle = async (usuarioVeiculo) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            UPDATE tbl_usuario_veiculo
            SET
                papel_usuario = ?,
                data_vinculo = ?,
                data_desvinculo = ?,
                is_ativo = ?
            WHERE fk_id_usuario = ?
            AND fk_id_veiculo = ?
        `, [
            usuarioVeiculo.papel_usuario,
            usuarioVeiculo.data_vinculo,
            usuarioVeiculo.data_desvinculo,
            usuarioVeiculo.is_ativo,
            usuarioVeiculo.fk_id_usuario,
            usuarioVeiculo.fk_id_veiculo
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

const deleteUserVehicleById = async (id) => {
    try {
        let result = await conexaoKnex.conexao.raw('delete from tbl_usuario_veiculo id = ?', [id])

        if (result[0].affectedRows > 0) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    postUserVehicles,
    putUserVehicle,
    deleteUserVehicleById
}