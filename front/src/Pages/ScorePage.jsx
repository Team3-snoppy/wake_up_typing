import GameEnd from '../component/GameEnd';
import Appbar from '../component/Appbar';
import { VStack } from '@yamada-ui/react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const ScorePage = () => {
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
		<VStack h='100vh' overflowY='hidden'>
      <Appbar />
      <GameEnd />
    </VStack>
  );
};

export default ScorePage;
