# 권장 편집 C의 공통 런타임 적용

2026-10-23. 개발팀 매니저의 설계·검증 보고서다. 프로젝트 상태와 담당자는 루트 [WORK_LOG.md](../WORK_LOG.md) 하나에서 관리한다.

## 승인된 범위와 설계

사용자가 [C 편집안](review-20261023/design/proposal.html#c)을 선택하고 실제 구현을 요청했다. 사진 모음을 일괄 격자로 바꾸기보다 기존 `seoul`의 12슬롯을 유지하면서, 한 프로젝트의 관찰 → 주제 → 다음 행동을 서로 다른 결과물로 보여 준다. 큰 문서 표지, 한 행동과 네 도구의 열린 UI, 인용·기록·주제·발견·과정·공유 목록은 서로 다른 역할을 갖는다.

기존 `bento`의 `media` / `metric` / `text`, `recap` / `seoul` 배치를 유지한다. 새 표현은 명시적인 `variant: "editorial"`과 `type: "artifact"`의 `kind`로 지정한다. 지원하는 표현은 `cover`, `quote`, `waveform`, `concepts`, `task`, `report`, `process`, `actions`다. 주제마다 HTML·CSS·렌더러를 수정하거나 자유 좌표를 작성하지 않는다. 사용자 문장은 편집·저장·내보내기에 연결된 DOM 텍스트로 두고 장식만 SVG를 사용한다.

편의성은 복사할 Markdown 원고와 다른 주제의 짧은 params 시작점으로 확인한다. 파형·노드·과정은 설명용 개념 표현이며 실측 데이터 그래프를 뜻하지 않는다. 연구용 원본 사진·브랜드 로고를 예제 자산으로 옮기지 않는다.

## 테스트 설계

실제 저장소의 Node 기본 테스트 실행기와 공통 모델·Markdown 변환·렌더러 경로를 검사한다. 초기 기준은 총괄이 실행한 기존 111개 통과다. 테스트 설계는 다음 위험을 기준으로 나눴으며 사용자 승인 단계로 사용하지 않았다.

| 시나리오 | 구체 케이스 | 관찰할 결과 |
| --- | --- | --- |
| TS-E01 구조화한 결과물의 재사용 | TC-E01: 8종·12슬롯·다른 주제·세 테마 | 정상 입력이 오류 없이 유지되고 원본이 변하지 않음 |
| TS-E02 잘못된 입력의 격리 | TC-E02: 필수 누락, 0·상한 초과, 중첩 null, icon/src 충돌, 좌표 강요 | 실제 필드 경로를 알려 주고 앞뒤 장·입력 원본을 보존 |
| TS-E03 편집·안전한 출력·미디어 | TC-E03: 실제 renderSlide DOM의 필드와 중첩 경로, HTML처럼 생긴 문자열 | 문장을 안전한 텍스트로 표시하고 편집 필드·미디어 진단 경로 유지 |
| TS-E04 기존 동작 | TC-E04와 기존 테스트: 기존 양식·bento | 기존 입력·배치 계약을 유지 |
| TS-E05 정상 경계 | TC-E05: 표지 제목 1·4줄, 주제 1·3개, 도구 1·4개, 발견·행동 1·3개, 과정 2·4개 | 문서에 명시한 최소·최대에서 모든 원본 항목을 표시 |
| TS-E06 빈 제목으로 편집 | TC-E06: 표지·발견 제목을 지우고 직렬화·복원 | 빈 편집 필드가 유지되고 `undefined` 문구가 생기지 않음 |
| TS-E07 미지원 필드 보존 | TC-E07: 오타·허용하지 않은 객체 필드 | 경고로 안내하고 임의 하위 데이터를 해석하거나 삭제하지 않음 |
| TS-E08 미지원 미디어 옵션의 격리 | TC-E08: 표지 zoom·도구 fit/focalPoint/zoom | 경고한 값은 원문에만 보존하고 선언된 필드만 렌더러에 전달 |
| TS-A01 Markdown과 params의 동일한 사용 | TC-A01: C 구조·다른 주제·문자열 | 같은 공통 렌더러 데이터로 전달 |
| TS-A02 중첩 미디어와 오류 | TC-A02/A03: 다른 출력 폴더, src/video/poster·URI·query, 파일 누락 | 경로를 정확히 바꾸고 실패 시 기존 출력 보존 |
| TS-A03 복사와 재생성 | TC-A04/A05: params 시작점, 원문 불변, 결정적 생성, 잘못된 입력 | 별도 런타임 수정 없이 사용하고 오류 필드를 안내 |

Zero·One·Many·Boundary는 항목 수와 필수 입력, Interface는 Markdown → 모델 → 렌더러 및 미디어 경로, Exceptions는 잘못된 타입·파일 누락, Simple은 정상 시작점으로 다룬다. 외부 서비스는 필요 없고 브라우저 DOM 경계만 최소 테스트 대역을 사용한다.

## 검증 근거

두 실무자는 모두 초기 구현을 수행했다. `runtime_engineer`는 공통 모델·렌더러·CSS 및 런타임 회귀, 취합 담당 `authoring_engineer`는 Markdown·원고·스타터·문서·생성물을 맡았다. 두 담당이 직접 API·경로 규칙·해시 생성 시점을 협의했고, 매니저는 코드·데이터·실제 표시를 별도로 확인했다. 공유 런타임 잠금 후 생성물을 재생성했다.

**최종 자동 검증:** 매니저가 `node --test tests/*.test.cjs`를 직접 실행해 **163개 통과, 실패·skip 0**을 확인했다. 기존 111개와 새 런타임 43개·작성 9개다. `node --check`로 `app.js`, `deck-model.js`, `scripts/markdown-deck.cjs`, `examples/editorial-starter.js`를 확인했고 `git diff --check`도 통과했다. 신규 테스트의 TC 식별자는 [런타임](../tests/bento-editorial-runtime.test.cjs)과 [작성](../tests/bento-editorial-authoring.test.cjs)에서 추적할 수 있다. 위의 모든 케이스는 최종 GREEN이다.

RED → GREEN 근거는 최초 런타임 22개 중 21개 실패와 작성 9개 실패에서 시작했다. 이후 미지원 `quote.src`가 파일 경로로 해석되는 실패 2개를 재현해 경로 방문을 선언된 미디어에 한정했다. 최종 리뷰에서는 표지의 미지원 `zoom: 2`가 경고와 달리 실제 `scale(2)`로 적용되는 TC-E08의 RED를 확인하고, 선언된 미디어 필드만 전달하는 두 줄의 패치로 GREEN을 확인했다. 기존 `type: "media"` 동작은 유지한다.

작성 담당의 최종 생성 검사에서 루트와 5개 예제 HTML의 공통 자원 쿼리 **18/18 일치**, 연속 생성한 10파일의 바이트 동일, 예제 35장의 입력 점검 0을 확인했다. 최종 공통 자원 식별자는 `app.js: cb1b9721b0bc`, `styles.css: 819c38f3e3ec`, `deck-model.js: df2624fd79a3`다. 매니저의 최종 브라우저 응답에서도 이 식별자를 직접 확인했다.

## 매니저의 실제 브라우저 검증

ego-browser 목표 Space8의 p1을 사용했다. 사용자 소유 완료 Space4·5와 총괄 전용 p2는 조작하지 않았다. 발표자 검증으로 생성한 p3는 검증 후 닫았다. 기존 localhost4317 서버를 사용했으며 새 서버를 만들거나 종료하지 않았다.

| 확인 범위 | 실제 행동과 결과 | 근거 |
| --- | --- | --- |
| C와 실제 제품 | 원본 C 캡처와 제품 #4를 직접 비교했다. 주역 표지·열린 한 행동 UI와 네 도구·각기 다른 결과물 표면을 유지한다. 최종1440px에서 12타일·8결과물·43편집 필드, 사진 naturalWidth1600, 점검0, 페이지 가로폭1440/1440을 확인했다. | [최종 화면](implementation-c-manager-evidence-20261023/desktop.png), [최종 영수증](implementation-c-manager-evidence-20261023/browser-receipt.json) |
| 세 테마 | Stage → Paper → Midnight → Stage를 실제 선택했다. 전환이 끝난 화면을 직접 열어 밝은 결과물의 원래 색, 어두운 결과물의 자체 면, 수치·과정의 테마별 글자 대비를 확인했다. | 최종C 및 직접 시각 검수. 프로젝터에서의 측색 검사는 아니다. |
| 390px 발표·읽기 | 발표에서는 12타일의16:9 구성을 축소했다. 읽기 버튼을 누르면 입력 순서대로 한 열로 펼쳐지고 타일 높이는180~482px였다. 문서 가로폭390/390이며 각 타일의 글자 범위가 타일 경계 안에 있음을 수집하고 실제 화면을 확인했다. | [읽기](implementation-c-manager-evidence-20261023/mobile-read.png), [행동·발견](implementation-c-manager-evidence-20261023/mobile-task.png) |
| 편집·저장·복원·다운로드 | UI에서 표지 첫 줄을 `Edited`, 발견 첫 행을 `안내를 먼저 보여준다.`로 바꿨다. 저장 후 새로고침으로 두 값이 복원됐고, 실제 내려받은 `content.js`를 VM으로 읽어 원고의 두 필드만 바뀌고 나머지 데이터는 완전히 같음을 확인했다. 해당 저장 키를 테스트 전 값으로 복구하고 원래 두 문구를 다시 확인했다. | 실제 사용자 입력·download 이벤트와 데이터 동등성 검사. 임시 다운로드는 저장소 원문을 덮어쓰지 않았다. |
| 긴 문장 진단 | file 전용 저장 경로에서 긴 인용을 실제 입력했다. 작성자 점검이 `slides.3.items.4.text`의 분량 경고를 표시하고 문장은 원문에 보존됐다. 테스트 키를 복구하고 원래 인용으로 돌아왔다. | 실제 작성자 점검 대화상자 확인. 경고가 내용을 자동으로 줄이지 않는다. |
| 발표자 | #4의 현재 미리보기·다음 #5·노트를 확인했다. 발표자 창의 다음 버튼으로 청중 #5 이동, 청중의 이전 버튼으로 발표자 #4 복귀를 확인했다. | [발표자 화면](implementation-c-manager-evidence-20261023/presenter.png) |
| 인접 장·탐색 | #2·3·5·6·7과 #4의 실제 렌더에서 미디어 로딩과 점검0을 확인했다. 최종 #4 → 오른쪽 방향키 #5 → 왼쪽 방향키 #4를 실제 조작했다. | [최종 영수증](implementation-c-manager-evidence-20261023/browser-receipt.json) |
| 오프라인 파일 | Network의 offline을 켠 상태에서 실제 `file:///…/examples/devday-compositions/index.html#4`를 열었다. 8결과물·사진 정상·점검0을 확인하고 네트워크 상태를 되돌렸다. HTTP 캐시만으로 오프라인을 판정하지 않았다. | 실제 file URL·offline 상태·로컬 사진 naturalWidth1600 확인 |
| Console·Network | 최종 공유 자원 해시로 강제 새로고침하고 키보드로 이동했다. 해당 p1의 Runtime 예외·Console warning/error·Log warning/error·Network loadingFailed가 모두0이며 로컬 문서·CSS·스크립트·사진11응답이 모두200이었다. | [최종 영수증](implementation-c-manager-evidence-20261023/browser-receipt.json) |

## 수정 범위와 한계

공통 코드는 `app.js`, `styles.css`, `deck-model.js`, `scripts/markdown-deck.cjs`다. 원고는 `examples/devday-compositions/slides.md`이며 생성된 `content.js`·예제5개의 `index.html`·루트 자원 해시를 함께 갱신했다. 다른 주제의 시작점은 [editorial-starter.js](../examples/editorial-starter.js), 작성 가이드는 [CONFIG.md](../CONFIG.md)와 [MARKDOWN.md](../MARKDOWN.md)다. README·DESIGN·EXAMPLES도 현재 계약과 발견 경로를 반영했다.

다른 주제의 복사 스타터 실제 사용·독립 편집/다운로드, 최종 PDF·갤러리 미리보기는 **총괄의 별도 검증 범위**다. 그 결과와 매니저 검증을 [최종 통합 기록](implementation-c-integration-20261023.md)에서 구분한다. 매니저 검증은 전체55장 재탐색·물리 휴대전화·다른 운영체제·실제 발표 거리·프로젝터 색 검사를 뜻하지 않는다. 390px 발표 모드의 작은 글자를 전부 읽을 수 있다는 뜻도 아니며, 내용을 읽을 때는 읽기 모드를 사용한다.

코어와 작성 실무는 완료했고 로그는 총괄만 갱신한다. 커밋·업로드는 수행하지 않았다. 기본 도형·파형·도구는 내장 개념 표현이며 실제 녹음·실측 그래프·성과 전환율이 아니다.
