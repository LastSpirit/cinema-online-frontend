import { axiosClassic } from '@/api/interseptors';
import axios from '@/api/interseptors';
import { getMoviesUrl } from '@/config/api.config';

import { IMovieEditInput } from '@/components/screens/admin/movie/movie-edit.interface';

import { IMovie } from '@/shared/types/movie.types';

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		);

		return movies;
	},

	async getById(id: number) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${id}`));
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`));
	},

	async getByActor(actorId: number) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`));
	},

	async getByGenres(genreIds: number[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl('/by-genres'), {
			genreIds,
		});
	},

	async update(id: number, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${id}`), data);
	},

	async create() {
		return axios.post<number>(getMoviesUrl(`/`));
	},

	async deleteMovie(id: number) {
		return axios.delete<string>(getMoviesUrl(`/${id}`));
	},
};
