import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Input,
  useNotice,
  Text,
} from '@yamada-ui/react';
import { useEffect, useRef, useState, useContext } from 'react';
import { loginContext } from '../App.jsx';
import { fetchWithBody, fetchWithoutBody } from '../function.js';
import { useLocation, useNavigate } from 'react-router';
import Score from '../component/Score';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

const Gaming = () => {
  const notice = useNotice({ limit: 1 });
  const navigate = useNavigate();
  const [wordArray, setWordArray] = useState([]);
  const { categoryNo, setDayScores, setCount, count } =
    useContext(loginContext);
  // const { categoryNo, setDayScores, setCount, count, gameCount } =
  //   useContext(loginContext);
  const [testText, setTestText] = useState([]);
  const countRef = useRef(count);

  const [correctText, setCorrectText] = useState('');
  const location = useLocation();

  const COUNT_MS =30;
  const [remainingTime, setRemainingTime] = useState(COUNT_MS);

  useEffect(() => {
    if (!location.state?.fromGame) {
      navigate('/home', { replace: true });
    } else {
      window.history.replaceState({}, '');
      (async () => {
        const res = await fetchWithoutBody(
          `/api/words/category/${categoryNo}`,
          'get'
        );
				setCount(0)
        setTestText(res.data.map((item) => item.word));
        const gameCount = localStorage.getItem('gameCount');
        if (gameCount === 'true') {
          notice({
            title: 'Notice',
            description: '本日プレイ済みのためレコードは記録されません。',
            duration: 3000,
            status: 'info',
          });
        }
      })();
    }
  }, []);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    if (testText.length !== 0) {
      setQuestion();
    }
  }, [testText]);
useEffect(()=>{
	if (remainingTime === 0 && testText.length !== 0) {
		const gameCount = localStorage.getItem('gameCount');
		if (gameCount === 'false') {
			const date = format(new Date(), 'yyyy-MM-dd', { locale: ja });

			setDayScores(countRef.current);
			fetchWithBody('/api/scores', 'post', {
				gameScore: countRef.current,
				date: date,
			});
		}
		navigate('/gamescore');
	}
},[remainingTime])
  useEffect(() => {
    let timeoutId = null;
    if (testText.length !== 0 && remainingTime > 0) {
      // setQuestion();
			// console.log(remainingTime);
			
      timeoutId = setTimeout(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [remainingTime,testText]);

  const gridNumber = 18;

  const textFieldRef = useRef(null);

  //問題をセットする。
  const setQuestion = () => {
    const booArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const randomIndex = Math.floor(Math.random() * gridNumber);
    const textIndex = Math.floor(Math.random() * testText.length);
    setCorrectText(testText[textIndex]);
    booArray[randomIndex] = 1;
    setWordArray([...booArray]);
  };
  //入力があったら、正解かどうか確かめて、正解ならスコア＋１して次の問題へ
  const answer = () => {
    if (textFieldRef.current.value === correctText) {
      const score = Math.ceil(correctText.length ** 1.3);
      console.log("🍣 ~ Gaming.jsx:119 ~ answer ~ score:", score);
      setCount(count + score);
      textFieldRef.current.value = '';
      setQuestion();
    }
  };

  return (
    <Box px="xl">
      <Card
        p="md"
        fontSize="xl"
        fontWeight="bold"
        color="#444949"
        variant="outline"
        textAlign="center"
      >
        CARD
        <Grid templateColumns="repeat(3,1fr)" gap="xs">
          {wordArray.map((ele, i) => (
            <GridItem key={i} w="full" h="5xs">
              {wordArray[i] ? (
                <Card
                  fontWeight="light"
                  h="full"
                  color="#E7674C"
                  variant="outline"
                  // marginTop="md"
                  borderColor="#E7674C"
                >
                  <Text fontSize="xl" textAlign="center" margin="auto">
                    {correctText}
                  </Text>
                  {/* <CardBody fontSize="xl"  textAlign="center">{correctText}</CardBody> */}
                </Card>
              ) : (
                <Box h="5xs"></Box>
              )}
            </GridItem>
          ))}
        </Grid>
        <Box>
          <Input
            fontWeight="light"
            autoFocus
            size="lg"
            placeholder="Type something ..."
            _placeholder={{ color: '#E7674C' }}
            focusBorderColor="#E7674C"
            variant="flushed"
            onChange={answer}
            ref={textFieldRef}
            w="50%"
          />
        </Box>
        <Text color="#E7674C">{count}pt</Text>
        <Score remainingTime={remainingTime} />
      </Card>
    </Box>
  );
};

export default Gaming;
