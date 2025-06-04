import Register from '../component/Register';
import { Flex, Center, Image } from '@yamada-ui/react';
import logo from '../assets/logo.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
	const navigate = useNavigate();
  // 認証状態を取得し済みならDashboardへリダイレクトする
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/myInfo', { credentials: 'include' });
      if (res.status === 200) {
        navigate('/home');
      }
    })();
  }, []);
	return (
		<>
			<Flex px="xl">
				<Image src={logo} alt="logo" width="md" />
			</Flex>
			<Center>
				<Register />
			</Center>
		</>
	);
};

export default RegisterPage;
