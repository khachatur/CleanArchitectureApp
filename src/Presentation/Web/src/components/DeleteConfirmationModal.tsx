import React from 'react';

interface DeleteConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	userName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	userName,
}) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-4 rounded shadow-lg relative w-1/3'>
				<button
					onClick={onClose}
					className='absolute top-2 right-2'
				>
					&times;
				</button>
				<h2 className='text-xl font-bold mb-4'>Delete User</h2>
				<p>Are you sure you want to delete {userName}?</p>
				<div className='mt-4 flex justify-end space-x-2'>
					<button
						onClick={onClose}
						className='bg-gray-500 text-white px-4 py-2 rounded'
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className='bg-red-500 text-white px-4 py-2 rounded'
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteConfirmationModal;
