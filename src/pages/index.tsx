import { getActorUrl, getMovieUrl } from '@/config/url.config';
import { GetStaticProps, NextPage } from 'next';

import Home from '@/components/screens/home/Home';
import { IHome } from '@/components/screens/home/home.interface';
import { IGalleryItem } from '@/components/ui/gallery/gallery.types';
import { ISlide } from '@/components/ui/slider/slider.types';

import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';

import { getGenresList } from '@/utils/movie/getGenresListEach';

const HomePage: NextPage<IHome> = (props) => {
	return <Home {...props} />;
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll();

		const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
			id: m.id,
			link: getMovieUrl(m.slug),
			bigPoster: m.bigPoster,
			subTitle: getGenresList(m.genres),
			title: m.title,
		}));

		const { data: dataActors } = await ActorService.getAll();

		const actors: IGalleryItem[] = dataActors.slice(0, 7).map((n) => ({
			name: n.name,
			posterPath: n.photo,
			link: getActorUrl(n.slug),
			content: {
				title: n.name,
				subTitle: `+${n.countMovies} movies`,
			},
		}));

		const dataTrendingMovies = await MovieService.getMostPopularMovies();

		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 7)
			.map((n) => ({
				name: n.title,
				posterPath: n.poster,
				link: getMovieUrl(n.slug),
			}));

		return {
			props: {
				slides,
				actors,
				trendingMovies,
			} as IHome,
		};
	} catch (error) {
		return {
			props: {
				slides: [],
				actors: [],
				trendingMovies: [],
			},
		};
	}
};
