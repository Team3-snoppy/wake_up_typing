const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('./knex');


router.use('/', (req,res)=>{
    res.send('hello, authRouter')
})


router.post('/login', async(req,res)=>{
    const {userName, password} = req.body;
    const user = await db('users').where('user_name', userName).first();
    if (user.length===0){
        return res.status(404).send('ユーザーが見つかりません')
    }
    const hashedPassword = hashPassword(password, user.salt);

    if (hashedPassword!==user.hash){
        return res.status(404).send('パスワードが違います')
    }

    const sessionId =  createSession();
    await db('users').where('user_name', userName).update('session_id', sessionId);

    res.cookie('sessionId',sessionId,{
        httpOnly: true,
        secure: false,
        sameSite: 'Lax', // クロスサイトリクエスト時のクッキー送信を制御。
      })

    res.cookie('userName',cookieObj.userName,{
        httpOnly: true,
        secure: false,
        sameSite: 'Lax', 
      })

      res.status(200).json({data:'ログイン成功'})
})

router.post('/logout', async(req,res)=>{

})

router.post('/new-accounts', async(req,res)=>{

})



function hashPassword(password, salt) {
    return crypto
      .createHash('sha256')
      .update(salt + password)
      .digest('hex');    // hex:16進数
  }

  function createSession() {
    //時間でセッション切れるようにしたい
    const sessionId = crypto.randomBytes(16).toString('hex');    // ランダムなセッションIDを生成。（セッションハイジャック対策）
    return  sessionId;
  }


module.exports=router