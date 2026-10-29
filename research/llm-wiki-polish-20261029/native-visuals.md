---
title: LLM Wiki 네이티브 시각자료 검수 원본
---

<!-- stage
layout: visual
quiet: true
-->
# 검사 결과를 단위별로 읽는다

```stage
{
  "subtitle": "반영한 8쪽: 기존 5쪽 갱신 + 신규 3쪽 생성",
  "visual": {
    "kind": "composition",
    "labels": ["기존 페이지 갱신", "신규 페이지 생성"],
    "values": [5, 3],
    "unit": "쪽",
    "composition": "wide"
  },
  "source": "별도 검사 · 로컬 링크 25개 확인 · 읽기 메모와 초기 파일 10개 보존"
}
```

---

<!-- stage
layout: visual
quiet: true
-->
# 읽기·질문·점검을 반복한다

```stage
{
  "subtitle": "점검에서 찾은 문제는 다음 읽기와 질문으로 이어집니다.",
  "visual": {
    "kind": "flow",
    "items": ["읽고 엮기 · ingest", "답하고 남기기 · query", "점검하기 · lint"],
    "composition": "wide"
  },
  "source": "Karpathy, LLM Wiki · Operations: 자료를 반영하고 답을 남기고 내용·연결을 점검하는 반복 작업"
}
```
