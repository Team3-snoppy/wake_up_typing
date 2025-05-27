const path = require('path');
require('dotenv').config(path.resolve(__dirname, '.env'));

const knex = require('knex');
const knexConfig = require('./knexfile')[process.env.NODE_ENV];

module.exports = knex(knexConfig);
