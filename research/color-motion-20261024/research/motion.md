# 발표 모션 조사와 적용안

작성: 2026-10-24 · 담당: `/root/research_manager/motion_researcher`

## 판단

현재 발표 양식에는 **짧은 전환과 선택형 콘텐츠 모션**이면 충분하다. CSS keyframes로 먼저 구현하고, 실행 중 취소·설정 변경 제어가 필요할 때만 Web Animations API를 보조로 사용한다. 이번 목적만으로 React나 애니메이션 라이브러리를 추가해야 한다는 근거는 없다. 프레임워크 선택의 최종 판단은 개발 팀이 현행 작성·내보내기 계약까지 확인해 내린다.

DevDay 원본의 animation duration·easing·내용 등장 순서는 이번 실무에서 측정하지 않았다. 아래 수치는 **STAGE에 제안하는 독자 사양**이며 DevDay 또는 Apple의 지정값이 아니다.

## 이번에 확인한 근거

| 근거 | 확인 내용 | 프로젝트에 적용할 판단 |
| --- | --- | --- |
| [W3C C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) | OS/사용자 환경의 reduced-motion 설정을 CSS에서 반영하는 기법. 정적 스타일을 먼저 정의하고 `no-preference`에서 움직임을 켜는 방법도 설명한다. | 모션이 없어도 최종 콘텐츠가 온전히 보이는 구조로 만든다. |
| [W3C SC 2.3.3 설명](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions) | 사용자 상호작용에서 발생하는 비필수 움직임을 끌 수 있도록 하는 AAA 기준과 의도. | 발표 넘기기를 막거나 모든 장에 큰 이동을 넣지 않는다. 이 조사만으로 WCAG 전체 준수를 선언하지 않는다. |
| [MDN Element.animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) | DOM 요소에 keyframes와 timing을 적용하고 `Animation` 객체를 반환한다. | DOM 렌더러에 직접 붙일 수 있어 React가 모션의 전제조건은 아니다. |
| [MDN Animation.cancel](https://developer.mozilla.org/en-US/docs/Web/API/Animation/cancel) | 효과와 재생을 취소한다. 대기 중인 `finished` promise는 `AbortError`로 거절될 수 있다. | WAAPI를 쓰면 빠른 장 이동과 모드 전환에서 취소하며 promise 거절도 처리한다. |
| [MDN CSS 성능](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS) | 치수·배치 속성 애니메이션은 레이아웃/그리기 비용을 유발할 수 있다. `transform`·`opacity`를 우선 검토하며 `will-change`는 성능 문제가 확인된 경우에 제한한다. | 막대 `width`를 매 프레임 바꾸지 않고 최종 폭을 정한 뒤 `scaleX`로 나타낸다. |
| [MDN matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) | JS에서 미디어 쿼리 현재값·변경을 확인할 수 있다. `smooth`는 명시적 애니메이션 스크롤이다. | CSS 모션 차단 외에 JS의 읽기 모드 스크롤도 reduced-motion에 맞춰 분기한다. |

Apple의 [Motion HIG](https://developer.apple.com/design/human-interface-guidelines/motion)는 공식 검색 결과에서 목적 있는 짧은 모션·선택권·중단 가능 원칙을 확인했다. 직접 HTML 열기는 JavaScript 안내만 반환하고 Markdown 링크 호출은 실패해, 이 문서의 구현 근거는 위의 직접 열린 W3C·MDN 본문을 중심으로 삼았다. Apple의 이름을 원본 검증이나 실제 출신 경력으로 대신하지 않는다.

## 현재 코드에서 확인한 것

- `styles.css:214`의 `.slide.is-active`는 모든 장에 240ms `opacity .2 → 1` 전환을 적용한다. 장의 의미·콘텐츠 종류에 따른 선택지는 없다.
- 읽기 모드의 슬라이드, 전체 보기의 복제본, 인쇄의 슬라이드는 별도로 animation을 끈다. `prefers-reduced-motion: reduce` 규칙은 CSS animation·transition·scroll-behavior를 끈다.
- `app.js`의 `updateActive()`는 현재 장을 활성화하며, 읽기 모드 이동에서 `scrollIntoView({behavior: "smooth"})`를 직접 호출한다. CSS 규칙만으로 이 명시적 JS 옵션까지 차단됐다고 판단할 수 없으므로 수정·검증 대상이다.
- `renderPresenter()`는 복제한 현재/다음 장에 `.is-active`를 준다. 현재 전환을 그대로 확대하면 발표자 미리보기도 움직일 수 있으므로 관객 화면과 분리해야 한다.
- 차트는 최종 수치를 텍스트로 만들고 장식 막대에 `aria-hidden="true"`를 지정한다. 이 구조를 유지하면 움직임이 수치 전달의 유일한 통로가 되지 않는다.

## 추천하는 모션 다섯 종류

| 선택값 제안 | 목적·적용 후보 | STAGE 제안 수치 | 적용 원칙 |
| --- | --- | --- | --- |
| `none` | 밀도 높은 자료, 시연, 사용자가 움직임을 원하지 않는 발표 | 즉시 표시 | 모션 없이도 완성 화면. |
| `fade` | 기본 장 이동 | 180–240ms, opacity만 | 발표 속도를 낮추지 않으며 대형 화면의 전체 이동을 피한다. |
| `rise` | 표지·선언·발표자 소개 | 제목 280ms, 12–18px 상승. 설명은 60ms 뒤 280ms | 제목과 설명 두 묶음만. 전체 화면·글자 단위로 흔들지 않는다. |
| `stagger` | 세 단계, 범주·결과 비교 | 항목 280–320ms, 간격 50–60ms, 총 600ms 이내 | 최대 4–5개 의미 묶음. 큰 사진 콜라주 전부를 분해하지 않는다. |
| `chart` | 막대 비교의 시각적 진입 | 420–480ms, `scaleX(0) → 1`, origin left, 행 간격 최대 40ms | 라벨·실제 수치는 처음부터 최종값. count-up과 선행 수치 왜곡 금지. |

easing 후보는 `cubic-bezier(.22, 1, .36, 1)` 또는 단순 `ease-out`이다. 정확한 지속 시간·이동량은 디자인 팀의 실제 화면 검토와 개발 팀 제약에 맞춰 확정한다. 회전·탄성·parallax·타자 효과·무한 pulse는 이번 적용 후보에서 제외한다. 이는 사용자에게 불필요한 추가 조작을 요구하지 않고 발표 내용을 명확하게 보이게 하기 위한 판단이다.

단계별 **수동 공개**는 발표자가 이야기를 조절하는 장점이 있지만 새 진행 상태·키보드·발표자 동기화·인쇄 계약이 필요하다. 첫 개선에서는 한 번의 장 진입으로 짧게 완결되는 순차 등장으로 제공하고, 수동 공개는 후속 요구가 있을 때 별도 기능으로 다루는 편을 권한다.

## 데이터·구현 계약 제안

가장 작은 확장은 `slide.motion` 선택 문자열이다. 기존 입력의 동작을 유지하며, 미지정은 기존과 같은 짧은 `fade`로 정한다. 개발 팀은 deck 기본값이 실제 작성 편의에 필요한지 판단한다. params·Markdown→생성 결과·브라우저 export에서 새 필드를 보존하고, 잘못된 값은 기존 입력 진단 방식으로 알린다. 임의 CSS/선택자/JavaScript를 콘텐츠에서 받지 않는다.

기본 CSS는 최종 상태(`opacity:1`, 변형 없음)를 표현한다. 실제 관객의 발표 모드·활성 장·편집 종료·`prefers-reduced-motion:no-preference` 조건에서만 일회성 애니메이션을 덧붙인다. 콘텐츠가 등장 전 CSS 때문에 영구적으로 숨겨지는 구조를 피한다. 코드가 느리거나 API가 없으면 정적 최종 상태를 유지한다.

WAAPI를 사용하면 기능 검사(`typeof element.animate === "function"`), 이전 장 animation 취소, 모드/테마 변경 및 `beforeprint`의 정리, OS 설정 변경 시 즉시 취소를 포함한다. opacity 0 또는 transform이 inline style로 남아 인쇄·내보내기에 묻어나지 않게 한다. CSS를 쓰면 모션 규칙의 조건과 우선순위를 한곳에서 관리해 같은 예외를 보장한다.

## 상태별 수용 기준

| 상태 | 수용 기준 |
| --- | --- |
| 관객 발표 모드 | 현재 장에서만 1회 재생. 다음/이전 장 이동·Home/End·전체 보기 선택은 모션 종료를 기다리지 않는다. |
| 빠른 연속 이동 | 나간 장의 효과가 화면·입력 상태에 남지 않는다. 최종 인덱스와 발표자 창이 일치한다. |
| reduced-motion | 진입 모션·순차 등장·차트 reveal·JS smooth scroll을 모두 끄고 모든 최종 콘텐츠를 즉시 표시한다. 실행 중 설정 변경도 확인한다. |
| 읽기 모드·모바일 | 전 장을 문서 순서대로 정적으로 표시. 숨은 항목·가로 넘침·지연된 접근성 텍스트 없음. |
| 인쇄·PDF | 모든 장과 모든 항목의 최종 상태. 프레임 중간에 인쇄해도 빈 텍스트나 폭 0 막대가 없어야 한다. |
| 전체 보기·발표자 | 정적 현재/다음 장. 모션 복제가 반복되지 않으며 표시 내용·색상은 관객 화면과 일치한다. |
| 내용 편집 | 효과가 즉시 멈추고 문장 선택·caret·입력·저장을 방해하지 않는다. |
| 오프라인 | 외부 CDN·폰트·런타임 요청 없이 `file://`에서도 같은 최종 화면. |

## 검증 상태와 한계

이 문서는 공식 원문 열기와 현재 코드 정독으로 작성했다. 모션 시제품·실제 브라우저 타이밍·성능 프로파일·보조기기 검증은 아직 하지 않았다. 디자인·개발 팀이 최종 구현 후 위 상태를 실제로 확인해야 한다. DevDay 원본 영상의 카메라 컷을 슬라이드 효과로 해석하지 않는다.
