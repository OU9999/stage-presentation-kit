# 이번 검수 근거를 재현할 때

현재 승인 근거는 발표 `round-01/present-*`, 읽기 `round-03/read-*`다. `round-01/read-*`와 `round-02/read-*`는 반려한 이력이다. 같은 제품 입력이라는 이유로 실패한 PNG를 승인 근거로 재사용하지 않는다.

- root 소유의 단일 Ego TaskSpace23/p1에서 실행했다. 이 ID는 이번 세션의 소유권이며 다음 작업에서 자동 재사용할 대상이 아니다.
- 정적 사이트를 먼저 빌드했다. 로컬 QA는 `serve-qa.py`로4330에 제공한다. `.txt`는 프로젝트 정식 서버와 같은 `text/plain; charset=utf-8`이며 원본을 바꾸지 않는다.
- `capture-request.json`은 `{round,mode,width,height}`다. 발표는 `capture-round.mjs`, 읽기는 **`capture-reading-tiles.mjs`**를 `ego-browser nodejs`로 실행한다. 전자의 full-page 읽기 분기는 초기 실패 재현용 이력이며 최종 근거 생성에 사용하지 않는다.
- 읽기는 모든 이미지의 `complete && naturalWidth > 0`를 확인하고 실제 viewport 전체 원본을 저장한다. sticky 도구막대 사이 픽셀을 로컬에서 crop/접합하며 원본·좌표·입력 hash를 보존한다. `make-boards.py`가 조각 대응과 크기를 검사하고26장/보드를 만든다.
- 캡처 직후 원본을 직접 열어 제목·이미지·조각 경계를 확인한다. manifest·정상 종료만으로 화면 대응을 인정하지 않는다.
- 클릭은 현재 장·스크롤 정착을 확인한다. 마지막 장은 문서 끝에서 스크롤이 제한되므로 모든 장의 top을 같은 값으로 강제하지 않는다. 긴 절은 시작·끝, 긴 코드/표는 실제 스크롤의 좌·중·우와 끝 행을 확인한다.
- `check-reading-actions.mjs`의 최종 근거는 round-03의18회 왕복이다. 공통 화면/코드/원본 SVG는 `check-common-and-originals.mjs`와 그 뒤 보강한 실제 사진 근거를 대응한다. 자동 키입력의 일부 이동과 전체 표 접근을 구별하며, 최대262 도달의 실제 입력은 가로 wheel이었다.
- 검토자가 직접 작성한 네 `*.reviews.json`을 동결한 후에만 `assemble-reviews.cjs`로 기계 결합한다. 상태·검토자·사유를 새로 생성하지 않는다. 최종 각 기록의 `--require-approved` 성공은 명시한 입력·화면 범위에만 적용한다.

제품의 시각 판단은 루트 [DESIGN.md](../../DESIGN.md), 완료 기록은 [RESULT.md](RESULT.md)를 따른다. 이 노트는 이번 캡처 실패를 반복하지 않기 위한 운영 근거이며 새 전역 디자인 규칙이 아니다.
