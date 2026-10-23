/* Copy this file's contents into the repository-root content.js, then open index.html.
 * Change only text, values and the photo path to start. No Node.js or icon keys needed.
 * Paths below are relative to root index.html. This is a fictional release review.
 */
window.PRESENTATION = {
  id: "my-release-review",
  title: "이번 릴리스에서 배운 것",
  theme: "stage",
  speaker: "발표자 이름",
  footer: "RELEASE REVIEW",
  slides: [{
    layout: "bento", preset: "seoul", variant: "editorial", quiet: true,
    items: [
      { type: "metric", value: "18", unit: "건", label: "살펴본 의견", tone: "blue" },
      { type: "media", src: "assets/photos/write.jpg", alt: "의견을 기록하는 장면의 스톡 사진", caption: "다음 개선의 출발점", fit: "cover", focalPoint: "42% 43%" },
      { type: "metric", value: "4", unit: "가지", label: "찾아낸 문제", tone: "orange" },
      { type: "artifact", kind: "cover", label: "A RELEASE REVIEW", title: ["Release", "Notes."], subtitle: "의견을 다음 실험으로.", footer: "의견 / 문제 / 다음 실험", edition: "TEAM EDITION" },
      { type: "artifact", kind: "quote", label: "사용자 의견", text: "어디서\n시작하나요?" },
      { type: "artifact", kind: "waveform", label: "대화에서 배운 점", text: "말 뒤의 맥락도\n함께 살펴보기." },
      { type: "artifact", kind: "concepts", items: ["진입", "선택", "완료"], caption: "찾아낸 문제 중 일부" },
      { type: "artifact", kind: "task", title: "다음 실험", progress: "1 / 2", text: "첫 안내 문장 바꾸기" },
      { type: "artifact", kind: "report", number: "01", label: "이번 릴리스의 발견", title: "첫 시작의 어려움", items: ["조건이 보이지 않는다.", "선택 기준이 어렵다.", "완료 상태가 모호하다."] },
      { type: "metric", value: "2", unit: "개", label: "다음에 해볼 실험", tone: "purple" },
      { type: "artifact", kind: "process", title: "작게 바꾸고 확인하기", items: ["의견", "실험", "확인"] },
      { type: "artifact", kind: "actions", title: "팀에서 정한 일", items: ["새 안내 문장 시험하기", "완료 화면 다시 보기"] }
    ],
    source: "양식 설명용 가상 의견·수치·UI · Pexels 스톡 사진",
    notes: "각 숫자는 서로 다른 작업 단위이며 전환율을 뜻하지 않습니다. 파형과 과정은 개념도입니다. 스톡 사진은 실제 사용자나 팀을 뜻하지 않습니다. 사진 credit: assets/CREDITS.md. 도형·파형·아이콘은 공통 렌더러가 그리므로 직접 작성할 필요가 없습니다."
  }]
};
