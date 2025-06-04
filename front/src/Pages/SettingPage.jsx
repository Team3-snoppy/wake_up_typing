import Appbar from '../component/Appbar';
import GameStart from '../component/GameStart';
import { useContext, useEffect } from 'react';
import { loginContext } from '../App';
import { useNavigate } from 'react-router';

const SettingPage = () => {
	const navigate = useNavigate();
	const { setUserInfo } = useContext(loginContext);
	// useEffect(() => {
	// 	(async () => {
	// 		const res = await fetch('/api/auth/myinfo', { credentials: 'include' });
	// 		if (res.status === 401) {
	// 			navigate('/login');
	// 		} else {
	// 			setUserInfo(await res.json());
	// 		}
	// 	})();
	// }, []);
	return (
		<>
            <Appbar />
            <GameStart />
		</>
	);
};

export default SettingPage;