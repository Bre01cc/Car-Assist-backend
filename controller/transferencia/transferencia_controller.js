/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de regras de negócio e dados de transferência entre o APP e a MODEL
 * Data: 27/05/2026
 * Autor: Guilherme Moreira de Souza
 * Versão: 1.0
 ***********************************************************************************************************************/

const transferenciaDAO = require('../../model/DAO/transferencia.js');
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');
const crypto = require('crypto');
const veiculoDAO = require('../../model/DAO/veiculo.js');
const usuarioVeiculoDAO = require('../../model/DAO/usuario_veiculo.js');

const generateToken = () => {

    try {
        const token = crypto.randomBytes(6).toString('hex');

        return { token };

    } catch (error) {

        return false;
    }

};

const criarTokenTransferencia = async (dados, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {

            let erroCampos = await validarDadosToken(dados);

            if (erroCampos)

                return erroCampos;

            let codigoGerado = generateToken()
            dados.codigo_verificacao = codigoGerado.token;

            let resultToken = await transferenciaDAO.insertTokenTransferencia(dados);

            if (resultToken) {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_CREATED_ITEM,
                    {
                        fk_id_veiculo: dados.fk_id_veiculo,
                        codigo_verificacao: codigoGerado.token,
                        papel_concedido: dados.papel_concedido,
                        expira_em_minutos: 5
                    },
                    'Guilherme Moreira de Souza'
                );

            } else {

                return DEFAULT_MESSAGES.criarResposta(MESSAGES.ERROR_INTERNAL_SERVER, null, 'Guilherme Moreira de Souza');
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

            if (!solicitacao.codigo_verificacao || String(solicitacao.codigo_verificacao).length > 12) {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Código de verificação inválido]';

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_REQUIRED_FIELDS,
                    null,
                    'Guilherme Moreira de Souza'
                );
            }
            
            if (!solicitacao.id_usuario_destino || isNaN(solicitacao.id_usuario_destino)) {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Usuário destino não identificado]';

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_REQUIRED_FIELDS,
                    null,
                    'Guilherme Moreira de Souza'
                );
            }

            let tokenInfo = await transferenciaDAO.getTokenValido(solicitacao.codigo_verificacao);

            if (tokenInfo) {

                if (tokenInfo.fk_id_usuario_origem === Number(solicitacao.id_usuario_destino)) {

                    MESSAGES.ERROR_EXISTING.message = 'Você já possui vínculo ativo com este veículo.';

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_EXISTING,
                        null,
                        'Guilherme Moreira de Souza'
                    );
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
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_INTERNAL_SERVER,
                        null,
                        'Guilherme Moreira de Souza'
                    );
                }

            } else {
                
                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND,
                    null,
                    'Guilherme Moreira de Souza'
                );
            }

        } else {
            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE,
                null,
                'Guilherme Moreira de Souza'
            );
        }
    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Guilherme Moreira de Souza'
        );
    }
}

const validarDadosToken = async (dados) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));


    if (!dados.fk_id_veiculo || isNaN(dados.fk_id_veiculo)) {


        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Veículo inválido para geração]';

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Guilherme Moreira de Souza'
        );
    }

    if (!dados.fk_id_usuario_origem || isNaN(dados.fk_id_usuario_origem)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Usuário de origem obrigatório]';

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Guilherme Moreira de Souza'
        );
    }
    let resultUsuario = await usuarioVeiculoDAO.getUserVehicleByIDs(dados.fk_id_usuario_origem, dados.fk_id_veiculo);
    
    if (!resultUsuario) {

        MESSAGES.ERROR_NOT_FOUND.message += '[Vículo não existente]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_NOT_FOUND,
            null,
            'Guilherme Moreira de Souza'
        )
    }
    if (!['Proprietário', 'Editor', 'Visualizador'].includes(dados.papel_concedido)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Papel de transferência incorreto]';

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Guilherme Moreira de Souza'
        );
    }

    return false;
}

module.exports = {
    criarTokenTransferencia,
    aceitarTransferenciaVeiculo
}