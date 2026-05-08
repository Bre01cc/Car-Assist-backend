/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao tipo do seviço
 * Data: 08/05/2026
 * Autor: Nikolas Fernandes Vieira
 * Versão: 1.1
 ***********************************************************************************************************************/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerTipoServico = require('../controller/tipo_servico_controller.js')

router.get('/v1/car-assist/tipo-servico', cors(), async function (request, response) {

    let dados = await controllerTipoServico.listarTodosTiposServicos()

    response.status(dados.status_code).json(dados)
})

/**
 * @swagger
 * /v1/car-assist/tipo-servico/{id}:
 *   get:
 *     summary: Retorna um Tipo de serviço pelo ID
 *     description: Obtém os dados de um Tipo de serviço específico com base no ID informado.
 *     tags:
 *       - Tipo serviço
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Tipo do serviço
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de serviço encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoServicoResponse'
 *       404:
 *         description: Tipo de serviço não encontrado
 *         content:
 *           application/json:
 *              schema:
 *                   $ref: '#/components/ResponseApi/ERROR_NOT_FOUND'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_INTERNAL_SERVER'
 *         
 */

module.exports = router