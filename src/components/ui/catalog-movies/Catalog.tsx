import { getMovieUrl } from '@/config/url.config';
import { FC } from 'react';

import Meta from '@/utils/meta/Meta';

import GalleryItem from '../gallery/GalleryItem';
import Description from '../heading/Description';
import Heading from '../heading/Heading';
import styles from './Catalog.module.scss';
import { ICatalog } from './catalog.types';

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description text={description} className={styles.description} />
			)}

			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie.id}
						item={{
							name: movie.title,
							posterPath: movie.bigPoster,
							link: getMovieUrl(movie.slug),
							content: {
								title: movie.title,
							},
						}}
						variant="horizontal"
					/>
				))}
			</section>
		</Meta>
	);
};

export default Catalog;
