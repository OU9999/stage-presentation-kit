# 디자인 복원 — 엔지니어링 매니저 검수

2026-10-28 · `/root/engineering_manager` · 기준 `cdb88b421d5a2fc018fe0269713e1ba16d4d8b20`

**감사·현재 동작 재현·디자인 매니저와 R1/R2 직접 회의를 완료했다.** 새 Markdown이 의미를 보존하는 것과 기존 DevDay 참고 디자인의 역할·면적·리듬을 이어 주는 것은 다른 완료 조건이다. 현재 일반 작성 경로에는 후자의 연결이 빠졌다. 기존 스타일 파일의 보존이나 210개 기능 통과를 디자인 복원 성공으로 설명할 수 없다.

## 매니저 독립 확인

- 디자인4문서와 엔지니어링 [parser/view 감사](parser-view-audit.md)·[작성/이행안](authoring-migration.md)·[취합](synthesis.md), parser/model/app/blocks·builder 경계를 직접 읽었다. 기존 20양식과 일반 AST의 분기, blocks의 단일 세로 흐름·70px 제목·230px 이미지 상한을 확인했다.
- root의 [관찰 JSON](../evidence/observations.json)·[코드 기준](../evidence/code-baseline.json)을 읽고, [기존 C 화면](../evidence/old-editorial.png)과 [새 첫 장](../evidence/new-opening.png)을 `view_image`로 직접 열었다. 서로 다른 내용이므로 통제 A/B나 후보 디자인 효과로 해석하지 않았다. 보존색/파일이 남았다는 사실만으로 새 경로가 디자인을 계승했다고 할 수 없다.
- [probe script](evidence/view-probe.cjs)와 [원시 JSON](evidence/view-probe.json)을 읽고 실제 `/tmp/stage-view-audit-jnHhFK`의 원고12개·성공 deck JSON7개·두 덱 content SHA·제품7파일 SHA를 독립 대조했다. 입력/출력 경로는 원시 JSON에 있다. 새 구현·default build·서버·브라우저·전체210검사를 실행하지 않았다.

12입력은 성공7/거절5였다. `stage-view`는 현재 literal이며 H1 앞에 두면 첫 p가 되어 heading 승격을 막고 덱 제목도 기본값으로 바뀐다. 뒤에 둬도 literal 본문이다. 기존 stage metadata는 legacy 필드로 전환하며 일반 표 혼합을 거절한다. JS의 미지 `slide.view`가 모델을 통과해도 app이 소비하지 않으므로 기능 API가 아니다. 두 격리 덱의 발표/read는 같은 content를 읽는다. 이 실행은 현재 parser/model/build와 데이터 검증이며 후보 view의 브라우저·CSS·시각 효과 검증이 아니다.

## 실제 회의의 반론과 수정

**R1:** 디자인 매니저는 styles 삭제보다 blocks 고정과 역할·자료 면적의 연결 부재를 원인으로 제시했다. 엔지니어링은 literal/H1/title 재현과 legacy class/preset의 구조 가정으로 반론했다. 현재 heading+blocks를 한 번 보존하고 view는 노드 참조만 추가하되, 새 view는 blocks 경계에 격리하는 안으로 합의했다. URI 보존도 출력용 복사/resolver의 작은 경계로 제한한다. 별도 AST 플랫폼·전체 player/build 재작성·legacy JSON 강제·모든 제목/이미지 일괄 확대는 선행 해법에서 제외했다.

**R2:** 엔지니어링이 작은 hint/invalid·pair/C·이행안을 제안했고 디자인 매니저가 header/rich children·빈 단위·H2 앞뒤 범위·profile 비용을 보강했다. 상호 수정·수신 확인 후 다음 미구현 선호 계약을 닫았다.

- 힌트는 frontmatter/장구분 뒤 첫 내용 앞 단독 한 줄이다. 내용/원고 줄 위치와 분리하고 code/인용 속 예문은 제어 문법이 아니다. 미지 enum/키/binding·중복·잘못된 위치·legacy 혼용·부적합 explicit은 source:line 오류와 이전 정상본 유지다. silent fallback·내용 삭제/요약은 없다.
- pair는 한3열표·정확2행·바로 뒤 출처/범위1문단이다. 행을 두값 배치로 표현하는 변화만 허용하며 header rich children·모든 셀 원문/inline·출처/가상성격은 발표에도 각1회 실제 표시·접근한다. read/aria만 보존하거나 원표+큰값 중복은 실패다. N/A·약값·선행0은 원문 표시만 하고 연산/평가하지 않는다. 빈 단위는 보존, 빈 값은 진단한다.
- editorial은 H2별 관련 자료와 바로 앞 대표 marker1개를 선호한다. 첫H2 전은 공통 안내, 각H2~다음H2는 해당 그룹, 마지막 뒤 문단은 마지막 그룹으로 둔다. 공통출처를 추정하지 않는다. 대표는 원래 위치의 면적만 달라지며 보이는 읽기·DOM·키보드·read 순서를 유지한다. 대표0/복수·빈 그룹은 오류, 고정12칸/가짜 자료는 요구하지 않는다.
- 프로젝트의 복원 profile을 한 번 선택하고 미리보기로 이행한다. 무선택 기본도 글폭·행간·자료 면적 개선을 얻되 역할 자동 추론은 없고 필요한1~2장만 선택한다. 기존 원고 자동수정·모든 장 주석·새 추천 UI는 필수가 아니다.

후속 순서는 제어 힌트/schema/binding → 복원 profile과 기본/세 역할 → pair/editorial 그룹 → 같은 원고의 시각·의미 검증이다. **세 역할만으로 C/두 수치까지 복원 완료라고 하지 않는다.** 정확한 DOM/header 연결·locale/값의 모든 예외·그룹 수/복합 매체·font/grid/면적은 실제 시안에서 정한다. 원문/읽기 보존과 390px·overview/presenter·기존 quiet/표지 metadata/editorial/pair/native visual의 회귀도 인수 조건이다. 새 노트/공개 role·source patch를 이 스타일 작업에 포함하지 않는다.

## 소유권과 검증 범위

기존 완료 실무자 두 명을 canonical follow-up으로 재개했다. A는 parser 감사와 실제 probe, B는 작성/이행안과 초기 취합을 각각 먼저 작성했다. 서로 전체 초안·script/JSON을 읽고 literal/첫H1·legacy 차이·URI resolver·대표 순번의 삽입 위험을 직접 교환했다. A가 rich 표셀을 문자열로 추출하면 의미가 사라지는 반례를 제기했고 B가 원셀 children과 header까지의 보존 조건을 반영했다. 두 명의 completed·편집 종료 뒤 매니저가 synthesis의 회의 반영을 인수했다. 동시 writer는 없다.

모델은 총괄이 2026-10-28 00:48~00:50 UTC 공식 최신 Sol과 현재 catalog를 확인한 동일 작업 스냅샷을 대조해 재사용했다. 기존 `gpt-6.1-sol/high/초기 fork_turns=none`과 일반 기술 판단·요약 인계를 유지했고 총괄 포함4슬롯을 지켰다.

변경은 engineering의 4문서와 probe script/JSON뿐이다. 제품·원고·생성 발표·기존 연구·root evidence·WORK_LOG·공유 브라우저·서버·Git을 변경하지 않았다. 실제 시각 복원·마이그레이션·새 문법/렌더러·제품 회귀는 후속 구현이며 이번 완료는 감사·재현·합의 계약이다. 단일 로그와 통합 회의/결과는 root 소유다.

최종 4문서의 실제 Markdown 링크36개 누락0·후행 공백/불필요한 끝줄0, JSON 파싱·제품7파일 SHA 일치·`git diff --check`를 확인했다. 코드 fence의 가상 입력 경로는 실제 문서 링크와 구분했다. 현재 HEAD는 기준과 같고 tracked 변경은 root의 WORK_LOG뿐이다. root의 RESULT/MEETING도 읽어 기술 사실·합의·미구현 경계가 일치함을 확인했다. 두 실무자와 매니저 모두 편집을 종료한다.
