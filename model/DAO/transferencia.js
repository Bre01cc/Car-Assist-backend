/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas operações de dados no MySQL referente às Transferências de Veículos
 * Data: 27/05/2026
 * Autor: Guilherme Moreira de Souza
 * Versão: 1.1
 ***********************************************************************************************************************/

const conexaoKnex = require('../../knex/index.js');

const insertTokenTransferencia = async (dados) => {
    try {
        let sql = `insert into tbl_token_transferencia (
                        codigo_verificacao, 
                        fk_id_veiculo, 
                        fk_id_usuario_origem, 
                        papel_concedido
                    ) values (
                        '${dados.codigo_verificacao}', 
                        ${dados.fk_id_veiculo}, 
                        ${dados.fk_id_usuario_origem}, 
                        '${dados.papel_concedido}'
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


const getTokenValido = async (codigo, idVeiculo) => {
    try {
        let sql = `select * from tbl_token_transferencia 
                   where codigo_verificacao = '${codigo}' 
                     and fk_id_veiculo = ${idVeiculo} 
                     and is_usado = false 
                     and criado_em >= now() - interval 5 minute`;

        let result = await conexaoKnex.conexao.raw(sql);

        if (result[0].length > 0)
            return result[0];
        else
            return false;

    } catch (error) {
        return false;
    }
}

const executeTransferenciaPropriedade = async (idUsuarioDestino, tokenInfo) => {
    
    const transacaoBanco = await conexaoKnex.conexao.transaction();

    try {
        if (tokenInfo.papel_concedido === 'Proprietário') {
            let sqlDesativarAntigos = `update tbl_usuario_veiculo 
                                       set is_ativo = false, 
                                           data_desvinculo = curdate() 
                                       where fk_id_veiculo = ${tokenInfo.fk_id_veiculo} 
                                         and is_ativo = true`;
                                         
            await transacaoBanco.raw(sqlDesativarAntigos);
        }

        let sqlInsertVinculo = `insert into tbl_usuario_veiculo (
                                    fk_id_usuario, 
                                    fk_id_veiculo, 
                                    papel_usuario, 
                                    data_vinculo, 
                                    is_ativo
                                ) values (
                                    ${idUsuarioDestino}, 
                                    ${tokenInfo.fk_id_veiculo}, 
                                    '${tokenInfo.papel_concedido}', 
                                    curdate(), 
                                    true
                                )`;
        await transacaoBanco.raw(sqlInsertVinculo);

        let sqlUpdateToken = `update tbl_token_transferencia 
                              set is_usado = true 
                              where id = ${tokenInfo.id}`;
        await transacaoBanco.raw(sqlUpdateToken);

        await transacaoBanco.commit();
        return true;

    } catch (error) {
        await transacaoBanco.rollback();
        return false;
    }
}

module.exports = {
    insertTokenTransferencia,
    getTokenValido,
    executeTransferenciaPropriedade
}