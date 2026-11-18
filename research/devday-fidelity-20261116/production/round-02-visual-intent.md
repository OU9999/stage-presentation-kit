# Round02 자산 인계

2026-11-16 · A `/root/devday_creation_manager/visual_editor`. 소유는 새 `prototypes/talks/round-02/assets/**`와 이 문서뿐이다. **Round01은1/4 구조 반려·2/3 국소 유지 후보이며 이번 변경의 시각 승인은 아직 없다.**

재개 시 WORK_LOG 최신부, DESIGN의 편집/강한 검증·한국어·자료면·현재판 검수, ROUND02_PRODUCTION 전체, round01 검증manager/A/B 최종과 두 reviews.json16행을 읽었다. DESIGN 실제 SHA256은 `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`다. 실제 round01의1/4 양폭4PNG와 Codex01:30·새keynote24:00/25:00을 직접 열었다. 기술 수치나 과거 승인을 새 미감의 근거로 쓰지 않는다.

## 실제 네 자산

파일 기준은 `prototypes/talks/round-02/assets/`다.

| 파일/대응 | 구조 변경 또는 보존 | 텍스트 역할·source 크기 |
| --- | --- | --- |
| `same-question-comparison.svg` /1·05 | 원자료/이번답을 각1회로 공유하고 입력의 동의 설명을 제거했다. 좁은3카드를 넓은 처음 계획 발췌면으로 대체했다. `남아 다시 읽는 문서`를 차이의 주역으로, 실제 제목과 아직 조건이 미정인 정확 구절을 같은 문서에 둔다. | 흐름36, 공통양끝39, 현재종합50, 차이52, 처음계획 상태34, 정확제목42, 정확구절43. 최소34. viewBox1440×610. |
| `connected-documents.svg` /2·07 | round01 bytes 그대로 복제. 작은 요약입구/큰 기존 문서 이름·3영역·3무방향선·ports를 보존했다. | 기존최소34, 핵심문서55. viewBox1440×610. |
| `session-plan-row.svg` /3·13 | round01 bytes 그대로 복제. 완전한 활동안 정체성·세필드·6~11분 한행을 보존했다. | 기존최소34, 정체성44, 읽을행48. viewBox1440×610. |
| `condition-note-selection.svg` /4·15 | source의 제목+긴3조건+stub를 높이350의 간결한 식별면으로 바꿨다. 제목/세메모팩 단서/선택위치만 남긴다. 필수 입문자·본편뒤별도15분은 B의 native 확인질문 한 덩어리, 그 뒤 정확 목적blockquote만 읽는다. 반복 목적해석/예시p는 제거한다. | 정확제목43, 팩문맥요약35, 선택prefix36. 최소35. viewBox680×650. native 조건질문32/정확목적54는 공용 evidence 구현을 그대로 사용. |

05의 `shared-related-materials`/`shared-current-answer`는 각각1개이며 두 흐름 모두 같은 이번답으로 연결된다. `current-input`과 `persistent-plan-document`가 비교 대상이다. 방향선은 교육용 두 작업 흐름이며 실제 실행 기록·시스템의 필수 순서가 아니다. 본편07의 세 무방향 관계와 합치지 않는다. 한쪽만 저장·관계가 가능하다는 일반화도 하지 않는다.

05 발췌는 팩 `wiki/syntheses/study-plan.md — 처음`의 **다음 스터디의 첫 시도**, **참여자 배경과 활동 길이는 아직 미정이다.**다. `처음 계획` 상태를 가시 표시하므로 입문자15분 조건을 반영한 최종계획처럼 보이게 하지 않는다. B가 팩240–248행을 직접 대조한 회신을 받고 옮겼으며 A도 원문을 읽었다. 이전3카드/작은지속라벨을 대체한 것이며 새 설명층으로 덧붙인 구절이 아니다.

15의 **발표팀의 주제 메모 세 개**는 정확 문장 전체의 인용이 아니라 짧은 팩 문맥 요약이다. 정확 원문 **발표팀의 설명용 주제 메모 세 개로 시작한다.**는 공개 `materials/notes.md#선택의-근거-확인`에 보존했다. 선택표식은 `data-selected-text`에 정확 목적문을 유지하며 prefix만 왼쪽에 보여 준다. 목적 전문은 오른쪽 native 인용이다. 확인질문은 조건을 묶은 재구성이며 정확 인용과 구별한다.

## 본문·metadata·표면과 남은 확인

B와 현재 round02 원고를 직접 대조했다. 1의 공통질문은 native H1, **두 예는 함께 쓸 수 있습니다.**는32px 본문이다. RAG의 저장/관계 확장·위키의 검색·우열 미측정과 정확 두 예는 공개 `#검색과-지속-문서`에 남는다. 4의 입문자/본편뒤별도15분·질문·목적은 caption으로 내리지 않는다. image title→figcaption은 **발표팀의 설명용 비교 예**, **발표팀의 자작 가상 예**라는 순수 작성지위에만 쓴다. 2/3 본문은 B가 그대로 보존했다.

모든 메모/위키/활동안은 발표팀 자작 설명예다. 팩의 raw/wiki 경로는 논리 구간이며 없는 독립파일/UI/실제사용자기록/모델실행/성과를 만들지 않는다. 1의 푸른 문서면과4의 밝은 종이색은 비교 대상/근거 위치를 읽는 국소 조판 선택이다. 실제UI 고유면 확보·전체 Stage 기본값 변경 권한으로 승계하지 않는다.

네SVG XML/material-kind/viewBox를 확인했고2/3은 round01과 byte동일을 대조했다. 실배율·glyph·선과인용 대응·위계·앞뒤흐름은 root 실캡처 전 미확인이다. SVG 실제크기는 `min(renderedWidth/viewBoxWidth,renderedHeight/viewBoxHeight)`와 Stage배율을 각 source크기에 곱해 확인한다. 특히1의 공유양끝보다 남는문서가 먼저 보이는지,4의 compactsource와 native질문/목적이 한 경로인지 두 발표폭에서 재검수한다.

B가 최종1/4 SVG·alt·공개notes를 직접 대조하고 원문정합/요약역할/공유양끝/선택위치 일치와 추가자산수정 요청0을 회신했다. 이 회신은 정합 확인이며 시각 승인이 아니다.

기존 round01/본편/공통core·docs·tests/과거근거/WORK_LOG/Git은 수정하지 않았고 build/browser/capture를 실행하지 않았다. **A 렌더입력 hold 확정·writer 종료.** 독립 검증의 핵심 veto는 새 실제 화면에서만 재판정한다.
