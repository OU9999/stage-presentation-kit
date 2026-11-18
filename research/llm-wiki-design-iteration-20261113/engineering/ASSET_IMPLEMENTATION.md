# LLM Wiki 자료 표현 구현

담당 `/root/engineering_audit_manager/input_renderer_auditor` · 2026-11-13. 원고/지침/fixture는 B, 생성물/브라우저/관측/Git/WORK_LOG는 root 단독 소유다. A는 `talks/llm-wiki/assets/design/` 새 SVG와 이 문서만 작성한다. 직전 감사 원문과 기존 원본·typography 자산·archive/demo는 수정하지 않는다.

**현재는 round-02 독립 반려 뒤의 round-03 재교정 판이다.** 3·5 새 자산을 실제로 재조판하고1280/1920의 새실물4PNG를 직접 읽었다. 10은 독립 채택된 round-02 바이트를 그대로 보존한다. 아래 round-01/02의 실패·기술 결과·작성 종료는 이력이며 최신 소유/대안/미완료는 마지막 round-03 절을 따른다. 본편 시각 승인 완료가 아니다.

읽은 계약: WORK_LOG 최신 실제 구현 지시, DESIGN의 권한·역할/고유면·한국어/읽기·현재 판 검수, MARKDOWN-FIRST/CONFIG/DESIGN-REVIEW, 직전 RESULT/ENGINEERING_SYNTHESIS와 양 매니저 HANDOFF, 이번 model-snapshot. 직전 감사의 수정 금지는 최신 구현 지시가 이번 소유 범위에서 대체했다. 이번 작업은 실제 자산 구현과 실제 화면에 따른 반복이다.

## 변경 brief와 초기 제작 선택

| 장 | 주역·문제 | 구현한 대안 | 보존·금지 이식 |
| --- | --- | --- | --- |
| 3 | 일반 메모명/추상망/하단 요구의 경쟁 대신 한 실제 구절을 현재 이해와 다음 질문에 연결 | `knowledge-layers.svg`: 목적 메모의 정확한 부분 발췌를 큰 본문으로 둠. 현재 이해의 푸른 자료면과 다음 질문을 연결하고 기존 요구/재사용 설명을 SVG 안에 귀속 | 발표팀 구성 예, 실제 사용자 기록/모델 실행 아님. 세 메모와 개념/비교/현재 이해/계획/다음 질문, 기존 무방향5관계. 장식 사진/실적 없음 |
| 5 | raw/wiki의 읽을 구절을 먼저 보고 보존/갱신/공통약속의 차이를 식별 | `raw-wiki-rules.svg`: round-02의 어두운 raw면을 round-03에서 걷고 두 열린 그룹으로 통일. raw발췌·속성열·서지, wiki발췌·역할을 묶고 공통rules를 별도 전폭 아래에 둠 | raw3파일과 요지/선택이유/남은질문, wiki개념/비교/종합/질문/목차/로그, 네약속. rules는 이미 있었으며 누락 복구로 보고하지 않음. 마크다운 정의는 공통 native본문(B소유) |
| 10 | 요약이 종착점처럼 보이는 대신 기존 문서를 고치는 영역을 주역화 | `ingest-map.svg`: 원자료/읽고나누기/작은 요약입구와 큰 개념·비교/현재계획 자료면을 서로 다른 스케일로 배치 | 세 메모/요지, 기존3무방향관계, 작업 화살표, 문서·목차·링크 갱신. 생성 의무순서·자동양방향 갱신을 암시하지 않음 |

검정 Stage/큰 타이포/여백이 기본이다. 파랑은 연결된 이해·갱신문서에 국소 사용했다. 초기5의 주황 선택이유 라벨은 다음 판에서 덜고 실제 이유 구절을 키웠다. 실제 원본 증거면을 흉내 낸 캡처가 아니라 `data-material-kind="explanatory-reconstruction"`인 설명용 재구성이다. 사진·색비율·레이아웃 종류의 수량을 목표로 삼지 않았다.

현재3·10의viewBox는1500×650,5는1750×750이다. 5필수최소52/핵심발췌62/title64,3예시표지는source30·5예시표지는source32다. 실제min32필수하한은낮추지않았다. 아래실측과같이현재필수최소는3약34.351/5약33.905논리px이며,source의판독·위계는별도시각검토한다. 과거5의1500×620/필수44·발췌50/3예시essential40은round-02이력이다. 기술 구조 확인을 시각 승인으로 쓰지 않는다.

## 정확한 발췌

원문은 기존 [expanded-study.txt](../../../talks/llm-wiki/assets/expanded-study.txt)의 가상 파일 절이며 독립 실재 `.md` 링크가 아니다.

- 3 목적: `raw/context-note.md`의 “우리 스터디에서 LLM Wiki를 왜 쓰고 어떤 질문에 다시 활용할지 정하기.”를 부분 발췌했다. 5는 첫 실화면 뒤 같은 원문의 “어떤 질문에 다시 활용할지 정하기.”로 범위를 좁혔으며 현재62px 두행이다. 모두 정확한 부분 발췌이며 순서/단어를 요약문으로 바꾸지 않았다.
- 5 선택 이유: 같은 절의 “진행안을 만들고 싶어서 이 메모를 골랐다.”를 부분 발췌했다. 전체 원문은 ‘LLM Wiki와 RAG의 차이를 설명하고 다음 스터디의 진행안을 만들고 싶어서 이 메모를 골랐다.’다. 발췌 범위를 밝혔으며 실제 사용자 관찰이라고 쓰지 않았다.
- 5 wiki: `wiki/concepts/llm-wiki.md — 처음`의 “LLM이 원자료의 개념·비교·종합을 연결 문서로 작성하고 갱신하는 지식관리 패턴이다.”를 그대로 나눴다.

## B와 직접 합의한 인터페이스

1. 새 design 파일명 세 개와 모든 `<text>`의 `data-copy-role="essential|source"`를 유지한다. 현재3/10은1500×650,5는1750×750이다. 기존 source/typography 파일은 보존한다.
2. B는3/5/10 원고 이미지를 새 경로로 연결했다. 3의 기존 요구/재사용 설명과10하단 작업중복은 SVG 안으로 귀속하고 불필요한 하단 사본을 제거하여 그림 면적을 확보했다. 5마크다운 정의와 rules는 raw/wiki공통 소속이다. 정의는 B의 native본문, rules는 새 SVG전폭이다.
3. graph anchor는 `circle[data-node-id]`로 수집한다. 설명용 g/text의 식별자와 점기하를 혼동하지 않는다. relation은 정확한 `polyline[data-relation-id][data-from][data-to]`; 작업 화살표는 `data-work-id`로 따로 표시한다. root collector는 work/shared-scope를 관계3개에 섞지 않는다.
4. 12는 B의 native 문서명/관계표·실재자료 anchor,15는 B의 판단 H2 안두H3+실행H2다. A가 새12자산을 임의 추가하지 않았다.

## 관계와 node 재고

3의 graph anchor5개는 concept(840,198), comparison(1335,198), understanding(1060,405), plan(850,478), question(1290,478)이다. 무방향 relation5개는 concept--understanding, comparison--understanding, understanding--plan, understanding--question, plan--question. 모든 선 끝이 각 점 한 위치에 접속한다. 별도의 sources-to-knowledge 작업 화살표는 읽고 연결하는 행위다.

10의 graph anchor3개는 summary(670,329), concept-comparison(925,227), plan(925,514)이다. 무방향 relation3개는 summary--concept-comparison, summary--plan, concept-comparison--plan. 작업 raw-to-summary는 읽고 나누기다. 현재 표현은 원3관계를 방향5edge flow로 대체하지 않는다.

5는 raw/wiki자료영역과 rules 공통전폭을 명명했다. shared-scope 표식은 문서관계가 아니라 두 영역 공통약속의 소속을 뜻한다. 모든 관계·작업/영역·문구의 최종 목록은 실제 SVG/최종 관측 JSON과 함께 인수한다.

## 초기 반론과 수정

- 매니저/root: 5의 마지막baseline649/font40은650 viewBox하단잘림 위험. 마지막행을640/font38로 옮겼다. 실제 배치의 min32logical은 첫 관측 대기다.
- 매니저/root: raw 요지/선택이유/남은질문을 desc에만 두면 필수 본문 보존이 아니다. visible essential행으로 추가했다.
- 매니저/root: 10title의 잘못된 언어를 한국어로 교정했다.
- B/매니저/root: document rect의 서로 다른 변에 선을 붙이면 단일 nodeanchor의 엄격기하를 만족하지 못한다. 10의circle3·3polyline을 단일점에 맞췄고3도circle5와5관계를 같은 방식으로 보강했다. 관측 계약을 느슨하게 만들지 않았다.
- B/root: work 화살표가 relation 개수에 들어가면 무방향3관계 계약이 바뀐다. from/to는 보존하고 data-work-id로 분리했다.

## 첫 화면 반려와 두 번째 구현

1차3자산 XML파싱 성공, `<text>`55개 전부 copy-role 보유(3:16/5:23/10:16) 확인. 3무방향5쌍·10무방향3쌍과 별도 작업 화살표를 source에서 대조했다. 첫 checkpoint를 B/매니저에게 직접 전달하고 root실build/캡처 동안 제품쓰기를 hold했다.

A는 round-01/present-1280의3·5·10 PNG를 직접 읽었다. 3의 구체 메모 발췌와 현재이해를 식별할 수 있었으나 아직 독립 시각 승인은 아니다. 5는 원문 발췌가 들어갔어도 raw파일 목록/공통rules가 빽빽하며 마지막 필수행이 실제로 작았다. 10의 요약→계획 사선은 ‘원자료의 입구’ 문장을 관통했다. 이 실패를 첫 시안의 기술/미감 반례로 보존한다.

root가 [prototype-observations.json](../round-01/prototype-observations.json)의 실제 SVG bbox/contain을 수집해5의38px 필수행→약28.588논리px,40px→약30.09논리px로32미달임을 확인했다. 하단 glyph bottom648/650도 촉박했다. 3·10의 source24를 제외한 필수 시작값은 약36.07논리px였다. A는 원본 JSON의 image.svg.texts와 essentialMeasurements를 직접 읽었다. 전체 목록에는 source도 포함되므로 source24의 작음을 필수본문 최소값으로 혼동하지 않는다.

매니저 요청으로 첫3SVG를 `round-01/source/talks/llm-wiki/assets/design/`에 복사하여 실패 판을 보존했다(추가 연구 경로 소유 허용을 직접 수신). 그 뒤 root의 hold 해제를 받고 다음을 실제 수정했다.

- 5: raw목적은 정확한 부분구절 두 행으로 좁히고 목적/이유/개념의 주역 본문을50px로 확대했다. 파일3명·요지/이유/질문·wiki범주·네약속은44px를 유지했다. 별도의 선택이유 작은 라벨을 덜고 실제 이유 구절을 크게 읽게 했다. 캔버스 높이를620으로 줄여 현재 media 면적에서 전체 축소도 줄였다. 마지막 baseline610으로 내려갈 여유10을 남겼으며 실제 bbox 재검증이 필요하다.
- 3/5: ‘발표팀 구성 예 · 부분 발췌’를 작은 source에만 두지 않고 essential40/44로 바꿨다. 실제 사용자 기록/실행 결과가 아닌 예시라는 지위는 desc/alt/자료 전문과 함께 유지한다.
- 10: ‘원자료의 입구’ baseline을407→470으로 옮겨 사선 오른쪽에서 떨어지는 빈 공간을 썼다. graph anchor3·관계3과 단일점 접속은 그대로다. 수정 뒤 실제 bbox/사선 비관통 재측정 대기다.

두 번째 checkpoint에서 XML파싱·copy-role·원문 부분발췌 일치를 읽기 전용으로 확인했다. 당시재고는3 text16/graphnode5/relation5,5 text21,10 text16/graphnode3/relation3이다. 3/10의 모든 polyline 시작/끝 좌표가 해당 named circle 한 위치와 정확히 같음을 assert했다. B에게620viewBox/문구/역할/font 변경을 직접 알렸고 B가 당시fixture의16/21/16문구/essential-source분류·계약SHA 및 graph3/5관계 인수를 직접 회신했다. 기술 인터페이스의 미해소 불일치는 없다고 서로 확인했다. 다음 root build/실측 동안 다시 제품쓰기를 hold했다.

## Round-02 관측과 인수 이력

A는 round-02의1280/1920 각각3·5·10개별PNG6개를 직접 열었다. [3/1280](../round-02/present-1280/slide-03.png)·[5/1280](../round-02/present-1280/slide-05.png)·[10/1280](../round-02/present-1280/slide-10.png), [3/1920](../round-02/present-1920/slide-03.png)·[5/1920](../round-02/present-1920/slide-05.png)·[10/1920](../round-02/present-1920/slide-10.png)이 현재 자료 표현의 실제 근거다. viewport와 실제stage(약917.333×516 /1557.333×876)를 구별한다.

root가 전체26/9SVG를 수집하고 [qa-1280](../round-02/qa-1280.json)과 [qa-1920](../round-02/qa-1920.json) 모두119 checks /0invalid /0regression을 확인했다. A도 두 결과 JSON과 두 SVGmetrics를 직접 읽었다. 이는 새 현재 역할 계약의 기술 결과이며 이전83항 또는 새 본편 시각 승인과 같은 뜻이 아니다.

| Round-02 자산 | text/graphnode/무방향관계 | 1280 필수 최소 실제 논리px | SHA256 |
| --- | --- | --- | --- |
| knowledge-layers.svg | 16 /5 /5 | 34.351 | `556497c2d515c29e99f0fbba7a0628aac09a41b426af631b63f51ad9d07df441` |
| raw-wiki-rules.svg | 21 /0 /0(공통영역 표식 별도) | 34.704 | `8f1a562adef9db13f3d0a2aa3c8febb148ff2e6d60c3420e5b6e263c146b76d1` |
| ingest-map.svg | 16 /3 /3 | 36.069 | `1ea6a569bab645b16c29d332950aaa5928fcd0b4b6737ff12005bcdf3765764b` |

1920의 논리 최소값도 같은 수준이며 물리 표시px는 배율에 따라 다르다. 10의24px source메타를 필수본문 최소 산정에 포함하지 않았다. 3/5의 예시표지는 당시essential이었다. 원래 자산55개는 직전 starting-state의 각SHA와 불일치0으로 직접 확인했다. 원본19·typography9를 포함한 기존 SVG를 바꾸지 않고 새 design3개만 추가했다.

실화면에서10의 ‘원자료의 입구’ 문장은 사선에서 분리되었고 세관계도 유지됨을 확인했다. 3은 구체 구절과 현재이해를 찾을 수 있으나 지원메모명→예시표지→결과문장의 하단 연속 위계는 독립 검토에 남긴다. **5는 기술크기를 통과했지만 자료 발췌/파일목록/공통약속의 시각 호흡이 아직 충분하다고 판단하지 않는다.**

5의 실제 SVG text bbox에서 raw요지행 bottom519.5, rulesheader top522.5로 간격3SVGpx뿐이다. separator y526은 header의 폰트bbox 안에 있다. 마지막 약속 bbox bottom619.5/620으로 여유0.5SVGpx이고 rulesheader/약속 폰트bbox도 일부 겹친다. 이 수치는 폰트bbox이며 실제 ink가 잘렸거나 겹쳤다고 자동 단정하지 않지만, 직접PNG에서도 빽빽하다는 root·매니저·B·A의 공통 우려를 뒷받침한다. 현재font floor 통과로 해소했다고 보고하지 않는다.

위 우려와 근거를 B/매니저에게 직접 전달했고 B도 독립PNG열람 뒤 동의했다. 현재 입력은 root의1920/읽기 수집을 위해 동결했다. 이 단계는 엔지니어링 구현 checkpoint이며 시각 채택/기각의 최종 판단을 독립 디자인팀이 이어받는다.

## Round-02 작성 종료와 다음 담당 이력

A의 새 SVG3개와 이 인계 문서는 현재 판으로 작성 종료했다. B에게 원문/데이터/재고·새fixture·직접반론 해소를 인수했고, root/매니저에게 제품hold 및 writer종료를 통보한다. A가 생성물·브라우저·공통로그·Git을 수정하지 않았다.

다음 미완료는 독립 디자인팀의 실제 크기 판정과 남은5의 미감 우려 및3하단 위계에 대한 채택/반려다. 반려 시 root/매니저가 같은 A를 재개하여 현재 소유 자산을 재교정하고 새 관측을 수집한다. 독립 검토·필요 재수정·최종 현재입력 검수와 명시범위 `--require-approved` 전까지 요청 전체를 완료했다고 보고하지 않는다. 프로젝터/다른OS/실제발표거리·청중이해는 이번 저장PNG 관측 밖이다.

## Round-03: 독립 반려를 실제 재조판으로 반영

같은 A가 재개했다. WORK_LOG 최신 항목과 현재 DESIGN의 역할/소속/메타 구분/현재판검수, 새 디자인4보고서와 수동4JSON을 읽었다. round-02의95approved/9needs(3·5네화면과390읽기18) 및 일반check4valid/require-approved4실패를 인수했다. 기술119pass와 별개로 자산 미감이 반려된 상태라는 점을 유지한다.

제품 변경 전 자기 SVG3개의 현재 SHA, round-02 발표1280 manifest SHA, `round-02/source/talks/llm-wiki/assets/design/`의 보존 SHA가 각각 일치함을 직접 확인했다. 이미 존재하는 이력 파일은 덮어쓰지 않았다. 채택10의 SHA는 여전히 `1ea6a569bab645b16c29d332950aaa5928fcd0b4b6737ff12005bcdf3765764b`이며 변경하지 않는다.

### 실제 바꾼 소속·위계

- **3:** viewBox1500×650과 큰 정확 발췌/현재이해/graph5circle·5polyline/작업화살표는 유지했다. ‘발표팀 구성 예 · 부분 발췌’를 발췌 제목 옆 x260/y158의source30메타로 옮겼다. 이는 주장/관계/조건을 작게 숨긴 것이 아니라 실제 발췌의 지위를 해당 발췌에 귀속한 분류다. 정확 구절·예시 지위는 desc/alt/실제 상세 경로에서도 보존한다. 두 지원 메모명은 ‘함께 읽은 원자료’ 라벨 뒤 같은 서지행 두 text로 놓았다. 이름행과 재사용 결론 사이 실제bbox여유39SVGpx를 확인했다. 전체 폰트 축소를 하지 않았다.
- **5:** viewBox1750×750, 필수 최소52·주발췌62·제목64로 조판했다. 캔버스 좌표를 키운 만큼 글자도 키워 기존 실제 발췌 크기를 유지하는 안이며, 선언값만으로 실제 크기를 통과했다고 주장하지 않는다. raw패널을 제거하고 열린 두 자료그룹을 일관되게 쓴다. raw발췌는왼쪽, 요지/선택이유/남은질문은 같은raw소속의우측속성열, 두지원파일명은raw하단서지한행이다. wiki의6역할도한행으로묶었다. 각자료의 마지막 행과 공통rules 분리선/제목/약속 사이 공간을 새로 확보했다. 단순rect1px확장으로 면밖 소속을 가린 안이 아니다.
- **5메타:** 두 발췌의 header곁에 동일 예시표지를 source32로 둔다. 해당 발췌의 서지/지위이며 필수 주장/관계/조건을 대체하지 않는다. source라고해서크롭/판독실패를허용하지않는다는B반론에동의했고root의첫bbox관측을요청했다.

### B와 직접 맞춘 현재 계약

3은17text(essential16/source1),5는22text(essential20/source2)다. 정확한source-excerpt/raw-purpose/wiki-concept의g identity와selection-reason-1/2text identity는 유지했다. 이 세 g의 줄을 공백으로 잇고 예제팩의 정확한substring과 대조했다. 두 selection text도 같은 방식으로 정확 부분발췌임을 assert했다. 3의 graph5쌍과 endpoint/anchor단일접속은 그대로다.

5의 raw속성한행은 요지/선택이유/남은질문의3text로, 지원파일두행은 `retrieval-note.md · synthesis-note.md`1text로, wiki두분류행은 `개념 · 비교 · 종합 · 질문 · 목차 · 로그`1text로 바뀐다. 삭제/요약으로 역할을 줄이지 않았다. B가 현재 파일을 직접 읽고 재고·source분류근거를 인수했으며 기존 source계약 테스트의 합친 raw속성 기대를 세역할 보존 검사로 바꾸고 있다. min32필수 하한은 그대로다.

B는 wiki개념label x975/y140/font52와 source표지 x1410/y137/font32의 실제인접/클립 가능성을 반례로 제기했다. A의 좌표는 이전실폭의비례값(label끝약1396.9, source끝약1721.9of1750, 사이13px)을 참고한 것이지만 새glyph확정값은 아니다. source메타도 읽을 수 있어야 하므로 root빠른실측에 해당 두bbox와 우측여유를 포함하도록 직접 요청했다.

### Round-03 실제 관측과 마지막 인수

A는 [3/1280](../round-03/present-1280/slide-03.png)·[5/1280](../round-03/present-1280/slide-05.png)·[3/1920](../round-03/present-1920/slide-03.png)·[5/1920](../round-03/present-1920/slide-05.png)의실제4PNG를직접읽었다. 3은발췌곁메타,지원원자료한서지행,결론의층이분리되었다. 5는raw속성이raw본문옆에남고서지행뒤의공통rules가별도층으로읽히는것을확인했다. 이는A작성자의관찰이며독립시각승인을대신하지않는다.

root의 [1280 QA](../round-03/qa-1280.json)와 [1920 QA](../round-03/qa-1920.json)는각119/0invalid/0regression이며`visualApproval:false`다. A도결과와실제SVGmetrics를직접대조했다. 최신자산은다음과같다.

| 현재 자산 | viewBox / text(essential/source) | 실제 필수 최소 논리px | SHA256 |
| --- | --- | --- | --- |
| knowledge-layers.svg |1500×650 /17(16/1)|34.351|`64c1fd12553932973b7340a0930c2617788ad561c1e09329da9171644d4f0a56`|
| raw-wiki-rules.svg |1750×750 /22(20/2)|33.905|`87b989db720d81d4ec21ed604ac24c66623ee2faa934166071449003133d900d`|
| ingest-map.svg |1500×650 /16(15/1),graph3/3불변|36.069(채택round-02값)|`1ea6a569bab645b16c29d332950aaa5928fcd0b4b6737ff12005bcdf3765764b`|

5의마지막필수bbox는y731of750으로아래19SVGpx여유다. 자료영역의마지막서지/역할행bottom561→공통선y584는23px,선→rules제목top599.5는15.5px,제목bottom661→약속top669.5는8.5px이다. 원자료면밖행을rect로가린것이아니라열린그룹과각역할의행을재배치한결과다. 3의두이름행bottom554.5→결론top593.5는39px이다.

B가제기한5메타인접/클립반례는root실bbox로프레임내임을확인했다. wiki문서label끝1397.172→source시작1410간12.828SVGpx,source끝1720.930of1750이며3source끝551.086of1500이다. source는1280실물에서5약12물리px/3약14.77물리px다. 프레임안이라는기술확인이메타의판독·계층을자동승인하지않으므로실제읽기와독립디자인재판정에남긴다.

B는같은3/5PNG와현재QA를직접읽고17/22inventory·source분류·source원문검사·graph계약을현재fixture로인수했다고회신했다. 현재기술인터페이스의미해소불일치는없다. A는제품freeze를유지한다. root의읽기/행동수집과같은독립디자인담당의새실물재판정이남아있으며반려시같은A가재수정한다. 전체본편의승인이나요청완료를선취하지않는다.

**Round-03 A writer종료:** 두수정SVG와이문서를현재판으로마감했다. 보고서로컬링크16개누락0/후행공백0,현재3SVG의SHA와round-03발표1280manifest불일치0,기존SVG55개의시작SHA불일치0을읽기전용으로확인했다. B/매니저에게직접인계·편집종료를통보했다. A가직접읽은현재화면은발표3/5의두폭4PNG이며읽기전체를직접승인했다고보고하지않는다. 같은독립검수자의재판정과필요시다음교정은미완료로남긴다.
