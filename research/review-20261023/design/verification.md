# 독립 시안 검증 — 2026-10-23

검증 주체: 디자인 팀 매니저 `/root/design_manager`. 대상은 [proposal.html](proposal.html)의 최종 소스이며 현재 제품의 회귀 검증과 구분한다. ego-browser 공용 Space5의 매니저 전용 p4에서 조작했다. 총괄 p1·리서치 p2/p3·사용자 Space4는 조작하지 않았다.

최종 `proposal.html` SHA-256: `6758d2868cb9ac6c558789280b7dbd1f06e79ec4469156f1f1b29411fd3a648a`. 디자인 폴더의 Markdown4개·HTML1개의 로컬 링크80개 존재 검사에서 누락0이었다. 숫자는 중복 링크를 포함한 검사 횟수다.

## 실제 확인 결과

| 범위 | 수행·결과 | 보존 근거 |
|---|---|---|
| 데스크톱 실제 렌더 | CSS viewport 1440×1100. A→B→C 버튼을 실제 클릭했고 선택 버튼의 `aria-pressed`·URL hash·표시 내용이 함께 바뀌었다. 문서 가로폭과 scrollWidth가 모두1440px로 페이지 가로 넘침이 없었다. | [A 화면](proposal-desktop-a.png), [B 화면](proposal-desktop-b.png), [C 화면](proposal-desktop-c.png), [브라우저 영수증](browser-receipt.json) |
| A/B 비교 변수 | 12타일의 내용·grid span·xy·너비/높이·padding, 텍스트 글꼴/크기/행간, 7이미지의 src·fit·focal·xy·너비/높이·정상로딩 상태가 모두 정확히 같았다. DOM 수집값 `same:true`. 경계색·wash·UI wrapper 반경만 다르다. | [A/B 수집값](ab-comparison.json) |
| 자산·Network | 최종 새로고침과 A/B/C 전환 중 로컬 문서1개·이미지7개의 응답 모두200. A/B 이미지7개와 C 사진1개 모두 `complete && naturalWidth > 0`. C의 다른 비주얼은 자체 HTML/CSS/inline SVG다. | [브라우저 영수증](browser-receipt.json) |
| Console·실행 오류 | p4에서 Runtime·Log·Network 이벤트를 수집한 최종 조작 구간에 console error/warn, uncaught exception, Log entry, loadingFailed가 없었다. 전체 브라우저·다른 탭을 검사한 결과가 아니다. | [브라우저 영수증](browser-receipt.json)의 `failures:[]` |
| 확대/직접보기 | C에서 ‘새 창에서 크게 보기’를 실제 클릭했다. 생성된 p5는 `?view=full#c`, `full-view:true`, C 표시, 사진 정상로딩을 확인한 뒤 닫았다. p4로 돌아왔고 기존 탭은 보존했다. | [브라우저 영수증](browser-receipt.json)의 `expansion`, `popupClosed:true` |
| 390px 반응형 | CSS viewport 390×844에서 A/B/C를 모두 실제 전환했다. 세 상태 모두 문서폭/scrollWidth390px, 시안 외곽366×205.875px(16:9), 12타일 유지, 이미지 정상. 해당 조작 구간 오류 이벤트0. 실제 휴대전화·터치/핀치 테스트는 아니다. | [390px 화면](proposal-mobile-c.png), [상태별 측정](mobile-comparison.json) |
| 독립 시각 검수 | 매니저가 원본 서울 고해상·도쿄 mixed·현재2~7·SF20 차트/25 결과/47:50 요약을 직접 이미지로 비교했다. 최종 A/B/C 데스크톱·390px 화면도 직접 열었다. 두 실무자가 C 화면을 별도로 보고 구체 피드백을 취합했다. | [종합](synthesis.md), [발표 디자인](presentation-design.md), [DevDay 디자인](devday-design.md) |
| 범위 보존 | `git diff --stat`에 기존 추적 파일 변경 없음. 디자인 팀 산출물은 `research/review-20261023/design/` 안에만 있다. 공통 로그·제품·예제 원문·기존 연구는 수정하지 않았다. | 현재 Git 상태와 팀 소유권을 대조함 |

중간에 캐시를 끈 검사 한 번에서 호수 이미지의 naturalWidth가0으로 관찰됐다. 해당 URL의 실제 HTTP200·267321바이트를 확인했고, 이후 새로고침과 최종 A/B/C·390px 검사에서7개 모두 정상으로 확인됐다. 발생 원인은 확정하지 않았다. 최종 검증의 Network/Console 영수증과 이 중간 관찰을 구분한다.

## 시각 검수에서 수정한 것

- 큰 세로 표지의 그림이 초기에는 작은 도장처럼 축소되어 보였다. 제목/상단 여백/부제를 조정하고 그림 최소 높이를 확보했다. 최종1440px 화면에서 그림의 표시 높이는 약124px다.
- 추상적인 공유 완료 문장판을 발견3개와 대응하는 실행 목록3행으로 바꿨다. 작은 타일마다 인용·파형·주제 묶음·실행 UI·발견·과정·공유 목록이라는 다른 역할을 유지한다.
- 6가지 주제 수치에 대해3개만 그린 도식에는 발췌임을 표시했다. 설명용 QA 문장과 불필요한 일본어를 시안 본문에서 제거했다.
- 상위 비교 보드와 연결되도록 짧은 제목·상태별 직접 링크·독립 시안 표시·data SVG favicon을 갖췄다.

## 남는 한계

B는 경계의 부담을 줄이는 비교안이다. 원래 자산 안의 작은 글자·Signal의 contain 띠·BUILD/CREATE 문구·소재의 약한 연결이 남는다. B 하나로 원본과 같은 완성도를 얻었다고 판단하지 않는다. C는 소재·크롭·타이포까지 바꾼 별도 편집이므로 차이를 border 하나의 효과로 설명할 수 없다.

390px 전체보기는16:9 구성을 축소하므로 타일 내부의 작은 글자를 모두 읽을 수 없다. 새 창의 직접보기는 iframe의 제약을 벗어나는 용도이며 휴대전화에서 자동으로 모든 글자를 확대하는 기능은 아니다. 실제 발표 거리·프로젝터 색·PDF·오프라인 파일 URL·터치 확대는 이번 검증 범위 밖이다.

제품 런타임·Markdown 입력·생성 예제를 바꾸지 않아 제품 자동 테스트·예제 재생성·PDF를 실행하지 않았다. 상위 비교 보드의 iframe 연결·390px·통합 오류 검증은 총괄의 별도 범위다. 연구 원본 사진·영상 프레임은 비교 근거로만 보존하며 시안 자산으로 재사용하지 않았다.
