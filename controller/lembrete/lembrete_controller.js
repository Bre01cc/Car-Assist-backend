/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL de Lembretes
 * Data: 11/05/2026
 * Autor: Nikolas Fernandes Vieira
 * Versão: 1.0
 ***********************************************************************************************************************/

const lembreteDAO = require('../../model/DAO/lembretes.js')
const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')

// Retorna todos os lembretes
const listarLembretes = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        let resultLembretes = await lembreteDAO.getAllReminders()

        if (resultLembretes) {
            if (resultLembretes.length > 0) {
                let lembretesFormatados = resultLembretes.map(lembrete => formatarLembrete(lembrete))

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_REQUEST,
                    { lembretes: lembretesFormatados },
                    'Nikolas Fernandes'
                )
            } else {
                return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_NOT_FOUND, null, 'Nikolas Fernandes')
            }
        } else {
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_NOT_FOUND, null, 'Nikolas Fernandes')
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_INTERNAL_SERVER, null, 'Nikolas Fernandes')
    }
}

// Retorna um lembrete pelo id
const buscarLembreteId = async (id) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {
            let resultLembrete = await lembreteDAO.getReminderById(id)

            if (resultLembrete) {
                if (resultLembrete.length > 0) {
                    let lembreteFormatado = formatarLembrete(resultLembrete[0])
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { lembrete: lembreteFormatado }
                    )
                } else {
                    return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_NOT_FOUND, null, 'Nikolas Fernandes')
                }
            } else {
                return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_NOT_FOUND, null, 'Nikolas Fernandes')
            }
        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_REQUIRED_FIELDS, null, 'Nikolas Fernandes')
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSSAGENS.ERROR_INTERNAL_SERVER, null, 'Nikolas Fernandes')
    }
}

// Cadastra um lembrete no banco de dados
const inserirLembrete = async (lembrete, contentType) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = validarLembrete(lembrete)

            if (!validar) {
                let resultLembrete = await lembreteDAO.insertReminder(lembrete)

                if (resultLembrete) {
                    // Nota: se você tiver a função getSelectLastId na DAO de lembretes, use-a aqui
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSAGENS.SUCCESS_CREATED_ITEM,
                        lembrete,
                        'Nikolas Fernandes'
                    )
                } else {
                    return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_INTERNAL, null, 'Nikolas Fernandes')
                }
            } else {
                return validar
            }
        } else {
            return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_CONTENT_TYPE, null, 'Nikolas Fernandes')
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_INTERNAL_SERVER, null, 'Nikolas Fernandes')
    }
}

// Atualiza um lembrete pelo id
const atualizarLembrete = async (lembrete, id, contentType) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarLembrete(lembrete)

            if (!validar) {
                let validarId = await buscarLembreteId(id)

                if (validarId.status_code == 200) {
                    lembrete.id = Number(id)
                    let resultLembrete = await lembreteDAO.updateReminder(id, lembrete)

                    if (resultLembrete) {
                        return DEFAULT_MENSAGENS.criarResposta(
                            MENSAGENS.SUCCESS_UPDATE_ITEM,
                            { lembrete: lembrete },
                            'Nikolas Fernandes'
                        )
                    } else {
                        return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_INTERNAL, null, 'Nikolas Fernandes')
                    }
                } else {
                    return validarId
                }
            } else {
                return validar
            }
        } else {
            return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_CONTENT_TYPE, null, 'Nikolas Fernandes')
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_INTERNAL_SERVER, null, 'Nikolas Fernandes')
    }
}

// Deleta um lembrete pelo id
const deletarLembreteId = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        let validarId = await buscarLembreteId(id)

        if (validarId.status_code == 200) {
            let deletarLembrete = await lembreteDAO.deleteReminder(id)

            if (deletarLembrete) {
                return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.SUCCESS_DELETE, null, 'Nikolas Fernandes')
            } else {
                return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_INTERNAL_SERVER, null, 'Nikolas Fernandes')
            }
        } else {
            return validarId
        }
    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_INTERNAL_SERVER, null, 'Nikolas Fernandes')
    }
}

// Validar os dados do lembrete
const validarLembrete = (lembrete) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    if (!lembrete.titulo || lembrete.titulo.length > 100) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Título incorreto]'
        return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_REQUIRED_FIELDS, null, 'Nikolas Fernandes')

    }
    else if (!lembrete.descricao || lembrete.descricao.length > 255) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Descrição incorreta]'
        return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_REQUIRED_FIELDS, null, 'Nikolas Fernandes')

    }
    else if (!lembrete.data_vencimento) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Data de vencimento incorreta]'
        return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_REQUIRED_FIELDS, null, 'Nikolas Fernandes')

    }
    else if (!['ativo', 'inativo', 'pendente'].includes(lembrete.status)) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Status incorreto]'
        return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_REQUIRED_FIELDS, null, 'Nikolas Fernandes')

    }
    else if (!lembrete.fk_id_veiculo || isNaN(lembrete.fk_id_veiculo)) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Veículo incorreto]'
        return DEFAULT_MENSAGENS.criarResposta(MENSAGENS.ERROR_REQUIRED_FIELDS, null, 'Nikolas Fernandes')

    } else {
        return false
    }


}

// Formatar a saída do lembrete
const formatarLembrete = (lembrete) => {
    return {
        id: lembrete.id,
        titulo: lembrete.titulo,
        descricao: lembrete.descricao,
        data_criacao: lembrete.data_criacao,
        data_vencimento: lembrete.data_vencimento,
        status: lembrete.status,
        veiculo: {
            id: lembrete.fk_id_veiculo
        }
    }
}

module.exports = {
    listarLembretes,
    buscarLembreteId,
    inserirLembrete,
    atualizarLembrete,
    deletarLembreteId
}