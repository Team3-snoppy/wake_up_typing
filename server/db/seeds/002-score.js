/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('score').del();
  await knex('score').insert([
    { user_id: 1, game_score: 50, create_at: new Date() },
    { user_id: 1, game_score: 60, create_at: new Date() },
    { user_id: 1, game_score: 70, create_at: new Date() },
    { user_id: 1, game_score: 80, create_at: new Date() },
    { user_id: 1, game_score: 90, create_at: new Date() },
    { user_id: 1, game_score: 100, create_at: new Date() },
    { user_id: 1, game_score: 110, create_at: new Date() },
    { user_id: 1, game_score: 120, create_at: new Date() },
  ]);
};
