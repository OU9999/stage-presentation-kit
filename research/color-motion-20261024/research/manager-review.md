# 리서치 매니저 검수

2026-10-24 · 실제 담당 `/root/research_manager`

매니저는 제품을 수정하지 않고 조사 근거와 적용 권고의 경계를 확인했다. 팀 운영의 현재 상태·담당자·결정 기록은 루트 `WORK_LOG.md`가 담당한다.

## 독립 대조

- 현재 구현은 `styles.css`의 orange `#f2925e`, purple `#b59af5`, blue `#73b9eb`, green `#82cc99`, yellow `#e9cd72`다. 총괄의 [기준 기록](../baseline.md)과 6·7·15장 캡처를 매니저가 직접 열었다.
- 색 연구자가 이번에 얻은 [범주](evidence/color/keynote-23m00.png), [보라 이름](evidence/color/keynote-24m30.png), [주황 문장](evidence/color/codex-20m00.png)을 직접 열고 위 기준과 대조했다. 이 관찰은 색의 역할과 화면상 강도의 차이를 뒷받침하며 공식 HEX를 정하지 않는다.
- [키노트 receipt](evidence/color/keynote-receipts.json)와 [Codex receipt](evidence/color/codex-receipt.json)의 실제 재생 위치·제목·OpenAI 채널 식별자를 읽었다. 정지 프레임 관찰이며 전체 영상·연속 전환 검증으로 해석하지 않는다.
- 공식 [2026 세션 허브](https://openai.com/devday/2026/)에서 Opening Keynote와 Codex Has Left The Laptop 세션이 존재함을 별도로 확인했다. 행사 웹사이트의 UI 색은 발표 슬라이드 토큰의 근거로 사용하지 않았다.
- 현재 `.slide[data-tone]`는 `--slide-accent`를 바꾼다. 같은 토큰을 eyebrow·장식선·비교 경계·인용부호·수치가 사용한다. 핵심 주장이나 수치의 색이 주변 메타 요소까지 함께 퍼질 수 있는 구조다. 원본 색상 차이의 원인을 이 구조 하나로 확정하지 않는다.
- 현재 슬라이드 진입은 240ms opacity 효과다. CSS reduced-motion 규칙은 있지만 읽기 모드의 `scrollIntoView({behavior: "smooth"})`는 JS 경로다. [MDN scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)에서 `smooth`가 명시적인 부드러운 스크롤이고 `auto`는 CSS 계산값을 사용함을 확인했다. [MDN reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)도 별도로 확인했다.

## 후속 팀에 넘기는 적용 기준

1. 원본의 채도 차이를 보정하는 구현용 팔레트를 제안하되 공식 원색 복제로 소개하지 않는다. 핵심 문장·범주에는 선명한 색을 쓰고 사진·작업물 표면과 보조 메타는 각 역할을 유지한다.
2. 한 장의 강조색 선택이 모든 경계·페이지 정보·장식으로 확산되지 않도록 의미 강조와 구조 토큰을 분리한다. 발표자 이름·핵심 한 줄·도표의 비교 대상처럼 명확한 초점을 유지한다.
3. 짧은 전환, 내용 순차 등장, 도표 reveal을 절제된 재사용 옵션으로 제공할 수 있다. 이 제안의 시간·easing은 제품용 사양이며 DevDay 원본의 측정값이 아니다.
4. 모션은 읽기·인쇄·전체 보기·발표자 미리보기·편집 중에는 내용이 즉시 완전하게 보이도록 한다. 시스템 reduced-motion은 JS 스크롤 경로에도 반영하고, 빠른 이전/다음과 모션 중 모드 전환 뒤 콘텐츠가 사라지지 않는지 검증한다.

## 산출물 검사

- [컬러 조사](color.md), [모션 조사](motion.md), [통합안](synthesis.md)을 읽고 원본 관찰·독자 제안·미검증 범위가 구분되는지 확인했다.
- Stage 제안 5색과 Paper 기존 5색의 sRGB 대비 총 10값을 별도 Python 식으로 재계산했고 문서 반올림 값과 모두 일치했다. 이는 단색 배경의 계산 대비이며 물리 환경의 가독성 검증이 아니다.
- 새 JSON 근거가 모두 파싱되는지와 리서치 Markdown의 로컬 링크 대상 존재를 확인했다. 제품 변경은 없어 제품 테스트를 반복하지 않았다.

## 검수 한계

매니저는 원본 전체의 컬러 빈도·공식 디자인 토큰·제작 도구·애니메이션 수치를 확인하지 않았다. 실제 발표 거리·프로젝터 색 재현·모든 브라우저에서의 가독성도 이 리서치 단계의 검증 범위가 아니다.
