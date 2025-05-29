// import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import './Game.css';
import { useRef, useState } from 'react';

const testText = ['as', 'zx', 'qw'];

function Game() {
  const [typeText, setTypeText] = useState('');
  const [eleIndex, setEleIndex] = useState(0);
  const [correctText, setCorrectText] = useState('');
  const [count, setCount] = useState(0);
  const textFieldRef = useRef(null);

  const focusTextField = () => {
    textFieldRef.current.focus();
  };

  const gridNumber = 24;
  const gridSize = 2;

  // const refArray = new Array(gridNumber).fill(useRef(null));
  const refArray = new Array(
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  );
  console.log(refArray);

  //問題をセットする。
  const setQuestion = () => {
    const randomIndex = Math.floor(Math.random() * gridNumber);
    const textIndex = Math.floor(Math.random() * 3);
    setEleIndex(randomIndex);
    setCorrectText(testText[textIndex]);
    refArray[randomIndex].current.value = testText[textIndex];
  };
  //入力があったら、正解かどうか確かめて、正解ならスコア＋１して次の問題へ
  const anser = () => {
    console.log('typeText:', typeText, 'correctText:', correctText);

    if (typeText === correctText) {
      console.log('正解です');
      setCount(count + 1);
      refArray[eleIndex].current.value = '';
      textFieldRef.current.value = '';
      setQuestion();
    } else {
      console.log('不正解です');
    }
  };

  const gridEle = new Array(gridNumber).fill('');

  return (
    // <div className="gameContainer" onMouseOver={focusTextField}>
    <Container sx={{ mb: '10px' }} maxWidth="xl" onMouseOver={focusTextField}>
      <Card variant="outlined">
        card
        <CardContent>
          <Grid container spacing={0}>
            {gridEle.map((ele, i) => (
              <Grid key={i} size={gridSize}>
                <TextField
                  disabled
                  variant="standard"
                  type="text"
                  inputRef={refArray[i]}
                >
                  size=3
                </TextField>
              </Grid>
            ))}
          </Grid>
          <Box>
            <TextField
              autoFocus
              fullWidth
              id="standard-basic"
              label="Type something .."
              variant="standard"
              onChange={(e) => {
                setTypeText(e.target.value);
              }}
              inputRef={textFieldRef}
            />
          </Box>
          <Button variant="contained" color="success" onClick={setQuestion}>
            set
          </Button>
          <Button variant="outlined" color="success" onClick={anser}>
            anser
          </Button>
          {count}
        </CardContent>
      </Card>
    </Container>
  );
}

export default Game;
