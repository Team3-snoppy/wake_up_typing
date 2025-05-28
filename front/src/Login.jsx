import { useRef, useState } from 'react';
import './Login.css';

function Login() {
  const [loginForm, setLoginForm] = useState('block');
  const [widthInput, setWidthInput] = useState('30%');
  const [widthButton, setButton] = useState('70%');
  const [loginState, setLoginState] = useState('login');

  const refUser = useRef(null);
  const refPass = useRef(null);

  async function login() {
    console.log(refUser.current.value,refPass.current.value);
    await fetch('/api/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: refUser.current.value, password: refPass.current.value }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
      setLoginForm('none');
      setWidthInput('0%');
      setButton('100%');
      setLoginState('logout');
  }

  return (
    <div className="formContainer">
      <div className="inputForm" style={{width: widthInput}}>
        <input ref={refUser} className="input" placeholder="use name" style={{display: loginForm}}></input>
        <br />
        <input ref={refPass} className="input" placeholder="password" style={{display: loginForm}}></input>
      </div>
      <div className="submitButton" style={{width: widthButton}}>
        <button className="button" onClick={login}>
          {loginState}
        </button>
        <button className="button">sign up</button>
      </div>
    </div>
  );
}

export default Login;
