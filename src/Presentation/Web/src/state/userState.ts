import { atom } from 'recoil';
import { User } from '../models/User';

export const userState = atom<User[]>({
	key: 'userState',
	default: [],
});
