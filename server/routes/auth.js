const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const router = express.Router();
const crypto = require('crypto');
const authCheck = require('./../middleware/authCheck');
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

  try {
    const sessionId = createSession();
    await db('users')
      .where('user_name', userName)
      .update('session_id', sessionId);

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: isProduction, // 開発環境だとfalse、本番環境(HTTPS通信時)ではtrue
      sameSite: 'Lax', // クロスサイトリクエスト時のクッキー送信を制御。
      expires: expires_at,
    });
    res.status(200).json({ data: 'Success login' });
  } catch {
    res.status(404).json({ data: '何かおかしいです。' });
  }
});

router.post('/logout', authCheck, async (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.status(400).json({ data: 'sessionIDが見つかりません' });
  }
  try {
    await db('users').where('id', req.user.id).update(`session_id`, null);
    res.clearCookie('sessionId');
    res.status(200).json({ data: 'you logged out succesfully!' });
  } catch {
    res.status(500).json({ data: 'Server Error' });
  }
});

router.post('/register', async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(404)
      .json({ data: 'userNameまたはpasswordが受け取れていません。' });
  }
  const salt = crypto.randomBytes(6).toString('hex');
  const hashedPassword = hashPassword(password, salt);

  const sessionId = createSession();
  const expires_at = new Date(Date.now() + 1000 * 60 * 60); // 1000ms×60秒×60分で１時間の期限設定
  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    secure: isProduction, // 開発環境だとfalse、本番環境(HTTPS通信時)ではtrue
    sameSite: 'Lax', // クロスサイトリクエスト時のクッキー送信を制御。
    expires: expires_at,
  });

  try {
    await db('users').insert({
      user_name: userName,
      hash: hashedPassword,
      salt: salt,
      session_id: sessionId,
    });
    res.status(201).json({ data: 'Success Create Account' });
  } catch {
    res.status(404).json({ data: 'userNameが重複しています' });
  }
});

router.get('/myInfo', authCheck, async (req, res) => {
  const id = req.user.id;
  const name = req.user.name;
  return res.status(200).json({ id, name });
});

router.get('/findName',async(req,res) =>{
  const { userName } = req.query;
  console.log("🍣 ~ auth.js:97 ~ router.get ~ userName:", userName);
  const user = await db('users').where('user_name', userName).first();
  if (user) {
    return res.status(400).json({ data: '同じ名前のユーザーが存在しています' });
  }else{
    return res.status(200).json({ data: 'ok' });
  }
})

function hashPassword(password, salt) {
  return crypto
    .createHash('sha256')
    .update(salt + password)
    .digest('hex'); // hex:16進数
}

function createSession() {
  const sessionId = crypto.randomBytes(16).toString('hex'); // ランダムなセッションIDを生成。（セッションハイジャック対策）
  return sessionId;
}

module.exports = router;
