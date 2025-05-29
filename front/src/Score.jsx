import { useState, useEffect, useContext } from 'react';
import { loginContext } from './App';
import Card from '@mui/material/Card';
import { fetchWithoutBody } from './function.js';

function Score() {
  const { isLogin } = useContext(loginContext);

  const [score, setScore] = useState(0);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  async function getScore() {
    const responce = fetchWithoutBody(
      `/api/scores/records/${year}-${month}-${day}`,
      'get'
    ).then((jsonData) => {
      const maxScore = jsonData.data.reduce((accumulator, currentValue) => {
        return Math.max(accumulator, currentValue.game_score);
      }, 0);
      setScore(maxScore);
    });
  }

  if (isLogin) {
    getScore();
  }

  return (
    <>
      <Card>Highest score today：{score}</Card>
    </>
  );
}

export default Score;
