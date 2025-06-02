import { useContext, useRef, useState } from 'react';
import './Login.css';
import { fetchWithBody } from '../function.js';
import { loginContext } from '../App.jsx';
import { Card, CardHeader, CardBody, Heading, Center, FormControl, Input, PasswordInput, Button, Link } from '@yamada-ui/react';
import { useNavigate } from 'react-router';

function Register() {

	const navigate = useNavigate();

	const refUser = useRef(null);
	const refPass = useRef(null);
	const [visible, setVisible] = useState(false);

	async function register() {
		fetchWithBody('/api/auth/register', 'post', {
			userName: refUser.current.value,
			password: refPass.current.value,
		}).then((data) => console.log(data));
		navigate('/home');
	}

	return (
		<>
			<Card bg="white" w="2xl" padding="xl">
				<Center>
					<CardHeader>
						<Heading size="md">REGISTER</Heading>
					</CardHeader>
				</Center>
				<CardBody>
					<FormControl label="ユーザー名" required>
						<Input type="text" placeholder="ユーザー名を入力してください" ref={refUser} />
					</FormControl>
					<FormControl label="パスワード" required>
						<PasswordInput type="password" placeholder="パスワードを入力してください" visible={visible} onVisibleChange={setVisible} ref={refPass} />
					</FormControl>
					<Center>
						<Button variant="solid" borderRadius="full" w="sm" bgColor="E7674C" color="#444949" fontWeight="bold" type="button" onClick={register}>
							CREATE
						</Button>
					</Center>
				</CardBody>
			</Card>
		</>
	);
}

export default Register;
