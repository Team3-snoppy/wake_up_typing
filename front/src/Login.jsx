// import { useState } from 'react'
import './Login.css';

function Login() {
  return (
      <div className='formContainer'>
        <div className="inputForm">
          <input className='input' placeholder='use name'></input>
          <br />
          <input className='input' placeholder='password'></input>
        </div>
        <div className="submitButton">
          <button className='button'>login</button>
          <button className='button'>sign up</button>
        </div>
      </div>
  );
}

export default Login;
