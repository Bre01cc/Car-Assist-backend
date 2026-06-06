/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL de Usuário-Veículo
 * Data: 13/05/2026
 * Autores: Nikolas Fernandes
 * Versão: 1.1
 ***********************************************************************************************************************/

const usuarioVeiculoDAO = require('../../model/DAO/usuario_veiculo.js');

const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

// Retorna todos os vínculos
const listarVinculos = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let result = await usuarioVeiculoDAO.getAllUserVehicles();

        if (result) {
            let resultFormatado = result.map(
                usuarioVeiculo => formatarUsuarioVeiculo(usuarioVeiculo)
            )
            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.SUCCESS_REQUEST,
                { vinculos: resultFormatado },
                'Nikolas Fernandes')

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_NOT_FOUND,
                null,
                'Nikolas Fernandes')
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL,
            null,
            'Nikolas Fernandes')
    }

}

//Retorna um viculo pelo id do usuaário
const buscarUsuarioVeiculoIdUsuario = async (idUsuario) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (!isNaN(idUsuario) && idUsuario != null && idUsuario > 0) {

            let resultUsuarioVeiculo = await usuarioVeiculoDAO.getUserVehicleByIDUser(idUsuario);


            if (resultUsuarioVeiculo) {

                if (resultUsuarioVeiculo.length > 0) {


                    let resultFormadato = resultUsuarioVeiculo.map(
                        usuarioVeiculo => formatarUsuarioVeiculo(usuarioVeiculo)
                    );

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { usuario_veiculo: resultFormadato }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

//Retorna um viculo pelo id do usuaário
const buscarUsuarioVeiculoIdUsuarioComIdVeiculo = async (idUsuario,idVeiculo) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (!isNaN(idUsuario) && idUsuario != null && idUsuario > 0) {

            if(!isNaN(idVeiculo) && idVeiculo != null && idUsuario > 0){

            }else{

            }

            let resultUsuarioVeiculo = await usuarioVeiculoDAO.getUserVehicleByIDs(idUsuario,idVeiculo);
        
            if (resultUsuarioVeiculo) {

                if (resultUsuarioVeiculo.length > 0) {


                    let resultFormadato = resultUsuarioVeiculo.map(
                        usuarioVeiculo => formatarUsuarioVeiculo(usuarioVeiculo)
                    );

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { usuario_veiculo: resultFormadato }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID usuário incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}
//Após o cadastro retornar as informações de vinculo
const buscarUsuarioVeiculoIdUsuarioPost = async (idUsuario) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //Validação da chegada do ID
        if (!isNaN(idUsuario) && idUsuario != null && idUsuario > 0) {

            let resultUsuarioVeiculo = await usuarioVeiculoDAO.getSelectLastIdUser(idUsuario);


            if (resultUsuarioVeiculo) {

                if (resultUsuarioVeiculo.length > 0) {

                    let resultFormadato = resultUsuarioVeiculo.map(
                        usuarioVeiculo => formatarUsuarioVeiculoPost(usuarioVeiculo)
                    );

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { usuario_veiculo: resultFormadato }
                    )

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER
        )
    }

}

// Insere um novo vínculo (Proprietário/Editor/Visualizador)
const inserirVinculo = async (dados, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            dados.data_vinculo = new Date()


            let validar = validarVinculo(dados);

            if (!validar) {

                let validarIDs = await buscarUsuarioVeiculoIdUsuarioComIdVeiculo(dados.fk_id_usuario, dados.fk_id_veiculo)
          
                if (validarIDs.status_code != 200) {

                    let result = await usuarioVeiculoDAO.postUserVehicle(dados);

                    if (result) {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_CREATED_ITEM,
                            dados,
                            'Nikolas Fernandes')

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_INTERNAL_SERVER,
                            null,
                            'Nikolas Fernandes')
                    }

                } else {
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_EXISTING
                    )
                }

            } else {

                return validar
            }

        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += '[JSON]'
            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE,
                null,
                'Nikolas Fernandes')
        }

    } catch (error) {
        console.log(error)
        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Nikolas Fernandes')
    }
}

const atualizerVinculo = async (dados,contentType, idUsuario,idVeiculo) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarVinculoPut(dados);

            if (!validar) {

                let validarIDs = await buscarUsuarioVeiculoIdUsuarioComIdVeiculo(idUsuario, idVeiculo)
              
                if (validarIDs.status_code == 200) {

                    dados.fk_id_usuario = idUsuario

                    dados.fk_id_veiculo = idVeiculo

                    let result = await usuarioVeiculoDAO.putUserVehicle(dados);

                    if (result) {


                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_CREATED_ITEM,
                            dados,
                            'Nikolas Fernandes')

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_INTERNAL_SERVER,
                            null,
                            'Nikolas Fernandes')
                    }

                } else {
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND
                    )
                }

            } else {

                return validar
            }

        } else {
             MESSAGES.ERROR_CONTENT_TYPE.message += '[JSON]'
            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE,
                null,
                'Nikolas Fernandes')
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Nikolas Fernandes')
    }
}

// Deleta (Desativa) um vínculo pelo ID composto
const deletarVinculo = async (idUsuario, idVeiculo) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (!isNaN(idUsuario) && !isNaN(idVeiculo)) {

            let result = await usuarioVeiculoDAO.deleteUserVehicle(idUsuario, idVeiculo)

            if (result) {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_DELETE,
                    null,
                    'Nikolas Fernandes')

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND,
                    null,
                    'Nikolas Fernandes')
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[IDs incorretos]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS,
                null,
                'Nikolas Fernandes')
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Nikolas Fernandes')
    }

}

// Validação dos dados de vínculo
const validarVinculo = (dados) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    let papeis = [
        'Proprietário',
        'Editor',
        'Visualizador'
    ]

    if (!dados.fk_id_usuario || isNaN(dados.fk_id_usuario)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Usuário incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Nikolas Fernandes')
    }

    else if (!dados.fk_id_veiculo || isNaN(dados.fk_id_veiculo)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Veículo incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Nikolas Fernandes'
        )
    //Includes valida se algo existe dentro de um array
    } else if (!papeis.includes(dados.papel_usuario) || dados.papel_usuario == null | dados.papel_usuario == undefined) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Papel de Usuário]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Nikolas Fernandes'
        )
    }

    else {

        return false
    }

}

// Validação dos dados de vínculo
const validarVinculoPut = (dados) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    let papeis = [
        'Proprietário',
        'Editor',
        'Visualizador'
    ]

 if (!papeis.includes(dados.papel_usuario) || dados.papel_usuario == null | dados.papel_usuario == undefined) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Papel de Usuário]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Nikolas Fernandes'
        )
    }

    else {

        return false
    }

}

const formatarUsuarioVeiculo = (usuarioVeiculo) => {

    return {
        id_usuario: usuarioVeiculo.id_usuario,
        papel_usuario: usuarioVeiculo.papel_usuario,
        data_vinculo: usuarioVeiculo.data_vinculo,
        is_ativo: usuarioVeiculo.is_ativo,
        veiculo: {
            id: usuarioVeiculo.id_veiculo,
            placa: usuarioVeiculo.placa,
            modelo: usuarioVeiculo.modelo,
            marca: usuarioVeiculo.marca,
            cor: usuarioVeiculo.cor,
            quilometragem:usuarioVeiculo.quilometragem,
            score: usuarioVeiculo.score,
            ano: usuarioVeiculo.ano,
            foto: usuarioVeiculo.foto_veiculo
        }
    }

}


const formatarUsuarioVeiculoPost = (usuarioVeiculo) => {

    return {
        papel_usuario: usuarioVeiculo.papel_usuario,
        data_vinculo: usuarioVeiculo.data_vinculo,
        is_ativo: usuarioVeiculo.is_ativo
    }

}

module.exports = {
    listarVinculos,
    inserirVinculo,
    deletarVinculo,
    buscarUsuarioVeiculoIdUsuario,
    buscarUsuarioVeiculoIdUsuarioPost,
    atualizerVinculo
}