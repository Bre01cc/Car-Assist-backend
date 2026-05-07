/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao tipo de gasto
 * Data: 05/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerCategoriaGasto = require('../controller/categoria_gasto/categoria_gasto_controller.js')


/**
 * @swagger
 * /v1/car-assist/categoria-gasto:
 *   get:
 *     summary: Retorna todas categoria de gasto.
 *     description: Obtém os dados de todas categoria de gasto específico com base no ID informado.
 *     tags:
 *       - Categoria gastos
 *     responses:
 *       200:
 *         description: Categorias de gastos encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaGastoResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/ResponseApi/ERROR_INTERNAL_SERVER'
 *         
 */

router.get('/v1/car-assist/categoria-gasto', cors(), async (req, res) => {
    let categoria_gasto = await controllerCategoriaGasto.listarTipoCategoria();
    res.status(categoria_gasto.status_code).json(categoria_gasto);
});

/**
 * @swagger
 * /v1/car-assist/categoria-gasto/{id}:
 *   get:
 *     summary: Retorna uma categoria de gasto pelo ID
 *     description: Obtém os dados de uma categoria de gasto específico com base no ID informado.
 *     tags:
 *       - Categoria gastos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria de gasto 
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria de gasto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaGastoResponse'
 *       404:
 *         description: Categoria de gasto não encontrado
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

router.get('/v1/car-assist/categoria-gasto/:id', cors(), async(req,res)=>{
    let idCategoria_gasto = req.params.id;
    let categoria_gasto = await controllerCategoriaGasto.buscarCategoriaId(idCategoria_gasto);
    res.status(categoria_gasto.status_code).json(categoria_gasto);
});

module.exports = router