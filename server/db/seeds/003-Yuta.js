/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {user_id: 2, word: 'こいつ、動くぞ！'},
    {user_id: 2, word: '親父にもぶたれたことないのに！'},
    {user_id: 2, word: '僕が一番ガンダムを上手く使えるんだ。'},
    {user_id: 2, word: 'アムロ、いきまーす！'},
    {user_id: 2, word: '何故ララァを巻き込んだ？！'},
    {user_id: 2, word: 'たかがメインカメラをやられただけだ。'},
    {user_id: 2, word: 'こんなに嬉しいことはない。'},
    {user_id: 2, word: '認めたくないものだな。'},
    {user_id: 2, word: '当たらなければどうと言うことはない。'},
    {user_id: 2, word: '連邦軍のモビルスーツは化け物か！'},
    {user_id: 2, word: '坊やだからさ。'},
    {user_id: 2, word: '私にも敵が見える！'},
    {user_id: 2, word: '弾幕薄いぞ！何やってんの！'},
    {user_id: 2, word: '悲しいけどコレ、戦争なのよね！'},
    {user_id: 2, word: 'あえて言おう、カスであると！'},
    {user_id: 2, word: 'やらせはせんぞー！'},
    {user_id: 2, word: '測ったな、シャア！'},
    {user_id: 2, word: 'ザクとは違うのだよ、ザクとは！'},
    {user_id: 2, word: 'アレはいいものだ。'},
    {user_id: 2, word: '時が見える。'},
    {user_id: 2, word: '嘘だと言ってよ、バーニィ！'},
    {user_id: 2, word: '銃身が焼けるまで撃ち続けてやる！'},
    {user_id: 2, word: 'ソロモンよ！私は帰ってきた！'},
    {user_id: 2, word: 'そんな大人、修正してやる！'},
    {user_id: 2, word: 'まだ終わらんよ！'},
    {user_id: 2, word: '堕ちろ、蚊トンボ！'},
    {user_id: 2, word: '恥を知れ、俗物！'},
    {user_id: 2, word: 'ニューガンダムは伊達じゃない！'},
    {user_id: 2, word: 'おかしいですよ、カテジナさん！'},
  ]);
};
