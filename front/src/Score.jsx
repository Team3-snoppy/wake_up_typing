import { useState, useEffect, useContext } from 'react';
import { loginContext } from './App';
import { Box } from '@mui/material';

function Score() {
  const { isLogin } = useContext(loginContext);

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

  if (isLogin) {
    getScore();
  }

  return (
    <>
      <Box>本日の最高得点：{score}</Box>
      {/* <Box sx={}>{score}</Box> */}
    </>
  );
}

export default Score;
