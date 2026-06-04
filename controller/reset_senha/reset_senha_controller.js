

const crypto = require('crypto');

const generateToken = async () => {

    try {
        //utilizando biblioteca nativa do node pra gerar um token e=hexadecimal
        const token = crypto.randomBytes(64).toString('hex');

        //gerando uma hash e passando para ela o token, por fim gera token que será guardado no banco
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

        return {
            token,
            tokenHash
        }

    } catch (error) {
        return false
    }

}