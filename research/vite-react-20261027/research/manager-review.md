# Vite·React 리서치 매니저 검수

2026-10-27 · `/root/research_manager` · pull 후 기준 `a1b621c26d7e124a3c8d33eb288723ac7683c950`

## 검수 결론

**전환은 가능하지만 Vite와 React의 목적을 분리해 판단한다.** Vite는 개발·빌드·자산 관리, React는 복잡한 작성 UI의 컴포넌트·상태 관리에 이점이 있다. 기본 ESM dist로 현행 재생기를 바꾸면 무설치·`file://` 폴더 복사와 `content.js` 한 파일 교체 계약을 충족하지 못한다. 현재는 같은 계약을 유지하는 성능 개선을 먼저 설계하고, Vite+vanilla 비교와 독립 작성 UI의 점진 React를 후속 후보로 검증하는 결론이 타당하다. 전면 React의 속도 우위는 미확인이다.

## 매니저가 독립 확인한 경계

| 항목 | 실제 확인 | 판단 |
| --- | --- | --- |
| 최신 제품 기준 | README·CONFIG, `index.html`, `app.js`, `visual.js`, `scripts/direct-deck.cjs`를 pull 후 다시 읽었다. CSS 2개·일반 defer script 4개, 20개 레이아웃, native 시각자료·JSON 편집과 standalone runtime 5파일 복사를 확인했다. | 과거 19양식·script 3개·PDF 우선 기준을 최종 권고에 적용하지 않는다. |
| 재생 작업량 | `app.js:742` 전체 `render()`와 `app.js:765` 장 이동의 `updateActive()`를 대조했다. 후자는 기존 DOM을 재사용한다. `fitTextLayouts():798`와 `applyVisualEditor():915`의 측정·갱신 경로도 읽었다. | 매 장 전체 DOM을 새로 만든다는 전환 논리를 배제했다. 텍스트 측정·전체 순회·JSON 적용 렌더는 측정할 후보이며 병목 확정이 아니다. |
| Vite 출력·배포 | 공식 [build](https://vite.dev/guide/build)·[features](https://vite.dev/guide/features)·[assets](https://vite.dev/guide/assets)·[static deploy](https://vite.dev/guide/static-deploy)·[file 오류](https://vite.dev/guide/troubleshooting#built-file-does-not-work-because-of-cors-error)를 직접 열었다. | MPA·정적 Pages가 가능하다. 임의 데이터 문자열의 자산 복사와 초기화 순서는 별도 설계가 필요하다. 상대 base는 file module 실행을 보장하지 않는다. |
| React 통합 | 공식 [부분 도입](https://react.dev/learn/add-react-to-an-existing-project)·[createRoot](https://react.dev/reference/react-dom/client/createRoot)·[DOM refs](https://react.dev/learn/manipulating-the-dom-with-refs)·[contentEditable](https://react.dev/reference/react-dom/components/common)·[prerender](https://react.dev/reference/react-dom/static/prerender)를 직접 열었다. | root 내부 DOM 소유권·초기 자식 제거·편집 경고 억제의 한계를 확인했다. 독립 편집 영역의 점진 도입과 사전 렌더를 별도 작업으로 다룬다. |
| Pages 운영 | 공식 [source 선택](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)을 직접 열었다. | build 산출물 게시가 필요하다. Actions artifact와 branch 루트/docs가 선택지이며 사용자 정의 Actions 빌드가 유일한 경로는 아니다. |
| 성능 근거 | 총괄 [브라우저 JSON](../evidence/browser-baseline.json)·[소스 크기 JSON](../evidence/source-sizes.json)의 HEAD를 직접 확인하고 FCP 중앙값 및 파일 합계를 재계산했다. | 루트/DevDay/visual/text의 문서 FCP 중앙값 84/136/64/88ms는 로컬 문서 지표다. 첫 장 준비·현장 CWV·React 비교의 증거로 확대하지 않는다. 공통 HTML·CSS 2개·JS 4개 269,472B, gzip 62,689B는 파일 크기·오프라인 압축 추정이며 전송 실측과 구분한다. |

공식 자료의 열람일은 모두 **2026-10-27**이다. 위 표의 기술 동작 확인과 STAGE에 대한 설계 판단을 구분했다. [기존 구조 연구](../../color-motion-20261024/engineering/architecture.md)는 재사용하되 최신 제품 기능과 우선순위가 대체하는 부분을 다시 확인했다.

## 팀 운영과 검증 범위

Vite 담당은 [Vite 초안](vite-draft.md), React 담당은 [React 초안](react-draft.md)과 [종합](synthesis.md)을 소유했다. 두 명 모두 초기 실질 조사를 수행하고 서로의 초안을 직접 읽었다. Vite 단독 이점과 React 런타임, 현행 CSR, 일반 장 이동의 DOM 재사용, file 출력, 단일 content 교체를 일대일로 협의했다. pull 후에는 매니저가 두 명에게 새 SHA·native visual/JSON 편집·무설치 우선·PDF 필수 제외를 각각 직접 통보하고 수신 확인을 받았다.

모델·맥락 선택은 총괄의 2026-10-27 07:16~07:18 UTC 공식 모델/출시 기록 조회와 현재 runtime catalog가 일치함을 확인해 같은 작업 스냅샷을 재사용했다. 두 실무자 모두 일반 기술 판단 및 통합에 맞춰 `gpt-6.1-sol` / `high` / `fork_turns=none`으로 배정했고 핵심 기준·소유권·연락 경로를 요약 인계했다.

리서치팀의 변경은 이 폴더의 보고서뿐이다. 제품·원고·Git·배포·설치·시제품은 변경하지 않았다. 최신 185개 테스트 통과는 총괄 실행 결과이며 리서치팀의 재실행으로 보고하지 않는다. React/Vite 동일 기능 production 비교, 저사양·제한 네트워크, 호환 출력·IME·저장·동기화 회귀는 엔지니어링의 후속 검증 대상이다. PDF 생성은 이번 필수 게이트에서 제외한다.

최종 두 초안과 종합을 새 SHA로 다시 읽었고 양방향 재검토·수정 요구 없음·두 실무자의 편집 종료를 직접 확인했다. 총괄의 [키보드 이상값 재확인](../evidence/keyboard-outlier-check.json)은 기존 단일 249.7ms의 원인을 확정하지 못했고 두 번의 추가 관찰에서는 재현하지 못했다. 해당 진단값은 paint를 포함하지 않으므로 기술 간 성능 우열 근거로 사용하지 않는다.

문서 4개의 로컬 링크 21개는 모두 존재하며 후행 공백·불필요한 끝줄 0, `git diff --check` 통과를 확인했다. 매니저도 보고서 편집을 종료하며, 단일 작업 로그 갱신과 다음 팀 인계는 총괄에게 전달한다.
