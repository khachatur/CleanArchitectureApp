import axios from 'axios';
import { User } from '../models/User';

const API_URL = 'https://localhost:7289/api/user';

const handleRequest = async <T>(request: () => Promise<T>): Promise<T> => {
	try {
		return await request();
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const errorMessage = error.response.data?.message || error.message;
			throw new Error(errorMessage);
		} else {
			throw new Error('Failed to complete request');
		}
	}
};

export const getAllUsers = async (): Promise<User[]> => {
	return handleRequest(() =>
		axios.get<User[]>(API_URL).then((response) => response.data)
	);
};

export const getUserById = async (id: number): Promise<User> => {
	return handleRequest(() =>
		axios.get<User>(`${API_URL}/${id}`).then((response) => response.data)
	);
};

export const createUser = async (user: User): Promise<void> => {
	return handleRequest(() =>
		axios.post(API_URL, user).then((response) => response.data)
	);
};

export const updateUser = async (user: User): Promise<void> => {
	return handleRequest(() =>
		axios.put(`${API_URL}/${user.id}`, user).then((response) => response.data)
	);
};

export const deleteUser = async (id: number): Promise<void> => {
	return handleRequest(() =>
		axios.delete(`${API_URL}/${id}`).then((response) => response.data)
	);
};
