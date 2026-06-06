/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao seviço
 * Data: 06/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerServico = require('../controller/servico/servico_controller.js')

/**
 * @swagger
 * /v1/car-assist/servico/{id}:
 *   put:
 *     summary: Atualiza um Serviço pelo ID
 *     description: Atualiza um Serviço no sistema
 *     tags:
 *       - Serviço
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Serviço
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ServicosRequest'
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
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
router.put('/v1/car-assist/servico/:id', cors(), bodyParserJSON, async function (request, response) {

    let dadosBody = request.body;

    let idServico = request.params.id;

    let contentType = request.headers['content-type'];

    let servico = await controllerServico.atualizarServico(dadosBody, idServico, contentType);

    response.status(servico.status_code).json(servico);
});

/**
 * @swagger
 * /v1/car-assist/servico:
 *   post:
 *     summary: Cria um novo Serviço
 *     description: Cadastra um novo Serviço no sistema.
 *     tags:
 *       - Serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServicosRequest'
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
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
router.post('/v1/car-assist/servico', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let servico = await controllerServico.inserirServico(dadosBody, contentType);
    response.status(servico.status_code).json(servico);
});

/**
 * @swagger
 * /v1/car-assist/servico/{id}:
 *   delete:
 *     summary: Deleta um Serviço pelo ID
 *     description: Deleta um Serviço pelo ID.
 *     tags:
 *       - Serviço
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Serviço
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
 *       404:
 *         description: Serviço não encontrado
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
router.delete('/v1/car-assist/servico/:id', cors(), async (req, res) => {
    let idServico = req.params.id;
    let servico = await controllerServico.deletarServicoId(idServico)
    
    res.status(servico.status_code).json(servico);
});

/**
 * @swagger
 * /v1/car-assist/servico:
 *   get:
 *     summary: Lista todos os serviços
 *     description: Retorna uma lista com todos os serviços cadastrados no sistema.
 *     tags:
 *       - Serviço
 *     responses:
 *       200:
 *         description: Lista de serviços retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServicosResponse'
 *       404:
 *         description: Nenhum serviço encontrado
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
router.get('/v1/car-assist/servico', cors(), async (req, res) => {

    let servico = await controllerServico.listarServicos()

    res.status(servico.status_code).json(servico);
});

/**
 * @swagger
 * /v1/car-assist/servico/{id}:
 *   get:
 *     summary: Busca um serviço pelo ID
 *     description: Retorna os dados de um serviço específico com base no ID informado.
 *     tags:
 *       - Serviço
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServicosResponse'
 *       404:
 *         description: Serviço não encontrado
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
router.get('/v1/car-assist/servico/:id', cors(), async (req, res) => {
    let idServico = req.params.id;
    let servico = await controllerServico.buscarServicosId(idServico)
  
    res.status(servico.status_code).json(servico);
});

/**
 * @swagger
 * /v1/car-assist/servico-tipo/{id}:
 *   get:
 *     summary: Busca serviços por tipo
 *     description: Retorna todos os serviços associados ao tipo informado.
 *     tags:
 *       - Serviço
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do tipo de serviço
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviços encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServicosResponse'
 *       404:
 *         description: Tipo de serviço não encontrado
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
router.get('/v1/car-assist/servico-tipo/:id', cors(), async (req, res) => {
    let idServico = req.params.id;
    let servico = await controllerServico.buscarServicosIdTipo(idServico)
  
    res.status(servico.status_code).json(servico);
});

module.exports = router