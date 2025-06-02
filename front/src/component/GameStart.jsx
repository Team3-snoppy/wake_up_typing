import { Container, Button, RadioCardGroup, RadioCard, Text } from '@yamada-ui/react';

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
			<Container>
        <Text>入眠時間</Text>
      </Container>
      <Container>
        <Text>起床時間</Text>
      </Container>

			<Button variant="solid" onClick={() => setGameState(1)}>
				game start
			</Button>
		</>
	);
};

export default GameStart;
