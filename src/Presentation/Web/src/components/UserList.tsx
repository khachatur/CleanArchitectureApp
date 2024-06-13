import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../state/userState';
import { getAllUsers } from '../services/userService';
import UserItem from './UserItem';
import UserForm from './UserForm';
import { User } from '../models/User';
import LoadingIndicator from './LoadingIndicator';
import Pagination from './Pagination';
import UserDetail from './UserDetail';
import Modal from './Modal';

const UserList: React.FC = () => {
	const [users, setUsers] = useRecoilState(userState);
	const [userToEdit, setUserToEdit] = useState<User | null>(null);
	const [userToView, setUserToView] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [sortField, setSortField] = useState<keyof User>('name');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const itemsPerPage = 5; // Adjust the number of items per page as needed

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await getAllUsers();
				setUsers(data);
				setTotalPages(Math.ceil(data.length / itemsPerPage));
				setLoading(false);
			} catch (err) {
				setError('Failed to fetch users. Please try again later.');
				setLoading(false);
			}
		};

		fetchUsers();
	}, [setUsers]);

	const handleEdit = (user: User) => {
		setUserToEdit(user);
	};

	const handleView = (user: User) => {
		setUserToView(user);
	};

	const handleFormSubmit = () => {
		setUserToEdit(null);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSort = (field: keyof User) => {
		const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
		setSortField(field);
		setSortOrder(order);
	};

	const filteredUsers = users
		.filter(
			(user) =>
				user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.email.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort((a, b) => {
			const aValue = a[sortField] ?? '';
			const bValue = b[sortField] ?? '';

			if (aValue < bValue) {
				return sortOrder === 'asc' ? -1 : 1;
			}
			if (aValue > bValue) {
				return sortOrder === 'asc' ? 1 : -1;
			}
			return 0;
		});

	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedUsers = filteredUsers.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	if (loading) {
		return <LoadingIndicator />;
	}

	if (error) {
		return <p className='text-red-500'>{error}</p>;
	}

	return (
		<div className='space-y-4'>
			<input
				type='text'
				placeholder='Search by name or email'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className='p-2 border rounded'
			/>
			<button
				onClick={() =>
					setUserToEdit({
						id: 0,
						name: '',
						email: '',
						role: '',
						profilePictureUrl: '',
					})
				}
				className='bg-green-500 text-white px-4 py-2 rounded'
			>
				Create User
			</button>
			<div className='flex justify-between'>
				<button
					onClick={() => handleSort('name')}
					className='bg-blue-500 text-white px-2 py-1 rounded'
				>
					Sort by Name{' '}
					{sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
				</button>
				<button
					onClick={() => handleSort('email')}
					className='bg-blue-500 text-white px-2 py-1 rounded'
				>
					Sort by Email{' '}
					{sortField === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
				</button>
			</div>
			<div>
				{paginatedUsers.length > 0 ? (
					paginatedUsers.map((user) => (
						<UserItem
							key={user.id}
							user={user}
							onEdit={handleEdit}
							onView={handleView}
						/>
					))
				) : (
					<p className='text-gray-500'>No users found</p>
				)}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
			{userToView && (
				<UserDetail
					user={userToView}
					onClose={() => setUserToView(null)}
				/>
			)}
			<Modal
				isOpen={!!userToEdit}
				onClose={() => setUserToEdit(null)}
				title={userToEdit?.id === 0 ? 'Create User' : 'Update User'}
			>
				{userToEdit && (
					<UserForm
						userToEdit={userToEdit}
						onSubmit={handleFormSubmit}
					/>
				)}
			</Modal>
		</div>
	);
};

export default UserList;
