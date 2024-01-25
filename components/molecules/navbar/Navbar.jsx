import clsx from 'clsx';
import styles from './navbar.module.scss';
import List from '@/components/atoms/list/List';
import { useRouter } from 'next/router';

export default function Navbar({ data }) {
	const currentPath = useRouter().asPath.split('/')[1];
	const urls = data.map(el => '/' + el.toLowerCase().split(' ').join('-'));

	return <List data={data} url={urls} className={clsx(styles.navbar)} currentPath={currentPath} />;
}
