# 실제 DOM/CSS 시안 인계

2026-10-24 · 디자인 매니저 `/root/design_manager`

[8종 검토 화면](index.html)과 [최종 이식 사양](final-spec.md)을 인계한다. 정량 실무자 `/root/design_manager/quantitative_designer`와 시스템 실무자 `/root/design_manager/systems_plot_designer`가 각자 실제 JS/CSS를 작성하고 상대 코드·공유 API를 직접 검토했다. 두 실무자 모두 편집 종료했다.

- 공통: `shared.js/css`, 매니저 작성. 열린 wide/split 무대, native 제목·자동 hero·읽기 표를 조립한다.
- 정량: `quantitative.js/css`의 `VisualQuantitative.render(visual)`, line/bars/composition/funnel.
- 시스템: `systems.js/css`의 `VisualSystems.render(visual)`, flow/matrix/timeline/heatmap.
- 반환값: `{plot:HTMLElement, hero:{value,unit,label}|null, table:{caption,headers,rows}}`. 자료를 다른 원고에 복사하지 않고 같은 입력에서 그림·큰 값·표를 만든다. 필요한 SVG는 inline DOM이고 이미지 프레임·불투명 전체 배경을 거치지 않는다.

매니저는 기존 TaskSpace 9의 p3에서 desktop 1440px·390px를 한 번 확인했다. [브라우저 근거](evidence/generic-browser.json)의 8종 모두 plot과 표가 표시됐고 native 제목·hero의 무대 이탈 0, 본문 가로 넘침 0이었다. mobile 표는 16px이며 입력과 같은 행을 보존한다. [대표 흐름](evidence/generic-4.png)·[히트맵](evidence/generic-7.png) 등 8종 캡처를 직접 열어 확인했다. 확대된 경계 QA·제품 저장/내보내기는 후속 구현에서 수행한다.

`review.js`에는 7점 추세·5범주·signed bar·5단계 퍼널·같은 좌표 matrix·17주 일정·2×5 히트맵과 2단계/null gap/합계0 추가 입력이 있다. 현재 시안의 모든 경계 사례를 완벽 검증했다고 주장하지 않는다.

실제 제품 튜닝은 다음을 반영한다. 흐름 라벨은 1600 무대에서 약 32–36px 이상으로 키우고 2개 단계면 더 크게 쓴다. matrix는 넓은 plot과 충분한 직접 라벨 크기를 먼저 쓰며 충돌 fallback 때문에 다시 작은 그림+목록으로 고착하지 않는다. 프로토타입의 고정 색은 제품의 `--slide-bg/text/muted/line`과 tone으로 연결한다. 시안의 가벼운 숫자 정규화를 제품 검증으로 복사하지 않고 모델에서 유한 숫자·배열 대응·분모/참조를 진단한다.

공통 runtime·제품 원고·WORK_LOG는 수정하지 않았다. PDF·인쇄를 검사하거나 유지 기준으로 삼지 않았으며 새 실무자의 브라우저 탭은 없다. 매니저 p3만 총괄 종료용으로 남긴다. 엔지니어링 매니저에게 코드 API·테마/라벨 튜닝·편집 잠금을 직접 통지했고 디자인팀은 편집 종료한다.
