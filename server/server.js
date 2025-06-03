const express = require('express');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const PORT = 3000;
const app = express();
const authRouter = require('./routes/auth');
const scoreRouter = require('./routes/score');
const sleepsRouter = require('./routes/sleep');
const recordsRouter = require('./routes/record');
const wordRouter = require('./routes/word');
const geminiRouter = require('./routes/gemini.js')

const path = require('path');

app.use(express.static('../front/dist'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/scores', scoreRouter);
app.use('/api/sleeps', sleepsRouter);
app.use('/api/records', recordsRouter);
app.use('/api/words', wordRouter);
app.use('/api/gemini', geminiRouter);

app.listen(PORT, () => {
  console.log(`Surver running on port ${PORT}`);
});
