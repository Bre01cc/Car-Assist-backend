/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente a evidência
 * Data: 10/04/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const upload = require('./upload.js')

const router = express.Router()

const controllerEvidencia = require('../controller/evidencia/evidencia_controller.js')

router.post('/v1/car-assist/evidencia', cors(), bodyParserJSON, upload.single('url'), async function (request, response) {
 
    let dadosBody = request.body;

    let contentType = request.headers['content-type'];
        //Recebe o arquivo de imagem na req
    let foto = request.file

    let evidencia = await controllerEvidencia.inserirEvidencia(dadosBody, contentType, foto);

    response.status(evidencia.status_code).json(evidencia);
});

router.put('/v1/car-assist/evidencia/:id', cors(), bodyParserJSON, async function (request, response) {

    let dadosBody = request.body;

    let idEvidencia = request.params.id;

    let contentType = request.headers['content-type'];

    let evidenica = await controllerEvidencia.atualizarEvidencia(dadosBody, idEvidencia, contentType);

    response.status(evidenica.status_code).json(evidenica);
});

router.delete('/v1/car-assist/evidencia/:id', cors(), async function (req, res) {

    let idEvidencia = req.params.id;

    let evidencia = await controllerEvidencia.deletarEvidenciad(idEvidencia);

    res.status(evidencia.status_code);

    res.json(evidencia);

});

router.get('/v1/car-assist/evidencia/:id', cors(), async function (req, res) {

    let idEvidencia = req.params.id;

    let evidencia = await controllerEvidencia.buscarEvidenciaId(idEvidencia);

    res.status(evidencia.status_code);

    res.json(evidencia);

});

router.get('/v1/car-assist/evidencia/manutencao/:id', cors(), async function (req, res) {

    let idManutencao = req.params.id;

    let evidencia = await controllerEvidencia.buscarEvidenciaIdMaintenance(idManutencao);

    res.status(evidencia.status_code);

    res.json(evidencia);

});


router.get('/v1/car-assist/evidencia/', cors(), async function (req, res) {

    let evidencia = await controllerEvidencia.listarEvidencia();

    res.status(evidencia.status_code);

    res.json(evidencia);

});


module.exports = router