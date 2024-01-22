import clsx from 'clsx';
import styles from './pic.module.scss';
import Image from 'next/image';

export default function Pic({ imgSrc }) {
	return (
		<div className={clsx(styles.pic)}>
			<Image src={imgSrc} alt={imgSrc} priority width={100} height={100} />
		</div>
	);
}
