import Login from '../component/Login';
import { Flex, Center, Image } from '@yamada-ui/react';
import logo from '../assets/logo.png';

const LoginPage = () => {
  return (
    <>
      <Flex px="xl">
        <Image src={logo} alt="logo" width="md" />
      </Flex>
      <Login />
    </>
  );
};

export default LoginPage;
