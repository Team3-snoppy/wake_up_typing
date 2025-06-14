// import { useState } from 'react'
import { Container } from '@mui/material';
import './Game.css';
import { useState } from 'react';
import GameStart from './GameStart';
import GameEnd from './GameEnd';
import Gaming from './Gaming';

function Game() {

	const [gameState, setGameState] = useState(0);

	return (
		// <div className="gameContainer" onMouseOver={focusTextField}>
		<Container sx={{ mb: '10px' }} maxWidth="xl">
			{gameState === 0 && <GameStart setGameState={setGameState} />}
			{gameState === 1 && <Gaming setGameState={setGameState} gameState={gameState} />}
		</Container>
	);
}

export default Game;
