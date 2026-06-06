/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao endereço
 * Data: 05/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const controllerEndereco = require('../controller/endereco/endereco_controller.js')

const router = express.Router()

/**
 * @swagger
 * /v1/car-assist/endereco:
 *   post:
 *     summary: Cria um novo Endereço
 *     description: Cadastra um novo Endereço no sistema.
 *     tags:
 *       - Endereços
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnderecosRequest'
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
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

router.post('/v1/car-assist/endereco', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let endereco = await controllerEndereco.inserirEndereco(dadosBody, contentType);
    response.status(endereco.status_code).json(endereco);
});

/**
 * @swagger
 * /v1/car-assist/endereco/{id}:
 *   put:
 *     summary: Atualiza um Endereço pelo ID
 *     description: Atualiza um Endereço no sistema
 *     tags:
 *       - Endereços
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Endereço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnderecosRequest'
 *     responses:
 *       200:
 *         description: Enderço atualizado com sucesso
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

router.put('/v1/car-assist/endereco/:id', cors(), bodyParserJSON, async function (request, response) {

    let dadosBody = request.body;

    let idEndereco = request.params.id;

    let contentType = request.headers['content-type'];

    let endereco = await controllerEndereco.atualizarEndereco(dadosBody, idEndereco, contentType);

    response.status(endereco.status_code).json(endereco);
});

/**
 * @swagger
 * /v1/car-assist/endereco/{id}:
 *   delete:
 *     summary: Deleta um Endereço pelo ID
 *     description: Deleta um Endereço pelo ID.
 *     tags:
 *       - Endereços
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Endereço
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
 *       404:
 *         description: Endereço não encontrado
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

router.delete('/v1/car-assist/endereco/:id', cors(), async function (req, res) {

    let idEndereco = req.params.id;

    let endereco = await controllerEndereco.deletarEndereco(idEndereco);

    res.status(endereco.status_code);

    res.json(endereco);

});

/**
 * @swagger
 * /v1/car-assist/endereco/{id}:
 *   get:
 *     summary: Busca um endereço pelo ID
 *     description: Retorna os dados de um endereço específico com base no ID informado.
 *     tags:
 *       - Endereços
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnderecosResponse'
 *       404:
 *         description: Endereço não encontrado
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

router.get('/v1/car-assist/endereco/:id', cors(), async function (req, res) {

    let idEndereco = req.params.id;

    let endereco = await controllerEndereco.buscarEnderecoId(idEndereco);

    res.status(endereco.status_code);

    res.json(endereco);

});

/**
 * @swagger
 * /v1/car-assist/endereco/servico/{id}:
 *   get:
 *     summary: Busca o endereço de um serviço
 *     description: Retorna o endereço associado ao serviço informado.
 *     tags:
 *       - Endereços
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnderecosResponse'
 *       404:
 *         description: Serviço ou endereço não encontrado
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

router.get('/v1/car-assist/endereco/servico/:id', cors(), async function (req, res) {
    
    let idServico = req.params.id;

    let endereco = await controllerEndereco.buscarEnderecoServico(idServico);

    res.status(endereco.status_code);

    res.json(endereco);

});



module.exports = router
