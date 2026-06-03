/***********************************************************************************************************************
 * Objetivo: Middleware de interceptação e validação de Tokens JWT
 * Data: 29/05/2026
 ***********************************************************************************************************************/

//Receber o token encaminhando nas requisições e solicitar a validação
const verifyJWT = async function (request, response, next) {

    const jwt = require('./middlewareJWT.js')

    //Recebe o token encaminhando no header da requisição
    let token = request.headers['x-access-token'];

    const autenticidadeToken = await jwt.validateJWT(token)

    //Verifica se a requisição será continuada ou se será encerrada
    if(autenticidadeToken)
        next()
    else
        return response.status(401).end()
}

module.exports = { verifyJWT };