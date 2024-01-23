import Head from 'next/head';
import axios from 'axios';
import styles from './Home.module.scss';
import clsx from 'clsx';
import Detail from './find-recipe/[id]';

export default function Home({ meals }) {
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={styles.main}>
				<Detail />
			</main>
		</>
	);
}
//ssg방식으로 페이지 렌더링
export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
