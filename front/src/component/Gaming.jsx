// import { Box, Button, Card, CardContent, Grid, Input } from '@mui/material';
import { Box, Button, Card, Grid, GridItem, Input } from '@yamada-ui/react';
import { useEffect, useRef, useState, useContext } from 'react';
import { loginContext } from '../App.jsx';
import { fetchWithBody, fetchWithoutBody } from '../function.js';
import { ChevronsLeftRightEllipsisIcon } from '@yamada-ui/lucide';

const Gaming = ({ setGameState, gameState, setCount, count }) => {
	const { categoryNo } = useContext(loginContext);
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
			if (gameState === 1) {
				setQuestion();

				setTimeout(() => {
					console.log('3秒経過');
					setGameState(2);
				}, 30000);
			} else if (gameState === 2) {
				//スコアと今日の日付をポスト
			}
		}
	}, [testText]);

	const gridNumber = 18;

	const textFieldRef = useRef(null);

	const focusTextField = () => {
		textFieldRef.current.focus();
	};

	// const wordArray = new Array(gridNumber).fill(useRef(null));
	const wordArray = new Array('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

	//問題をセットする。
	const setQuestion = () => {
		console.log(testText);
		const randomIndex = Math.floor(Math.random() * gridNumber);
		const textIndex = Math.floor(Math.random() * testText.length);
		setEleIndex(randomIndex);
		setCorrectText(testText[textIndex]);
		wordArray[randomIndex] = testText[textIndex];
	};
	//入力があったら、正解かどうか確かめて、正解ならスコア＋１して次の問題へ
	const answer = () => {
		console.log('typeText:', textFieldRef.current.value, 'correctText:', correctText);
		if (textFieldRef.current.value === correctText) {
			console.log('正解です');
			setCount(count + 1);
			wordArray[eleIndex].current.value = '';
			textFieldRef.current.value = '';
			setQuestion();
		}
	};
	const gridEle = new Array(gridNumber).fill('');

	return (
		<Card>
			CARD
			{/* <CardContent> */}
			<Grid templateColumns="repeat(3,1fr)" gap="md">
				{gridEle.map((ele, i) => (
					<GridItem key={i} w="full">
						<Input readOnly variant="flushed" defaultValue={wordArray[i]}></Input>
					</GridItem>
				))}
			</Grid>
			<Box>
				<Input
					autoFocus
					fullWidth
					id="standard-basic"
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
