/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao vínculo entre Usuário e Veículo
 * Data: 13/05/2026
 * Autor: Nikolas Fernandes Vieira
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

const getAllUserVehicles = async () => {

    try {

        let result = await conexaoKnex.conexao.raw('select * from vw_usuario_veiculo where is_ativo = true');

        if (result[0].length > 0) {

            return result[0]
        }

        else {

            return false
        }

    } catch (error) {

        return false;
    }

}

const getUserVehicleByIDs = async (idUsuario, idVeiculo) => {

    try {

        let result = await conexaoKnex.conexao.raw(
            'select * from tbl_usuario_veiculo where fk_id_usuario = ? and fk_id_veiculo = ?',
            [idUsuario, idVeiculo]
        );

        if (result[0].length > 0) {

            return result[0]
        }

        else {

            return false
        }

    } catch (error) {

        return false;
    }
}

const getUserVehicleByIDUser = async (id) => {

    try {

        let result = await conexaoKnex.conexao.raw(
            'select * from vw_usuario_veiculo where id_usuario = ?',
             [id]
            );

        if (result[0].length > 0) {

            return result[0]

        } else {

            return false
        }

    } catch (error) {

        return false
    }

}

const getSelectLastId = async () => {

    try {

        let result = await conexaoKnex.conexao.raw(
            'select * from tbl_usuario_veiculo order by id desc limit 1'
        );

        if (result[0].length > 0) {

            return result[0]

        } else {

            return false
        }

    } catch (error) {

        return false
    }

}

const getSelectLastIdUser = async (id) => {

    try {

        let result = await conexaoKnex.conexao.raw(
            'select * from vw_usuario_veiculo where id_usuario = ? order by data_vinculo desc limit 1',
             [id]
        );

        if (result[0].length > 0) {

            return result[0]

        } else {

            return false
        }

    } catch (error) {

        return false
    }
}

const postUserVehicle = async (dados) => {

    try {

        let result = await conexaoKnex.conexao.raw(`
            insert into tbl_usuario_veiculo (
                        fk_id_usuario, 
                        fk_id_veiculo, 
                        papel_usuario, 
                        data_vinculo
                    ) values (
                    ?,
                    ?,
                    ?,
                    ? 
                    )
            `, [
            dados.fk_id_usuario,
            dados.fk_id_veiculo,
            dados.papel_usuario,
            dados.data_vinculo
        ]);

        if (result[0].affectedRows > 0) {

            return true;
        }

        else {
            return false
        }

    } catch (error) {

        return false;
    }
}

const putUserVehicle = async (usuarioVeiculo) => {

    try {

        let result = await conexaoKnex.conexao.raw(`
            
            UPDATE tbl_usuario_veiculo
            SET
                papel_usuario = ?,
                data_vinculo = ?,
                data_desvinculo = ?,
                is_ativo = ?
            WHERE
                fk_id_usuario = ?
            AND
                fk_id_veiculo = ?`,
            [
                usuarioVeiculo.papel_usuario,
                usuarioVeiculo.data_vinculo ?? new Date().toISOString().split('T')[0],
                usuarioVeiculo.data_desvinculo ?? null,
                usuarioVeiculo.is_ativo ?? true,
                usuarioVeiculo.fk_id_usuario,
                usuarioVeiculo.fk_id_veiculo
            ])

        if (result[0].affectedRows > 0) {

            return true

        } else {

            return false
        }

    } catch (error) {

        return false
    }

}

const deleteUserVehicle = async (idUsuario, idVeiculo) => {

    try {

        let result = await conexaoKnex.conexao.raw(`
            update tbl_usuario_veiculo set 
                        is_ativo = false, 
                        data_desvinculo = current_date 
                   where fk_id_usuario = ? and fk_id_veiculo = ?
            `,
            [idUsuario,idVeiculo]
        );

        if (result[0].affectedRows > 0){

            return true
        }

        else{

            return false
        }

    } catch (error) {
   
        return false;
    }

}

module.exports = {
    getAllUserVehicles,
    getUserVehicleByIDs,
    postUserVehicle,
    putUserVehicle,
    deleteUserVehicle,
    getUserVehicleByIDUser,
    getSelectLastIdUser
}