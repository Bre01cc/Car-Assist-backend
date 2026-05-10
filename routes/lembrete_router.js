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
 *   put:
 *     summary: Atualiza um Lembrete pelo ID
 *     description: Atualiza um Lembrete no sistema
 *     tags:
 *       - Lembretes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Lembrete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LembretesResponse'
 *     responses:
 *       200:
 *         description: Atualiza um Lembrete com sucesso
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
 * /v1/car-assist/lembretes:
 *   post:
 *     summary: Cria um novo Lembrete
 *     description: Cadastra um novo Lembrete no sistema.
 *     tags:
 *       - Lembretes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LembretesResponse'
 *     responses:
 *       201:
 *         description: Lembrete atualizado com sucesso
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