const express = require('express');
const router = express.Router();
const authCheck = require('./../middleware/authCheck');
const db = require('./../index');
const { startOfMonth, endOfMonth, format } = require('date-fns');
router.use(authCheck);

// こっちを先に書かないと”month”がパスパラメータ扱いになってエラーとなる
router.get('/month', async (req, res) => {
	const userId = req.user.id;
	const targetDate = new Date();
	// const targetDate = new Date('2025-05-01'); // debug用

	const start = format(startOfMonth(targetDate), 'yyyy-MM-dd');
	const end = format(endOfMonth(targetDate), 'yyyy-MM-dd');

	const resData = await db('score')
		.innerJoin('sleeps', function () {
			this.on('score.user_id', '=', 'sleeps.user_id').on('score.create_at', '=', 'sleeps.create_at');
		})
		.where('score.user_id', '=', userId)
		.whereBetween('score.create_at', [start, end])
		.select('score.id', 'score.user_id', 'score.game_score', 'sleeps.sleep_time', 'score.create_at');
	if (resData.length === 0) {
		return res.status(404).json({ data: '今月のレコードが見つかりません' });
	}
	res.status(200).json({ data: resData });
});

router.get('/:date', async (req, res) => {
	const date = req.params.date;
	const userId = req.user.id;
	// create_atはDB保存時も検索時も日付のみでOKだが、取り出す時だけJSのDate型になるのでUTCで帰ってくる
	const resData = await db('score')
		.innerJoin('sleeps', function () {
			this.on('score.user_id', '=', 'sleeps.user_id').on('score.create_at', '=', 'sleeps.create_at');
		})
		.where('score.user_id', '=', userId)
		.where('score.create_at', '=', date)
		.select('score.id', 'score.user_id', 'score.game_score', 'sleeps.sleep_time', 'score.create_at');
	if (resData.length === 0) {
		return res.status(404).json({ data: '指定された日付のレコードが見つかりません' });
	}
	res.status(200).json({ data: resData });
});

module.exports = router;
