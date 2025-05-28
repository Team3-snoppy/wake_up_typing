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
    const todayScore = await responce.json();
    setScore(todayScore.data.game_score);
  }

  useEffect(() => {
    getScore();
  }, []);

  return <div className="scorContainer">{score}</div>;
}

export default Score;
