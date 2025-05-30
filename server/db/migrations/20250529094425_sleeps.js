/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('sleeps', function (table) {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.float('sleep_time').notNullable();
    table.date('create_at').notNullable();
    table.foreign('user_id').references('users.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('sleeps');
};
