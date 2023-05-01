import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import Catalog from '@/components/ui/catalog-movies/Catalog';

import { IActor, IMovie } from '@/shared/types/movie.types';

import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';

import Error404 from '../404';

interface IGenrePage {
	movies: IMovie[];
	actor?: IActor;
}

const ActorPage: NextPage<IGenrePage> = ({ movies, actor }) => {
	return actor ? (
		<Catalog movies={movies || []} title={actor.name} />
	) : (
		<Error404 />
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await ActorService.getAll();
		const paths = genres.map((a) => ({
			params: { slug: a.slug },
		}));

		return {
			paths,
			fallback: 'blocking',
		};
	} catch (e) {
		return {
			paths: [],
			fallback: false,
		};
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: actor } = await ActorService.getBySlug(String(params?.slug));
		const { data: movies } = await MovieService.getByActor(actor.id);
		return {
			props: {
				movies,
				actor,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default ActorPage;
