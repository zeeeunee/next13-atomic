import Pic from '@/components/atoms/pic/Pic';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TableY } from '@/components/atoms/table/Table';
import List from '@/components/atoms/list/List';
import Text from '@/components/atoms/text/Text';
export default function Detail() {
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);
	const [Saved, setSaved] = useState(false); //해당값의 유무에 따라 즐겨찾기유무 확인
	console.log(Saved);
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);

	//즐겨찾기 버튼 토글시 로컬저장소에 params로 들어온 레시피 아이디값을 저장해주는 함수
	const handleSave = () => {
		const savedRecipe = JSON.parse(localStorage.getItem('favorite')) || [];

		if (!Saved) {
			savedRecipe.push(data.idMeal);
			localStorage.setItem('favorite', JSON.stringify(savedRecipe));
			setSaved(true);
		} else {
			//배열.splice(삭제할배열의 순번위치, 삭제할 갯수)
			savedRecipe.splice(savedRecipe.indexOf(data.idMeal), 1);
			localStorage.setItem('favorite', JSON.stringify(savedRecipe));
			setSaved(false);
		}
	};

	//사용자 이벤트가 아닌 해당 페이지컴포넌트가 마운트시 로컬저장소의 값을 비교해서 즐겨찾기버튼 상태변경
	useEffect(() => {
		const savedRecipe = JSON.parse(localStorage.getItem('favorite')) || [];
		savedRecipe.includes(id) ? setSaved(true) : setSaved(false);
	}, [id]);

	useEffect(() => {
		if (data) {
			let keys = Object.keys(data);
			keys = keys.filter((key) => key.startsWith('strIngredient'));
			keys = keys.filter((key) => data[key] !== '' && data[key] !== null);

			const ingredients = keys.map((_, idx) => ({
				no: idx + 1,
				ingredient: data[`strIngredient${idx + 1}`],
				measure: data[`strMeasure${idx + 1}`],
			}));
			setTableData(ingredients);

			const instructions = data.strInstructions
				.split('\r\n')
				.map((txt) => (txt.includes('.\t') ? txt.split('.\t')[1] : txt))
				.filter((txt) => txt !== '');
			setListData(instructions);
		}
	}, [data]);
	return (
		<section className={clsx(styles.detail)}>
			{isSuccess && (
				<>
					<div className={clsx(styles.upper)}>
						<h1>{data.strMeal}</h1>
						<Text className={styles.btnFavorite} styleType={'button'} onClick={handleSave} isOn={Saved}>
							{Saved ? 'Remove from My Favorite' : 'Add to My Favorite'}
						</Text>
					</div>

					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>
					<TableY data={TableData} title={'Ingredients'} className={clsx(styles.detailTable)} />
					<List data={ListData} tagName={'ol'} className={clsx(styles.detailList)} divider={'-'} />
				</>
			)}
		</section>
	);
}
