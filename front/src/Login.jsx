import { useRef, useState } from 'react';
import './Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  // const [widthInput, setWidthInput] = useState('30%');
  // const [widthButton, setButton] = useState('70%');
  // const [loginState, setLoginState] = useState('login');

  const refUser = useRef(null);
  const refPass = useRef(null);

  async function login() {
    console.log(refUser.current.value, refPass.current.value);
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
      .then((data) => console.log(data));
    setIsLogin(true);
  }

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
        <button className="button" onClick={login}>
          {!isLogin ? 'logoin' : 'logout'}
        </button>
        <button className="button">sign up</button>
      </div>
    </div>
  );
}

export default Login;
