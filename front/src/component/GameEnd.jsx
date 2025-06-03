import { fetchWithBody } from '../function';
import { useEffect, useContext } from 'react';
import { loginContext } from '../App';
import { useNavigate } from 'react-router';
import { Box, Center, Text, Button } from '@yamada-ui/react';

const GameEnd = () => {
	//まだ

	const navigate = useNavigate();
	const { count } = useContext(loginContext);
	useEffect(() => {
		fetchWithBody('/api/scores', 'post', {
			gameScore: count,
			date: new Date(),
		});
	}, []);

	return (
		<>
			<Text>ゲーム終了</Text>
			<Text>スコア：{count}</Text>
			<Button onClick={() => navigate('/home')}>ホームに戻る</Button>
		</>
	);
};

export default GameEnd;
