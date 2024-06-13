import React from 'react';
import UserList from '../components/UserList';

const HomePage: React.FC = () => {
	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-4'>User Management</h1>
			<UserList />
		</div>
	);
};

export default HomePage;
