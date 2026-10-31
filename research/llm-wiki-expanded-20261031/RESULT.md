# LLM Wiki 발표 확장·세 영상 통합 인수

사용자가 고른 **본편 35분 + Q&A 5분**을 기준으로 48장 발표를 재구성했다. 브레인 트리니티 공동 세미나를 포함한 세 영상의 원문과 화면을 대조하고, 새 디자인·대본·학습 자료·실제 활동안을 함께 반영했다.

- [로컬 발표](http://127.0.0.1:4320/llm-wiki/index.html)
- [슬라이드 읽기](http://127.0.0.1:4320/llm-wiki/read.html)
- [발표 대본](../../talks/llm-wiki/materials/speaker-script.md)
- [15분 활동 진행안](../../talks/llm-wiki/materials/session-plan.md)
- [원고](../../talks/llm-wiki/slides.md) · [영상 조사와 반영 근거](SOURCES.md)

## 이야기와 실제 결과

| 막 | 시간 | 역할 |
| --- | --- | --- |
| 기 · 1~8장 | 5분 | 저장한 자료와 다시 쓸 지식의 차이, 목적과 특징 |
| 승 · 9~19장 | 8분 | 같은 세 자료·질문으로 RAG/위키의 결과·작업 시점·갱신·부담 비교 |
| 전 · 20~36장 | 14분 | 자료 선별·사람의 이유·개념과 비교·관련 문서 갱신·질문과 저장·점검 |
| 결 · 37~47장 | 8분 | 공유 위키·작업 맥락·실제 진행안·검토 이유·다음 질문·자기 첫 행동 |
| Q&A · 48장 | 5분 | 자기 자료와 만들 결과, 이어 물을 질문 |

세 번째 강의는 목적 정하기, 자신의 판단 직접 남기기, 원문/사람 기록/생성 종합 구별, 질문의 종합 저장과 결과 제작, 공유 작업과 검토에 반영했다. 세 영상 메모를 개념·비교·현재 계획에 연결하고, 새 조건을 반영해 저장한 답으로 실제 15분 진행안을 만든 뒤 검토와 ‘30분이라면?’ 질문으로 돌아온다. RAG와 검색·Agentic 탐색·모델 조정의 병행 가능성도 설명한다.

화면은 paper 주제의 크림 바탕·큰 제목·네이비 관계면·틸 연결·코랄 목적 강조로 설계했다. 독자 제작 SVG19종 중17종을 본편에 사용하고, 개인5겹 기록·기간 회고의2종과 상세는 학습서에 보존했다. 학습 자료는7개이며 대본 본편 발언은13,986문자다. 참여 장면에서는 실제 적을 질문을 크게 표시한다.

## 실제 팀 검토

사용자가 지정한 추가 발표 전문가 두 명을 모두 `gpt-6.1-sol` / `xhigh`로 배정했다. 각각 새 강의 전체 자막을 읽고 독립 의견을 작성한 뒤 직접 반론을 교환했다. 구현 후에도 원고·대본·실제 진행안·팩과48장 연속 시트를 읽고 중요 원본을 대조했다. 참여 질문의 시각 위계와 활동 전 팩 준비 안내 두 수정까지 다시 인수했다. 남은 필수 수정은 없다.

- [실제 모델 배정](sol-xhigh-team/TEAM.json) · [공동 변경 계약](sol-xhigh-team/lead/FINAL_CONTRACT.md)
- [발표 리드 최종 검토](sol-xhigh-team/lead/FINAL_REVIEW.md): 전체 시트·중요16장 원본
- [청중 전문가 최종 검토](sol-xhigh-team/audience/FINAL_REVIEW.md): 전체 시트·중요18장 원본
- [엔지니어링 최종 검토](engineering/FINAL_REVIEW.md): 전체 시트·개별25장 원본, 최신 자료·팩 검사
- [디자인 제작 인수](design/HANDOFF.md) · [내용 제작 인수](content/HANDOFF.md)

원문 확인은 세 영상 자동자막4,002발화와 root의 전체 시간대143프레임 직접 확인, 담당자별 전체 자막 실독·대표 화면 대조다. 연속 음성 청취를 완주한 기록과 구별한다.

## 실행 검증

| 확인 | 실제 결과 | 근거 |
| --- | --- | --- |
| 전체 생성·생성물 일치 | build:site·verify:site 통과 | [build.json](evidence/build.json) |
| 기존 테스트 | 261통과, 실패/취소/생략0 | [tests.json](evidence/tests.json) |
| 원고·대본·시간 | 48제목 일치, 본편2100초+Q&A300초 | [source-check.json](evidence/source-check.json) |
| 실제 렌더 | 1440폭48장·960폭대표22장, 넘침/진단/JS오류0 | [browser.json](evidence/browser.json) |
| 읽기·학습 자료 | 읽기2폭·7자료×2폭14화면, 문서 가로넘침0 | [browser.json](evidence/browser.json) |
| SVG | 19종 실제 글꼴 경계초과/글자겹침0 | [svg-bounds.json](evidence/svg-bounds.json) |
| 자료/팩 | 7자료236참조·17논리파일/22변형 링크오류0, 진행안/팩본문 문자일치 | [자료](engineering/material-check.json) · [팩](engineering/example-check.json) · [활동안](engineering/session-plan-contract.json) |
| 실제 조작 | 키1→48·Home/End·전체보기48·발표자양방향·40/41진행안·46실습·48학습서 클릭 | [navigation.json](evidence/navigation.json) |
| HTTP | 45경로200, 비HTML자산 로컬 바이트 일치 | [http.json](evidence/http.json) |
| 마지막 소폭 교정 | 45장만 화면 변경, 나머지47PNG바이트동일·두 전문가 재인수 | [polish-delta.json](evidence/polish-delta.json) |
| 보존 | 기존61자산/데모 및 공통4파일 baseline 변화0 | [preservation.json](evidence/preservation.json) |

root는 전체48장 시트와 주요 원본, 수정45장 및 모바일 진행안 화면을 직접 확인했다. 최종 원고 revision은 `c0d3f5671112a4f59cb8be07a555dde823670c40d97314df10cbd8b791fe3fb4`이며 실제 브라우저 입력과 일치한다. [최종 파일 식별값](evidence/final-snapshot.json)

시간은 발표 배분안이다. 실제35분 음성 리허설·입문자 모임/학습효과·개인 모델의 자동 생성 실행은 수행하지 않았다. 진행안의15분은 준비된 팩을 읽는 활동 배분이며 설치·모델 생성 완료 시간의 측정치가 아니다. 원영상의 직전 자료 미반영·문서 혼선·사전 제작 사실은 자료와 대본에 보존했다.
