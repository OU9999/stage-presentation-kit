# 엔지니어링 통합 권고

2026-10-24 · 취합 `/root/engineering_manager/motion_engineer`

이번 개선은 **현행 HTML/CSS/JavaScript를 유지하고 CSS 모션 다섯 종류를 확장한다**. 구조 담당과 모션 담당이 각자 코드·공식 자료를 검토한 뒤 직접 협의해 같은 결론을 냈다. 현재 프로젝트는 19개 양식과 편집·검증·내보내기·발표자 동기화가 이미 연결된 앱이므로, 색상과 짧은 진입 효과를 개선하기 위해 렌더러 전체를 교체할 필요가 없다.

## 서로 다른 실무 검토

| 담당 | 독립 결과물 | 검토와 합의 |
| --- | --- | --- |
| `/root/engineering_manager/architecture_engineer` | [구조 검토](architecture.md) | React·reveal.js의 공식 기능과 현재 작성·오프라인 계약을 비교. 기존 구조 유지, 작은 데이터 계약 확장 권고. |
| `/root/engineering_manager/motion_engineer` | [모션 계획](motion-plan.md) | CSS·WAAPI·GSAP·Motion의 공식 문서와 현재 상태 경계를 비교. CSS만으로 이번 범위 수용 가능, JS reduced-motion 스크롤 보완 권고. |

React도 정적 배포가 가능하고 reveal.js도 기본 무빌드 구성이 가능하다. Motion의 JavaScript 애니메이션도 React가 필수는 아니다. 기술적 불가능을 이유로 배제하지 않았으며, 현재 요구와 마이그레이션·회귀 비용을 기준으로 선택했다. 공식 근거는 두 실무 문서의 직접 링크에 있다.

## 디자인팀으로 넘기는 확정 경계

1. 컬러는 [리서치 취합](../research/synthesis.md)의 핵심 대상·중립 메타 분리 방향을 따른다. 강조 문장·이름·범주·수치·선택 막대에 의미색을 주고, 불필요하게 eyebrow·경계·출처까지 전파하지 않는다. 사진과 작업물 자체의 표면색은 보존한다. 최종 팔레트·대비는 디자인팀이 확정한다.
2. 새 설정은 `slide.motion` 하나이며 `none | fade | rise | stagger | chart`를 제공한다. 미지정은 짧은 fade다. 기존 JSON과 Markdown params에 똑같이 적용하고 임의 CSS나 코드를 입력받지 않는다.
3. `rise`는 제목 중심의 작은 이동, `stagger`는 의미 있는 항목 묶음의 짧은 자동 순차 등장, `chart`는 막대만 scaleX로 진입한다. 실제 수치·라벨은 처음부터 최종값이다. 수동 단계 공개·카운트업·무한 반복은 이번 범위에 넣지 않는다.
4. 기본 스타일은 완성 화면이다. 관객의 발표 모드에서 편집 중이 아니고 시스템이 모션을 허용할 때만 효과를 적용한다. 읽기·인쇄·전체 보기·발표자 프리뷰·편집·reduced-motion은 정적으로 표시한다.
5. 전체 무대의 translate/scale을 효과가 덮어쓰지 않는다. 효과는 다음 장 진행을 지연시키지 않으며 빠른 이동 후 최종 상태를 보존한다. 모션별 시간·이동량·순차 간격과 적용할 대표 장은 디자인팀이 결정한다.

## 구현 인계

| 영역 | 구체 연결점 |
| --- | --- |
| 입력·검증 | `deck-model.js` enum, `scripts/markdown-deck.cjs` COMMON 목록에 motion 허용. 기존 원고 불변·오류 진단 계약 유지. |
| 재생·색상 | `app.js`의 data-motion·상태, `styles.css`의 의미색·중립 구조·한정된 keyframes. 기존 전역 `.slide.is-active` 애니메이션은 대체. |
| 접근성 | CSS no-preference 범위, JS 읽기 scrollIntoView 분기, 설정 중간 변경·편집·인쇄 검사. |
| 작성 편의 | 루트 content와 적절한 Markdown 예시에 서로 다른 모션을 설정하고 CONFIG/MARKDOWN 사용법 안내. |
| 생성·배포 파일 | 공유 runtime query hash 갱신과 기존 다섯 예제 재생성. 외부 의존성·CDN·새 build tool 추가 없음. |

## 완료 기준과 현재 검증 범위

새 enum 정상/오류와 기존 원고·Markdown 왕복·내보내기 보존은 자동 검사한다. 선언·범주/단계·차트의 실제 움직임, 빠른 장 이동, 편집·발표자 동기화, OS reduced-motion 변경, 모바일 읽기, 효과 중 인쇄/PDF의 최종 상태는 실제 브라우저에서 확인한다. 데이터 수치나 내용이 모션의 진행률에 따라 달라지지 않아야 한다.

이번 1차는 기술 검토다. 구조 담당은 file 재생을 제한적으로 확인했고 두 사람은 공식 문서와 코드를 대조했지만, 새 모션 구현·제품 회귀·실제 성능 벤치마크는 아직 수행하지 않았다. 제품 코드·WORK_LOG·Git 전달은 변경하지 않았다. 디자인 사양을 받으면 같은 두 담당자를 재개해 구현한다.
