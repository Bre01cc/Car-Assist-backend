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
        Veiculo: {
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
        }

      },

    },
  },


  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
