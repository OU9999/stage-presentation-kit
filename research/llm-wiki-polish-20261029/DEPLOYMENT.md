# 문장·시각 전달 교정 공개 검수

2026-10-29, 원고 교정 [`7b9cd0c`](https://github.com/OU9999/stage-presentation-kit/commit/7b9cd0c34fb1150572efa3ed8bfe1f11d8f9ee15)과 읽기 제목 가림 수정 [`4b35cfb`](https://github.com/OU9999/stage-presentation-kit/commit/4b35cfb90e5ba363b299c1eac2e77314f2717e1d)을 main에 push했다.

- 원고 배포 [40800433787](https://github.com/OU9999/stage-presentation-kit/actions/runs/40800433787): 같은 SHA 성공. 공개 40장·차트/흐름·참여·모바일·학습 자료를 확인했다.
- 제목 가림 수정 배포 [40801647000](https://github.com/OU9999/stage-presentation-kit/actions/runs/40801647000): 같은 SHA 성공/API built. 공개 읽기 앵커 회귀와 원값/참여를 다시 확인했다.

최종 Pages API/실행 응답은 `evidence/pages-build.json`·`pages-run.json`, 최종 파일 비교는 `public-http.json`에 있다. 발표·자료·자산·공유 runtime/목차/manifest29파일이 모두200이고 로컬 전체 바이트와 같다.

## 공개 화면과 실제 동작

40장 원고 revision은 `7dbd19ffdf942f22af8bec54af10fac7835a06469360b99bdb783a2dca077c28`이다. 마지막 CSS 교정은 이 원고와 발표 모드의 기하를 바꾸지 않았다.

| 범위 | 공개 확인 결과 | 근거 |
| --- | --- | --- |
| 발표40장 | 최신 원고·잘림/진단/오류0·불필요 사진 메타0 | `public-slides.json`, `public-visual-match.json`, `screens/public-slide-*` |
| 문장·사진 | 줄 고립을 고친9/12/13/15/23/25/28/38과 사진/인용/도식을 실제 PNG로 확인 | 같은 화면 기록 |
| 차트 | 같은 단위5/3쪽·8합계·62.5/37.5%·막대 실제 너비·원값 표 일치 | `public-native-visuals.json` |
| 흐름·표 | 세 단계·같은 원본의 표·1440/390·Enter 접기/펼치기·가로 넘침0 | 같은 파일 |
| 읽기 앵커 | 새31/33·기존visual-story5/7×1440/390의8경우, 제목이 헤더 아래에 표시 | `public-anchors.json` |
| 참여·탐색 | A/B/공개·복귀·이어가기10클릭·overview40·presenter양방향·자료→대본→읽기 | `public-navigation.json` |
| 모바일 읽기 | 40장 전문/순서 누락0·18px·이미지 전체/alt·가로 넘침0 | 같은 파일 |
| 학습 자료 | 6문서×1440/390 전문 누락0·18px·JS0·키보드 탐색 | `public-documents.json` |

학습 문서의 본문은 원고 교정 배포에서 검수한 내용과 같으며 마지막 수정은 별도 native visual 읽기 CSS 한 줄과 파생 runtime/HTML 버전이다. 문서 전용 CSS와 문서 본문을 바꾸지 않았다.

처음 공개 read#31에서 제목 첫줄이 헤더 뒤로 가리는 것을 발견해 종료하지 않고 교정했다. 수정 전은 `screens/public-native-anchor-390.png`, 수정 후는 `screens/public-anchor-31-390.png`다. 최종390px 차트 제목top123.9px/헤더bottom70px, flow 제목top124px/헤더bottom70px로 확인했다. 모든 회귀의 article.top은 약92px다.

## 브라우저 인계

새 TaskSpace92의 계측p1과 발표자 팝업을 정리했다. 계측 없는 공개 차트 화면 p5(40장·최신revision·5/3원값·편집노드0)를 남겨 finish를 정확히 한 번 호출했다. 이후 브라우저를 다시 조작하지 않았다. 기존 사용자 Space88/84/76·서버4323은 보존했다. `evidence/browser-finish.json`·`public-result.png`에 기록했다.

[발표](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/) · [새 구성 차트](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/index.html#31) · [학습 자료·대본](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/materials/index.html)

이 검수 뒤에는 로그와 결과 기록만 후속 커밋하며 제품/원고/생성물은 마지막 공개 검수 내용과 같다. 후속 push의 원격·최신 Pages 상태를 마지막으로 확인한다.
