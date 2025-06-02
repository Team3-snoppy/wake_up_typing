/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('words').insert([
		{ category: 1, word: 'アンドン' },
		{ category: 1, word: 'かんばん' },
		{ category: 1, word: 'カイゼン' },
		{ category: 1, word: 'ムダ' },
		{ category: 1, word: 'ムリ' },
		{ category: 1, word: 'ムラ' },
		{ category: 1, word: 'ポカヨケ' },
		{ category: 1, word: 'ジドウカ' },
		{ category: 1, word: 'タクト' },
		{ category: 1, word: '標準作業' },
		{ category: 1, word: '平準化' },
		{ category: 1, word: '多能工' },
		{ category: 1, word: '少人化' },
		{ category: 1, word: '定位置停止' },
		{ category: 1, word: '後工程引取' },
		{ category: 1, word: '内段取り' },
		{ category: 1, word: '外段取り' },
		{ category: 1, word: '水すまし' },
		{ category: 1, word: '目で見る管理' },
		{ category: 1, word: '５回のなぜ' },
		{ category: 1, word: '見える化' },
		{ category: 1, word: '流れ生産' },
		{ category: 1, word: '同期化' },
		{ category: 1, word: '作業要素' },
		{ category: 1, word: '標準時間' },
		{ category: 1, word: 'ラインバランス' },
		{ category: 1, word: '工程能力' },
		{ category: 1, word: '品質第一' },
		{ category: 1, word: '現地現物' },
		{ category: 1, word: '５Ｓ活動' },
	]);
};
