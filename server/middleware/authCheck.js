const db = require('./../index');

const authCheck = async (req, res, next) => {
  //リクエストのクッキー情報から、DBのセッションIDと比較。
  //合致すれば、next
  //合致しない場合はエラーを返す
  const { sessionId, userId } = req.cookies;
  const user = await db('users').where('id', userId).first();
  if (user.session_id === sessionId) {
    next();
  } else {
    return res.status(401).send('Authorization, failed');
  }
};

module.exports = authCheck;
