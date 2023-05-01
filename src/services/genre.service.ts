import { axiosClassic } from '@/api/interseptors';
import axios from '@/api/interseptors';
import { getGenresUrl } from '@/config/api.config';

import { IGenreEditInput } from '@/components/screens/admin/genre/genre-edit.interface';

import { IGenre } from '@/shared/types/movie.types';

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getById(id: number) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${id}`));
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`));
	},

	async create() {
		return axios.post<number>(getGenresUrl(`/`));
	},

	async deleteGenre(id: number) {
		return axios.delete<string>(getGenresUrl(`/${id}`));
	},

	async update(id: number, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${id}`), data);
	},
};
