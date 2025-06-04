import { useContext, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
} from '@mui/material';
import { loginContext } from '../App.jsx';
import { fetchWithBody, fetchWithoutBody } from '../function.js';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

function SleepSelect() {
  const { isLogin } = useContext(loginContext);
  const [timeValue, setTimeValue] = useState(6);
  const [sleepPostFlag, setSleepPostFlag] = useState(false);
  const selectTimes = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9,
    9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5,
    17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
  ];

  function valueChange(e) {
    setTimeValue(e.target.value);
  }

  async function postSleep() {
    const date = format(new Date(), 'yyyy-MM-dd', { locale: ja });
    fetchWithBody('/api/sleeps/', 'post', {
      sleepTime: timeValue,
      date: date,
    });
    getSleep();
  }

  async function getSleep() {
    fetchWithoutBody('/api/sleeps/all_records', 'get').then((jsonData) => {
      jsonData.data.forEach((ele) =>
        new Date(ele.create_at).toDateString() === new Date().toDateString()
          ? setSleepPostFlag(true)
          : ''
      );
    });
  }

  return (
    <>
      {isLogin && !sleepPostFlag ? (
        <>
          <Container
            sx={{ display: 'flex', flexDirection: 'column', width: 1 / 2 }}
          >
            <FormControl sx={{ m: 2 }}>
              <InputLabel>sleep time</InputLabel>
              <Select value={timeValue} onChange={valueChange}>
                {selectTimes.map((ele, i) => (
                  <MenuItem value={ele} key={i}>
                    {ele}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={postSleep}>OK</Button>
          </Container>
        </>
      ) : (
        ''
      )}
    </>
  );
}

export default SleepSelect;
