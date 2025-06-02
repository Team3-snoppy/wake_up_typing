const express = require('express');
const router = express.Router();
const authCheck = require('./../middleware/authCheck');
const db = require('./../index');

router.use(authCheck);

router.get('/category/:wordID', async (req, res) => {
  const wordID  = req.params.wordID
  const resData = await db('words').where('category','=', wordID);
  if (resData.length === 0) {
    return res
      .status(404)
      .json({ data: '指定されたカテゴリーで登録された単語はありません。' });
  }
  res.status(200).json({ data: resData });
});

module.exports = router;