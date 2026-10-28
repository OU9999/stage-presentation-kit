# 공개 배포 검수 완료

기능 커밋 [`6b176aedd67d2fd8bd50fae2962e79f2573133fe`](https://github.com/OU9999/stage-presentation-kit/commit/6b176aedd67d2fd8bd50fae2962e79f2573133fe)를 origin/main에 push했다. 기존 main/루트 GitHub Pages를 유지했다. [Pages run40634921677](https://github.com/OU9999/stage-presentation-kit/actions/runs/40634921677)은 해당 SHA로 성공했고 Pages API는2026-10-28 04:54:55UTC에 built를 반환했다. [빌드 API](evidence/pages-build.json) · [Action API](evidence/pages-action.json).

[공개 결과 화면](https://ou9999.github.io/stage-presentation-kit/research/reusable-layouts-20261028/) · [사진 에세이](https://ou9999.github.io/stage-presentation-kit/presentations/photo-essay/) · [전시 준비](https://ou9999.github.io/stage-presentation-kit/presentations/community-exhibit/).

## 실제 공개 확인

- 공개77파일 전부HTTP200이며 로컬과SHA256이 일치했다. 생성 발표/읽기·공통runtime·자산·루트·Markdown 원본·작성 안내·결과 보드/이미지·수량 예제를 포함한다. [파일별 원장](evidence/public-http.json).
- 실제 공개 브라우저에서 새6배치와 혼합5/8/12·아이콘5/12/22 총12화면,Paper 혼합타일1화면을 확인했다. 글자 넘침·이미지 실패·실행/Network오류·원치 않는 경고0이다.
- 390px의 두 원고17장 읽기에서 전문이 원고와 일치하고 alt·원본 contain·상호read링크/#6이동을 확인했다. 가로 넘침·저장 호출·실행 오류0,read#5의 sticky 여백도 정상이다.
- 공개 전체 보기9장/혼합12타일/preview링크0,결과 보드6선택·390px가로넘침0·실제7이미지 정상도 확인했다. [공개 브라우저 관찰](evidence/public-browser.json).
- 기존 공개 gallery·C안bento·icon-wall·native visual도4화면 실제 재생해 경고·이미지 실패·실행/Network오류0을 확인했다. [기존 화면 회귀](evidence/public-legacy-browser.json).

공개 브라우저에서 보드의 지연 로딩 이미지를 확인할 때 End키만으로 실제 스크롤을 보장한다는 검수 가정을 교정했다. 실제 페이지를 아래까지 스크롤한 뒤 로드를 확인했으며,HTTP77파일 대조도 정상이다. 이 검수 도구의 대기는 제품 이미지 실패로 분류하지 않는다.

## 전달과 검수 범위

검증 기록 후속 커밋에는 이 문서·WORK_LOG/RESULT·API/HTTP/브라우저 근거와 공개 PNG만 추가한다. 제품 코드·원고·발표 생성물은 공개 검수한 기능 커밋과 바이트가 같다. 최종 후속 커밋도 같은 main에 push하고 Pages의 일치 SHA/built·원격 동기화를 확인한다.

로컬245검사·기존46장 회귀·독립 디자인35PNG와 이번 공개 확인의 범위는 [구현 결과](RESULT.md)에 분리해 기록했다. Node24.22.1과 현재 macOS Chromium에서 수행했으며 모든 운영체제·임의 원고의 자동 fit·접근성 인증을 의미하지 않는다.
