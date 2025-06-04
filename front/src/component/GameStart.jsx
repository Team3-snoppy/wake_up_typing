import {
  Container,
  Button,
  RadioCardGroup,
  RadioCard,
  Text,
  Flex,
  Select,
  Option,
  Fieldset,
  Card,
  CardHeader,
  CardBody,
  Box,
  HStack,
  VStack,
  Spacer,
} from '@yamada-ui/react';
import { useState, useContext } from 'react';
import { loginContext } from '../App';
import { fetchWithBody, fetchWithoutBody } from '../function';
import { useNavigate } from 'react-router';
import { SunriseIcon, MoonStarIcon } from '@yamada-ui/lucide';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

const GameStart = () => {
  const navigate = useNavigate();
  const { categoryNo, setCategoryNo } = useContext(loginContext);
  // const { categoryNo, setCategoryNo, setGameCount } = useContext(loginContext);
  const gameStart = async () => {
    const sleep = new Date();
    const getUp = new Date();

    sleep.setHours(sleepHour, sleepMinutes, 0);
    if (sleepHour >= 20) {
      sleep.setDate(sleep.getDate() - 1);
    }
    getUp.setHours(getUpHour, getUpMinutes, 0);

    const diff = ((getUp - sleep) / (1000 * 60) / 60).toFixed(1);
    // const date = `${getUp.getFullYear()}-${String(
    //   getUp.getMonth() + 1
    // ).padStart(2, '0')}-${String(getUp.getDate()).padStart(2, '0')}`;
		const date = format(new Date(), 'yyyy-MM-dd', { locale: ja });

    // 既にその日にプレイしていた場合は記録しない
    const res = await fetchWithoutBody(`/api/records/${date}}`, 'get');
    if (res.ok) {
      // setGameCount(true);
			localStorage.setItem('gameCount',true)
    } else {
			localStorage.setItem('gameCount',false)
      // setGameCount(false);
      await fetchWithBody('/api/sleeps/', 'POST', { sleepTime: diff, date });
    }
    navigate('/game', { state: { fromGame: true }, replace: true });
  };
  const [sleepHour, setSleepHour] = useState('');
  const [sleepMinutes, setSleepMinutes] = useState('');
  const [getUpHour, setGetUpHour] = useState('');
  const [getUpMinutes, setGetUpMinutes] = useState('');

  const categoryRadios = [
    {
      label: 'ガンダム',
      value: '1',
      description: 'わかる人にはわかるはず。朝から熱くいきましょう。',
    },
    {
      label: 'くるま',
      value: '2',
      description: 'わからないと失格ですね。何がとは言いませんが。',
    },
    {
      label: 'お嬢様',
      value: '3',
      description: 'ギャル？お嬢様？ちょっとお上品にいきましょうか',
    },
    {
      label: 'スポーツ',
      value: '4',
      description: '自分を鼓舞して一日頑張りましょう',
    },
    { label: 'ゲーム', value: '5', description: 'FROM,FPS' },
  ];

  const selectMinutes = ['00', '10', '20', '30', '40', '50'];
  const selectSleepHour = ['20', '21', '22', '23', '24', '1', '2', '3', '4'];
  const selectGetUpHour = ['4', '5', '6', '7', '8', '9', '10'];

  return (
    <VStack gap="md">
      <Card
        w="80%"
        px="xl"
        py="lg"
        margin="auto"
        bg="white"
        borderRadius="xl"
        gap="sm"
      >
        <Text fontSize="2xl" fontWeight="bold" m="0">
          SELECT TYPE SET
        </Text>
        <RadioCardGroup
          variant="subtle"
          colorScheme="warning"
          onChange={setCategoryNo}
          defaultValue={categoryNo}
          gap="md"
        >
          {categoryRadios.map((categoryRadio) => {
            return (
              <RadioCard
                key={categoryRadio.value}
                label={categoryRadio.label}
                value={categoryRadio.value}
                description={categoryRadio.description}
              ></RadioCard>
            );
          })}
        </RadioCardGroup>
      </Card>
      <Card
        w="80%"
        px="xl"
        py="lg"
        margin="auto"
        bg="white"
        borderRadius="xl"
        gap="sm"
      >
        <Text fontSize="2xl" fontWeight="bold" m="0">
          INPUT SLEEP TIME
        </Text>
        <HStack>
          {/* <Box flex='1'> */}
          <VStack w="50%" alignItems="center">
            <Card
              padding="lg"
              w="90%"
              gap="sm"
              alignItems="center"
              h="2xs"
              justifyContent="center"
            >
              {/* <Text textAlign="left" fontWeight='bold'>入眠時間</Text> */}
              <MoonStarIcon boxSize="7xs" />
              <Spacer />
              <HStack w="full" justifyContent="center">
                <Select
                  onChange={setSleepHour}
                  w="100%"
                  maxW="3xs"
                  placeholder="--"
                >
                  {selectSleepHour.map((hour) => {
                    return (
                      <Option key={hour} value={hour}>
                        {hour}
                      </Option>
                    );
                  })}
                </Select>
                <Text fontSize="xl">:</Text>
                <Select
                  onChange={setSleepMinutes}
                  w="100%"
                  maxW="3xs"
                  placeholder="--"
                >
                  {selectMinutes.map((minutes) => {
                    return (
                      <Option key={minutes} value={minutes}>
                        {minutes}
                      </Option>
                    );
                  })}
                </Select>
              </HStack>
            </Card>
          </VStack>
          {/* </Box> */}
          {/* <Box flex='1'> */}
          <VStack w="50%" alignItems="center">
            <Card
              padding="lg"
              w="90%"
              gap="sm"
              alignItems="center"
              h="2xs"
              justifyContent="center"
            >
              {/* <Text textAlign="left">起床時間</Text> */}
              <SunriseIcon boxSize="7xs" />
              <Spacer />
              <HStack w="full" justifyContent="center">
                <Select
                  onChange={setGetUpHour}
                  w="100%"
                  maxW="3xs"
                  placeholder="--"
                >
                  {selectGetUpHour.map((hour) => {
                    return (
                      <Option key={hour} value={hour}>
                        {hour}
                      </Option>
                    );
                  })}
                </Select>
                <Text fontSize="xl">:</Text>
                <Select
                  onChange={setGetUpMinutes}
                  w="100%"
                  maxW="3xs"
                  placeholder="--"
                >
                  {selectMinutes.map((minutes) => {
                    return (
                      <Option key={minutes} value={minutes}>
                        {minutes}
                      </Option>
                    );
                  })}
                </Select>
              </HStack>
            </Card>
          </VStack>
          {/* </Box> */}
        </HStack>
      </Card>
      <Spacer />
      <Button
        w="15%"
        onClick={gameStart}
        borderRadius="full"
        fontWeight="bold"
        bg="#E7674C"
        _hover={{
          bg: '#F39D8A',
        }}
        margin="auto"
      >
        GAME START
      </Button>
    </VStack>
  );
};

export default GameStart;
