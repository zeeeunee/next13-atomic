import Pic from '@/components/atoms/pic/Pic';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TableY } from '@/components/atoms/table/Table';
import List from '@/components/atoms/list/List';
import Text from '@/components/atoms/text/Text';
import { BounceLoader } from 'react-spinners';

/*
	다이나믹 라우터 페이지 컴포넌트에서 페이지 트랜지션 모션 작동시 페이지 변경될때 prop오류 뜨는 이유와 해결방법
	원인: 기본적으로 next는 라우터로 path명이 변경될때마다 언마운트되는 컴포넌트에서 csr방식으로 가져온 데이터와 styleNode를 물리적으로 제거

	AnimatePresence에서 트리거 조건을 router의 path명 변경으로 설정했기 때문에 라우터패스는 이미 변경이 됬지만 모션이 끝날때까지 해당 페이지컴포넌트의 unmount시점을 지연시킴 (이미 path는 변경되서 csr데이터와 스타일노드는 이미 제거됐는데 페이지컴포넌트가 보이는것이 문제)

	해결방법: csr방식으로 가져오는 데이터 자체를 컴포넌트 렌더링의 조건으로 설정
	- 데이터가 없으면 로딩바를 대신 출력, 데이터가 있으면 데이터를 활용하는 컴포넌트를 출력
*/

export default function Detail() {
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);
	const [Saved, setSaved] = useState(false);

	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);

	const handleSave = () => {
		const savedRecipe = JSON.parse(localStorage.getItem('favoraite')) || [];

		if (!Saved) {
			savedRecipe.push(data.idMeal);
			localStorage.setItem('favoraite', JSON.stringify(savedRecipe));
			setSaved(true);
		} else {
			savedRecipe.splice(savedRecipe.indexOf(data.idMeal), 1);
			localStorage.setItem('favoraite', JSON.stringify(savedRecipe));
			setSaved(false);
		}
	};

	useEffect(() => {
		const savedRecipe = JSON.parse(localStorage.getItem('favoraite')) || [];
		savedRecipe.includes(id) ? setSaved(true) : setSaved(false);
	}, [id]);

	useEffect(() => {
		if (data) {
			let keys = Object.keys(data);
			keys = keys.filter(key => key.startsWith('strIngredient'));
			keys = keys.filter(key => data[key] !== '' && data[key] !== null);

			const ingredients = keys.map((_, idx) => ({
				no: idx + 1,
				ingredient: data[`strIngredient${idx + 1}`],
				measure: data[`strMeasure${idx + 1}`]
			}));
			setTableData(ingredients);

			const instructions = data.strInstructions
				.split('\r\n')
				.map(txt => (txt.includes('.\t') ? txt.split('.\t')[1] : txt))
				.filter(txt => txt !== '');
			setListData(instructions);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			{/* csr방식으로 가져오는 데이터가 없을때에는 로딩바를 대신출력 */}
			<BounceLoader
				loading={!data}
				cssOverride={{ position: 'absolute', top: 300, left: '50%', transform: 'translateX(-50%)' }}
				color={'var(--point)'}
				size={100}
			/>
			{/* data가 있을때에만 컨텐츠 출력 */}
			{data && (
				<>
					<div className={clsx(styles.upper)}>
						<h1>{data.strMeal}</h1>
						<Text className={styles.btnFavoraite} styleType={'button'} onClick={handleSave} isOn={Saved}>
							{Saved ? 'Remove from My Favoraite' : 'Add to My Favoraite'}
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
