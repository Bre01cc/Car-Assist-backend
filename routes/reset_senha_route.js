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

router.post('/v1/car-assist/usuario/password-reset/gerar', async (req, res) => {
   
    const contentType = req.headers['content-type'];
    
    const dadosBody = req.body;

   
    let dadosResult = await loginController.solicitarResetSenha(dadosBody, contentType);

   
    return res.status(dadosResult.status_code).json(dadosResult);
});

router.post('/v1/car-assist/usuario/password-reset/alterar', async (req, res) => {
    const contentType = req.headers['content-type'];

    const dadosBody = req.body;

    let dadosResult = await loginController.efetuarResetSenha(dadosBody, contentType);

    return res.status(dadosResult.status_code).json(dadosResult);
});

module.exports = router;