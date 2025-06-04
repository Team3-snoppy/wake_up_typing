import { useState, useEffect } from 'react';
import { Text ,Box, HStack} from '@yamada-ui/react';
import { fetchWithoutBody } from '../function.js';

function Score({remainingTime}) {
	const [maxScore, setMaxScore] = useState(0);

	// const date = new Date();
	// const year = date.getFullYear();
	// const month = date.getMonth() + 1;
	// const day = date.getDate();

	const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
	async function getScore() {
		const res = await fetchWithoutBody('/api/records/month', 'get')
		if(res.ok){
			const maxScore = res.data.reduce((accumulator, currentValue) => {
				return Math.max(accumulator, currentValue.game_score);
			}, 0);
			setMaxScore(maxScore);
		}
		
		// .then((data) => {
		// 	const maxScore = data.data.reduce((accumulator, currentValue) => {
		// 		return Math.max(accumulator, currentValue.game_score);
		// 	}, 0);
		// 	setMaxScore(maxScore);
		// });
	}

	useEffect(() => {
		getScore();
	}, []);

	return (
		<HStack justifyContent='space-between'>
			<Text
			color={
				remainingTime <= 3
					? 'red.500'
					: remainingTime <= 10
					? 'orange.400'
					: '#444949'
			}>Count Down：{remainingTime} sec</Text>
			<Text>{monthName}'s highest score：{maxScore}</Text>
		</HStack>
	);
}

export default Score;
