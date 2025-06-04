import GameEnd from '../component/GameEnd';
import Appbar from '../component/Appbar';
import { VStack } from '@yamada-ui/react';

const ScorePage = () => {
  return (
		<VStack h='100vh' overflowY='hidden'>
      <Appbar />
      <GameEnd />
    </VStack>
  );
};

export default ScorePage;
