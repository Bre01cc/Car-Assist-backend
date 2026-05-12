/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao gastos
 * Data: 05/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()
const router = express.Router()

/**
 * @swagger
 * /v1/car-assist/gasto/{id}:
 *   put:
 *     summary: Atualiza um Gasto pelo ID
 *     description: Atualiza um Gasto no sistema
 *     tags:
 *       - Gastos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Gasto
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/GastoRequest'
 *     responses:
 *       200:
 *         description: Gasto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_UPDATE_ITEM'
 *       400:
 *         description: Dados obrigatórios não informados ou inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_REQUIRED_FIELDS'
 *       500:
 *          description: Erro interno do servidor
 *          content:  
 *             application/json:
 *               schema:
 *                 $ref: '#/components/ResponseApi/ERROR_INTERNAL_SERVER'
 * 
 */

/**
 * @swagger
 * /v1/car-assist/gasto:
 *   post:
 *     summary: Cria um novo Gasto
 *     description: Cadastra um novo Gasto no sistema.
 *     tags:
 *       - Gastos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GastoRequest'
 *     responses:
 *       201:
 *         description: Gasto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_CREATED_ITEM'
 *       400:
 *         description: Dados obrigatórios não informados ou inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_REQUIRED_FIELDS'
 *       500: 
 *         description: Erro interno do servidor
 *         content:  
 *            application/json:
 *              schema:
 *                $ref: '#/components/ResponseApi/ERROR_INTERNAL_SERVER'
 * 
 *  
 */

/**
 * @swagger
 * /v1/car-assist/gasto/{id}:
 *   delete:
 *     summary: Deleta um Gasto pelo ID
 *     description: Deleta um Gasto pelo ID.
 *     tags:
 *       - Gastos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Gasto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lembrete deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
 *       404:
 *         description: Gasto não encontrado
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




const controllerGasto = require('../controller/gasto/gasto_controller.js')

router.get('/v1/car-assist/gastos', cors(), async (req, res) => {
    let result = await controllerGasto.listarGastos()
    res.status(result.status_code).json(result)
})

router.get('/v1/car-assist/gasto/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerGasto.buscarGastoId(id)
    res.status(result.status_code).json(result)
})

router.post('/v1/car-assist/gasto', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body
    let contentType = req.headers['content-type']
    let result = await controllerGasto.inserirGasto(dadosBody, contentType)
    res.status(result.status_code).json(result)
})

router.put('/v1/car-assist/gasto/:id', cors(), bodyParserJSON, async (req, res) => {
    let id = req.params.id
    let dadosBody = req.body
    let contentType = req.headers['content-type']
    let result = await controllerGasto.atualizarGasto(dadosBody, id, contentType)
    res.status(result.status_code).json(result)
})

router.delete('/v1/car-assist/gasto/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerGasto.deletarGastoId(id)
    res.status(result.status_code).json(result)
})

module.exports = router