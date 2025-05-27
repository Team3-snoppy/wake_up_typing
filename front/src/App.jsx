// import { useState } from 'react'
import './App.css'
import Login from './Login.jsx'
import Game from './Game.jsx'
import Score from './Score.jsx'

function App() {

  return (
    <>
    <h1>仮タイトル</h1>
    <div className='appContainer'>
      <Login />
      <Game />
      <Score />
    </div>
    </>
  )
}

export default App
