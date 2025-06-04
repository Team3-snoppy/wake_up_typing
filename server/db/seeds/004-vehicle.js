/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('words').insert([
		{ category: 2, word: 'アンドン' },
		{ category: 2, word: 'かんばん' },
		{ category: 2, word: 'カイゼン' },
		{ category: 2, word: 'ムダ' },
		{ category: 2, word: 'ムリ' },
		{ category: 2, word: 'ムラ' },
		{ category: 2, word: 'ポカヨケ' },
		{ category: 2, word: 'ジドウカ' },
		{ category: 2, word: 'タクト' },
		{ category: 2, word: '標準作業' },
		{ category: 2, word: '平準化' },
		{ category: 2, word: '多能工' },
		{ category: 2, word: '省人化' },
		{ category: 2, word: '定位置停止' },
		{ category: 2, word: '後工程引取' },
		{ category: 2, word: '内段取り' },
		{ category: 2, word: '外段取り' },
		{ category: 2, word: '水すまし' },
		{ category: 2, word: 'ジャストインタイム' },
		{ category: 2, word: '５回のなぜ' },
		{ category: 2, word: '歩留まり' },
		{ category: 2, word: '流れ生産' },
		{ category: 2, word: '自工程完結' },
		{ category: 2, word: '工程の流れ化' },
		{ category: 2, word: '標準時間' },
		{ category: 2, word: '指示ビラ' },
		{ category: 2, word: '工程能力' },
		{ category: 2, word: '仕掛品' },
		{ category: 2, word: '現地現物' },
		{ category: 2, word: '５S活動' },
	]);
};
