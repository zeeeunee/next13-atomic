import Head from 'next/head';
import axios from 'axios';
import Image from 'next/image';
import Pic from '@/components/pic/Pic';
import styles from './Home.module.scss';
import clsx from 'clsx';
import Text from '@/components/text/Text';

export default function Home({ meals }) {
	console.log('ssg', meals);
	const mealsData = meals.slice(0, 5);
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={styles.main}>
				<h1>Main page</h1>
				{/* {mealsData.map((item) => {
					return (
						<div key={item.idMeal}>
							<div className={clsx(styles.bg)}>
								<Pic imgSrc={item.strMealThumb} imgTxt={item.strMeal} url={'/gallery'} />
							</div>
						</div>
					);
				})} */}
				<Text tagName={'h1'}>Hello</Text>
				<Text tagName={'p'}>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet fugiat tenetur, voluptate quia nulla distinctio quaerat aliquam eligendi
					blanditiis repellendus placeat atque, veritatis optio culpa ducimus, magni quo dolorum itaque!
				</Text>
				<Text>안녕하세요.</Text>
			</main>
		</>
	);
}
//ssg방식으로 페이지 렌더링
export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
