# 엄격한 키노트 검증과 실제 시안 제작

사용자가 직전 결과를 미감에 전혀 맞지 않는다고 반려했습니다. 정보가 한 화면에 너무 많고 자료가 정리돼 보이지 않으며, 원본은 글로벌 기업 무대에 쓸 수준이라고 지적했습니다. 강한 독립 검증관과 잦은 짧은 반복을 요청했습니다. 이전 내부 승인·테스트 수를 현재 미감의 면책으로 쓰지 않습니다. root가 기준을 낮게 적용했으며 새 검증관은 이전 판단을 지킬 책임이 없습니다.

공통 로그는 /Users/ou9999-wdl/Documents/devday-presentation-kit/WORK_LOG.md 최상단입니다. root만 씁니다. 새 DESIGN의 ‘발표면의 편집과 강한 시각 검증’을 포함해 관련 기준, MARKDOWN-FIRST/CONFIG를 읽으세요. 최신 사용자 지시가 우선입니다. 의미 보존≠한 장의 모든 항목 보존입니다. 파일명/속성/정의/네약속을 지원문서·대본·후속장에 옮길 수 있고 기존26장도 고정하지 않습니다. 원본 파일/기존 자료와 논지를 삭제하거나 실제 결과/출처를 날조하지 않습니다. 원자료의 지위와 무방향 관계는 문서/설명에 보존하고 새로운 한 화면에 전부 그리려 하지 않습니다.

## 현재 목표와 판단 방침

Stage 검정/큰 타이포/여백/단호한 주역으로 편집된 발표를 만듭니다. 작은 글자와 출처를 모두 큰 본문으로 올려 과밀하게 만들지 않습니다. 큰 글자 한문장으로 전부 획일화하지도 않습니다. 메시지는 메시지답게, 관계는 읽을 한 관계가 보이게, 실제자료는 한 구절/행동영역이 주역이 되게 설계합니다. 원본의 피사체/브랜드/수치/별무늬를 복제하지 않습니다. 색/사진/양식/반려수 quota는 없습니다.

검증관은 제작을 하지 않고 실제 시안을 원본 역할별 화면과 먼저 비교합니다. 기술 통과 수/이전 승인 reason은 초기 시각 판단이 끝난 후에만 보세요. 밀도/편집/시선이 약하면 명백히 반려하고 재배치·장분할·정보이동을 요구합니다. 간격 몇px 교정으로 본질적인 반려를 통과시키지 않습니다. 사용자의 미감을 동일하게 재현한다고 보장할 수는 없으므로 구체 원본/불합격 예/실제 새시안을 기준으로 엄격도를 드러내고 사용자 피드백을 가장 높은 기준으로 둡니다.

## 기준 화면과 현재 입력

원본은 로컬 보관 증거입니다. 실제 발표자/객석이 들어간 원본에서 화면 부분의 정보 선택·주역·크기·여백을 읽으며 전체사진을 슬라이드양식으로 복제하지 않습니다.

- research/evidence/devday/keynote-20m30.png: 단호한 한 문장.
- research/evidence/color-devday/keynote-24m15.png: 이름/소개 전환.
- research/evidence/devday/keynote-20m00.png: 주장과 한 근거.
- research/evidence/devday/keynote-36m00.png: 실제 작업 화면이 주역.
- research/evidence/reaudit-devday/collage-4750.png: 여러 자료도 고유면과 명확한 주역으로 편집한 회수. 카드/항목 수를 텍스트 페이지로 옮길 이유가 아님.
- 이전 모음 예제: research/llm-wiki-design-iteration-20261113/round-03/compare/{bento,table,quote}.png.
- 사용자 반려된 현재: research/llm-wiki-design-iteration-20261113/round-03/present-1920/slide-NN.png,1280도같은구조. 현재26장 contact보드도있음. 3·5·10·12·15·20을 핵심 반례로 실제 열고 다른 장도 과밀/단조로움을 면책하지 않음. 판정은 현재화면으로 새로합니다.
- canonical: talks/llm-wiki/slides.md 및 assets/expanded-study.txt, materials/diagram-reading.md, speaker-script.md. 구성 예문/계획이며 실제 사용자 관찰·모델 실행 성과가 아님.

## 실제 팀과 소유

root+creative manager+실무2의4슬롯만 사용합니다. manager는 manager skill로 새 역할을 실질 배정하고 직접 반론/반복을 운영합니다. 모델은 model-snapshot.json의2026-11-13T09:21:01Z 공식/실가용 확인·정확gpt-6.1-sol/xhigh/none을 유효성 확인해 재사용합니다. 이전high 판단과 사용자 반려의 충돌 때문에xhigh로 재평가하며 모델명만으로 미감을 보장하지 않습니다.

A는 독립키노트 검증관: 원본/현재 화면을 먼저 보고 강한 반려기준/정보편집의 문제를 review/ 아래 짧게 작성합니다. 실제 prototype PNG가 도착할 때마다 핵심 역할과 구도를 판정하고 반려/유지/다음 작업을 직접 creator와manager에 전달합니다. 산출물은 회차별review/Rxx.md·verdict.json 등입니다. 제작자 파일·제품·WORK_LOG·기존 근거를 편집하지 않습니다.

B는 시각·서사 설계자이자 통합 담당: 검증관의 초기 판단과 독립적으로 실제 저밀도 시안을 먼저 작성합니다. 대표역할(메시지/관계/자료)에서 서로 다른 구도로 시작하고 현3/5/10의 논지를 어떻게 발표면·지원문서에 배분하는지 실물로 보여주세요. 독립초안 뒤 A와 직접 반론합니다. 소유는 prototypes/talks/r01/slides.md와 해당assets/·materials/ 및 creator/ 아래 실제 선택/coverage 문서입니다. 원고는 현재 엔진이 지원하는 문법을 따릅니다. root가 만든 prototypes/ou.config.json은 수정하지 않습니다. sourceDir=talks/outputDir=site이며 root만CLI빌드·생성물·브라우저를 담당합니다.

각 회차는 소수 실제 화면으로 빠르게 봅니다. 첫proof를 전체 덱·전체 검수 기록·긴 보고서 완료까지 묶어 두지 마세요. 안정 원고를 통보하면 root가 즉시 `node bin/ou-presentation.cjs build --config research/llm-wiki-keynote-reset-20261113/prototypes/ou.config.json`으로 실제 Stage를 렌더하고 PNG를 넘깁니다. 검증관은 저장 PNG를 직접 열고 원본과 비교합니다. 브라우저는 root 전용이며 새TaskSpace/브라우저를 만들지 않습니다. 캡처 요청·필요 크기는root에게 직접 말합니다.

검증관이 퀄리티 기준을 허용한 실물 패턴이 생기면 main26장을 그대로 보존하는 미세수정 대신 내용구조/공용경로를 실제 이행할 엔지니어링팀으로 넘깁니다. 현단계는prototype이 제품이며 main원고/기존SVG·currentfixture·DESIGN/과거연구/승인을 직접 수정하지 않습니다. root가 필요한 공용 구조와 회귀이행의 새 소유자를 배정합니다. 새 지침 제안은 본문을 바꾸지 말고 root에게 직접 전달하세요.

## 인수/마감

각 실무는 실질초안/구현과 직접반론을 수행하고 manager가 소유·중요판정·다음작업을 인수합니다. root에게 파일안정checkpoint와실물검증요청을 빨리알립니다. 새지침/소유변경은담당자일대일전달,동시writer0입니다. 최초의 일반감사보고서로 끝내지 말고 실제시안→반려→실제재설계 루프를 운영합니다. 초안을승인으로,기술pass를미감승인으로,내부승인을사용자승인으로바꾸지않습니다.
