import { FC } from 'react';
import { useQuery } from 'react-query';

import SkeletonLoader from '@/components/ui/SkeletonLoader';

import { MovieService } from '@/services/movie.service';

import MovieList from './MovieList';

const PopularMovies: FC = () => {
	const { isLoading, data: popularMovies } = useQuery(
		'Popular movies in sidebar',
		() => MovieService.getMostPopularMovies()
	);
	if (isLoading) {
		return (
			<div className="mt-11">
				<SkeletonLoader count={3} className="h-28 mb-4" />
			</div>
		);
	}

	return (
		<MovieList
			link="/trending"
			movies={popularMovies || []}
			title="Popular Movies"
		/>
	);
};

export default PopularMovies;
