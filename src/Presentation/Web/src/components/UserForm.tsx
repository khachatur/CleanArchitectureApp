import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../state/userState';
import { User } from '../models/User';
import { createUser, updateUser } from '../services/userService';
import LoadingIndicator from './LoadingIndicator';
import Notification from './Notification';

interface UserFormProps {
	userToEdit?: User | null;
	onSubmit: () => void;
}

/**
 * UserForm component for creating and updating users.
 */
const UserForm: React.FC<UserFormProps> = ({ userToEdit, onSubmit }) => {
	const [users, setUsers] = useRecoilState(userState);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');
	const [profilePicture, setProfilePicture] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [notification, setNotification] = useState<{
		message: string;
		type: 'success' | 'error';
	} | null>(null);

	useEffect(() => {
		if (userToEdit) {
			setName(userToEdit.name);
			setEmail(userToEdit.email);
			setRole(userToEdit.role);
		} else {
			setName('');
			setEmail('');
			setRole('');
		}
	}, [userToEdit]);

	const validateEmail = (email: string): boolean => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setProfilePicture(file);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!name || !email || !role) {
			setError('All fields are required');
			return;
		}

		if (!validateEmail(email)) {
			setError('Invalid email address');
			return;
		}

		const newUser: User = {
			id: userToEdit ? userToEdit.id : 0,
			name,
			email,
			role,
		};
		setLoading(true);

		try {
			if (profilePicture) {
				const formData = new FormData();
				formData.append('file', profilePicture);
				// Upload profile picture and get the URL (implement this logic as needed)
				// const response = await uploadProfilePicture(formData);
				// newUser.profilePictureUrl = response.url;
			}

			if (userToEdit && userToEdit.id !== 0) {
				await updateUser(newUser);
				setUsers(users.map((u) => (u.id === newUser.id ? newUser : u)));
				setNotification({
					message: 'User updated successfully',
					type: 'success',
				});
			} else {
				await createUser(newUser);
				setUsers([...users, newUser]);
				setNotification({
					message: 'User created successfully',
					type: 'success',
				});
			}
			setError(null);
			onSubmit();
		} catch (err) {
			setError('Failed to save the user. Please try again.');
			setNotification({
				message: 'Failed to save the user. Please try again.',
				type: 'error',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}
			<form
				onSubmit={handleSubmit}
				className='space-y-4 p-4 bg-white shadow rounded'
			>
				{error && <p className='text-red-500'>{error}</p>}
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Name
					</label>
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						required
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Email
					</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						required
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Role
					</label>
					<select
						value={role}
						onChange={(e) => setRole(e.target.value)}
						className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						required
					>
						<option value=''>Select a role</option>
						<option value='Admin'>Admin</option>
						<option value='User'>User</option>
					</select>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Profile Picture
					</label>
					<input
						type='file'
						onChange={handleFileChange}
						className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
					/>
				</div>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center'
					disabled={loading}
				>
					{loading ? (
						<LoadingIndicator />
					) : userToEdit && userToEdit.id !== 0 ? (
						'Update User'
					) : (
						'Create User'
					)}
				</button>
			</form>
		</>
	);
};

export default UserForm;
