# B 최종 실물 판정 — round-01

2026-11-17T01:53:43Z · B `/root/devday_verification_manager/tooling_integrator` · gpt-6.1-sol / xhigh. **1920·1280 각 1–4, 총 8범위 모두 `needs-changes`.** 본편 main04의 반려도 그대로다. 역할이 달라졌고 설명층이 줄었다는 상대 개선을 원본 수준의 완성도로 승인하지 않는다.

## 범위·절차

원고 [slides.md](../../prototypes/talks/first-look/slides.md)의 현재·동결 SHA256은 `3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5`. 두 manifest 모두 같은 revision·`presentation-stage-only`, 1920×1080/1280×720·DPR1·scope1–4다. 실제 Stage PNG는 1557×876/917×516이다. 숫자는 판정의 현재성을 식별하며 미감 통과 근거가 아니다.

실제 직접 열람: 새 8개별, 양폭 contact 2개; 공식 보관 seek Codex1200/90초·Keynote1440/1500초 4개; main04 부정 대조 05/13/15 세 개. 초기 뒤 1920/02·03와 공식1440을 다시 단독 대조하고, 두 창 SVG·기사 SVG 및 동결 blocks.css의 quote-card 규칙을 읽었다. 동작·읽기·새 영상 전편·본편 20장 승인은 범위 밖이다. QA/svg-metrics로 아래 반려를 해제하지 않았다.

**root 비노출 독립검수라고 보고하지 않는다.** [B.initial.md](B.initial.md)에 기록했듯 새 실물 전 WORK_LOG 1–14행에서 root의 현재 문제 범주에 노출되었다. viewport 확인용 manifest 출력의 부수 진단 필드 노출도 기록했다. 해당 범주를 B의 독립 최초 발견으로 주장하지 않는다. 초기 SHA `29bf3856c957387285e1ced6f327bb1d1ec69c831dd30c974437293ab3c72775`, mtime 2026-11-17T01:47:34.783907Z를 보존한다. 양 초기 실제 동결 확인을 받은 뒤만 [A.initial.md](A.initial.md)와 root 초기 문서를 읽고 아래 반론을 교환했다.

## 남은 하자와 제작 반환

**B1 / 선언:** 흰 첫 행과 주황 둘째 행의 획 무게가 크게 다르고, 주황 문장과 굵은 마침표가 아래·오른쪽으로 무게를 모은다. [원본1200](../../../devday-fidelity-20261116/evidence/official-XkKdbPhIvbY-1200.png)은 흰 행보다 더 무거운 주황 띠가 되지 않는다. 현재 두 행 전체의 폭도 원본의 넓게 뻗는 주장보다 작은 중앙 묶음으로 보인다. 원고/native 조판 담당은 strong에 따른 무게를 낮추고 전체 행폭·문구·쉼표와 마침표까지 함께 편집한다. 부호 삭제나 특정 weight 수치는 자동 정답이 아니다. 두 폭에서 획·행폭·광학 중심·끝 부호를 다시 봐야 한다.

**B2 / 작업창:** 두 창이 화면을 가로로 많이 차지하고 창 사이 상대 여백이 좁다. 왼쪽 큰 답변 채움판·검색 캡슐·길게 반복되는 회색 선과 오른쪽 성긴 문서 격자는 [원본90](../../../devday-fidelity-20261116/evidence/official-XkKdbPhIvbY-90.png)의 압축된 내부 요소와 다른 무게다. 창 머리 세 점·외곽 모서리·라벨 중심은 정렬돼 있으나 이 국소 정렬로 전체 크기와 내부 시각량을 승인하지 않는다. 비교 자산 담당은 두 창의 전체 점유와 사이/바깥 여백, 왼쪽 채움 면적·선 길이, 오른쪽 카드/연결선·아이콘의 상대 크기·선 대비를 함께 편집한다. 내부 회색 카드선/연결선이 바깥 흰 프레임에 비해 약한 모습도 1280에서 재확인한다. 아이콘 수·원본 로봇 복제·모든 선의 같은 두께를 요구하지 않는다.

**B3 / 기사와 인용:** 왼쪽 제목/본문이 밝고 두꺼우며 큰 행간으로 떨어져, 기사 질감보다 또 하나의 설명문판이 된다. 오른쪽 인용은 짧은 관형구 ‘다음 질문의’에서 시작해 긴 둘째 행으로 갑자기 넓어져 문장 호흡과 실루엣이 고르지 않다. 파란 부호는 실제로 곡선 인용표식보다 두 사선 조각처럼 보인다. 동결 blocks.css의 `blockquote::before`가 `content:"“"`와 상속 글꼴로 표시되며, 문자가 인용부호라는 사실만으로 실제 모양을 면제하지 않는다. [원본1440](../../../devday-fidelity-20261116/evidence/official-Fls_onRviPM-1440.png)의 연속된 기사와 선택 인용의 다른 무게를 보며 기사 제목/본문의 굵기·행간·밀도와 좌우 면의 폭·거리를 다시 편집한다. 문구 요약·재작성으로 인용의 행폭/호흡을 정돈하고 실제 곡선형 표식이 보이도록 glyph 또는 국소 표식을 교정한다. 원본 공식 폰트의 정체나 정확 HEX는 확인하지 않았으며 복제 값을 추정하지 않는다. 새 glyph·문구 뒤 부호의 왼쪽 시작, 첫 본문 시작, 부호→본문 거리·카드 내부 여백/반경을 함께 재관측한다. 제목 중앙 정렬 자체, 특정 줄 수, 본문 전문은 강제하지 않는다.

**B4 / 실제 결과면:** 현재 네 셀의 상하 검정 띠와 가는 외곽선이 자료를 미리보기 재생창처럼 둘러싼다. 1280에서는 자료가 더 작게 물러난다. [원본1500](../../../devday-fidelity-20261116/evidence/official-Fls_onRviPM-1500.png)의 실제 면이 직접 놓인 인상과 다르다. results 배치 담당은 **1000×640 전체 자료 비율에 맞는 셀/그리드 비례**를 선택해 빈 띠·불필요한 외곽 틀을 없애고 그리드 높이·간격과 왼쪽 주장의 상대 크기를 다시 편집한다. 무조건 cover로 잘라 제목이나 핵심 표면을 잃는 처방을 요구하지 않는다. 네 자료를 골랐다는 사실이나 고유색 존재도 현재 프레임 결함의 면제 사유가 아니다. 네 자료의 실제 표면/가장자리·제목의 굵기·왼쪽 문장과의 무게를 두 폭에서 다시 본다.

## 직접 반론·정정과 합의

- A의 02 반론을 수용한다. B 초기의 ‘원본보다 세로로 부푼 창/원본이 더 납작’은 창 자체 종횡비를 입증한 표현이 아니었다. 현재 SVG 외곽 694×378과 원근이 있는 공식 영상의 창을 혼동했다. **초기의 그 주장과 창을 세로 압축하라는 처방을 철회한다.** 현재 반려는 위 B2의 화면 점유·상대 여백·내부 시각량이다. manager/root도 같은 구분을 인수했다. 수동 픽셀 근사를 원본 정답 비율로 삼지 않는다.
- A의 03 부호 반론을 실제 PNG와 CSS에서 확인하고 B3에 추가했다. 반대로 B 초기의 ‘상단보다 하단 여백이 얕다’는 관찰을 독립 하자로 단정한 것은 철회한다. 원본도 위에 인용부호가 있는 비대칭 카드다. **패딩 균등화 자체는 수정 명세가 아니다.** 새 문구/부호 뒤의 실제 균형을 다시 본다. A도 이 정정과 중앙 제목 금지 제외에 동의했다.
- B가 04의 무조건 크롭/cover 처방 가능성을 걷어내고 전체 자료 비율에 셀을 맞추는 명세로 좁혔으며 A/manager가 동의했다. 원본과 다른 사진이나 아이콘을 추가하라는 지시가 아니다.
- manager의 01 무게/끝 점, 03 굵은 기사/짧은 관형구 첫 행, 02 점유·틈, 04 띠·틀 반론은 같은 현재 실물에서 확인했다. [root 후속 초기 문서](../../ROOT.round-01.initial.md)도 양 동결 이후 읽었으며, 원본 대비 부호/비례를 다시 볼 것과 04 cover 자동 채택 금지에 동의한다. 원본의 촬영 빛번짐 효과를 재현할 의무는 없다.
- 실패한 main04의 긴 절차 예문판·거대한 한 행 표·큰 발췌판을 다시 직접 보았다. 이번에는 주장→작업창→기사/인용→고유 자료로 실재하는 형태 변화가 생겼다. 하지만 01의 굵은 하단, 02의 큰 내부 판, 03의 무거운 기사와 거친 인용, 04의 반복 액자는 여전히 남는다. 이를 ‘의미가 읽힘/역할이 있음/이전보다 나음’으로 통과시키지 않는다. 자작 자료를 실제 UI로 바꾸거나 전문을 지우는 것 자체가 해법도 아니다.

[A.final.md](A.final.md) 전문과 8개 reason/owner/nextAction을 직접 읽어 현재 8범위 반려·02/03 처방 정정·04 전체 자료면 보존과 실제 열람 경계가 일치함을 확인했다. 현재 핵심 이견은 없다. 이것은 노출된 두 초기의 합치를 독립성이나 품질의 증거로 삼는 결론이 아니다.

다음 담당은 root가 재개할 제작팀의 native 조판/비교 SVG/기사·인용/results 배치 담당이다. 수정 가능 범위는 문구 선택·요약·생략·순서·구도까지 포함한다. 기존 문구·상자·한 행·전문을 보존하는 계약으로 다시 좁히지 않는다. 변경한 source/runtime/자산에 대응하는 새 두 폭 4장과 보드에서 **남은 하자의 해소와 새 어색함까지** 재판단해야 한다. 현재 반려를 계획된 수정으로 올리지 않으며 본편·읽기 승인으로 확대하지 않는다.

## 현재 8범위 원문

각 evidence는 실제 직접 열람한 저장소 상대 PNG다. owner는 다음 제작 역할이며 아직 수정이 완료되지 않았다.

```json
{
  "reviews": [
    {"slide":1,"mode":"presentation-stage-only","viewport":{"width":1920,"height":1080,"devicePixelRatio":1},"sourceSHA":"3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5","status":"needs-changes","reviewer":"B / tooling_integrator","reviewedAt":"2026-11-17T01:53:43Z","reason":"B1: 주황 둘째 행의 과한 획·면적과 굵은 마침표가 아래/오른쪽으로 무게를 모으며 두 행 전체 폭도 원본의 넓은 주장과 다르다.","evidence":["research/devday-rebuild-20261117/evidence/round-01/present-1920/slide-01.png"],"owner":"제작 원고/native 조판 담당","nextAction":"주황 strong·전체 행폭·문구/구두점을 함께 편집하고 원본1200과 획·광학 중심을 재관측한다."},
    {"slide":2,"mode":"presentation-stage-only","viewport":{"width":1920,"height":1080,"devicePixelRatio":1},"sourceSHA":"3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5","status":"needs-changes","reviewer":"B / tooling_integrator","reviewedAt":"2026-11-17T01:53:43Z","reason":"B2: 두 창의 큰 전체 점유·좁은 사이 여백, 왼쪽 큰 채움판/긴 선과 오른쪽 성긴 카드 격자가 원본90의 압축된 비교와 다르다. 창 자체가 더 세로라는 초기 주장은 철회했다.","evidence":["research/devday-rebuild-20261117/evidence/round-01/present-1920/slide-02.png"],"owner":"제작 비교 SVG 담당","nextAction":"전체 크기/사이·바깥 여백과 내부 판·카드·선·아이콘의 상대 무게를 함께 편집한다. 세로 압축을 정답으로 삼지 않는다."},
    {"slide":3,"mode":"presentation-stage-only","viewport":{"width":1920,"height":1080,"devicePixelRatio":1},"sourceSHA":"3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5","status":"needs-changes","reviewer":"B / tooling_integrator","reviewedAt":"2026-11-17T01:53:43Z","reason":"B3: 왼쪽 굵고 성긴 기사 조판과 오른쪽 짧은 관형구 첫 행/긴 둘째 행이 경쟁하며 파랑 부호가 두 사선처럼 보인다. 상하 패딩 비대칭 자체의 하자 단정은 철회했다.","evidence":["research/devday-rebuild-20261117/evidence/round-01/present-1920/slide-03.png"],"owner":"제작 기사 자산/native 인용 담당","nextAction":"기사 무게·좌우 비례, 인용 문구/행폭·곡선 부호를 편집한 뒤 시작점·부호 간격·내부 여백을 실제 화면에서 재관측한다."},
    {"slide":4,"mode":"presentation-stage-only","viewport":{"width":1920,"height":1080,"devicePixelRatio":1},"sourceSHA":"3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5","status":"needs-changes","reviewer":"B / tooling_integrator","reviewedAt":"2026-11-17T01:53:43Z","reason":"B4: 네 자료면의 상하 검정 띠·외곽선이 반복 액자를 만들어 자료 표면이 작게 물러나고 왼쪽 주장과 무게도 갈린다.","evidence":["research/devday-rebuild-20261117/evidence/round-01/present-1920/slide-04.png"],"owner":"제작 results 배치 담당","nextAction":"1000×640 전체 자료 비율에 셀/그리드를 맞춰 빈 띠·틀을 없애고 자료면·그리드 간격/높이와 왼쪽 문장 비례를 재편집한다."},
    {"slide":1,"mode":"presentation-stage-only","viewport":{"width":1280,"height":720,"devicePixelRatio":1},"sourceSHA":"3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5","status":"needs-changes","reviewer":"B / tooling_integrator","reviewedAt":"2026-11-17T01:53:43Z","reason":"B1: 축소판에서도 주황 하단이 흰 행보다 뭉치고 끝 마침표가 큰 점으로 남아 전체 문장 무게가 고르지 않다.","evidence":["research/devday-rebuild-20261117/evidence/round-01/present-1280/slide-01.png"],"owner":"제작 원고/native 조판 담당","nextAction":"수정한 두 행의 획·행폭·광학 중심·끝 부호를 현재1280 실물에서 다시 본다."},
    {"slide":2,"mode":"presentation-stage-only","viewport":{"width":1280,"height":720,"devicePixelRatio":1},"sourceSHA":"3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5","status":"needs-changes","reviewer":"B / tooling_integrator","reviewedAt":"2026-11-17T01:53:43Z","reason":"B2: 큰 왼쪽 채움판과 성긴 오른쪽 문서 격자가 남고 내부 회색 선/연결선은 흰 외곽보다 약해진다. 창의 전체 크기/사이 여백도 재편집이 필요하다.","evidence":["research/devday-rebuild-20261117/evidence/round-01/present-1280/slide-02.png"],"owner":"제작 비교 SVG 담당","nextAction":"전체 배치와 내부 시각량을 편집하고 작은 선·기호·외곽의 균형 및 라벨까지1280에서 재확인한다."},
    {"slide":3,"mode":"presentation-stage-only","viewport":{"width":1280,"height":720,"devicePixelRatio":1},"sourceSHA":"3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5","status":"needs-changes","reviewer":"B / tooling_integrator","reviewedAt":"2026-11-17T01:53:43Z","reason":"B3: 왼쪽 여러 굵은 문단과 오른쪽 들쭉날쭉한 인용행·사선 부호가 자료와 확대 인용의 주종을 흐린다.","evidence":["research/devday-rebuild-20261117/evidence/round-01/present-1280/slide-03.png"],"owner":"제작 기사 자산/native 인용 담당","nextAction":"기사와 인용을 함께 재편집하고 glyph·문장 호흡·행 길이/시작점·카드 내부 간격을1280 실물에서 재관측한다."},
    {"slide":4,"mode":"presentation-stage-only","viewport":{"width":1280,"height":720,"devicePixelRatio":1},"sourceSHA":"3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5","status":"needs-changes","reviewer":"B / tooling_integrator","reviewedAt":"2026-11-17T01:53:43Z","reason":"B4: 네 자료에 붙은 검정 띠/외곽 틀이 작은 자료면을 더 물러나게 만들어 고유 표면보다 반복 프레임이 남는다.","evidence":["research/devday-rebuild-20261117/evidence/round-01/present-1280/slide-04.png"],"owner":"제작 results 배치 담당","nextAction":"자료 전체 비율을 보존해 띠·틀 없는 셀로 편집하고 네 면/제목과 왼쪽 문장의 실제 크기·간격을1280에서 다시 본다."}
  ]
}
```
