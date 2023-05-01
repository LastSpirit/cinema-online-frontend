import { IMoviePage } from '@/pages/movie/[slug]';
import dynamic from 'next/dynamic';
import { FC } from 'react';

import Banner from '@/components/ui/banner/Banner';
import Content from '@/components/ui/banner/Content/Content';
import Gallery from '@/components/ui/gallery/Gallery';
import SubHeading from '@/components/ui/heading/SubHeading';

import Meta from '@/utils/meta/Meta';

const DynamicPlayer = dynamic(
	() => import('@/components/ui/video-player/VideoPlayer'),
	{
		ssr: false,
	}
);
const DynamicRateMovie = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false,
});

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	// useUpdateCountOpened(movie.slug)

	return (
		<Meta title={movie?.title || ''} description={`Watch ${movie?.title}`}>
			<Banner
				imagePath={movie?.bigPoster || ''}
				Detail={() => <Content movie={movie} />}
			/>

			<DynamicPlayer videoSource={movie.videoUrl} slug={movie.slug} />

			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>

			<DynamicRateMovie slug={movie.slug} id={movie.id} />
		</Meta>
	);
};

export default SingleMovie;
