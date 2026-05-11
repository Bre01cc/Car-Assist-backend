/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do gasto
 * Data: 11/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const gastoDAO = require('../../model/DAO/gastos.js')
const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')

const listarGastos = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let resultGasto = await gastoDAO.getAllExpenses()
        if (resultGasto) {
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.SUCCESS_REQUEST, { gastos: resultGasto })
        } else {
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_NOT_FOUND)
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_INTERNAL)
    }
}

const buscarGastoId = async (id) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        if (!isNaN(id) && id != null && id > 0) {
            let resultGasto = await gastoDAO.getExpenseById(id)
            if (resultGasto) {
                return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.SUCCESS_REQUEST, { gasto: resultGasto })
            } else {
                return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_NOT_FOUND)
            }
        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_REQUIRED_FIELDS)
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_INTERNAL_SERVER)
    }
}

const inserirGasto = async (gasto, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = validarGasto(gasto)
            if (!validar) {
                let resultGasto = await gastoDAO.postExpense(gasto)
                if (resultGasto) {
                    let ultimoId = await gastoDAO.getSelectLastId()
                    if (ultimoId) {
                        gasto.id = ultimoId.id
                        return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.SUCCESS_CREATED_ITEM, gasto)
                    }
                }
                return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_INTERNAL)
            } else {
                return validar
            }
        } else {
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_CONTENT_TYPE)
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_INTERNAL_SERVER)
    }
}

const atualizarGasto = async (gasto, id, contentType) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarGasto(gasto)
            if (!validar) {
                let validarId = await buscarGastoId(id)
                if (validarId.status_code == 200) {
                    gasto.id = Number(id)
                    let resultGasto = await gastoDAO.putExpense(id, gasto)
                    if (resultGasto) {
                        return DEFAULT_MENSAGENS.criarResposta(MENSSAGES.SUCCESS_UPDATE_ITEM, { gasto: gasto })
                    }
                    return DEFAULT_MENSAGENS.criarResposta(MENSSAGES.ERROR_INTERNAL)
                } else {
                    return validarId
                }
            } else {
                return validar
            }
        } else {
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGES.ERROR_CONTENT_TYPE)
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGES.ERROR_INTERNAL_SERVER)
    }
}

const deletarGastoId = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let validarId = await buscarGastoId(id)
        if (validarId.status_code == 200) {
            let deletarGasto = await gastoDAO.deleteExpense(id)
            if (deletarGasto) {
                return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.SUCCESS_DELETE)
            }
            return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_INTERNAL_SERVER)
        } else {
            return validarId
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_INTERNAL_SERVER)
    }
}

const validarGasto = (gasto) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    if (!gasto.data_gasto || gasto.data_gasto.length != 10) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data incorreta]'
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGES.ERROR_REQUIRED_FIELDS)
    } else if (!gasto.valor || isNaN(gasto.valor)) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Valor incorreto]'
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGES.ERROR_REQUIRED_FIELDS)
    } else if (!gasto.fk_id_veiculo || isNaN(gasto.fk_id_veiculo)) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Veículo incorreto]'
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGES.ERROR_REQUIRED_FIELDS)
    } else if (!gasto.fk_id_categoria || isNaN(gasto.fk_id_categoria)) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Categoria incorreta]'
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGES.ERROR_REQUIRED_FIELDS)
    }
    return false
}

module.exports = {
    listarGastos,
    buscarGastoId,
    inserirGasto,
    atualizarGasto,
    deletarGastoId
}