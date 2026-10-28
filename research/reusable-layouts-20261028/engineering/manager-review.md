# 재사용 배치 구현 — 매니저 독립 검수

2026-10-28 · 기준 `f1f76a9`. [WORK_LOG](../../../WORK_LOG.md)의 현재 구현 지침과 디자인의 다섯 인계 문서·신규 원고17장을 읽었다. 초기 직접 회의에서 입력·공통 planner·DOM·원문 보존 계약을 합의하고 디자인 writer 종료와 CSS 소유권 이양을 확인한 뒤 기존 엔지니어링 두 담당을 재개했다. 이전16장 원고와 이전 연구는 편집하지 않았다.

## 실제 분담과 직접 검토

A는 [parser](../../../scripts/markdown-document.cjs)·[공유 모델과 planner](../../../deck-model.js)·관련 검사를 구현했다. B는 [renderer](../../../blocks.js)·[인수 CSS](../../../blocks.css)·[작성 안내](../../../MARKDOWN-FIRST.md)·통합 검사와 [취합](synthesis.md)을 구현했다. root는 app/index·생성물·공유 브라우저·전체 회귀와 Git 전달을 소유한다. 팀은 default build와 공유 브라우저를 실행하지 않았다.

두 담당은 planner의 columns/rows/slots/copy와 primaryIndex 규칙을 직접 교환하고 상대 전체 소스·검사를 읽었다. 직접 model 입력의 대문자/공백 icon 이름이 검증은 통과하지만 renderer에서 사라질 수 있다는 반례를 shared normalizeIcon 소비로 보완했다. 매니저는 icons를 다른 구도에 쓰거나 group.icon을 non-bento에 쓰면 조용히 무시되는 반례를 전달했고, B는 원문 document와 원고 줄 경고로 명시했다.

새 icons/H2 수량 유연성과 기존 focus schema를 구분했다. focus 배열은 기존1~6과 좌표 검증을 유지한다. 새로운 자료 수·배열 수·고정12 preset의 미스매치는 내용 삭제나 빈 자료 강요 대신 renderer의 전문 fallback으로 처리한다. ordered wall은 현재 perimeter CSS가 번호를 숨길 수 있으므로 원래 ol/start를 가진 document와 경고로 처리하며 가이드에 명시한다. 목록 뒤 본문과 bento 앞 설명도 원래 순서를 보존하고 지원하기 어려운 형태는 전문으로 남긴다.

기존 `gpt-6.1-sol/high/초기 fork none` 요약 인계 설정을 재사용했다. root가 새 작업에서 공식 Sol 페이지와 실제 catalog를 확인한04:08~04:11 UTC 스냅샷을 적용했다. 디자인팀→엔지니어링팀 순차 실행과 파일별 단독 소유를 지켰으며 새 manager/runtime 파일을 추가하지 않았다.

## 독립 실행 근거

[재현 스크립트](evidence/manager-check.cjs)를 실행해 [결과 JSON](evidence/manager-check.json)을 보관했다. 실제 신규17장+기존16장과 다음 입력을 포함한 **25입력·54장**을 Node VM에서 확인했다.

- 원고 AST 불변, 전체 text 순서, 링크 관계, 이미지 src/alt/title, H1 한 번 생성, 원래 ol/start, 비상호작용 preview.
- balanced5/8/12와 seoul/recap12, preset 수량 불일치·bento 앞 안내의 원문 보존.
- builtin wall5/12/22,23개 초과, 꼬리 본문·ordered start, allcustom3의 이미지/라벨/링크 한 번 보존.
- portraits/strip 각각2/3/6개와 staggered6의 variant 연결.

별도로 balanced1~12에 primary 세 선택을 적용한36계획, wall1~22의22계획에서 양의 정수 좌표·범위·슬롯 개수·겹침 없음·balanced 전체 면 점유·중앙 copy 비침범을 확인했다. 기준 commit의 모델을 별도 VM으로 읽어 기존 bentoPreset 두 개·iconWallSlots 세 개·packMosaic 한 개의 기하가 동일함도 확인했다. 원래 app의20개 SVG map과 공유 model.iconPaths의 JSON 바이트/해시는 독립 대조에서 일치했다.

이 실행은 구조·의미·순수 기하 검수다. 실제2:5/4:3 픽셀 비율·사진 crop·대비·가독성·슬롯 미감·사용자 작성 비용을 증명하지 않는다. 실제 화면·수량 변경 dev·390px read·overview/presenter·legacy/native 영향과 디자인 독립 후검수는 root의 다음 통합 인수로 구분한다.

## 팀 검증과 최종 소유권

A 관련26개, B 관련25개 검사를 확인했고 B가 모델 기존 검사까지 포함한 대상95/95 통과를 보고했다. 매니저는 실제 코드와 신규 검사를 읽고 위 별도 probe를 실행했으며 제품 소유 파일 공백 검사도 통과했다. 전체 suite를 중복 실행하지 않았다.

| 소스 | 코드 freeze SHA256 |
| --- | --- |
| scripts/markdown-document.cjs |175d028ecd94dab6e026459124d8f26ff6ff00fbe70255e3b1225baf051e7bdc|
| deck-model.js |53f266e64e754e57bf06531df5e58a7333db9fb8c64a5f29d96bf69de4c428e2|
| blocks.js |6238a42a3298944a6d023cb81b3f73af9c6d3e038b1c8437c08b1fd307b5de32|
| blocks.css |b513e16205a1f900a16d0dcbc4ae44000d3e561428f0264b500138ba1463f5a9|

A와 B는 직접 최종 수신 확인 후 편집을 종료했다. 취합과 가이드를 매니저가 읽고 실제 소스·검증 범위와 대조했다. 코드 인수 시점의 필수 미해결 사항은 없으며 실제 시각 QA에서 새 결함이 나오면 소유권을 확인한 단독 writer가 좁게 교정한다. 제품 개선·공개 배포의 최종 완료는 root의 통합 결과를 따른다.

## 정량 대비 QA 뒤 한 줄 교정

root의 Stage wall22 실측에서 yellow SVG stroke/밝은 plate 대비가2.7975로 관찰됐다. PNG 미감 검수와 별개인 이 식별성 finding을 디자인 매니저에게 직접 알리고, B 편집 종료를 확인한 상태에서 root 허용으로 매니저가 CSS 단독 소유권을 인수했다. 기존 palette의 `.md-wall-icon` color-mix만70%에서65%로 바꿨다. custom 이미지 원색·plate·기하·본문을 수정하지 않았다.

65%를70%로 역치환한 CSS의 SHA가 B 최초 freeze `73f3bcb6…`와 정확히 같음을 assert했다. 위 표와 receipt는 교정 후 CSS이며 별도25입력/54장 의미·계획 probe를 다시 통과했다. 실제 Stage/Paper5색의 교정 후 대비와 PNG 갱신은 root 재실측 결과를 따른다. 이 한 줄을 대비 인증이나 전체 접근성 통과로 확대하지 않는다.
