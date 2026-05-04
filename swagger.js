module.exports ={
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
      name: 'Veículos',
      description: 'Operações relacionadas a veículos'
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
        }
      },
        apis: ['./routes/*.js'] 
    }
  }
}
