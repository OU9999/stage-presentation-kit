# STAGE Vite·React 엔지니어링 종합

2026-10-27 · 엔지니어링팀 · 취합 `/root/engineering_manager/migration_designer` · 기준 `main/a1b621c26d7e124a3c8d33eb288723ac7683c950`

## 결론과 권고

**Vite+React로 전환할 수 있으며, Vite+React 작성 UI와 경량 portable 재생기를 나누어 시작하는 안을 권한다.** HTTP/Pages 작성기에 React의 독립 편집 root를 만들고 모델·원고·저장·내보내기 계약을 공유한다. 기존 재생기는 무설치 폴더 복사·file 직접 재생·content.js 한 파일 작성 경로를 유지한다. 이후 측정과 기능 검증 결과에 따라 HTTP 재생기·공통 모듈·전면 React로 확장할 수 있다. file 요구는 출력 설계와 검증 비용이며 도입 거절 사유가 아니다.

**작은 React 작성 패널의 production build는 실제 성공했다. STAGE 전체 전환과 성능 개선은 아직 검증되지 않았다.** 현재 코드의 반복 작업을 줄이는 개선과 Vite의 번들·캐시 이점, React의 UI 상태 관리 이점을 분리해서 평가한다. 전면 React가 현행보다 빠르다는 근거는 없다.

| 대안 | 실행 경로 | 이번 판단 |
| --- | --- | --- |
| 현행 개선 | 기존 runtime에서 미디어·측정·발표자·JSON 갱신 작업량을 개별 개선 | 기능 동등성을 유지하는 비교 기준. 최적화 효과는 trace와 반복 측정 필요 |
| Vite 단독 | 명시적 module bootstrap·MPA/base·자산 manifest와 HTTP 산출물, portable 별도 출력 | React 유무와 독립적인 build 관리 후보. 동일 DOM·미디어 정책의 비교군으로 유용 |
| Vite+점진 React | 실제 visual JSON 편집 패널과 이후 속성/검증 UI를 별도 root로 도입 | 권고하는 구체 시작점. 단일 textarea 때문에 React가 필수인 것은 아니며 UI 확장·유지보수 목적을 별도 평가 |
| Vite+전면 React | 20개 양식·stage·inline 편집·전체 보기·발표자 전체 이행 | 가능하나 가장 큰 회귀 범위. 단계적으로 검증하며 속도 우위를 전제하지 않음 |

설계의 공식 근거는 리서치팀 [Vite 조사](../research/vite-draft.md), [React 조사](../research/react-draft.md), [연구 종합](../research/synthesis.md)을 재사용했다. 엔지니어링의 코드 감사·구체 이행안·신규 빌드 실행은 아래 문서와 근거에 분리했다.

## 현행 성능과 작업 경로

최신 [browser-baseline.json](../evidence/browser-baseline.json), [baseline-summary.json](../evidence/baseline-summary.json), [source-sizes.json](../evidence/source-sizes.json), [keyboard-outlier-check.json](../evidence/keyboard-outlier-check.json) 네 근거만 사용한다. pull 전 수치는 현재 판단에서 제외했다. 총괄이 무제한 localhost·1440×1000·캐시 비활성으로 네 덱을 각각 3회 측정했다. 새 브라우저 측정과 기존 185검사 재실행은 엔지니어링팀이 하지 않았다.

| 확인된 값 | 정확한 의미와 한계 |
| --- | --- |
| 문서 FCP 중앙값: root/DevDay/visual/text 84/136/64/88ms | header/toolbar도 포함하는 문서 지표. 첫 슬라이드 준비·미디어 decode/paint·현장 CWV·전환 후 개선율 아님 |
| root 첫 요청 이미지 13 URL, 원본 합계 2,108,987B; DevDay 6 URL, 1,831,368B | 사진 덱 미디어 후보의 근거. 일부 resource size가 0이며 로컬 파일 합계는 실제 전송/압축 실측 아님. visual/text는 이미지 0개이므로 미디어만으로 설명 불가 |
| root HTML+CSS 2개+JS 4개 269,472B / 오프라인 파일별 gzip 합계 62,689B | 현재 파일 크기 기준. 서버는 응답 압축을 제공하지 않았으며 Pages 전송량 아님. runtime 복사본을 한 페이지 전송량으로 합산하지 않음 |
| 실제 키 이동 43회, 동기 구간 중앙값 약 1.2/0.8/1.8/1.3ms | window bubble까지의 동기 처리. rAF·220ms diagnostics·layout/paint 제외. INP/입력 후 화면 응답 아님 |
| text 단일 249.7ms; 추가 16회 최대 8.2ms·신규 long task 0 | 이상값은 보존하되 재현·원인 확정 못함. React/Vite 우열·개선 폭의 근거 아님 |

[성능 감사](performance-audit.md)는 사용자 경로별 호출을 직접 확인했다. 관객 ordinary next/previous/Home/End는 기존 DOM을 재사용하며 전체 stage를 다시 만들지 않는다. 다만 전체 장·편집 필드 순회와 rAF fit, 지연 diagnostics가 있다. 최초 진입·JSON 성공 적용·편집 마침·theme 변경 등 전체 render 경로는 따로 있다.

**발표자 창은 중요한 반례다.** 관객 장 이동의 revision 변경→full deck state 전송→발표자 clone/validate/전체 stage render와 current/next preview 재생성이 연결된다. 2초 hello 응답도 full deck을 보내지만 revision/index/theme가 같으면 수신 측 재렌더는 생략한다. 따라서 관객 navigation이 가볍다는 사실을 발표자까지 일반화하지 않는다. JSON 성공 적용도 validateVisual→persist의 전체 검증/직렬화→render의 전체 검증/DOM 생성이 이어져 독립적인 범위 축소 후보다.

fit의 style 쓰기와 치수 읽기, scale/rAF 중복 예약은 layout 비용 후보이나 실제 flush 비용을 측정하지 않았다. diagnostics는 220ms debounce 후 현재 장만 측정하고 읽기/발표자에서는 생략하므로 모든 장을 매 키마다 동기 측정한다고 설명하면 틀리다. 성능 감사의 우선순위는 조사 시작 순서이며 병목 비용 순위가 아니다.

## 실제 Vite·React 빌드 검증

제품 밖 `/tmp/stage-vite-react-probe.vVYnYS`에서 npm primary registry의 latest를 확인하고 **Vite8.3.5·React19.3.1·ReactDOM19.3.1**을 exact pin했다. Node v24.22.1/npm11.19.1은 Vite 요구 `^20.19.0 || >=22.12.0`을 충족했다. lock 생성 후 `npm ci --ignore-scripts --no-audit --no-fund`로 재설치하고 production build를 실행했다. 제품 루트에는 package/lock이나 의존성을 추가하지 않았다.

fixture는 실제 model/visual 두 소스와 작은 bridge, 교체형 content, React JSON textarea, 단순 vanilla 준비상태 entry로 구성한다. React root는 legacy preview와 별도 DOM이다. bridge-ready/DOM-ready gate를 둔다. 실제 app.js·20개 양식·저장·발표자 통합은 하지 않았다. React는 eager entry이며 패널을 열 때 lazy load하는 절감 효과는 미측정이다.

| 최종 빌드 파일 | 원본 B | Node zlib 오프라인 gzip B |
| --- | ---: | ---: |
| `assets/editor-DAdjzpHn.js` | 220,559 | 68,349 |
| `assets/modulepreload-polyfill-P2Xu9kJm.js` | 670 | 389 |
| `assets/vanilla-CGEeU8qd.js` | 396 | 271 |

이는 작은 fixture의 출력이다. vanilla는 편집 UI를 구현하지 않아 동등 기능 비교가 아니며 차액을 React의 순증 비용이나 STAGE 개선율로 계산하지 않는다. gzip 계산기는 현행 Python·probe Node·Vite 콘솔 간 다를 수 있어 직접 전송 크기 우열 비교를 하지 않는다. 모든 gzip은 오프라인 추정이다.

확인한 것은 **실제 프레임워크 production build 성공, 출력 classic tag/순서/base 정적 보존, 원본 model/visual의 바이트 동일성, Node VM 명시 순차 실행의 전역 생성과 순수 valid/invalid commit**이다. 일반 script를 bundle하지 않는다는 Vite 경고는 의도한 public 복사 경계를 보여준다. 브라우저의 실제 defer/module 순서·React UI·file 실행·성능을 입증한 것은 아니다.

재현 가능한 [최소 소스와 명령](evidence/probe-source/README.md), [exact package와 lock](evidence/probe-source/package-lock.json), [빌드 명령/registry 원문](evidence/probe-build-log.txt), [정확한 크기·hash·manifest 원문 객체](evidence/probe-results.json), [소스/설정/lock SHA](evidence/probe-source-sha256.json)를 보존했다. node_modules/dist 큰 덩어리·제품 소스 복사본은 저장소에 넣지 않았다. build 시간은 작은 로컬 fixture 값이며 제품 개발/런타임 성능으로 쓰지 않는다.

## 후속 구현의 경계와 수용 기준

[전환 설계](migration-design.md)는 다음 실행 경로를 제시한다.

1. **Vite 작성기와 출력 경계를 만든다.** HTTP MPA의 기존 root/중첩 index/data 주소·hash/query를 유지하고 `base`와 동적 미디어 resolver를 분리한다. 임의 content의 src 문자열은 Vite가 자동 수집하지 않으므로 compiler 참조 목록/미디어 map 또는 선별 public 복사를 사용한다. Vite bundle manifest와 deck 미디어 manifest의 역할을 구분한다. content.js는 교체 가능한 외부 파일로 남기고 원본에 hashed URL을 덮어쓰지 않는다.
2. **React JSON 패널을 실제 bridge로 연결한다.** React는 전용 root의 초안/오류만 소유하고 stage는 legacy가 소유한다. snapshot+revision을 받아 성공 commit만 공통 원본에 반영한다. 열린 초안 중 장/revision 변경, 취소·닫기·잘못된 JSON·focus 복원·한글 IME/selection/undo를 검증한다. StageVisual을 React에 감싸면 children 없는 ref host 내부만 어댑터가 관리한다. 그림/강조값/현재 표와 디스크 data.html의 기존 차이도 유지한다.
3. **portable과 Pages 산출물을 검증한다.** portable은 현재 runtime5파일 복사·상대 자산·classic 실행을 유지한다. 이후 공통 소스에서 HTTP ESM/portable classic을 별도 빌드할 수 있으나 module CORS가 없는 호환 출력은 직접 증명해야 한다. Pages는 검증된 dist를 artifact 또는 branch 루트/docs로 게시하는 설계이며 현재 root 배포 설정이 dist로 자동 변경되지 않는다. gallery·credits·preview·연구·기존 보관 링크, 재배포 후 옛 chunk, 실제 deep link 누락/404를 확인한다. 배포는 이번에 수행하지 않는다.
4. **성능 최적화를 한 변수씩 비교한다.** trace/준비 지표 고정→미디어 요청/크기→fit/scale 병합→발표자 delta/preview 범위→JSON 국소 갱신→전체 필드 순회/thumbnail cache 순으로 조사한다. 미디어·DOM 정책을 바꾼 효과를 Vite/React 효과와 분리한다. 같은 네 덱+20양식/긴 값/긴 deck fixture에서 cold/warm·제한/무제한 조건을 반복하고 startup/입력 후 paint/JSON/발표자·layout/메모리를 구분한다. 현재 로컬 FCP를 첫 장 SLA로 삼지 않는다.
5. **전면 React 여부를 실제 결과로 정한다.** 20양식과 오류, 모바일390px·읽기·reduced motion·영상 pause·전체 보기·발표자 양방향/재접속, 저장 서명/경로·내보내기/복원/reset·content 교체·folder copy/file를 통과해야 한다. 기존185검사와 새 경로의 의미 있는 회귀 검사를 사용한다. 기능이 동등하고 반복 결과가 잡음 이상으로 개선될 때만 성능 이득을 주장한다. UI 유지보수 목적의 채택 판단은 별도로 가능하다. PDF 생성은 필수 게이트가 아니다.

## 교차 검토와 한계

성능 담당은 관객과 발표자의 다른 갱신 경로·JSON 전체 작업량을 전달했고 전환 담당은 실제 probe 소스/lock/manifest와 DOM 소유권을 전달했다. 서로의 실질 초안을 읽고 직접 협의했다. 성능 담당이 지적한 **비동등 vanilla/editor 차액의 React 비용 오인 금지, gzip 계산 경로 차이, probe로 저장/IME/발표자 통합을 증명하지 못함**을 본문에 반영했다. 매니저 독립 검토의 bridge-ready gate와 저장소 소스 링크 형식도 반영했다.

확인되지 않은 것은 전체 STAGE Vite/React production 산출물, 같은 기능의 current/Vite/React A/B, 저사양/제한 네트워크의 현장 성능, file 호환 새 출력·IME·커서·저장·발표자 회귀다. 현재185검사·브라우저 기준은 root 실행 결과이고, 이번 팀의 새 실행은 격리 build/정적·VM 검증에 한정한다.

변경 범위는 엔지니어링 감사/전환/종합 문서와 최소 probe 재현 증거다. 제품·원고·WORK_LOG·Pages·브라우저·서버·Git commit/push는 변경하지 않았다. 단일 목표·지침·담당자·결정 기록은 총괄의 WORK_LOG를 따른다.
