import { Container, Button, RadioCardGroup, RadioCard, Text, Flex, Select, Option } from '@yamada-ui/react';
import { useState, useContext } from 'react';
import { loginContext } from '../App';
import { fetchWithBody } from '../function';
import { useNavigate } from 'react-router';

const GameStart = () => {
	const navigate = useNavigate();
	const { setCategoryNo } = useContext(loginContext);
	const gameStart = async () => {

		const sleep = new Date();
		const getUp = new Date();
		sleep.setHours(sleepHour, sleepMinutes, 0);
		if (sleepHour >= 20) {
			sleep.setDate(sleep.getDate() - 1);
		}
		getUp.setHours(getUpHour, getUpMinutes, 0);

		const diff = ((getUp - sleep) / (1000 * 60) / 60).toFixed(1);
		const date = `${getUp.getFullYear()}-${String(getUp.getMonth() + 1).padStart(2, '0')}-${String(getUp.getDate()).padStart(2, '0')}`;

    fetchWithBody('/api/sleeps/','POST',{ sleepTime: diff, date });
		navigate("/game");
};
	const [sleepHour, setSleepHour] = useState('');
	const [sleepMinutes, setSleepMinutes] = useState('');
	const [getUpHour, setGetUpHour] = useState('');
	const [getUpMinutes, setGetUpMinutes] = useState('');

	const categoryRadios = [
		{ label: 'ガンダム', value: '1', description: 'わかる人にはわかるはず。朝から熱くいきましょう。' },
		{ label: 'くるま', value: '2', description: 'わからないと失格ですね。何がとは言いませんが。' },
		{ label: 'お嬢様', value: '3', description: 'ギャル？お嬢様？ちょっとお上品にいきましょうか' },
		{ label: 'スポーツ', value: '4', description: '自分を鼓舞して一日頑張りましょう' },
		{ label: 'ゲーム', value: '5', description: 'FROM,FPS' },
	];

	const selectMinutes = ['00', '10', '20', '30', '40', '50'];
	const selectSleepHour = ['20', '21', '22', '23', '24', '1', '2', '3', '4'];
	const selectGetUpHour = ['4', '5', '6', '7', '8', '9', '10'];

	return (
		<>
			<Container>
				<RadioCardGroup onChange={setCategoryNo}>
					{categoryRadios.map((categoryRadio) => {
						return <RadioCard key={categoryRadio.value} label={categoryRadio.label} value={categoryRadio.value} description={categoryRadio.description}></RadioCard>;
					})}
				</RadioCardGroup>
			</Container>
			<Flex>
				<Container>
					<Text textAlign="left">入眠時間</Text>
					<Flex>
						<Select onChange={setSleepHour} w="2xs" placeholder="--">
							{selectSleepHour.map((hour) => {
								return (
									<Option key={hour} value={hour}>
										{hour}
									</Option>
								);
							})}
						</Select>
						<Text w="7xs">:</Text>
						<Select onChange={setSleepMinutes} w="2xs" placeholder="--">
							{selectMinutes.map((minutes) => {
								return (
									<Option key={minutes} value={minutes}>
										{minutes}
									</Option>
								);
							})}
						</Select>
					</Flex>
				</Container>
				<Container>
					<Text textAlign="left">起床時間</Text>
					<Flex>
						<Select onChange={setGetUpHour} w="2xs" placeholder="--">
							{selectGetUpHour.map((hour) => {
								return (
									<Option key={hour} value={hour}>
										{hour}
									</Option>
								);
							})}
						</Select>
						<Text w="7xs">:</Text>
						<Select onChange={setGetUpMinutes} w="2xs" placeholder="--">
							{selectMinutes.map((minutes) => {
								return (
									<Option key={minutes} value={minutes}>
										{minutes}
									</Option>
								);
							})}
						</Select>
					</Flex>
				</Container>
			</Flex>

			<Button variant="solid" onClick={gameStart}>
				game start
			</Button>
		</>
	);
};

export default GameStart;
