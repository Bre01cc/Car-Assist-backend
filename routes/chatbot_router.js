/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao chatbot
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
 * /v1/car-assist/chatbot:
 *   post:
 *     summary: Cria uma nova Mensagem
 *     description: Cadastra uma nova Mensagem no sistema.
 *     tags:
 *       - ChatBot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatbotRequest'
 *     responses:
 *       201:
 *         description: Mensagem criada com sucesso
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
 * /v1/car-assist/chatbot/{id}:
 *   delete:
 *     summary: Deleta uma Mensagem pelo ID
 *     description: Deleta um Mensagem pelo ID.
 *     tags:
 *       - ChatBot
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da Mensagem
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mensagem deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
 *       404:
 *         description: Mensagem não encontrada
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