/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL da evidencia
 * Data: 08/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const evidenciaDAO = require('../../model/DAO/evidencia.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')

//Retorna um evidencia pelo id
const buscarEvidenciaId = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultUsuario = await evidenciaDAO.getEvidenceById(id)


            if (resultUsuario) {

                if (resultUsuario.length > 0) {

                    MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                    MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                    MENSSAGENS.DEFAULT_HEADER.data.usuario = resultUsuario

                    return MENSSAGENS.DEFAULT_HEADER


                } else {
                    return MENSSAGENS.ERROR_NOT_FOUND//404
                }

            } else {
                return MENSSAGENS.ERROR_NOT_FOUND
            }
        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MENSSAGENS.ERROR_REQUIRED_FIELDS//400
        }

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL
    }

}

const formatarEvidencia = async ()=>{
    
}

module.exports ={

}