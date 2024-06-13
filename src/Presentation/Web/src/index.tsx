import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
	<React.StrictMode>
		<ErrorBoundary>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</ErrorBoundary>
	</React.StrictMode>
);
