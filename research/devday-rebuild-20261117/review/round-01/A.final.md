# A round01 최종 — 원본 충실도/형태/자료 표면

**두 발표폭의4장,총8범위 모두 needs-changes다.** 형태가 바뀐 실제 개선은 있지만 원본과 거의 차이 없는 미감은 아직 아니다. 아래의 남은 차이는 의미상 유효/사소함을 이유로 면제하지 않는다. 본편 이행·읽기·사용자 미감 승인은 없다.

## 절차와 실제 범위

[A 초기](A.initial.md)는 SHA256 `96cc7dc07c4a3790087cf300abdd1c2aad1460d81f7fbbf63aefc5da53cb8346`,저장시각2026-11-17 01:47:59.737256UTC로 보존한다. **이 라운드는 root 비노출 독립 초기가 아니다.** PNG 판정 전에 WORK_LOG9행의 현재 관찰 범주를 읽었고 즉시 manager에게 공개했다. A/B 모두 이 노출 한계를 공개했으므로 합치하는 초기 결과를 독립성의 증거로 쓰지 않는다. root 별도문서/제작/QA/B초기는 저장 전에 읽지 않았다.

현재 `evidence/round-01/present-{1920,1280}/slide-01..04.png`8개별과 양폭 contact2보드,공식 Codex1200/90·keynote1440/1500 네 PNG,main04의05/13/15 부정대조 세 PNG를 직접 열었다. 실제 Stage crop은1557×876/917×516이다. source는 `prototypes/talks/first-look/slides.md`,SHA `3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5`이며 두 manifest의 scope1–4/mode/viewport/DPR과 대응했다. source의 임의 폰트명/HEX를 공식값으로 주장하지 않는다.

양 초기 실파일 동결 확인 뒤 [B 초기](B.initial.md)를 직접 읽고 B/manager와 반론했다. 이후 정확 경로가 공개된 [root 후속대조 원문](../../ROOT.round-01.initial.md)을 읽었다. SVG와 현재 native 조판을 읽은 것은 원인·수정 방향을 좁히기 위한 것이며 기술 통과로 판정을 바꾸지 않았다.

## 실제 교정 명세

1. **01 타이포 무게/폭/구두점.** 원본1200은 첫 흰 행이 강하고 아래 주황이 지금처럼 굵은 한글 띠가 아니다. 현재는 주황 획·큰 끝점이 하단을 누르고,전체 덩어리도 좁게 떠 보인다. 주황의 실제 획을 낮추고 두 행의 폭/무게와 광학 중심을 함께 재편집한다. 쉼표/마침표를 그대로 보존하려고 남기는 큰 꼬리도 편집 대상이다.
2. **02 전체 footprint/내부 시각량.** 설명 라벨을 차례로 읽던 main04/05보다 같은 수준의 두 작업창이 즉시 보이는 변화는 있다. 그러나 큰 창이 바깥 여백/가운데 틈을 좁히고,왼쪽 큰 채움판·입력띠와 오른쪽 성긴 문서격자·회색 내부선이 원본90과 다른 무게다. 창·라벨의 전체 크기/위치·바깥/사이 여백과 내부 시각량을 별도로 편집한다. 캡션32를 필수 하한으로 고정할 이유도 없다.
3. **03 기사 질감/인용 편집/표식.** 새 밝은 native 카드와 어두운 기사면은 main04/15의 큰 메모판+인용 병치에서 실제로 달라졌다. 아직 왼쪽 제목/본문이 굵고 성겨 또 하나의 발표문처럼 강하며,오른쪽 첫행 ‘다음 질문의’는 짧은 관형구로 떨어지고 다음행이 길다. 기사 글줄을 더 미세한 자료 질감으로 편집하고 좌우 면의 상대 폭·인용 문구/행폭을 다시 잡는다. 파랑 부호는 현재 사선 두 획처럼 보이므로 실제 곡선형 glyph로 다듬고 부호→본문거리/시작점을 수정 화면에서 같이 확인한다.
4. **04 고유 자료면/그리드.** 단일 확대표 대신 서로 다른 네 고유 자료면이 보이는 변화는 있다. 그러나 full1000×640 자료마다 검정띠/외곽선이 붙어 동일한 재생창 속 작은 미리보기로 보인다. 자료 비율에 셀을 맞춰 이 띠·틀을 없애고,그에 따라 전체그리드 높이/좌측 주장의 상대 크기와 거리를 원본1500에 대조해 조정한다. 단순히 실제자료4개라는 사실로 현재 프레임을 승인하지 않는다.

## 직접 반론에서 고친 처방

- **창 자체 aspect와 무대 점유를 구별했다.** B 초기와 manager의 선행 메시지에 있던 ‘원본보다 세로로 부풀어 더 납작하게’라는 해석에 A가 반론했다. 현재SVG720×420 안 외곽은694×378이며,카메라 원근을 가진 원본 사진의 창 자체 종횡비가 현재보다 더 납작하다고 입증되지 않는다. B는 실제 source/PNG를 다시 읽고 그 주장을 철회했다. root도 이 방향 혼동을 지적했다. **무조건 세로 압축은 수정 명세에서 제외**하고 현재 전체 점유·틈/바깥 여백·내부밀도·캡션으로 반려를 한정한다. 이 정정은 다른 남은02 차이를 해제하지 않는다.
- **03의 대칭/중앙 정렬 금지는 만들지 않았다.** B는 카드 위/아래 여백 비대칭 자체를 별도 하자로 단정한 초기 해석을 철회했다. 원본도 표식이 위에 놓이고 제목이 중앙인 구도를 쓴다. A도 패딩 균등화/왼쪽 제목 좌측정렬을 의무로 삼지 않는다. 실제 기사 무게·거친 인용행·좌우비례·glyph를 고친 뒤 현재 부호/본문의 거리와 시작점을 다시 본다.
- **부호는 코드 문자와 렌더 모양을 구별했다.** 현재CSS content는 이미 열림 인용부호지만 상속 glyph의 실제 모양은 원본의 곡선 표식과 다르다는 A 지적을 B도 재확인했다. 다른 문자 하나를 넣었다는 사실만으로 해제하지 않고 실제 glyph를 본다. 원본의 촬영 빛번짐 복제는 요구하지 않는다.
- **04는 일괄 cover 처방을 제외했다.** B가 초기의 크롭 가능 표현을 정정했다. full자료 비율에 셀/그리드를 맞추는 것을 우선하고,검정띠를 없애려고 필수면을 잘라내는 방식은 자동 채택하지 않는다.

순서는 큰 주장→형태 비교→기사/인용→여러 고유 결과면으로 바뀌기 시작했다. 이 방향 인정이 현재8범위 수용을 뜻하지 않는다. 다음 담당 제작팀은 아래 각 owner/nextAction을 실제 새 입력과 두 폭 PNG로 반환하고,검증팀은 남은 작은 어색함까지 다시 본다. 제품·과거리뷰·WORK_LOG·브라우저·빌드/테스트 쓰기는 하지 않았다.

## 최종8범위 원문

```json
{
  "reviews": [
    {
      "slide": 1,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "sourceSHA": "3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5",
      "status": "needs-changes",
      "reviewer": "/root/devday_verification_manager/art_direction",
      "reviewedAt": "2026-11-17T01:56:00Z",
      "reason": "주황 둘째 행의 획·큰 마침표가 첫 흰 행보다 무거워 두 행이 아래로 눌리고, 전체 글자 덩어리는 원본1200의 넓은 주장보다 좁게 떠 있다. 구두점과 문구·실제 굵기·행폭을 함께 재편집해야 한다.",
      "evidence": [
        "research/devday-rebuild-20261117/evidence/round-01/present-1920/slide-01.png"
      ],
      "owner": "제작 native 조판/원고 담당",
      "nextAction": "native 조판/원고 담당이 주황 strong의 실제 획을 낮추고 문구·구두점·두 행 폭/광학 중심을 재편집한다. 두 발표폭을 원본1200 옆에서 다시 확인한다."
    },
    {
      "slide": 2,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "sourceSHA": "3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5",
      "status": "needs-changes",
      "reviewer": "/root/devday_verification_manager/art_direction",
      "reviewedAt": "2026-11-17T01:56:00Z",
      "reason": "두 창의 전체 무대 점유와 좁은 상대 틈, 왼쪽 큰 답변 채움판/입력띠, 오른쪽 성긴 문서 격자·약한 내부선과 강한 바깥틀이 원본90의 압축된 비교와 다르다. 창 자체를 무조건 납작하게 하라는 근거는 철회하며 footprint/여백/내부밀도·캡션을 구별해 교정한다.",
      "evidence": [
        "research/devday-rebuild-20261117/evidence/round-01/present-1920/slide-02.png"
      ],
      "owner": "제작 비교SVG/배치 담당",
      "nextAction": "비교SVG/배치 담당이 창의 전체 크기·바깥/사이 여백과 왼쪽 채움판·오른쪽 카드/연결선/캡션의 시각량을 편집한다. 창 aspect는 원근이 있는 원본을 임의 숫자 정답으로 삼아 압축하지 않는다. 두 발표폭을 다시 확인한다."
    },
    {
      "slide": 3,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "sourceSHA": "3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5",
      "status": "needs-changes",
      "reviewer": "/root/devday_verification_manager/art_direction",
      "reviewedAt": "2026-11-17T01:56:00Z",
      "reason": "왼쪽 기사 제목/본문의 굵기·행간이 커서 실제 기사 질감보다 설명판이 강하고, 오른쪽 인용의 짧은 관형구 첫행과 긴 다음행이 불균형하다. 좌우면 비례와 사선 두 획처럼 보이는 청색 glyph도 원본1440과 다르다. 정렬·상하 패딩 비대칭 자체를 금지하지 않고 실제 인용 편집과 glyph/간격을 재확인한다.",
      "evidence": [
        "research/devday-rebuild-20261117/evidence/round-01/present-1920/slide-03.png"
      ],
      "owner": "제작 기사자산/native quote-card 담당",
      "nextAction": "기사자산+native quote-card 담당이 왼쪽 제목/본문 굵기·행간/밀도를 낮추고 좌우 비례·인용 문구/행폭·실제 곡선형 인용 glyph를 편집한다. 부호→본문거리/시작점도 수정 실물로 확인하되 임의 패딩 균등화는 하지 않는다."
    },
    {
      "slide": 4,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1920,
        "height": 1080,
        "devicePixelRatio": 1
      },
      "sourceSHA": "3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5",
      "status": "needs-changes",
      "reviewer": "/root/devday_verification_manager/art_direction",
      "reviewedAt": "2026-11-17T01:56:00Z",
      "reason": "1000×640의 네 자료를 더 세로로 긴 셀에 contain해 모든 면 상하에 검정띠와 외곽틀이 생겨 자료보다 프레임이 반복된다. 왼쪽 주장도 상대적으로 무겁다. 자료 전체를 보존하며 셀 비율·그리드 높이/간격·주장 크기를 원본1500에 대조해 교정한다.",
      "evidence": [
        "research/devday-rebuild-20261117/evidence/round-01/present-1920/slide-04.png"
      ],
      "owner": "제작 results 배치 담당",
      "nextAction": "results 배치 담당이 full1000×640 자료 비율에 셀을 맞춰 검정띠·불필요 외곽틀을 없애고 전체그리드/좌측주장의 비례·거리도 재편집한다. cover 일괄 크롭으로 원자료의 필수면을 잃지 않으며 두 발표폭을 다시 확인한다."
    },
    {
      "slide": 1,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "sourceSHA": "3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5",
      "status": "needs-changes",
      "reviewer": "/root/devday_verification_manager/art_direction",
      "reviewedAt": "2026-11-17T01:56:00Z",
      "reason": "주황 둘째 행의 획·큰 마침표가 첫 흰 행보다 무거워 두 행이 아래로 눌리고, 전체 글자 덩어리는 원본1200의 넓은 주장보다 좁게 떠 있다. 구두점과 문구·실제 굵기·행폭을 함께 재편집해야 한다.",
      "evidence": [
        "research/devday-rebuild-20261117/evidence/round-01/present-1280/slide-01.png"
      ],
      "owner": "제작 native 조판/원고 담당",
      "nextAction": "native 조판/원고 담당이 주황 strong의 실제 획을 낮추고 문구·구두점·두 행 폭/광학 중심을 재편집한다. 두 발표폭을 원본1200 옆에서 다시 확인한다."
    },
    {
      "slide": 2,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "sourceSHA": "3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5",
      "status": "needs-changes",
      "reviewer": "/root/devday_verification_manager/art_direction",
      "reviewedAt": "2026-11-17T01:56:00Z",
      "reason": "두 창의 전체 무대 점유와 좁은 상대 틈, 왼쪽 큰 답변 채움판/입력띠, 오른쪽 성긴 문서 격자·약한 내부선과 강한 바깥틀이 원본90의 압축된 비교와 다르다. 창 자체를 무조건 납작하게 하라는 근거는 철회하며 footprint/여백/내부밀도·캡션을 구별해 교정한다.",
      "evidence": [
        "research/devday-rebuild-20261117/evidence/round-01/present-1280/slide-02.png"
      ],
      "owner": "제작 비교SVG/배치 담당",
      "nextAction": "비교SVG/배치 담당이 창의 전체 크기·바깥/사이 여백과 왼쪽 채움판·오른쪽 카드/연결선/캡션의 시각량을 편집한다. 창 aspect는 원근이 있는 원본을 임의 숫자 정답으로 삼아 압축하지 않는다. 두 발표폭을 다시 확인한다."
    },
    {
      "slide": 3,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "sourceSHA": "3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5",
      "status": "needs-changes",
      "reviewer": "/root/devday_verification_manager/art_direction",
      "reviewedAt": "2026-11-17T01:56:00Z",
      "reason": "왼쪽 기사 제목/본문의 굵기·행간이 커서 실제 기사 질감보다 설명판이 강하고, 오른쪽 인용의 짧은 관형구 첫행과 긴 다음행이 불균형하다. 좌우면 비례와 사선 두 획처럼 보이는 청색 glyph도 원본1440과 다르다. 정렬·상하 패딩 비대칭 자체를 금지하지 않고 실제 인용 편집과 glyph/간격을 재확인한다.",
      "evidence": [
        "research/devday-rebuild-20261117/evidence/round-01/present-1280/slide-03.png"
      ],
      "owner": "제작 기사자산/native quote-card 담당",
      "nextAction": "기사자산+native quote-card 담당이 왼쪽 제목/본문 굵기·행간/밀도를 낮추고 좌우 비례·인용 문구/행폭·실제 곡선형 인용 glyph를 편집한다. 부호→본문거리/시작점도 수정 실물로 확인하되 임의 패딩 균등화는 하지 않는다."
    },
    {
      "slide": 4,
      "mode": "presentation-stage-only",
      "viewport": {
        "width": 1280,
        "height": 720,
        "devicePixelRatio": 1
      },
      "sourceSHA": "3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5",
      "status": "needs-changes",
      "reviewer": "/root/devday_verification_manager/art_direction",
      "reviewedAt": "2026-11-17T01:56:00Z",
      "reason": "1000×640의 네 자료를 더 세로로 긴 셀에 contain해 모든 면 상하에 검정띠와 외곽틀이 생겨 자료보다 프레임이 반복된다. 왼쪽 주장도 상대적으로 무겁다. 자료 전체를 보존하며 셀 비율·그리드 높이/간격·주장 크기를 원본1500에 대조해 교정한다.",
      "evidence": [
        "research/devday-rebuild-20261117/evidence/round-01/present-1280/slide-04.png"
      ],
      "owner": "제작 results 배치 담당",
      "nextAction": "results 배치 담당이 full1000×640 자료 비율에 셀을 맞춰 검정띠·불필요 외곽틀을 없애고 전체그리드/좌측주장의 비례·거리도 재편집한다. cover 일괄 크롭으로 원자료의 필수면을 잃지 않으며 두 발표폭을 다시 확인한다."
    }
  ]
}
```

A/B의 직접 반론 뒤 남은 판정 이견은 없다. 이는 새 미감 합격이 아니라 현재 반려/수정 방향의 인계다. root/manager가 최종 범위를 인수한 뒤만 다음 제작을 시작하며, A는 두 소유파일의 검사/인계 후 writer를 종료한다.

