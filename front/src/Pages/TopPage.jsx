import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Box, Button, Center, Image, VStack } from '@yamada-ui/react';
import logo from '../assets/logo.png';

const TopPage = () => {
	const navigate = useNavigate();
	// const [start, setStart] = useState(false);

	const startButton = () => {
		navigate('/login');
	};

	return (
		<Box w="100vw" h="100%">
			<Center>
				<VStack>
					<Image src={logo} alt="logo" boxSize="max" />

					<Button w="sm" onClick={startButton} borderRadius="full">
						START
					</Button>
				</VStack>
			</Center>
		</Box>
	);
};

export default TopPage;
