const db = require('./../index');

const authCheck = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.status(401).json({ data: 'ログインしていません' });
  }
  const user = await db('users').where('session_id', sessionId).first();
  if (!user) {
    return res.status(401).json({ data: 'Authorization, failed' });
  }
  req.user = { name: user.user_name, id: user.id };
  next();
};

module.exports = authCheck;
