import { fetchWithoutBody, fetchWithBody } from '../function';
import { useEffect, useContext } from 'react';
import { loginContext } from '../App';
import { useNavigate } from 'react-router';
import { Container, Box, Center, Text, Button, SimpleGrid, GridItem } from '@yamada-ui/react';

const GameEnd = () => {
	const navigate = useNavigate();
	const { count, setCount } = useContext(loginContext);
	const yesterdayData = () => {
		fetchWithoutBody('/api/');
	};

	useEffect(() => {
		fetchWithBody('/api/scores', 'post', {
			gameScore: count,
			date: new Date(),
		});
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
							<Text>TODAY SCORE</Text>
						</Container>
						<Container>
							<Text>MONTH SCORE</Text>
						</Container>
					</GridItem>
					<GridItem>
						<Container>
							<Text>ONE POINT ADVICE</Text>
						</Container>
					</GridItem>
				</SimpleGrid>
				<Button onClick={backHome}>ホームに戻る</Button>
			</Box>
		</>
	);
};

export default GameEnd;
