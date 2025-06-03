import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { fetchWithoutBody } from '../function.js';

function Score() {
	const [maxScore, setMaxScore] = useState(0);

	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	async function getScore() {
		fetchWithoutBody('/api/records/month', 'get').then((data) => {
			const maxScore = data.data.reduce((accumulator, currentValue) => {
				return Math.max(accumulator, currentValue.game_score);
			}, 0);
			setMaxScore(maxScore);
		});
	}

	useEffect(() => {
		getScore();
	}, []);

	return (
		<>
			<Card>Highest score month：{maxScore}</Card>
		</>
	);
}

export default Score;
