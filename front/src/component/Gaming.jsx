// import { Box, Button, Card, CardContent, Grid, Input } from '@mui/material';
import { Box, Button, Card, Grid, GridItem, Input } from '@yamada-ui/react';
import { useEffect, useRef, useState, useContext } from 'react';
import { loginContext } from '../App.jsx';
import { fetchWithBody, fetchWithoutBody } from '../function.js';
import { useNavigate } from 'react-router';

const Gaming = () => {
	const navigate = useNavigate();
	const [wordArray, setWordArray] = useState([]);
	const { categoryNo, setDayScores, setCount, count } = useContext(loginContext);
	const [testText, setTestText] = useState([]);

	const [eleIndex, setEleIndex] = useState(0);
	const [correctText, setCorrectText] = useState('');

	useEffect(() => {
		fetchWithoutBody(`/api/words/category/${categoryNo}`, 'get').then((data) => {
			setTestText(data.data.map((item) => item.word));
		});
	}, []);

	useEffect(() => {
		if (testText.length !== 0) {
			setQuestion();
			console.log(wordArray);

			setTimeout(() => {
				console.log('3秒経過');
				setDayScores(count);
				fetchWithBody('/api/scores', 'post', {
					gameScore: count,
					date: new Date(),
				});
				navigate('/gamescore');
			}, 30000);
		}
	}, [testText]);

	const gridNumber = 18;

	const textFieldRef = useRef(null);

	const focusTextField = () => {
		textFieldRef.current.focus();
	};

	//問題をセットする。
	const setQuestion = () => {
		console.log(testText);
		const booArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		const randomIndex = Math.floor(Math.random() * gridNumber);
		const textIndex = Math.floor(Math.random() * testText.length);
		setEleIndex(randomIndex);
		setCorrectText(testText[textIndex]);
		booArray[randomIndex] = 1;
		setWordArray([...booArray]);
	};
	//入力があったら、正解かどうか確かめて、正解ならスコア＋１して次の問題へ
	const answer = () => {
		if (textFieldRef.current.value === correctText) {
			const score = Math.ceil(correctText.length ** 1.3);
			setCount(count + score);
			textFieldRef.current.value = '';
			setQuestion();
		}
	};

	return (
		<Card>
			CARD
			{/* <CardContent> */}
			<Grid templateColumns="repeat(3,1fr)" gap="md">
				{wordArray.map((ele, i) => (
					<GridItem key={i} w="full">
						{wordArray[i] ? <Card h="5xs">{correctText}</Card> : <Box h="5xs"></Box>}
					</GridItem>
				))}
			</Grid>
			<Box>
				<Input
					// autoFocus
					// fullWidth
					// id="standard-basic"
					label="Type something .."
					variant="flushed"
					// onChange={(e) => {
					//   setTypeText(e.target.value);
					// }}
					onChange={answer}
					ref={textFieldRef}
				/>
			</Box>
			{/* <Button variant="contained" color="success" onClick={setQuestion}>
          set
        </Button> */}
			{count}pt
			{/* </CardContent> */}
		</Card>
	);
};

export default Gaming;
