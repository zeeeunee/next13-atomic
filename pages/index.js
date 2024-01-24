import Head from 'next/head';
import styles from './Home.module.scss';
import axios from 'axios';
import Image from 'next/image';
import Layout from '@/components/template/layout/Layout';

export default function Home({ meals, category }) {
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<div className={styles.main}>
				<Layout>
					<h1>Main Page</h1>
					<h2>{category}</h2>

					{meals.map((data, idx) => {
						if (idx > 5) return null;
						return (
							<article key={idx}>
								<Image src={data.strMealThumb} alt={data.strMeal} width={100} height={100} priority />
								<h3>{data.strMeal}</h3>
							</article>
						);
					})}
				</Layout>
			</div>
		</>
	);
}
export async function getStaticProps() {
	const list = [];
	const { data: obj } = await axios.get('/categories.php');
	const items = obj.categories;
	items.forEach((el) => list.push(el.strCategory));
	const newList = list.filter((el) => el !== 'Goat' && el !== 'Vegan' && el !== 'Starter');
	//newList의 숫자를 최대치로한 랜덤 정수 반환
	const randomNum = Math.floor(Math.random() * newList.length);
	const { data: meals } = await axios.get(`/filter.php?c=${newList[randomNum]}`);
	return {
		props: { ...meals, category: newList[randomNum] },
		revalidate: 60,
	};
}
