import { fetchWithoutBody, fetchWithBody } from '../function';
import { useEffect, useContext, useState } from 'react';
import { loginContext } from '../App';
import { useNavigate } from 'react-router';
import { Container, Box, Center, Text, Button, SimpleGrid, GridItem, Stat, StatLabel, StatNumber, StatHelperMessage, StatIcon } from '@yamada-ui/react';
import Chart from './Chart';

const GameEnd = () => {
	const navigate = useNavigate();
	const [ySleepTime, setYSleepTime] = useState(0);
	const [yScore, setYScore] = useState(0);
	const [tSleepTime, setTSleepTime] = useState(0);
	const { count, setCount } = useContext(loginContext);
	const yesterdayData = () => {
		const today = new Date();
		today.setDate(today.getDate() - 1);
		const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
		fetchWithoutBody(`/api/records/${date}`, 'get').then((data) => {
			if (data.data === '指定された日付のレコードが見つかりません') {
				setYSleepTime(0);
				setYScore(0);
			} else {
				setYSleepTime(data.data[0].sleep_time);
				setYScore(data.data[0].game_score);
			}
		});
	};

	const todayData = () => {
		const today = new Date();
		const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
		fetchWithoutBody(`/api/records/${date}`, 'get').then((data) => {
			setTSleepTime(data.data[0].sleep_time);
		});
	};

	const getAdvice = () => {
		fetchWithBody('/api/gemini', 'post').then((data) => console.log(data));
	};

	useEffect(() => {
		fetchWithBody('/api/scores', 'post', {
			gameScore: count,
			date: new Date(),
		});
		todayData();
		yesterdayData();
		getAdvice();
	}, []);

	const backHome = () => {
		setCount(0);
		navigate('/home');
	};

	return (
		<>
			<Box>
				<SimpleGrid w="full" columns={{ base: 2, md: 1 }} gap="md">
					<GridItem>
						<Container>
							<Stat label="TODAY SCORE" number={`${count}pt`} icon={count - yScore > 0 ? 'increase' : 'decrease'} helperMessage={`${Math.abs(count - yScore)}pt more than yesterday`} centerContent />
							<Stat label="TODAY SLEEP" number={`${tSleepTime}h`} icon={tSleepTime - ySleepTime > 0 ? 'increase' : 'decrease'} helperMessage={`${Math.abs(tSleepTime - ySleepTime)}h more than yesterday`} centerContent />
						</Container>
						<Container>
							<Text>MONTH SCORE</Text>
							<Chart />
						</Container>
					</GridItem>
					<GridItem>
						<Text>ONE POINT ADVICE</Text>
						<Container>
							<Text></Text>
						</Container>
					</GridItem>
				</SimpleGrid>
				<Button onClick={backHome}>ホームに戻る</Button>
			</Box>
		</>
	);
};

export default GameEnd;
