/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões que o projeto irá realizar, sempre no formato JSON(Mensages de erro e sucesso, etc)
 * Data: 06/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const { request } = require("express");
//Cria um objeto da classe Date para pegar a data atual
const data_atual = new Date()
/*****************************************************MENSAGENS DE PADRONIZADAS*****************************************/
//Mensagem de principal
const DEFAULT_HEADER = {
     meta: {
        development: 'Breno Oliveira Assis Reis',
        api_description: 'API da Car Assist',
        request_date: new Date().toISOString()
    },
    status: Boolean,
    status_code: Number,
    data: {}
}

/*****************************************************MENSAGENS DE ERRO*************************************************/

//Mensagem caso algo não for encontrado
const ERROR_NOT_FOUND = {
    status:false,
    status_code:404,
    message:'Não foram encontrados dados de retorno!!!'
}

//Mensagem caso ocorra erros internos na execução dos arquivos
const ERROR_INTERNAL_SERVER = {
    status:false,
    status_code:500,
    message:'Não foi possível devido a erros internos no servidor!!!'
}

//Mensagem para informar a falta de campos obrigatorios
const ERROR_REQUIRED_FIELDS = {
    status:false,
    status_code:400,
    message:'Não foi possível processar pois existem campos obrigatórios que devem ser encaminhados e atendidos conforme o desejado'
}

//Mensagem para informar que o tipo de passados na requisição não estão de acordo com o já pré-estabelecido.
const ERROR_CONTENT_TYPE  = {
    status:false,
    status_code:415,
    message:'Não foi possível processar a requisição o tipo de dados enviados no corpo deve ser JSON!!!'
}

const ERROR_RELATION_TABLE ={
    status:false,
    status_code:200,
    message:'A requisição foi bem sucedida na criação do item principal, porém houveram problemas na tabela relacionamento!!!'
}

/*****************************************************MENSAGENS DE SUCESSO**********************************************/
//Mensagem de sucesso da requisição
const SUCCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: "Requisição bem sucedida!!!"
}
//Mensagem de delete foi realizado com sucesso
const SUCCESS_DELETE = {
    status: true,
    status_code: 200,
    message: "Delete realizado com sucesso!!!"
}
//Mensagem de update foi realizado com sucesso
const SUCCESS_UPDATE_ITEM = {
    status: true,
    status_code: 200,
    message: "Item atualizado com sucesso!!!"
}

////Mensagem de item criado com sucesso
const SUCCESS_CREATED_ITEM ={
    status: true,
    status_code: 201,
    message: "Item criado com sucesso!!!"
}

//Exportes
module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER,
    ERROR_NOT_FOUND,
    ERROR_REQUIRED_FIELDS,
    ERROR_CONTENT_TYPE,
    SUCCESS_UPDATE_ITEM,
    SUCCESS_DELETE,
    ERROR_RELATION_TABLE
}