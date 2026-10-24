# STAGE 모션 최종 사양

2026-10-24 · Apple의 상호작용·모션 원칙을 참고하는 디자인 역할 `/root/design_manager/motion_designer`. 실제 회사 경력을 주장하지 않는다.

**내용은 처음부터 완성되어 있고, 관객이 보는 발표 화면에서만 짧은 움직임을 더한다.** 아래 시간·거리·easing은 STAGE의 독자 사양이다. DevDay 원본의 전환을 측정하거나 Apple의 지정 수치를 복제한 결과가 아니다. [리서치](../research/motion.md)와 [기술 계약](../engineering/motion-plan.md)을 입력으로 확정했다.

## 다섯 선택지

| `slide.motion` | 대상과 목적 | 최종 시간·거리 | 마지막 완료 |
| --- | --- | --- | --- |
| `none` | 자료·데모·정적 표시 | 움직임 없음 | 즉시 |
| `fade` 또는 미지정 | 기본 장 진입 | opacity 0.2→1, 200ms, ease-out | 200ms |
| `rise` | 제목, 이어지는 짧은 보조 문구 | 제목 opacity 0→1·Y 16→0px, 280ms. 보조는 같은 길이·60ms 지연 | 340ms |
| `stagger` | 범주·결과·단계의 의미 묶음 | 항목 opacity 0→1·Y 12→0px, 300ms. 항목 간 60ms, 지연은 240ms에서 제한 | 최대 540ms |
| `chart` | 최종값이 정해진 장식 막대 | scaleX 0→1, 440ms, 왼쪽 원점. 행 간 40ms, 지연은 80ms에서 제한 | 최대 520ms |

`rise`, `stagger`, `chart`의 easing은 `cubic-bezier(.22, 1, .36, 1)`이다. `animation-fill-mode: backwards`로 지연 중 시작 프레임만 적용하고 종료 뒤 정적 기본 상태로 돌아온다. 색·글꼴 크기·실제 수치·막대의 최종 폭은 움직임에 따라 변경하지 않는다. 무대 wrapper의 scale·translate를 덮어쓰지 않는다.

`rise`는 제목과 보조 두 묶음만 움직인다. eyebrow·페이지·출처·큰 사진을 함께 이동시키지 않는다. `stagger`의 최소 지원 layout은 `steps`, `categories`, `results`다. 5개를 넘는 항목이 유효한 양식이라면 지연을 240ms에서 제한해 완결 시간을 유지한다. 사진 콜라주·bento 전체를 조각내지 않는다. 맞지 않는 layout에 `stagger` 또는 `chart`가 지정되면 정적으로 완성되어 있어야 하며 숨김 상태가 남아서는 안 된다.

## 루트 예제 적용표

| 장·ID | 역할 | 확정 모션 | 컬러·정적 요소 |
| --- | --- | --- | --- |
| 6 · `color-statement` | 주황색 의미 문장 | `rise` | 강조 문장만 주황, 나머지 문장은 흰색 |
| 7 · `color-roles` | 범주 배열 | `stagger` | 범주 원형·라벨 대응, 제목 중립 |
| 8 · `new-voice` | 큰 이름 소개 | `rise` | 보라 이름, 보조 메타 중립 |
| 9 · `one-proof` | 비교의 근거 | `chart` | 선택된 막대 하나만 파랑, 라벨·수치는 처음부터 최종값 |
| 12 · `warm-introduction` | 큰 이름 소개 | `rise` | 보라 이름, 장식선·보조 문구 중립 |
| 19 · `next-steps` | 다음 행동 세 가지 | `stagger` | 단계와 제목 중립, 기존의 의미 강조 보존 |

위 ID는 현재 `content.js`의 실제 ID와 대조했다. 적용표는 장의 역할을 지정하며 런타임이 특정 ID·문구를 인식하도록 구현하지 않는다. 다른 기존 장은 미지정 기본 fade를 유지하며 밀도 높은 데모는 `none`을 선택할 수 있다.

## 움직임을 제거하는 상태

CSS의 기본 스타일은 opacity 1·변형 없음·최종 막대 폭이다. `screen`·`prefers-reduced-motion: no-preference`·관객 원본 `#slideStage`·발표 모드·비편집 조건이 모두 맞을 때만 일회성 효과를 추가한다. 읽기, 모바일 읽기, 전체 보기, 발표자 현재/다음 장, 편집, 인쇄/PDF와 모션 줄이기 설정에서는 모든 항목을 즉시 정적으로 표시한다.

OS 설정이 실행 중 reduce로 바뀌면 현재 효과도 즉시 해제한다. JS 읽기 모드 이동은 매 호출의 설정에 따라 smooth/즉시 이동을 선택하고, 실행 중 smooth 스크롤도 중지되는지 구현 검증한다. 빠른 다음/이전·Home/End·전체 보기 선택은 애니메이션 완료를 기다리지 않는다. 편집을 켜면 caret·선택·입력에 움직임이 개입하지 않는다.

## 독립 프리뷰 계약과 검증

[프리뷰](preview.html)는 자체 문구·도형으로 선언·범주·이름·차트·단계 5장면을 보여준다. 브랜드 디자이너가 HTML/CSS를, 모션 디자이너가 [preview.js](preview.js)를 작성한다. `article[data-scene]`, `.is-active`, `.is-playing`, `body[data-motion-enabled]`, `[data-scene-target]`, `#replayButton`, 체크박스 `#motionToggle`로 연결한다. 이 제어 UI는 사양 검토용이며 제품에 재생 버튼을 추가해야 한다는 요구가 아니다.

선택, 다시 보기, 좌우/Home/End, 사용자 토글과 OS reduce 변경은 같은 최종 장면을 보존한다. 숫자 count-up·회전·탄성·타자 효과·parallax·무한 pulse·수동 단계 공개는 포함하지 않는다. 실제 브라우저에서 매니저가 검수한 결과는 [매니저 검수](manager-review.md)에 기록한다. 제품 적용의 실제 검증은 구현 이후 별도다.

모션 실무자는 TaskSpace 2의 전용 p7에서 실제 HTML/CSS/JS 연결을 확인했다. 범주 5개는 300ms와 지연 0/60/120/180/240ms, 막대 3개는 440ms와 지연 0/40/80ms로 나타났다. 차트 값 42/67/91은 고정이며 회색 막대 둘·파랑 하나의 구분을 유지했다. 사용자 모션 끄기와 실행 중 OS reduce 변경에서 animation 0, 인쇄 에뮬레이션에서 5장면 모두 표시·animation 0을 확인했다. 390px 에뮬레이션은 문서 scrollWidth 390px로 가로 넘침이 없었다. nav 버튼에서 Home/End로 첫/마지막 장면이 선택됐으며 체크박스·입력에 포커스가 있을 때는 장면 단축키가 개입하지 않는다. 물리 기기·실제 PDF 파일·제품 런타임을 검증한 결과는 아니다.
