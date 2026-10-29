# EX-TEAM — 가상 고객 요구의 입력과 전후 파일

고객·회의·일정은 모두 구성 예다. 실제 도입·시장 수요·팀 약속이나 모델 실행 결과가 아니다. 코드블록은 가상 위키의 파일 내용이며 자동 실행 스크립트가 아니다.

## 입력 · raw/call-a.md / raw/call-b.md

```markdown
# 고객 A 상담
- 목적: 월말 정산
- 요청: 화면에서 CSV를 내려받아 회계 담당자에게 전달
- 빈도: 월1회
```

```markdown
# 고객 B 상담
- 목적: 매일 대시보드 갱신
- 요청: 매일 새벽 CSV를 자동으로 받기
- 빈도: 매일
```

## 이전 위키 · wiki/concepts/export.md

```markdown
# 데이터 내보내기
A는 월말 수동 다운로드, B는 매일 자동 수집을 요청했다.
두 요청은 출력 형식이 같지만 사용 목적·전달 주기·자동화 범위가 다르다.
제품의 우선순위와 제공 일정은 미정이다.
근거: raw/call-a.md, raw/call-b.md
연결: comparisons/export-requests.md, questions/export-priority.md
```

## 새 입력 · raw/planning-meeting.md

```markdown
# 가상 제품 회의
- 이번 분기: 수동 CSV의 요구·구현 범위를 검토한다.
- 예약 전송: 보류한다. 운영 비용 추정이 더 필요하다.
- 출시일: 확정하지 않았다.
```

## 갱신 위키 · wiki/concepts/export.md

```markdown
# 데이터 내보내기
A의 월말 다운로드와 B의 일별 자동 수집은 별도 요구다.
팀은 이번 분기에 수동 CSV 범위를 검토하기로 했다.
예약 전송은 운영 비용 검토가 남아 보류 중이다. 출시일은 미확정이다.
요구가 접수되었다는 사실과 제공을 약속했다는 판단을 구별한다.
근거: raw/call-a.md, raw/call-b.md, raw/planning-meeting.md
연결: comparisons/export-requests.md, questions/what-to-tell-b.md
```

함께 작성·갱신할 파일: 상담별 `sources/` 요약, `comparisons/export-requests.md`의 상태 열, 고객 응대 FAQ `questions/what-to-tell-b.md`, `index.md`, `log.md`. 회의가 생겨도 고객 B의 원래 요청은 지우지 않는다.

## 후속 질문과 재사용

“고객 B에게 지금 무엇을 말할까?” → 내보내기 개념/요청 비교/회의 근거를 읽고 다음 답을 저장한다고 가정한다. 실제 응대·LLM 작성은 수행하지 않았다.

```markdown
# wiki/questions/what-to-tell-b.md
B의 일별 자동 수집 요구는 접수되어 있다.
예약 전송은 운영 비용 검토가 남아 보류 중이며 출시일은 확정하지 않았다.
지금 확인할 질문: 일별 수동 다운로드도 업무를 해결하는가?
이 답은 고객에게 실제 발송한 기록이 아니라 가상 응대 초안이다.
근거: raw/call-b.md, raw/planning-meeting.md
연결: concepts/export.md, comparisons/export-requests.md
```

새 비교 산출물 `wiki/comparisons/export-requests.md`는 A/B의 목적·빈도·자동화·현재 상태를 같은 열로 나란히 놓는다. 후속 상담에서 B가 일별 수동 작업도 가능하다고 답하면, 원래 요구와 변경 이유를 남기며 비교와 위 질문 답을 함께 갱신한다. 질문 답에서 새로 알게 될 정보가 다시 위키를 바꾸는 순환이다.
