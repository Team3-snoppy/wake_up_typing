import { useState, useEffect } from 'react';
// import './Login.css';
import { fetchWithBody,fetchWithoutBody } from '../function.js';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  FormControl,
  Input,
  PasswordInput,
  Button,
  Link,
  Center,
  Text,
  Box,
  useNotice,
} from '@yamada-ui/react';
import { useNavigate } from 'react-router';

function Register() {
  const notice = useNotice({ limit: 1 });
  const navigate = useNavigate();

  // const refUser = useRef(null);
  // const refPass = useRef(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const updateName = async (e) => {
    setName(e.target.value);
		const res = await fetchWithoutBody(`/api/auth/findName?userName=${e.target.value}`, 'get');
		if(res.ok){
			setIsInvalidName(false)
		}else{
			setIsInvalidName(true);
		}
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const nameBlur = () => {
		if(!name){
			setIsInvalidName(true);

		}
  };
  const passwordBlur = () => {
    setIsInvalidPassword(true);
  };
  const alert = (message) => {
    notice({
      title: 'Error',
      description: message,
      duration: 3000,
      status: 'error',
    });
  };
  async function loginAuth() {
    try {
      if (!name && !password) {
        alert('入力項目が不足しています');
        setIsInvalidName(true);
        setIsInvalidPassword(true);
        return false;
      }
			if(isInvalidName){
				alert('ユーザー名を変更してください');
        setIsInvalidName(true);
        return false;
			}
      const res = await fetchWithBody('/api/auth/register', 'post', {
        userName: name,
        password,
      });

      if (res.ok) return true;
      alert(res.data);
      return false;
    } catch (error) {
      console.log('error: ', error);
      alert('Server Error');
      return false;
    }
  }

  const navigateHome = async () => {
    const success = await loginAuth();
    if (success) {
      notice({
        title: 'Success',
        description: 'アカウント作成に成功しました',
        duration: 3000,
        status: 'success',
      });
      navigate('/home');
    }
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="rgba(0, 0, 0, 0.3)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      // zIndex="9999"
    >
      <Card bg="white" w="xl" padding="xl" borderRadius="2xl">
        <CardHeader>
          <Center w="100%">
            <Text fontSize="5xl" fontWeight="bold">
              REGISTER
            </Text>
          </Center>
        </CardHeader>
        <CardBody
          w="100%"
          alignItems="center"
          display="flex"
          flexDirection="column"
          gap="md"
        >
          <FormControl
            w="80%"
            label="ユーザー名"
            required
            invalid={isInvalidName}
            onBlur={nameBlur}
            errorMessage={name ? "同名ユーザーが存在しています":"ユーザー名を入力してください"}
          >
            <Input
              type="text"
              placeholder="ユーザー名を入力してください"
              value={name}
              onChange={updateName}
            />
          </FormControl>
          <FormControl
            w="80%"
            label="パスワード"
            required
            invalid={isInvalidPassword && !password}
            onBlur={passwordBlur}
            errorMessage="パスワードを入力してください"
          >
            <PasswordInput
              placeholder="パスワードを入力してください"
              visible={visible}
              onVisibleChange={setVisible}
              value={password}
              onChange={updatePassword}
            />
          </FormControl>
          <Button
            w="80%"
            onClick={navigateHome}
            borderRadius="full"
            bg="#E7674C"
            fontWeight="bold"
            _hover={{
              bg: '#F39D8A',
            }}
          >
            CREATE
          </Button>
        </CardBody>
      </Card>
    </Box>
  );
}

export default Register;