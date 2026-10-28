# 디자인 복원 — 엔지니어링 검토 종합

2026-10-28 · 초기 취합 `/root/engineering_manager/performance_auditor` · 회의 반영 `/root/engineering_manager` · 기준 `cdb88b421d5a2fc018fe0269713e1ba16d4d8b20`

**두 매니저의 R1/R2 직접 반론·수정 합의를 반영한 미구현 선호 계약이다.** 디자인4문서와 두 실무자의 [parser/view 감사](parser-view-audit.md)·[작성/이행안](authoring-migration.md), [실제 probe](evidence/view-probe.json)를 대조했다. 새 parser/view·디자인 복원 결과를 구현하거나 검증했다는 뜻은 아니다.

## 원인과 확인된 작동 경계

기존 DevDay 참고 디자인이 삭제됐다기보다 **일반 Markdown의 의미 경로에 장 역할과 주역/자료 면적을 선택하는 연결이 없다.** 일반 원고는 모두 blocks이고 기존20양식은 명시 legacy 어댑터로만 접근한다. 70px 제목·230px 이미지 상한을 조정하는 기본 개선과 큰 선언/두값/결과요약의 표현 선택은 서로 다른 과제다.

| 확인한 근거 | 말할 수 있는 것 | 확대하면 안 되는 것 |
| --- | --- | --- |
| root [현재7장 관찰](../evidence/observations.json)·[비교 HTML](../comparison.html) | 같은1440×1000에서 기존4장/새3장의 역할·면적·footer 가시성 차이 | 주제가 달라 동일내용 A/B나 복원안 효과가 아님. 기존 큰 표지는 cover/130px이며 모든 제목130px 근거가 아님 |
| A의 현재 API12입력, 성공7/거절5 | stage-view는 literal. H1 앞이면 p가 먼저 생겨 heading/title 승격도 막음. 뒤에 놓아도 literal 본문 | 주석을 붙이거나 view 속성만 추가하면 새 역할이 지원된다는 주장 금지 |
| stage metadata/JSON·주입 view 검사 | 기존 stage는 legacy 필드로 변환, 혼합 일반 표는 오류. model은 unknown view를 통과시켜도 app 소비 없음 | 검증 통과와 기능 지원을 동일시하지 않음. 기존20양식 전체 삭제라는 해석도 아님 |
| A의 `/tmp` 두덱 build | literal이 content에 남고 index/read는 같은 content를 참조. source 불변·제품7파일 SHA 전후 일치 | CSS/브라우저·후보 view·시각 효과 검증이 아님 |

B는 A의 전체 초안·probe 코드/JSON을 읽고12건 수·7제품SHA 현행 일치를 독립 대조했다. B가 probe를 재실행하거나 default build·서버·브라우저를 조작한 것은 아니다. 현재210검사 통과는 이전 기능 기준이며 이번 디자인 충실도 게이트의 대체가 아니다.

## 권고: 내용 한 번과 presentation binding

1. **canonical AST 보존:** 현재 `heading?+blocks`를 포함한 논리 내용·inline·표/코드·링크/alt·source 위치를 한 번 유지한다. 새 힌트는 별도 control로 인식하고 원줄 위치를 보존한다. view는 노드 경로/그룹 참조만 가지며 제목·값·단위·출처를 다시 작성하지 않는다. 원고 URI와 발행 URL resolver도 구분하되 출력용 복사/resolver의 작은 경계로 다룬다. 별도 AST 플랫폼·전체 player/build 재작성은 선행하지 않는다.
2. **보수적 기본과 작은 선택:** 무주석 기본의 읽기 폭·자료 면적을 개선하고 선언1장/주역화면1장 정도만 message/evidence/media 가안으로 선택한다. read는 원노드 전체 흐름을 유지한다. 자동 표→chart·숫자→hero·목록→범주·내용 삭제/요약은 제외한다.
3. **기존 정밀 표현 유지:** legacy20양식은 별도 호환 경로다. 새 role을 기존 stage 분기로 보내 일반 AST를 subtitle/items 문자열로 평탄화하지 않는다. 새 view의 명시 schema·binding 적합성·renderer/preview/diagnostics 연결이 필요하다.
4. **범위를 제한한 CSS:** 공통 토큰·타이포·매체 자체 면은 재사용하되 새 blocks view에 한정한다. 기존 message/bento class·고정 preset을 blocks에 그대로 전용하지 않는다. 전역 제목/이미지·legacy bento·quiet 규칙을 일괄 변경하지 않는다. 프로젝트에서 복원 profile을 한 번 선택하고 미리보기로 검토하는 이행을 선호하며 기존 원고와 출력 기준을 보존한다. 구체 profile 이름/설정은 후속 사양이다.

## 세 역할 이후 남는 두 가지 작성 계약

| 후보 | 엔지니어링 선호안 | 반례·아직 미결정 |
| --- | --- | --- |
| 두 수치 | 명시 pair 선택, 대상/값/단위 순의 한3열표·정확2데이터행·바로 뒤 출처/범위1문단을 초기 shape로 선택. read는 원표/문단, 발표는 행을 두값 위계로 표현. header rich children/모든 셀·inline/출처·가상성격은 발표에서도 각각 한 번 실제 표시·접근 | 표시 view이므로 N/A·약값·선행0·복합단위를 원문대로 유지하고 Number/parseFloat·좋고나쁨 해석을 하지 않음. 빈 단위는 보존, 빈 값·여러 표·추가 설명의 모호 결합은 적합성 진단. 정확한 DOM/header 연결·locale 별칭·값 세부 허용/긴값 검증은 후속 사양 |
| C 편집 요약 | H2별 image/blockquote/문단 그룹과 대표 하나를 명시. 바로 뒤 H2에 결합하는 `stage-primary` 표식을 순번/제목 참조보다 선호. 첫H2 전은 공통 안내, 각H2부터 다음H2 전은 해당 그룹, 마지막 뒤 문단은 마지막 그룹 | 대표0/복수·빈 그룹은 오류. 대표는 원래 위치의 면적만 바꾸며 보이는 읽기/DOM/키보드/read 순서 유지. 마지막 문단을 공통출처로 추정하지 않음. 고정12칸·가짜 자료·자동삭제 금지. 정확한 그룹 수·매체 조합·grid/면적은 실제 시안 후 결정 |

선호 제어 표기는 장 시작의 `<!-- stage-view: message -->`이며 evidence/media와 선택 확장 pair/editorial을 구분한다. 대표 표기는 `<!-- stage-primary -->`를 선호한다. **미구현 계약으로 선택했으며 현재 지원 API는 아니다.** 두 후보는 표/본문과 JSON을 중복 작성하는 부담을 줄이는 방향이지 현재 C안의12슬롯/관계/구도를 복구했다는 증명이 아니다. 실제 자료·긴 글·대표/보조 관계의 시안이 남는다.

## 반대안과 합의한 문법·이행

반대하는 기본 동작은 모든 제목130px·모든 이미지 무제한 확대, 모든 MD의 legacy JSON 전환, 일반 구조에서 사실/역할 자동 추론, 본문을 read에만 남기는 발표 축약이다. H1-only 같은 단순 구조의 후보는 자동 적용할 수 없으며 신규 추천기/UI를 필수로 만들지 않는다. 자료가 작은 삽화인지 실증 UI인지 모르면 확대만으로 근거가 생기지 않는다.

R2에서 다음을 합의했다.

- 힌트는 frontmatter/장구분 뒤 첫 내용 앞의 단독 한 줄이다. 줄 위치와 첫 의미 H1 한 번 계약을 유지한다. code/인용의 예문을 제어 힌트로 읽지 않는다.
- 중복·잘못된 위치·legacy stage layout과 혼용·미지 키/enum/binding·editorial 밖 primary·구조 부적합은 source:line 오류와 마지막 정상본 유지다. explicit을 조용히 기본/다른 역할로 바꾸는 fallback은 없다. 넘침은 원문 유지·진단과 작성자 분할로 처리한다.
- message는 유효한 첫 H1이 주역, media는 이미지 주역이 하나로 특정돼야 하며 UI 기본은 contain이다. evidence는 넓은 자료이며 자동 split/chart를 뜻하지 않는다. H1/인용 중 주역을 자동 추론하지 않는다.
- 프로젝트 profile 한 번 선택과 미리보기로 이행한다. 무선택도 글폭/행간/자료 면적 개선을 얻되 역할 자동 분류는 없고 필요한1~2장에만 선택을 더한다. 모든 장 주석·기존 원고 자동수정·새 추천 UI는 필수가 아니다. 무선택 기본과 선택 개선의 효과는 별도로 검증한다.
- 정확한 DOM/header 연결·locale/값의 모든 예외·그룹 수/복합 매체·font/grid/면적은 시안에서 결정한다. 노트/공개 role·본문 재작성은 이 스타일 이행과 별개다.

후속 구현 순서는 ① 제어 힌트 분리·엄격 schema·AST binding, ② 한 번 선택하는 복원 profile과 기본/세 역할, ③ pair/editorial 선택 그룹 연결, ④ 같은 원고의 시각·의미 검증이다. 각 단계도 인수 조건으로 대조하며 **세 역할만 구현했을 때 C/두 수치까지 복원 완료라고 하지 않는다.**

## 후속 승인 시 인수 게이트

같은 원고·자산·viewport로 현재/기본 개선/선택2장 버전을 나란히 렌더한다. 디자인의7장 편집안은 내용까지 다른 별도 비교로 둔다. 1440×1000에서 주장의 우선성·자료 세부 가독성·두값 위계·C 대표/보조 관계·전체보기 리듬과 잘림/겹침을 확인한다.

AST/DOM 대응으로 제목1회·본문/inline·원표 header/값/단위·raw code/언어·링크/alt·출처/가상성격의 누락/중복0과 순서를 확인한다. pair에서 일반 표와 확대값을 중복 읽게 하지 않으며 read는 원표 전체를 유지한다. 긴 한글/큰값/복합단위/결측/모호 출처/복수대표·이미지 실패를 반례로 둔다.

pair는 원행을 두 값 배치로 바꾸는 표현 변화만 허용하며 원표 header·셀 원문·inline·출처를 read에만 남기지 않는다. 발표에서도 실제 텍스트로 각각 한 번 읽히고 접근되어야 하며 aria-label만으로 원문 보존을 통과시키지 않는다. 정확한 DOM/표 header 연결은 후속 설계·검증 항목이다.

390px read는 native 본문·가로 넘침0·표/코드 국소 스크롤·링크/원문 순서를 확인한다. source:line·invalid시 이전 성공본·build/reload·asset resolver·overview/presenter·reduced motion과 기존 quiet/표지 metadata/editorial/metric-pair/native visual을 회귀 게이트로 둔다. 이번 문서·probe로 이 시각/회귀 검증이 통과했다고 표시하지 않는다.

## 직접 교차 검토와 범위

A/B는 실질 초안을 먼저 작성한 뒤 서로 전체 문서·실행 근거를 읽었다. A는 literal/H1 승격 방해와 view 주입 무소비를 전달했고 B는 최소 node binding·URI resolver·raw표시/연산 분리·대표 순번 삽입 반례를 전달했다. A가 pair의 rich inline을 문자열로 빼면 의미가 사라진다고 반론해 B가 원셀 children 참조 또는 명시 text-only 진단을 보강했다. 양쪽 모두 세 역할만으로 C/두값 완료를 주장하지 않으며, 최소 기존 heading+blocks 재사용·구문 미확정에 동의했다.

R1에서 디자인 매니저는 blocks 고정·면적/리듬·역할 연결의 부재를 제안했고 엔지니어링은 실제 literal/H1/title 반례, legacy class/preset의 구조 가정, URI resolver 범위를 반론했다. 현재 heading+blocks 재사용·새 view의 blocks 격리·출력복사/resolver 최소 경계로 수정 합의했다. R2에서 엔지니어링의 작은 힌트/invalid·pair/C·이행안을 디자인 매니저가 header rich children·빈단위·H2 앞뒤 범위·profile 비용으로 보강했고, 양쪽이 수정·최종 수신을 직접 확인했다.

제품·원고·생성물·기존 연구·서버·브라우저·Git은 변경하지 않았다. B의 초기 편집 범위는 authoring-migration.md와 이 synthesis.md, A는 parser-view-audit.md와 최소 probe script/JSON이다. root만 WORK_LOG·통합 회의/결과를 갱신한다. 회의 후 이 취합은 실무자의 편집 종료·소유권 인계 뒤 엔지니어링 매니저가 갱신했다.

A/B 두 명의 completed와 편집 종료를 직접 확인했다. 두 매니저의 R1/R2 합의는 설계 계약이며 실제 parser/view/시각 복원 구현·제품 회귀 통과를 주장하지 않는다. 추가 연구·구현 없이 최종 검수 후 인계한다.
