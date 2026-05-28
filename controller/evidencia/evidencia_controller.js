/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL da evidencia
 * Data: 08/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const evidenciaDAO = require('../../model/DAO/evidencia.js');

const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

//Import da controller que faz upload da foto
const UPLOAD = require('../upload/controller_upload_azure.js');

//Retorna todas as evidências
const listarEvidencia = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let resultEvidencia = await evidenciaDAO.getAllEvidences();


        if (resultEvidencia) {

            if (resultEvidencia.length > 0) {

                let evidenciasFormatadas = resultEvidencia.map(
                    evidencia => formatarEvidencia(evidencia)
                );

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { evidencias: evidenciasFormatadas }
                )


            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )//404
            }

        } else {
            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_NOT_FOUND
            )//404
        }


    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL
        )
    }

}

//Retorna um evidencia pelo id
const buscarEvidenciaId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {

            let resultEvidencia = await evidenciaDAO.getEvidenceById(id);


            if (resultEvidencia) {

                if (resultEvidencia.length > 0) {

                    let evidenciaFormatada = formatarEvidencia(resultEvidencia[0]);

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { evidencia: evidenciaFormatada }
                    )


                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )//404
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )//404
            }
        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL
        )
    }

}

//Retorna um evidencia pelo id da manutenção
const buscarEvidenciaIdMaintenance = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {

            let resultEvidencia = await evidenciaDAO.getEvidenceByIdMaintenance(id);


            if (resultEvidencia) {

                if (resultEvidencia.length > 0) {

                    let evidenciaFormatada = resultEvidencia.map(
                        evidencia => formatarEvidencia(evidencia)
                    );

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { evidencia: evidenciaFormatada }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )//404
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )//404
            }
        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL
        )
    }

}

// Cadastra uma evidência no banco de dados
const inserirEvidencia = async (evidencia, contentType, foto) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (String(contentType).toUpperCase().includes('MULTIPART/FORM-DATA')) {


            // Validação dos dados da evidência
            let validar = validarEvidencia(evidencia);


            if (!validar) {

                let urlFoto = await UPLOAD.uploadFiles(foto);

                if (urlFoto) {
                    evidencia.url = urlFoto
                    let resultEvidencia = await evidenciaDAO.postEvidence(evidencia);

                    if (resultEvidencia) {

                        let ultimoId = await evidenciaDAO.getSelectLastId();

                        if (ultimoId) {

                            let evidenciaFormatada = formatarEvidencia(ultimoId[0]);

                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.SUCCESS_CREATED_ITEM,
                                evidenciaFormatada
                            )

                        } else {
                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.ERROR_INTERNAL
                            )

                        }

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_INTERNAL_SERVER
                        )
                    }
                } else {
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_UPLOAD_IMAGE
                    )
                }

            } else {

                return validar
            }

        } else {

            MESSAGES.ERROR_CONTENT_TYPE.message += '[MULTIPART/FORM-DATA]'

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

// Atualiza uma evidência pelo id
const atualizarEvidencia = async (evidencia, id, contentType, foto) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        // Validação do content-type
        if (String(contentType).toUpperCase().includes('MULTIPART/FORM-DATA')) {

            // Chama a função para validar os dados da evidência
            let validar = validarEvidencia(evidencia);

            if (!validar) {

                // Verifica se o ID existe no banco
                let validarId = await buscarEvidenciaId(id);

                if (validarId.status_code == 200) {

                    // Adiciona o ID no objeto
                    evidencia.id = Number(id);

                    if (validarId.data.evidencia.url) {
                        let deleteImg = await UPLOAD.deleteUploadFiles(validarId.data.evidencia.url.split('/').pop())
                        if (!deleteImg) {

                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.ERROR_UPLOAD_IMAGE_DELETE,
                            )
                        }
                    }
                    let urlFoto = await UPLOAD.uploadFiles(foto);
                    if (urlFoto) {
                        evidencia.url = urlFoto
                        // Chama a DAO para atualizar
                        let resultEvidencia = await evidenciaDAO.putEvidence(evidencia);

                        if (resultEvidencia) {

                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.SUCCESS_UPDATE_ITEM,
                                { evidencia: evidencia }
                            )

                        } else {
                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.ERROR_INTERNAL_SERVER
                            )
                        }
                    }


                } else {

                    return validarId
                }

            } else {

                return validar
            }

        } else {

            MESSAGES.ERROR_CONTENT_TYPE.message += '[MULTIPART/FORM-DATA]'

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

//Desativa um usuário pelo id
const deletarEvidenciaId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let validarId = await buscarEvidenciaId(id);

        if (validarId.status_code == 200) {

            let deletarEvidencia = await evidenciaDAO.deleteEvidence(id);

            if (deletarEvidencia) {

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

//Desativa um usuário pelo id
const deletarEvidenciaIdManutencao = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let validarId = await buscarEvidenciaId(id);

        if (validarId.status_code == 200) {

            let deletarEvidencia = await evidenciaDAO.deleteEvidenceMaintenance(id);

            if (deletarEvidencia) {

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

//Formata objeto evidência
const formatarEvidencia = (evidencia) => {

    return {
        id: evidencia.id,
        url: evidencia.url
    }
}

//Validas os dados da evidência
const validarEvidencia = (evidencia) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    // Validação da FK manutenção
    if (
        evidencia.fk_id_manutencao <= 0 ||
        isNaN(evidencia.fk_id_manutencao) ||
        evidencia.fk_id_manutencao == undefined ||
        evidencia.fk_id_manutencao == null ||
        evidencia.fk_id_manutencao == ''
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id da manutenção incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS
        )

    } else {

        return false
    }
}

//Exports das funções 
module.exports = {
    buscarEvidenciaId,
    listarEvidencia,
    buscarEvidenciaIdMaintenance,
    deletarEvidenciaId,
    deletarEvidenciaIdManutencao,
    inserirEvidencia,
    atualizarEvidencia
}