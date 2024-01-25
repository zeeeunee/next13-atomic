import Pic from '@/components/atoms/pic/Pic';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TableY } from '@/components/atoms/table/Table';

export default function Detail() {
	const [TableData, setTableData] = useState([]);

	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	console.log(data);

	/*
	##Table에 전달해야 될 요리재료 데이터 구조
	const ingredients = [
		{ no: 1, ingredient: 'tomato', measure: '1each' },
		{ no: 2, ingredient: 'sugar', measure: '2tspoon' },
		{ no: 3, ingredient: 'water', measure: '2cups' }
	];	
	*/

	useEffect(() => {
		if (data) {
			let keys = Object.keys(data);
			keys = keys.filter((key) => key.startsWith('strIngredient')); //strIngredient로 시작하는 키값만 뽑아냄
			keys = keys.filter((key) => data[key] !== '' && data[key] !== null); //뽑아낸 키값에서 value값이 비어있지 않는값만 다시 추출

			const ingredients = keys.map((key, idx) => ({
				no: idx + 1,
				ingredient: data[`strIngredient${idx + 1}`],
				measure: data[`strMeasure${idx + 1}`],
			}));

			setTableData(ingredients);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			{isSuccess && (
				<>
					<h1>{data.strMeal}</h1>
					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>

					{<TableY data={TableData} title={'Ingredients'} className={clsx(styles.detailTable)} />}
				</>
			)}
		</section>
	);
}
