import { useContext, useRef } from 'react';
import './Login.css';
import { loginContext } from './App.jsx';
import { fetchFn } from './function.js';

function Login() {
  const { isLogin, setIsLogin, userInfo, setUserInfo } =
    useContext(loginContext);

  const refUser = useRef(null);
  const refPass = useRef(null);

  async function login() {
    fetchFn('/api/auth/login', 'post', {
      userName: refUser.current.value,
      password: refPass.current.value,
    }).then(({ data }) => {
      console.log(data);
      if (data.userId) {
        setIsLogin(true);
        setUserInfo(data);
      }
    });
  }

  async function logout() {
    fetchFn('/api/auth/logout', 'post').then((data) => {
      if (data.data === 'you logged out succesfully!') {
        setIsLogin(false);
        setUserInfo({ userId: '', userName: '' });
      }
    });
  }

  async function signUp() {
    fetchFn('/api/auth/new-accounts', 'post', {
      userName: refUser.current.value,
      password: refPass.current.value,
    }).then((data) => console.log(data));
    refUser.current.value = '';
    refPass.current.value = '';
  }

  console.log(userInfo);

  return (
    <div className="formContainer">
      {!isLogin ? (
        <div className="inputForm">
          <input ref={refUser} className="input" placeholder="use name"></input>
          <br />
          <input ref={refPass} className="input" placeholder="password"></input>
        </div>
      ) : (
        ''
      )}
      <div className="submitButton">
        {!isLogin ? (
          <button className="button" onClick={login}>
            login
          </button>
        ) : (
          <button className="button" onClick={logout}>
            logoout
          </button>
        )}
        {!isLogin ? (
          <button className="button" onClick={signUp}>
            sign up
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Login;
