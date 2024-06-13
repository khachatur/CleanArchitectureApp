import React from 'react';

const DarkModeToggle: React.FC = () => {
	const toggleDarkMode = () => {
		const html = document.documentElement;
		html.classList.toggle('dark');
	};

	return (
		<button
			onClick={toggleDarkMode}
			className='button'
		>
			Toggle Dark Mode
		</button>
	);
};

export default DarkModeToggle;
