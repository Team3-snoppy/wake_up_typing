/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('score', function (table) {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.integer('game_score').notNullable();
    table.datetime('create_ar').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('score');
};
