import React from 'react';
import clsx from 'clsx';
import styles from './list.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function List({ tagName = 'ul', data, divider = ':', className, url, currentPath }) {
	//List컴포넌트가 출력되고 있는 마지막 라우터명 추출
	const router = useRouter();

	return React.createElement(
		tagName,
		{ className: clsx(styles.list, className) },
		data.map((el, idx) => {
			const child = tagName === 'ol' ? `${idx + 1} ${divider} ${el}` : el;
			return React.createElement(
				'li',
				{
					key: idx,
					//해당 li의 url이름과 현재 라우터명이 동일하면 해당 li활성화
					className: clsx(router.pathname === url[idx] && styles.on),
				},
				// url값이 전달되는것뿐만 아닌 현재활성화 라우터이름과 url값이 달라야지만 링크 설정
				//현재 페이지 메뉴는 굳이 클릭할 필요가 없기 때문에 불필요한 prefetching을 방지하기 위함
				url && currentPath !== url[idx].split('/')[1] ? React.createElement(Link, { href: url[idx] }, child) : child
			);
		})
	);
}
