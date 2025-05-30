import { useState, useContext } from 'react';
import { loginContext } from '../App';
import Card from '@mui/material/Card';
import { fetchWithoutBody } from '../function.js';

function Score() {
  const { isLogin, setDayScores } = useContext(loginContext);

  const [maxScore, setMaxScore] = useState(0);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  async function getScore() {
    fetchWithoutBody(`/api/scores/records/${year}-${month}-${day}`, 'get').then(
      (jsonData) => {
        setDayScores(jsonData);
        const maxScore = jsonData.data.reduce((accumulator, currentValue) => {
          return Math.max(accumulator, currentValue.game_score);
        }, 0);
        setMaxScore(maxScore);
      }
    );
  }

  if (isLogin) {
    getScore();
  }

  return (
    <>
      <Card>Highest score today：{maxScore}</Card>
    </>
  );
}

export default Score;
