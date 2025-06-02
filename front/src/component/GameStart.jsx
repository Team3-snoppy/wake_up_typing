import { Container, Button, RadioCardGroup, RadioCard, Text, Flex, Select, OptionGroup, Option } from '@yamada-ui/react';

const GameStart = ({ setGameState }) => {
	return (
		<>
			<Container>
				<RadioCardGroup>
					<RadioCard label="ガンダム" value="1" description="わかる人にはわかるはず。朝から熱くいきましょう。"></RadioCard>
					<RadioCard label="くるま" value="1" description="わからないと失格ですね。何がとは言いませんが。"></RadioCard>
					<RadioCard label="お嬢様" value="1" description="ギャル？お嬢様？ちょっとお上品にいきましょうか"></RadioCard>
					<RadioCard label="スポーツ" value="1" description="自分を鼓舞して一日頑張りましょう"></RadioCard>
					<RadioCard label="ゲーム" value="1" description="FROM,FPS"></RadioCard>
				</RadioCardGroup>
			</Container>
			<Flex>
				<Container>
					<Text textAlign="left">入眠時間</Text>
					<Flex>
						<Select w="2xs" placeholder="--">
							<Option value="20">20</Option>
							<Option value="21">21</Option>
							<Option value="22">22</Option>
							<Option value="23">23</Option>
							<Option value="24">24</Option>
							<Option value="0">0</Option>
							<Option value="1">1</Option>
							<Option value="2">2</Option>
							<Option value="3">3</Option>
							<Option value="4">4</Option>
						</Select>
						<Text w="7xs">:</Text>
						<Select w="2xs" placeholder="--">
							<Option value="00">00</Option>
							<Option value="10">10</Option>
							<Option value="20">20</Option>
							<Option value="30">30</Option>
							<Option value="40">40</Option>
							<Option value="50">50</Option>
						</Select>
					</Flex>
				</Container>
				<Container>
					<Text textAlign="left">起床時間</Text>
					<Flex>
						<Select w="2xs" placeholder="--">
							<Option value="4">4</Option>
							<Option value="5">5</Option>
							<Option value="6">6</Option>
							<Option value="7">7</Option>
							<Option value="8">8</Option>
							<Option value="9">9</Option>
							<Option value="10">10</Option>
							<Option value="11">11</Option>
						</Select>
						<Text w="7xs">:</Text>
						<Select w="2xs" placeholder="--">
							<Option value="00">00</Option>
							<Option value="10">10</Option>
							<Option value="20">20</Option>
							<Option value="30">30</Option>
							<Option value="40">40</Option>
							<Option value="50">50</Option>
						</Select>
					</Flex>
				</Container>
			</Flex>

			<Button variant="solid" onClick={() => setGameState(1)}>
				game start
			</Button>
		</>
	);
};

export default GameStart;
