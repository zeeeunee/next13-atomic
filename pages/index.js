import Head from 'next/head';
import axios from 'axios';
import styles from './Home.module.scss';
import clsx from 'clsx';
import List from '@/components/atoms/list/List';

export default function Home({ meals }) {
	console.log('ssg', meals);
	const topRated = ['Avartar', 'Emma', 'AquaMan'];
	const url = ['/', '/gallery', '/about'];

	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={styles.main}>
				<List data={topRated} tagName={'ol'} divider={'-'} url={url} />
			</main>
		</>
	);
}
//ssg방식으로 페이지 렌더링
export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
