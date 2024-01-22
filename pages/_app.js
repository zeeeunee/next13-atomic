export default function App({ Component, pageProps }) {
	return (
		<div>
			<Component {...pageProps} />
		</div>
	);
}
/*
	Next13에서는 page폴더안쪽에 jsx를 넣으면 해당 파일명으로 자동 라우터설정됨 (page router)
	_document.js (Head영역 설정)
	_app.js (index.js를 가져와서 document를 적용해서 루트 컴포넌트를 작동시키는 시동파일)
	index.js (초기 메인페이지 컴포넌트)
*/
