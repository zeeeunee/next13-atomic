import Head from 'next/head';
import axios from 'axios';
import Image from 'next/image';
import Pic from '@/components/atoms/pic/Pic';
import styles from './Home.module.scss';
import clsx from 'clsx';
import Text from '@/components/atoms/text/Text';

export default function Home({ meals }) {
	console.log('ssg', meals);
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={styles.main}>
				<Text styleType={'slogan'}>Slogan</Text>
				<Text styleType={'slogan'} className={clsx(styles.customTit)}>
					Slogan2
				</Text>
			</main>
		</>
	);
}
//ssg방식으로 페이지 렌더링
export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
