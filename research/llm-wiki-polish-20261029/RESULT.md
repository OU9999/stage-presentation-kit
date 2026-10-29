# 문장과 시각 전달 교정 결과

40장 발표와 대본·자료의 사진 해설을 정리하고, 실제 브라우저의 줄바꿈과 각 장에서 전달하는 정보를 다시 점검했다.

- 사진: 불필요한 설명과 작가 반복 캡션을 제거했다. alt에는 사진 내용, 34장 캡션에는 행동만 남겼다. 작가·원본·이용 조건은 별도 출처 자료에 모았다.
- 문장: 어미·단어·출처 단위가 끝줄에 고립되는 곳을 짧고 자연스럽게 고쳤다. 장 제목과 대본/진행 안내도 동기화했다.
- 수량: 31장을 같은 단위인 기존 5쪽 갱신 + 신규 3쪽 생성의 구성 차트로 바꿨다. 25링크와 10보존파일은 별도 검사 항목으로 표시한다.
- 과정: 33장은 흩어진 아이콘 대신 읽기→질문→점검 흐름도, 37장은 직접 읽는 네 규칙으로 바꿨다.
- 유지: 19의 파일 관계, 역할 비교, 원문 인용, 사진 4장, A/B 참여 2회와 직접 쓰기는 각 장의 목적에 맞아 유지했다.

장마다 어떤 표현을 선택했는지는 [40장 시각 평가](./visual-audit.md), A/B의 직접 회의와 manager 판단은 [회의 기록](./MEETING.md)에 있다. 디자인 팀 전원은 교차검토와 독립 검수 뒤 편집을 종료했고 root가 마지막 줄바꿈·시각 원값·동작을 확인했다.

## 확인 결과

| 범위 | 결과 | 근거 |
| --- | --- | --- |
| 원고·대본 | 40장·자료6·참조45·대본/안내40장 제목·시간 일치, 인용 보존 | `source-check.json` |
| 실제 줄 | 1440px 화면에서 40장 글자의 Range를 행별로 관측, 최종 짧은 끝줄 후보0, 눈으로 문장/계층 확인 | `evidence/before-lines.json`, `after-lines.json`, `final-board-1~4.jpg` |
| 발표 화면 | 최신 revision40장, 잘림·진단·오류·이미지 실패0 | `evidence/slides.json` |
| 차트 | 원값5/3쪽, 합계8, 표시62.5/37.5%와 막대 실제 너비 일치 | `evidence/native-visuals.json` |
| 흐름도·데이터 | 3단계/같은 원본 표,1440/390px·원값 보존·Enter 접기/펼치기 | 같은 파일 |
| 참여·탐색 | A/B·공개/복귀/이어가기10클릭,overview40·presenter양방향 | `evidence/navigation.json` |
| 모바일 읽기 | 40장 원고 순서/누락0·18px·이미지 전체/alt·가로 넘침0 | 같은 파일 |
| 학습 자료 | 6개×1440/390 전문/순서 누락0·revision 일치·18px·JS0·가로 넘침0·키보드 탐색 | `evidence/documents.json` |
| 전체 사이트 | build:site·비수정 verify:site 성공·261/261 통과 | `evidence/tests.txt` |

숫자와 단위처럼 크기가 다른 글자의 baseline 차이는 줄 고립으로 세지 않았다. 후보0은 지정 화면의 관측 결과이며, 자동 넘침 검사 외에 실제 PNG를 함께 열어 문장의 의미 경계와 시각 구성을 판단했다. 초안에서 남은25·28의 줄 문제와31의 작은 원값은 마지막 source 교정으로 해결했다.

최종 원고 SHA-256: `7dbd19ffdf942f22af8bec54af10fac7835a06469360b99bdb783a2dca077c28`. 대표 화면은 [result-board.jpg](./evidence/result-board.jpg)에 있다. 차트·흐름도는 기존 native Markdown 설정을 사용한다. 공개 읽기 앵커에서 발견한 제목 가림을 위해 visual.css의 읽기 모드 native 슬라이드에 scroll-margin-top:92px 한 줄을 추가했다. 차트/발표 기하·폰트·JS·새 SVG 변경은 없다. 예전 연구 JSON의 우발적 갱신은 정확한 HEAD 원본으로 복원했고 과거 연구 diff0을 확인했다.

공개 검수는 commit/push 후 `DEPLOYMENT.md`에 기록한다.

## 공개 앵커에서 발견해 고친 제목 가림

첫 기능 배포 검수 뒤 공개 read#31을 직접 열어, 모바일 헤더가 제목 첫줄을 가리는 문제를 확인했다. article.top≈0/H1top31.9px/headerbottom70px/scrollMargin0이었다. 기존 blocks에는92px 이동 여백이 있으나 native visual에는 없어 생긴 차이다. 교정 전 화면은 `evidence/screens/public-native-anchor-390.png`에 보존했다.

root가 읽기 모드의 직접 native slide에만92px scroll-margin을 추가하고 전체 사이트/runtime 파생물을 다시 생성했다. 새31/33과 기존 visual-story5/7을1440/390 두 폭에서 실제 이동해 8경우 모두 article.top≈92px·제목이 헤더 아래에 있음을 확인했다. 새 모바일31은 제목top123.9px/headerbottom70px다. 원값 표/비중과 Enter 접기·펼치기도 다시 통과했다. 근거는 `evidence/anchors.json`·`native-visuals.json`과 `screens/anchor-*-390.png`다. 전체 build/비수정 verify와261/261을 변경 뒤 다시 실행해 통과했다.

기존 예제의 읽기 모드 전환은 화면 전체를 여는 동작이므로 회귀 도구는 실제 다음/이전 이동을 눌러 앵커 이동을 검사한다. 버튼 선택자도 template의 실제 previous/next를 사용한다. 이 검수 도구 교정과 공개 제목 가림 제품 수정은 구분한다.
