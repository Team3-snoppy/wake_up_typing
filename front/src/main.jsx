import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UIProvider } from '@yamada-ui/react';
import { Box } from '@yamada-ui/react';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<UIProvider>
			<Box bg="#FEFFFA" minH="100vh" >
				<App />
			</Box>
		</UIProvider>
	</StrictMode>
);
