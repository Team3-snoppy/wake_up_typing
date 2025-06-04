import { useState, createContext } from 'react';
// import './App.css';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme/theme.js';
import { BrowserRouter, Routes, Route } from 'react-router';
import TopPage from './Pages/TopPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import Register from './Pages/RegisterPage.jsx';
import GamePage from './Pages/GamePage.jsx';
import ScorePage from './Pages/ScorePage.jsx';
import SettingPage from './Pages/SettingPage.jsx';
import ProtectedRouter from '../router/ProtectedRouter.jsx';

export const loginContext = createContext();

function App() {
  // const [isLogin, setIsLogin] = useState(false);
  // const [userInfo, setUserInfo] = useState({ id: '', name: '' });
  const [dayScores, setDayScores] = useState(0);
  const [categoryNo, setCategoryNo] = useState('1');
  const [count, setCount] = useState(0);
  const [gameCount, setGameCount] = useState(false);

  return (
    <>
      <loginContext.Provider
        value={{
          // isLogin,
          // setIsLogin,
          // userInfo,
          // setUserInfo,
          dayScores,
          setDayScores,
          categoryNo,
          setCategoryNo,
          count,
          setCount,
          gameCount,
          setGameCount,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/home" element={<ProtectedRouter />}> */}
            <Route path="/home" element={<SettingPage />} />
            <Route path="/game" element={<GamePage />} />
            {/* </Route> */}
            {/* <Route path="/*" element={<TopPage />} /> */}
            <Route path="/gamescore" element={<ScorePage />} />
          </Routes>
        </BrowserRouter>
      </loginContext.Provider>
    </>
  );
}

export default App;
