import MainProvider from '@/providers/MainProvider';
import type { AppProps } from 'next/app';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';

import '@/assets/styles/globals.scss';

type TypeAppProps = AppProps & TypeComponentAuthFields;

export default function App({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	);
}
