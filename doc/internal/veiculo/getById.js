module.exports ={
    get:{
        tags: ["Veiculo"],
        description:'Retorna o veiculo pelo id',
        parameters:[{
            name: "id",
            in: "",
            description: "Id do veiculo",
            required: true,
            schema:{
                type: "int",
                format: "int64"
            }  
        }],
        responses:{
            200:{
                description: "Reequisição bem sucedida",
                content: {
                    "application/json":{
                        schema:{
                            $ref:{
                                $ref: "#/components/schemas/veiculo"
                            }
                        }
                    }
                }
            }
        }
    }
}