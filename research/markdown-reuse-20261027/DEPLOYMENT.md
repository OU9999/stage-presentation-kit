# Markdown 작성 흐름 공개 배포 점검

2026-10-27 · 기능 커밋 `884e390aedbf0d8b3deae9ecb72de881451c61f0`

커밋을 `origin/main`에 푸시했고 [해당 Pages 배포](https://github.com/OU9999/stage-presentation-kit/actions/runs/40481041830)가 성공했다. 기존 main/루트 발행과 `.nojekyll` 설정을 유지했다.

- [발표 모음](https://ou9999.github.io/stage-presentation-kit/presentations/): 두 주제, 각각 발표·읽기 링크를 확인했다.
- [제품 개선 발표](https://ou9999.github.io/stage-presentation-kit/presentations/product-notes/#2)와 [팀 학습 발표](https://ou9999.github.io/stage-presentation-kit/presentations/team-learning/#2): 각각6장, 두 번째 장 진입과 로컬 SVG 로딩을 확인했다.
- [팀 학습 읽기 #2](https://ou9999.github.io/stage-presentation-kit/presentations/team-learning/read.html#2): 390px 읽기6장·H1 6개·표4행, 교차 read 링크와 해당 장 이동, 가로 넘침0을 확인했다.
- code 안 단독 `---`와 줄바꿈이 그대로 남았다. 모음·발표·코드·읽기에서 실행 오류와 Network 실패가 없었다.
- 정적 생성 결과의 공개 파일19개와 루트 runtime/template·기존 스타터6개, 총25개를 HTTP200과 로컬 SHA-256 일치로 대조했다. 생성 marker는 빌드 관리용으로 HTTP 검증 대상에 넣지 않았다.

[HTTP·배포 근거](evidence/deployment.json), [공개 브라우저 근거](evidence/browser-public.json), [로컬 전체 검증](verification.md)을 보관한다. 첫 공개 대기의 일반 selector는 숨겨진 첫 장을 골라 timeout했으므로 활성 장으로 한정했다. 실제 페이지·runtime 문제나 제품 변경을 의미하지 않는다.

이 기록을 담는 후속 커밋은 문서·검증 근거만 바꾸며, 위에서 확인한 제품/정적 파일 바이트는 그대로 유지한다. 원고를 다시 게시할 때에는 [배포 안내](../../DEPLOYMENT.md)에 따라 build한 `presentations/` 전체와 관련 원본을 함께 커밋·푸시한다.
