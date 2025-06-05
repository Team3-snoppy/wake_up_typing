const express = require('express');
const { format } = require('date-fns');
const { ja } = require('date-fns/locale');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const router = express.Router();
const authCheck = require('../middleware/authCheck');
const getMonthData = require('../utils/getMonthData');
const wav = require('wav');
const { PassThrough, Writable } = require('stream');

const API_KEY = process.env.GEMINI_API || null;
const endPoint =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const endPointTTS =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent';

async function saveWaveFile(
  filename,
  pcmData,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
) {
  return new Promise((resolve, reject) => {
    const writer = new wav.FileWriter(filename, {
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    writer.on('finish', resolve);
    writer.on('error', reject);

    writer.write(pcmData);
    writer.end();
  });
}

async function pcmToWavBuffer(
  pcmBuffer,
  { channels = 1, rate = 24000, sampleWidth = 2 } = {}
) {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const passthrough = new PassThrough();
    passthrough.end(pcmBuffer);

    const chunks = [];
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(chunk);
        callback();
      },
    });

    passthrough.pipe(writer).pipe(writable);
    writable.on('finish', () => resolve(Buffer.concat(chunks)));
    writable.on('error', reject);
  });
}

router.use(authCheck);

router.post('/text', async (req, res) => {
  if (!API_KEY) {
    return res.status(404).json({ data: 'API Keyが見つかりません' });
  }
  const resData = await getMonthData(req);
  if (resData.length === 0) {
    return res.status(404).json({ data: '今月のレコードが見つかりません' });
  }

  // プロンプト用データ整形
  const gameScore = JSON.stringify(resData.map((data) => data.game_score));
  const sleepTime = JSON.stringify(resData.map((data) => data.sleep_time));
  const dateJa = JSON.stringify(
    resData.map((data) =>
      format(new Date(data.create_at), 'yyyy年M月d日', { locale: ja })
    )
  ); // DBから取ってきた日付はUTCになっているのでJSTに変換する

  // #TODO 本番に向けた修正
  // const month = format(new Date(), 'yyyy年M月'); // product
  // const today = format(new Date(), 'yyyy年M月d日'); // product
  const month = format(new Date('2025-05-01'), 'yyyy年M月'); //debug
  const today = format(new Date('2025-05-29'), 'yyyy年M月d日'); // debug

  const prompt = `あなたはデータからユーザーの傾向を読み取り、前向きな一言アドバイスを出す、優秀で知的な老執事です。\n以下のデータは、ユーザーの1ヶ月間の「睡眠時間」と「タイピングスコア」です。\nこの情報をもとに、ユーザーに向けた短いフィードバックを4~5文で返してください。\nまた、睡眠時間が足りていない時は心配するとユーザーフレンドリーでいいですね。\nタイピングと睡眠時間の相関からパフォーマンスの維持向上ができるとさらに良いですね。 \n\n【出力ルール】\n- データから「過去との比較」や「今の傾向（向上・下降・安定）」を柔軟に読み取ってください。\n- 今が「月初」「月中」「月末」かを判断して、それに応じたコメントを追加してください。\n- 全体を通して、ポジティブ・やる気が出るような口調にしてください。\n- 出力は4~5文、絵文字を1つまで使ってOKです。\n\n【データ】\n- 期間：${month}\n- 睡眠時間（時間/日）：${sleepTime}\n- ゲームスコア（日別）：${gameScore}\n-記録日：${dateJa}\n今日の日付：${today}`;
  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  // debug　APIを叩きたくない場合は’true’にする
  const maxCount = 3;
  let result;
  for (let count = 1; count <= maxCount; count++) {
    const response = await fetch(`${endPoint}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const geminiData = await response.json();
    result =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || 'No result';

    if (result !== 'No result') {
      break;
    }

    if (count < maxCount) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2sec待機してから再度APIを叩く
    }
  }

  if (result !== 'No result') {
    return res.status(200).json({ data: result });
  } else {
    res.status(500).json({ data: 'No valid response from Gemini' });
  }
});

router.post('/speech', async (req, res) => {
  if (!API_KEY) {
    return res.status(404).json({ data: 'API Keyが見つかりません' });
  }
  const result = req.body.data;
  if (result !== 'No result') {
    const requestTTS = {
      model: 'gemini-2.5-flash-preview-tts',
      contents: [
        { parts: [{ text: `Say in a calm, gentlemanly manner:${result}` }] },
      ],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algieba' },
          },
        },
      },
    };
    const responseTTS = await fetch(`${endPointTTS}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestTTS),
    });
    if(!responseTTS.ok){
      return res.status(responseTTS.status).json({data:'API Error'})
    }
    const responseTTSJson = await responseTTS.json();

    const base64 =
      responseTTSJson.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    const audioBuffer = Buffer.from(base64, 'base64');
    // const filename = 'out.wav';
    // await saveWaveFile(filename, audioBuffer); // debug ローカル保存
    const wavBuffer = await pcmToWavBuffer(audioBuffer);
    return res.status(200).json({
      data: wavBuffer.toString('base64'),
    });
  }
});

module.exports = router;
