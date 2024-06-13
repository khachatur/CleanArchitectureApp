import React, { useEffect, useState } from 'react';
import { User } from '../models/User';
import { getUserById } from '../services/userService';

interface UserDetailProps {
	user: User;
	onClose: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onClose }) => {
	const [detailedUser, setDetailedUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUserDetails = async () => {
			const userDetails = await getUserById(user.id);
			setDetailedUser(userDetails);
		};

		fetchUserDetails();
	}, [user.id]);

	if (!detailedUser) {
		return <div>Loading...</div>;
	}

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-4 rounded shadow-lg'>
				<h2 className='text-xl font-bold mb-4'>User Details</h2>
				<p>
					<strong>Name:</strong> {detailedUser.name}
				</p>
				<p>
					<strong>Email:</strong> {detailedUser.email}
				</p>
				{/* Add more details here if available */}
				<button
					onClick={onClose}
					className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default UserDetail;
