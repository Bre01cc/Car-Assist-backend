/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao seviço
 * Data: 06/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()


/**
 * @swagger
 * /v1/car-assist/servico/{id}:
 *   put:
 *     summary: Atualiza um Serviço pelo ID
 *     description: Atualiza um Serviço no sistema
 *     tags:
 *       - Serviço
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Serviço
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ServicoRequest'
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
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
 * /v1/car-assist/servico:
 *   post:
 *     summary: Cria um novo Serviço
 *     description: Cadastra um novo Serviço no sistema.
 *     tags:
 *       - Serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServicoRequest'
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
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
 * /v1/car-assist/servico/{id}:
 *   delete:
 *     summary: Deleta um Serviço pelo ID
 *     description: Deleta um Serviço pelo ID.
 *     tags:
 *       - Serviço
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Serviço
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
 *       404:
 *         description: Serviço não encontrado
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

module.exports = router