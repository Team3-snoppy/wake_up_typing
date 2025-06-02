import Appbar from '../component/Appbar';
import Game from '../component/Game';
import Score from '../component/Score';
import { useContext, useEffect } from 'react';
import { loginContext } from '../App';

const GamePage = () => {
	const { setUserInfo } = useContext(loginContext);
	useEffect(() => {
		(async () => {
			const res = await fetch('/api/auth/myinfo', { credentials: 'include' });
			if (res.status === 401) {
				navigate('/login');
			} else {
				setUserInfo(await res.json());
			}
		})();
	}, []);

	return (
		<>
			<Appbar />
			<Game />
			<Score />
		</>
	);
};

export default GamePage;
