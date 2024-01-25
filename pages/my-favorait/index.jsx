import clsx from 'clsx';
import Card from '@/components/molecules/card/Card';
//동등한 구조의 style을 덮어쓰기 할때 page컴포넌트의 style이 제일 높은 우선순위를 가져야 되기 때문에 page전용 style이 제일 및에 연결되야됨
//위의 로직은 Card컴포넌트에 연결되어 있는 style이 우선적용되고
//그 뒤에 페이지 스타일을 덮어쓰기
import styles from './my-favorait.module.scss';
import { useEffect, useState } from 'react';
import { useRecipesByIds } from '@/hooks/useRecipe';

export default function MyFavoraite() {
	const [SavedId, setSavedId] = useState([]);

	useEffect(() => {
		setSavedId(JSON.parse(localStorage.getItem('favoraite')) || []);
	}, []);

	const result = useRecipesByIds(SavedId);

	return (
		<section className={clsx(styles.myFavorait)}>
			<h1>My Favorait</h1>

			{result.map(({ data, isSuccess }) => {
				if (isSuccess) {
					return (
						<Card
							key={data.idMeal}
							imgSrc={data.strMealThumb}
							txt={data.strMeal}
							className={styles.favoraitCard}
							url={`/find-recipe/${data.idMeal}?name=${data.strMeal}`}
							styleType={'horizontal'}
						/>
					);
				}
			})}
		</section>
	);
}
