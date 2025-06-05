import { Box, VStack } from '@yamada-ui/react';
import Appbar from '../component/Appbar';
import GameStart from '../component/GameStart';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const SettingPage = () => {
	const navigate = useNavigate();
  // 認証状態を取得し未認証ならtopへリダイレクトする
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/myInfo', { credentials: 'include' });
      if (!res.ok) {
        navigate('/');
      }
    })();
  }, []);
	return (
		<VStack gap='lg'>
            <Appbar />
            <GameStart />
		</VStack>
	);
};

export default SettingPage;