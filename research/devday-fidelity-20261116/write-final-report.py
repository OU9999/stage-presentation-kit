from pathlib import Path
import json,sys
b=Path(__file__).resolve().parent
name=sys.argv[1]
assert name=='main-04'
r=b/name
rejection=b/'failure-audit'/'USER_REJECTION.json'
if rejection.exists() and json.loads(rejection.read_text()).get('status')=='needs-changes':
    raise SystemExit('Current user rejection supersedes historical internal approval; refusing to publish approved result.')
approval=json.loads((r/'approval-cli.json').read_text())
assert len(approval)==8 and all(x['exit']==0 for x in approval)
proof=json.loads((r/'integration-verification.json').read_text())
assert len(proof['scopes'])==4 and all(x['approval']['passed'] for x in proof['scopes'])
rows=[]
for scope,label,size in [('present-1920','발표','1920×1080'),('present-1280','발표','1280×720'),('read-1440','읽기','1440×1000'),('read-390','읽기','390×844')]:
 q=json.loads((r/scope/'qa.json').read_text());assert q['status']=='pass' and q['visualApproval']==False
 rows.append(f'| {label} | {size} / DPR1 | 20 | 승인 검사 통과 | {q["summary"]["checks"]}항, invalid0/regression0 |')
text='''# DevDay 미감 복원 · 최종 결과

검증팀을 제작팀과 분리해 재구성하고, 실제 반려·교정을 거쳐 본편20장과 공개 해설에 반영했습니다. 현재 main-04의 발표 두 폭·읽기 두 폭 총80명시범위가 실제 `--require-approved` 검사를 통과했습니다. 내부 시각 판정과 사용자 미감 승인은 구별합니다.

[원본·이전본·현재안 비교](index.html) · [본편 열기](../../presentations/llm-wiki/index.html) · [읽기 화면](../../presentations/llm-wiki/read.html)

## 바뀐 결과

- 선택 이유는 회색 예문판에서 정확 인용과 선택 강조를 중심으로 편집했습니다. ‘만들고 싶어서’의 서술 호흡을 발표·모바일에서 보존합니다.
- 같은 질문의 비교는 공통 원자료/답을 묶고, 남아 다시 읽는 계획 문서가 차이를 보여주게 했습니다.
- 같은 계획의 처음/갱신 제목과 조건을 대응시켰습니다. 뒤 관계도의 현재 제목도 실제 갱신 상태와 맞췄고 세 무방향 관계를 보존했습니다.
- 활동안은 완전한 문서 정체성과 지금 읽을 한 행, 선택의 근거는 자료 정체성·선택 위치와 큰 정확 목적 구절로 구성했습니다.
- 공개 해설의 실제 강조기호 노출·구현 어휘·불필요한 편집 설명을 정리했습니다. 정확 원문·입문자/준비된 팩/별도15분·자작 예시 지위와 원문 경로는 남겼습니다.

14장의 세 동사는 앞의 구체 사례를 요약하는 역할이 확인돼 유지했습니다. 유효한 단문·동등 범주·자료면을 사진/색/장수 할당량 때문에 바꾸지 않았습니다.

## 검증팀과 실제 반복

독립 검증 manager는 아트디렉션 A와 읽기·의미/도구·근거 취합 B를 관리했습니다. 별도 제작 manager는 시각 편집 A와 원고·공개자료/QA 엔지니어링 B를 관리했습니다. root·manager·두 실무의 실제4슬롯 안에서 팀을 순차 실행했고, 제작자가 자기 시안을 승인하지 않았습니다.

[검증팀 준비](review/READY.md) · [원본 대조 수용 기준](review/acceptance-final.md) · [디자인 지침](../../DESIGN.md)

첫 시안의 비교 절차 중복·근거의 병행독서를 반려해 구조를 고쳤습니다. 본편에서는6→7 현재 계획의 시점 모순,390의 고립된 서술어,지원15의 literal 강조기호를 다시 반려했습니다. 기술 검사가 통과한 당시에도 실제 승인 검사는 실패했습니다.

[1차 시안 반려](review/round-01/manager-summary.md) · [2차 시안 교정](review/round-02/manager-summary.md) · [본편 main02 반려](review/main-02/manager-summary.md) · [실제 승인 검사 실패](main-02/approval-cli.json)

main03에서는 발표40·읽기40 개별과 지원절을 실제 독립 실독해 세 반려 해소를 확인했습니다. 실제 승인 뒤 마지막 해설 한 구절 삭제 권고도 수용했습니다. main04는 새80캡처 중78의 정확 동일 바이트와103불변입력을 확인해 기존 판단을 재사용하고, 다른 읽기2래스터와 달라진 현재 지원절/표를 직접 재확인했습니다. 새80개별 전부를 다시 봤다고 기록하지 않습니다. 두 래스터 차이의 원인은 확정하지 않았고 현재 실물 판정을 구별했습니다.

[main03 독립 전체 검수](review/main-03/manager-summary.md) · [main04 현재 재검수](review/main-04/manager-summary.md) · [실제 재사용 범위](main-04/reuse-observations.json) · [마지막 구절 편집](FINAL_COPY_EDIT.json)

## 현재 승인과 기술 확인

| 모드 | viewport | 장 | 현재 수동 판정/CLI | 기술 회귀 |
| --- | --- | ---: | --- | --- |
__ROWS__

[실제 승인 CLI](main-04/approval-cli.json) · [원문과 현재 근거 연결](main-04/review-checks.json) · [최종 통합 검증](main-04/integration-verification.json)

전체365테스트(실패/취소/생략0)·사이트 build/verify·diff 검사와 현재104입력의 네 범위 대응을 확인했습니다. 실제지원14클릭,4표 양끝/키보드 이동,요청 전문 선택2폭,20장 키보드/Home·End/전체보기를 확인했습니다. 원본 자산81개와 demo/archive/memo26개·과거 반려 기록은 보존했습니다. 이 기술 결과는 `visualApproval:false`이며 수동 시각 판정 대신 사용하지 않았습니다.

[기술 실행](main-04/technical/checks.json) · [실제 동작](main-04/technical/actions.json) · [추가 표 관측](main-04/technical/support-tables-extra.json) · [실제 관측의 교정 전3실패→현재3통과](main-04/known-observation-regressions.json)

현재 원고 SHA는 `1245269027b87f6e3fe18bff9507ef3ea2d5ff64f9747cc6b27a56f40415f6ec`, DESIGN SHA는 `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`입니다. 공개 해설·자산·runtime·스타일을 포함한 정본은 [동결104입력](main-04/source-snapshot.json)입니다.

## 공식 자료와 재사용 구조

공식 [OpenAI DevDay 키노트](https://www.youtube.com/watch?v=Fls_onRviPM)와 [Codex 발표](https://www.youtube.com/watch?v=XkKdbPhIvbY)의 같은 역할 화면을 대조했습니다. 실제 seek 시점·캡처·무효 첫 시도·관측 한계는 [원본 증거 안내](evidence/README.md)에 있습니다. 전편/연속 시청·공식 글꼴/정확 색 추출·실제 발표기기/다른OS/모션/사용자 미감은 이번 로컬 검증으로 보증하지 않습니다.

2026-11-16에 [reveal.js6.0.2](https://github.com/hakimel/reveal.js/releases/tag/6.0.2),[Slidev v53.1.0](https://github.com/slidevjs/slidev/releases/tag/v53.1.0),[Marp CLI v4.5.1](https://github.com/marp-team/marp-cli/releases/tag/v4.5.1)의 공식 release·문법·라이선스·역할별 구도를 확인했습니다. [적용/비적용 판단](review/tooling-initial.md)에 현재 구조와의 대응을 남겼습니다.

현재 엔진에는 명시한 `compose: split` + `variant: evidence`에서 이미지와 정확 인용을 원순서로 묶는 작은 재사용 경로를 확장했습니다. 일반 split/auto·AST·읽기·sourceLine을 보존하며 필수본문·순수caption·quote/표 소속의 실제 관측 계약도 강화했습니다. 작성 문법은 [자료와 선택 구절](../../MARKDOWN-FIRST.md#자료와-선택-구절)에 연결했습니다. 새 dependency는 없습니다.
'''
(b/'RESULT.md').write_text(text.replace('__ROWS__','\n'.join(rows)))
print('Final report written with current actual approved scopes')
