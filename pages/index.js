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
				<Text url={'/'} tagName={'h1'} styleType={'logo'}>
					DCODELAB
				</Text>

				<Text tagName={'h2'} styleType={'title1'}>
					Title comes here.
				</Text>

				<Text>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque fugit vero voluptate accusamus magni cum sit perspiciatis quisquam officia
					sed.
				</Text>

				<Text styleType={'slogan'}>Slogan</Text>
			</main>
		</>
	);
}
//ssg방식으로 페이지 렌더링
export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
