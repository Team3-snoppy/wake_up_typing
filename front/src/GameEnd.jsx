import {  Typography } from '@mui/material';

const GameEnd = ({ count }) => {
  return (
    <>
      <Typography>ゲーム終了</Typography>
      <Typography>スコア：{count}</Typography>
    </>
  );
};

export default GameEnd;
