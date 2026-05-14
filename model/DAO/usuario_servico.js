/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a tabela relacional do servicos com usuário
 * Data: 09/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do knex
const conexaoKnex = require('../../knex/index.js');

const postUserService = async (usuarioServico) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            INSERT INTO tbl_usuario_servico(
                fk_id_usuario,
                fk_id_servicos,
                data_vinculo,
                data_desvinculo,
                is_ativo
            )
            VALUES(
                ?,
                ?,
                ?,
                ?,
                ?
            )
        `, [
            usuarioServico.fk_id_usuario,
            usuarioServico.fk_id_servico,
            usuarioServico.data_vinculo || new Date(),
            usuarioServico.data_desvinculo || null,
            usuarioServico.is_ativo ?? true
        ])

        return result

    } catch (error) {
        console.log(error)
        return false
    }
}

// Atualizar vínculo usuário-serviço
const putUserService = async (usuarioServico) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            UPDATE tbl_usuario_servico
            SET
                data_vinculo = ?,
                data_desvinculo = ?,
                is_ativo = ?
            WHERE fk_id_usuario = ?
            AND fk_id_servico = ?
        `, [
            usuarioServico.data_vinculo,
            usuarioServico.data_desvinculo,
            usuarioServico.is_ativo,
            usuarioServico.fk_id_usuario,
            usuarioServico.fk_id_servico
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

const getUserServiceById = async(id) =>{
    try {
        const result = await conexaoKnex.conexao.raw(
            'select * from tbl_usuario_servico where id = ?',[id]
        );
        if(result[0].length>0){
            return result[0]
        }else{
            return false
        }       
    } catch (error) {
        return false
    }
}


//Busca último ID cadastrado
const getSelectLastId = async () => {

    try {

        const result = await conexaoKnex.conexao.raw(
            'select * from tbl_usuario_veiculo order by id desc limit 1'
        )

        if (result[0].length > 0) {

            return result[0]

        } else {

            return false
        }

    } catch (error) {

        return false
    }
}

// Deletar vínculo usuário-serviço
const deleteUserServiceByIdUserAndService = async (fk_id_usuario, fk_id_servico) => {

    try {

        let result = await conexaoKnex.conexao.raw(`
            DELETE FROM tbl_usuario_servico
            WHERE fk_id_usuario = ?
            AND fk_id_servico = ?
        `, [
            fk_id_usuario,
            fk_id_servico
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

// Deletar vínculo usuário-serviço
const deleteUserServiceByIdUser = async (fk_id_usuario) => {

    try {

        let result = await conexaoKnex.conexao.raw(`
            DELETE FROM tbl_usuario_servico
            WHERE fk_id_usuario = ?
        `, [
            fk_id_usuario,
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

const deleteUserServiceById = async (id) => {

    try {

        let result = await conexaoKnex.conexao.raw(`
            DELETE FROM tbl_usuario_servico
            WHERE id = ?
        `, [
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


module.exports = {
    postUserService,
    deleteUserServiceById,
    deleteUserServiceByIdUser,
    deleteUserServiceByIdUserAndService
}