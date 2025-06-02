import { Box, Button, Flex, Spacer, VStack, Image } from '@yamada-ui/react';
import { fetchWithoutBody } from '../function';
import { useContext } from 'react';
import { loginContext } from '../App';
import logo from '../assets/logo.png';
import { LogOutIcon } from '@yamada-ui/lucide';
import { useNavigate } from 'react-router';

const Appbar = () => {
	const { setIsLogin, setUserInfo, userInfo } = useContext(loginContext);
	const navigate = useNavigate();
	// console.log(userInfo);

	async function logout() {
		fetchWithoutBody('/api/auth/logout', 'post').then((data) => {
			if (data.data === 'you logged out succesfully!') {
				setIsLogin(false);
				setUserInfo({ id: '', name: '' });
				navigate('/');
			}
		});
	}
	return (
		<Box>
			<Flex>
				<Image src={logo} alt="logo" width="md" />
				{/* <Spacer /> */}
				<VStack>
					<p>おはよう</p>
					<p>{userInfo.name}</p>
				</VStack>

				<Button variant="contained" onClick={logout}>
					<LogOutIcon />
				</Button>
			</Flex>
		</Box>
	);
};

export default Appbar;
