import axios from '@/api/interseptors';
import { getRatingsUrl } from '@/config/api.config';

export const RatingService = {
	async setRating(movieId: number, value: number) {
		return axios.post<string>(getRatingsUrl('/set-rating'), {
			movieId,
			value,
		});
	},

	async getByUserMovie(movieId: number) {
		return axios.get<number>(getRatingsUrl(`/${movieId}`));
	},
};
