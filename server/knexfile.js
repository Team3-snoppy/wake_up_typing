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
      user: process.env.POSTGRES_USER || 'user',
      database: process.env.POSTGRES_DB || 'snoppy',
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: { directory: 'db/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: { directory: 'db/seeds' },
  },
};
