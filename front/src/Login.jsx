import { useRef } from 'react';
import './Login.css';

function Login() {
  const refUser = useRef(null);
  const refPass = useRef(null);

  async function login() {
    await fetch('/api/auth/login', {
      method: 'post',
      body: { userName: refUser, password: refPass },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div className="formContainer">
      <div className="inputForm">
        <input ref={refUser} className="input" placeholder="use name"></input>
        <br />
        <input ref={refPass} className="input" placeholder="password"></input>
      </div>
      <div className="submitButton">
        <button className="button" onClick={login}>
          login
        </button>
        <button className="button">sign up</button>
      </div>
    </div>
  );
}

export default Login;
