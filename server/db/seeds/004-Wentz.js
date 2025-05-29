/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('words').insert([
    {user_id: 3, word: '今日も頑張ろう'},

  ]);
};
