const db = require('./../index');

const authCheck = async (req, res, next) => {
  //リクエストのクッキー情報から、DBのセッションIDと比較。
  //合致すれば、next
  //合致しない場合はエラーを返す
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.status(401).json({ data: 'ログインしていません' });
  }
  const user = await db('users').where('id', sessionId).first();
  if (user.session_id === sessionId) {
    req.user = { userName: user.user_name, userID: user.id };
    next();
  } else {
    return res.status(401).json({ data: 'Authorization, failed' });
  }
};

module.exports = authCheck;
