/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao veiculo
 * Data: 07/05/2026
 * Autor: guilherme Moreira de Souza
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do knex
const conexaoKnex = require('../../knex/index.js');

//Busca todos os veículos
const getAllVehicles = async () => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM tbl_veiculo ORDER BY id'
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0];
        }

        return false;

    } catch (error) {
        console.error(error);
        return false;
    }
}

//Busca um veículo pelo id
const getVehicleById = async (id) => {
    try {
        const result = await conexaoKnex.conexao.raw(
            'SELECT * FROM tbl_veiculo WHERE id = ?',
            [id]
        );

        if (result && result[0] && result[0].length > 0) {
            return result[0];
        }

        return false;

    } catch (error) {
        console.error(error);
        return false;
    }
}

//Busca veiculo com o ultimo ID
const getSelectLastId = async function () {
    try {

        const result = await conexaoKnex.conexao('tbl_veiculo')
            .select('id')
            .orderBy('id', 'desc')
            .limit(1)

        return Number(result[0].id)

    } catch (error) {
        console.log(error)
        return false
    }
}

//Insere um veiculo
const setInsertVehicle = async function (veiculo) {

    try {

        const result = await conexaoKnex.conexao('tbl_veiculo').insert({
            placa: veiculo.placa,
            modelo: veiculo.modelo,
            marca: veiculo.marca,
            cor: veiculo.cor.toUpperCase(),
            ano: veiculo.ano
        })

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}


module.exports = {
    getAllVehicles,
    getVehicleById,
    getSelectLastId,
    setInsertVehicle
}