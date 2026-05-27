/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente às Transferências e Convites de Veículos
 * Data: 27/05/2026
 * Autor: Guilherme Moreira de Souza
 * Versão: 1.0
 ***********************************************************************************************************************/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()
const router = express.Router()

const controllerTransferencia = require('../controller/transferencia/transferencia_controller.js')

// Rota para o Proprietário gerar o código de 6 dígitos
router.post('/v1/car-assist/transferencia/gerar', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dados = await controllerTransferencia.criarTokenTransferencia(dadosBody, contentType)

    response.status(dados.status_code).json(dados)
})

// Rota para qualquer usuário colocar o código e aceitar o vínculo (Proprietário, Editor ou Visualizador)
router.post('/v1/car-assist/transferencia/aceitar', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dados = await controllerTransferencia.aceitarTransferenciaVeiculo(dadosBody, contentType)

    response.status(dados.status_code).json(dados)
})

module.exports = router