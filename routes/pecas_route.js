/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente a peças
 * Data: 12/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerPeca = require('../controller/pecas/pecas_controller.js')

//Insere peça
router.post('/v1/car-assist/peca', cors(), bodyParserJSON, async function (request, response) {

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let peca = await controllerPeca.inserirPeca(dadosBody, contentType)

    response.status(peca.status_code).json(peca)
})

//Atualiza peça
router.put('/v1/car-assist/peca/:id', cors(), bodyParserJSON, async function (request, response) {

    let dadosBody = request.body

    let idPeca = request.params.id

    let contentType = request.headers['content-type']

    let peca = await controllerPeca.atualizarPeca(dadosBody, idPeca, contentType)

    response.status(peca.status_code).json(peca)
})

//Deleta peça
router.delete('/v1/car-assist/peca/:id', cors(), async function (req, res) {

    let idPeca = req.params.id

    let peca = await controllerPeca.deletarPeca(idPeca)

    res.status(peca.status_code)

    res.json(peca)
})

//Busca peça pelo ID
router.get('/v1/car-assist/peca/:id', cors(), async function (req, res) {

    let idPeca = req.params.id

    let peca = await controllerPeca.buscarPecaId(idPeca)

    res.status(peca.status_code)

    res.json(peca)
})

//Busca peças pelo ID da manutenção
router.get('/v1/car-assist/peca/manutencao/:id', cors(), async function (req, res) {

    let idManutencao = req.params.id

    let pecas = await controllerPeca.buscarPecaIdMaintenance(idManutencao)

    res.status(pecas.status_code)

    res.json(pecas)
})

//Lista todas as peças
router.get('/v1/car-assist/peca', cors(), async function (req, res) {

    let pecas = await controllerPeca.listarPecas()

    res.status(pecas.status_code)

    res.json(pecas)
})

module.exports = router