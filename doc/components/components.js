const veiculo = require("./veiculo_component.js")

module.exports = {
    components:{
        schemas:{
            ...veiculo,
            
            success: {
                type: "object",
                properties: {
                    status: {
                        type: "boolean",
                        description: "true",
                        example: "true"
                    },
                    status_code: {
                        type: "integer",
                        description: "200",
                        example: "200"
                    },
                    message: {
                        type: "string",
                        description: "Ação realizada com sucesso!!!",
                        example: "Ação realizada com sucesso!!!"
                    }       
                }
            }
        }
    }
}