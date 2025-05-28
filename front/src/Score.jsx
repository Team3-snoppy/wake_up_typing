import { useState, useEffect } from 'react';
import './Score.css';

function Score() {
  const [score, setScore] = useState(0);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  async function getScore() {
    const responce = await fetch(`/api/scores/records/${year}-${month}-${day}`);
    const todayScore = await responce;
    console.log(responce);
    console.log(todayScore);
  }

  useEffect(() => {
    getScore();
  }, []);

  return (
    <div className="scorContainer">
      本日のハイスコア{' '}
      <u>
        <b>{score}</b>
      </u>{' '}
      pt
      <button onClick={getScore}>test</button>
    </div>
  );
}

export default Score;

//  /api/scores/records/:date 指定した日付
