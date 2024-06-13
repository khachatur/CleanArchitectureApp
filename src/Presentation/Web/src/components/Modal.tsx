import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
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
				<h2 className='text-xl font-bold mb-4'>{title}</h2>
				{children}
			</div>
		</div>
	);
};

export default Modal;
