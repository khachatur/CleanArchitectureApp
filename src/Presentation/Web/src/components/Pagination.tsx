import React from 'react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePageChange = (page: number) => {
		if (page > 0 && page <= totalPages) {
			onPageChange(page);
		}
	};

	const getPaginationNumbers = () => {
		const numbers = [];
		for (let i = 1; i <= totalPages; i++) {
			numbers.push(i);
		}
		return numbers;
	};

	return (
		<div className='flex justify-center space-x-2 mt-4'>
			<button
				onClick={() => handlePageChange(1)}
				className='px-2 py-1 border rounded-md bg-gray-200'
				disabled={currentPage === 1}
			>
				First
			</button>
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				className='px-2 py-1 border rounded-md bg-gray-200'
				disabled={currentPage === 1}
			>
				Previous
			</button>
			{getPaginationNumbers().map((number) => (
				<button
					key={number}
					onClick={() => handlePageChange(number)}
					className={`px-2 py-1 border rounded-md ${
						currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'
					}`}
				>
					{number}
				</button>
			))}
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				className='px-2 py-1 border rounded-md bg-gray-200'
				disabled={currentPage === totalPages}
			>
				Next
			</button>
			<button
				onClick={() => handlePageChange(totalPages)}
				className='px-2 py-1 border rounded-md bg-gray-200'
				disabled={currentPage === totalPages}
			>
				Last
			</button>
		</div>
	);
};

export default Pagination;
