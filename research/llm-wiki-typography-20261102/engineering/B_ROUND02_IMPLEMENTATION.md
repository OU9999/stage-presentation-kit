# Round 02 국소교정과 확장 회귀 인계

담당은 B `/root/typography_engineering_manager/deck_qa_integrator`다. 최신 교체 AGENTS·WORK_LOG·DESIGN의 타이포/현재판 검수·발표팀 [1차 반려](../review/FINAL_VERDICT.round-01.md) R1–R6·실제 round01의68항/2실패·77입력 snapshot을 읽고 재개했다. root의 제품/브라우저/생성물/WORK_LOG 소유를 유지했고 공통 CSS·정본문서·24·26은 변경하지 않았다. 목표는 지정 실패를 실제 입력에서 국소 교정하는 것이며, 새 after 통과나 시각 승인을 미리 주장하지 않는다.

## 실제 수정과 보존

- R1,3장: 두 필수 하단 문장은 그대로 유지했다. SVG의 필수44를48로 높여 이전 동일 contain 가정에서는30.786→33.585논리px가 되게 했다. 실제값은 새 root 관측으로 검증한다. 원자료3개·5지식대상·5관계를 보존하면서 현재이해 라벨은 중심 노드 위 빈 V영역,계획/다음질문은 하단 노드 아래에 두어 확대와 선 간섭을 함께 다뤘다.
- R2/R3,22장: `잘못된 요약과 / 근거 없는 연결이 / 생길 수 있습니다.`와 `확인하고 고치는 데 / 시간이 듭니다.`를 지원되는 backslash br로 명시했다. 두 위험·가능성·확인수정 비용·세 열을 유지했다. 관리의 정확한 원문을 지정 role fixture에 추가했다.
- R4,9장: 세 노드/세 무방향 관계를 유지하고 계획 노드y440,계획라벨baseline510,재읽기585로 분리했다. 계획 라벨을 사선이 지나는 삼각형 내부에서 아래로 옮겼다.
- R4,10장: 요약(715,320),개념비교(1210,235),계획(1210,440)을 세 무방향 관계로 연결한다. 요약 라벨/입구는265/430,개념비교 라벨/기존설명은130/185,계획 라벨/여러자료종합은515/575에 둔다. 오른 연결은x1450 외곽으로 연속 우회한다. 원3관계는 polyline 정점과 node/relation ID에 명시했고,선삭제·검정가림·방향marker를 추가하지 않았다.
- R5,8장: 원자료와 공통 질문은9와 같은 위치다. 근거 상자는x445/폭490,본문x475,답은x1010에 배분했다. `스터디 계획을 정리합니다.`는44 크기를 유지하여 한 text로 둔다. Apple SD Gothic Neo의 정적 폭446.148이면오른1456.148<안전경계1475다. 이는 새 실제 glyphRows/글자폭을 대신하지 않는다. 세 입력/세 근거와 출처 대응/답 전문을 유지했다.
- R6,19장: `읽은 자료를 / 개념과 질문으로 연결하기`로 명시하고 공부/프로젝트/글과발표의 동등 의미를 유지했다.
- 비차단5장 권고: wiki의 세 범주와 설명을 같은 baseline190/290/390의 대응 두 열(x650/x1000)로 옮겼다. 범주/설명 전문과 rules4약속은 그대로다. 과거 bbox셀4unit을 실제 ink관통으로 보고하지 않는다.

원SVG19·remake2·48장archive·원자료/팩·demo·사용자test.md는 보존한다. round01에서 바꿨던 새 SVG의 그 판 원바이트는 root의 source snapshot에 남는다. 26제목과35+5 배분,두 필수 하단 문장,24네 전문·접근과26현재 역할을 보존했다. 자료의 문장/대상/참조 경로가 달라지지 않아 이번에는 materials/README를 다시 수정하지 않았다.

## 좁은 실제 관측 회귀

A는 새 `scripts/llm-wiki-geometry-qa.cjs`와10개 테스트를 실질 구현했다. B는 mainQA import/fixture를 소유하고 source/capture/hash 검증 뒤9/10에서 호출한다. 명시된3node/3무방향pair,연속points/endpoint연결,visible stroke/opacity/marker없음,모든 segment와지정실bbox의 교차를 확인한다. 누락·중복·잘못된 pair/좌표는 invalid이며 교차는 회귀후보다. bbox교차 후보를 실제ink/미감의 자동 판정으로 확대하지 않는다.

B는 native `risk-management`/`use-study` role과8답의 지정 object/verb 한행 계약을 추가했다. 매니저가 단일 `<text>`도 위치가 다른tspan 두 행을 가질 수 있다고 직접 반론했다. 이를 수용하여 current는 단일 bbox나문구만으로 통과시키지 않고,root가실 `getNumberOfChars/getStartPositionOfChar/getExtentOfChar`로 관측한 `texts[].glyphRows` 전체 문자의 완전성·실y군 한행·우측1475 이내를 요구한다. 관측 누락은 invalid다. parent text 한 개에 glyphRows두행이면 regression이다. root는 실제SVG CTM을 역산한 좌표와baselineY도 제공한다. 역사 round01의 별도2text 실패를 재현하는 추가probe에만 `allowHistoricalBBox:true`를 명시했다. current에는 그 fallback을 쓰지 않는다.

현재 CLI 명령은 그대로다.

```sh
npm run qa:llm-wiki-typography -- --mode current --manifest PATH_TO_ROUND02_MANIFEST --source talks/llm-wiki/slides.md --svg-metrics PATH_TO_ROUND02_SVG_METRICS --output PATH_TO_ROUND02_QA_RESULT
```

현재 전체 입력hash/정본·원고revision·SVG assetSHA/sourcePath·정확manifest파일SHA/viewport·전체textinventory 검증을 유지했다. source/runtime이 바뀐 뒤 역사판을 current 통과로 꾸미는 모드를 추가하지 않았다.

## 역사 결과와 새 검사 범위

기존 `before-qa.json`의70항/44회귀와 `round-01/technical/current-1280.json`의68항/2회귀는 수정하지 않았다. 확장 fixture로 실행한 baseline은 별도 [before-expanded-round02.json](before-expanded-round02.json)에72항/45회귀/invalid0/exit1/visualApprovalfalse로 남겼다. 공부 role 추가로 원baseline에서도 한 회귀가 추가되며,관리 role은 그 초기32본문에서는 pass다. 새 결과로 과거 결과를 덮지 않는다.

[round-01-expanded-probes.json](round-01-expanded-probes.json)은 반려판77 snapshot 파일의 SHA를 전부 검증하고,그 판 실제manifest/SVG bbox/원source를 추가로 읽은7범위 probe다. 내용/관리/공부의 실glyph 꼬리3,3도식 최소30.786,8답 두부분의 다른y,9/10의 선라벨 기하가 모두 regression이다.9/10관계 trace6개는 pass이고라벨 교차후보5개는fail이다. 이는 full current-freshness 실행이 아니며 추가한 부분 검사 범위와 정확 입력SHA/재구성 방법을 명시했다. 원판의 무ID path는 보존된정확M/L/H/V source와실bbox를 결합하고 원순서를3node/pair에 명시 매핑했다.

A는 실제 현재candidate source의 polyline/node/text를 읽고 글꼴/크기/강조/anchor/간격이 바뀌지 않은9/10에 한해 역사 실bbox를source x/y delta로 옮겨 같은 helper의 비간섭을 확인했다. 이 가정적 source-layout probe는 실제 round02 capture가 아니며 새 after pass로 보고하지 않는다.

관련 검사는 B23+A10+기존공통42=75개 pass/실패0이다. A가 실제 재실행하고 B main의 glyphRows·역사fallback 경계·실source/전체취합을 직접 인수했다. root 새 관측 전에 현재 본편/지침의 시각 승인은 미확인이다.

## 직접 반론과 동결 인수

A/B는 실제 파일 소유를 일대일로 확인했다. A는10의 오른 수직선뿐 아니라 두 사선도 기존라벨과 교차하는 반례를 직접 제기했다. B는 라벨과노드도 함께 재배치하고 A가 실제 candidate source와 변환된 역사bbox로 재확인했다. B는 A의 helper에서 모든 segment/무방향/연속경로/누락invalid가 적용되는 전문을 읽고 수용했다. 매니저의 R5단일bbox가 실제행을 증명하지 않는 반론은 glyphRows 필수와tspan2행 테스트로 교정했다. A는 역사보고 덮기 금지와실정식after미확인 경계를 확인했다.

제품 source/asset/QA writer는 최종 해시 인계 뒤 종료한다. 후속은 root의 build/verify·새4화면/실관측·확장currentQA와 독립 발표팀 재검수다. 실패가 남으면 같은 국소수정/동결/새관측 루프로 돌아가며 기준을 낮추지 않는다.

최종 보존 대조는 [round02-preservation.json](round02-preservation.json)에 남겼다. 의도적으로 수정한 네 정본 텍스트를 제외한 기존 tracked LLM Wiki97파일을 bf3cce13 원바이트와 비교해 불일치0을 확인했다. A가 본 문서와 취합 round02절 전문·최종소스를 직접 재독하고 수정요청0/최종75검사 및역사범위 구별을 인수했다.
