import { Box, Button, Card, CardContent, Grid, TextField } from '@mui/material';
import { useEffect, useRef, useState, useContext } from 'react';
import { loginContext } from '../App.jsx';
import { fetchWithBody, fetchWithoutBody } from '../function.js';

const Gaming = ({ setGameState, gameState, setCount, count }) => {
	const { isLogin } = useContext(loginContext);
	const [testText, setTestText] = useState([]);

	const [eleIndex, setEleIndex] = useState(0);
	const [correctText, setCorrectText] = useState('');

	const defaultText = ['as', 'zx', 'qw'];

	if (isLogin && testText.length === 0) {
		fetchWithoutBody('/api/words/personal', 'get').then((data) => {
			setTestText(data.data.map((item) => item.word));
		});
	} else if (!isLogin && testText.length === 0) {
		setTestText(defaultText);
	}

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
	const gridSize = 4;

	const textFieldRef = useRef(null);

	const focusTextField = () => {
		textFieldRef.current.focus();
	};

	// const refArray = new Array(gridNumber).fill(useRef(null));
	const refArray = new Array(useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null));

	//問題をセットする。
	const setQuestion = () => {
		const randomIndex = Math.floor(Math.random() * gridNumber);
		const textIndex = Math.floor(Math.random() * testText.length);
		setEleIndex(randomIndex);
		setCorrectText(testText[textIndex]);
		refArray[randomIndex].current.value = testText[textIndex];
	};
	//入力があったら、正解かどうか確かめて、正解ならスコア＋１して次の問題へ
	const answer = () => {
		console.log('typeText:', textFieldRef.current.value, 'correctText:', correctText);
		if (textFieldRef.current.value === correctText) {
			console.log('正解です');
			setCount(count + 1);
			refArray[eleIndex].current.value = '';
			textFieldRef.current.value = '';
			setQuestion();
		}
	};
	const gridEle = new Array(gridNumber).fill('');

	return (
		<Card variant="outlined" onMouseOver={focusTextField}>
			card
			<CardContent>
				<Grid container spacing={0}>
					{gridEle.map((ele, i) => (
						<Grid key={i} size={gridSize}>
							<TextField disabled variant="standard" type="text" inputRef={refArray[i]}>
								size=3
							</TextField>
						</Grid>
					))}
				</Grid>
				<Box>
					<TextField
						autoFocus
						fullWidth
						id="standard-basic"
						label="Type something .."
						variant="standard"
						// onChange={(e) => {
						//   setTypeText(e.target.value);
						// }}
						onChange={answer}
						inputRef={textFieldRef}
					/>
				</Box>
				{/* <Button variant="contained" color="success" onClick={setQuestion}>
          set
        </Button> */}
				{count}pt
			</CardContent>
		</Card>
	);
};

export default Gaming;
