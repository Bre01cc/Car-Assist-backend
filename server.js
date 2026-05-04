/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da Car-Assit
 * Data: 10/04/2026
 * Autot: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const express = require('express')


const cors = require('cors')
const bodyParser = require('body-parser')


const bodyParserJSON = bodyParser.json()


const app = express()

const PORT = process.env.PORT || 8080
//Controle de acesso
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', '*')

    next()
})

  app.use(cors())
  app.use(express.json())

// Documentação do swagger
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.definition));

app.listen(PORT, () => {
    console.log('API aguardando requisições na porta ' + PORT)
});