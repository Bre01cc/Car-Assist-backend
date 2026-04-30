module.exports ={
    Veiculo :{
        type: 'object',
        propenties:{
            id : {type : 'int',description : 'id',exemple: '3' },
            modelo : {type: 'string', description: 'modelo', exemple: 'lancer 1995'},
            score : {type: 'int', description: 'score', exemple: '86'},
            ano : {type: 'int', description: 'ano', exemple: '2018'},
            is_ativo: {type: 'boolean', description: 'is_ativo', exemple: '1'},
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
        }
    }
}