const knex = require("knex");
const knexfile = require("./knexfile.js");

const conexao = knex(knexfile);

module.exports = {
    conexao
}