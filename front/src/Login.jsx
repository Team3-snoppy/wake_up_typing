import { useRef, useState } from 'react';
import './Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({userId: '', userName: ''});

  const refUser = useRef(null);
  const refPass = useRef(null);

  async function login() {
    await fetch('/api/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: refUser.current.value,
        password: refPass.current.value,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data);
        if (data.userId) {
          setIsLogin(true);
          setUserInfo(data);
        }
      });
  }

  async function logout() {
    await fetch('/api/auth/logout', {
      method: 'post',
    })
      .then((res) => {
        if (res.ok) {
          setIsLogin(false);
          setUserInfo({userId: '', userName: ''});
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  async function signUp() {
    await fetch('/api/auth/new-accounts', {
      method: 'post',
            headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: refUser.current.value,
        password: refPass.current.value,
      }),
    })
    .then(res => res.json())
    .then(data => console.log(data));
    refUser.current.value = '',
     refPass.current.value = '',
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
            logoin
          </button>
        ) : (
          <button className="button" onClick={logout}>
            logoout
          </button>
        )}
        {!isLogin ? <button className="button" onClick={signUp}>sign up</button> : ''}
      </div>
    </div>
  );
}

export default Login;
