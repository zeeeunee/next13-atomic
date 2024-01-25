import clsx from 'clsx';
import axios from 'axios';
import styles from './find-recipe.module.scss';
import Category from '@/components/molecules/category/Category';
import { useState } from 'react';
import { useRecipeByCategory } from '@/hooks/useRecipe';
import Card from '@/components/molecules/card/Card';
export default function FindRecipe({ categories }) {
	const [Names, setNames] = useState(categories.map((el) => el.strCategory));
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const { data: dataByCategory, isSuccess } = useRecipeByCategory(Selected, '');
	const handleClick = (activeEl) => {
		setSelected(activeEl);
	};
	return (
		<section className={clsx(styles.findRecipe)}>
			<Category dataArr={Names} selectedEl={Selected} onClick={handleClick} className={clsx(styles.category)} />
			<h1>{Selected}</h1>
			{isSuccess &&
				dataByCategory.map((data) => {
					return (
						<Card
							key={data.idMeal}
							imgSrc={data.strMealThumb}
							txt={data.strMeal}
							className={clsx(styles.foodItem)}
							url={`/find-recipe/${data.idMeal}?name=${data.strMeal}`}
						/>
					);
				})}
		</section>
	);
}
export async function getStaticProps() {
	const { data } = await axios.get(`/categories.php`);
	return {
		props: { categories: data.categories },
	};
}
