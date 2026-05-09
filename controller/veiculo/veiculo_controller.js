/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de carro
 * Data: 07/05/2026
 * Autor: Guilherme Moreira de Souza
 * Versão: 1.0
 ***********************************************************************************************************************/


//Import da model do DAO do genero    
const veiculoDAO = require('../../model/DAO/veiculo.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarVeiculos = async () => {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultVeiculo = await veiculoDAO.getAllVehicles()

        if (resultVeiculo) {
            if (resultVeiculo.length > 0) {
                MESSAGES.DEFAULT_HEADER.meta.development = 'Guilherme Moreira'
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.data.veiculos = resultVeiculo

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarVeiculoId = async (id) => {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultVeiculo = await veiculoDAO.getVehicleById(Number(id))


            if (resultVeiculo) {
                if (resultVeiculo.length > 0) {
                    MESSAGES.DEFAULT_HEADER.meta.development = 'Guilherme Moreira'
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.data.veiculo = resultVeiculo

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER
    }
}

const inserirVeiculo = async (veiculo, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //validação do tipo de conteúdo
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosVeiculo(veiculo)

            if (!validar) {
                let resultVeiculo = await veiculoDAO.setInsertVehicle(veiculo)

                if (resultVeiculo) {
                    
                    let lastId = await veiculoDAO.getSelectLastId()
                    if (lastId) {
                        veiculo.id = lastId
                        MESSAGES.DEFAULT_HEADER.meta.development = 'Guilherme Moreira'
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.data = veiculo

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER//500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER //500
                }

            } else {
                return validar //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDadosVeiculo = async function (veiculo) {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    // Deixa a cor em Upper Case
    if (veiculo.cor) {
        veiculo.cor = String(veiculo.cor).toUpperCase()
    }

    // Lista de cores permitidas
    const coresPermitidas = [
        'AMARELO', 'AZUL', 'BRANCO', 'CINZA', 'DOURADO',
        'LARANJA', 'MARROM', 'PRATA', 'PRETO', 'ROSA',
        'ROXO', 'VERDE', 'VERMELHO', 'FANTASIA'
    ]

    //Validação de todas as entradas de dados
    if (
        veiculo.placa == '' ||
        veiculo.placa == undefined ||
        veiculo.placa == null ||
        veiculo.placa.length > 10
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Placa incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        veiculo.modelo == '' ||
        veiculo.modelo == undefined ||
        veiculo.modelo == null ||
        veiculo.modelo.length > 50
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Modelo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        veiculo.marca == '' ||
        veiculo.marca == undefined ||
        veiculo.marca == null ||
        veiculo.marca.length > 50
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Marca incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        veiculo.cor == '' ||
        veiculo.cor == undefined ||
        veiculo.cor == null
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Cor incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (!coresPermitidas.includes(veiculo.cor)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Cor inválida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        veiculo.ano == '' ||
        veiculo.ano == undefined ||
        veiculo.ano == null ||
        isNaN(veiculo.ano)
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Ano incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarVeiculos,
    buscarVeiculoId,
    inserirVeiculo
}