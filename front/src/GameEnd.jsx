import { Typography, Button } from '@mui/material';
import { fetchWithBody } from './function';
import { useEffect, useContext } from 'react';
import { loginContext } from './App';

const GameEnd = ({ count, setGameState }) => {
  const { dayScores } = useContext(loginContext);
  useEffect(() => {
    fetchWithBody('/api/scores', 'post', {
      gameScore: count,
      date: new Date(),
    });
  }, []);

  return (
    <>
      <Typography>ゲーム終了</Typography>
      <Typography>スコア：{count}</Typography>
      <Button onClick={() => setGameState(0)}>ホームに戻る</Button>
    </>
  );
};

export default GameEnd;
