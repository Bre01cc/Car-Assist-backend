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
            {
                name: "servidor online",
                url: 'http://localhost:8080'
            }
        ],
        tags: [
            {
                name: 'Usuário',
                description: 'Operações relacionadas a usuário'
            },
            {
                name: 'Reset senha',
                description: 'Operações relacionadas ao reset da senha do usuário'
            },
            {
                name: 'Usuário veículo',
                description: 'Operações relacionadas ao Usuário veículo'
            },
            {
                name: 'Usuário serviço',
                description: 'Operações relacionadas ao Usuário serviço'
            },
            {
                name: 'Veículos',
                description: 'Operações relacionadas a veículos'
            },
            {
                name: 'Manutenção',
                description: 'Operações relacionadas a manuntenção'
            },
            {
                name: 'Tipo manutenção',
                description: 'Operações relacionadas a tipo de manutenção'
            },
            {
                name: 'Evidência',
                description: 'Operações relacionadas a evidência de uma manutenção'
            },
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
                name: 'Tipo serviço',
                description: 'Operações relacionadas ao tipo do serviço'
            },
            {
                name: 'Lembretes',
                description: 'Operações relacionadas a lembretes'
            }
        ],
        components: {
            schemas: {
                BaseResponse: {
                    type: 'object',
                    properties: {
                        meta: {
                            type: 'object',
                            properties: {
                                development: {
                                    type: 'string',
                                    example: 'Breno Oliveira Assis Reis'
                                },
                                api_description: {
                                    type: 'string',
                                    example: 'API da Car Assist'
                                },
                                request_date: {
                                    type: 'string',
                                    example: new Date().toISOString()
                                }
                            }
                        },
                        status: {
                            type: 'boolean',
                            example: true
                        },
                        status_code: {
                            type: 'integer',
                            example: 200
                        },
                        data: {
                            type: 'object'
                        }
                    },
                    required: [
                        'meta',
                        'status',
                        'status_code',
                        'data'
                    ]
                },
                UsuarioResponse: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/BaseResponse'
                        },
                        {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'object',
                                    properties: {
                                        usuario: {
                                            type: 'array',
                                            items: {

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
                                                    foto_usuario: {
                                                        type: 'string',
                                                        nullable: true,
                                                        description: 'URL da foto do usuário',
                                                        example: 'https://meusite.com/fotos/usuario1.jpg'
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
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ],
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
                        foto_usuario: {
                            type: 'string',
                            description: 'Foto do usuário',
                            example: 'https://meusite.com/fotos/usuario1.jpg'
                        }
                    },
                    required: [
                        'nome',
                        'email',
                        'cpf',
                        'senha',
                        'foto_usuario'
                    ]
                },
                UsuarioLoginRequest:
                {
                    "type": "object",
                    "properties": {
                        "email": {
                            "type": "string",
                            "description": "Email do usuário",
                            "example": "joao@email.com"
                        },
                        "senha": {
                            "type": "string",
                            "description": "Senha do usuário",
                            "example": "123456"
                        }
                    },
                    "required": [
                        "email",
                        "senha"
                    ]

                },
                UsuarioVeiculoRequest: {
                    type: 'object',
                    properties: {
                        fk_id_usuario: {
                            type: 'integer',
                            description: 'ID do usuário'
                        },
                        fk_id_veiculo: {
                            type: 'integer',
                            description: 'ID do veículo'
                        },
                        papel_usuario: {
                            type: 'string',
                            description: 'Permissão do usuário sobre o veículo',
                            enum: [
                                'Proprietário',
                                'Editor',
                                'Visualizador'
                            ],
                            example: 'Proprietário'
                        },
                        data_vinculo: {
                            type: 'string',
                            format: 'date',
                            description: 'Data em que o vínculo foi criado',
                            example: '2026-06-05'
                        }
                    },
                    required: [
                        'fk_id_usuario',
                        'fk_id_veiculo',
                        'data_vinculo'
                    ]
                },
                UsuarioVeiculoResponse: {
                    type: 'object',
                    properties: {
                        fk_id_usuario: {
                            type: 'integer',
                            description: 'ID do usuário',
                            example: 1
                        },
                        fk_id_veiculo: {
                            type: 'integer',
                            description: 'ID do veículo',
                            example: 1
                        },
                        papel_usuario: {
                            type: 'string',
                            enum: [
                                'Proprietário',
                                'Editor',
                                'Visualizador'
                            ],
                            example: 'Proprietário'
                        },
                        data_vinculo: {
                            type: 'string',
                            format: 'date',
                            example: '2026-06-05'
                        },
                        data_desvinculo: {
                            type: 'string',
                            format: 'date',
                            nullable: true,
                            example: null
                        },
                        is_ativo: {
                            type: 'boolean',
                            example: true
                        }
                    }
                },
                UsuarioVeiculoByUsuarioResponse: {
                    type: 'object',
                    properties: {
                        meta: {
                            type: 'object',
                            properties: {
                                api_description: {
                                    type: 'string',
                                    example: 'API da Car Assist'
                                },
                                request_date: {
                                    type: 'string',
                                    format: 'date-time'
                                },
                                development: {
                                    type: 'string',
                                    example: 'Breno Oliveira Assis Reis'
                                }
                            }
                        },
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
                        },
                        data: {
                            type: 'object',
                            properties: {
                                usuario_veiculo: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id_usuario: {
                                                type: 'integer',
                                                example: 2
                                            },
                                            papel_usuario: {
                                                type: 'string',
                                                enum: [
                                                    'Proprietário',
                                                    'Editor',
                                                    'Visualizador'
                                                ],
                                                example: 'Editor'
                                            },
                                            data_vinculo: {
                                                type: 'string',
                                                format: 'date-time'
                                            },
                                            is_ativo: {
                                                type: 'boolean',
                                                example: true
                                            },
                                            veiculo: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'integer',
                                                        example: 1
                                                    },
                                                    placa: {
                                                        type: 'string',
                                                        example: 'ABC1299'
                                                    },
                                                    modelo: {
                                                        type: 'string',
                                                        example: 'Civic'
                                                    },
                                                    marca: {
                                                        type: 'string',
                                                        example: 'Honda'
                                                    },
                                                    cor: {
                                                        type: 'string',
                                                        example: 'PRETO'
                                                    },
                                                    score: {
                                                        type: 'string',
                                                        example: '100.00'
                                                    },
                                                    ano: {
                                                        type: 'integer',
                                                        example: 2020
                                                    },
                                                    foto: {
                                                        type: 'string',
                                                        example: 'https://uploadcarassist.blob.core.windows.net/uploadcarassist/imagem.png'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                UsuarioVeiculoUpdateRequest: {
                    type: 'object',
                    properties: {
                        papel_usuario: {
                            type: 'string',
                            description: 'Papel do usuário em relação ao veículo',
                            enum: [
                                'Proprietário',
                                'Editor',
                                'Visualizador'
                            ],
                            example: 'Editor'
                        }
                    },
                    required: [
                        'papel_usuario'
                    ]
                },
                UsuarioServicoResponse: {
                    type: 'object',
                    properties: {
                        fk_id_usuario: {
                            type: 'integer',
                            example: 1
                        },
                        fk_id_servico: {
                            type: 'integer',
                            example: 2
                        }
                    }
                },
                UsuarioServicoRequest: {
                    type: 'object',
                    properties: {
                        fk_id_usuario: {
                            type: 'integer',
                            description: 'ID do usuário',
                            example: 1
                        },
                        fk_id_servico: {
                            type: 'integer',
                            description: 'ID do serviço',
                            example: 2
                        }
                    },
                    required: [
                        'fk_id_usuario',
                        'fk_id_servico'
                    ]
                },
                VeiculoResponse: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/BaseResponse'
                        },
                        {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'object',
                                    properties: {
                                        veiculo: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'integer',
                                                        description: 'id',
                                                        example: 3
                                                    },
                                                    modelo: {
                                                        type: 'string',
                                                        description: 'modelo',
                                                        example: 'lancer 1995'
                                                    },
                                                    quilometragem: {
                                                        type: 'integer',
                                                        description: 'quilometragem',
                                                        example: 10000
                                                    },
                                                    score: {
                                                        type: 'integer',
                                                        description: 'score',
                                                        example: 86
                                                    },
                                                    ano: {
                                                        type: 'integer',
                                                        description: 'ano',
                                                        example: 2018
                                                    },
                                                    is_ativo: {
                                                        type: 'boolean',
                                                        description: 'is_ativo',
                                                        example: true
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
                                                    }
                                                },
                                                required: [
                                                    'id',
                                                    'modelo',
                                                    'score',
                                                    'ano',
                                                    'cor'
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
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
                        quilometragem: {
                            type: 'integer',
                            description: 'quilometragem',
                            example: 10000
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
                VeiculoUsuarioRequest: {
                    type: 'object',
                    properties: {
                        id_usuario: {
                            type: 'integer',
                            description: 'ID do usuário proprietário do veículo',
                            example: 1
                        },
                        placa: {
                            type: 'string',
                            example: 'ABC1D23'
                        },
                        modelo: {
                            type: 'string',
                            example: 'Civic'
                        },
                        marca: {
                            type: 'string',
                            example: 'Honda'
                        },
                        cor: {
                            type: 'string',
                            example: 'PRETO'
                        },
                        ano: {
                            type: 'integer',
                            example: 2020
                        },
                        foto_veiculo: {
                            type: 'string',
                            format: 'binary',
                            description: 'Imagem do veículo'
                        }
                    },
                    required: [
                        'id_usuario',
                        'placa',
                        'modelo',
                        'marca',
                        'cor',
                        'ano'
                    ]
                },
                ManutencaoListResponse: {
                    type: 'object',
                    properties: {
                        meta: {
                            type: 'object',
                            properties: {
                                api_description: {
                                    type: 'string',
                                    example: 'API da Car Assist'
                                },
                                request_date: {
                                    type: 'string',
                                    format: 'date-time'
                                },
                                development: {
                                    type: 'string',
                                    example: 'Breno Oliveira Assis Reis'
                                }
                            }
                        },
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
                        },
                        data: {
                            type: 'object',
                            properties: {
                                manutencao: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: {
                                                type: 'integer',
                                                example: 1
                                            },
                                            id_usuario: {
                                                type: 'integer',
                                                example: 1
                                            },
                                            id_veiculo: {
                                                type: 'integer',
                                                example: 1
                                            },
                                            data_manutencao: {
                                                type: 'string',
                                                format: 'date-time'
                                            },
                                            custo: {
                                                type: 'string',
                                                example: '250.00'
                                            },
                                            quilometragem: {
                                                type: 'integer',
                                                example: 50000
                                            },
                                            oficina: {
                                                type: 'string',
                                                example: 'Oficina do Zé'
                                            },
                                            pecas: {
                                                type: 'string',
                                                nullable: true,
                                                example: null
                                            },
                                            observacoes: {
                                                type: 'string',
                                                example: 'Tudo ok'
                                            },
                                            is_ativo: {
                                                type: 'boolean',
                                                example: true
                                            },
                                            data: {
                                                type: 'string',
                                                format: 'date-time'
                                            },
                                            tipo_manutencao: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'integer',
                                                        example: 1
                                                    },
                                                    nome: {
                                                        type: 'string',
                                                        example: 'Troca de óleo'
                                                    }
                                                }
                                            },
                                            evidencia: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        id: {
                                                            type: 'integer',
                                                            example: 1
                                                        },
                                                        url: {
                                                            type: 'string',
                                                            example: 'evidencia1.jpg'
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                ManutencaoRequest: {
                    type: 'object',
                    properties: {
                        id_usuario: {
                            type: 'integer',
                            description: 'ID do usuário responsável pela manutenção',
                            example: 1
                        },
                        id_veiculo: {
                            type: 'integer',
                            description: 'ID do veículo que recebeu a manutenção',
                            example: 1
                        },
                        id_tipo_manutencao: {
                            type: 'integer',
                            description: 'ID do tipo de manutenção',
                            example: 1
                        },
                        data_manutencao: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data em que a manutenção foi realizada',
                            example: '2025-01-20T13:00:00.000Z'
                        },
                        custo: {
                            type: 'number',
                            format: 'float',
                            description: 'Valor gasto na manutenção',
                            example: 250.00
                        },
                        quilometragem: {
                            type: 'integer',
                            description: 'Quilometragem do veículo no momento da manutenção',
                            example: 50000
                        },
                        oficina: {
                            type: 'string',
                            description: 'Nome da oficina onde a manutenção foi realizada',
                            example: 'Oficina do Zé'
                        },
                        pecas: {
                            type: 'string',
                            description: 'Peças utilizadas na manutenção',
                            example: 'Filtro de óleo, óleo 5W30'
                        },
                        observacoes: {
                            type: 'string',
                            description: 'Observações adicionais sobre a manutenção',
                            example: 'Troca realizada sem intercorrências'
                        }
                    },
                    required: [
                        'id_usuario',
                        'id_veiculo',
                        'id_tipo_manutencao',
                        'data_manutencao',
                        'custo',
                        'quilometragem'
                    ]
                },
                TipoManutencaoResponse: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/BaseResponse'
                        },
                        {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'object',
                                    properties: {
                                        tipo_manutencao: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'integer',
                                                        description: 'ID do tipo de manutenção',
                                                        example: 1
                                                    },
                                                    nome: {
                                                        type: 'string',
                                                        description: 'Nome do tipo de manutenção',
                                                        example: 'Troca de óleo'
                                                    },
                                                    valor_score: {
                                                        type: 'integer',
                                                        description: 'Valor que impacta no score do veículo',
                                                        example: 10
                                                    },
                                                    descricao: {
                                                        type: 'string',
                                                        description: 'Descrição do tipo de manutenção',
                                                        example: 'Manutenção preventiva para troca de óleo do motor'
                                                    }
                                                },
                                                required: [
                                                    'id',
                                                    'nome',
                                                    'valor_score'
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                GastosResponse: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/BaseResponse'
                        },
                        {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'object',
                                    properties: {
                                        gastos: {
                                            type: 'array',
                                            items: {
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
                                            }
                                        }
                                    }
                                }
                            }
                        }
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
                    allOf: [
                        {
                            $ref: '#/components/schemas/BaseResponse'
                        },
                        {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'object',
                                    properties: {
                                        categoria_gasto: {
                                            type: 'array',
                                            items: {
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
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                ServicosResponse: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/BaseResponse'
                        },
                        {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'object',
                                    properties: {
                                        servico: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'integer',
                                                        description: 'ID do serviço',
                                                        example: 1
                                                    },
                                                    nome_local: {
                                                        type: 'string',
                                                        description: 'Nome do local',
                                                        example: 'Auto Mecânica Silva'
                                                    },
                                                    tipo_estabelecimento: {
                                                        type: 'string',
                                                        description: 'Tipo do estabelecimento',
                                                        example: 'Oficina'
                                                    },
                                                    latitude: {
                                                        type: 'number',
                                                        format: 'double',
                                                        description: 'Latitude do local',
                                                        example: -23.550520
                                                    },
                                                    longitude: {
                                                        type: 'number',
                                                        format: 'double',
                                                        description: 'Longitude do local',
                                                        example: -46.633308
                                                    },
                                                    fk_id_tipo_servico: {
                                                        type: 'integer',
                                                        description: 'ID do tipo de serviço',
                                                        example: 2
                                                    }
                                                },
                                                required: [
                                                    'id',
                                                    'nome_local',
                                                    'tipo_estabelecimento',
                                                    'latitude',
                                                    'longitude',
                                                    'fk_id_tipo_servico'
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                ServicosRequest: {
                    type: 'object',
                    properties: {
                        nome_local: {
                            type: 'string',
                            description: 'Nome do local',
                            example: 'Auto Mecânica Silva'
                        },
                        tipo_estabelecimento: {
                            type: 'string',
                            description: 'Tipo do estabelecimento',
                            example: 'Oficina'
                        },
                        latitude: {
                            type: 'number',
                            format: 'double',
                            description: 'Latitude do local',
                            example: -23.550520
                        },
                        longitude: {
                            type: 'number',
                            format: 'double',
                            description: 'Longitude do local',
                            example: -46.633308
                        },
                        fk_id_tipo_servico: {
                            type: 'integer',
                            description: 'ID do tipo de serviço',
                            example: 2
                        }
                    },
                    required: [
                        'nome_local',
                        'tipo_estabelecimento',
                        'latitude',
                        'longitude',
                        'fk_id_tipo_servico'
                    ]
                },
                TipoServicoResponse: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/BaseResponse'
                        },
                        {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'object',
                                    properties: {
                                        tipo_servico: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'integer',
                                                        description: 'ID do tipo de serviço',
                                                        example: 1
                                                    },
                                                    nome: {
                                                        type: 'string',
                                                        description: 'Nome do tipo de serviço',
                                                        example: 'Oficina'
                                                    }
                                                },
                                                required: [
                                                    'id',
                                                    'nome'
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                TipoServicoListResponse: {
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
                        },
                        data: {
                            type: 'object',
                            properties: {
                                tipos_servico: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/TipoServicoResponse'
                                    }
                                }
                            }
                        }
                    }
                },
                EnderecosResponse: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/BaseResponse'
                        },
                        {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'object',
                                    properties: {
                                        endereco: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'integer',
                                                        description: 'ID do endereço',
                                                        example: 1
                                                    },
                                                    logradouro: {
                                                        type: 'string',
                                                        description: 'Logradouro (rua, avenida, etc.)',
                                                        example: 'Rua das Flores, 123'
                                                    },
                                                    cep: {
                                                        type: 'string',
                                                        description: 'CEP do endereço',
                                                        example: '06600-000'
                                                    },
                                                    complemento: {
                                                        type: 'string',
                                                        description: 'Complemento do endereço',
                                                        example: 'Apto 12B'
                                                    },
                                                    fk_id_servico: {
                                                        type: 'integer',
                                                        description: 'ID do serviço relacionado',
                                                        example: 5
                                                    }
                                                },
                                                required: [
                                                    'id',
                                                    'logradouro',
                                                    'cep',
                                                    'fk_id_servico'
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                EnderecosRequest: {
                    type: 'object',
                    properties: {
                        logradouro: {
                            type: 'string',
                            description: 'Logradouro (rua, avenida, etc.)',
                            example: 'Rua das Flores, 123'
                        },
                        cep: {
                            type: 'string',
                            description: 'CEP do endereço',
                            example: '06600-000'
                        },
                        complemento: {
                            type: 'string',
                            description: 'Complemento do endereço',
                            example: 'Apto 12B'
                        },
                        fk_id_servico: {
                            type: 'integer',
                            description: 'ID do serviço relacionado',
                            example: 5
                        }
                    },
                    required: [
                        'logradouro',
                        'cep',
                        'fk_id_servico'
                    ]
                },
                LembretesResponse: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/BaseResponse'
                        },
                        {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'object',
                                    properties: {
                                        lembrete: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'integer',
                                                        description: 'ID do lembrete',
                                                        example: 1
                                                    },
                                                    titulo: {
                                                        type: 'string',
                                                        description: 'Título do lembrete',
                                                        example: 'Trocar óleo'
                                                    },
                                                    descricao: {
                                                        type: 'string',
                                                        description: 'Descrição do lembrete',
                                                        example: 'Realizar troca de óleo do motor'
                                                    },
                                                    data_criacao: {
                                                        type: 'string',
                                                        format: 'date-time',
                                                        description: 'Data de criação do lembrete',
                                                        example: '2026-05-06T10:00:00Z'
                                                    },
                                                    data_vencimento: {
                                                        type: 'string',
                                                        format: 'date-time',
                                                        description: 'Data de vencimento',
                                                        example: '2026-06-01T12:00:00Z'
                                                    },
                                                    status: {
                                                        type: 'string',
                                                        description: 'Status do lembrete',
                                                        example: 'PENDENTE'
                                                    },
                                                    fk_id_veiculo: {
                                                        type: 'integer',
                                                        description: 'ID do veículo',
                                                        example: 3
                                                    },
                                                    fk_id_usuario: {
                                                        type: 'integer',
                                                        description: 'ID do usuário',
                                                        example: 3
                                                    }
                                                },
                                                required: [
                                                    'id',
                                                    'titulo',
                                                    'descricao',
                                                    'data_criacao',
                                                    'data_vencimento',
                                                    'status',
                                                    'fk_id_veiculo',
                                                    'fk_id_usuario'
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                LembretesRequest: {
                    type: 'object',
                    properties: {
                        titulo: {
                            type: 'string',
                            description: 'Título do lembrete',
                            example: 'Trocar óleo'
                        },
                        descricao: {
                            type: 'string',
                            description: 'Descrição do lembrete',
                            example: 'Realizar troca de óleo do motor'
                        },
                        data_vencimento: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de vencimento',
                            example: '2026-06-01T12:00:00Z'
                        },
                        status: {
                            type: 'string',
                            description: 'Status do lembrete',
                            example: 'PENDENTE'
                        },
                        fk_id_veiculo: {
                            type: 'integer',
                            description: 'ID do veículo',
                            example: 3
                        },
                        fk_id_usuario: {
                            type: 'integer',
                            description: 'ID do usuário',
                            example: 3
                        }
                    },
                    required: [
                        'titulo',
                        'descricao',
                        'data_vencimento',
                        'status',
                        'fk_id_veiculo',
                        'fk_id_usuario'
                    ]
                },
                EvidenciaRequest: {
                    type: 'object',
                    properties: {
                        descricao: {
                            type: 'string',
                            description: 'Descrição da evidência',
                            example: 'Troca de óleo realizada'
                        },
                        fk_id_manutencao: {
                            type: 'integer',
                            description: 'ID da manutenção associada',
                            example: 1
                        },
                        url: {
                            type: 'string',
                            format: 'binary',
                            description: 'Imagem da evidência'
                        }
                    },
                    required: [
                        'fk_id_manutencao',
                        'url'
                    ]
                },
                EvidenciaResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID da evidência',
                            example: 1
                        },
                        descricao: {
                            type: 'string',
                            description: 'Descrição da evidência',
                            example: 'Troca de óleo realizada'
                        },
                        url: {
                            type: 'string',
                            description: 'URL da imagem da evidência',
                            example: 'https://uploadcarassist.blob.core.windows.net/uploadcarassist/evidencia.jpg'
                        },
                        fk_id_manutencao: {
                            type: 'integer',
                            description: 'ID da manutenção associada',
                            example: 1
                        }
                    }
                },
            },
            ResponseApi: {
                ERROR_NOT_FOUND: {
                    allOf: [
                        { $ref: '#/components/schemas/BaseResponse' },
                        {
                            type: 'object',
                            properties: {
                                status: { type: 'boolean', example: false },
                                status_code: { type: 'integer', example: 404 },
                                message: { type: 'string', example: 'Não foram encontrados dados de retorno!!!' },
                                data: { type: 'object', nullable: true, example: null }
                            }
                        }
                    ]
                },
                ERROR_INTERNAL_SERVER: {
                    allOf: [
                        { $ref: '#/components/schemas/BaseResponse' },
                        {
                            type: 'object',
                            properties: {
                                status: { type: 'boolean', example: false },
                                status_code: { type: 'integer', example: 500 },
                                message: { type: 'string', example: 'Não foi possível devido a erros internos no servidor!!!' },
                                data: { type: 'object', nullable: true, example: null }
                            }
                        }
                    ]
                },
                ERROR_REQUIRED_FIELDS: {
                    allOf: [
                        { $ref: '#/components/schemas/BaseResponse' },
                        {
                            type: 'object',
                            properties: {
                                status: { type: 'boolean', example: false },
                                status_code: { type: 'integer', example: 400 },
                                message: { type: 'string', example: 'Não foi possível processar pois existem campos obrigatórios!!!' },
                                data: { type: 'object', nullable: true, example: null }
                            }
                        }
                    ]
                },
                ERROR_CONTENT_TYPE: {
                    allOf: [
                        { $ref: '#/components/schemas/BaseResponse' },
                        {
                            type: 'object',
                            properties: {
                                status: { type: 'boolean', example: false },
                                status_code: { type: 'integer', example: 415 },
                                message: { type: 'string', example: 'Não foi possível processar a requisição o tipo de dados deve ser JSON!!!' },
                                data: { type: 'object', nullable: true, example: null }
                            }
                        }
                    ]
                },
                SUCCESS_REQUEST: {
                    allOf: [
                        { $ref: '#/components/schemas/BaseResponse' },
                        {
                            type: 'object',
                            properties: {
                                status: { type: 'boolean', example: true },
                                status_code: { type: 'integer', example: 200 },
                                message: { type: 'string', example: 'Requisição bem sucedida!!!' },
                                data: { type: 'object', nullable: true, example: null }
                            }
                        }
                    ]
                },
                SUCCESS_DELETE: {
                    allOf: [
                        { $ref: '#/components/schemas/BaseResponse' },
                        {
                            type: 'object',
                            properties: {
                                status: { type: 'boolean', example: true },
                                status_code: { type: 'integer', example: 200 },
                                message: { type: 'string', example: 'Delete realizado com sucesso!!!' },
                                data: { type: 'object', nullable: true, example: null }
                            }
                        }
                    ]
                },
                SUCCESS_UPDATE_ITEM: {
                    allOf: [
                        { $ref: '#/components/schemas/BaseResponse' },
                        {
                            type: 'object',
                            properties: {
                                status: { type: 'boolean', example: true },
                                status_code: { type: 'integer', example: 200 },
                                message: { type: 'string', example: 'Item atualizado com sucesso!!!' },
                                data: { type: 'object', nullable: true, example: null }
                            }
                        }
                    ]
                },
                SUCCESS_CREATED_ITEM: {
                    allOf: [
                        { $ref: '#/components/schemas/BaseResponse' },
                        {
                            type: 'object',
                            properties: {
                                status: { type: 'boolean', example: true },
                                status_code: { type: 'integer', example: 201 },
                                message: { type: 'string', example: 'Item criado com sucesso!!!' },
                                data: { type: 'object', nullable: true, example: null }
                            }
                        }
                    ]
                }
            }
        },
    },

    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;