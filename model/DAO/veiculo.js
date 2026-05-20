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

        let result = await conexaoKnex.conexao.raw(
            'SELECT * FROM tbl_veiculo ORDER BY id'
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
const getVeiculoByPlaca = async (placa) => {

    try {

        let result = await conexaoKnex.conexao.raw(
            'select * from tbl_veiculo where placa = ?',
             [placa]
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
//Busca um veículo pelo id
const getVehicleById = async (id) => {

    try {

        let result = await conexaoKnex.conexao.raw(
            'SELECT * FROM tbl_veiculo WHERE id = ?',
            [id]
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

//Busca veículo com o ultimo ID
const getSelectLastId = async () => {

    try {

        let result = await conexaoKnex.conexao(
            'tbl_veiculo')
            .select('id')
            .orderBy('id', 'desc')
            .limit(1);

        if (result.length > 0) {

            return result[0]

        } else {

            return false
        }


    } catch (error) {

        return false
    }
}
//Insere um veiculo
const setInsertVehicle = async function (veiculo) {

    try {

        let result = await conexaoKnex.conexao('tbl_veiculo').insert({
            placa: veiculo.placa,
            modelo: veiculo.modelo,
            marca: veiculo.marca,
            cor: veiculo.cor.toUpperCase(),
            ano: veiculo.ano
        });

        if (result) {

            return true
        }

        else {

            return false
        }

    } catch (error) {
       
        return false
    }

}

// Atualiza um veículo
const putVeiculo = async (veiculo) => {

    try {

        let result = await conexaoKnex.conexao.raw(`
            UPDATE tbl_veiculo
            SET placa = ?,
                modelo = ?,
                marca = ?,
                cor = ?,
                score = ?,
                ano = ?,
                foto_veiculo = ?,
                is_ativo = ?
            WHERE id = ?
        `, [
            veiculo.placa,
            veiculo.modelo,
            veiculo.marca,
            veiculo.cor,
            veiculo.score,
            veiculo.ano,
            veiculo.foto_veiculo,
            veiculo.is_ativo,
            veiculo.id
        ]);


        if (result[0].affectedRows) {

            return true

        } else {

            return false
        }

    } catch (error) {

        return false
    }

}

// Desativa um veículo
const deleteVeiculo = async (id) => {

    try {

        let result = await conexaoKnex.conexao.raw(`
            UPDATE tbl_veiculo
            SET is_ativo = ?
            WHERE id = ?
        `, [
            0,
            id
        ]);

        if (result[0].affectedRows) {

            return true
        
        } else {

            return false
        }

    } catch (error) {

        return false
    }
}


module.exports = {
    getAllVehicles,
    getVehicleById,
    getSelectLastId,
    setInsertVehicle,
    putVeiculo,
    deleteVeiculo,
    getVeiculoByPlaca
}