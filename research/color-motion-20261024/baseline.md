# 개선 전 기준

- 확인일: 2026-10-24. 로컬 저장소 `/Users/ou9999/Documents/stage-presentation-kit`.
- 실행: 프로젝트 루트의 `python3 -m http.server 4317 --bind localhost`; 기존 4317 리스너가 없음을 확인하고 시작했다.
- 화면: ego-browser TaskSpace 2, 총괄 전용 p1. 1440×1000 CSS 픽셀에서 루트 6·7·8·9·15장을 캡처했다.
- 기준 이미지: [문장](evidence/before-statement.png), [범주](evidence/before-categories.png), [발표자](evidence/before-speaker.png), [차트](evidence/before-chart.png), [수치](evidence/before-metric.png).
- 캡처 보정: 디자인 매니저가 최초 일부 캡처의 전환 중 투명도를 지적했다. 제품 수정 전에 5장을 모두 `document.getAnimations()` 종료 조건까지 기다려 다시 캡처했다. 전 장 opacity 1·실행 중 효과 0과 동일 viewport를 [기준 캡처 기록](evidence/before-capture.json)에 남겼다. 개선 후에도 같은 완료 조건으로 비교한다.
- 현재 강조색: orange `#f2925e`, purple `#b59af5`, blue `#73b9eb`, green `#82cc99`, yellow `#e9cd72`. 이는 STAGE 구현값이며 원본 DevDay의 공식 토큰이 아니다.
- 현재 전환: `.slide.is-active`의 240ms 투명도 애니메이션. 시스템의 모션 줄이기에는 기존 CSS로 대응한다.
- 기존 자동 테스트: `node --test tests/*.test.cjs` 163개 통과, 실패·취소·skip 0.
- 관찰과 판단: 사용자는 실제 DevDay와 강조색이 다르게 보인다고 지적했다. 원본 비교 전에는 차이의 원인을 특정 색상값으로 단정하지 않는다.

이 파일은 기준과 검증 근거이며 팀 목표·담당자·미완료 작업·결정의 단일 기록은 루트 `WORK_LOG.md`다.
