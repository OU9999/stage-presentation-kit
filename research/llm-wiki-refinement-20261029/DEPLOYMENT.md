# 개선 발표 공개 인수

기능 [`57bcd26`](https://github.com/OU9999/stage-presentation-kit/commit/57bcd264c8e2ba7e1fe7e1350091982f6bf09324)를 main에 커밋·푸시했다. [Pages 실행40824091892](https://github.com/OU9999/stage-presentation-kit/actions/runs/40824091892)은 동일 SHA에서 success이고 Pages API는 built다. 실제 응답은 `evidence/pages-run.json`·`pages-build.json`에 있다.

[개선 발표](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/) · [비유 대응](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/index.html#6) · [큰 교정 문장](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/index.html#17) · [대본](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/materials/speaker-script.html)

## 실제 공개 사이트에서 확인

원고 revision은 `2b09aaabe8682deacadad7571ac4b6f1f6545ac2173c3bb138f1c0533b0ec233`이다. 다음은 로컬 검증과 별도로 공개 URL에서 직접 실행했다.

| 범위 | 공개 인수 | 근거 |
| --- | --- | --- |
| 사이트 바이트 | 발표·읽기·자료·자산·공유runtime/목차30파일 모두200·로컬 전체 바이트 동일 | `evidence/public-http.json` |
| 40장 | 같은 원고 revision·전체 DOM/실화면 확인. 본문 넘침/진단/오류/이미지 실패0 | `public-slides.json`, `screens/public-slide-*` |
| 기본 진행 | 실제27장 완주·비연속8링크,12/23선택의색/글크기/폭/높이/바탕 동일 | `public-core-route-browser.json` |
| 참여·탐색 | 참여/복귀10클릭·개요40/미리보기안쪽링크0·발표자양방향·발표→자료→대본→읽기 | `public-navigation.json` |
| 모바일 읽기 | 390px40장 전문/순서누락0·가로넘침0·기본본문18px·사진/SVG전체·alt | 같은 파일 |
| 자료 | 6문서×1440/390 전문누락0·18px·키보드탐색/코드스크롤 | `public-documents.json` |
| 읽기 제목 | 바뀐장10곳390px 직접진입시 헤더가림0·가로넘침0, native흐름표Enter접기/펼치기 | `public-reading-anchors.json` |

비유·교정 문장의 공개 원해상도 PNG도 root가 직접 열었다. 선택25장 중22장은 최초 로컬/공개 PNG가 같았다. 나머지3장은 포인터를 무대 밖 같은 위치로 두고 양쪽을 재촬영해 동일 픽셀을 확인했다. 초기 상태 차이와 재대조를 `public-visual-match.json`·`screens/state-*`에 분리해 남겼다. 자산 바이트와 표시 기하는 모두 동일하다.

이번 기술 검수는 실제 사람의 Zoom 반응·낭독20분·20초작성 성공이나 개인 도구의 파일 입력/저장 체험을 측정한 결과가 아니다. 약20분은 핵심27장 설명·참여18분+질문2분의 진행 계획이다.

## 브라우저 인계

root 소유 TaskSpace99에서 계측 페이지와 팝업을 정리하고, 계측 없는 공개6장 비유 도식 페이지 하나만 남겨 finish를 정확히 한 번 호출했다.40장·같은 원고·6장 위치·편집 노드0을 확인했고, 실제 반환은 `evidence/browser-finish.json`, 남긴 화면은 `public-result.png`에 있다. 이전 사용자 Space95/92/88/84/76과 서버4323은 보존했다. 이후 브라우저를 다시 조작하지 않았다.

현재 제품과 자료는 위 기능 커밋의 바이트로 인수했다. 이후 추가하는 것은 이 문서·공개 JSON/PNG·작업 로그의 검수 기록이며, 후속 푸시 뒤 최신 Pages SHA/상태와 동일 제품 바이트를 다시 확인한다.
