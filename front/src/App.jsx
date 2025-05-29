import { useState, createContext } from 'react';
import './App.css';
import Login from './Login.jsx';
import Game from './Game.jsx';
import Score from './Score.jsx';
import { ThemeProvider } from '@mui/material/styles';
import Appbar from './Appbar.jsx';
import theme from '../theme/theme.js';

export const loginContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({ userId: '', userName: '' });
  const [dayScores, setDayScores] = useState([]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Appbar />
        <loginContext.Provider
          value={{
            isLogin,
            setIsLogin,
            userInfo,
            setUserInfo,
            dayScores,
            setDayScores,
          }}
        >
          <div className="appContainer">
            <Login />
            <Game />
            <Score />
          </div>
        </loginContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
