import { useState, useEffect, useContext } from 'react';
import { loginContext } from './App';
import Card from '@mui/material/Card';

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
      <Card sx={{ minWidth: 275 }}>Highest score today：{score}</Card>
    </>
  );
}

export default Score;

//front_score git commit　までやる
//mainに戻って pullする
//front_score merge する
//fetchの関数を受け取って使う
