# 모션 기술 검토와 구현 계약

2026-10-24 · `/root/engineering_manager/motion_engineer`

## 권고

이번 다섯 선택지는 **CSS keyframes와 작은 JS 조건 분기**로 구현한다. native Web Animations API(WAAPI)는 충분한 대안이지만 현재 요구에는 별도 실행·취소 목록을 둘 필요가 없다. GSAP·Motion의 복잡한 타임라인 기능은 필요해질 때 도입한다. 모션 때문에 React로 전환할 필요도 없다.

이 문서는 실제 코드·공식 문서를 검토한 구현 계획이다. 이번 단계에서는 제품 코드나 성능 측정을 수행하지 않았다. [리서치 제안](../research/motion.md)의 지속 시간·easing은 DevDay 원본 측정값이 아니라 STAGE의 사양 후보다.

## 기술 비교

| 기술 | 가능한 작업 | 이번 판단 |
| --- | --- | --- |
| CSS keyframes | opacity·transform 진입, 지연 순차 등장, 막대 scaleX. 미디어 쿼리 변경과 스타일 조건 해제 시 정적 상태 복귀 | 채택. 현재 `.is-active`·모드 속성을 그대로 사용한다. |
| native WAAPI | DOM에 keyframes 적용, 반환한 Animation으로 pause·seek·cancel | 대안. 수동 타임라인·탐색·일시정지가 실제 요구가 되면 검토한다. |
| GSAP | 타임라인·고급 제어, `matchMedia()` 조건별 생성 효과를 일괄 revert | 현 요구에는 보류. 로컬 번들·업데이트·효과 정리 책임을 추가할 이득이 작다. |
| Motion JavaScript | React 없이 DOM/SVG 애니메이션, mini/hybrid 선택과 sequence | 현 요구에는 보류. React 전용이라는 가정은 틀리지만 기본 CSS 효과를 대체할 이유는 부족하다. |

GSAP·Motion이 CDN이나 React를 반드시 요구한다는 뜻은 아니다. 로컬 파일로 포함하는 것도 가능하다. 현재 목표가 무빌드·오프라인 재사용이고 효과 범위가 작으므로 의존성을 늘리지 않는 선택이다.

## 현행 코드의 연결점

- `app.js`의 `renderSlide()`는 article에 `data-layout`, `data-theme`, `data-tone`을 만든다. 새 `data-motion`을 같은 경로에 둔다.
- `updateActive()`는 원본 `#slideStage`의 직계 자식에만 `.is-active`를 토글한다. 장이 바뀔 때 CSS가 진입 효과를 다시 적용할 수 있다. 같은 장에서 단순 상태 갱신할 때는 불필요하게 클래스를 제거·재부착하지 않는다.
- `renderPresenter()`는 별도 현재·다음 복제본에 `.is-active`를 준다. `.slide.is-active` 같은 전역 selector를 남겨 두면 프리뷰까지 움직인다. 기존 240ms 전역 규칙을 새 한정 규칙으로 대체한다.
- `updateActive()`의 읽기 모드 `scrollIntoView({behavior:"smooth"})`는 CSS 차단과 별개다. JS에서도 시스템 설정을 확인해야 한다.
- `scripts/markdown-deck.cjs`의 `COMMON` 허용 필드 목록과 `deck-model.js`의 enum 검증을 함께 확장해야 Markdown과 JSON 작성 흐름이 일치한다.
- 기존 export는 rawDeck를 직렬화한다. 새 필드가 유지되도록 모델이 입력을 삭제·변형하지 않는지 검증한다. 미디어 경로 변환 대상으로 취급하지 않는다.

## 데이터 계약

```js
{ layout: "statement", title: "중요한 한 문장", motion: "rise" }
```

- `slide.motion`: `none | fade | rise | stagger | chart`. 미지정은 `fade`, 잘못된 값은 기존 작성자 진단 방식으로 알린다.
- 자유 selector·duration·임의 CSS/JavaScript를 콘텐츠에서 받지 않는다. 별도의 deck 기본값은 이번에 추가하지 않는다.
- 기존 slide·19개 layout과 기존 params 입력은 그대로 유효하다. `stagger`/`chart`를 맞지 않는 layout에서 골라도 콘텐츠가 사라지지 않아야 한다. 적용 대상이 없으면 정적 또는 기본 fade로 처리하고 문서에서 설명한다.
- 기본 스타일은 최종 opacity·transform·막대 폭을 표현한다. 동작 중에만 CSS 효과가 덧씌워지고, 종료·취소 뒤 원래 완성 화면으로 돌아온다. 데이터나 inline style에 숨김 상태를 기록하지 않는다.

## 실행 범위와 효과

권장 범위는 `@media screen and (prefers-reduced-motion: no-preference)` 안의 `body[data-mode="present"][data-presenter="false"][data-editing="false"] #slideStage > .slide.is-active`다. 전체 보기·발표자 복제본은 이 selector에 포함되지 않는다. 인쇄는 `screen`에서 제외한다. CSS를 기반으로 OS 설정 변경 시에도 조건이 즉시 해제된다.

| 값 | 대상 | 구현 제안 |
| --- | --- | --- |
| `none` | 전체 장 | 효과 없음. |
| `fade` | 원본 active article | 200ms opacity. 기존 기본 전환의 목적을 유지한다. |
| `rise` | 제목과 필요한 보조 문구 | 제목 280ms·16px 이하. 보조는 60ms 뒤 280ms. 전체 화면을 이동하지 않는다. |
| `stagger` | `.step`, `.category-item`, `.result-item` 같은 의미 묶음 | 300ms·간격 50–60ms. 지연을 제한해 총 600ms 이하. 사진·콜라주 전체를 조각내지 않는다. |
| `chart` | `.chart-bar`만 | 최종 width를 먼저 유지하고 `transform-origin:left; scaleX(0→1)`, 약 440ms·행별 짧은 지연. 수치·라벨은 처음부터 최종값. |

최종 수치는 디자인 팀이 화면을 보고 확정한다. `animation-fill-mode:backwards`는 지연 중 시작 프레임을 적용하고 종료 뒤 기본 완성 상태로 돌아가는 데 사용할 수 있다. `both`를 쓰더라도 print·edit·reduce 등에서 효과가 완전히 제거되는지 확인해야 한다. wrapper에 걸린 무대 scale/translate를 애니메이션으로 덮어쓰지 않는다.

## 상태 경계

| 상태 | 구현·검증 기준 |
| --- | --- |
| 빠른 다음/이전·Home/End | 입력을 기다리게 하지 않고 최종 장 인덱스가 일치. 나간 장 효과가 남지 않음. |
| 읽기·모바일 읽기 | 모든 장과 항목이 정적 최종 상태. JS 읽기 이동은 reduce일 때 `instant` 또는 `auto`+CSS auto. 설정값은 호출 시 다시 확인. |
| OS reduce 전환 | CSS keyframes 즉시 사라짐. 앞으로 호출하는 JS 스크롤도 즉시 이동. 이미 시작한 smooth scroll을 계속하지 않도록 전환 시 중단 여부를 브라우저에서 확인. |
| 편집 | active effect 제거, caret·선택·입력 방해 없음. 종료할 때 재생 여부는 최종 사양으로 정하되 입력 내용이 숨지 않음. |
| 전체 보기·발표자 | 현재/다음·썸네일은 모두 정적. 관객 장 번호와 동기화 유지. |
| print/PDF | 효과 실행 중 인쇄해도 전 장 최종 텍스트·최종 막대가 보임. slide root뿐 아니라 자식 효과도 제거. |
| 모션 API/CSS 미지원 | 기본 완성 화면을 즉시 표시. 외부 런타임 요청 없음. |

WAAPI를 택하는 경우에는 장 이동·모드/테마 변경·편집·`beforeprint`·reduce 변경에서 생성한 Animation들을 cancel해야 한다. 취소된 `finished` promise의 AbortError도 처리해야 한다. 현재 CSS 선택은 이 별도 수명주기 코드를 줄이는 목적이다.

## 검증 책임

모델·Markdown의 정상/오류 enum·원본 불변·내보내기 보존은 자동 회귀에 포함한다. 시각·모션은 실제 관객 화면에서 rise/stagger/chart를 확인하고, 효과 중 print·edit·reduce로 전환해 정적 결과를 대조한다. 타이밍 문자열만 검사하는 테스트로 실제 모션 검증을 대체하지 않는다. `prefers-reduced-motion`을 바꾼 후 CSS와 JS 경로를 각각 확인한다.

## 이번에 새로 확인한 공식 자료

2026-10-24 ego-browser TaskSpace 2의 전용 p4에서 아래 본문을 열었다. 페이지는 총괄이 종료한다.

- [MDN Element.animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate): keyframes와 timing으로 Animation 객체를 생성하는 native 경로.
- [MDN Animation.cancel](https://developer.mozilla.org/en-US/docs/Web/API/Animation/cancel): 효과 제거와 `finished` promise 취소 동작.
- [MDN animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-fill-mode): 지연 전후 스타일 적용 범위.
- [MDN MediaQueryList change](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/change_event): 시스템 쿼리 변경 감지.
- [MDN scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView): smooth·instant·auto의 의미.
- [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/): 조건별 효과 생성과 일괄 revert.
- [Motion animate](https://motion.dev/docs/animate): JavaScript DOM/SVG 효과와 mini/hybrid·sequence 기능.

라이브러리별 실제 번들 크기·성능 우열을 측정한 결과는 아니다. 이번 결론은 요구와 현행 구조를 비교한 엔지니어링 판단이다.
