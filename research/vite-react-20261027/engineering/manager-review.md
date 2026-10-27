# 엔지니어링 매니저 독립 검수

2026-10-27 · `/root/engineering_manager` · 제품 기준 `a1b621c26d7e124a3c8d33eb288723ac7683c950`

## 판단

**Vite+React 작성 UI와 경량 재생기를 명시적 데이터·명령 계약으로 연결하는 점진 도입은 실행 가능한 경로다.** 기존 portable 재생기를 유지하면 개발 도구 체인 도입과 폴더 복사·무설치·`file://`·`content.js` 한 파일 교체를 함께 설계할 수 있다. HTTP와 portable의 출력·검증 비용을 분리한다. 전면 React 전환의 성능 우위는 확보하지 않았으며, 미디어·치수 측정·발표자·JSON 적용의 작업량 개선을 별도 비교한다.

## 매니저가 직접 확인한 근거

| 확인 대상 | 독립 확인과 판단 |
| --- | --- |
| 제품·사용 계약 | README/CONFIG, index, app, visual, 모델과 direct/Markdown helper를 읽었다. classic defer의 content→model→visual→app 순서, 즉시 capture하는 전역 의존, 20양식, standalone runtime 5파일, 별도 data.html의 디스크 원고 계약을 확인했다. 두 스타터의 runtime 10사본은 루트와 바이트가 같았다. 이는 저장소 유지보수 중복이며 한 페이지의 중복 전송 비용이 아니다. |
| 관객·발표자 경계 | 관객 `goTo()`는 `updateActive()`로 기존 장 DOM을 재사용한다. 반면 관객 navigation의 revision/index 변경은 발표자에서 full deck clone·검증·전체 stage render와 current/next preview 생성으로 이어진다. 이 반례를 성능 담당에게 직접 전달했고 반영을 확인했다. 현재 baseline은 발표자를 포함하지 않으므로 비용 크기·병목으로 확정하지 않는다. |
| 측정·저장 작업 | fit의 전역 visual 선택·숨긴 장 skip·class/style 쓰기와 치수 읽기, rAF/scale/ResizeObserver 경로, 220ms active diagnostics, JSON 성공 시 전체 persist/render를 확인했다. 전부 후속 trace 후보이며 실측한 절감률이 아니다. |
| 최신 baseline | 최신 4근거의 HEAD와 FCP·키 이벤트 한계를 읽었다. source-sizes의 10파일 SHA/바이트를 현재 파일과 대조했고 HTML+CSS2+JS4 269,472B·기존 파일별 gzip 추정 62,689B를 재계산했다. 단일 249.7ms 표본은 추가 16회에서 최대 8.2ms로 재현되지 않았으며 인과를 확정하지 않았다. 구형 before-pull 수치는 사용하지 않았다. |
| 실제 probe | 최종 build log, package/lock/config, bootstrap/panel/bridge/prepare/verify를 읽었다. Vite 8.3.5·React/DOM 19.3.1 exact lock과 설치·production build exit 0, public classic 비번들 경고, 정적/VM 검증 범위를 확인했다. 실행한 `/tmp/stage-vite-react-probe.vVYnYS`의 dist 10파일을 저장된 SHA/바이트와 직접 대조했고, 두 entry의 고유 파일 합계와 gzip 합계를 다시 계산했다. 보존 source/config/lock 12파일도 실행된 임시 폴더와 바이트가 같았다. README는 사후 재현 안내 문서다. |
| bootstrap 검수·교정 | 초기 fixture의 readyState 검사만으로 준비 순서를 설명하던 부분을 지적했다. 담당자가 bridge-ready 이벤트와 DOM-ready의 두 조건으로 한 번 mount하는 gate를 명시하고 재build했다. 수정 소스·최종 산출물 일치를 확인했다. 브라우저 스케줄링·UI 동작까지 실행 검증한 것으로 확대하지 않는다. |
| 크기 해석 | 최종 eager React editor chunk는 220,559B, Node zlib 오프라인 gzip은 68,349B다. tiny vanilla entry는 편집 UI가 없어 동등 기능 비교가 아니다. 차액을 제품 순증·최소 React 비용·속도 차이로 해석하지 않는다. 기존 Python gzip, Vite 콘솔 반올림, Node gzip을 직접 비교하지 않는다. |

직접 확인한 소스 경계는 [초기화](../../../index.html#L12), [render/updateActive](../../../app.js#L742), [fit](../../../app.js#L798), [JSON 적용](../../../app.js#L915), [diagnostics](../../../app.js#L956), [발표자 수신](../../../app.js#L1160), [standalone 복사](../../../scripts/direct-deck.cjs#L31)다. 보고서의 공개 기술 근거는 리서치팀의 당일 공식 자료 확인을 재사용했다. 신규 실행의 package 버전은 담당자의 npm primary registry 조회 원문과 exact lock을 대조했다.

## 실제 검증의 한계

최소 probe는 실제 모델·visual 두 파일과 작은 bridge fixture를 사용하며 실제 app.js를 import하지 않았다. Node VM은 명시 순서의 초기화와 DOM을 mount하지 않은 데이터 commit/무효 입력 거절을 검사한다. React 컴포넌트의 브라우저 실행, 20양식 전체 전환, 실제 dialog/focus·IME·inline selection/undo·저장·발표자·file 회귀를 통과했다는 증거가 아니다. 성능 비교·새 브라우저 계측·제품 변경·배포는 수행하지 않았다. 기존 185검사와 현재 브라우저 baseline은 총괄 실행 결과다. 매니저는 불필요하게 이를 재실행하지 않았다.

후속 구현은 Vite 작성기 뼈대·외부 content/asset mapping·React JSON 편집 adapter를 순서대로 연결하고, 기존 재생기/portable 계약을 검증한다. 미디어 준비·fit 병합·발표자 delta·JSON 국소 갱신은 각각 측정한다. 전체 React 확대는 실제 기능 동등성과 production 비교가 확보된 뒤 판단한다. PDF는 필수 게이트에서 제외한다. [실행 설계](migration-design.md), [성능 감사](performance-audit.md), [최종 취합](synthesis.md)

## 팀 운영과 변경 범위

리서치 매니저와 최신 기준·계약·계측 한계를 직접 인계하고 수신 확인했으며 해당 매니저의 완료 후 두 실무자를 배치했다. 성능 담당은 독립 감사 초안, 전환설계 담당은 독립 설계·격리 probe와 최종 취합을 맡았다. 두 담당은 서로의 초안과 probe를 읽고 관객/발표자 경계·JSON 전체 갱신·비동등 fixture·gzip 계산법을 직접 협의했다. root의 최신 도입 경로·runtime 중복 해석·소스 링크 `#L` 지침도 각 담당에게 직접 통보했다.

총괄의 2026-10-27 07:16~07:18 UTC 공식 모델/출시 기록·현재 runtime catalog 스냅샷을 동일 작업에 유효함을 확인해 재사용했다. 두 실무자는 일반 기술 판단·통합과 요약 인계에 맞춰 `gpt-6.1-sol` / `high` / `fork_turns=none`으로 배정했다. 실제 총괄 포함 4슬롯을 지켰다.

엔지니어링팀 소유는 이 폴더의 보고서·최소 재현 근거뿐이다. 제품·원고·루트 package/lock·WORK_LOG·Git·Pages·브라우저·서버는 수정하지 않았다. 제품의 최신 tracked 변경이 없음을 확인했으며, 로그는 총괄만 기록한다. 후속 실제 구현·성능 비교·호환 출력 검증은 미실행 상태로 인계한다.

최종 감사·설계·종합을 모두 다시 읽었고 두 실무자의 완료·편집 종료를 직접 확인했다. 엔지니어링 Markdown 5개(재현 README 포함)의 로컬 링크 56개 누락 0·후행 공백/불필요한 끝줄 0, JSON 4개 파싱, probe 보존 소스 13개 SHA 일치, `git diff --check`를 확인했다. 최종 HEAD는 기준과 같고 tracked 변경은 총괄 소유 WORK_LOG뿐이다. 매니저도 보고서 편집을 종료한다.
