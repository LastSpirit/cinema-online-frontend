import { getAdminUrl } from '@/config/url.config';
import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.types';

import { useDebounce } from '@/hooks/useDebounce';

import { GenreService } from '@/services/genre.service';

import { toastError } from '@/utils/toast-error';

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		['genre list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						id: genre.id,
						editUrl: getAdminUrl(`genre/edit/${genre.id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError(error) {
				toastError(error, 'genre list');
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { push } = useRouter();

	const { mutateAsync: createAsync } = useMutation(
		'create genre',
		() => GenreService.create(),
		{
			onError(error) {
				toastError(error, 'Create genre');
			},
			onSuccess({ data: id }) {
				toastr.success('Create genre', 'create was successful');
				push(getAdminUrl(`genre/edit/${id}`));
			},
		}
	);

	const { mutateAsync: deleteAsync } = useMutation(
		'delete genre',
		(genreId: number) => GenreService.deleteGenre(genreId),
		{
			onError(error) {
				toastError(error, 'Delete genre');
			},
			onSuccess() {
				toastr.success('Delete genre', 'delete was successful');
				queryData.refetch();
			},
		}
	);

	return useMemo(
		() => ({
			createAsync,
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	);
};
