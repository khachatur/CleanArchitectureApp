import React, { useState } from 'react';
import { User } from '../models/User';
import { useRecoilState } from 'recoil';
import { userState } from '../state/userState';
import { deleteUser } from '../services/userService';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface UserItemProps {
	user: User;
	onEdit: (user: User) => void;
	onView: (user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onEdit, onView }) => {
	const [users, setUsers] = useRecoilState(userState);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

	const handleDelete = async () => {
		await deleteUser(user.id);
		setUsers(users.filter((u) => u.id !== user.id));
		setIsDeleteModalOpen(false);
	};

	return (
		<>
			<div className='flex items-center justify-between p-4 border rounded-md'>
				<div>
					<p className='font-medium'>{user.name}</p>
					<p className='text-gray-500'>{user.email}</p>
				</div>
				<div className='flex space-x-2'>
					<button
						onClick={() => onView(user)}
						className='bg-blue-500 text-white px-2 py-1 rounded-md'
					>
						View
					</button>
					<button
						onClick={() => onEdit(user)}
						className='bg-yellow-500 text-white px-2 py-1 rounded-md'
					>
						Edit
					</button>
					<button
						onClick={() => setIsDeleteModalOpen(true)}
						className='bg-red-500 text-white px-2 py-1 rounded-md'
					>
						Delete
					</button>
				</div>
			</div>
			<DeleteConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDelete}
				userName={user.name}
			/>
		</>
	);
};

export default UserItem;
