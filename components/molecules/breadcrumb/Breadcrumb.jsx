import clsx from 'clsx';
import styles from './breadcrumb.module.scss';
import Text from '@/components/atoms/text/Text';
import React from 'react';
import { useRouter } from 'next/router';

export default function Breadcrumb() {
	const pathArr = useRouter().asPath.split('/');
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
				name = customText(name, '-');
				if (idx === pathArr.length - 1) {
					return (
						<Text key={idx} tagName={'strong'} isOn>
							{name}
						</Text>
					);
				} else {
					return (
						<React.Fragment key={idx}>
							<Text tagName={'em'} url={'/' + name}>
								{name === '' ? 'Home' : name}
							</Text>
							<span> / </span>
						</React.Fragment>
					);
				}
			})}
		</nav>
	);
}
