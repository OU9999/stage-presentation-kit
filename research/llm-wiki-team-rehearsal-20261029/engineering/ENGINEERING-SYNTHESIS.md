# 엔지니어링팀의 순차 모의 발표 검토와 내부 회의 취합

작성·통합 담당 B implementation_evidence_reviewer. A karpathy_public_design_reviewer는 공개 저자 글을 근거로 한 설계 검토 역할이며 실제 Karpathy 참여·승인·말투 재현이 아니다. manager의 회의 해제 후 두 독립 최종과 실제 양방향 메시지/회의파일을 바탕으로 취합한다. 제품/자료/원고/demo/SVG는 변경하지 않았다.

## 팀 판단

발표를 차단할 기술적 모순은 확인하지 못했다. 원자료와 위키·작업 규칙, 에이전트와 사람·읽는 도구, 저장과 현재 문맥 읽기·가중치 학습을 나누어 설명한다. 세 가상 예, 공개 코드 관찰, 제한된 논문 실험, 고정 승인안의 파일 교정도 별개로 밝힌다. 이 경계는 유지할 가치가 있다.

먼저 고칠 부분은 **10/16장의 화면과 발언의 시간축**이다. 두 독립 검토자가 후속자료를 보기 전부터 같은 장면을 지적했다. **23장의 lint 귀환선과39장의 카드 균형은 그다음 시각 보완**으로 합의했다. 전자는 발언/9장에 필요한 설명이 있고, 후자는 제공 PNG에서 읽혔으며 실제 잘림·투사 가독성 실패를 검증하지 않았기 때문이다.

공개된 자료에는 첫 시도를 시작할 경로가 실제 있다. 소개 발표에 환경설명 전체를 넣어야 한다는 결론은 아니다. 다만 실제 LLM 작성/재독 성공과 도입 효과는 아직 이 발표/자료의 실험 결과가 아니므로, 내 자료로 옮길 때 별도로 확인한다.

## 검토 순서와 근거의 소유

A/B는 각각 phase 1(1~9) → 기록 → phase 2(10~18) → 기록 → phase 3(19~28) → 기록 → phase 4(40) → FIRST-IMPRESSION 동결 뒤 선택 심화 29~39 → 기록 → 필요 원문 확인 → FINAL 동결을 따랐다.40개 PNG를 한 장씩 view_image로 직접 실독하고 정확 발언/전환과 대조했다. 화면의 다음정보 선공개는 원래 입력의 관찰로 기록했고 미래 구간 선독과 구분했다.

A FIRST 동결 08:04:19 UTC / FINAL 08:07:07 UTC, B FINAL 08:08:38 UTC를 manager가 실독한 뒤 회의를 해제했다. 동결 전 상대결론·QA·과거평가는 읽지 않았다. core에서 남은 질문과 후속문서를 본 뒤 해결된 질문을 소급해 합치지 않았다.

A는 Karpathy 고정원문 저자 본문 전체와 현재 정의/세 사례를 직접 확인했다. B는 Microsoft/llm-code-wiki 고정코드, Wright/RAG/LoRA/ADR 일차본문과 학습서/workshop/demo로그/ZIP의 필요한 범위를 직접 확인했다. A는 B의 구현/실험 확인을 자기 독립 재검증으로 쓰지 않고 인계받은 근거로 구분했다. 시작문서의 최소schema 경로는 회의 후 A도 실제 목적지를 직접 열어 확인했다.

이것은 화면+정확 대본의 모의 경험이다. 실제 음성 청취, 실시간20분 완주, 사람 반응·학습성과·참여율을 측정하지 않았다. 외부 repo 설치, 모델/API 호출, 기존 261개 suite 재실행을 하지 않았다. 보조 ZIP은 정적 바이트·링크·해시 대조로 충분해 새 실행을 하지 않았다. 기존 영수증의 실행사실과 이번 정적확인은 다르다.

## 실제 내부 회의: 일치·질문·수정·남은 차이

두 검토자는 해제 뒤 상대 FIRST/FINAL을 실독하고 서로 직접 질문/반론 메시지를 보냈다. 한쪽의 의견을 사후 동의로 꾸미지 않고 아래 변화를 남긴다.

| 쟁점 | 독립 판정과 실제 왕복 | 팀 결론 |
| --- | --- | --- |
| 10/16 선공개 | A/B 모두 초기기록에서 지적했다.10장 전환은 “3장을 읽으면 기존 설명은 어떻게 달라질까요?”인데 화면은 이미3장 추적장치/동료보호를 보여 준다.16장은2·7주차를 말하면서 새8주차/Gini를 이미 보여 준다. A는 이전상태만 보이는 정적화면, B는 화면을 유지할 경우 '새 입력까지 모은 지도, 먼저 이전상태'의 발언 동기화를 제안했다. A/B가 두 안을 직접 인정했다. | **우선**. 기본안은10장에1장 행동/미확인·연결,16장에2·7주차/제곱오차만 두고 다음11/17에 새 내용을 공개한다. 제품수정을 줄일 필요가 있다면 기존화면을 전체지도라고 먼저 설명하는 발언을 대체안으로 쓴다. |
| 23 lint 귀환 | A 독립 우선/B 최종 우선목록 밖. B가 개선이유를 인정해 상향가능하다고 메시지했으나 A는 “9장+구두로 전달되는23이10/16만큼 필요한가”라고 직접 되물었다. 두 사람이9장의 “의심 목록을 바탕으로 다음 읽기와 수정을 정합니다”,23장의 “점검해서 다시 읽을 일을 찾는 lint”를 다시 비교했다. | **후순위**로 A가 조정하고 B가 수용.4장 도식 재사용은 회상을 돕지만 선은 ingest/query에 치우친다. “점검 후보→근거 재읽기→수정” 짧은 귀환선을 더하는 보완은 타당하다. lint 설명 누락/오류나 기술차단은 아니다.9장 후보≠확정오류를 유지한다. |
| 39 카드 폭·글자 크기 | A 독립 후순위/B 독립 우선. A가 잘림/가독성 실패 근거가 없는 점을 물었고 B는 작은 두 범주가 부차적으로 보일 우려를 정확성 차단과 구분했다. | **후순위**로 B가 낮추고 A가 동의.공개 코드/구성 예도 원저자 설계/논문 실험과 유사 폭·본문 크기로 맞춘다. 읽기 균형의 개선이며 실제 투사/모바일 실패는 단정하지 않는다. |
| 25~27 첫시작/schema | A/B 초기에는 최소schema·첫시작 경로 질문이 남았다. B가 workshop기본2~4·ZIP starter를 실제 읽고 경로를 전달했고, A도 workshop1~5·starter전체·README내자료적용·slides링크를 직접 열어 회신했다. | 부재 질문은 **해결**.원형에 필수인 설치/승인/ADR 규칙으로 확대하지 않는다.후순위로 “실습 기본 2~4 복사 → 자기 파일 에이전트에 제공 → 다음 질문의 실제 읽은 파일 확인” 한 줄 안내를 붙일 수 있다. |
| 실제 LLM trace | B는 core에서 관찰하지 못한 실행 접점을 후순위로 제안했다. A는 소개발표에 도구설정을 모두 넣을 필요가 없다고 독립 기록했고 B도 이 전제에 동의했다. | 향후 보완.실제 source/wiki 읽기와diff/다음질문 재독을 한 사례에서 관찰하면 좋지만 현재 승인 가공 Q2를 실제 retrieval trace로 부르지 않는다. 새 모델 호출을 이번 검토의 필수작업으로 삼지 않는다. |

남은 팀 내 사실판정 차이는 없다. 선호의 강도는 독립 최종에 보존했으며 회의 결과로 위 편집순서를 선택했다. 효과가 개선될 것이라는 제안은 사람실험으로 검증하지 않았다.

## 유지할 기술 설명과 실제 일차 근거

- **2~9 / 20~22 / 26:** Karpathy [고정 원문](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a)의 Architecture / Operations / Indexing은 지속 Markdown, 관련 페이지 갱신, 질문 답 재저장과 탐색을 제안한다. 발표는 이를 완제품이나 표준, 모든 RAG의 축적 불능, 자동 영구 기억으로 확대하지 않는다. 파일 존재와 이번 답의 실제 읽기, 점검 후보와 확정 오류를 구분하고 재사용 가치와 유지 부담을 함께 말한다. A가 직접 확인했고 B도 필요한 범위를 대조했다.
- **29~30:** Microsoft SHA `e09126f257c1fcf8e63234382748a51cf6a5df7f`의 [ingestSource](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/packages/core/src/ingest.ts), [llmIngest](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/packages/vscode/src/llmIngest.ts), [handleQuery / handleSave](https://github.com/microsoft/llmwiki/blob/e09126f257c1fcf8e63234382748a51cf6a5df7f/packages/vscode/src/chatParticipant.ts)를 B가 직접 읽었다. preview / index / log를 쓰는 등록과, source + index를 모델에 주는 내용 작성은 별도다. 모델이 없거나 호출에 실패하면 등록만 남을 수 있다. 질문은 키워드 상위 8쪽의 본문 앞 3,000자를 사용하고, `/save` handler는 수동 저장을 안내한다. 코드 전체에 저장 기능이 없다고 확대하지 않는다. 설치나 실행을 검증한 것은 아니다.
- **31:** dylannalex SHA `422fe1d3ff889295285b2f1a339cdbf789f43e5b`의 [constitution](https://github.com/dylannalex/llm-code-wiki/blob/422fe1d3ff889295285b2f1a339cdbf789f43e5b/plugins/llm-code-wiki/template/constitution.md), [validator](https://github.com/dylannalex/llm-code-wiki/blob/422fe1d3ff889295285b2f1a339cdbf789f43e5b/plugins/llm-code-wiki/template/scripts/validate.py)를 B가 직접 읽었다. 코드 참조와 해시, repo overview / concept / contracts를 쓰는 공개 변형이며 불변 raw를 보존하는 원형과 입력 조건이 다르다. 해시 차이는 변경 신호이며 의미 오류나 자동 수정의 인증이 아니다.
- **32~33:** [Wright v1](https://arxiv.org/html/2609.25303v1)의 §3, §5.4, §6, §6.1을 B가 직접 읽었다. 평가 대상은 12페이지와 59질문이다. Wiki에 동일 고정 section과 목표 자료를 제공하는 조건은 RAG가 21벡터에서 상위 5개를 검색하는 조건과 다르다. 답과 채점은 각 1회이며 단일 judge를 사용했고 비용은 측정하지 않았다. 실제 학생의 학습성과를 평가한 것도 아니다. 표현만의 공정 비교나 위키의 보편 우위로 확대하지 않는 현재 발언을 유지한다.
- **35 / 37:** B가 직접 읽은 [RAG v4 §2.4](https://arxiv.org/html/2005.11401v4#S2.SS4)는 query encoder와 generator의 학습을, [LoRA v2 §4.1](https://arxiv.org/html/2106.09685v2#S4.SS1)은 W0의 고정과 A·B의 학습을 명시한다. [Nygard](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions)의 맥락·상태·결과 기록과 대체 보존을 저장 정책에 응용했으며, 이것이 필수 LLM Wiki 형식인 것은 아니다.
- **34 / 36~38:** B가 review.json, run-demo.cjs, receipt와 실제 after 파일 및 ZIP을 대조했다. 고정 연산 8개는 기존 5쪽 갱신과 신규 3쪽 생성이다. 상대 링크 25개가 존재하며 보존 파일 10개와 after 파일 8개의 해시도 영수증과 맞는다. ZIP의 wrapper를 제거한 파일 24개는 로컬과 바이트가 일치한다. 이 정적 확인과 기존 영수증이 다루는 범위는 승인안 반영과 무결성이다. Q2의 재독 목록은 구성한 판단 입력이며, LLM 검색·생성 trace나 문장 진실성, 정확도·시간 절감의 측정이 아니다.

행번호 대조도 실제 처리했다. manager가 처음 전달한 chatParticipant의 web 표시행과 B의 원본행이 달랐으나, 같은 raw URL을 양쪽이 직접 바이트로 조회해 18,525 bytes / 547 lines / SHA-256 `f649e37a8116e1a997e83f06a0baa58d4178be1b79eae03f2ce893d40e151945`로 일치함을 확인했다. 원본행은 handleQuery 103, slice 131·142, handleSave 258이다. manager는 web 도구 표시행을 원본행처럼 전달한 혼동이었다고 교정했다. 독립 FINAL의 기술 locator 오류나 실제 코드 차이는 없으며 초기 파일은 수정하지 않았다.

## 사용자에게 남는 실제 시작 경로와 검증 경계

| 목적 | 현재 자료의 실제 경로 | 가능한 일과 경계 |
| --- | --- | --- |
| 가상 입력과 전후 관계 읽기 | 27/40장 → [study-guide의 세 적용 예](../../../talks/llm-wiki/materials/study-guide.md#세-가지-적용-예) → assets/examples의 reading / team / course.txt | codeblock 속 가상 파일명을 따라 원자료, 위키, 새 입력과 답을 읽는다. 완성된 실행 트리나 모델 출력은 아니다. |
| 내 자료로 작은 순환 설계 | 27장 → [workshop.md](../../../talks/llm-wiki/materials/workshop.md) 기본 1~5, 특히 2~4 | raw, 이전 wiki, 새 회의와 질문 답을 복사하거나 작성하고 관련 갱신과 재독을 확인한다. 파일 에이전트, 직접 편집, 종이 설계 중 선택할 수 있다. 도구 설치와 권한은 자기 환경에서 확인한다. |
| 고정 파일 교정 시도 | 27장 → [demo-log §10](../../../talks/llm-wiki/materials/demo-log.md#10-zip에서-재현하기) → [ZIP](../../../talks/llm-wiki/demo/llm-wiki-demo.zip) → llm-wiki-demo/README.md | Node가 있으면 check → apply → check를 시도할 명령이 있다. 추가 패키지, API, 로그인 없이 승인안의 파일 작업을 재현하는 목적이다. 이번 검토에서는 새로 실행하지 않았다. |
| 자기 에이전트에 시작 요청 | ZIP → [starter.txt](../../../talks/llm-wiki/demo/starter.txt) | 원문의 판과 근거 위치, 직접 지원과 해석, 실제 읽은 파일, diff와 이유, 미확인을 남기는 요청과 최소 schema 6항이 있다. 승인·현행·ADR는 운영 예이며 원형의 필수 조건이 아니다. ZIP이 이 요청을 자동 실행하지 않는다. |
| 공개 구현 설치 검토 | 40장 → 29장 → [원문 안내](../../../talks/llm-wiki/materials/reference-library.md) → 고정 README | Node 20+, VS Code 1.101+, Copilot 등의 선행 조건과 패키징·init·ingest를 시도할 경로가 있다. 우리의 설치 성공이나 모든 설계가 완성 구현됐다는 증거는 아니다. |

발표만 보고 남은 질문은 관련 페이지의 선택과 누락, 최소 schema, 근거의 판과 위치, 실제 재독, 실습의 범위였다. 자료를 연 뒤에는 시작 문서, 최소 규칙, 가상 전후 문장, 교정 실행의 범위와 명령이 실제 있음을 확인했다. 내 질문에서 필요한 근거를 찾는지, 갱신 누락과 잘못된 종합의 전파를 어떻게 통제하는지, 검토 시간과 운영 비용은 아직 관찰해야 한다. 이를 처음부터 모든 자료를 받은 청중의 이해처럼 서술하지 않는다.

## 기록 파일과 인계

- A: [FIRST-IMPRESSION](karpathy/FIRST-IMPRESSION.md), [FINAL-TECHNICAL](karpathy/FINAL-TECHNICAL.md), 각 phase 기록과 [MEETING-RESPONSE](karpathy/MEETING-RESPONSE.md).
- B: [FIRST-IMPRESSION](implementation/FIRST-IMPRESSION.md), [FINAL-TECHNICAL](implementation/FINAL-TECHNICAL.md), [MEETING-RESPONSE](implementation/MEETING-RESPONSE.md), 각 phase 기록.

이 취합의 우선순위는 실제 내부 회의의 결과다. QA 결론이나 팀 간 합의는 아직 읽거나 예상하지 않았고 다음 manager 교차 회의에서 별도로 다룬다. 점수, 테스트 개수, 파일 수로 발표 품질을 대신하지 않는다.

최종 동결 UTC: 2026-10-29T08:14:53.372733+00:00

A는 08:13:20 UTC에 전체 취합을 실독하고 내용 수정 없이 승인했다. manager도 내용을 수용했다. 요청한 후반부 띄어쓰기와 문장 공백만 정리했고, 로컬 보고서 링크의 목적지 존재를 확인했다. 의미·우선순위·독립 FIRST/FINAL은 바꾸지 않았다. A의 편집 종료 기록을 실파일로 확인했으며, 이 동결을 마지막으로 B도 engineering/implementation/ 및 ENGINEERING-SYNTHESIS.md의 편집과 작성 소유권을 종료한다. 이후 manager 인계의 읽기·응답만 가능하다.
