/***********************************************************************************************************************
 * Objetivo: Rotas responsáveis pelos endpoints de reset e redefinição de senha
 * Data: 06/06/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router();


const loginController = require('../controller/reset_senha/reset_senha_controller'); 

/**
 * @swagger
 * /v1/car-assist/usuario/password-reset/gerar:
 *   post:
 *     summary: Solicita recuperação de senha
 *     description: Gera um token de recuperação de senha e envia para o e-mail do usuário cadastrado.
 *     tags:
 *       - Reset senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordResetRequest'
 *     responses:
 *       200:
 *         description: Token enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PasswordResetResponse'
 *       400:
 *         description: Dados obrigatórios não informados ou inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_REQUIRED_FIELDS'
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
router.post('/v1/car-assist/usuario/password-reset/gerar', async (req, res) => {
 
    const contentType = req.headers['content-type'];
    
    const dadosBody = req.body;

   
    let dadosResult = await loginController.solicitarResetSenha(dadosBody, contentType);

   
    return res.status(dadosResult.status_code).json(dadosResult);
});

/**
 * @swagger
 * /v1/car-assist/usuario/password-reset/alterar:
 *   post:
 *     summary: Redefine a senha do usuário
 *     description: Valida o token de recuperação enviado por e-mail e atualiza a senha do usuário.
 *     tags:
 *       - Reset senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordResetConfirmRequest'
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PasswordResetConfirmResponse'
 *       400:
 *         description: Token inválido, expirado ou senha inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_REQUIRED_FIELDS'
 *       404:
 *         description: Token ou usuário não encontrado
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
router.post('/v1/car-assist/usuario/password-reset/alterar', async (req, res) => {
    const contentType = req.headers['content-type'];

    const dadosBody = req.body;

    let dadosResult = await loginController.efetuarResetSenha(dadosBody, contentType);

    return res.status(dadosResult.status_code).json(dadosResult);
});

module.exports = router;