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

module.exports = router