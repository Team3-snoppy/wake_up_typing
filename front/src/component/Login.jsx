import { useRef, useState } from 'react';
import './Login.css';
import { fetchWithBody } from '../function.js';
import { Card, CardHeader, CardBody, Heading, FormControl, Input, PasswordInput, Button, Link } from '@yamada-ui/react';
import { useNavigate } from 'react-router';

function Login() {
	const navigate = useNavigate();

	const refUser = useRef(null);
	const refPass = useRef(null);
	const [visible, setVisible] = useState(false);

	async function login() {
		fetchWithBody('/api/auth/login', 'post', {
			userName: refUser.current.value,
			password: refPass.current.value,
		});
		navigate('/home');
	}

	return (
		<>
			<Card bg="white" w="2xl" padding="xl">
				<CardHeader>
					<Heading size="md">LOG IN</Heading>
				</CardHeader>
				<CardBody>
					<FormControl label="ユーザー名" required>
						<Input type="text" placeholder="ユーザー名を入力してください" ref={refUser} />
					</FormControl>
					<FormControl label="パスワード" required>
						<PasswordInput type="password" placeholder="パスワードを入力してください" visible={visible} onVisibleChange={setVisible} ref={refPass} />
					</FormControl>
					<Button variant="solid" borderRadius="full" w="sm" bgColor="E7674C" color="#444949" fontWeight="bold" type="button" onClick={login}>
						Log In
					</Button>
					<Link onClick={() => navigate('/register')}>CREATE NEW ACCOUNT</Link>
				</CardBody>
			</Card>
		</>
	);
}

export default Login;
