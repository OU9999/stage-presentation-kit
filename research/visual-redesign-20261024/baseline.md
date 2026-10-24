# Web 시각자료 재설계 기준

기준 커밋은 로컬 `ab96f16`이다. 새 구현 전의 실제 무대 캡처를 복사해 비교 기준으로 보존했다. 모두 논리 무대 1600×900이며 자료·제목·색이 기록된 실제 예제다.

- [퍼널](evidence/before-funnel.png)
- [추세](evidence/before-trend.png)
- [우선순위](evidence/before-matrix.png)
- [히트맵](evidence/before-heatmap.png)

사용자가 지적한 프레임은 `.media-frame`의 border/background와 이미지용 배치에서 생긴다. 현재 도표는 고정 크기 SVG를 이미지로 삽입한다. 기존 출력을 보존하는 것이 이번 재설계의 제한은 아니다.

새 목표는 웹 무대에서의 통합된 도표 배치와 쉬운 재사용이다. PDF·인쇄·페이지 수는 이번 완료 기준에 포함하지 않는다. 팀의 현재 배정·결정·미완료 작업은 루트 `WORK_LOG.md`를 따른다.
