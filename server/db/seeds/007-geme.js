exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('words').insert([
		{ category: 5, word: '敵いる' },
		{ category: 5, word: '一人割った' },
		{ category: 5, word: '二人落とした' },
		{ category: 5, word: '起こして' },
		{ category: 5, word: '回復中' },
		{ category: 5, word: 'リロード中' },
		{ category: 5, word: '詰めてる' },
		{ category: 5, word: 'ウルド来るかも' },
		{ category: 5, word: 'バッテある？' },
		{ category: 5, word: '金アーマーある' },
		{ category: 5, word: '物資やばいな' },
		{ category: 5, word: 'パリィ' },
		{ category: 5, word: 'ボス部屋' },
		{ category: 5, word: 'キャラコン' },
		{ category: 5, word: '白霊ありがとう' },
		{ category: 5, word: 'ボス攻略' },
		{ category: 5, word: 'バフかけとくね' },
		{ category: 5, word: 'ハイドしてる' },
		{ category: 5, word: '盾の戦技' },
		{ category: 5, word: '祈祷の書' },
		{ category: 5, word: 'バクスタ' },
		{ category: 5, word: '致命の一撃' },
		{ category: 5, word: '霊体しんだ' },
		{ category: 5, word: '素性は星見です' },
		{ category: 5, word: '装備重量' },
		{ category: 5, word: '弾ない！' },
		{ category: 5, word: 'ボスムーブ' },
		{ category: 5, word: '睡眠瓶' },
		{ category: 5, word: 'ガードカウンター' },
		{ category: 5, word: 'ファストトラベル' },
	]);
};
