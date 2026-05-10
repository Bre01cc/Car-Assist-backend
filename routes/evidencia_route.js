/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente a evidência
 * Data: 10/04/2026
 * Autor: Breno Oliveira Assis Reis, Guilherme Moreira de Souza
 * Versão: 1.0
 ***********************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()



const router = express.Router()

const controllerEvidencia = require('../controller/evidencia/evidencia_controller.js')

router.get('/v1/car-assist/evidencia/:id', cors(), async function (req, res) {

    let idEvidencia = req.params.id;

    let evidencia = await controllerEvidencia.buscarEvidenciaId(idEvidencia);

    res.status(evidencia.status_code);

    res.json(evidencia);

});

router.get('/v1/car-assist/evidencia/', cors(), async function (req, res) {

    let evidencia = await controllerEvidencia.listarEvidencia();

    res.status(evidencia.status_code);

    res.json(evidencia);

});


module.exports = router