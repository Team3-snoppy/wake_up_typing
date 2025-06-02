const express = require('express');
const router = express.Router();
const authCheck = require('./../middleware/authCheck');
const db = require('./../index');
router.use(authCheck);

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
    res.status(400).json({ data: 'ボディが適切ではありません。' });
  }
});

module.exports = router;
