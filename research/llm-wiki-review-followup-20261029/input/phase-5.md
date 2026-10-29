# 수정본 순차 검토 구간5

반복 검토 입력: 화면과 말할 발언만 순서대로 확인하고, 현재 반응을 저장한 뒤 다음 구간으로 진행합니다. 실제 음성/실시간 낭독 측정이 아닙니다.

## 29장 · 공개 구현은 등록과 LLM 작성을 나눈다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-review-followup-20261029/evidence/screens/slide-29.png`

말할 문장:

“선택 심화입니다. 공개 microsoft/llmwiki 코드에서는 자료를 등록하는 함수와 LLM이 내용을 쓰는 경로가 나뉩니다. 기계 등록은 미리보기 페이지와 목차, 로그를 갱신합니다. 별도 LLM 경로는 자료 텍스트와 기존 index를 모델에 보내 요약과 개체, 개념, 연결을 씁니다. 기존 본문 전체를 검토하는 것은 아니고, 모델이 없으면 등록만 남을 수 있습니다. 코드를 읽은 관찰이며 설치나 실행 검증은 아닙니다.”

전환으로 말할 문장: “질문과 저장 경로도 따로 대조해야 합니다.”

## 30장 · 문서의 기능 설명도 코드와 대조한다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-review-followup-20261029/evidence/screens/slide-30.png`

말할 문장:

“이 고정 코드의 질문 경로는 키워드 검색 상위8쪽의 각 앞3000자를 답변 문맥에 넣습니다. 검색에서 빠지거나 긴 페이지가 잘릴 수 있습니다. README는 save를 설명하지만 실제 handler는 파일을 쓰지 않고 수동 저장을 안내합니다. 문서에 기능 이름이 있다는 것과 해당 코드가 끝까지 수행하는 것은 다릅니다.”

전환으로 말할 문장: “입력이 문서가 아니라 코드일 때의 변형도 있습니다.”

## 31장 · 살아 있는 코드라면 판과 해시도 추적한다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-review-followup-20261029/evidence/screens/slide-31.png`

말할 문장:

“llm-code-wiki는 살아 있는 코드 저장소를 읽고 개요와 교차 개념, 서비스 계약을 유지하는 공개 변형입니다. 원형의 보존 raw와 같은 입력 조건이라고 단정하지 않습니다. 읽었던 판과 해시를 식별하고 코드가 달라지면 관련 설명을 재검토하도록 합니다. 해시 차이는 바뀌었다는 신호이지 뜻이 틀렸다는 자동 판정이나 자동 수정은 아닙니다.”

전환으로 말할 문장: “강의 지식 표현을 시험한 초기 논문도 보겠습니다.”

## 32장 · 강의 위키를 QA로 비교한 초기 연구도 있다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-review-followup-20261029/evidence/screens/slide-32.png`

말할 문장:

“Wright의 초기 논문은 강의 코퍼스의 QA를 비교합니다. 실제 평가에서 wiki arm은59문항 전체에 같은 고정 section을 받고 질문의 대상 자료도 포함합니다. 문맥 선택에서 실패하는 단계가 없습니다. RAG arm은21벡터 중5개를 검색합니다. 설계 절의 탐색 흐름과 실제 평가 조건을 구별해야 합니다. 같은 코퍼스와 답변 모델이라는 이유만으로 표현만의 공정 비교가 되지는 않습니다.”

전환으로 말할 문장: “이 조건에서 무엇을 말할 수 있는지 제한하겠습니다.”

## 33장 · 문맥 선택의 차이를 위키 전체의 우위로 넓히지 않는다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-review-followup-20261029/evidence/screens/slide-33.png`

말할 문장:

“논문은 단일 코퍼스의 답변 품질과 근거 일치 평가입니다. 답변은 각 arm에서 한 번, 평가는 한 LLM judge가 했습니다. wiki에 목표 자료가 주어진 문맥 조건과 RAG 검색이 달라 효과를 분리해 말하기 어렵습니다. 학생의 학습성과와 운영 비용은 측정하지 않았습니다. 이 결과를 모든 위키의 정확성이나 검색 대비 우위로 넓히지 않습니다.”

전환으로 말할 문장: “이번 발표의 보조 파일 실습은 다른 범위의 실행입니다.”

## 34장 · 보조 실습은 승인한 교정안을 파일에 반영한다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-review-followup-20261029/evidence/screens/slide-34.png`

말할 문장:

“기존 ZIP은 발표자가 학습용 오류와 고정 승인안을 준비한 예제입니다. 사람이 원문과 문장의 범위를 검토했고 Node가 승인안을 파일에 반영했습니다. 실제로 실행한 것은 파일 수정과 diff 생성, 링크와 보존 해시의 검사입니다. LLM 호출이나 자동 검색, 새 답 생성의 성공 실험은 아닙니다. 전체 설계 가운데 파일 변화의 일부를 읽는 보조 실습으로 봐주세요.”

전환으로 말할 문장: “실제 바뀐 문장과 범위를 보겠습니다.”

## 35장 · 실제 diff는 문장과 적용 범위를 바꾼다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-review-followup-20261029/evidence/screens/slide-35.png`

말할 문장:

“초안은 외부 파일을 쓰는 모든 시스템에 학습이 없다고 일반화했습니다. RAG 원논문에는 질의 인코더와 생성기 학습이 있고 LoRA도 추가 행렬을 학습합니다. 그래서 이 데모의 파일 수정은 모델 매개변수 학습을 실행하지 않는다는 범위로 고쳤습니다. 반대로 외부 파일을 쓰면 항상 학습한다고 바꾸지도 않습니다. 자료를 읽은 범위와 설명의 범위를 맞추는 실습입니다.”

전환으로 말할 문장: “고친 설명을 다른 질문에 가져갈 수도 있습니다.”

## 36장 · 교정한 설명을 다른 질문에도 다시 쓴다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-review-followup-20261029/evidence/screens/slide-36.png`

말할 문장:

“고정 예제의 새 질문 Q2는 어떤 답을 저장할지입니다. 교정된 C1과 Q1의 다음 확인, 초기 결정 D1의 맥락을 함께 놓고 현행 답과 검토 대기를 나눌지 판단했습니다. 이 목록은 구성한 승인안의 입력입니다. 자동 검색이나 LLM이 새 답을 생성해 성공한 실행 기록은 아닙니다.”

전환으로 말할 문장: “운영 선택이 달라진 이유도 남깁니다.”

## 37장 · 선택이 바뀌면 맥락과 결과를 남긴다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-review-followup-20261029/evidence/screens/slide-37.png`

말할 문장:

“모든 답을 현행에 저장하려던 D1은 대체 상태로 두고 검토한 답을 현행에 연결하는 D2를 남겼습니다. 이전 선택의 맥락과 새 기준, 검토 부담을 함께 적는 구성입니다. Nygard의 ADR 형식을 스터디에 응용한 것이며 LLM Wiki의 필수 규칙은 아닙니다. 원문이 우리 저장 정책의 정답을 자동으로 정해 준 것도 아닙니다.”

전환으로 말할 문장: “파일 검사가 확인한 범위도 구별합니다.”

## 38장 · 파일 검사와 의미 검토는 다른 확인이다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-review-followup-20261029/evidence/screens/slide-38.png`

말할 문장:

“기존5쪽 갱신과 신규3쪽으로8쪽을 반영했고, 로컬 상대 링크25개와 읽기 메모5개·초기5쪽의 보존 해시를 검사했습니다. 서로 다른 단위의 별도 확인입니다. 승인안이 반영됐고 연결과 바이트가 유지됐다는 뜻이지 문장 정확도나 검색 누락, 시간 절감의 측정값은 아닙니다.”

전환으로 말할 문장: “마지막으로 근거의 종류를 구별해 보죠.”

## 39장 · 원문과 구성 예의 근거를 구분해 읽는다

화면: `/Users/ou9999-wdl/Documents/devday-presentation-kit/research/llm-wiki-review-followup-20261029/evidence/screens/slide-39.png`

말할 문장:

“원저자 설계는 제안의 근거, 공개 코드는 구현 경로의 관찰, 논문은 특정 조건의 실험입니다. 우리의 세 적용 예는 가상 입력으로 작동을 설명한 구성입니다. 서로 다른 근거를 같은 도입 성과로 묶지 않으면 무엇을 더 확인해야 할지도 분명해집니다. 자세한 출처는 자료에 남겼습니다.”

전환으로 말할 문장: “이제 자기 자료와 질문으로 돌아갑니다.”
