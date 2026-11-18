# 나의 발표 모음

`talks/<발표이름>/slides.md`와 같은 폴더의 `assets/`를 수정합니다.
`ou.config.json`에서 모음 제목·테마·원고/출력 폴더를 설정합니다.
기본 테마는 검정 바탕·큰 글자·넓은 여백의 Stage입니다.

```sh
npm install
npm run dev
npm run new:talk -- team-review --title "팀 회고"
npm run build
npm run verify
```

미리보기 주소는 `http://127.0.0.1:4320`입니다. 생성한 `presentations/` 폴더 전체를 공유하거나 정적 호스팅에 올립니다. 생성 파일은 직접 수정하지 않습니다.

이 프로젝트는 공통 엔진을 `devDependencies.ou-presentation`으로 참조합니다.
기본값은 생성에 사용한 로컬 엔진의 상대 경로입니다. 해당 엔진 위치를 유지하고 설치하세요.
다른 기기로 옮길 때는 엔진 저장소에서 `npm pack`으로 만든 `.tgz`를 프로젝트에 함께 넣고,
의존성을 `file:./ou-presentation-1.0.0.tgz`로 바꾼 뒤 `npm install`을 실행합니다.
원고를 쓰기 전에 설치한 엔진의 [역할에서 시안으로 연결하기](node_modules/ou-presentation/DESIGN.md#역할에서-시안으로-연결하기)에서 주역·읽을 구절/관계·보존 자료·검토자를 정하세요.
[작은 재사용 레시피](node_modules/ou-presentation/MARKDOWN-FIRST.md#역할을-유지하는-작은-레시피)는 두 판단과 한 실행을 H2/H3로 묶는 예, 공통 안내의 위치, SVG 내부 배치와 본문의 경계를 설명합니다.
모두 설치 패키지에 포함된 문서이므로 별도 사진·연구 자산 없이 시작할 수 있습니다.
수정 후에는 실제 발표 크기에서 현재안과 비교하고 [검수 안내](node_modules/ou-presentation/DESIGN-REVIEW.md#작성과-확인)에 따라 기술 결과와 시각 판정을 구별합니다.
