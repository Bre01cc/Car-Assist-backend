/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao vínculo entre Usuário e Veículo
 * Data: 13/05/2026
 * Autor: Nikolas Fernandes Vieira
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

const getAllUserVehicles = async () => {
    try {
        let sql = 'select * from tbl_usuario_veiculo where is_ativo = true';
        let result = await conexaoKnex.conexao.raw(sql);

        if (result[0].length > 0)
            return result[0];
        else
            return false;
    } catch (error) {
        return false;
    }
}

const getUserVehicleByIDs = async (idUsuario, idVeiculo) => {
    try {
        let sql = `select * from tbl_usuario_veiculo 
                   where fk_id_usuario = ${idUsuario} and fk_id_veiculo = ${idVeiculo}`;
        let result = await conexaoKnex.conexao.raw(sql);

        if (result[0].length > 0)
            return result[0];
        else
            return false;
    } catch (error) {
        return false;
    }
}

const postUserVehicle = async (dados) => {
    try {
        let sql = `insert into tbl_usuario_veiculo (
                        fk_id_usuario, 
                        fk_id_veiculo, 
                        papel_usuario, 
                        data_vinculo
                    ) values (
                        ${dados.fk_id_usuario}, 
                        ${dados.fk_id_veiculo}, 
                        '${dados.papel_usuario}', 
                        '${dados.data_vinculo}'
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

const putUserVehicle = async (idUsuario, idVeiculo, dados) => {
    try {
        let sql = `update tbl_usuario_veiculo set 
                        papel_usuario = '${dados.papel_usuario}', 
                        data_vinculo = '${dados.data_vinculo}',
                        data_desvinculo = ${dados.data_desvinculo ? `'${dados.data_desvinculo}'` : 'NULL'},
                        is_ativo = ${dados.is_ativo}
                    where fk_id_usuario = ${idUsuario} and fk_id_veiculo = ${idVeiculo}`;

        let result = await conexaoKnex.conexao.raw(sql);

        if (result[0].affectedRows > 0)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}

const deleteUserVehicle = async (idUsuario, idVeiculo) => {
    try {
        // Desativação lógica seguindo o padrão dos outros módulos
        let sql = `update tbl_usuario_veiculo set 
                        is_ativo = false, 
                        data_desvinculo = current_date 
                   where fk_id_usuario = ${idUsuario} and fk_id_veiculo = ${idVeiculo}`;
        
        let result = await conexaoKnex.conexao.raw(sql);

        if (result[0].affectedRows > 0)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}

module.exports = {
    getAllUserVehicles,
    getUserVehicleByIDs,
    postUserVehicle,
    putUserVehicle,
    deleteUserVehicle
}