/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL da peça
 * Data: 08/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const pecasDAO = require('../../model/DAO/pecas.js');

const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

//Retorna todas as peças
const listarPecas = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let resultPecas = await pecasDAO.getAllParts();

        if (resultPecas) {

            if (resultPecas.length > 0) {

                let pecasFormatadas = resultPecas.map(
                    peca => formatarPeca(peca)
                );

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { pecas: pecasFormatadas }
                );

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_NOT_FOUND
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}

//Retorna peça pelo ID
const buscarPecaId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (!isNaN(id) && id != null && id > 0) {

            let resultPeca = await pecasDAO.getPartsById(id);

            if (resultPeca) {

                if (resultPeca.length > 0) {

                    let pecaFormatada = formatarPeca(resultPeca[0]);

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { peca: pecaFormatada }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}

//Retorna peças pelo ID da manutenção
const buscarPecaIdMaintenance = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (!isNaN(id) && id != null && id > 0) {

            let resultPecas = await pecasDAO.getPartsByMaintenance(id);

            if (resultPecas) {

                if (resultPecas.length > 0) {

                    let pecasFormatadas = resultPecas.map(
                        peca => formatarPeca(peca)
                    );

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { pecas: pecasFormatadas }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}

//Cadastra peça
const inserirPeca = async (peca, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarPeca(peca);

            if (!validar) {

                let resultPeca = await pecasDAO.postParts(peca);

                if (resultPeca) {

                    let ultimoId = await pecasDAO.getSelectLastId();

                    if (ultimoId) {

                        let pecaFormatada = formatarPeca(ultimoId[0]);

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_CREATED_ITEM,
                            pecaFormatada
                        )

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_INTERNAL_SERVER
                        )
                    }

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_INTERNAL_SERVER
                    )
                }

            } else {

                return validar
            }

        } else {
            
            MESSAGES.ERROR_CONTENT_TYPE.message += '[APPLICATION/JSON]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}

//Atualiza peça
const atualizarPeca = async (peca, id, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarPeca(peca);

            if (!validar) {

                let validarId = await buscarPecaId(id);

                if (validarId.status_code == 200) {

                    peca.id = Number(id)

                    let resultPeca = await pecasDAO.putParts(peca);

                    if (resultPeca) {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_UPDATE_ITEM,
                            { peca: peca }
                        )

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_INTERNAL_SERVER
                        )
                    }

                } else {

                    return validarId
                }

            } else {

                return validar
            }

        } else {

            MESSAGES.ERROR_CONTENT_TYPE.message += '[APPLICATION/JSON]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}

//Deleta peça
const deletarPeca = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let validarId = await buscarPecaId(id);

        if (validarId.status_code == 200) {

            let deletarPeca = await pecasDAO.deleteParts(id);

            if (deletarPeca) {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_DELETE
                )

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_INTERNAL_SERVER
                )
            }

        } else {

            return validarId
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}

//Formata objeto peça
const formatarPeca = (peca) => {

    return {
        id: peca.id,
        nome: peca.nome
    }
}

//Valida peça
const validarPeca = async (peca) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    //Validação nome
    if (
        peca.nome == undefined ||
        peca.nome == null ||
        peca.nome == '' ||
        peca.nome.length > 200
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome da peça inválido]'

        return MESSAGES.ERROR_REQUIRED_FIELDS

    }

    //Validação FK manutenção
    else if (
        peca.fk_id_manutencao == undefined ||
        peca.fk_id_manutencao == null ||
        peca.fk_id_manutencao == '' ||
        isNaN(peca.fk_id_manutencao) ||
        peca.fk_id_manutencao <= 0
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id da manutenção incorreto]'

        return MESSAGES.ERROR_REQUIRED_FIELDS

    }

    else {

        return false
    }
}

module.exports = {
    buscarPecaId,
    listarPecas,
    inserirPeca,
    atualizarPeca,
    deletarPeca,
    buscarPecaIdMaintenance
}