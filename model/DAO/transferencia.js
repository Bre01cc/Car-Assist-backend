/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas operações de dados no MySQL referente às Transferências de Veículos
 * Data: 27/05/2026
 * Autor: Guilherme Moreira de Souza
 * Versão: 1.0
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

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
        console.error("ERRO NO INSERT_TOKEN_TRANSFERENCIA:", error);
        return false;
    }
}

// Busca um token válido parametrizando o código recebido do usuário externo
const getTokenValido = async (codigo) => {
    try {
        let codigoString = String(codigo).trim();

        let sql = `select * from tbl_token_transferencia 
                   where codigo_verificacao = ? 
                     and is_usado = false 
                     and criado_em >= now() - interval 5 minute limit 1`;

        // Passando a variável no array de parâmetros para neutralizar SQL Injection
        let result = await conexaoKnex.conexao.raw(sql, [codigoString]);

        if (result && result[0] && result[0].length > 0) {
            return result[0][0];
        }
        
        return false;

    } catch (error) {
        console.error("ERRO NO GET_TOKEN_VALIDO:", error);
        return false;
    }
}

const executeTransferenciaPropriedade = async (idUsuarioDestino, tokenInfo) => {
    
    const transacaoBanco = await conexaoKnex.conexao.transaction();

    try {
        if (!tokenInfo || !tokenInfo.fk_id_veiculo || !tokenInfo.papel_concedido) {
            throw new Error('Dados do token inválidos para a transferência.');
        }

        if (tokenInfo.papel_concedido === 'Proprietário') {
            let sqlDesativarAntigos = `update tbl_usuario_veiculo 
                                       set is_ativo = false, 
                                           data_desvinculo = curdate() 
                                       where fk_id_veiculo = ? 
                                         and is_ativo = true`;
                                         
            await transacaoBanco.raw(sqlDesativarAntigos, [tokenInfo.fk_id_veiculo]);
        }

        let sqlInsertVinculo = `insert into tbl_usuario_veiculo (
                                    fk_id_usuario, 
                                    fk_id_veiculo, 
                                    papel_usuario, 
                                    data_vinculo, 
                                    is_ativo
                                ) values (?, ?, ?, curdate(), true)`;
                                
        await transacaoBanco.raw(sqlInsertVinculo, [
            idUsuarioDestino,
            tokenInfo.fk_id_veiculo,
            tokenInfo.papel_concedido
        ]);

        let sqlUpdateToken = `update tbl_token_transferencia 
                              set is_usado = true 
                              where id = ?`;
                              
        await transacaoBanco.raw(sqlUpdateToken, [tokenInfo.id]);

        await transacaoBanco.commit();
        return true;

    } catch (error) {
        console.error("ERRO NA TRANSAÇÃO DE TRANSFERÊNCIA:", error);
        await transacaoBanco.rollback();
        return false;
    }
}

module.exports = {
    insertTokenTransferencia,
    getTokenValido,
    executeTransferenciaPropriedade
}