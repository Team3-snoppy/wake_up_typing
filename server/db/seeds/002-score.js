/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('score').del();
  await knex('score').insert([
    { user_id: 1, game_score: 50, create_at: new Date() },
    // { user_id: 1, game_score: 60, create_at: new Date() },
    // { user_id: 1, game_score: 70, create_at: new Date() },
  ]);
};

// table.integer('user_id').notNullable();
// table.integer('game_score').notNullable();
// table.datetime('create_at').notNullable();
