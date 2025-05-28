// Update with your config settings.
const path = require('path');
require('dotenv').config(path.resolve(__dirname, '.env'));

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: { directory: 'db/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'db/migrations',
    },
    seeds: { directory: 'db/seeds' },
  },
};
