/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do gasto
 * Data: 11/05/2026
 * Autores: Nikolas Fernandes,Breno Oliveira
 * Versão: 1.0
 ***********************************************************************************************************************/

const gastoDAO = require('../../model/DAO/gastos.js');

const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

const listarGastos = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let resultGasto = await gastoDAO.getAllExpenses();

        if (resultGasto) {

            let gastoFormatado = resultGasto.map(
                gasto => formatarGasto(gasto)
            );

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.SUCCESS_REQUEST,
                { gastos: gastoFormatado },
                'Nikolas Fernandes'
            )

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_NOT_FOUND,
                null,
                'Nikolas Fernandes'
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Nikolas Fernandes'
        )
    }

}

const buscarGastoId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (!isNaN(id) && id != null && id > 0) {

            let resultGasto = await gastoDAO.getExpenseById(id);

            if (resultGasto) {

                let gastoFormato = formatarGasto(resultGasto[0]);

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { gasto: gastoFormato },
                    'Nikolas Fernandes')

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND,
                    null,
                    'Nikolas Fernandes'
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS,
                null,
                'Nikolas Fernandes')
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Nikolas Fernandes')
    }

}

const buscarGastoIdVeiculo = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (!isNaN(id) && id != null && id > 0) {

            let resultGasto = await gastoDAO.getExpenseByIdVehicle(id);

            if (resultGasto) {

                let gastoFormato = resultGasto.map(
                    gasto => formatarGasto(gasto)
                )

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { gasto: gastoFormato },
                    'Nikolas Fernandes'
                )

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND,
                    null,
                    'Nikolas Fernandes'
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS,
                null,
                'Nikolas Fernandes'
            )
        }
    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Nikolas Fernandes'
        )
    }

}

const buscarGastoIdTipo = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultGasto = await gastoDAO.getExpenseByIdType(id);

            if (resultGasto) {

                let gastoFormato = resultGasto.map(
                    gasto => formatarGasto(gasto)
                )

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { gasto: gastoFormato },
                    'Nikolas Fernandes'
                )

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND,
                    null,
                    'Nikolas Fernandes'
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS,
                null,
                'Nikolas Fernandes'
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Nikolas Fernandes'
        )
    }

}

const buscarGastoIdVeiculoComTipo = async (id_veiculo, id_tipo) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (
            !isNaN(id_veiculo)
            && id_veiculo != null
            && id_veiculo > 0
            && !isNaN(id_tipo)
            && id_tipo != null
            && id_tipo > 0
        ) {

            let resultGasto = await gastoDAO.getExpenseByIdVehicleAndType(id_veiculo, id_tipo);

            if (resultGasto) {
                
                let gastoFormato = resultGasto.map(
                    gasto => formatarGasto(gasto)
                )

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { gasto: gastoFormato },
                    'Nikolas Fernandes')

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND,
                    null,
                    'Nikolas Fernandes'
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS,
                null,
                'Nikolas Fernandes'
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Nikolas Fernandes'
        )
    }

}

const inserirGasto = async (gasto, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarGasto(gasto);

            if (!validar) {

                let resultGasto = await gastoDAO.postExpense(gasto);

                if (resultGasto) {

                    let ultimoId = await gastoDAO.getSelectLastId();

                    if (ultimoId) {

                        let gastoFormatado = formatarGasto(ultimoId[0]);

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_CREATED_ITEM,
                            gastoFormatado,
                            'Nikolas Fernandes'
                        )
                    }

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_INTERNAL_SERVER,
                        null,
                        'Nikolas Fernandes'
                    )
                }

            } else {

                return validar
            }

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE,
                null,
                'Nikolas Fernandes'
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Nikolas Fernandes'
        )
    }
}

const atualizarGasto = async (gasto, id, contentType) => {

    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarGasto(gasto);

            if (!validar) {

                let validarId = await buscarGastoId(id);

                if (validarId.status_code == 200) {

                    gasto.id = Number(id);

                    let resultGasto = await gastoDAO.putExpense(id, gasto);

                    let gastoNew = await buscarGastoId(id);

                    if (resultGasto) {

                        return DEFAULT_MESSAGES.criarResposta(
                            MENSSAGES.SUCCESS_UPDATE_ITEM,
                            { gasto: gastoNew.data.gasto },
                            'Nikolas Fernandes'
                        )

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MENSSAGES.ERROR_INTERNAL,
                            null,
                            'Nikolas Fernandes'
                        )
                    }

                } else {

                    return validarId
                }
            } else {

                return validar
            }

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MENSSAGES.ERROR_CONTENT_TYPE,
                null,
                'Nikolas Fernandes'
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MENSSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Nikolas Fernandes'
        )
    }
}

const deletarGastoId = async (id) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let validarId = await buscarGastoId(id);

        if (validarId.status_code == 200) {

            let deletarGasto = await gastoDAO.deleteExpense(id);

            if (deletarGasto) {

                return DEFAULT_MESSAGES.criarResposta(
                    MENSAGENS.SUCCESS_DELETE,
                    null,
                    'Nikolas Fernandes'
                )

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MENSAGENS.ERROR_INTERNAL_SERVER,
                    null,
                    'Nikolas Fernandes'
                )
            }

        } else {

            return validarId
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MENSAGENS.ERROR_INTERNAL_SERVER,
            null,
            'Nikolas Fernandes'
        )
    }
}

const validarGasto = (gasto) => {

    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (!gasto.data_gasto || gasto.data_gasto.length != 10) {

        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data incorreta]'

        return DEFAULT_MESSAGES.criarResposta(
            MENSSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Nikolas Fernandes'
        )

    } else if (!gasto.valor || isNaN(gasto.valor)) {

        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Valor incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MENSSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Nikolas Fernandes'
        )

    } else if (!gasto.fk_id_veiculo || isNaN(gasto.fk_id_veiculo)) {

        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Veículo incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MENSSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Nikolas Fernandes'
        )

    } else if (!gasto.fk_id_categoria || isNaN(gasto.fk_id_categoria)) {

        MENSSAGES.ERROR_REQUIRED_FIELDS.message += ' [Categoria incorreta]'

        return DEFAULT_MESSAGES.criarResposta(
            MENSSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Nikolas Fernandes'
        )

    } else {

        return false
    }

}

const formatarGasto = (gasto) => {

    return {
        id: gasto.id,
        data: gasto.data_gasto,
        valor: gasto.valor,
        is_ativo: gasto.is_ativo,
        id_veiculo: gasto.id_veiculo,
        tipo_gasto: {
            id: gasto.id_tipo_gasto,
            nome: gasto.nome_categoria
        }
    }
}

module.exports = {
    listarGastos,
    buscarGastoId,
    inserirGasto,
    atualizarGasto,
    deletarGastoId,
    buscarGastoIdTipo,
    buscarGastoIdVeiculo,
    buscarGastoIdVeiculoComTipo
}