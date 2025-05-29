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
import { useEffect, useRef, useState } from 'react';

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
  const refArray = new Array(
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  );
  // console.log(refArray);

  //問題をセットする。
  const setQuestion = () => {
    const eleIndex = Math.floor(Math.random() * 8);
    const textIndex = Math.floor(Math.random() * 3);
    setEleIndex(eleIndex);
    setCorrectText(testText[textIndex]);
    refArray[eleIndex].current.value = testText[textIndex];
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

  return (
    <div className="gameContainer" onMouseOver={focusTextField}>
      <Container maxWidth="xl">
        <Card variant="outlined">
          card
          <CardContent>
            <Grid container spacing={0}>
              <Grid size={3} >
                <TextField
                  variant="standard"
                  type="text"
                  inputRef={refArray['0']}
                >
                  size=3
                </TextField>
              </Grid>
              <Grid size={3} >
                <TextField
                  variant="standard"
                  type="text"
                  inputRef={refArray['1']}
                >
                  size=3
                </TextField>
              </Grid>
              <Grid size={3} >
                <TextField
                  variant="standard"
                  type="text"
                  inputRef={refArray['2']}
                >
                  size=3
                </TextField>
              </Grid>
              <Grid size={3} >
                <TextField
                  variant="standard"
                  type="text"
                  inputRef={refArray['3']}
                >
                  size=3
                </TextField>
              </Grid>
              <Grid size={3} >
                <TextField
                  variant="standard"
                  type="text"
                  inputRef={refArray['4']}
                >
                  size=3
                </TextField>
              </Grid>
              <Grid size={3} >
                <TextField
                  variant="standard"
                  type="text"
                  inputRef={refArray['5']}
                >
                  size=3
                </TextField>
              </Grid>
              <Grid size={3} >
                <TextField
                  variant="standard"
                  type="text"
                  inputRef={refArray['6']}
                >
                  size=3
                </TextField>
              </Grid>
              <Grid size={3} >
                <TextField
                  variant="standard"
                  type="text"
                  inputRef={refArray['7']}
                >
                  size=3
                </TextField>
              </Grid>
            </Grid>
            <Box>
              <TextField
                autoFocus
                fullWidth
                id="standard-basic"
                label="Type sonthing .."
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
      ゲーム画面
    </div>
  );
}

export default Game;
