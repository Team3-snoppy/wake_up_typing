import { fetchWithBody, fetchWithoutBody } from '../function';
import { useEffect, useContext, useState } from 'react';
import { loginContext } from '../App';
import { useNavigate } from 'react-router';
import {
  Text,
  Button,
  SimpleGrid,
  GridItem,
  Stat,
  Image,
  Heading,
  Card,
  Box,
  Container,
  HStack,
} from '@yamada-ui/react';
import Chart from './Chart';
import img from '../assets/advice.png';
import { Volume2Icon, HouseIcon } from '@yamada-ui/lucide';
import { format, subDays } from 'date-fns';
import { ja } from 'date-fns/locale';

const GameEnd = () => {
  const navigate = useNavigate();
  const [ySleepTime, setYSleepTime] = useState(0);
  const [yScore, setYScore] = useState(0);
  const [tSleepTime, setTSleepTime] = useState(0);
  const [advice, setAdvice] = useState('');
  const [voice, setVoice] = useState(null);

  const [isLoad, setIsLoad] = useState(false);

  const { setCount, dayScores, LLMtext, setLLMtext, LLMspeech, setLLMspeech } =
    useContext(loginContext);
  // const { setCount, dayScores,gameCount } = useContext(loginContext);
  const yesterdayData = async () => {
    const date = format(subDays(new Date(), 1), 'yyyy-MM-dd', { locale: ja });
    // today.setDate(today.getDate() - 1);
    // const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const res = await fetchWithoutBody(`/api/records/${date}`, 'get');
    if (!res.ok) {
      setYSleepTime(0);
      setYScore(0);
    } else {
      setYSleepTime(res.data[0].sleep_time);
      setYScore(res.data[0].game_score);
    }
  };

  const todayData = async () => {
    // const today = new Date();
    // const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const date = format(new Date(), 'yyyy-MM-dd', { locale: ja });
    const res = await fetchWithoutBody(`/api/records/${date}`, 'get');
    if (res.ok) {
      setTSleepTime(res.data[0].sleep_time);
    } else {
      setTSleepTime(0);
    }
  };

  // 試し
  // const data = {
  //   data: 'お疲れ様！5月も終盤だね、ラストスパート頑張ろう🔥\n\n睡眠時間を見ると、ちょっと足りてない日もあるみたいで心配だな。タイピングスコアも睡眠不足の日は少し下がる傾向にあるみたいだから、睡眠時間を意識するとパフォーマンスアップに繋がりそう！\n\n特に、7時間以上寝ている日のスコアは安定しているみたい！\n\n睡眠とタイピング、両方意識して、さらにレベルアップしちゃおう！\n',
  //   audioBase64: 'fjdksalhfjdkahds;ajdfks;a',
  // };

  useEffect(() => {
    const gameCount = localStorage.getItem('gameCount');
    if (gameCount === 'false') {
      (async () => {
        todayData();
        yesterdayData();
        const res = await fetchWithBody('/api/gemini/text', 'post');
        setLLMtext(res.data);

        if (res.data !== 'No result' && res.ok) {
          setIsLoad(true);
          const resSpeech = await fetchWithBody('/api/gemini/speech', 'post', {
            data: res.data,
          });
          if (resSpeech.ok) {
            setLLMspeech(resSpeech.data);
          }
          setIsLoad(false);
        }
        // setAdvice(LLMtext);
        // setVoice(LLMspeech);
      })();
    }
    // console.log('🍣 ~ GameEnd.jsx:100 ~ LLMspeech:', LLMspeech);
  }, []);

  useEffect(() => {
    setAdvice(LLMtext);
  }, [LLMtext]);

  useEffect(() => {
    setVoice(LLMspeech);
  }, [LLMspeech]);

  const playVoice = () => {
    const audio = new Audio();
    audio.src = `data:audio/wav;base64,${voice}`;
    audio.play();
  };

  const backHome = () => {
    setCount(0);
    navigate('/home');
  };

  return (
    <Box display="flex" flexDirection="column" h="100vh">
      <Box px="xl" h="95vh">
        <Card m="xs" variant="outline" color="#444949" h="90%">
          <SimpleGrid w="full" columns={{ base: 2, md: 1 }} gap="md" h="100%">
            <GridItem minH="0">
              <Card m="md" variant="outline" padding="md">
                <SimpleGrid w="full" columns={{ base: 2, md: 1 }} gap="md">
                  <Stat
                    label="TODAY SCORE"
                    number={`${dayScores}pt`}
                    icon={dayScores - yScore > 0 ? 'increase' : 'decrease'}
                    helperMessage={`${Math.abs(
                      dayScores - yScore
                    )}pt more than yesterday`}
                    centerContent
                  />
                  <Stat
                    label="TODAY SLEEP"
                    number={`${tSleepTime}h`}
                    icon={tSleepTime - ySleepTime > 0 ? 'increase' : 'decrease'}
                    helperMessage={`${Math.abs(
                      tSleepTime - ySleepTime
                    )}h more than yesterday`}
                    centerContent
                  />
                </SimpleGrid>
              </Card>
              <Card m="md" variant="outline" minH="0" padding="md" h="60vh">
                <Text fontWeight="bold" fontSize="xl" textAlign="center">
                  MONTH SCORE
                </Text>
                <Chart />
              </Card>
            </GridItem>
            <GridItem minH="0">
              <Card m="md" variant="outline" h="95%" padding="md">
                <Text fontWeight="bold" fontSize="xl" textAlign="center">
                  ONE POINT ADVICE
                </Text>
                <Box m="md" h="40%" overflowY="auto" borderRadius='md'>
                  <Text textAlign="left" fontSize="xl" whiteSpace="pre-wrap">
                    {advice}
                  </Text>
                </Box>
                <Button
                  size="md"
                  marginLeft="auto"
                  marginRight="xs"
                  endIcon={<Volume2Icon />}
                  loading={isLoad}
                  disabled={!LLMspeech}
                  loadingText="Loading..."
                  loadingPlacement="end"
                  loadingIcon="grid"
                  onClick={playVoice}
                  variant="outline"
                ></Button>
                <Image
                  src={img}
                  alt="person"
                  // width="xs"
                  marginLeft="auto"
                  p="md"
                  boxSize="xs"
                />
                <Button
                  bg="#E7674C"
                  color="#444949"
                  // marginLeft="auto"
                  size="md"
                  w="3xs"
                  borderRadius="full"
                  onClick={backHome}
                  endIcon={<HouseIcon />}
                  margin="auto"
                  fontWeight="bold"
                  _hover={{
                    bg: '#F39D8A',
                  }}
                ></Button>
              </Card>
              {/* <Container> */}
              {/* </Container> */}
            </GridItem>
          </SimpleGrid>
        </Card>
      </Box>
    </Box>
  );
};

export default GameEnd;
