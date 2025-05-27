/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('score').del();
  await knex('score').insert([
    { user_id: 1, game_score: 50, create_at: new Date() },
  ]);
};
