import clsx from 'clsx';
import styles from './list.module.scss';
import React from 'react';
import Link from 'next/link';

export default function List({ tagName = 'ul', data, divider = ':', isOn, className, url }) {
	return React.createElement(
		tagName,
		{ className: clsx(styles.list, className) },
		data.map((el, idx) => {
			const child = tagName === 'ol' ? `${idx + 1} ${divider} ${el}` : el;
			return React.createElement(
				'li',
				{ key: idx, className: clsx(isOn && styles.on) },
				url ? React.createElement(Link, { href: url[idx] }, child) : child
			);
		})
	);
}
