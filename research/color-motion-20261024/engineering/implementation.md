# 컬러·모션 제품 적용과 검증

2026-10-24 · 작성·생성·검증 취합 `/root/engineering_manager/architecture_engineer`

## 적용 결과

[확정 디자인](../design/synthesis.md)을 기존 공통 렌더러에 적용했다. 핵심 선언·이름·수치·범주·선택 막대의 의미색은 선명하게 만들고, eyebrow·구조선·장식 인용부호·단계 번호·수치 단위는 중립으로 구분했다. 사진·영상·editorial artifact의 고유 색과 배치는 유지했다. 팔레트와 모션 시간은 STAGE 사양이며 원본 DevDay의 공식 HEX·측정 타이밍이 아니다.

React·발표 엔진·모션 라이브러리를 추가하지 않았다. [아키텍처 검토](architecture.md)와 [모션 계획](motion-plan.md)에 따라 HTML/CSS/JavaScript·CSS keyframes와 작은 JS 접근성 분기를 사용했다. React의 정적 호스팅 가능성이나 reveal.js의 무빌드 경로를 부정하는 선택이 아니다.

| 연결점 | 실제 변경 |
| --- | --- |
| `styles.css` | Stage·Midnight의 5색, 중립 메타·경계·단위, tone이 지정된 강조 차트 막대, 5종 효과와 관객 원본·발표·비편집·screen·no-preference 조건 |
| `app.js` | 검증된 `data-motion`, 미지정 fade, JS 읽기 이동의 reduce 분기와 실행 중 설정 변경에 따른 즉시 이동 |
| `deck-model.js` | `slide.motion`의 정확한 5종 enum 검증. 잘못된 값은 해당 장의 오류, 원본 입력은 보존 |
| `scripts/markdown-deck.cjs` | 공통 작성 필드에 `motion` 허용. metadata·stage JSON이 같은 입력 계약을 사용 |
| 루트 `content.js` | 6·8·12장 rise, 7·19장 stagger, 9장 chart와 blue. 런타임에 ID·문구 조건은 추가하지 않음 |
| Markdown 원고 | 제품 소개의 선언 rise·결과 stagger·데모 none, 기술 보고의 blue 차트와 chart 모션 |
| 작성 안내 | CONFIG·MARKDOWN·DESIGN·README에 새 옵션·시간·정적 예외·역할색과 단위 중립 원칙 반영 |
| HTML·생성 결과 | 루트 4개 query hash 갱신, 5개 예제의 content/index 10파일 재생성 |

모션은 `none`, `fade`, `rise`, `stagger`, `chart`이며 미지정은 200ms fade다. 제목 진입은 280ms·16px, 보조 지연 60ms다. 항목은 300ms·60ms 간격·최대 지연 240ms, 막대는 440ms·40ms 간격·최대 지연 80ms다. 실제 수치·라벨과 막대의 최종 폭은 변하지 않는다. 효과 대상이 없는 양식은 정적 완성 화면을 유지한다.

## 실무 연결과 인계

`motion_engineer`는 app/CSS를, `architecture_engineer`는 모델·작성 경로·원고·문서·계약 테스트와 최종 생성을 작성했다. 두 실무자는 enum·DOM dataset·상태 조건과 파일 소유권을 직접 합의했다. runtime 담당의 최종 편집 종료와 SHA를 받은 뒤 작성 담당 한 명만 루트 hash 및 예제 생성을 수행했다. 사진·PDF·미리보기·갤러리·총괄 비교 보드·WORK_LOG는 이 팀의 편집 범위에서 제외했다.

중간 검수에서 기존 렌더러 테스트가 window 없는 VM에서 app 앞부분을 추출하는 경로를 확인했다. 새 matchMedia 초기화가 이 경로를 깨뜨리는 실패를 발견해 runtime 담당에게 직접 전달했고, 브라우저 존재 guard로 기존 43개 렌더러 회귀를 보존했다. 테스트를 약화시키거나 기존 테스트를 삭제하지 않았다.

## 자동 검증

- `node --test tests/*.test.cjs`: **168개 통과, 실패·취소·skip 0**. 기존 163개와 새 모션 계약 5개다.
- 새 계약 테스트는 구현 전 5개 중 미지원 기능 관련 4개 실패를 확인한 후 통과했다. 다섯 정상 값과 미지정 값을 19개 양식에서 검증하고 원본 불변을 확인한다. 이는 19개 양식의 전체 브라우저 시각 검수와 다르다.
- 잘못된 이름·대소문자·공백·null·숫자·불리언·객체·배열은 자기 장의 `motion` 오류로 보고되고 입력은 보존된다. 잘못된 원고 빌드는 이전 content/index 두 출력과 작성 원고를 바꾸지 않는다.
- metadata와 stage JSON의 동일한 값·literal notes 보존, 생성 `content.js`의 명시적/미지정 값 보존과 연속 생성의 결정성을 확인했다.
- 다섯 예제 35장 모두 입력 진단 0. 연속 두 번 생성한 10파일의 SHA가 일치했다. 루트 포함 6덱의 runtime/content query **24개가 실제 파일 SHA와 일치**했다.
- CONFIG·MARKDOWN·DESIGN·README의 코드 예시를 제외한 본문 로컬 링크 92개 대상 누락 0, `git diff --check` 통과.

| 최종 공통 파일 | SHA-256 앞 12자리 |
| --- | --- |
| `app.js` | `ec970a351872` |
| `styles.css` | `66752a982bf1` |
| `deck-model.js` | `d62fc5037c36` |
| 루트 `content.js` | `370215d8ac4a` |

## runtime 실무자의 실제 브라우저 검증

다음은 `/root/engineering_manager/motion_engineer`가 TaskSpace 2의 전용 p4에서 직접 확인해 전달한 결과다. 취합 담당의 별도 브라우저 검증으로 표기하지 않는다.

| 상태 | 전달받아 코드와 연결한 결과 |
| --- | --- |
| 제목·항목·차트 | rise 종료 시 opacity 1·transform none. 항목 300ms와 60ms 간격, 막대 440ms와 40ms 간격. 차트 값 32·56·84는 고정이고 파랑 막대 하나 |
| 편집·읽기·전체 보기 | 편집 중 animation 0. 읽기 20장·전체 보기 20복제 모두 animation 0 |
| 인쇄 에뮬레이션 | 20장 표시, animation 0, 숨겨진 내용 0 |
| 실행 중 reduce 변경 | 읽기 이동을 smooth에서 instant로 중단. 이후 Home 이동도 instant, CSS 효과 0 |
| 3테마 | Stage·Midnight orange `rgb(255,122,61)`, Paper `rgb(165,74,39)` |
| 수치와 메타 | 핵심 숫자 `rgb(105,207,130)`, 단위·eyebrow `rgb(164,164,161)` |
| 빠른 장 이동 | Home→End→Home 후 인덱스 0·활성 장 1개·`01 / 20` 일치 |

이 결과는 위 상태의 로컬 구현 검수다. 모든 장의 순차 시각 검수·실제 PDF 파일·물리 기기·프로젝터·보조기기 검증을 뜻하지 않는다. 총괄의 개선 전후·최종 전경 브라우저·PDF/미리보기 검증은 총괄 근거와 구분한다. 이번 팀은 Git commit/push·외부 배포를 수행하지 않았다.

## 매니저 독립 검수

`/root/engineering_manager`는 두 실무자의 편집 종료를 각각 직접 확인하고, 작성 담당이 `implementation.md` 편집을 중단한 뒤 이 파일의 소유권을 인수했다. 제품 코드·모델·작성 문서 diff를 읽어 사양과 대조했으며, 최종 코드에서 전체 자동 테스트를 별도로 실행해 **168/168 통과**와 공백 검사 통과를 확인했다.

브라우저 p5에는 같은 최종 runtime 세 파일과 루트 대표 여섯 장·추가 두 수치 한 장을 `/tmp`의 고유 ID·경로에 복사한 독립 덱을 열었다. 기존 사용자 경로의 localStorage를 바꾸지 않고 `file://` 재생·테마·편집·내보내기를 검증했다. [복사 파일 식별값](evidence/manager-fixture.json)과 [브라우저 결과](evidence/manager-browser.json)를 남겼다.

- Stage·Midnight에서 주황 문장 `rgb(255,122,61)`, 보라 이름 `rgb(160,128,255)`, 비교 막대 하나 `rgb(36,168,255)`를 확인했다. 나머지 두 막대는 중립이며 값 32·56·84는 고정이었다. Paper는 기존 어두운 주황·보라·파랑 대안으로 바뀌었다.
- 세 테마 모두 큰 수치의 의미색과 단위·eyebrow의 중립색을 구분했다. `metric-pair`의 두 단위도 각 테마의 muted 값과 일치했다.
- 실제 내용 편집 후 [다운로드한 content.js](evidence/manager-export.js)를 node:vm으로 읽어 수정 제목과 강조 문자열, 명시적/생략 모션 7개, 차트의 최종 값이 보존됨을 확인했다. 새로고침 후 수정 문구와 `rise`가 복원됐다.
- 390px 읽기 화면의 document scrollWidth는 390px, 일곱 장 모두 표시됐고 animation·투명도 0인 제목/항목은 없었다. 이는 별도 복사본의 제한된 모바일·오프라인 검수다.
- 위 브라우저 검수에 사용한 app·CSS·model 세 파일의 전체 SHA-256이 현재 저장소와 일치함을 별도 비교했다. 기본 fade·선언 rise·범주/단계 stagger·chart가 실제 dataset에 연결됐고 시스템 reduce에서 정적으로 표시됐다.

읽기 smooth가 실행 중 reduce로 바뀌면 목적 장으로 즉시 이동해 진행 중 동작을 끝내도록 구현했다. metric 단위 중립화는 총괄이 최종 확정해 양 실무자에게 직접 전달했다. 디자인·리서치의 원래 관찰을 공식 토큰·원본 모션 수치로 확대하지 않았다. 총괄의 원래 루트 전경 재생·발표자 연결·실제 PDF와 미리보기 산출물 검증은 별도로 진행한다.
