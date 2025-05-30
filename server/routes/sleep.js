const express = require('express');
const router = express.Router();
const authCheck = require('./../middleware/authCheck');
const db = require('./../index');

router.use(authCheck);

router.get('/all_records', async (req, res) => {
  const { userId } = req.cookies;
  const resData = await db('sleeps').where({ user_id: Number(userId) });
  if (!resData) {
    return res.status(404).json({ data: '睡眠レコードが見つかりません' });
  }
  res.status(200).json({ data: resData });
});

router.post('/', async (req, res) => {
  const { sleepTime, date } = req.body;
  const { userId } = req.cookies;
  console.log(userId);
  const resData = await db('sleeps').insert({
    user_id: Number(userId),
    sleep_time: sleepTime,
    create_at: date,
  });
  try {
    res.status(201).json({ data: resData });
  } catch {
    res.status(400).json({ data: 'ボディが適切ではありません。' });
  }
});

module.exports = router;
