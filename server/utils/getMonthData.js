const { startOfMonth, endOfMonth, format } = require('date-fns');
const db = require('./../index');

const getMonthData = async (req) => {
  const userId = req.user.id;

  // #TODO 本番に向けた修正
  // const targetDate = new Date();
  const targetDate = new Date('2025-05-01'); // debug用

  const start = format(startOfMonth(targetDate), 'yyyy-MM-dd');
  const end = format(endOfMonth(targetDate), 'yyyy-MM-dd');

  const resData = await db('score')
    .innerJoin('sleeps', function () {
      this.on('score.user_id', '=', 'sleeps.user_id').on(
        'score.create_at',
        '=',
        'sleeps.create_at'
      );
    })
    .where('score.user_id', '=', userId)
    .whereBetween('score.create_at', [start, end])
    .select(
      'score.id',
      'score.user_id',
      'score.game_score',
      'sleeps.sleep_time',
      'score.create_at'
    );
  return resData;
};

module.exports = getMonthData;
