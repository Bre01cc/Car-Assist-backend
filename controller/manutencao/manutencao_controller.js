/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL da manutenção
 * Data: 11/05/2026
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const manutencaoDAO = require('../../model/DAO/manutencao.js')

const DEFAULT_MENSAGENS = require('../modulo/config_messages.js')


//Retorna todas as manutenções
const listarManutencao = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {

        let resultManutencao = await manutencaoDAO.getAllMaintenance()

        if (resultManutencao) {

            if (resultManutencao.length > 0) {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.SUCCESS_REQUEST,
                    { manutencoes: resultManutencao }
                )


            } else {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_NOT_FOUND
                )//404
            }

        } else {
            return DEFAULT_MENSAGENS.criarResposta(
                MENSSAGENS.ERROR_NOT_FOUND
            )//404
        }


    } catch (error) {

        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL
        )
    }
}
//Retorna uma manutenção pelo id
const buscarManutencaoId = async (id) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            let resultManutencao = await manutencaoDAO.getMaintenanceById(id)


            if (resultManutencao) {

                if (resultManutencao.length > 0) {
                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.SUCCESS_REQUEST,
                        { manutencao: resultManutencao }
                    )

                } else {

                    return DEFAULT_MENSAGENS.criarResposta(
                        MENSSAGENS.ERROR_NOT_FOUND
                    )

                }

            } else {

                return DEFAULT_MENSAGENS.criarResposta(
                    MENSSAGENS.ERROR_NOT_FOUND
                )
            }
        } else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return DEFAULT_MENSAGENS.criarResposta(
                MENSSAGENS.ERROR_REQUIRED_FIELDS
            )
        }

    } catch (error) {
        return DEFAULT_MENSAGENS.criarResposta(
            MENSSAGENS.ERROR_INTERNAL_SERVER
        )
    }

}

const validarManutencao = (manutencao) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    // Validação da data da manutenção
    if (
        manutencao.data_manutencao == undefined ||
        manutencao.data_manutencao == null ||
        manutencao.data_manutencao == '' ||
        manutencao.data_manutencao.length < 10
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Data da manutenção incorreta]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    // Validação do custo
    else if (
        manutencao.custo == undefined ||
        manutencao.custo == null ||
        manutencao.custo == '' ||
        isNaN(manutencao.custo)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Custo incorreto]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    // Validação da quilometragem
    else if (
        manutencao.quilometragem == undefined ||
        manutencao.quilometragem == null ||
        manutencao.quilometragem == '' ||
        isNaN(manutencao.quilometragem)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Quilometragem incorreta]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    // Validação da oficina (opcional)
    else if (
        manutencao.oficina != undefined &&
        manutencao.oficina != null &&
        manutencao.oficina != '' &&
        manutencao.oficina.length > 100
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Oficina inválida]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    // Validação das observações (opcional)
    else if (
        manutencao.observacoes != undefined &&
        manutencao.observacoes != null &&
        manutencao.observacoes.length > 1000
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Observações inválidas]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    // Validação do tipo de manutenção
    else if (
        manutencao.fk_id_tipo_manutencao == undefined ||
        manutencao.fk_id_tipo_manutencao == null ||
        manutencao.fk_id_tipo_manutencao == '' ||
        isNaN(manutencao.fk_id_tipo_manutencao)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Tipo de manutenção incorreto]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    // Validação do usuário
    else if (
        manutencao.fk_id_usuario == undefined ||
        manutencao.fk_id_usuario == null ||
        manutencao.fk_id_usuario == '' ||
        isNaN(manutencao.fk_id_usuario)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Usuário incorreto]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    // Validação do veículo
    else if (
        manutencao.fk_id_veiculo == undefined ||
        manutencao.fk_id_veiculo == null ||
        manutencao.fk_id_veiculo == '' ||
        isNaN(manutencao.fk_id_veiculo)
    ) {

        MENSAGENS.ERROR_REQUIRED_FIELDS.message += ' [Veículo incorreto]'

        return DEFAULT_MENSAGENS.criarResposta(
            MENSAGENS.ERROR_REQUIRED_FIELDS
        )

    }

    return false
}

module.exports = {
    listarManutencao,
    buscarManutencaoId
}