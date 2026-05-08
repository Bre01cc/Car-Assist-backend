/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do tipo de categoria
 * Data: 06/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import da model 
const tipoCategoria = require('../../model/DAO/categoria_gasto.js')

//Import do arquivo de menssagens
const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')

//Retorna todas as categorias de gastos
const listarTipoCategoria = async () => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    
    try {

        let resultTipoCategoria = await tipoCategoria.getAllcategoryTypes()

        if (resultTipoCategoria) {
            if (resultTipoCategoria.length > 0) {
                MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                MENSSAGENS.DEFAULT_HEADER.data.tipo_categoria = resultTipoCategoria

                return MENSSAGENS.DEFAULT_HEADER

            }

        } else {
            return MENSSAGENS.ERROR_INTERNAL_SERVER
        }

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL_SERVER
    }
}

//Retorna uma categoria de gastos
const buscarCategoriaId = async (id) => {

     let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultTipoCategoria = await tipoCategoria.getCategoryTypeById(id)
            console.log(resultTipoCategoria)

            if(resultTipoCategoria){

                MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                MENSSAGENS.DEFAULT_HEADER.data.tipo_categoria = resultTipoCategoria

                return MENSSAGENS.DEFAULT_HEADER

            }else{
                return MENSSAGENS.ERROR_INTERNAL_SERVER
            }

        }else{
            MENSSAGENS.ERROR_REQUIRED_FIELDS + "[ID incorreto]"
            return MENSSAGENS.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {
         return MENSSAGENS.ERROR_INTERNAL_SERVER
    }

}

//Exports da funções da controller
module.exports = {
    listarTipoCategoria,
    buscarCategoriaId
}