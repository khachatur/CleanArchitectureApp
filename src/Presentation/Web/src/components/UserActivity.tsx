import React, { useEffect, useState } from 'react';

interface UserActivity {
	id: number;
	userId: number;
	action: string;
	timestamp: string;
}

const UserActivity: React.FC<{ userId: number }> = ({ userId }) => {
	const [activities, setActivities] = useState<UserActivity[]>([]);

	useEffect(() => {
		const fetchActivities = async () => {
			// Fetch user activities from the API (implement this logic as needed)
			// const response = await getUserActivities(userId);
			// setActivities(response.data);
		};

		fetchActivities();
	}, [userId]);

	return (
		<div>
			<h3 className='text-lg font-medium'>User Activities</h3>
			<ul>
				{activities.map((activity) => (
					<li
						key={activity.id}
						className='border-b py-2'
					>
						<p>
							<strong>Action:</strong> {activity.action}
						</p>
						<p>
							<strong>Timestamp:</strong> {activity.timestamp}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserActivity;
