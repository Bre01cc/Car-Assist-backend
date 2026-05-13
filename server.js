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

const veiculoRouter = require('./routes/veiculo_router.js')



// Documentação do swagger
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Imports 
const categoriaGastos = require('./routes/categoria_gasto_route.js');
const veiculo = require('./routes/veiculo_router.js');
const usuario = require('./routes/usuario_router.js');
const evidencia = require('./routes/evidencia_route.js');
const tipoServico = require('./routes/tipo_servico_router.js');
const servico = require('./routes/servico_router.js');
const tipoManutencao = require('./routes/tipo_manutecao_router.js');
const manutencao = require('./routes/manuntencao_router.js');
const pecas = require('./routes/pecas_route.js');
const gasto = require('./routes/gasto_router.js');
const lembrete = require('./routes/lembrete_router.js');
const usuarioVeiculo = require('./routes/usuario_veiculo_router.js');

app.use(categoriaGastos);
app.use(veiculo);
app.use(usuario);
app.use(evidencia);
app.use(tipoServico);
app.use(servico);
app.use(tipoManutencao);
app.use(manutencao);
app.use(pecas);
app.use(gasto);
app.use(lembrete);
app.use(usuarioVeiculo)


app.listen(PORT, () => {
    console.log('API aguardando requisições na porta ' + PORT)
});