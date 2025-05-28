import { useRef } from 'react';
import './Login.css';

function Login() {
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
  }

  return (
    <div className="formContainer">
      <div className="inputForm" style={{}}>
        <input ref={refUser} className="input" placeholder="use name" style={{display: 'block'}}></input>
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
