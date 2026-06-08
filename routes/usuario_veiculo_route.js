//Imports
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerUV = require('../controller/usuario_veiculo/usuario_veiculo_controller.js')

/**
 * @swagger
 * /v1/car-assist/usuario-veiculo/{idUsuario}:
 *   get:
 *     summary: Busca os veículos vinculados a um usuário
 *     description: Retorna todos os veículos associados ao usuário informado.
 *     tags:
 *       - Usuário veículo
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículos encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioVeiculoByUsuarioResponse'
 *       404:
 *         description: Usuário ou veículo não encontrado
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

//Busca vínculo pelo id do usuário
router.get('/v1/car-assist/usuario-veiculo/:id', cors(), async (req, res) => {
    let idUsuarioVeiculo = req.params.id;
    let usuario = await controllerUV.buscarUsuarioVeiculoIdUsuario(idUsuarioVeiculo)
  
    res.status(usuario.status_code).json(usuario);
});





//Busca vínculo pelo id do 
router.get('/v1/car-assist/usuario-veiculo/veiculo/:id', cors(), async (req, res) => {
    let idUsuarioVeiculo = req.params.id;
    let usuario = await controllerUV.buscarUsuarioVeiculoIdVeiculo(idUsuarioVeiculo)
  
    res.status(usuario.status_code).json(usuario);
});
/**
 * @swagger
 * /v1/car-assist/usuario-veiculo:
 *   post:
 *     summary: Vincula um usuário a um veículo
 *     description: Cria um vínculo entre um usuário e um veículo, definindo seu papel de acesso.
 *     tags:
 *       - Usuário veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioVeiculoRequest'
 *     responses:
 *       201:
 *         description: Vínculo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioVeiculoResponse'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios não enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_REQUIRED_FIELDS'
 *       404:
 *         description: Usuário ou veículo não encontrado
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

// inserir um novo vínculo
router.post('/v1/car-assist/usuario-veiculo', cors(), bodyParserJSON, async (req, res) => {
   
    let dadosBody = req.body

    let contentType = req.headers['content-type']

    let result = await controllerUV.inserirVinculo(dadosBody, contentType)

    res.status(result.status_code).json(result)
})

/**
 * @swagger
 * /v1/car-assist/usuario-veiculo/{idUsuario}/{idVeiculo}:
 *   put:
 *     summary: Atualiza um vínculo entre usuário e veículo
 *     description: Atualiza as informações de um vínculo existente.
 *     tags:
 *       - Usuário veículo
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idVeiculo
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioVeiculoUpdateRequest'
 *     responses:
 *       200:
 *         description: Vínculo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioVeiculoResponse'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Vínculo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

// atualiza um vínculo
router.put('/v1/car-assist/usuario-veiculo/:idUsuario/:idVeiculo', cors(), bodyParserJSON, async (req, res) => {
   
    let dadosBody = req.body

    let idUsuario = req.params.idUsuario

    let idVeiculo = req.params.idVeiculo
    
    let contentType = req.headers['content-type']

    let result = await controllerUV.atualizerVinculo(dadosBody, contentType, idUsuario, idVeiculo)

    res.status(result.status_code).json(result)
})


/**
 * @swagger
 * /v1/car-assist/usuario-veiculo/{idUsuario}/{idVeiculo}:
 *   delete:
 *     summary: Remove um vínculo entre usuário e veículo
 *     description: Remove o vínculo entre um usuário e um veículo pelos IDs informados.
 *     tags:
 *       - Usuário veículo
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idVeiculo
 *         required: true
 *         description: ID do veículo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vínculo removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/SUCCESS_DELETE'
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

// deletar um vínculo usando o id do usuário e id do veículo
router.delete('/v1/car-assist/usuario-veiculo/:idUsuario/:idVeiculo', cors(), async (req, res) => {

    let idUsuario = req.params.idUsuario

    let idVeiculo = req.params.idVeiculo
    
    let result = await controllerUV.deletarVinculo(idUsuario, idVeiculo)

    res.status(result.status_code).json(result)
})

//Export do router
module.exports = router