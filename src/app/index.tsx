import { MainPage } from 'pages';
import React from 'react';
import './index.css';
import { withProviders } from './providers';

function App() {
	return (
		<div className="app">
			<MainPage></MainPage>
		</div>
	);
}

export default withProviders(App());
