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
		{ category: 1, word: 'やらせはせん' },
		{ category: 1, word: 'まだ終わらんよ' },
		{ category: 1, word: 'アムロ、いきまーす' },
		{ category: 1, word: '私にも敵が見える' },
		{ category: 1, word: '時が見える' },
		{ category: 1, word: '堕ちろ、カトンボ' },
		{ category: 1, word: '恥を知れ、俗物！' },
		{ category: 1, word: '戦いは終わったのだ' },
		{ category: 1, word: 'これが若さか' },
		{ category: 1, word: 'アレはいいものだ' },
		{ category: 1, word: '測ったな、シャア' },
		{ category: 1, word: 'やらせはせんぞー！' },
		{ category: 1, word: 'こいつ、動くぞ' },
		{ category: 1, word: 'ザクとはザクとは違う' },
		{ category: 1, word: '当たらなければ' },
		{ category: 1, word: 'まだだ、まだ' },
		{ category: 1, word: '命が惜しくば' },
		{ category: 1, word: 'あえて言おう' },
		{ category: 1, word: '邪魔をするな' },
		{ category: 1, word: '人の心がわかるか' },
		{ category: 1, word: '人間やめるか' },
		{ category: 1, word: '俺がガンダムだ' },
		{ category: 1, word: 'シャアが来る' },
		{ category: 1, word: 'これが現実だ' },
		{ category: 1, word: 'お前は誰だ' },
		{ category: 1, word: 'それが運命だ' },
	]);
};
