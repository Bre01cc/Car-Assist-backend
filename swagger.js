const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Car Assist',
            version: '1.0.0',
            description: 'API de gestão e monitoramento de veículos.',
        },
        servers: [
            {
                name: "servidor local",
                url: 'http://localhost:8080'
            },
        ],
        tags: [
            {
                name: 'Usuário',
                description: 'Operações relacionadas a usuário'
            },
            {
                name: 'Veículos',
                description: 'Operações relacionadas a veículos'
            },
            {
                name: 'Manuntenção',
                description: 'Operações relacionadas a manuntenção'
            }
            ,
            {
                name: 'Gastos',
                description: 'Operações relacionadas a gastos'
            },
            {
                name: 'Categoria gastos',
                description: 'Operações relacionadas a categoria de gastos'
            },
            {
                name: 'Serviço',
                description: 'Operações relacionadas a serviço'
            },
            {
                name: 'Endereço',
                description: 'Operações relacionadas a endereço'
            },
            {
                name: 'Lembretes',
                description: 'Operações relacionadas a lembretes'
            },
            {
                name: 'ChatBot',
                description: 'Operações relacionadas a chatBot'
            }
        ],
        components: {
            schemas: {
                UsuarioResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID do usuário',
                            example: 1
                        },
                        nome: {
                            type: 'string',
                            description: 'Nome do usuário',
                            example: 'João da Silva'
                        },
                        email: {
                            type: 'string',
                            description: 'Email do usuário',
                            example: 'joao@email.com'
                        },
                        cpf: {
                            type: 'string',
                            description: 'CPF do usuário',
                            example: '12345678901'
                        },
                        data_nascimento: {
                            type: 'string',
                            format: 'date',
                            description: 'Data de nascimento do usuário',
                            example: '2000-05-20'
                        },
                        is_ativo: {
                            type: 'boolean',
                            description: 'Indica se o usuário está ativo',
                            example: true
                        }
                    },
                    required: [
                        'id',
                        'nome',
                        'email',
                        'cpf'
                    ]
                },
                UsuarioRequest: {
                    type: 'object',
                    properties: {
                        nome: {
                            type: 'string',
                            description: 'Nome do usuário',
                            example: 'João da Silva'
                        },
                        email: {
                            type: 'string',
                            description: 'Email do usuário',
                            example: 'joao@email.com'
                        },
                        cpf: {
                            type: 'string',
                            description: 'CPF do usuário (somente números)',
                            example: '12345678901'
                        },
                        data_nascimento: {
                            type: 'string',
                            format: 'date',
                            description: 'Data de nascimento do usuário',
                            example: '2000-05-20'
                        },
                        senha: {
                            type: 'string',
                            description: 'Senha do usuário',
                            example: '123456'
                        },
                        is_ativo: {
                            type: 'boolean',
                            description: 'Indica se o usuário está ativo',
                            example: true
                        }
                    },
                    required: [
                        'nome',
                        'email',
                        'cpf',
                        'senha'
                    ]
                },
                VeiculoResponse: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'id', example: 3 },
                        modelo: { type: 'string', description: 'modelo', example: 'lancer 1995' },
                        score: { type: 'integer', description: 'score', example: 86 },
                        ano: { type: 'integer', description: 'ano', example: 2018 },
                        is_ativo: { type: 'boolean', description: 'is_ativo', example: true },
                        cor: {
                            type: 'string',
                            description: 'Cor do veículo',
                            example: 'PRETO',
                            enum: [
                                'AMARELO',
                                'AZUL',
                                'BRANCO',
                                'CINZA',
                                'DOURADO',
                                'LARANJA',
                                'MARROM',
                                'PRATA',
                                'PRETO',
                                'ROSA',
                                'ROXO',
                                'VERDE',
                                'VERMELHO',
                                'FANTASIA'
                            ]
                        }
                    },
                    required: [
                        'id',
                        'modelo',
                        'score',
                        'ano',
                        'cor'
                    ]
                },
                VeiculoRequest: {
                    type: 'object',
                    properties: {
                        placa: {
                            type: 'string',
                            description: 'Placa do veículo',
                            example: 'ABC1D23'
                        },
                        modelo: {
                            type: 'string',
                            description: 'Modelo do veículo',
                            example: 'Lancer 1995'
                        },
                        marca: {
                            type: 'string',
                            description: 'Marca do veículo',
                            example: 'Mitsubishi'
                        },
                        cor: {
                            type: 'string',
                            description: 'Cor do veículo',
                            example: 'PRETO',
                            enum: [
                                'AMARELO',
                                'AZUL',
                                'BRANCO',
                                'CINZA',
                                'DOURADO',
                                'LARANJA',
                                'MARROM',
                                'PRATA',
                                'PRETO',
                                'ROSA',
                                'ROXO',
                                'VERDE',
                                'VERMELHO',
                                'FANTASIA'
                            ]
                        },
                        ano: {
                            type: 'integer',
                            description: 'Ano do veículo',
                            example: 2018
                        },
                        foto_veiculo: {
                            type: 'string',
                            description: 'URL da foto do veículo',
                            example: 'https://meusite.com/imagens/carro.jpg'
                        },
                        is_ativo: {
                            type: 'boolean',
                            description: 'Indica se o veículo está ativo',
                            example: true
                        }
                    },
                    required: [
                        'placa',
                        'modelo',
                        'marca',
                        'cor',
                        'ano'
                    ]
                },
                ManutencaoResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID da manutenção',
                            example: 10
                        },
                        evidencias: {
                            type: 'string',
                            description: 'Evidências da manutenção',
                            example: 'https://img.com/foto1.jpg'
                        },
                        data_manutencao: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data e hora da manutenção',
                            example: '2026-05-05T14:30:00Z'
                        },
                        custo: {
                            type: 'number',
                            format: 'float',
                            description: 'Custo da manutenção',
                            example: 350.75
                        },
                        quilometragem: {
                            type: 'integer',
                            description: 'Quilometragem registrada',
                            example: 85000
                        },
                        pecas: {
                            type: 'string',
                            description: 'Peças utilizadas',
                            example: 'Filtro de óleo, pastilha de freio'
                        },
                        oficina: {
                            type: 'string',
                            description: 'Oficina responsável',
                            example: 'Oficina do João'
                        },
                        observacoes: {
                            type: 'string',
                            description: 'Observações',
                            example: 'Troca preventiva realizada'
                        },
                        is_ativo: {
                            type: 'boolean',
                            description: 'Status da manutenção',
                            example: true
                        },
                        fk_id_tipo_manutencao: {
                            type: 'integer',
                            description: 'ID do tipo de manutenção',
                            example: 1
                        },
                        fk_id_usuario: {
                            type: 'integer',
                            description: 'ID do usuário',
                            example: 2
                        },
                        fk_id_veiculo: {
                            type: 'integer',
                            description: 'ID do veículo',
                            example: 3
                        }
                    },
                    required: [
                        'id',
                        'data_manutencao',
                        'custo',
                        'quilometragem',
                        'fk_id_tipo_manutencao',
                        'fk_id_usuario',
                        'fk_id_veiculo'
                    ]
                },
                ManutencaoRequest: {
                    type: 'object',
                    properties: {
                        evidencias: {
                            type: 'string',
                            description: 'Evidências da manutenção (ex: URL de imagem)',
                            example: 'https://img.com/foto1.jpg'
                        },
                        data_manutencao: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data e hora da manutenção',
                            example: '2026-05-05T14:30:00Z'
                        },
                        custo: {
                            type: 'number',
                            format: 'float',
                            description: 'Custo da manutenção',
                            example: 350.75
                        },
                        quilometragem: {
                            type: 'integer',
                            description: 'Quilometragem do veículo no momento da manutenção',
                            example: 85000
                        },
                        pecas: {
                            type: 'string',
                            description: 'Peças utilizadas',
                            example: 'Filtro de óleo, pastilha de freio'
                        },
                        oficina: {
                            type: 'string',
                            description: 'Nome da oficina',
                            example: 'Oficina do João'
                        },
                        observacoes: {
                            type: 'string',
                            description: 'Observações adicionais',
                            example: 'Troca preventiva realizada'
                        },
                        is_ativo: {
                            type: 'boolean',
                            description: 'Indica se a manutenção está ativa',
                            example: true
                        },
                        fk_id_tipo_manutencao: {
                            type: 'integer',
                            description: 'ID do tipo de manutenção',
                            example: 1
                        },
                        fk_id_usuario: {
                            type: 'integer',
                            description: 'ID do usuário',
                            example: 2
                        },
                        fk_id_veiculo: {
                            type: 'integer',
                            description: 'ID do veículo',
                            example: 3
                        }
                    },
                    required: [
                        'data_manutencao',
                        'custo',
                        'quilometragem',
                        'fk_id_tipo_manutencao',
                        'fk_id_usuario',
                        'fk_id_veiculo'
                    ]
                },
                GastosResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID do gasto',
                            example: 1
                        },
                        tipo_gasto: {
                            type: 'string',
                            description: 'Tipo do gasto',
                            example: 'Combustível'
                        },
                        data_gasto: {
                            type: 'string',
                            format: 'date',
                            description: 'Data do gasto',
                            example: '2026-05-05'
                        },
                        valor: {
                            type: 'number',
                            format: 'float',
                            description: 'Valor do gasto',
                            example: 150.75
                        },
                        fk_id_veiculo: {
                            type: 'integer',
                            description: 'ID do veículo',
                            example: 3
                        },
                        fk_id_categoria: {
                            type: 'integer',
                            description: 'ID da categoria do gasto',
                            example: 2
                        },
                        is_ativo: {
                            type: 'boolean',
                            description: 'Indica se o gasto está ativo',
                            example: true
                        }
                    },
                    required: [
                        'id',
                        'tipo_gasto',
                        'data_gasto',
                        'valor',
                        'fk_id_veiculo',
                        'fk_id_categoria'
                    ]
                },
                GastosRequest: {
                    type: 'object',
                    properties: {
                        tipo_gasto: {
                            type: 'string',
                            description: 'Tipo do gasto',
                            example: 'Combustível'
                        },
                        data_gasto: {
                            type: 'string',
                            format: 'date',
                            description: 'Data do gasto',
                            example: '2026-05-05'
                        },
                        valor: {
                            type: 'number',
                            format: 'float',
                            description: 'Valor do gasto',
                            example: 150.75
                        },
                        fk_id_veiculo: {
                            type: 'integer',
                            description: 'ID do veículo',
                            example: 3
                        },
                        fk_id_categoria: {
                            type: 'integer',
                            description: 'ID da categoria do gasto',
                            example: 2
                        },
                        is_ativo: {
                            type: 'boolean',
                            description: 'Indica se o gasto está ativo',
                            example: true
                        }
                    },
                    required: [
                        'tipo_gasto',
                        'data_gasto',
                        'valor',
                        'fk_id_veiculo',
                        'fk_id_categoria'
                    ]
                },
                CategoriaGastoResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID da categoria de gasto',
                            example: 1
                        },
                        nome_categoria: {
                            type: 'string',
                            description: 'Nome da categoria',
                            example: 'Combustível'
                        }
                    },
                    required: [
                        'id',
                        'nome_categoria'
                    ]
                }
            },
            ResponseApi: {
                ERROR_NOT_FOUND: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'boolean',
                            example: false
                        },
                        status_code: {
                            type: 'integer',
                            example: 404
                        },
                        message: {
                            type: 'string',
                            example: 'Não foram encontrados dados de retorno!!!'
                        }
                    },
                    required: ['status', 'status_code', 'message']
                },
                ERROR_INTERNAL_SERVER_CONTRLOLLER: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'boolean',
                            example: false
                        },
                        status_code: {
                            type: 'integer',
                            example: 500
                        },
                        message: {
                            type: 'string',
                            example: 'Não foi possível devido a erros internos no servidor!!!'
                        }
                    },
                    required: ['status', 'status_code', 'message']
                },
                ERROR_REQUIRED_FIELDS: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'boolean',
                            example: false
                        },
                        status_code: {
                            type: 'integer',
                            example: 400
                        },
                        message: {
                            type: 'string',
                            example: 'Não foi possível processar pois existem campos obrigatórios que devem ser encaminhados e atendidos conforme o desejado!!!'
                        }
                    },
                    required: ['status', 'status_code', 'message']
                },
                ERROR_CONTENT_TYPE: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'boolean',
                            example: false
                        },
                        status_code: {
                            type: 'integer',
                            example: 415
                        },
                        message: {
                            type: 'string',
                            example: 'Não foi possível processar a requisição o tipo de dados enviados no corpo deve ser JSON!!!'
                        }
                    },
                    required: ['status', 'status_code', 'message']
                },
                SUCCESS_REQUEST: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'boolean',
                            example: true
                        },
                        status_code: {
                            type: 'integer',
                            example: 200
                        },
                        message: {
                            type: 'string',
                            example: 'Requisição bem sucedida!!!'
                        }
                    },
                    required: ['status', 'status_code', 'message']
                },
                SUCCESS_DELETE: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'boolean',
                            example: true
                        },
                        status_code: {
                            type: 'integer',
                            example: 200
                        },
                        message: {
                            type: 'string',
                            example: 'Delete realizado com sucesso!!!'
                        }
                    },
                    required: ['status', 'status_code', 'message']
                },
                SUCCESS_UPDATE_ITEM: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'boolean',
                            example: true
                        },
                        status_code: {
                            type: 'integer',
                            example: 200
                        },
                        message: {
                            type: 'string',
                            example: 'Item atualizado com sucesso!!!'
                        }
                    },
                    required: ['status', 'status_code', 'message']
                },
                SUCCESS_CREATED_ITEM: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'boolean',
                            example: true
                        },
                        status_code: {
                            type: 'integer',
                            example: 201
                        },
                        message: {
                            type: 'string',
                            example: 'Item criado com sucesso!!!'
                        }
                    },
                    required: ['status', 'status_code', 'message']
                }

            }

        },
    },


    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
