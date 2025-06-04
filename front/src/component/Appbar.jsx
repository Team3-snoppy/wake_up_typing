import {
  Box,
  Button,
  Flex,
  Spacer,
  VStack,
  Image,
  HStack,
  Text,
} from '@yamada-ui/react';
import { fetchWithoutBody } from '../function';
import { useState, useEffect } from 'react';
import { loginContext } from '../App';
import logo from '../assets/logo.png';
import { LogOutIcon } from '@yamada-ui/lucide';
import { useNavigate } from 'react-router';

const Appbar = () => {
  // const { setIsLogin, setUserInfo, userInfo } = useContext(loginContext);
  const [userName, setUserName] = useState('');
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/myInfo', { credentials: 'include' });
      if (res.status === 200) {
        const data = await res.json();
        setUserName(data.name);
      }
    })();
  }, []);
  const navigate = useNavigate();
  // console.log(userInfo);

  async function logout() {
    const res = await fetchWithoutBody('/api/auth/logout', 'post');
    if (res.data === 'you logged out succesfully!') {
      // setIsLogin(false);
      // setUserInfo({ id: '', name: '' });
      navigate('/');
      // }
    }
  }
  return (
    <Box
      w="full"
      // position="fixed"
      zIndex="banner"
    >
      {/* <Flex> */}
      <HStack gap='xl' px='xl'>
        <Image src={logo} alt="logo" width="md" />
        <Spacer />
				<Box>
        <VStack gap='0' alignItems='center'>
          <Text m="0" fontSize="lg">おはよう</Text>
          <Text m="0" fontSize="md">{userName}</Text>
        </VStack>
				</Box>
        <Button variant='ghost' onClick={logout} >
          <LogOutIcon fontSize='xl' />
        </Button>
      </HStack>
      {/* </Flex> */}
    </Box>
  );
};

export default Appbar;
