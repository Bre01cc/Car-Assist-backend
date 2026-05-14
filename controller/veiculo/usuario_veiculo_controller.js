/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL de Usuário-Veículo
 * Data: 13/05/2026
 * Autores: Nikolas Fernandes
 * Versão: 1.1
 ***********************************************************************************************************************/

const usuarioVeiculoDAO = require('../../model/DAO/usuario_veiculo.js')
const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')

// Retorna todos os vínculos
const listarVinculos = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let result = await usuarioVeiculoDAO.getAllUserVehicles()
        if (result) {
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.SUCCESS_REQUEST, { vinculos: result }, 'Nikolas Fernandes')
        } else {
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_NOT_FOUND, null, 'Nikolas Fernandes')
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_INTERNAL, null, 'Nikolas Fernandes')
    }
}

// Insere um novo vínculo (Proprietário/Editor/Visualizador)
const inserirVinculo = async (dados, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = validarVinculo(dados)
            if (!validar) {
                let result = await usuarioVeiculoDAO.postUserVehicle(dados)
                if (result) {
                    return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.SUCCESS_CREATED_ITEM, dados, 'Nikolas Fernandes')
                }
                return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_INTERNAL, null, 'Nikolas Fernandes')
            } else {
                return validar
            }
        } else {
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_CONTENT_TYPE, null, 'Nikolas Fernandes')
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_INTERNAL_SERVER, null, 'Nikolas Fernandes')
    }
}

// Deleta (Desativa) um vínculo pelo ID composto
const deletarVinculo = async (idUsuario, idVeiculo) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        if (!isNaN(idUsuario) && !isNaN(idVeiculo)) {
            let result = await usuarioVeiculoDAO.deleteUserVehicle(idUsuario, idVeiculo)
            if (result) {
                return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.SUCCESS_DELETE, null, 'Nikolas Fernandes')
            }
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_NOT_FOUND, null, 'Nikolas Fernandes')
        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[IDs incorretos]'
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_REQUIRED_FIELDS, null, 'Nikolas Fernandes')
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_INTERNAL_SERVER, null, 'Nikolas Fernandes')
    }
}

// Validação dos dados de vínculo
const validarVinculo = (dados) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    if (!dados.fk_id_usuario || isNaN(dados.fk_id_usuario)) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Usuário incorreto]'
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGES.ERROR_REQUIRED_FIELDS, null, 'Nikolas Fernandes')
    }
    else if (!dados.fk_id_veiculo || isNaN(dados.fk_id_veiculo)) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Veículo incorreto]'
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGES.ERROR_REQUIRED_FIELDS, null, 'Nikolas Fernandes')
    }
    else if (!dados.data_vinculo || dados.data_vinculo.length != 10) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de vínculo incorreta]'
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGES.ERROR_REQUIRED_FIELDS, null, 'Nikolas Fernandes')
    }
    else {
        return false
    }
}

module.exports = {
    listarVinculos,
    inserirVinculo,
    deletarVinculo
}