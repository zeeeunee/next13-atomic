import clsx from 'clsx';
import styles from './pic.module.scss';
import Image from 'next/image';

export default function Pic({ imgSrc }) {
	return (
		<div className={clsx(styles.pic)}>
			<Image src={imgSrc} alt={imgSrc} priority fill sizes='(max-width:768px)100vw,(max-width:1200px)50vw,33vw' />
		</div>
	);
}
