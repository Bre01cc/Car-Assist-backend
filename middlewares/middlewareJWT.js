/***********************************************************************************************************************
 * Objetivo: Implementaão do JWT no projeto Car-Assist
 * Data: 28/05/2026
 * Autot: Guilherme Moreira de Souza
 * Versão: 1.0
 ***********************************************************************************************************************/

const jwt = require('jsonwebtoken')
//Chave secreta para criaão do jwt
const SECRET = '5618527411f4dcd5854d24ec945fa24e9609a403e5ba5b2e2c86e7790a5e209c'

//Tempo para validar o token JWT (segundos)
const EXPIRES = 60

//Criação do JWT (retorna um TOKEN)
const createJWT = async function(payLoad) {
    const token = jwt.sign({userId: payLoad}, SECRET, {expiresIN: EXPIRES})

    return token;
}

//Validaão de autenticidade do JWT (recebe o TOKEN para validação)
const validateJWT = async function(token) {
    let status = false;

    //Valida a autenticidade do token
    jwt.verify(token, SECRET, async function (err, decode) {

        if (!err)
            status = true;

        return status;
    });
}

module.exports = {
    createJWT,
    validateJWT
}