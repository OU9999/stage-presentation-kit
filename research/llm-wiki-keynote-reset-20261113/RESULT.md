# LLM Wiki 키노트 재편집 결과

사용자의 정보 과다·정돈감 부족 반려를 새 기준으로 삼아 본편을26장에서20장으로 다시 편집했습니다. 발표는 주장과 선택한 자료에 집중하고, 정의·전체 관계·파일·조건·요청 전문은 실제 공개 해설로 연결했습니다. 서로 다른 독립 검증관이 발표와 읽기를 맡아 실제 반려를 반복했고, 최종 main-05의 아래 네 범위는 각각 `--require-approved`를 통과했습니다. 사용자 미감 승인을 받았다는 뜻으로 확대하지 않습니다.

[로컬 발표6장](http://127.0.0.1:4336/presentations/llm-wiki/#6) · [읽기](http://127.0.0.1:4336/presentations/llm-wiki/read.html) · [공개 해설](http://127.0.0.1:4336/presentations/llm-wiki/materials/keynote-notes.html)

## 실제로 바뀐 화면

| 역할 | 교정 전 | 최종 |
| --- | --- | --- |
| 연결된 이해를 보기 | [정의를 반복한 개념 문서](main-02/present-1920/slide-06.png) | [같은 계획의 구체적인 전후 변화](main-05/present-1920/slide-06.png) |
| 무엇을 확인할지 알기 | [확인 대상 없이 조건을 인용](main-02/present-1920/slide-15.png) | [시간 추론 질문과 원자료의 목적을 대응](main-05/present-1920/slide-15.png) |
| 작은 화면에서 관계 읽기 | [작은 그림과 직접 경로 부재](main-02/read-390/slide-07.png) | [자료 옆의 읽기 링크](main-05/read-390/slide-07.png) → [세 관계의 실제 native 본문](main-05/technical/direct-support-07-390.png) |
| 한국어 인용의 호흡 | [서술어만 남은 행](main-04/technical/direct-support-03-390.png) | [원문·18px를 유지한 의미행](main-05/technical/direct-support-03-390.png) |

초반의 긴 설명 연속을 실제 선택 이유 메모로 끊고, 비교·계획·관계·선택·활동안·확인·요청을 서로 다른 역할로 구성했습니다. 반복 링크/footer와 긴 지위 설명을 덜고, 설명용 구성 예라는 지위와 원자료 접근은 보존했습니다. 장수를20으로 고정하는 규칙을 만들지 않았습니다.

## 다음 발표에도 쓰는 구조

- `quiet`는 기존 기본 동작을 유지하며 반복적인 하단 표기 등을 작성자가 제어합니다.
- `support: {label, href}`는 자료별 읽기 탐색 메타데이터입니다. 등록된 공개 Markdown과 정확한 anchor를 검증하고 실제 출력 경로로 변환합니다. 읽기에서는 자료 옆의18px 링크로 나타납니다.
- 본편·공개 해설·대본·진행표·역링크와 원래26주제의 [의미 보존 위치](../../talks/llm-wiki/qa/keynote-coverage.json)를 맞췄습니다.
- [현재 역할 계약](../../talks/llm-wiki/qa/keynote-current.json)은 전역 H1 크기 대신 실제 역할을 구별하고, 필수 본문32논리px·읽기 표18CSSpx·원문/관계·실제 glyph 관측을 검사합니다. 실제로 실패했던 native 인용의 목적어·서술어 행도 회귀에 포함했습니다.

작성 지침은 [DESIGN](../../DESIGN.md), [Markdown 작성법](../../MARKDOWN-FIRST.md), [관측 계약](../../talks/llm-wiki/qa/keynote-observation.md)에 연결했습니다. 원문·자료를 보존하는 것과 같은 화면에 모든 정보를 표시하는 것을 구분합니다.

## 현재 명시 범위

| 모드 | viewport / DPR | 장수 | 독립 수동 판정·승인 CLI |
| --- | --- | --- | --- |
| 발표, 실제 Stage만 캡처 |1920×1080 /1|20| [20승인](main-05/reviews/present-1920.review.json) |
| 발표, 실제 Stage만 캡처 |1280×720 /1|20| [20승인](main-05/reviews/present-1280.review.json) |
| 실제 스크롤 읽기 |1440×1000 /1|20| [20승인](main-05/reviews/read-1440.review.json) |
| 실제 스크롤 읽기 |390×844 /1|20| [20승인](main-05/reviews/read-390.review.json) |

[네 CLI 실행](main-05/approval-cli.json)은 모두 exit0이며 개선 필요·미확인0입니다. 발표의 실제 Stage는 viewport와 다릅니다.1920에서는 약1557×876,1280에서는 약917×516입니다. 기존 전편 실독과 현재 동일 픽셀의 영향 재평가, 새 대표 화면·변경 native 절의 직접 검토를 구분해 [독립 원문](review/main-05/integration.md)에 남겼습니다. 원문 상태·검토자·이유는 root가 변경하지 않았습니다.

## 기술 검사와 실제 동작

- 최종 전체 테스트 **358/358**, 실패·취소·생략0: [실행 결과](main-05/test-result.json).
- 현재104입력의 실제 관측 QA: 발표 각각2149항, 읽기 각각2200항, invalid·regression0: [실행 기록](main-05/qa-cli.json). 이 수치는 시각 승인을 대신하지 않습니다.
- 자료6곳을 양 읽기 폭에서 **12회 직접 클릭**해 정확한 절·현재 origin·실제 본문을 확인했습니다.
-390의 계획·활동안 두 표는 키보드로 내부 이동하고 실제0→262px 양끝을 확인했습니다. 요청 전문은 두 폭에서 전체 내용이 선택됐고, 브라우저가 생략한 마지막 LF1자를 원문/선택 문자열과 따로 기록했습니다.
- 예제 팩의 UTF-8 읽기,20장 키 이동·Home/End·전체 보기20개와 선택 이동을 확인했습니다: [실제 동작·문자·목적지](main-05/technical/actions.json).
- [최종 통합 검증](main-05/integration-verification.json)은 네 승인 범위·PNG·현재 해시·동작·인용 의미행과 원본 보존을 함께 확인합니다.

교정 전 native 인용의 실제 실패와 현재 관측의 통과는 [별도 근거](engineering/round05-verification/native-before-after.json)에 있습니다.11월2일 역사 baseline의45회귀 재현도 현재 통과와 분리해 보존했습니다.

## 반복 과정과 보존

작은 R01–R04에서 익명 두 정의 열·떠 있는 선·긴 선택 설명을 반려했습니다. main-01에서는 초반 설명 연속과4/6/8, main-02에서는6/15의 역할과 모바일 접근, main-03에서는 native 어절·강조, main-04에서는 새 서술어 꼬리행을 다시 반려했습니다. source snapshot·PNG·판정·실패 관측을 회차별로 남겼고, 기술 통과나 이전 승인으로 반려를 덮지 않았습니다.

기존71자산(48장 원고·원본 그림 포함), 데모/사용자 메모26항, 동결 시안40파일과 과거 반려·승인 기록의 bytes를 보존했습니다. 원고 SHA256은 `19670d537a7bb9279169aabb893250fcce8ed540e75dd5fcf574e4794975524f`입니다.

미리보기 서버의 HTTP 이전 병렬 자원 실패는 환경 문제로 별도 기록했습니다. 같은 로컬 주소의 큐를5에서128로 바꾼 뒤 [8문서·48SVG probe](preview-capacity-probe.json), 최종 캡처와 전체 동작을 확인했습니다. 내용/가독성 교정과 구분하며 중단된 동작을 성공으로 소급하지 않았습니다.

이번 완료 범위는 위 로컬 정지화면·읽기·실제 탐색/선택입니다. 활동안의 시간·모델 실행·학습효과를 실측한 결과로 소개하지 않습니다.
