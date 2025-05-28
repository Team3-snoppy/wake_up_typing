import { useState, useEffect, useContext } from 'react';
import { loginContext } from './App';
import Card from '@mui/material/Card';
import { fetchGetFn } from './function.js';

function Score() {
  const { isLogin } = useContext(loginContext);

  const [score, setScore] = useState(0);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  async function getScore() {
    const responce = fetchGetFn(
      `/api/scores/records/${year}-${month}-${day}`,
      'get'
    ).then((jsonData) => setScore(jsonData.data.game_score));
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
