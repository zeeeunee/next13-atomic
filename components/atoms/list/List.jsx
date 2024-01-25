import React from 'react';
import clsx from 'clsx';
import styles from './list.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function List({ tagName = 'ul', data, divider = ':', className, url, currentPath }) {
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
					className: url && clsx(router.pathname === url[idx] && styles.on)
				},
				url && currentPath !== url[idx].split('/')[1] ? React.createElement(Link, { href: url[idx] }, child) : child
			);
		})
	);
}
