import { getAdminUrl } from '@/config/url.config';
import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.types';

import { useDebounce } from '@/hooks/useDebounce';

import { UserService } from '@/services/user.service';

import { convertDate } from '@/utils/date/contertDate';
import { toastError } from '@/utils/toast-error';

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		['user list', debouncedSearch],
		() => UserService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						id: Number(user.id),
						editUrl: getAdminUrl(`user/edit/${user.id}`),
						items: [user.email, convertDate(user.createdAt)],
					})
				),
			onError(error) {
				toastError(error, 'user list');
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		'delete user',
		(userId: number) => UserService.deleteUser(userId),
		{
			onError(error) {
				toastError(error, 'Delete user');
			},
			onSuccess() {
				toastr.success('Delete user', 'delete was successful');
				queryData.refetch();
			},
		}
	);

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
		}),
		[queryData, searchTerm, deleteAsync]
	);
};
