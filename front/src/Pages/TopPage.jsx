import { useNavigate } from 'react-router';
import { Box, Button, Center, Image, VStack } from '@yamada-ui/react';
import logo from '../assets/logo.png';

const TopPage = () => {
  const navigate = useNavigate();

  const startButton = async () => {
		const res = await fetch('/api/auth/myInfo', { credentials: 'include' });
      if (res.status === 200) {
        navigate('/home');
      }else{
				navigate('/login');
			}
  };

  return (
    <Box>
      <Center flexDirection="column" height="100vh" gap="4xl">
        <Image src={logo} alt="logo" boxSize="max" />
        <Button
          w="sm"
          onClick={startButton}
          borderRadius="full"
          bg="#E7674C"
          fontWeight="bold"
					_hover={{
						bg: "#F39D8A"
					}}
        >
          START
        </Button>
      </Center>
    </Box>
  );
};

export default TopPage;
