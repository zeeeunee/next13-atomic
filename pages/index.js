import Head from 'next/head';
import axios from 'axios';

export default function Home(props) {
	console.log('ssg', props);
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>
			<main>
				<h1>Main page</h1>
			</main>
		</>
	);
}

//ssg방식으로 페이지 렌더링
export async function getStaticProps() {
	//serialize 에러시 반환받은 propmise객체에서 실제 data값까지 뽑아낸다음에 props로 전달
	const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
	//리턴으로 props객체를 컴포넌트로 전달시 revalidate가 없으면 ssg방식, 있으면 isr방식
	return { props: data, revalidate: 60 * 60 * 24 };
}
