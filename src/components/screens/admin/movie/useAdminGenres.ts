import { useQuery } from 'react-query';

import { IOption } from '@/components/ui/select/select.interface';

import { GenreService } from '@/services/genre.service';

import { toastError } from '@/utils/toast-error';

export const useAdminGenres = () => {
	const queryData = useQuery('list of genre', () => GenreService.getAll(), {
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre.id,
				})
			),
		onError(error) {
			toastError(error, 'genre list');
		},
	});

	return queryData;
};
