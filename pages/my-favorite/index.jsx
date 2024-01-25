import clsx from 'clsx';
import Card from '@/components/molecules/card/Card';
//동등한 구조의 style을 덮어쓰기 할때 page컴포넌트의 style이 제일 높은 우선순위를 가져야 되기 때문에 page전용 style이 제일 밑에 연결되어야 함
//위의 로직은 Card컴포넌트에 연결되어 있는 style이 우선 적용되고
//그 뒤에 페이지 스타일을 덮어쓰기
import styles from './my-favorite.module.scss';
import { useEffect, useState } from 'react';
import { useRecipesByIds } from '@/hooks/useRecipe';

export default function MyFavorite() {
	const [SavedId, setSavedId] = useState([]);

	useEffect(() => {
		setSavedId(JSON.parse(localStorage.getItem('favorite')) || []);
	}, []);

	const result = useRecipesByIds(SavedId);

	return (
		<section className={clsx(styles.myFavorite)}>
			<h1>My favorite</h1>
			{result.map(({ data, isSuccess }) => {
				if (isSuccess) {
					return (
						<Card
							key={data.idMeal}
							imgSrc={data.strMealThumb}
							txt={data.strMeal}
							className={styles.favoriteCard}
							url={`/find-recipe/${data.idMeal}?name=${data.strMeal}`}
							styleType={'horizontal'}
						/>
					);
				}
			})}
		</section>
	);
}
