import React from 'react';

interface NotificationProps {
	message: string;
	type: 'success' | 'error';
	onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
	message,
	type,
	onClose,
}) => {
	return (
		<div
			className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${
				type === 'success' ? 'bg-green-500' : 'bg-red-500'
			} text-white`}
		>
			<div className='flex justify-between items-center'>
				<span>{message}</span>
				<button
					onClick={onClose}
					className='ml-4'
				>
					&times;
				</button>
			</div>
		</div>
	);
};

export default Notification;
