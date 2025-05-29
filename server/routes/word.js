const express = require('express');
const router = express.Router();
const authCheck = require('./../middleware/authCheck');
const db = require('./../index');

// router.use(authCheck);

router.get('/personal', async (req, res) => {
  const { userId } = req.cookies;
  const resData = await db('words').where({ user_id: Number(userId) });
  if (resData.length === 0) {
    return res
      .status(404)
      .json({ data: '指定されたユーザーで登録された単語はありません。' });
  }
  res.status(200).json({ data: resData });
});

module.exports = router;