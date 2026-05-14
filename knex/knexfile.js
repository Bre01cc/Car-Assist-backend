module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      database: 'car_assist_database',
      user: 'root',
      password: '12345678'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};