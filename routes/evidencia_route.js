/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente a evidência
 * Data: 10/04/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const upload = require('./upload.js')

const router = express.Router()

const controllerEvidencia = require('../controller/evidencia/evidencia_controller.js')

/**
 * @swagger
 * /v1/car-assist/evidencia:
 *   post:
 *     summary: Cadastra uma evidência
 *     description: Cria uma nova evidência associada a uma manutenção, permitindo o envio de uma imagem.
 *     tags:
 *       - Evidência
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/EvidenciaRequest'
 *     responses:
 *       201:
 *         description: Evidência cadastrada com sucesso
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
 *       404:
 *         description: Manutenção não encontrada
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
router.post('/v1/car-assist/evidencia', cors(), bodyParserJSON, upload.single('url'), async function (request, response) {

    let dadosBody = request.body;

    let contentType = request.headers['content-type'];
    //Recebe o arquivo de imagem na req
    let foto = request.file

    let evidencia = await controllerEvidencia.inserirEvidencia(dadosBody, contentType, foto);

    response.status(evidencia.status_code).json(evidencia);
});

/**
 * @swagger
 * /v1/car-assist/evidencia/{id}:
 *   put:
 *     summary: Atualiza uma evidência
 *     description: Atualiza os dados de uma evidência existente, incluindo a imagem da evidência.
 *     tags:
 *       - Evidência
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da evidência
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/EvidenciaRequest'
 *     responses:
 *       200:
 *         description: Evidência atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvidenciaResponse'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios não enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_REQUIRED_FIELDS'
 *       404:
 *         description: Evidência não encontrada
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
router.put('/v1/car-assist/evidencia/:id', cors(), bodyParserJSON, upload.single('url'), async function (request, response) {

    let dadosBody = request.body;

    let idEvidencia = request.params.id;

    let contentType = request.headers['content-type'];

    //Recebe o arquivo de imagem na req
    let foto = request.file

    let evidenica = await controllerEvidencia.atualizarEvidencia(dadosBody, idEvidencia, contentType, foto);

    response.status(evidenica.status_code).json(evidenica);
});

/**
 * @swagger
 * /v1/car-assist/evidencia/{id}:
 *   delete:
 *     summary: Remove uma evidência pelo ID
 *     description: Exclui uma evidência específica com base no ID informado.
 *     tags:
 *       - Evidência
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da evidência
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evidência removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
 *       404:
 *         description: Evidência não encontrada
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
router.delete('/v1/car-assist/evidencia/:id', cors(), async function (req, res) {

    let idEvidencia = req.params.id;

    let evidencia = await controllerEvidencia.deletarEvidenciaId(idEvidencia);

    res.status(evidencia.status_code);

    res.json(evidencia);

});

/**
 * @swagger
 * /v1/car-assist/evidencia/manutencao/{id}:
 *   delete:
 *     summary: Remove as evidências de uma manutenção
 *     description: Exclui todas as evidências associadas à manutenção informada.
 *     tags:
 *       - Evidência
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da manutenção
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evidências removidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
 *       404:
 *         description: Manutenção ou evidências não encontradas
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
router.delete('/v1/car-assist/evidencia/manutencao/:id', cors(), async function (req, res) {

    let idManutencao = req.params.id;

    let evidencia = await controllerEvidencia.deletarEvidenciaIdManutencao(idManutencao);

    res.status(evidencia.status_code);

    res.json(evidencia);

});

/**
 * @swagger
 * /v1/car-assist/evidencia/{id}:
 *   get:
 *     summary: Busca uma evidência pelo ID
 *     description: Retorna os dados de uma evidência específica com base no ID informado.
 *     tags:
 *       - Evidência
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da evidência
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evidência encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvidenciaResponse'
 *       404:
 *         description: Evidência não encontrada
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
router.get('/v1/car-assist/evidencia/:id', cors(), async function (req, res) {

    let idEvidencia = req.params.id;

    let evidencia = await controllerEvidencia.buscarEvidenciaId(idEvidencia);

    res.status(evidencia.status_code);

    res.json(evidencia);

});

/**
 * @swagger
 * /v1/car-assist/evidencia/manutencao/{id}:
 *   get:
 *     summary: Busca evidências de uma manutenção
 *     description: Retorna todas as evidências associadas à manutenção informada.
 *     tags:
 *       - Evidência
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da manutenção
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evidências encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvidenciaListResponse'
 *       404:
 *         description: Manutenção ou evidências não encontradas
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
router.get('/v1/car-assist/evidencia/manutencao/:id', cors(), async function (req, res) {

    let idManutencao = req.params.id;

    let evidencia = await controllerEvidencia.buscarEvidenciaIdMaintenance(idManutencao);

    res.status(evidencia.status_code);

    res.json(evidencia);

});

module.exports = router