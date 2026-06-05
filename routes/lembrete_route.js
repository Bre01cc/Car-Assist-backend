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

const controllerLembretes = require('../controller/lembrete/lembrete_controller.js')

/**
 * @swagger
 * /v1/car-assist/lembrete/{id}:
 *   get:
 *     summary: Busca um lembrete pelo ID
 *     description: Retorna os dados de um lembrete específico com base no ID informado.
 *     tags:
 *       - Lembretes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do lembrete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lembrete encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LembretesResponse'
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
router.get('/v1/car-assist/lembrete/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerLembretes.buscarLembreteId(id)
    res.status(result.status_code).json(result)
})

/**
 * @swagger
 * /v1/car-assist/lembrete/usuario/{id}:
 *   get:
 *     summary: Busca os lembretes de um usuário
 *     description: Retorna todos os lembretes associados ao usuário informado.
 *     tags:
 *       - Lembretes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lembretes encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LembretesResponse'
 *       404:
 *         description: Usuário ou lembretes não encontrados
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

router.get('/v1/car-assist/lembrete/usuario/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerLembretes.buscarLembreteIdUsuario(id)
    res.status(result.status_code).json(result)
})

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

router.post('/v1/car-assist/lembrete', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body
    let contentType = req.headers['content-type']
    
    let result = await controllerLembretes.inserirLembrete(dadosBody, contentType)
    res.status(result.status_code).json(result)
})

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
router.put('/v1/car-assist/lembrete/:id', cors(), bodyParserJSON, async (req, res) => {
    let id = req.params.id
    let dadosBody = req.body
    let contentType = req.headers['content-type']

    let result = await controllerLembretes.atualizarLembrete(dadosBody, id, contentType)
    res.status(result.status_code).json(result)
})

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
router.delete('/v1/car-assist/lembrete/:id', cors(), async (req, res) => {
    let id = req.params.id
    let result = await controllerLembretes.deletarLembreteId(id)
    res.status(result.status_code).json(result)
})

module.exports = router
