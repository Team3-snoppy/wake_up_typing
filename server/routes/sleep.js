const express = require('express');
const router = express.Router();
const authCheck = require('./../middleware/authCheck');
const db = require('./../index');

router.use(authCheck);

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
