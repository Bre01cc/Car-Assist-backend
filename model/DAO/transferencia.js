/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas operações de dados no MySQL referente às Transferências de Veículos
 * Data: 27/05/2026
 * Autor: Guilherme Moreira de Souza
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

const usuarioVeiculoDAO = require('./usuario_veiculo.js');

const insertTokenTransferencia = async (dados) => {
    try {
        let sql = `insert into tbl_token_transferencia (
                        codigo_verificacao, 
                        fk_id_veiculo, 
                        fk_id_usuario_origem, 
                        papel_concedido
                    ) values (?, ?, ?, ?)`;

        let result = await conexaoKnex.conexao.raw(sql, [
            dados.codigo_verificacao,
            dados.fk_id_veiculo,
            dados.fk_id_usuario_origem,
            dados.papel_concedido
        ]);

        if (result && result[0] && result[0].affectedRows > 0)
            return true;
        else
            return false;

    } catch (error) {
  
        return false;
    }
}


const getTokenValido = async (codigo) => {

    try {

        let codigoString = String(codigo).trim();

        let sql = `select * from tbl_token_transferencia 
                   where codigo_verificacao = ? 
                     and is_usado = false 
                     and criado_em >= now() - interval 5 minute limit 1`;

        let result = await conexaoKnex.conexao.raw(sql, [codigoString]);

        if (result && result[0] && result[0].length > 0) {
            return result[0][0];
        }else{
        return false;
        }



    } catch (error) {

        return false;
    }
}

const desativarAntigos = async (tokenInfo) => {
    try {

        let sqlDesativarAntigos = `update tbl_usuario_veiculo 
                                       set is_ativo = false, 
                                           data_desvinculo = curdate() 
                                       where fk_id_veiculo = ? 
                                         and is_ativo = true`;

        let result = await conexaoKnex.conexao.raw(sqlDesativarAntigos, [tokenInfo.fk_id_veiculo]);

        if (result[0].affectedRows > 0) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}
const executeTransferenciaPropriedade = async (idUsuarioDestino, tokenInfo) => {

    try {
        if (!tokenInfo || !tokenInfo.fk_id_veiculo || !tokenInfo.papel_concedido) {
            throw new Error('Dados do token inválidos para a transferência.');
        }

        if (tokenInfo.papel_concedido === 'Proprietário') {
            let resultDesativar = await desativarAntigos(tokenInfo)
            if (!resultDesativar) {
                return false
            }
        }
        tokenInfo.fk_id_usuario = idUsuarioDestino
        tokenInfo.papel_usuario = tokenInfo.papel_concedido
        delete tokenInfo.papel_concedido

        let resultUsuarioVeiculo = await usuarioVeiculoDAO.postUserVehicle(tokenInfo)

        if (resultUsuarioVeiculo) {

            let sqlUpdateToken = `update tbl_token_transferencia 
                              set is_usado = true 
                              where id = ?`;

            let resultUpdate = await conexaoKnex.conexao.raw(sqlUpdateToken, [tokenInfo.id]);

            if (resultUpdate[0].affectedRows > 0) {
                return true
            } else {
                return false
            }

        } else {
            return false
        }

    } catch (error) {
        
        return false;
    }
}

module.exports = {
    insertTokenTransferencia,
    getTokenValido,
    executeTransferenciaPropriedade
}