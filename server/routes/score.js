const express = require('express');
const router = express.Router();
const authCheck = require('./../middleware/authCheck');
const db = require('./../index');
router.use(authCheck);

router.post('/', async (req, res) => {
  const { gameScore, date } = req.body;
  const userId = req.user.id;
  await db('score').insert(
    {
      user_id: userId,
      game_score: gameScore,
      create_at: date,
    }
  );
  try {
    res.status(201).json({ data: "success score insert" });
  } catch(error) {
    console.log(error);
    res.status(500).json({ data: 'Server Error' });
  }
});

module.exports = router;
