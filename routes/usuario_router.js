/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao usuário
 * Data: 05/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerUsuario = require('../controller/usuario/usuario_controller.js')


/**
 * @swagger
 * /v1/car-assist/usuario/{id}:
 *   put:
 *     summary: Atualiza um Usuário pelo ID
 *     description: Atualiza um Usuário no sistema
 *     tags:
 *       - Usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRequest'
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
 *     summary: Cria um novo Usuário
 *     description: Cadastra um novo Usuário no sistema.
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
 *     summary: Retorna um Usuário pelo ID
 *     description: Obtém os dados de um Usuário específico com base no ID informado.
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


router.put('/v1/car-assist/usuario/:id', cors(), bodyParserJSON, async function (request, response) {

    let dadosBody = request.body;

    let idUsuario = request.params.id;

    let contentType = request.headers['content-type'];

    let usuario = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario, contentType);

    response.status(usuario.status_code).json(usuario);
});

router.post('/v1/car-assist/usuario', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let usuario = await controllerUsuario.inserirUsuario(dadosBody, contentType);
    response.status(usuario.status_code).json(usuario);
});

router.delete('/v1/car-assist/usuario/:id', cors(), async (req, res) => {
    let idUsuario = req.params.id;
    let usuario = await controllerUsuario.deletarUsuarioId(idUsuario)
    
    res.status(usuario.status_code).json(usuario);
});

router.get('/v1/car-assist/usuario', cors(), async (req, res) => {

    let usuario = await controllerUsuario.listarUsuarios()

    res.status(usuario.status_code).json(usuario);
});

router.get('/v1/car-assist/usuario/:id', cors(), async (req, res) => {
    let idUsuario = req.params.id;
    let usuario = await controllerUsuario.buscarUsuarioId(idUsuario)
  
    res.status(usuario.status_code).json(usuario);
});

router.post('/v1/car-assist/usuario/login', cors(), bodyParserJSON, async function (req, res) {
    let dadosBody = req.body;
    let contentType = req.headers['content-type'];
    let usuario = await controllerUsuario.buscarUsuarioEmailComSenha(dadosBody, contentType);
    res.status(usuario.status_code).json(usuario);
});

router.get('/v1/car-assist/usuario', cors(), async (req, res) => {
    let idUsuario = req.query.id;
    let status = req.query.status
    let usuario = await controllerUsuario.buscarUsuarioAtivo(idUsuario, status)

    res.status(usuario.status_code).json(usuario);
});



// router.get('/v1/car-assist/usuario', cors(), async (req, res) => {
//     let idUsuario = req.query.id;
//     let usuario = await controllerUsuario.buscarUsuarioId(idUsuario)

//     res.status(usuario.status_code).json(usuario);
// });


module.exports = router
