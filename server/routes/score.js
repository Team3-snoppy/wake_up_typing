const express = require('express');
const router = express.Router();
const authCheck = require('./../middleware/authCheck');
const db = require('./../index');

router.use(authCheck);

router.get('/records/:date', async (req, res) => {
  const date = req.params.date;
  const { userId } = req.cookies;
  const resData = await db('score')
    .where({ user_id: Number(userId), create_at: date })
    .first();
  if (!resData) {
    return res.status(404).send('指定された日付ののレコードが見つかりません');
  }
  res.status(200).json({ data: resData });
});

router.get('/all_records', async (req, res) => {
  const { userId } = req.cookies;
  const resData = await db('score').where({ user_id: Number(userId) });
  if (resData.length === 0) {
    return res.status(404).send('指定された日付ののレコードが見つかりません');
  }
  res.status(200).json({ data: resData });
});

router.post('/', async (req, res) => {
  const { gameScore, date } = req.body;
  const { userId } = req.cookies;
  console.log(gameScore, date, userId);
  const resData = await db('score').insert(
    {
      user_id: Number(userId),
      game_score: gameScore,
      create_at: date,
    },
    ['*'],
    {
      includeTriggerModifications: true,
    }
  );
  try {
    res.status(201).json({ data: resData });
  } catch {
    res.status(400).send('ボディが適切ではありません。');
  }
});

module.exports = router;
