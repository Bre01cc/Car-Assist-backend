/***********************************************************************************************************************
* Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao endereço
* Data: 13/05/2026
* Autor: Breno Oliveira Assis Reis
* Versão: 1.0
***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

//Busca todos os endereços
const getAllAddresses = async () => {

    try {

        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_endereco'
        )

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

//Busca endereço pelo id
const getAddressById = async (id) => {

    try {

        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_endereco WHERE id = ?',
            [id]
        )

        if (result && result[0] && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

//Busca endereço pelo id do serviço
const getAddressByServiceId = async (idServico) => {

    try {

        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM vw_endereco WHERE id_servico = ?',
            [idServico]
        )
       
        if (result && result[0] && result[0].length > 0) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
    
}

//Busca o último id de endereço
const getSelectLastId = async () => {

    try {

        let result = await conexaoKnex.conexao
            .select('id')
            .from('vw_endereco')
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

//Insere um endereço
const postAddress = async (endereco) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            INSERT INTO tbl_enderecos(
                logradouro,
                cep,
                complemento,
                fk_id_servico
            )
            VALUES(
                ?,
                ?,
                ?,
                ?
            )
        `, [
            endereco.logradouro,
            endereco.cep,
            endereco.complemento,
            endereco.fk_id_servico
        ])

        if (result[0]) {
            return true
        } else {
            return false
        }

    } catch (error) {
       
        return false
    }

}

//Atualiza um endereço
const putAddress = async (endereco) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            UPDATE tbl_enderecos
            SET logradouro = ?,
                cep = ?,
                complemento = ?,
                fk_id_servico = ?
            WHERE id = ?
        `, [
            endereco.logradouro,
            endereco.cep,
            endereco.complemento,
            endereco.fk_id_servico,
            endereco.id
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

//Deleta um endereço
const deleteAddress = async (id) => {

    try {

        const result = await conexaoKnex.conexao.raw(`
            DELETE FROM tbl_enderecos
            WHERE id = ?
        `, [id])

        if (result[0].affectedRows > 0) {
            return true
        } else {
            return false
        }

    } catch (error) {
    
        return false
    }

}

//Export das funções
module.exports = {
    getAllAddresses,
    getAddressById,
    getAddressByServiceId,
    getSelectLastId,
    postAddress,
    putAddress,
    deleteAddress
}