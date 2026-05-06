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
 *   put:
 *     summary: Atualiza um usuário pelo id.
 *     description: Atualiza um usuário  no sistema.
 *     tags:
 *       - Usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRequest'
 *     responses:
 *       200:
 *         description: Atualiza um usuário com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_UPDATE_ITEM'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_INTERNAL_SERVER'
 *      400:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_REQUIRED_FIELDS'
 * 
 */

/**
 * @swagger
 * /v1/car-assist/usuario/{id}:
 *   delete:
 *     summary: Deleta um Usuário pelo ID
 *     description: Deleta um Usuário pelo ID.
 *     tags:
 *       - Usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
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


/**
 * @swagger
 * /v1/car-assist/usuario:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cadastra um novo usuário no sistema.
 *     tags:
 *       - Usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRequest'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_CREATED_ITEM'
 *  
 */

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
