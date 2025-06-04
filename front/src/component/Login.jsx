import { useState, useEffect } from 'react';
// import './Login.css';
import { fetchWithBody } from '../function.js';
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

function Login() {
  const notice = useNotice({ limit: 1 });
  const navigate = useNavigate();

  // const refUser = useRef(null);
  // const refPass = useRef(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  // 認証状態を取得し済みならDashboardへリダイレクトする
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/myInfo', { credentials: 'include' });
      if (res.status === 200) {
        navigate('/home');
      }
    })();
  }, []);

  const updateName = (e) => {
    setName(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const nameBlur = () => {
    setIsInvalidName(true);
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
      const res = await fetchWithBody('/api/auth/login', 'post', {
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
        description: 'ログインに成功しました',
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
              LOGIN
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
            invalid={isInvalidName && !name}
            onBlur={nameBlur}
            errorMessage="ユーザー名を入力してください"
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
            Log In
          </Button>
          <Link onClick={() => navigate('/register')}>CREATE NEW ACCOUNT</Link>
        </CardBody>
      </Card>
    </Box>
  );
}

export default Login;
