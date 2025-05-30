const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = 3000;
const app = express();
const authRouter = require('./routes/auth');
const scoreRouter = require('./routes/score');

const sleepsRouter = require('./routes/sleep');

const wordRouter = require('./routes/word');
const path = require('path');


app.use(express.static('../front/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // form からのリクエストを受けるために必要
app.use(cors()); //一旦全てを許可
app.use('/api/auth', authRouter);
app.use('/api/scores', scoreRouter);

app.use('/api/sleeps', sleepsRouter);

app.use('/api/words', wordRouter);


app.listen(PORT, () => {
  console.log(`Surver running on port ${PORT}`);
});
