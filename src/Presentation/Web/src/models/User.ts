export interface User {
	id: number;
	name: string;
	email: string;
	role: string; // Add the role property
	profilePictureUrl?: string; // Add optional profile picture URL
}
