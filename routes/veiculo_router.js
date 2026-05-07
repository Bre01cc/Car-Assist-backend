/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao veículo
 * Data: 10/04/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()



const router = express.Router()

// const upload = multer({})

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         const
//     }
// })

// router.post('/v1/car-assist/veiculo', cors(), async function (request, response) {
//     if(!request.files) return response.status(400).json({message:'Arquivo invalido'})
// });


/**
 * @swagger
 * /v1/car-assist/veiculo/{id}:
 *   put:
 *     summary: Atualiza um Veículo pelo ID
 *     description: Atualiza um Veículo no sistema
 *     tags:
 *       - Veículos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Veículo
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/VeiculoRequest'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
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
 * /v1/car-assist/veiculo:
 *   post:
 *     summary: Cria um novo Veículo
 *     description: Cadastra um novo Veículo no sistema.
 *     tags:
 *       - Veículos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VeiculoRequest'
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
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
 * /v1/car-assist/veiculo/{id}:
 *   delete:
 *     summary: Deleta um Veículo pelo ID
 *     description: Deleta um Veículo pelo ID.
 *     tags:
 *       - Veículos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do veículo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículo deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
 *       404:
 *         description: Veículo não encontrado
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
 * /v1/car-assist/veiculo/{id}:
 *   get:
 *     summary: Retorna um Veículo pelo ID
 *     description: Obtém os dados de um Veículo específico com base no ID informado.
 *     tags:
 *       - Veículos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do veículo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VeiculoResponse'
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
 *         
 */


module.exports = router