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
		//모션트리거 : navbar메뉴를 클릭해서 라우터명이 변경되는 시점에 아래 2개모션 패널이 동시에 실행됨
		// 원래는 path명 변경시 모션을 기다리지 않고 바로 페이지 컴포넌트가 바뀌지만
		//mode='wait'설정시 기존에 실행되고 있는  모션컴포넌트가 있다고 하면 path가 변경되었음에도 불구하고 모션끝날때까지 언마운트 지연
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
				{/* 패널이 안보이가 오른쪽으로 늘어나는 모션 컴포넌트 */}
				<motion.div className='in' initial={{ scaleX: 0 }} animate={{ scaleX: 0 }} exit={{ scaleX: 1 }} transition={{ duration: 0.7 }}></motion.div>
				{/* 패널이 보이다가 오른쪽으로 사라지는 모션 컴포넌트 */}
				<motion.div className='out' initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} exit={{ scaleX: 0 }} transition={{ duration: 0.7 }}></motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
