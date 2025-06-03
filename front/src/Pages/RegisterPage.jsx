import Register from '../component/Register';
import { Flex, Center, Image } from '@yamada-ui/react';
import logo from '../assets/logo.png';

const RegisterPage = () => {
	return (
		<>
			<Flex>
				<Image src={logo} alt="logo" width="md" />
			</Flex>
			<Center>
				<Register />
			</Center>
		</>
	);
};

export default RegisterPage;
