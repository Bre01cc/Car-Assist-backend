//Import do arquivo de configuração da AZURE
const AZURE = require('../modulo/config_upload_azure.js');

//Import da dependencia para realizar uma requisição HTTP pelo node
// const fetch = require('node-fetch').default
const fetch = (...args) => import('node-fetch').then(({default:fetch})=> fetch(...args));


const uploadFiles = async function(file) {
    //Concatena no nome do arquivo data e a hora
    let fileName = Date.now()+file.originalname

    //URL para enviar para o BD
    let urlFile = `https://${AZURE.ACCOUNT}.blob.core.windows.net/${AZURE.CONTAINER}/${fileName}`

    //URL para enviar o arquivo para container da AZURE
    let urlFileToken =`${urlFile}?${AZURE.TOKEN}`

    let response = await fetch(urlFileToken, {
        method: 'PUT',
        headers: {
            'x-ms-blob-type': 'BlockBlob', 
            'Content-Type'  :  'application/octet-stream'
        },
        body: file.buffer
    })
   
    if(response.status == 201){
        return urlFile
    }
    else{
        return false
    }
}

const deleteUploadFiles = async function(fileName) {

     let deleteUrl = `https://${AZURE.ACCOUNT}.blob.core.windows.net/${AZURE.CONTAINER}/${fileName}?${AZURE.TOKEN}`

     let response = await fetch(deleteUrl,{
        method : 'DELETE'
     })
   
     if(response.status == 202 || response.status == 404){
        return true
     }else{
        return false 
     }

}

module.exports={
    uploadFiles,
    deleteUploadFiles
}