import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<Head>
				<title>B2B Marketplace</title>
				<meta
					name='description'
					content='Building your one-stop B2B marketplace'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
			</Head>
			<main>
				<div>
					<h1>Hello!</h1>
				</div>
			</main>
		</>
	);
}
