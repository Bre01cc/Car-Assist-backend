/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da Car-Assit
 * Data: 10/04/2026
 * Autot: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

console.log('INICIOU VERSAO 2');
const express = require('express');



const cors       = require('cors');
const bodyParser = require('body-parser');

const bodyParserJSON = bodyParser.json()


const app = express()

const PORT = process.env.PORT || 8080
//Controle de acesso
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

    next()
})

  app.use(cors())
  app.use(express.json())



// Adicionando rota para acessar a documentação da API
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Imports das rotas
const categoriaGastos = require('./routes/categoria_gasto_route.js');
const veiculo = require('./routes/veiculo_route.js');
const usuario = require('./routes/usuario_route.js');
const evidencia = require('./routes/evidencia_route.js');
const tipoServico = require('./routes/tipo_servico_route.js');
const servico = require('./routes/servico_route.js');
const tipoManutencao = require('./routes/tipo_manutecao_route.js');
const manutencao = require('./routes/manuntencao_route.js');
const gasto = require('./routes/gasto_route.js');
const lembrete = require('./routes/lembrete_route.js');
const usuarioVeiculo = require('./routes/usuario_veiculo_route.js');
const endereco = require('./routes/endereco_route.js');
const usuarioServico = require('./routes/usuario_servico_route.js');
const transferencia = require('./routes/transferencia_route.js');
const reset_senha = require('./routes/reset_senha_route.js');

app.use(categoriaGastos);
app.use(veiculo);
app.use(usuario);
app.use(evidencia);
app.use(tipoServico);
app.use(servico);
app.use(tipoManutencao);
app.use(manutencao);
app.use(gasto);
app.use(lembrete);
app.use(usuarioVeiculo);
app.use(endereco);
app.use(usuarioServico);
app.use(transferencia);
app.use(reset_senha);

console.log('DB_HOST:', process.env.DB_HOST)
console.log('DB_USER:', process.env.DB_USER)
console.log('DB_NAME:', process.env.DB_NAME)
//Randando a API na porta definida
app.listen(PORT, () => {
    console.log('API aguardando requisições na porta ' + PORT)
});