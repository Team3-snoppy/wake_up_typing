/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('words').del();
	await knex('words').insert([
		{ category: 1, word: '坊やだからさ' },
		{ category: 1, word: '認めたくないものだな' },
		{ category: 1, word: '見せてもらおうか' },
		{ category: 1, word: '戦いは数だよ' },
		{ category: 1, word: '逃げちゃだめだ' },
		{ category: 1, word: 'まだ終わらんよ' },
		{ category: 1, word: 'アムロ、いきまーす' },
		{ category: 1, word: '見えるぞ、私にも敵が' },
		{ category: 1, word: '時が見える' },
		{ category: 1, word: '堕ちろ、カトンボ' },
		{ category: 1, word: '恥を知れ、俗物！' },
		{ category: 1, word: '戦いは終わったのだ' },
		{ category: 1, word: '私の勝ちだな' },
		{ category: 1, word: 'アレはいいものだ' },
		{ category: 1, word: '測ったな、シャア' },
		{ category: 1, word: 'やらせはせんぞー！' },
		{ category: 1, word: 'こいつ、動くぞ' },
		{ category: 1, word: 'ザクとは違うのだよ' },
		{ category: 1, word: '無駄死にはしない！' },
		{ category: 1, word: 'まだだ、まだ終わらんよ' },
		{ category: 1, word: '命が惜しければ帰れ' },
		{ category: 1, word: '人が人を裁くなんて' },
		{ category: 1, word: '邪魔をするな' },
		{ category: 1, word: '人の心の光だ！' },
		{ category: 1, word: '人間やめるか' },
		{ category: 1, word: '貴様を倒す！' },
		{ category: 1, word: 'シャアが来る' },
		{ category: 1, word: '貴様は甘いんだよ' },
		{ category: 1, word: '戦いは非情さ' },
		{ category: 1, word: 'それが運命だ' },
	]);
};
