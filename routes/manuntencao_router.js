/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente a manutenção
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
 * /v1/car-assist/manutencao/{id}:
 *   delete:
 *     summary: Deleta uma manutenção pelo ID
 *     description: Deleta uma manuntenção pelo ID.
 *     tags:
 *       - Manuntenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da manuntenção
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manutenção deletado com sucesso
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
 *     summary: Retorna uma manutenção pelo ID
 *     description: Obtém os dados de um manutenção específico com base no ID informado.
 *     tags:
 *       - Manuntenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da manuntenção
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
 *         description: Veículo não encontrado
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

module.exports = router