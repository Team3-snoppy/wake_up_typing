const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('./../index');

// router.use('/', (req, res) => {
//   res.send('hello, authRouter');
// });

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await db('users').where('user_name', userName).first();
  if (user.length === 0) {
    return res.status(404).send('ユーザーが見つかりません');
  }
  const hashedPassword = hashPassword(password, user.salt);

  if (hashedPassword !== user.hash) {
    return res.status(404).send('パスワードが違います');
  }

  const sessionId = createSession();
  try {
    await db('users')
      .where('user_name', userName)
      .update('session_id', sessionId);

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax', // クロスサイトリクエスト時のクッキー送信を制御。
    });
    res.cookie('userId', user.id, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });
    res.cookie('userName', userName, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });

    res.status(201).json({ data: 'ログイン成功' });
  } catch {
    res.status(404).send('何かおかしいです。');
  }
});

router.post('/logout', async (req, res) => {
  const { sessionId, userId, userName } = req.cookies;
  try {
    await db('users').where('id', userId).update(`session_id`, null);
    res.clearCookie('sessionId', 'userId', 'userName');
    res.status(201).send('you logged out succesfully!');
  } catch {
    res.status(404).send('cookieの値がおかしいかも');
  }
});

router.post('/new-accounts', async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(404).send('userNameまたはpasswordが受け取れていません。');
  }
  const salt = crypto.randomBytes(6).toString('hex');
  const hashedPassword = hashPassword(password, salt);
  try {
    await db('users').insert({
      user_name: userName,
      hash: hashedPassword,
      salt: salt,
    });
    res.status(201).json({ data: userName });
  } catch {
    res.status(404).send('userNameが重複しているか、何かおかしいです。');
  }
});

function hashPassword(password, salt) {
  return crypto
    .createHash('sha256')
    .update(salt + password)
    .digest('hex'); // hex:16進数
}

function createSession() {
  //時間でセッション切れるようにしたい
  const sessionId = crypto.randomBytes(16).toString('hex'); // ランダムなセッションIDを生成。（セッションハイジャック対策）
  return sessionId;
}

module.exports = router;
