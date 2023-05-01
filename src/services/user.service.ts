import axios from '@/api/interseptors';
import { getUsersUrl } from '@/config/api.config';

import { IProfileInput } from '@/components/screens/profile/profile.types';

import { IUser } from '@/shared/types/user.types';

export const UserService = {
	async getAll(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getProfile() {
		return axios.get<IUser>(getUsersUrl('/profile'));
	},

	async getById(id: number) {
		return axios.get<IUser>(getUsersUrl(`/${id}`));
	},

	async updateProfile(data: IProfileInput) {
		return axios.put<string>(getUsersUrl('/profile'), data);
	},

	async update(id: number, data: IProfileInput) {
		return axios.put<string>(getUsersUrl(`/${id}`), data);
	},

	async deleteUser(id: number) {
		return axios.delete<string>(getUsersUrl(`/${id}`));
	},
};
