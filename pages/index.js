import Head from 'next/head';
import axios from 'axios';
import Pic from '@/components/pic/Pic';
import clsx from 'clsx';
import styles from './Home.module.scss';

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
				{mealsData.map((item) => {
					return (
						<div key={item.idMeal}>
							<div className={clsx(styles.bg)}>
								<Pic imgSrc={item.strMealThumb} />
							</div>

							<h2>{item.strMeal}</h2>
						</div>
					);
				})}
			</main>
		</>
	);
}

//ssg방식으로 페이지 렌더링
export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
