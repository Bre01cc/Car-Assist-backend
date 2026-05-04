/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao carro
 * Data: 10/04/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

/**
 * @swagger
 * /v1/car-assist/veiculo/{id}:
 *   get:
 *     summary: Retorna um veículo pelo ID
 *     description: Obtém os dados de um veículo específico com base no ID informado.
 *     tags:
 *       -Veículos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do veículo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       404:
 *         description: Veículo não encontrado
 */