import { fetchWithoutBody } from '../function';
import { useEffect, useContext, useState } from 'react';
import { loginContext } from '../App';
import { useNavigate } from 'react-router';
import { Text, Button, SimpleGrid, GridItem, Stat, Image, Heading, Card, Box, Container } from '@yamada-ui/react';
import Chart from './Chart';
import img from '../assets/advice.png';
import { Volume2Icon } from '@yamada-ui/lucide';
import { HouseIcon } from '@yamada-ui/lucide';

const GameEnd = () => {
	const navigate = useNavigate();
	const [ySleepTime, setYSleepTime] = useState(0);
	const [yScore, setYScore] = useState(0);
	const [tSleepTime, setTSleepTime] = useState(0);
	const [advice, setAdvice] = useState('');
	const [voice, setVoice] = useState(null);

	const { setCount, dayScores } = useContext(loginContext);
	const yesterdayData = () => {
		const today = new Date();
		today.setDate(today.getDate() - 1);
		const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
		fetchWithoutBody(`/api/records/${date}`, 'get').then((data) => {
			if (!data.ok) {
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

	// 本番用
	// const getAdvice = () => {
	// 	fetchWithBody('/api/gemini', 'post').then((data) => {
	// 		setAdvice(data.data);
	// 		setVoice(data.audioBase64);
	// 	});
	// };

	// 試し
	const data = {
		data: 'お疲れ様！5月も終盤だね、ラストスパート頑張ろう🔥\n\n睡眠時間を見ると、ちょっと足りてない日もあるみたいで心配だな。タイピングスコアも睡眠不足の日は少し下がる傾向にあるみたいだから、睡眠時間を意識するとパフォーマンスアップに繋がりそう！\n\n特に、7時間以上寝ている日のスコアは安定しているみたい！\n\n睡眠とタイピング、両方意識して、さらにレベルアップしちゃおう！\n',
		audioBase64: 'fjdksalhfjdkahds;ajdfks;a',
	};

	useEffect(() => {
		todayData();
		yesterdayData();
		setAdvice(data.data);
		setVoice(data.audioBase64);
	}, []);

	const playVoice = () => {
		const audio = new Audio();
		audio.src = `data:audio/wav;base64,${voice}`;
		audio.play();
	};

	const backHome = () => {
		setCount(0);
		navigate('/home');
	};

	return (
		<>
			<Card m="xs" variant="outline" color="#444949">
				<SimpleGrid w="full" columns={{ base: 2, md: 1 }} gap="md">
					<GridItem>
						<Card m="md" variant="outline">
							<SimpleGrid w="full" columns={{ base: 2, md: 1 }} gap="md">
								<Stat label="TODAY SCORE" number={`${dayScores}pt`} icon={dayScores - yScore > 0 ? 'increase' : 'decrease'} helperMessage={`${Math.abs(dayScores - yScore)}pt more than yesterday`} centerContent />
								<Stat label="TODAY SLEEP" number={`${tSleepTime}h`} icon={tSleepTime - ySleepTime > 0 ? 'increase' : 'decrease'} helperMessage={`${Math.abs(tSleepTime - ySleepTime)}h more than yesterday`} centerContent />
							</SimpleGrid>
						</Card>
						<Card m="md" variant="outline">
							<Text>MONTH SCORE</Text>
							<Chart />
						</Card>
					</GridItem>
					<GridItem>
						<Card m="md" variant="outline">
							<Heading fontWeight="bold" fontSize="xl">
								ONE POINT ADVICE
							</Heading>
							<Text m="md" textAlign="left" fontSize="xl">
								{advice}
							</Text>
							<Button size="md" marginLeft="auto" marginRight="xs" endIcon={<Volume2Icon />} onClick={playVoice}></Button>

							<Image src={img} alt="person" width="xs" marginLeft="auto" p="md" />
						</Card>
						<Container>
							<Button bg="#E7674C" color="#444949" marginLeft="auto" size="lg" onClick={backHome} endIcon={<HouseIcon />}></Button>
						</Container>
					</GridItem>
				</SimpleGrid>
			</Card>
		</>
	);
};

export default GameEnd;
