import styles from './layout.module.scss';
import Header from '@/components/organisms/header/Header';
import Breadcrumb from '@/components/molecules/breadcrumb/Breadcrumb';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

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

export default function Layout({ children }) {
	const router = useRouter();
	return (
		//기존 컴포넌트에서 실행되고 있는 모션 컴포넌트가 있으면 해당 모션이 끝날때까지 unmount를 지연해서 사라지는 모션시간 확보
		<AnimatePresence mode='wait'>
			{/* 라우터 변경을 감지하는 모션 컴포넌트 */}
			<motion.div key={router.pathname}>
				<div className={clsx(styles.layout, nanum.variable, orbitron.variable)}>
					<Header />
					<div className={clsx(styles.content)}>
						{router.asPath !== '/' && <Breadcrumb />}
						{children}
					</div>
				</div>
				{/* 라우터 변경시마다 모션이 일어날 박스요소 */}
				<motion.div className='in' initial={{ scaleX: 0 }} animate={{ scaleX: 0 }} exit={{ scaleX: 1 }} transition={{ duration: 0.7 }}></motion.div>
				<motion.div className='out' initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} exit={{ scaleX: 0 }} transition={{ duration: 0.7 }}></motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
