import clsx from 'clsx';
import styles from './text.module.scss';
import React from 'react';
import Link from 'next/link';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum',
});
const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '600'],
	preload: true,
	variable: '--font-orbitron',
});

export default function Text({ children, url, tagName = 'p', styleType, className, isOn = false, onClick }) {
	return React.createElement(
		tagName,
		{
			onClick: onClick,
			className: clsx(styles.text, nanum.variable, orbitron.variable, styles[styleType], className, isOn && styles.on),
		},
		url ? React.createElement(Link, { href: url }, children) : children
	);
}
