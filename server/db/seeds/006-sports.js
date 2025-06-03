/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	// await knex('words').del();
	await knex('words').insert([
		{ category: 4, word: 'ペース保って' },
		{ category: 4, word: 'ラストスパート' },
		{ category: 4, word: '給水忘れずに' },
		{ category: 4, word: '呼吸を整えて' },
		{ category: 4, word: '無理しないで' },
		{ category: 4, word: 'ナイスラン！' },
		{ category: 4, word: 'ここから勝負' },
		{ category: 4, word: '自分の走りを' },
		{ category: 4, word: '諦めないで！' },
		{ category: 4, word: '最後まで集中' },
		{ category: 4, word: '一歩ずつ進め' },
		{ category: 4, word: '深呼吸してね' },
		{ category: 4, word: '足元注意して' },
		{ category: 4, word: 'あと少しだよ' },
		{ category: 4, word: '無理せず休憩' },
		{ category: 4, word: 'ナイス登頂！' },
		{ category: 4, word: '山頂までもう少し' },
		{ category: 4, word: '景色サイコー' },
		{ category: 4, word: 'チームで登ろう' },
		{ category: 4, word: '水分補給忘れずに' },
		{ category: 4, word: 'ボール回して' },
		{ category: 4, word: 'いけドライブ！' },
		{ category: 4, word: 'タックル強めに' },
		{ category: 4, word: '走り負けるな' },
		{ category: 4, word: 'ディフェンス集中' },
		{ category: 4, word: '声出してこう！' },
		{ category: 4, word: 'ナイストライ！' },
		{ category: 4, word: '繋げパス！' },
		{ category: 4, word: '砂に負けるな' },
		{ category: 4, word: 'カバー入って！' },
	]);
};
