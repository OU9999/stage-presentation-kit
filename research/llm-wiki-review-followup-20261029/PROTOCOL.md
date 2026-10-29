# 회의 반영 후 발표 재검토

기준은 main719c387, 수정 원고 revision은 `e1df2cd2c288c3996ec58c661598587897dba88bbf6463d23afd7b0adfd51651`이다. 사용자가 이전 회의 결론을 실제 반영하고 팀들이 다시 발표를 검토하도록 요청했다. root가 원고/대본/주제 자산을 구현한 뒤 입력을 고정한다. 검토 중에는 제품을 읽기 전용으로 두고, 수정이 필요하면 새 revision과 해당 장면을 다시 인계한다.

정확한 말할 발언·전환과 실제 PNG를1~9→10~18→19~28→40 순서로 확인하고 핵심 반응을 저장한다. 이어 선택29~39를 확인하고, 이전 화면·기록/변경 소스와 대조한다. 모든 장을 개별 이미지로 직접 보고 숫자/자동 검사로 발표 품질을 대신하지 않는다.24장에서는 자기 질문도 적는다. 각 검토자는 상대의 이번 판단을 읽기 전에 초기·최종을 저장하고, 이후 직접 양방향 회의와 취합 검토를 한다.

이는 앞선 문제를 알고 다시 보는 **화면·대본 기반의 반복 모의 검토**다. 새 블라인드/실제 음성 청취·실시간20분·사람 효과 실험으로 표현하지 않는다. 기존 담당자 재개 여부와 실제 실무 상태를 보고한다. 카파시 역할은 공개 설계 원문을 대조하는 에이전트이며 실제 본인의 참여/승인이 아니다. 첫 검토와 달라진 이해, 아직 남은 문제, 새로 생긴 문제를 구별한다.

실제4슬롯에 맞춰 QA manager+실무2→ENG manager+실무2를 root와 함께 순차 실행한다. 이전 실무가 가용하면 followup으로 재개하고, 현재 등록 상태에 없다면 확인 후 새 담당자를 배정한다. 매니저는 독립 청중에 더하지 않는다. 각 팀 두 실무의 독립 결과와 실제 직접 내부회의·재검토를 거친 뒤 두 manager가 직접 팀 간 확인을 한다.

공통 WORK_LOG/input/evidence/최종 RESULT/Git은 root, qa/는 QA팀, engineering/는 ENG팀 소유다. 기존 보고서는 보존한다. source/정확 발언/40 PNG 해시는 [snapshot](./input/snapshot.json), 이전53파일은 [baseline](./input/baseline.json)에 있다. 스크린샷 픽셀 차이 개수는 소스 변경 장수나 미감 변화 판정이 아니다. 소스 diff상 변경 장면은3/10/16/23/25/26/27/39이며 공통6runtime·기존SVG/사진·고정demo는 보존했다.

새 작업 모델 확인은2026-10-29 08:51~08:54UTC 공식 OpenAI models/gpt-6.1-sol 검색/본문 열람과 tool runtime의 gpt-6.1-sol/gpt-6-astra/gpt-6.1-terra/gpt-6-sol/gpt-6-luna를 대조했다. 기술·맥락·통합 판단에 정확 gpt-6.1-sol/high, 재개 시 기존 fork none 계약을 유지한다. 새 실무가 필요하면 fork none에 같은 계약/snapshot을 전달한다. 음성 미지원도 확인했다.

## 실제 담당자와 노출 기록

QA/ENG의 기존 child가 현재 등록 목록에 없어 각 manager 아래 새 역할 두 명을 배정했다. 기존 child의 followup 호출 실패를 직접 관찰했다는 뜻은 아니다. QA는 followup_study_listener/followup_practical_listener, ENG는 followup_karpathy_design_reviewer/followup_implementation_reviewer다. 두 manager는 기존 known handle의 followup으로 재개했고, 새 실무는 모두 정확Sol6.1/high/fork none이다. 따라서 신규 실무가 이전 발표를 개인적으로 보았던 기억을 가진 것처럼 쓰지 않는다. 현재 반응을 먼저 저장하고 이전 기록·8개 화면을 사후 비교한다.

ENG manager의 등록 조회가 QA의 완료 요약까지 반환해 현재 QA 판정 일부가 manager에게 우발 노출됐다. manager는 독립 청중에 더하지 않고 fresh 두 실무에게 현재 QA 요약/변경 설명을 전달하지 않는다. 실무는 WORK_LOG의 중립 요약1~6줄과 정확 입력을 읽고 FIRST/FINAL을 먼저 저장한다. 이 노출을 숨기거나 완전 블라인드로 다시 이름 붙이지 않는다.
