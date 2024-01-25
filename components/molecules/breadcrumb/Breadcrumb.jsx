import clsx from 'clsx';
import styles from './breadcrumb.module.scss';
import Text from '@/components/atoms/text/Text';
import React from 'react';
import { useRouter } from 'next/router';

export default function Breadcrumb({ divider = '/' }) {
	const router = useRouter();
	const pathArr = router.asPath.split('/');
	//path값에서 만약 쿼리스트링값이 있으면 쿼리의 name값만 따로 추출해서 이름 recipeName에 담아줌
	const { name: recipeName } = router.query;

	const customText = (txt, spc) => {
		txt = txt.includes(spc)
			? txt
					.split(spc)
					.map((el) => el.charAt(0).toUpperCase() + el.slice(1))
					.join(' ')
			: txt;
		return txt;
	};
	return (
		<nav className={clsx(styles.breadcrumb)}>
			{pathArr.map((name, idx) => {
				const displayName = customText(name, '-');
				if (idx === pathArr.length - 1) {
					return (
						<Text key={idx} tagName={'strong'} isOn>
							{/* 마지막 path경로일때 recipeName라는 쿼리값이 있으면 해당 값을 breadcrumb에 출력 없으면 그냥 마지막 path경로명 출력 */}
							{recipeName ? recipeName : displayName}
						</Text>
					);
				} else {
					return (
						<React.Fragment key={idx}>
							<Text tagName={'em'} url={'/' + name}>
								{name === '' ? 'Home' : displayName}
							</Text>
							<span> {divider} </span>
						</React.Fragment>
					);
				}
			})}
		</nav>
	);
}
