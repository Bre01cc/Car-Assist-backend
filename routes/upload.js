const multer     = require('multer');

//configuração para o multer enviar o arquivo de imagem
const storage =  multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads/')
    }
})
// Instância do objeto upload -
const upload = multer();

module.exports = upload
