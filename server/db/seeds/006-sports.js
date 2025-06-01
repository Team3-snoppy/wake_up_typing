/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('words').del();
	await knex('words').insert([
		{ category: 3, word: 'ペース保って' },
		{ category: 3, word: 'ラストスパート' },
		{ category: 3, word: '給水忘れずに' },
		{ category: 3, word: '呼吸を整えて' },
		{ category: 3, word: '無理しないで' },
		{ category: 3, word: 'ナイスラン！' },
		{ category: 3, word: 'ここから勝負' },
		{ category: 3, word: '自分の走りを' },
		{ category: 3, word: '諦めないで！' },
		{ category: 3, word: '最後まで集中' },
		{ category: 3, word: '一歩ずつ進め' },
		{ category: 3, word: '深呼吸してね' },
		{ category: 3, word: '足元注意して' },
		{ category: 3, word: 'あと少しだよ' },
		{ category: 3, word: '無理せず休憩' },
		{ category: 3, word: 'ナイス登頂！' },
		{ category: 3, word: '山頂までもう少し' },
		{ category: 3, word: '景色サイコー' },
		{ category: 3, word: 'チームで登ろう' },
		{ category: 3, word: '水分補給忘れずに' },
		{ category: 3, word: 'ボール回して' },
		{ category: 3, word: 'いけドライブ！' },
		{ category: 3, word: 'タックル強めに' },
		{ category: 3, word: '走り負けるな' },
		{ category: 3, word: 'ディフェンス集中' },
		{ category: 3, word: '声出してこう！' },
		{ category: 3, word: 'ナイストライ！' },
		{ category: 3, word: '繋げパス！' },
		{ category: 3, word: '砂に負けるな' },
		{ category: 3, word: 'カバー入って！' },
	]);
};
