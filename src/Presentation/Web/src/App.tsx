import React from 'react';
import UserList from './components/UserList';
import DarkModeToggle from './components/DarkModeToggle';

const App: React.FC = () => {
	return (
		<div className='container mx-auto p-4'>
			<DarkModeToggle />
			<UserList />
		</div>
	);
};

export default App;
