import { useState, createContext } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme.js';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router';
import LoginPage from './Pages/LoginPage.jsx';
import GamePage from './Pages/GamePage.jsx';
import ProtectedRouter from '../router/ProtectedRouter.jsx';

export const loginContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({ userId: '', userName: '' });
  const [dayScores, setDayScores] = useState([]);

  return (
    <>
      <ThemeProvider theme={theme}>
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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<ProtectedRouter />}>
                <Route path="/home" element={<GamePage />} />
              </Route>
              <Route path="/*" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </loginContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
