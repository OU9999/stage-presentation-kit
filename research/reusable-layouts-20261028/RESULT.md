# Markdown에서 다시 쓰는 사진·혼합 타일·아이콘월

세로 사진, 사진 스트립, 불균등 모자이크, 혼합 타일과 아이콘월을 간단한 Markdown 작성 경로에 연결했다. 기존 구현이 남아 있다는 확인에서 끝내지 않고, 서로 다른 새 원고 두 개와 자료 수 변경을 실제로 검수했다. [실제 화면 보드](index.html) · [사진 에세이8장](../../presentations/photo-essay/) · [전시 준비9장](../../presentations/community-exhibit/) · [작성 안내](../../MARKDOWN-FIRST.md).

## 작성 방법과 복원한 구성

| 구성 | 원고에서 선택 | 동작과 확인 범위 |
| --- | --- | --- |
| 세로 사진 | `compose: gallery`, `variant: portraits` | 사진2~6개,2:5. 제목 없는6열도 지원 |
| 사진 스트립 | gallery, `variant: strip` | 사진2~6개,4:3. caption은 프레임 밖 |
| 불균등 사진 | mosaic, `variant: staggered` | 사진6개,2+1+1 / 1+1+2. 사진별 focus 유지 |
| 혼합 타일 | `compose: bento` + H2별 자료 | 기본 balanced는1~12자료. 실제5/8/12 검수. 사진·문서·값·인용·목록·글의 표면을 구분 |
| 기존12칸 구성 | bento, `variant: seoul` 또는 `recap` | 기존 고정 구도를 명시 선택. 자료 수가 다르면 원문 문서+경고 |
| 내장 아이콘월 | `compose: icon-wall`, `icons` 배열 + 일반 목록 | 원래 li에 라벨/링크를 한 번 작성. 최대22개, 실제5/12/22 검수 |
| 내 이미지 아이콘월 | icon-wall + 이미지로 시작하는 일반 목록 | icons 배열 없이 같은 li에서 이미지·alt·라벨·링크 수정. 자체SVG3개 실제 검수 |

```md
<!-- stage-slide
compose: bento
-->
## 남겨 둔 기록

**24** 개

가상 작업 계획입니다.

## 함께 읽을 원칙

> 관찰과 짐작을 구분합니다.
```

같은 방식으로 H2 자료를 추가하면 배치가 바뀐다. 선택 `stage-group`에는 대표 자료·의미색·사진 초점·작은 아이콘을 지정할 수 있다. 본문을 JSON/HTML/CSS에 다시 입력하지 않는다. 기본 gallery/mosaic/editorial과 기존 native 구도는 유지했다.

## 팀 회의와 구조

양 매니저가 [입력·DOM·pure planner 계약](design/implementation-contract.md)을 직접 논의한 뒤, 디자인 실무 두 명이 CSS·서로 다른17장 원고·자체SVG를 작성하고 엔지니어링 실무 두 명이 parser/model과 renderer를 나누어 구현했다. 각 담당의 직접 교차검수 뒤 총괄 실제 화면을 디자인 매니저가 별도 재검수했다. [디자인 취합](design/synthesis.md) · [엔지니어링 취합](engineering/synthesis.md) · [독립 디자인 인수](design/final-review.md).

기하는 공통 `planBento`/`planIconWall`/기존 `packMosaic`, 의미본문은 기존 Markdown AST, 표현은 공통 renderer/CSS에 둔다. 원래20개 SVG path는 model의 한 원본을 native와 Markdown이 함께 사용한다. 배치별 content JSON·별도 runtime·새 외부 의존성은 추가하지 않았다. 생성한 runtime 복사본은 builder가 갱신한다.

기존 두 원고16장, legacy 기하 API와 SVG 값, styles.css·visual.css·visual.js, 이전 조사 근거는 보존했다. 새 [사진 원고](../../talks/photo-essay/slides.md)와 [전시 원고](../../talks/community-exhibit/slides.md)는 스톡 사진/가상 계획임을 명시한다. builtin 목록을 옮기면 icons 배열도 함께 옮겨야 하는 작성 부담은 남으며, custom은 같은 li 안에서 함께 옮긴다.

## 검증과 실제 교정

- 최종 자동245검사 통과. 생성48파일은 반복 build 후 바이트가 같았다. 기존 기하33비교·공유SVG20개·runtime21사본·HTML119버전참조가 일치했다. [통합 기록](evidence/integration.json) · [검사 출력](evidence/tests.txt).
- 새17장 실제 화면에서 source 전문 일치, 타일별 글자 넘침·이미지 실패·브라우저 오류0. 별도19입력은 정상16종과 의도적 부적합3종으로 나눴다. 세로2/3/6장 실제 비율0.4, 스트립2/3/6장1.333333을 확인했다. [원고 화면](evidence/stories-browser.json) · [수량 화면](evidence/counts-browser.json).
- Stage/Paper8대표 화면과390px의 새17장 읽기에서 원문·alt·링크·원본이미지 contain 유지, 가로 넘침0,저장 호출0,read#5의 sticky 여백 약92px를 확인했다. [테마·읽기](evidence/themes-read-browser.json).
- 격리한 실제 원고에서 사진2→3·H2자료5→8·아이콘5→12,제목/숫자24→31/라벨/링크/custom이미지를 바꿔 자동 새로고침과 정상 배치를 확인했다. 누락 이미지 경로는 오류를 알리고 마지막 정상본을 유지했으며 복구도 확인했다. [작성 실험](evidence/authoring-browser.json).
- 정량 후검수에서 Stage 노란 내장 아이콘 선/밝은 plate 대비2.7975를 발견해 기존 팔레트 mix70→65%로 교정했다. 최종5색 stroke/plate 최소는Stage3.182647·Paper5.109290이다. custom 고유색·배치·본문은 그대로다. [교정 후 실측](evidence/final-color-browser.json).
- 디자인 매니저가 새17장·수량8장·Paper8장·최종색2장 총35개 PNG를 직접 열어 추가 필수 미감 교정 없음으로 인수했다. 자동 검사 수와 시각 판정을 구분했다.

기존 root20장·이전 Markdown16장·기존 bento/wall2장·native visual8종,총46장을 실제 순회해 경고·이미지 실패·브라우저 오류0을 확인했다. 전체 보기9장/혼합12타일/아이콘월2개,preview링크/id0,발표자 현재/다음과양방향이동,두 새 원고의 상호읽기 링크/#6이동도 통과했다. [회귀·상호작용](evidence/regression-browser.json). 공개 배포에서도77파일200/바이트일치,새12화면·Paper1화면·모바일17장·기존4화면·결과보드가 정상이다. [배포 검수](DEPLOYMENT.md)에 API와 실제 화면 근거를 기록했다.

결과 보드의6개 배치 선택·원고/발표 링크·390px 화면을 확인했다. 별도19입력의 읽기 전문은 모두 원문과 일치하고 의도적 fallback3개가 유지된다. 공개용 수량 예제16장은 경고 없이 따로 열 수 있다. [보드·전체 읽기 검수](evidence/board-read-browser.json) · [로컬 참조 누락0](evidence/links.json) · [생성 재현](evidence/build-reproducibility.json).

## 사용 범위

긴 제목·caption·본문이 모든 배치에 자동으로 맞는다는 보장은 없다. 실제 미리보기에서 장을 나누거나 초점을 선택해야 한다. 모르는 설정/아이콘은 입력 오류이고, 알려진 설정의 수량·원고 형태가 맞지 않으면 원문 전체를 문서로 남기고 줄번호를 경고한다. 순서 목록 아이콘월도 번호를 숨기지 않도록 현재는 원래 ol/start 문서로 보존한다.

읽기는 같은 원고의 전체 내용과 원래 순서를 제공한다. 임의 사진의 얼굴 자동 탐지, 이미지 내부 작은 영문 글자 전체의 관객 독해, 전체 접근성 인증,모든 운영체제 실기를 이번 검수로 주장하지 않는다. 새 두 예제17장 중 compose명시8/기본9장,stage-slide11·stage-group12개이며, 기능 선택 수8회가 전체 작성 비용8회라는 뜻은 아니다.
