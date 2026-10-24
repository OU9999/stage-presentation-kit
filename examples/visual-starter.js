/* Copy this file as content.js beside the shared runtime. Open index.html. */
window.PRESENTATION = {
  id: "visual-starter-support-review",
  title: "지원 경험을 돌아보는 작은 실험",
  theme: "stage",
  footer: "다른 주제의 가상 예시",
  slides: [
    {
      id: "support-trend", layout: "visual", title: "일곱 번의 관찰, 다음 질문.",
      subtitle: "지원 과업 완료율 · 같은 과업의 관찰 비율",
      visual: {
        kind: "line", labels: ["1주", "2주", "3주", "4주", "5주", "6주", "7주"],
        numerators: [78, 91, 91, 112, 111, 135, 136], denominators: [120, 140, 130, 160, 150, 180, 170],
        unit: "%", focus: 6, emphasis: "focus", composition: "wide"
      }
    },
    {
      id: "support-topics", layout: "visual", title: "문의는 어디에 모였을까요?",
      visual: { kind: "composition", labels: ["탐색", "작성", "공유", "설정", "기타"], values: [8, 12, 10, 6, 4], unit: "건", focus: 1, emphasis: "focus", composition: "split" }
    },
    { id: "support-flow", layout: "visual", title: "요청에서 답변까지.", visual: { kind: "flow", items: ["요청 접수", "답변 완료"] } }
  ]
};
