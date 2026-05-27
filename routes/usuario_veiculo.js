const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()


const controllerUV = require('../controller/usuario_veiculo/usuario_veiculo_controller.js')

// listar todos os vínculos
router.get('/v1/car-assist/usuario-veiculo', cors(), async (req, res) => {
    let result = await controllerUV.listarVinculos()
    res.status(result.status_code).json(result)
})

router.get('/v1/car-assist/usuario-veiculo/:id', cors(), async (req, res) => {
    let idUsuarioVeiculo = req.params.id;
    let usuario = await controllerUV.buscarUsuarioVeiculoIdUsuario(idUsuarioVeiculo)
  
    res.status(usuario.status_code).json(usuario);
});

// inserir um novo vínculo
router.post('/v1/car-assist/usuario-veiculo', cors(), bodyParserJSON, async (req, res) => {
   
    let dadosBody = req.body

    let contentType = req.headers['content-type']

    let result = await controllerUV.inserirVinculo(dadosBody, contentType)

    res.status(result.status_code).json(result)
})

// inserir um novo vínculo
router.put('/v1/car-assist/usuario-veiculo/:idUsuario/:idVeiculo', cors(), bodyParserJSON, async (req, res) => {
   
    let dadosBody = req.body

    let idUsuario = req.params.idUsuario

    let idVeiculo = req.params.idVeiculo
    
    let contentType = req.headers['content-type']

    let result = await controllerUV.atualizerVinculo(dadosBody, contentType, idUsuario, idVeiculo)

    res.status(result.status_code).json(result)
})

// deletar um vínculo usando os dois ids
router.delete('/v1/car-assist/usuario-veiculo/:idUsuario/:idVeiculo', cors(), async (req, res) => {

    let idUsuario = req.params.idUsuario

    let idVeiculo = req.params.idVeiculo
    
    let result = await controllerUV.deletarVinculo(idUsuario, idVeiculo)

    res.status(result.status_code).json(result)
})

module.exports = router