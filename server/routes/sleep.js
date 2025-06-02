const express = require('express');
const router = express.Router();
const authCheck = require('./../middleware/authCheck');
const db = require('./../index');
router.use(authCheck);

router.post('/', async (req, res) => {
  const { sleepTime, date } = req.body;
  const userId = req.user.id;
  await db('sleeps').insert({
    user_id: userId,
    sleep_time: sleepTime,
    create_at: date,
  });
  try {
    res.status(201).json({ data: 'success sleeptime insert' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: 'Server Error' });
  }
});

module.exports = router;
