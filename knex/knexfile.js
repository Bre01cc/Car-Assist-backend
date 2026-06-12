require('dotenv').config()

const config = {
  client: process.env.DB_CLIENT || 'mysql2',

  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false
    }
  },

  pool: {
    min: 2,
    max: 10
  },

  migrations: {
    tableName: 'knex_migrations'
  }
}

// TESTE DE CONEXÃO
const knex = require('knex')(config)

knex.raw('SELECT 1')
  .then(() => {
    console.log('✅ BANCO CONECTADO COM SUCESSO')
  })
  .catch((error) => {
    console.error('❌ ERRO AO CONECTAR NO BANCO')
    console.error(error)
  })

module.exports = config