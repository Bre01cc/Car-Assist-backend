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



router.post('/v1/car-assist/usuario-servico', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let usuario = await controllerUsuarioServico.inserirUsuarioServico(dadosBody, contentType);
    response.status(usuario.status_code).json(usuario);
});

router.get('/v1/car-assist/usuario-servico', cors(), async (req, res) => {

    let usuarioServico = await controllerUsuarioServico.listarUsuariosServicos()

    res.status(usuarioServico.status_code).json(usuarioServico);
});

router.get('/v1/car-assist/usuarios/:idUsuario/servicos/:idServico', cors(), async (req, res) => {
    let idUsuario = req.params.idUsuario;
    let idServico = req.params.idServico
    let usuarioServico = await controllerUsuarioServico.buscarUsuarioServico(idUsuario,idServico)

    res.status(usuarioServico.status_code).json(usuarioServico);
});

router.delete('/v1/car-assist/usuarios/:idUsuario/servicos/:idServico', cors(), async (req, res) => {
    let idUsuario = req.params.idUsuario;
    let idServico = req.params.idServico
    let usuarioServico = await controllerUsuarioServico.deletarUsuarioServico(idUsuario,idServico)

    res.status(usuarioServico.status_code).json(usuarioServico);
});

router.delete('/v1/car-assist/usuario-servico/:id', cors(), async (req, res) => {
    let idUsuario = req.params.id;
    let usuario = await controllerUsuarioServico.deleteUsuarioServicoByIdUser(idUsuario)
    
    res.status(usuario.status_code).json(usuario);
});


module.exports = router