/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente a manutenção
 * Data: 05/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerManutencao = require('../controller/manutencao/manutencao_controller')


/**
 * @swagger
 * /v1/car-assist/manutencao/{id}:
 *   put:
 *     summary: Atualiza uma Manutenção pelo ID
 *     description: Atualiza uma Manutenção no sistema
 *     tags:
 *       - Manuntenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da Manutenção
 *     requestBody:
 *       required: true
 *       content:
 *       multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ManutencaoRequest'
 *     responses:
 *       200:
 *         description: Manutenção atualizada com sucesso
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
 * /v1/car-assist/manutencao:
 *   post:
 *     summary: Cria uma nova Manutenção
 *     description: Cadastra uma nova Manutenção no sistema.
 *     tags:
 *       - Manuntenção
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ManutencaoRequest'
 *     responses:
 *       201:
 *         description: Manutenção criada com sucesso
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
 * /v1/car-assist/manutencao/{id}:
 *   delete:
 *     summary: Deleta uma Manutenção pelo ID
 *     description: Deleta uma Manuntenção pelo ID.
 *     tags:
 *       - Manuntenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da Manuntenção
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manutenção deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
 *       404:
 *         description: Manutenção não encontrado
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

/**
 * @swagger
 * /v1/car-assist/manuntencao/{id}:
 *   get:
 *     summary: Retorna uma Manutenção pelo ID
 *     description: Obtém os dados de um Manutenção específico com base no ID informado.
 *     tags:
 *       - Manuntenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da Manuntenção
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manuntenção encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ManutencaoResponse'
 *       404:
 *         description: Manutenção não encontrado
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
 */

router.put('/v1/car-assist/manutencao/:id', cors(), bodyParserJSON, async function (request, response) {

    let dadosBody = request.body;

    let idManutencao = request.params.id;

    let contentType = request.headers['content-type'];

    let manutencao = await controllerManutencao.atualizarManutencao(dadosBody, idManutencao, contentType);

    response.status(manutencao.status_code).json(manutencao);
});

router.post('/v1/car-assist/manutencao', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let manutencao = await controllerManutencao.inserirManutencao(dadosBody, contentType);
    response.status(manutencao.status_code).json(manutencao);
});

router.post('/v1/car-assist/manutencao-evidencia-peca', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let manutencao = await controllerManutencao.inserirManutencaoComEvidenciaComPeca(dadosBody, contentType);
    response.status(manutencao.status_code).json(manutencao);
});

router.get('/v1/car-assist/manutencao', cors(), async (req, res) => {

    let manutencao = await controllerManutencao.listarManutencao()

    res.status(manutencao.status_code).json(manutencao);
});

router.get('/v1/car-assist/manutencao/:id', cors(), async (req, res) => {
    let idManutencao = req.params.id;
    let manutencao = await controllerManutencao.buscarManutencaoId(idManutencao)

    res.status(manutencao.status_code).json(manutencao);
});

router.get('/v1/car-assist/manutencao-tipo/:id', cors(), async (req, res) => {
    let idTipoManutencao = req.params.id;
    let manutencao = await controllerManutencao.buscarManutencaoIdTipo(idTipoManutencao)

    res.status(manutencao.status_code).json(manutencao);
});

router.get('/v1/car-assist/manutencao-usuario/:id', cors(), async (req, res) => {
    let idUsuario = req.params.id;
    let manutencao = await controllerManutencao.buscarManutencaoIdUsuario(idUsuario)

    res.status(manutencao.status_code).json(manutencao);
});

router.get('/v1/car-assist/manutencao-veiculo/:id', cors(), async (req, res) => {
    let idVeiculo = req.params.id;
    let manutencao = await controllerManutencao.buscarManutencaoIdVeiculo(idVeiculo)

    res.status(manutencao.status_code).json(manutencao);
});

module.exports = router