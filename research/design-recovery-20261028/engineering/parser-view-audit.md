# 일반 Markdown AST와 발표 view 연결 감사

2026-10-28 · `/root/engineering_manager/migration_designer` · 기준 `cdb88b421d5a2fc018fe0269713e1ba16d4d8b20`

## 판단

**현재 일반 Markdown은 의미 AST를 보존하지만, 같은 AST에서 발표 역할을 선택하는 API가 없다.** 모든 일반 장은 blocks 경로로 출력되고 기존 stage 설정은 다른 legacy 어댑터로 넘어간다. 따라서 70px 제목·230px 이미지 상한의 일괄 수치 조정만으로 큰 선언·열린 자료·주역 화면·두 수치·편집 요약을 선택하는 연결이 생기지는 않는다. 공통 기본 타이포 개선과 역할별 면적/관계 선택은 별개로 설계해야 한다.

회의용 `message/evidence/media` 3role과 `stage-view` 표기는 **미지원 제안**이다. 세 역할만으로 C안의 자료 관계나 두 값 위계까지 복원됐다고 판단하지 않는다. canonical AST의 문구·순서·표·code·참조는 한 번 보관하고 presentation view가 노드 참조만 선택하는 최소 연결을 권한다. 일반 표→차트, 숫자→hero, 목록→범주 추론과 원문 삭제/요약은 대안에서 제외한다.

## 소스에서 확인한 현재 경계

| 경로 | 현재 동작 | 복원에 필요한 경계 |
| --- | --- | --- |
| [parser 설정/metadata](../../../scripts/markdown-document.cjs#L9) | html:false. frontmatter는 id/title/theme/speaker/date/footer만 허용. notes/appendix/role/sourceDownload 구조키는 초기 미지원 | 발표 view와 공개/비공개 역할을 섞지 말아야 함. 새 선택 문법은 별도 합의·검증 필요 |
| [stage 분기](../../../scripts/markdown-document.cjs#L82) | 정확한 stage metadata 또는 stage JSON이면 legacy.parseMarkdown으로 변환, 한 장 여부/미지원키 검사 | 새 작은 view 선택을 이 분기로 보내면 일반 AST를 유지하는 계약이 아님 |
| [의미 노드/첫 H1](../../../scripts/markdown-document.cjs#L98) | inline·table/list/code 노드와 전체 source line 유지. 첫 노드가 H1일 때만 heading으로 한 번 소비하고 title plain label 파생 | directive는 의미 블록이 아니게 분리하되 원래 줄 위치를 보존해야 함. 앞 문단 뒤 H1을 제목으로 끌어올리지 않음 |
| [참조 순회](../../../scripts/markdown-document.cjs#L160) | heading/blocks의 attrs href/src와 legacy 미디어를 owner/key/position 참조로 반환 | view에서 문자열을 재작성하거나 복제하지 말고 같은 노드/원고 URI에 연결 |
| [model blocks](../../../deck-model.js#L143)·[장 검증](../../../deck-model.js#L282) | 허용 semantic tag/속성/위치를 검증, heading은 H1. 일반 unknown 장 키를 전부 거절하지는 않음 | property만 추가해 검증 통과해도 지원 API가 아님. view enum/입력 shape/binding을 명시 검증해야 함 |
| [app blocks 렌더](../../../app.js#L427) | heading을 한 번 렌더하고 뒤에 한 markdown-body를 붙임. 다른 20양식 분기는 별도 유지 | 기본/선택 presentation 경로와 read의 기본 흐름을 같은 노드에 연결할 경계 필요 |
| [StageBlocks](../../../blocks.js#L17) | 노드별 semantic DOM, source line dataset, 이미지 진단, 표/code 국소 스크롤. preview 링크는 비활성 | 선택 배치에서도 원문 DOM 순서·진단·source 위치·preview 특성을 보존해야 함 |
| [blocks CSS](../../../blocks.css#L2) | 발표 제목70px·본문30px·이미지230px 상한, read 제목/본문/이미지 제한은 별도 | CSS 수치 일부 개선은 가능하나 역할 결정·그룹 관계는 해당 규칙만으로 표현되지 않음 |

기존 20양식·스타일이 삭제됐다는 근거는 없다. stage 어댑터를 쓰면 기존 statement/metric-pair/bento 등으로 갈 수 있으나 일반 표·코드·rich inline·중첩 목록을 같은 canonical AST로 재사용하는 경로와 다르다. 제품 스타일이나 모든 장을 새로 만드는 전면 재작성은 최소 해법이 아니다.

## 실제 `/tmp` 재현

[view-probe.cjs](evidence/view-probe.cjs)를 Node v24.22.1로 실행했다. 입력·파생 deck·작은 두덱 build는 `/tmp/stage-view-audit-jnHhFK`에만 기록했다. 실제 저장소는 parser/model/runtime/template의 읽기 전용 제공자다. [view-probe.json](evidence/view-probe.json)에 원고12개·전체 AST/오류·source 위치·참조·생성 deck·제품7파일 SHA를 보존했다.

```sh
node research/design-recovery-20261028/engineering/evidence/view-probe.cjs \
  /absolute/repo/path /absolute/path/to/result.json
```

| 입력/검사 | 실제 결과 | 해석 |
| --- | --- | --- |
| 힌트 없는 H1+문단+이미지+링크 | blocks, heading H1, title 파생. 본문3개 p, refs의 원고 line 유지 | 현재 canonical 의미 경로 |
| 동일 원고 H1 앞 `<!-- stage-view: message -->` | model 오류0이지만 첫 노드는 literal p, H1은 본문 두 번째 노드. slide heading/title 없음·deck.title은 ‘발표 자료’ fallback | **미지원 힌트가 제목 승격까지 막음.** 주석만 붙여 역할이 바뀐다고 안내하면 실제 원고가 달라짐 |
| H1 뒤 같은 힌트 | heading은 유지하나 본문 literal p가 추가됨 | 위치를 바꿔도 지원 view로 해석되지 않음 |
| `<!-- stage`의 layout:statement/align:center | statement/title/subtitle 필드가 됨. blocks/heading 없음 | 기존 명시 layout 지원. 동일 AST에 presentation만 선택한 결과 아님 |
| 같은 legacy statement에 일반 표 혼합 | 목록/표/인용 미지원 오류 | 일반 AST를 legacy 필드에 강제로 전달하는 이행안의 반례 |
| stage metadata의 view 키 | 표시하지 않는 필드 오류 | view 키 추가는 현재 지원 안 됨 |
| frontmatter view/role, stage notes | 각각 위치 포함 오류 | 새 view 구문과 notes/공개 역할 지원을 혼동하지 않음 |
| 일반 H2 두 그룹, 대상/값/단위의2행 표 | 모두 blocks. H2/표/p 그대로 보존 | 그룹/값 선택 정보나 hero/metric-pair 배치가 생기지 않음 |
| code 안 단독 `---` | 한 장, code raw text와 줄바꿈 유지 | view 도입 후 유지할 기존 계약 |
| JS로 slide.view=message를 직접 주입 | model 오류0, app에 slide.view 소비 없음 | unknown 키 통과는 작동하는 API의 증거 아님 |

12입력은 parse 성공7/거절5였다. 별도로 힌트 없는 원고/힌트 앞 원고를 같은 assets로 두덱 build했다. generated content에도 힌트 literal이 남았고, 두 덱의 index/read는 각각 같은 content.js를 참조하며 body data-view=present/read만 달랐다. 이 data-view는 **발표/읽기 모드**이고 회의용 message/evidence/media 선택 필드가 아니다. source 원고 불변·참조 자산 복사·모델 검증을 확인했고 제품7파일 SHA는 전후 일치했다.

이번 실행은 실제 parse/model/isolated build와 데이터/경로 검사다. 서버·브라우저·CSS 렌더·폰트/면적·동일원고 시각 A/B·210개 전체 테스트는 실행하지 않았다. root의 현재 캡처·디자인팀의 관찰은 별도 근거이며 본 probe가 후보 view의 효과를 보인 것은 아니다.

## 최소 연결 제안 — canonical AST 한 번, presentation binding 별도

다음 이름/구문은 제안이며 구현하지 않았다.

1. **선택 directive를 내용과 분리한다.** 합의된 view 표기만 별도로 해석하고 semantic Markdown에 literal p로 넣지 않는다. 제거로 줄번호가 당겨지지 않게 원문 offset/빈 줄 치환 등 위치 연결을 유지한다. code·인용·주석 안 예시를 지시문으로 오해하지 않고 중복/오타/잘못된 위치는 source:line 진단한다. 무주석 기존 원고의 의미를 바꾸지 않는다.
2. **canonical 내용은 그대로 둔다.** 현재 `heading? + blocks`의 논리 순서를 유지하고 view는 그 노드 경로/범위에 binding한다. 예를 들어 message는 유효한 첫 heading을 주역으로 선택하지만 문단·출처·가상 안내를 숨기거나 read에만 이동하지 않는다. view config에 제목·수치·alt·본문 문자열을 다시 입력하지 않는다. source revision에 대응하는 node path는 영구 장 ID와 구분한다.
3. **검증된 presentation plan만 파생한다.** model은 view enum·조건·노드 참조·중복/누락을 검증한다. renderer는 원문 순서대로 같은 노드가 정확히 한 번 표시되게 wrapper/배치를 바꾼다. 부적합한 explicit 선택은 위치 진단하고 마지막 정상본을 유지하며, 자동 요약·누락·조용한 다른 역할 적용을 피한다. read는 같은 canonical 노드의 일반 흐름이다.
4. **일반 AST와 정밀 legacy 어댑터는 분리한다.** 기존20양식은 명시 구조화 원고의 별도 호환 경로로 유지한다. blocks를 subtitle/items 문자열로 평탄화하거나 강제로 legacy 양식에 넣지 않는다. 공통 색/글꼴/타이포·검증·preview helper는 재사용할 수 있으나 자동 20양식 변환을 전제하지 않는다.
5. **원고 URI와 발행 URL을 구분한다.** 현 builder는 collectReferences의 owner/key를 발행 URL로 변경하지만 MD를 쓰지는 않는다. 앞으로 canonical AST의 원고 URI까지 불변으로 둘 경우, 출력용 resolver 또는 파생 출력 AST에서만 URL을 바꾼다. view binding과 read가 같은 참조·alt/source 위치를 공유해야 한다. 이것은 현재 URI 재계산이 데이터 손상이라는 뜻이 아니라 새 canonical 불변 계약의 경계다.

기본 장을 유지하면서 message/evidence/media를 작은 선택으로 시작할 수 있지만, 장의 본문 구조가 그 역할을 수용하는지 명시해야 한다. H1과 인용이 함께 있으면 주역이 어느 쪽인지 추론하지 않는다. 230px 상한 해제만으로 이미지가 실증 자료가 되는 것도 아니다. 긴 본문은 원고 위치와 넘침 이유를 알려 작성자가 나누며 발표 내용 자체를 자동 축약하지 않는다.

## 두 값·C안의 추가 연결과 반대안

**두 값:** 명시 선택된 정확한 표 shape에 노드 참조를 걸고 대상/값/단위를 원문 표시문자열로 유지하는 후보가 적절하다. 숫자로 변환해 계산/반올림/단위 추정하지 않는다. 셀의 강조·링크 등 rich inline은 원셀 children 참조로 보존하고 plain 검사값만 파생한다. 초기 shape를 text-only 셀로 제한하는 대안이라면 복합 inline을 평탄화하지 말고 위치 진단해야 한다. 표 뒤 어느 문단이 범위·출처인지 binding 경계를 명시하고 추가 표/문단·결측·긴 값이 모호하면 진단한다. read는 원표와 원문 순서 그대로다. 일반 표를 자동 metric-pair로 바꾸지 않는다.

**C안:** H2별 기존 노드 범위와 작성자가 고른 대표 그룹을 참조하는 후보가 있다. 대표 선택 때문에 DOM/read 순서를 바꾸거나 첫 이미지/특정 파일명을 대표로 추론하지 않는다. 원매체 면과 불균등 면적을 살리는 시안이 필요하며 H2 그룹을 얻었다는 사실만으로 C안의 결과물 관계/12슬롯/공간 배치를 복구했다고 볼 수 없다. 그룹 수/텍스트/이미지의 지원 조건은 후속 결정이다.

| 대안 | 판단 |
| --- | --- |
| 제목/이미지 CSS 수치만 일괄 변경 | 기본 표현 일부는 개선 가능. 역할/주역/그룹 선택 결여는 해결 못함 |
| 일반 원고를 전부 기존 stage JSON/layout으로 이행 | 정밀 양식은 재사용되지만 일반 AST 의미 손실·원고 중복 부담이 커 기본 해법으로 반대 |
| 표·숫자·목록 구조를 보고 역할 자동 결정 | 사실·의미를 추론하므로 기본 silent 동작으로 반대 |
| 본문은 읽기에만 남기고 발표는 자동 요약 | 같은 원고 계약과 가상/출처 안내를 바꾸므로 반대 |
| canonical AST+명시 view+선택 그룹 binding | 권고. 가장 작은 역할 선택부터 검증하고 C/두값의 추가 shape는 별도 명시 |

## 교차 검토·미결정·후속 검증

상대 `/root/engineering_manager/performance_auditor`와 canonical AST/원고 URI의 불변 경계, view의 node binding, 두 값 표시문자열, H2 그룹과 대표 선택을 직접 교환했다. 이 담당은 실제 literal/첫 H1 방해·legacy 분기/거절·동일content의 read/present 근거를 전달했다. 상대 authoring-migration 실질 초안을 전체 읽고 두 값의 한 표/문단 shape와 대표 그룹 앞 marker가 순번 참조보다 이동에 안전하다는 대안에 동의했다. 정확한 구문은 채택 확정하지 않았다. 이 담당은 raw 표시문자열 추출이 셀의 rich inline을 지울 수 있다는 반례를 제기했고, 상대가 이를 수용해 원셀 children 참조/검사 plain 파생값만 사용하거나 명시 text-only 조건에서 복합 inline을 진단하도록 보강했다. 상대도 본 감사 전체와 probe 코드/JSON12건·두 build·제품7SHA를 실제 대조했고 필수 정정 없음에 합의했다.

회의에서 확정할 것은 구문과 위치/우선순위, 무주석 기본값과 자동 제안 범위, 세 role의 입력 조건, 수치표/출처 결합, 대표 그룹 선택과 DOM순서/시각순서의 양립, invalid시 진단/마이그레이션이다. 명칭을 먼저 정하는 것보다 같은 원고를 바꾸지 않고 출력이 선택되는 계약을 먼저 합의해야 한다.

후속 승인 시 같은 원고·자산·viewport의 before/after를 실제 렌더하고 heading1회·본문/가상 안내/순서·표값/code/링크/alt·source:line·asset resolver·overview/presenter/read·390px·넘침을 검증한다. 이번은 감사와 미구현 제안이며 제품/원고/생성물·기존 연구·WORK_LOG·서버·브라우저·Git은 변경하지 않았다. 이 담당의 소유는 본 문서와 probe script/JSON뿐이다.
