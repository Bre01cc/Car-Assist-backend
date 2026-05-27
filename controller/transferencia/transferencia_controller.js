/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de regras de negócio e dados de transferência entre o APP e a MODEL
 * Data: 27/05/2026
 * Autor: Guilherme Moreira de Souza
 * Versão: 1.0
 ***********************************************************************************************************************/

const transferenciaDAO = require('../../model/DAO/transferencia.js');
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

const criarTokenTransferencia = async (dados, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
            
            let erroCampos = validarDadosToken(dados);
            if (erroCampos) return erroCampos;

            const codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();
            dados.codigo_verificacao = codigoGerado;

            let resultToken = await transferenciaDAO.insertTokenTransferencia(dados);

            if (resultToken) {
                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_CREATED_ITEM,
                    { 
                        fk_id_veiculo: dados.fk_id_veiculo,
                        codigo_verificacao: codigoGerado,
                        papel_concedido: dados.papel_concedido,
                        expira_em_minutos: 5
                    },
                    'Guilherme Moreira de Souza'
                );
            } else {
                return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_INTERNAL, null, 'Guilherme Moreira de Souza');
            }

        } else {
            return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_CONTENT_TYPE, null, 'Guilherme Moreira de Souza');
        }
    } catch (error) {
        return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_INTERNAL_SERVER, null, 'Guilherme Moreira de Souza');
    }
}

const aceitarTransferenciaVeiculo = async (solicitacao, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {

            if (!solicitacao.codigo_verificacao || solicitacao.codigo_verificacao.length !== 6 || isNaN(solicitacao.codigo_verificacao)) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Código de verificação inválido]';
                return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_REQUIRED_FIELDS, null, 'Guilherme Moreira de Souza');
            }
            if (!solicitacao.fk_id_veiculo || isNaN(solicitacao.fk_id_veiculo)) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID do veículo inválido ou não informado]';
                return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_REQUIRED_FIELDS, null, 'Guilherme Moreira de Souza');
            }
            if (!solicitacao.id_usuario_destino || isNaN(solicitacao.id_usuario_destino)) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Usuário destino não identificado]';
                return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_REQUIRED_FIELDS, null, 'Guilherme Moreira de Souza');
            }

            let tokenEncontrado = await transferenciaDAO.getTokenValido(solicitacao.codigo_verificacao, solicitacao.fk_id_veiculo);

            if (tokenEncontrado && tokenEncontrado.length > 0) {
                let tokenInfo = tokenEncontrado[0];

                if (tokenInfo.fk_id_usuario_origem === Number(solicitacao.id_usuario_destino)) {
                    MESSAGES.ERROR_INTERNAL.message = 'O proprietário atual já possui vínculo ativo com este veículo.';
                    return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_INTERNAL, null, 'Guilherme Moreira de Souza');
                }

                let transferidoComSucesso = await transferenciaDAO.executeTransferenciaPropriedade(
                    solicitacao.id_usuario_destino, 
                    tokenInfo
                );

                if (transferidoComSucesso) {
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { 
                            mensagem: "Vínculo de veículo processado com sucesso!",
                            papel_atribuido: tokenInfo.papel_concedido
                        },
                        'Guilherme Moreira de Souza'
                    );
                } else {
                    return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_INTERNAL, null, 'Guilherme Moreira de Souza');
                }

            } else {
                return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_NOT_FOUND, null, 'Guilherme Moreira de Souza');
            }

        } else {
            return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_CONTENT_TYPE, null, 'Guilherme Moreira de Souza');
        }
    } catch (error) {
        return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_INTERNAL_SERVER, null, 'Guilherme Moreira de Souza');
    }
}

const validarDadosToken = (dados) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    if (!dados.fk_id_veiculo || isNaN(dados.fk_id_veiculo)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Veículo inválido para geração]';
        return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_REQUIRED_FIELDS, null, 'Guilherme Moreira de Souza');
    }
    else if (!dados.fk_id_usuario_origem || isNaN(dados.fk_id_usuario_origem)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Usuário de origem obrigatório]';
        return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_REQUIRED_FIELDS, null, 'Guilherme Moreira de Souza');
    }
    else if (!['Proprietário', 'Editor', 'Visualizador'].includes(dados.papel_concedido)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Papel de transferência incorreto]';
        return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_REQUIRED_FIELDS, null, 'Guilherme Moreira de Souza');
    }
    
    return false;
}

module.exports = {
    criarTokenTransferencia,
    aceitarTransferenciaVeiculo
}