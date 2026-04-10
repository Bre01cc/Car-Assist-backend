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

const PORT = process.PORT || 8080
//Controle de acesso
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', '*')
    
    app.use(cors())

    next()
})

// Documentação do swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));