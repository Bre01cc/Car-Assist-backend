/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao tipo da manutenção
 * Data: 05/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerTipoManutencao = require('../controller/tipo_manutencao/tipo_manutencao_controller.js')

/**
 * @swagger
 * /v1/car-assist/tipo-manutencao/{id}:
 *   get:
 *     summary: Retorna um Tipo de manutenção pelo ID
 *     description: Obtém os dados de um Tipo de manutenção específico com base no ID informado.
 *     tags:
 *       - Tipo manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Tipo de manutenção
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de manutenção encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoManutencaoResponse'
 *       404:
 *         description: Tipo de manutenção não encontrado
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

/**
 * @swagger
 * /v1/car-assist/tipo-manutencao/:
 *   get:
 *     summary: Retorna todos os Tipos de manutenção.
 *     description: Obtém os dados de todos os tipos de manutenção específico com base no ID informado.
 *     tags:
 *       - Tipo manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Tipo de manutenção
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de manutenção encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoManutencaoResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_INTERNAL_SERVER'
 *         
 */

router.get('/v1/car-assist/tipo-manutencao', cors(), async (req, res) => {

    let tipoManutencao = await controllerTipoManutencao.listarTiposManutencao()

    res.status(tipoManutencao.status_code).json(tipoManutencao);
});

router.get('/v1/car-assist/tipo-manutencao/:id', cors(), async (req, res) => {
    let idTipoManutencao = req.params.id;
    let tipoManutencao = await controllerTipoManutencao.buscarTipoManutencaoId(idTipoManutencao)
  
    res.status(tipoManutencao.status_code).json(tipoManutencao);
});

module.exports = router