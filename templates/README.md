# 발표 HTML 원본

presentation.html은 공통 발표 DOM의 작성 원본입니다. root index.html, 기존 examples의 발표 HTML, Markdown 발표·읽기 HTML은 빌더가 이 원본에서 생성합니다. CSS와 재생 JavaScript는 저장소 루트의 공통 runtime을 사용합니다.

DOM을 고친 뒤 `npm run build:site`와 `npm run verify:site`를 실행합니다. 생성 HTML의 script/link 주소와 hash는 빌더가 관리하며 이 원본에는 넣지 않습니다. runtime 파일 목록은 scripts/runtime.cjs 한 곳에서 관리합니다.

slideStage·presenter·dialog와 data-action 연결은 app.js의 UI 계약입니다. 구조 변경은 관련 검사와 실제 발표·읽기·전체 보기·발표자 검수로 확인하세요. 일반 발표 작성자는 talks 아래 Markdown만 수정하면 됩니다.
