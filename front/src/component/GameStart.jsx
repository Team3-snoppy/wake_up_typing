import { Container, Button, RadioCardGroup, RadioCard, Text, Flex, Select, Option } from '@yamada-ui/react';
import { useRef, useState } from 'react';
const GameStart = ({ setGameState }) => {
	const gameStart = () => {
		console.log('🍓 ~ GameStart ~ selectCategory:', selectCategory);
		console.log('🍓 ~ GameStart ~ sleepHour:', sleepHour);
		console.log('🍓 ~ GameStart ~ sleepMinutes:', sleepMinutes);
		console.log('🍓 ~ GameStart ~ getUpHour:', getUpHour);
		console.log('🍓 ~ GameStart ~ getUpMinutes:', getUpMinutes);

		setGameState(1);
	};
	const [selectCategory, setSelectCategory] = useState('');
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
				<RadioCardGroup onChange={setSelectCategory}>
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
