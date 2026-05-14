const knex = require("knex");
const knexfile = require("./knexfile.js");

const conexao = knex(knexfile.development);

module.exports = {
    conexao
}