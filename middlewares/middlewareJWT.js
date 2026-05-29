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
const createJWT = async function (payLoad) {
    const token = jwt.sign({ userId: payLoad }, SECRET, { expiresIn: EXPIRES })

    return token;
}

//Validaão de autenticidade do JWT (recebe o TOKEN para validação)
// const validateJWT = async function (token) {
//     let status;

//     //Valida a autenticidade do token
//     jwt.verify(token, SECRET, async function (err, decode) {
//         if (err)
//             status = false;
//         else
//             status = true
//     });
//     return status;
// }

const validateJWT = async function (token) {
    try {
        // Tenta abrir o token. Se der erro (expirado ou falso), ele pula pro catch
        jwt.verify(token, SECRET);
        return true; 
    } catch (error) {
        return false;
    }
}

module.exports = {
    createJWT,
    validateJWT
}