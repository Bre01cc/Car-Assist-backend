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

const upload = require('./upload.js')

const controllerManutencao = require('../controller/manutencao/manutencao_controller.js')


/**
 * @swagger
 * /v1/car-assist/manutencao/{id}:
 *   delete:
 *     summary: Deleta uma Manutenção pelo ID
 *     description: Deleta uma Manutenção pelo ID.
 *     tags:
 *       - Manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da Manutenção
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


router.delete('/v1/car-assist/manutencao/:id', cors(), async (req, res) => {
    let idManutencao = req.params.id;
    let manutencao = await controllerManutencao.deletarManutencao(idManutencao);

    res.status(manutencao.status_code).json(manutencao);
})

/**
 * @swagger
 * /v1/car-assist/manutencao/status/{id}:
 *   delete:
 *     summary: Deleta uma Manutenção pelo ID
 *     description: Deleta uma Manutenção pelo ID.
 *     tags:
 *       - Manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da Manutenção
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
router.delete('/v1/car-assist/manutencao/status/:id', cors(), async (req, res) => {
    let idManutencao = req.params.id;
    let manutencao = await controllerManutencao.deletarManutencaoStatus(idManutencao);

    res.status(manutencao.status_code).json(manutencao);
})

/**
 * @swagger
 * /v1/car-assist/veiculo/{id}/manutencoes:
 *   delete:
 *     summary: Deleta todas as Manutenções de um Veículo
 *     description: Deleta todas as Manutenções associadas a um Veículo pelo ID.
 *     tags:
 *       - Manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Veículo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manutenções deletadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
 *       404:
 *         description: Veículo ou manutenções não encontradas
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

router.delete('/v1/car-assist/veiculo/:id/manutencoes', cors(), async (req, res) => {
    let idVeiculo = req.params.id;
    let manutencao = await controllerManutencao.deletarManutencaoPorVeiculo(idVeiculo);

    res.status(manutencao.status_code).json(manutencao);
})

/**
 * @swagger
 * /v1/car-assist/usuario/{id}/manutencoes:
 *   delete:
 *     summary: Deleta todas as Manutenções de um Usuário
 *     description: Deleta todas as Manutenções associadas a um Usuário pelo ID.
 *     tags:
 *       - Manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manutenções deletadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
 *       404:
 *         description: Usuário ou manutenções não encontradas
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

router.delete('/v1/car-assist/usuario/:id/manutencoes', cors(), async (req, res) => {
    let idUsuario = req.params.id;
    let manutencao = await controllerManutencao.deletarManutencaoPorUsuario(idUsuario);

    res.status(manutencao.status_code).json(manutencao);
})
/**
 * @swagger
 * /v1/car-assist/manutencao/{id}:
 *   put:
 *     summary: Atualiza uma Manutenção pelo ID
 *     description: Atualiza uma Manutenção no sistema
 *     tags:
 *       - Manutenção
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

router.put('/v1/car-assist/manutencao/:id', cors(), bodyParserJSON, upload.array('evidencias'), async function (request, response) {

    let dadosBody = request.body;
    
    let idManutencao = request.params.id;

    let contentType = request.headers['content-type'];

    let evidencias = request.files;

    let manutencao = await controllerManutencao.atualizarManutencao(dadosBody, idManutencao, contentType, evidencias);
 
    response.status(manutencao.status_code).json(manutencao);
});

/**
 * @swagger
 * /v1/car-assist/manutencao-evidencia:
 *   post:
 *     summary: Cria uma manutenção com evidências
 *     description: Cadastra uma manutenção e suas evidências em uma única requisição.
 *     tags:
 *       - Manutenção
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ManutencaoRequest'
 *     responses:
 *       201:
 *         description: Manutenção criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ManutencaoListResponse'
 *       400:
 *         description: Dados obrigatórios não informados ou inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_REQUIRED_FIELDS'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_INTERNAL_SERVER'
 */
router.post('/v1/car-assist/manutencao-evidencia', cors(), bodyParserJSON, upload.array('evidencias'), async function (request, response) {

    let dadosBody = request.body;

    let contentType = request.headers['content-type'];

    let evidencias = request.files;

    let manutencao = await controllerManutencao.inserirManutencaoComEvidencia(dadosBody, contentType, evidencias);

    response.status(manutencao.status_code).json(manutencao);
});

/**
 * @swagger
 * /v1/car-assist/manutencao/{id}:
 *   get:
 *     summary: Retorna uma Manutenção pelo ID
 *     description: Obtém os dados de um Manutenção específico com base no ID informado.
 *     tags:
 *       - Manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da Manutenção
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manutenção encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ManutencaoListResponse'
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
router.get('/v1/car-assist/manutencao/:id', cors(), async (req, res) => {
    let idManutencao = req.params.id;
    let manutencao = await controllerManutencao.buscarManutencaoId(idManutencao)

    res.status(manutencao.status_code).json(manutencao);
});

/**
 * @swagger
 * /v1/car-assist/manutencao-tipo/{id}:
 *   get:
 *     summary: Busca manutenções por tipo
 *     description: Retorna todas as manutenções associadas ao tipo informado.
 *     tags:
 *       - Manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do tipo de manutenção
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manutenções encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ManutencaoListResponse'
 *       404:
 *         description: Tipo de manutenção não encontrado
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
router.get('/v1/car-assist/manutencao-tipo/:id', cors(), async (req, res) => {
    let idTipoManutencao = req.params.id;
    let manutencao = await controllerManutencao.buscarManutencaoIdTipo(idTipoManutencao)

    res.status(manutencao.status_code).json(manutencao);
});

/**
 * @swagger
 * /v1/car-assist/manutecao-usuario/{id}:
 *   get:
 *     summary: Busca manutenções por usuário
 *     description: Retorna todas as manutenções associadas ao usuário informado.
 *     tags:
 *       - Manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manutenções encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ManutencaoListResponse'
 *       404:
 *         description: Usuário não encontrado
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
router.get('/v1/car-assist/manutencao-usuario/:id', cors(), async (req, res) => {
    let idUsuario = req.params.id;
    let manutencao = await controllerManutencao.buscarManutencaoIdUsuario(idUsuario)

    res.status(manutencao.status_code).json(manutencao);
});

/**
 * @swagger
 * /v1/car-assist/manutencao-veiculo/{id}:
 *   get:
 *     summary: Busca manutenções por veículo
 *     description: Retorna todas as manutenções associadas ao veículo informado.
 *     tags:
 *       - Manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do veículo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manutenções encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ManutencaoListResponse'
 *       404:
 *         description: Veículo não encontrado
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
router.get('/v1/car-assist/manutencao-veiculo/:id', cors(), async (req, res) => {
    let idVeiculo = req.params.id;
    let manutencao = await controllerManutencao.buscarManutencaoIdVeiculo(idVeiculo)

    res.status(manutencao.status_code).json(manutencao);
});



module.exports = router