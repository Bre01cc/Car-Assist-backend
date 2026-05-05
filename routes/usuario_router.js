/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao usuário
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
 * /v1/car-assist/usuario/{id}:
 *   get:
 *     summary: Retorna um usuario pelo ID
 *     description: Obtém os dados de um usuário específico com base no ID informado.
 *     tags:
 *       - Usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponse'
 *       404:
 *         description: Usuário não encontrado
 */


module.exports = router
