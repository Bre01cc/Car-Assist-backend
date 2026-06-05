/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de carro
 * Data: 07/05/2026
 * Autor: Guilherme Moreira de Souza
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import da model do DAO do veiculo  
const veiculoDAO = require('../../model/DAO/veiculo.js');

//Import da controle do usuario_veiculo
const controllerUsuarioVeiculo = require('../usuario_veiculo/usuario_veiculo_controller.js');

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

//Import da controller que faz upload da foto
const UPLOAD = require('../upload/controller_upload_azure.js');

const listarVeiculos = async () => {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let resultVeiculo = await veiculoDAO.getAllVehicles();

        if (resultVeiculo) {

            if (resultVeiculo.length > 0) {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.SUCCESS_REQUEST,
                    { veiculos: resultVeiculo },
                    'Guilherme Moreira de Souza'
                )

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_NOT_FOUND
                ) //404
            }

        } else {

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_INTERNAL_SERVER,
                null,
                'Guilherme Moreira de Souza'
            ) //500
        }
    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Guilherme Moreira de Souza'
        )
    }

}

const buscarVeiculoId = async (id) => {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultVeiculo = await veiculoDAO.getVehicleById(Number(id))

            if (resultVeiculo) {

                if (resultVeiculo.length > 0) {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { veiculo: resultVeiculo },
                        'Guilherme Moreira de Souza'
                    ) //200

                } else {
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND,
                        null,
                        'Guilherme Moreira de Souza'
                    ) //404
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_INTERNAL,
                    null,
                    'Guilherme Moreira de Souza'
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS,
                null,
                'Guilherme Moreira de Souza'
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Guilherme Moreira de Souza'
        )
    }

}

const buscarVeiculoPlaca = async (placa) => {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        if (placa != '' &&
            placa != undefined &&
            placa != null &&
            placa.length < 10) {

            let resultVeiculo = await veiculoDAO.getVeiculoByPlaca(placa)

            if (resultVeiculo) {

                if (resultVeiculo.length > 0) {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.SUCCESS_REQUEST,
                        { veiculo: resultVeiculo },
                        'Guilherme Moreira de Souza'
                    ) //200

                } else {

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_NOT_FOUND,
                        null,
                        'Guilherme Moreira de Souza'
                    ) //404
                }

            } else {

                return DEFAULT_MESSAGES.criarResposta(
                    MESSAGES.ERROR_INTERNAL_SERVER,
                    null,
                    'Guilherme Moreira de Souza'
                )
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Placa incorreta]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_REQUIRED_FIELDS,
                null,
                'Guilherme Moreira de Souza'
            )
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Guilherme Moreira de Souza'
        )
    }

}

const inserirVeiculo = async (veiculo, contentType, foto) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //validação do tipo de conteúdo
        if (String(contentType).toUpperCase().includes('MULTIPART/FORM-DATA')) {

            let validar = await validarDadosVeiculo(veiculo)

            if (!validar) {

                let validarPlaca = await buscarVeiculoPlaca(veiculo.placa)

                if (validarPlaca.status_code != 200) {

                    let urlFoto = await UPLOAD.uploadFiles(foto);

                    if (urlFoto) {

                        veiculo.foto_veiculo = urlFoto

                        let resultVeiculo = await veiculoDAO.setInsertVehicle(veiculo)

                        if (resultVeiculo) {

                            let lastId = await veiculoDAO.getSelectLastId()

                            if (lastId) {

                                veiculo.id = lastId

                                return DEFAULT_MESSAGES.criarResposta(
                                    MESSAGES.SUCCESS_CREATED_ITEM,
                                    { veiculo: veiculo },
                                    'Guilherme Moreira de Souza'
                                )//201

                            } else {

                                return DEFAULT_MESSAGES.criarResposta(
                                    MESSAGES.ERROR_INTERNAL_SERVER,
                                    null,
                                    'Guilherme Moreira de Souza'
                                )//500
                            }

                        } else {

                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.ERROR_INTERNAL_SERVER,
                                null,
                                'Guilherme Moreira de Souza'
                            ) //500
                        }
                    } else {
                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_UPLOAD_IMAGE
                        )
                    }

                } else {
                    MESSAGES.ERROR_EXISTING.message += 'Placa'

                    DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_EXISTING,
                        null,
                        'Guilherme Moreira de Souza'
                    )

                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_EXISTING,
                        null,
                        'Guilherme Moreira de Souza'
                    )
                }
            } else {

                return validar //400
            }

        } else {

            MESSAGES.ERROR_CONTENT_TYPE.message += '[MULTIPART/FORM-DATA]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE,
                null,
                'Guilherme Moreira de Souza'
            ) //415
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Guilherme Moreira de Souza'
        )
    }

}

const inserirVeiculoUsuario = async (veiculo, contentType, foto) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        //validação do tipo de conteúdo
        if (String(contentType).toUpperCase().includes('MULTIPART/FORM-DATA')) {

            let validar = await validarDadosVeiculo(veiculo);

            if (!validar) {

                let validarPlaca = await buscarVeiculoPlaca(veiculo.placa);

                if (validarPlaca.status_code == 200) {

                    MESSAGES.ERROR_EXISTING.message += 'Placa'
                    return DEFAULT_MESSAGES.criarResposta(
                        MESSAGES.ERROR_EXISTING,
                        null,
                        'Guilherme Moreira de Souza'
                    )

                } else {

                    let urlFoto = await UPLOAD.uploadFiles(foto);

                    if (urlFoto) {
                        veiculo.foto_veiculo = urlFoto
                        let resultVeiculo = await veiculoDAO.setInsertVehicle(veiculo);

                        if (resultVeiculo) {

                            let lastId = await veiculoDAO.getSelectLastId();

                            if (lastId) {

                                veiculo.id = lastId.id;

                                if (veiculo.id_usuario != undefined) {


                                    let vinculoObj = {
                                        fk_id_veiculo: veiculo.id,
                                        fk_id_usuario: veiculo.id_usuario,
                                        papel_usuario: "Proprietário",
                                        data_vinculo: new Date().toISOString().split('T')[0]
                                    };

                                    let resultUsuarioVeiculo = await controllerUsuarioVeiculo.inserirVinculo(vinculoObj, 'APPLICATION/JSON');

                                    if (resultUsuarioVeiculo.status_code != 201) {

                                        return DEFAULT_MESSAGES.criarResposta(
                                            MESSAGES.ERROR_RELATION_TABLE
                                        )

                                    } else {

                                        delete veiculo.vinculo

                                        let resultUsuarioVeiculoInfo = await controllerUsuarioVeiculo.buscarUsuarioVeiculoIdUsuarioPost(veiculo.id_usuario)

                                        veiculo.vinculo = resultUsuarioVeiculoInfo.data
                                    }

                                }
                                return DEFAULT_MESSAGES.criarResposta(

                                    MESSAGES.SUCCESS_CREATED_ITEM,
                                    { veiculo: veiculo },
                                    'Guilherme Moreira de Souza'
                                )//201

                            } else {

                                return DEFAULT_MESSAGES.criarResposta(
                                    MESSAGES.ERROR_INTERNAL_SERVER,
                                    null,
                                    'Guilherme Moreira de Souza'
                                )//500
                            }

                        } else {

                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.ERROR_INTERNAL_SERVER,
                                null,
                                'Guilherme Moreira de Souza'
                            ) //500
                        }
                    } else {
                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_UPLOAD_IMAGE
                        )
                    }

                }

            } else {

                return validar //400
            }

        } else {

            MESSAGES.ERROR_CONTENT_TYPE.message += '[MULTIPART/FORM-DATA]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE,
                null,
                'Guilherme Moreira de Souza'
            ) //415
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Guilherme Moreira de Souza'
        )
    }

}

// Atualiza um veículo pelo id
const atualizarVeiculo = async (veiculo, id, contentType, foto) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        // Validação do content-type
        if (String(contentType).toUpperCase().includes('MULTIPART/FORM-DATA')) {

            // Chama a função para validar os dados do veículo
            let validar = await validarDadosVeiculo(veiculo, true);

            if (!validar) {

                // Verifica se o ID existe no banco
                let validarId = await buscarVeiculoId(id);

                if (validarId.status_code == 200) {

                    // Adiciona o ID no objeto
                    veiculo.id = Number(id);

                    if (foto) {

                        if (validarId.data.veiculo[0].foto_veiculo) {

                            let deleteImg = await UPLOAD.deleteUploadFiles(validarId.data.veiculo[0].foto_veiculo.split('/').pop())

                            if (!deleteImg) {

                                return DEFAULT_MESSAGES.criarResposta(
                                    MESSAGES.ERROR_UPLOAD_IMAGE_DELETE,
                                )
                            }
                        }

                        let urlFoto = await UPLOAD.uploadFiles(foto);

                        if (urlFoto) {

                            veiculo.foto_veiculo = urlFoto

                        } else {
                            return DEFAULT_MESSAGES.criarResposta(
                                MESSAGES.ERROR_UPLOAD_IMAGE
                            )
                        }
                    }

                    // Chama a DAO para atualizar
                    let resultVeiculo = await veiculoDAO.putVeiculo(veiculo);

                    if (resultVeiculo) {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.SUCCESS_UPDATE_ITEM,
                            { veiculo: veiculo },
                            'Guilherme Moreira de Souza'
                        )

                    } else {

                        return DEFAULT_MESSAGES.criarResposta(
                            MESSAGES.ERROR_INTERNAL_SERVER,
                            null,
                            'Guilherme Moreira de Souza'
                        )
                    }

                } else {

                    return validarId // retorna erro 400, 404 ou 500
                }

            } else {

                return validar // erro de validação
            }

        } else {

            MESSAGES.ERROR_CONTENT_TYPE.message += '[MULTIPART/FORM-DATA]'

            return DEFAULT_MESSAGES.criarResposta(
                MESSAGES.ERROR_CONTENT_TYPE,
                null,
                'Guilherme Moreira de Souza'
            ) // 415
        }

    } catch (error) {
        console.log(error)
        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_INTERNAL_SERVER,
            null,
            'Guilherme Moreira de Souza'
        )

    }

}

//Desativa um veículo pelo id
const deletarVeiculoId = async (id) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let validarId = await buscarVeiculoId(id);

        if (validarId.status_code == 200) {

            let deletarVeiculo = await veiculoDAO.deleteVeiculo(id);

            if (deletarVeiculo) {

                return DEFAULT_MESSAGES.criarResposta(
                    MENSAGENS.SUCCESS_DELETE,
                    null,
                    'Guilherme Moreira de Souza'
                )
            }

            else {
                return DEFAULT_MESSAGES.criarResposta(
                    MENSAGENS.ERROR_INTERNAL_SERVER,
                    null,
                    'Guilherme Moreira de Souza'
                )
            }

        } else {

            return validarId
        }

    } catch (error) {

        return DEFAULT_MESSAGES.criarResposta(
            MENSAGENS.ERROR_INTERNAL_SERVER,
            null,
            'Guilherme Moreira de Souza'
        )
    }

}

const validarDadosVeiculo = async function (veiculo) {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

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

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Guilherme Moreira de Souza'
        )

    } else if (
        veiculo.modelo == '' ||
        veiculo.modelo == undefined ||
        veiculo.modelo == null ||
        veiculo.modelo.length > 50
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Modelo incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Guilherme Moreira de Souza'
        )

    } else if (
        veiculo.marca == '' ||
        veiculo.marca == undefined ||
        veiculo.marca == null ||
        veiculo.marca.length > 50
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Marca incorreta]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Guilherme Moreira de Souza'
        )

    } else if (
        veiculo.cor == '' ||
        veiculo.cor == undefined ||
        veiculo.cor == null
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Cor incorreta]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Guilherme Moreira de Souza'
        )

    } else if (!coresPermitidas.includes(veiculo.cor)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Cor inválida]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Guilherme Moreira de Souza'
        )

    } else if (
        veiculo.ano == '' ||
        veiculo.ano == undefined ||
        veiculo.ano == null ||
        isNaN(veiculo.ano)
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Ano incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Guilherme Moreira de Souza'
        )

    } else if (
        veiculo.quilometragem == null ||
        veiculo.quilometragem == undefined ||
        veiculo.quilometragem < 0 ||
        veiculo.quilometragem > 9999999
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Quilometragem incorreto]'

        return DEFAULT_MESSAGES.criarResposta(
            MESSAGES.ERROR_REQUIRED_FIELDS,
            null,
            'Guilherme Moreira de Souza'
        )

    }
    else {

        return false
    }

}

module.exports = {
    listarVeiculos,
    buscarVeiculoId,
    inserirVeiculo,
    deletarVeiculoId,
    atualizarVeiculo,
    inserirVeiculoUsuario,
    buscarVeiculoPlaca
}