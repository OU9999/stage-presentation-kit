# 실제 개선과 검증

2026-10-28 · 총괄. [개선 화면](index.html) · [회의와 결정](MEETING.md) · [작성 안내](../../MARKDOWN-FIRST.md)

새 Markdown 경로에 큰 선언·주역 사진·split/gallery/mosaic·H2 editorial·큰 인용·맺음을 연결했다. 내용은 기존 semantic AST 한 벌을 사용하며, 복잡한 배치·강조색·사진 초점만 선택한다. 두 예제는 제품 결정과 사진 워크숍이라는 서로 다른 이야기로 각8장이다. 색/crop을 포함한 장 설정은11개이며, 배치 이름을 직접 지정한 장은5/16이다. 설정 부담을 모두5번이라고 축소하지 않는다.

## 확인한 결과

| 검증 | 실제 범위와 결과 | 근거 |
| --- | --- | --- |
| 전체 자동 회귀 |229/229 통과. 기존210개와 새 조판/입력 회귀 포함. | [npm test 전체 로그](evidence/tests.txt) |
| 팀의 독립 검사 | 담당79개 통과와 매니저26입력/40장 의미 검수는 전체 회귀와 별개다. | [팀 검수](engineering/manager-review.md) |
| 실제 두 서사 |16장 모두 의도한 구도. 요소·글자·caption 영역 이탈, 이미지 실패, 실행/자원 오류0. | [16장 관찰](evidence/screens.json), [독립 미감 판정](design/final-visual-review.md) |
| 같은 원고의 기본 조판 | 배치 힌트 추가 없이 선언70→118px, 이미지 요소 약257×193→1189×467px. contain의 요소 상자와 실제 paint 면적은 구분한다. | [동일 본문 SHA](evidence/default-comparison.json), [실측](evidence/default-browser.json) |
| 사진2~6장 | gallery/mosaic10개 실제 구도에서 영역 이탈·이미지/실행 오류0. 사진별 초점 두 값도 순서대로 적용. | [22개 경계 입력](evidence/edge-browser.json) |
| 부적합·긴 원고 | focus 개수/구도 불일치는 원문을 보존한 document와 원고 줄 경고. 두 이미지의 세로 fallback과 의도적으로 극단적인 긴 제목은 발표 영역 초과도 진단. | [경계 입력](evidence/edge-cases.json) |
| 컬러·Paper | 기존5색과 neutral의 실제 computed 색, 두 Paper 예제의 그룹색·글자·배치 확인. | [Paper 실측](evidence/paper-browser.json) |
|390px 읽기 | 두 원고의16장 텍스트가 발표와 동일·순서 유지, 가로 넘침0, 사진10개 원래 비율/contain. 편집 노드·localStorage 호출0. | [모바일](evidence/mobile-browser.json) |
| 읽기 직접 진입과 키보드 | 배치 경고가 읽기 직접 진입에도 표시. 긴 코드의 방향키는 자기 스크롤을 움직이고 장 hash를 유지. | [모바일 경계 검사](evidence/mobile-browser.json) |
| 실제 작성 변경 | 격리 복사본의 Markdown만 수정해 제목·사진/alt/caption·표 행·값24→31·맺음을 출력. 없는 사진 오류는 마지막 성공 출력 보존. 추가 제목 저장은 dev 자동 갱신으로 실제 화면 반영. 원본 예제 불변. | [작성 기록](evidence/authoring-result.json), [실제 브라우저](evidence/authoring-browser.json) |
| 전체 보기·발표자 |8개 구도 미리보기, 비상호작용 preview 링크, 현재/다음 구도와 발표자 양방향 이동 정상. | [상호작용](evidence/interaction-browser.json) |
| 기존 양식 |20개 양식과 native8종을 포함한27개 실제 장에서 진단·이미지/실행 오류0. | [기존 실제 화면 검사](evidence/legacy-browser.json) |

디자인팀은 실제20개 PNG를 별도로 보고 공개 예제16장에 추가 필수 미감 교정이 없다고 판단했다. 총괄은 핵심 화면과390px 읽기를 직접 열어 확인했다. 자동 검사 수나 요소 박스 검사만으로 미감 통과를 대신하지 않았다.

## 적용 범위와 한계

기본 조판은 원고 구조를 이용하며 사진 속 얼굴이나 문장의 성과 의미를 추측하지 않는다. cover 사진의 crop은 저자가 focus/contain으로 선택한다.6사진 스트레스 예제의 일부 강한 근접 crop까지 자동 얼굴 보존으로 승인하지 않았다. 내용이 긴 document fallback은 경고와 전체 읽기를 제공하며 모든 원고를 한 발표 화면에 맞춘다는 약속은 하지 않는다.

기존 styles.css·visual.css·visual.js와 원래 내용/legacy 원고는 보존했다. 공통 런타임·독립 스타터·생성 발표를 함께 갱신했다. 새 프레임워크나 런타임 의존성은 추가하지 않았다. 읽기 원문과 발표의 내용 권위는 Markdown 한 곳이다. 이번 사진과 제품·수치는 스톡/가상 예시이며 실제 행사·참여자·성과 자료가 아니다.

최종41문서/HTML의 로컬 참조476개·버전 해시159개에 오류가 없고, runtime 사본21개가 일치했다. 기존 원고·내용·시각 런타임 등19소스와 이전 감사146개 artifact의 SHA도 보존했다. [통합 기록](evidence/integration-result.json)에 범위를 남겼다. 결과 보드의 두 발표 필터·같은 원고 비교·390px 가로 넘침0·이미지 오류0도 [실제 확인](evidence/board-browser.json)했다.

GitHub Pages는 `826414c`의 built 상태를 확인했다(2026-10-28 03:23:37 UTC). 런타임·두 발표 데이터·주요 사진·이전 비교 이미지·결과 보드 등22개 공개 자원이 로컬 파일 SHA와 일치했다. 공개 제품 발표4번과 워크숍 발표4번, 총2장의 본문·초점도 로컬 검증본과 같고, 영역 이탈·실행/자원 오류가 없었다.390px 읽기에서 발표 간 링크로 제품 발표2번에 직접 진입해 가로 넘침0·원본 비율 사진·localStorage 호출0을 확인했다. 공개 보드의 필터·실제 발표 연결·이미지 로딩도 정상이다. [공개 자원](evidence/public-resources.json), [공개 브라우저](evidence/public-browser.json), [Pages 빌드](evidence/pages-build.json)에 근거를 남겼다.
