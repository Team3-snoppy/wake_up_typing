// import { useState } from 'react'
import './App.css';
import Login from './Login.jsx';
import Game from './Game.jsx';
import Score from './Score.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, green, red, yellow } from '@mui/material/colors';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Appbar from './Appbar.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button variant="contained">primary</Button>
        <Button variant="outlined" color="secondary">
          secondary
        </Button>
        <Button variant="text" color="success">
          succes
        </Button>
        <Button variant="contained" color="error">
          error
        </Button>
        <Appbar/>
       
        <div className="appContainer">
          <Login />
          <Game />
          <Score />
        </div>
      </ThemeProvider>
      ;
    </>
  );
}

export default App;
