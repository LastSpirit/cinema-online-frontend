import { axiosClassic } from '@/api/interseptors';
import axios from '@/api/interseptors';
import { getActorUrl } from '@/config/url.config';

import { IActorEditInput } from '@/components/screens/admin/actor/actor-edit.interface';

import { IActor } from '@/shared/types/movie.types';

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getById(id: number) {
		return axios.get<IActorEditInput>(getActorUrl(`/${id}`));
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorUrl(`/by-slug/${slug}`));
	},

	async update(id: number, data: IActorEditInput) {
		return axios.put<string>(getActorUrl(`/${id}`), data);
	},

	async create() {
		return axios.post<number>(getActorUrl(`/`));
	},

	async deleteACtor(id: number) {
		return axios.delete<string>(getActorUrl(`/${id}`));
	},
};
