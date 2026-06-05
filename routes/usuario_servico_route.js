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

/**
 * @swagger
 * /v1/car-assist/usuario-servico:
 *   post:
 *     summary: Vincula um usuário a um serviço
 *     description: Cria um vínculo entre um usuário e um serviço.
 *     tags:
 *       - Usuário serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioServicoRequest'
 *     responses:
 *       201:
 *         description: Vínculo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioServicoResponse'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios não enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_REQUIRED_FIELDS'
 *       404:
 *         description: Usuário ou serviço não encontrado
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

//Inserir um novo vínculo
router.post('/v1/car-assist/usuario-servico', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let usuario = await controllerUsuarioServico.inserirUsuarioServico(dadosBody, contentType);
    response.status(usuario.status_code).json(usuario);
});

/**
 * @swagger
 * /v1/car-assist/usuarios/{idUsuario}/servicos/{idServico}:
 *   get:
 *     summary: Busca um vínculo entre usuário e serviço
 *     description: Retorna os dados do vínculo entre um usuário e um serviço específico.
 *     tags:
 *       - Usuário serviço
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idServico
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vínculo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioServicoResponse'
 *       404:
 *         description: Vínculo não encontrado
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

//Busca pelo id do usuário e id do serviço
router.get('/v1/car-assist/usuarios/:idUsuario/servicos/:idServico', cors(), async (req, res) => {
    let idUsuario = req.params.idUsuario;
    let idServico = req.params.idServico
    let usuarioServico = await controllerUsuarioServico.buscarUsuarioServico(idUsuario,idServico)

    res.status(usuarioServico.status_code).json(usuarioServico);
});

//Deleta um vínculo pelo id do serviço
router.delete('/v1/car-assist/usuarios/:idUsuario/servicos/:idServico', cors(), async (req, res) => {
    let idUsuario = req.params.idUsuario;
    let idServico = req.params.idServico
    let usuarioServico = await controllerUsuarioServico.deletarUsuarioServico(idUsuario,idServico)

    res.status(usuarioServico.status_code).json(usuarioServico);
});

//Deleta um vínculo pelo id
router.delete('/v1/car-assist/usuario-servico/:id', cors(), async (req, res) => {
    let idUsuario = req.params.id;
    let usuario = await controllerUsuarioServico.deleteUsuarioServicoByIdUser(idUsuario)
    
    res.status(usuario.status_code).json(usuario);
});


module.exports = router