/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('words').insert([
    { user_id: 4, word: 'あなたのドレス、とても素敵ですわ。' },
    { user_id: 4, word: '今日は本当に素晴らしいお天気ですわね。' },
    { user_id: 4, word: 'お茶会にお招きいただき、感謝いたしますわ。' },
    { user_id: 4, word: 'お散歩に行くのが楽しみですわ。' },
    { user_id: 4, word: 'この本は非常に興味深い内容でございますわ。' },
    {
      user_id: 4,
      word: '素晴らしいパフォーマンスでしたわ。感動いたしました。',
    },
    { user_id: 4, word: 'お茶をお淹れいたしますわ。お待ちくださいませ。' },
    { user_id: 4, word: '心温まるお話を聞かせて頂き、感謝も申し上げます。' },
    { user_id: 4, word: 'この場所は本当に美しいですわね。' },
  ]);
};
