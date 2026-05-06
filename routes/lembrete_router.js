/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao lembrete
 * Data: 05/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

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