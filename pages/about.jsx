import clsx from 'clsx';
import styles from './about.module.scss';
import Card from '@/components/molecules/card/Card';

//atomic 패턴개발에서 스타일시 주의점
//원자단위, 분자단위 컴포넌트에서는 많이 쓰일만한 베이직한 스타일만 적용
//특정 스타일로 자주쓰이는 디자인패턴이 있다면 styleType로 연동처리
//페이지별로 상세 디자인은 가급적 호출하는 페이지컴포넌트 레벨에서 className을 상속함으로서 스타일 지정
export default function Pages() {
	return (
		<section className={clsx(styles.about)}>
			<Card
				styleType={'horizontal'}
				className={clsx(styles.item)}
				imgSrc={
					'https://images.unsplash.com/photo-1704234257809-9cbc16c6a7c7?q=80&w=1787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
				}
				txt={'Post Title'}
			/>
		</section>
	);
}
