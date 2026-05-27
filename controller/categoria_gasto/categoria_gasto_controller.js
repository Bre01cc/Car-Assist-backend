/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL do tipo de categoria
 * Data: 06/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import da model 
const tipoCategoria = require('../../model/DAO/categoria_gasto.js');

//Import do arquivo de MESSAGES
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

//Retorna todas as categorias de gastos
const listarCategoriaGasto = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let resultTipoCategoria = await tipoCategoria.getAllcategoryTypes();

        if (resultTipoCategoria) {

            if (resultTipoCategoria.length > 0) {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { tipo_categoria: resultTipoCategoria }
                )

            }

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_INTERNAL_SERVER
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }
}

//Retorna uma categoria de gastos
const buscarCategoriaGastoId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (!isNaN(id) && id != null && id > 0) {

            let resultTipoCategoria = await tipoCategoria.getCategoryTypeById(id);

            if (resultTipoCategoria) {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { tipo_categoria: resultTipoCategoria[0] }
                )

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_INTERNAL_SERVER
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS + "[ID incorreto]"
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

//Exports da funções da controller
module.exports = {
    listarCategoriaGasto,
    buscarCategoriaGastoId
}