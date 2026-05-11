/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente aos Lembretes
 * Data: 11/05/2026
 * Autor: Nikolas Fernandes Vieira
 * Versão: 1.0
 ***********************************************************************************************************************/

const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()
const router = express.Router()

/**
 * @swagger
 * /v1/car-assist/lembretes/{id}:
 *   put:
 *     summary: Atualiza um Lembrete pelo ID
 *     description: Atualiza um Lembrete no sistema
 *     tags:
 *       - Lembretes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Lembrete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LembretesResponse'
 *     responses:
 *       200:
 *         description: Atualiza um Lembrete com sucesso
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
 * /v1/car-assist/lembretes:
 *   post:
 *     summary: Cria um novo Lembrete
 *     description: Cadastra um novo Lembrete no sistema.
 *     tags:
 *       - Lembretes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LembretesResponse'
 *     responses:
 *       201:
 *         description: Lembrete atualizado com sucesso
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
 * /v1/car-assist/lembretes/{id}:
 *   delete:
 *     summary: Deleta um Lembrete pelo ID
 *     description: Deleta um Lembrete pelo ID.
 *     tags:
 *       - Lembretes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Lembrete
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
 *         description: Lembrete não encontrado
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


const router = express.Router()

// Import da Controller de Lembretes
const controllerLembretes = require('../controller/lembrete/lembrete_controller.js')

// Rota para listar todos os lembretes
router.get('/v1/car-assist/lembretes', cors(), async (req, res) => {
    let result = await controllerLembretes.listarLembretes()
    res.status(result.status_code).json(result)
})

// Rota para buscar um lembrete pelo ID
router.get('/v1/car-assist/lembrete/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerLembretes.buscarLembreteId(id)
    res.status(result.status_code).json(result)
})

// Rota para inserir um novo lembrete
router.post('/v1/car-assist/lembrete', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body
    let contentType = req.headers['content-type']
    
    let result = await controllerLembretes.inserirLembrete(dadosBody, contentType)
    res.status(result.status_code).json(result)
})

// Rota para atualizar um lembrete pelo ID
router.put('/v1/car-assist/lembrete/:id', cors(), bodyParserJSON, async (req, res) => {
    let id = req.params.id
    let dadosBody = req.body
    let contentType = req.headers['content-type']

    let result = await controllerLembretes.atualizarLembrete(dadosBody, id, contentType)
    res.status(result.status_code).json(result)
})

// Rota para deletar um lembrete pelo ID
router.delete('/v1/car-assist/lembrete/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerLembretes.deletarLembreteId(id)
    res.status(result.status_code).json(result)
})

module.exports = router
