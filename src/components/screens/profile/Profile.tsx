import { FC } from 'react';
import { useForm } from 'react-hook-form';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import Button from '@/components/ui/form-elements/Button';
import Heading from '@/components/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import AuthFields from '../Auth/AuthFields';
import styles from './Profile.module.scss';
import { IProfileInput } from './profile.types';
import { useProfile } from './useProfile';

export const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		});

	const { isLoading, onSubmit } = useProfile(setValue);

	return (
		<Meta title="Profile">
			<Heading title="Profile" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields
						register={register}
						formState={formState}
						isPasswordRequired={false}
					/>
				)}

				<Button>Update</Button>
			</form>
		</Meta>
	);
};
