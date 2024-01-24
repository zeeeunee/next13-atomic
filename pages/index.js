import Head from 'next/head';
import axios from 'axios';
import styles from './Home.module.scss';
import clsx from 'clsx';
import { TableX } from '@/components/atoms/table/Table';

export default function Home({ meals }) {
	const data = [
		{ name: 'Andy', age: 20, address: 'Seoul' },
		{ name: 'Daivd', age: 30, address: 'Busan' },
		{ name: 'Emily', age: 40, address: 'Daegu' },
		{ name: 'Paul', age: 50, address: 'Incheon' },
	];

	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={styles.main}>
				<TableX data={data} />
			</main>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
