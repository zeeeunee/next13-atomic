import clsx from 'clsx';
import axios from 'axios';
import styles from './find-recipe.module.scss';
import Category from '@/components/molecules/category/Category';
import { useState, useEffect } from 'react';
import { useRecipeByCategory, useRecipeBySearch } from '@/hooks/useRecipe';
import Card from '@/components/molecules/card/Card';
import SearchBar from '@/components/molecules/searchBar/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import Text from '@/components/atoms/text/Text';

export default function FindRecipe({ categories }) {
	const [Names, setNames] = useState(categories.map((el) => el.strCategory));
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');
	const DebouncedSelected = useDebounce(Selected);
	const DebouncedSearch = useDebounce(Search);

	const { data: dataByCategory, isSuccess } = useRecipeByCategory(DebouncedSelected, '');
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(DebouncedSearch);

	const handleClick = (activeEl) => {
		//카테고리 버튼 클릭시 기존 Search값을 비워서 기존 검색목록을 제거하고 선택된 카테고리 목록 출력
		setSearch('');
		setSelected(activeEl);
	};

	useEffect(() => {
		//검색어가 있으면 Selected를 비워서 기존의 선택된 카테고리 메뉴목록 제거
		if (Search) {
			setSelected('');
		} else {
			setSelected(categories[0].strCategory);
		}
	}, [Search]);

	return (
		<section className={clsx(styles.findRecipe)}>
			<div className={clsx(styles.controller)}>
				<Category dataArr={Names} selectedEl={Selected} onClick={handleClick} className={clsx(styles.category)} />
				<SearchBar value={Search} onChange={setSearch} placeholder={'Search Recipe'} className={clsx(styles.searchBox)} />
			</div>

			<h1>{Search ? `Keyword: ${Search}` : Selected}</h1>

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

			{isSearch &&
				dataBySearch.map((data) => {
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
			{isSearch && dataBySearch.length === 0 && (
				<Text>
					No Results!! <br /> Try Another Recipe Name.
				</Text>
			)}

			{/* {Search === '' && <Text>There is no Keyword you Input..</Text>} */}
		</section>
	);
}
export async function getStaticProps() {
	const { data } = await axios.get(`/categories.php`);
	return {
		props: { categories: data.categories },
	};
}
