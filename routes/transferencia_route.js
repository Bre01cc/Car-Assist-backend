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

/**
 * @swagger
 * /v1/car-assist/transferencia/gerar:
 *   post:
 *     summary: Gera um código de compartilhamento de veículo
 *     description: Permite que o proprietário gere um código temporário para compartilhar um veículo com outro usuário.
 *     tags:
 *       - Transferência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferenciaGerarRequest'
 *     responses:
 *       201:
 *         description: Código gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransferenciaGerarResponse'
 *       400:
 *         description: Dados inválidos ou ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_REQUIRED_FIELDS'
 *       404:
 *         description: Veículo ou usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_NOT_FOUND'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_INTERNAL_SERVER'
 */
// Rota para o Proprietário gerar o código de 6 dígitos
router.post('/v1/car-assist/transferencia/gerar', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dados = await controllerTransferencia.criarTokenTransferencia(dadosBody, contentType)

    response.status(dados.status_code).json(dados)
})

/**
 * @swagger
 * /v1/car-assist/transferencia/aceitar:
 *   post:
 *     summary: Aceita um compartilhamento de veículo
 *     description: Valida um código de compartilhamento e cria o vínculo entre o usuário e o veículo com o papel concedido.
 *     tags:
 *       - Transferência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferenciaAceitarRequest'
 *     responses:
 *       200:
 *         description: Compartilhamento aceito com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransferenciaAceitarResponse'
 *       400:
 *         description: Código inválido, expirado ou dados incorretos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_REQUIRED_FIELDS'
 *       404:
 *         description: Código de transferência não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_NOT_FOUND'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_INTERNAL_SERVER'
 */

// Rota para qualquer usuário colocar o código e aceitar o vínculo (Proprietário, Editor ou Visualizador)
router.post('/v1/car-assist/transferencia/aceitar', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dados = await controllerTransferencia.aceitarTransferenciaVeiculo(dadosBody, contentType)

    response.status(dados.status_code).json(dados)
})

module.exports = router