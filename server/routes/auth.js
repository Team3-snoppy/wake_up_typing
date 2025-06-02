const express = require('express');
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname,'../.env')})
const router = express.Router();
const crypto = require('crypto');
const db = require('./../index');

const isProduction = process.env.NODE_ENV === 'production';


router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await db('users').where('user_name', userName).first();
  if (!user) {
    return res.status(404).json({ data: 'ユーザーが見つかりません' });
  }
  const hashedPassword = hashPassword(password, user.salt);

  if (hashedPassword !== user.hash) {
    return res.status(404).json({ data: 'パスワードが違います' });
  }

  const expires_at = new Date(Date.now() + 1000 * 60 * 60); // 1000ms×60秒×60分で１時間の期限設定

  const sessionId = createSession();
  try {
    await db('users')
      .where('user_name', userName)
      .update('session_id', sessionId);

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: isProduction, // 開発環境だとfalse、本番環境(HTTPS通信時)ではtrue
      sameSite: 'Lax', // クロスサイトリクエスト時のクッキー送信を制御。
      expires: expires_at,
    });
    // res.cookie('userId', user.id, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'Lax',
    // });
    // res.cookie('userName', userName, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'Lax',
    // });
    res
      .status(201)
      .json({ data: { userId: user.id, userName: user.user_name } });
  } catch {
    res.status(404).json({ data: '何かおかしいです。' });
  }
});

router.post('/logout', async (req, res) => {
  const { userId } = req.cookies;
  try {
    await db('users').where('id', userId).update(`session_id`, null);
    res.clearCookie('sessionId');
    // res.clearCookie('userId');
    // res.clearCookie('userName');
    res.status(201).json({ data: 'you logged out succesfully!' });
  } catch {
    res.status(404).json({ data: 'cookieの値がおかしいかも' });
  }
});

router.post('/new-accounts', async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(404)
      .json({ data: 'userNameまたはpasswordが受け取れていません。' });
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
    res
      .status(404)
      .json({ data: 'userNameが重複しているか、何かおかしいです。' });
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
