import { useContext, useRef } from 'react';
import './Login.css';
import { loginContext } from './App.jsx';
import { fetchWithBody } from './function.js';
import {
  Box,
  Button,
  CssBaseline,
  FormLabel,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import MuiCard from '@mui/material/Card';

import {  useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';

function Login() {
  const { isLogin, setIsLogin, userInfo, setUserInfo } =
    useContext(loginContext);
  const navigate = useNavigate();

  const refUser = useRef(null);
  const refPass = useRef(null);

  async function login() {
    fetchWithBody('/api/auth/login', 'post', {
      userName: refUser.current.value,
      password: refPass.current.value,
    }).then(({ data }) => {
      console.log(data);
      if (data.userId) {
        setIsLogin(true);
        setUserInfo(data);
        navigate('/home');
      }
    });
  }

  async function signUp() {
    fetchWithBody('/api/auth/new-accounts', 'post', {
      userName: refUser.current.value,
      password: refPass.current.value,
    }).then((data) => console.log(data));
    refUser.current.value = '';
    refPass.current.value = '';
  }

  const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '450px',
    },
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }));

  const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      inset: 0,
      backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      backgroundRepeat: 'no-repeat',
      ...theme.applyStyles('dark', {
        backgroundImage:
          'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      }),
    },
  }));

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between" >
        <Card variant="outlined" sx={{ zIndex: 2 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: '100%',
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',
              mt: '40px',
            }}
          >
            Log in / Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <Box>
              <FormLabel htmlFor="text">ユーザー名</FormLabel>
              <TextField
                type="text"
                placeholder="ユーザー名を入力してください"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={'primary'}
                inputRef={refUser}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <TextField
                placeholder="••••••"
                type="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={'primary'}
                inputRef={refPass}
              />
            </Box>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={login}
              >
                Log In
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={signUp}
              >
                Create New Account
              </Button>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}

export default Login;
