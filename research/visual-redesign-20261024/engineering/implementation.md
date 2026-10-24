# Native visual 구현 인계

2026-10-24 · 취합 `/root/engineering_manager/authoring_engineer`

[실제 12장 발표](../../../examples/visual-story/index.html)는 직접 수정하는 content.js와 여덟 종류의 native visual을 사용한다. 사진 프레임·고정 SVG 생성·예제 전용 JSON 스키마·직접 SVG 파서를 주 사용 경로에서 제거했다. 기존 19개 레이아웃과 visual을 합쳐 20개를 지원한다. PDF 버튼·현재 사용 안내의 PDF 링크를 제거했고 이전 PDF와 연구 이력은 보존했다.

## 실무와 소유권

- `/root/engineering_manager/runtime_engineer`: app·모델·공통 visual.js/CSS·숫자/배열/참조 진단·JSON 편집·현재 표 동작·관련 회귀. [런타임 구현 기록](runtime-implementation.md).
- `/root/engineering_manager/authoring_engineer`: root HTML, compiler·선택형 일괄 갱신·직접 원본 예제/표·독립 실행 스타터, 갤러리·현재 작성 가이드, 옛 전용 생성기/검사 정리와 새 직접 작성 회귀·이 취합.

두 실무자는 로드 순서와 `StageVisual.render/renderTable/renderDataPage`·`STAGE_MODEL.validateVisual/visualSeries`를 직접 합의하고 상대 연결을 검토했다. 공통 코드 편집 종료를 받은 뒤 작성 담당 한 명만 최종 HTML 참조·해시·스타터 runtime 복사를 갱신했다.

## 사용자 흐름

`content.js`를 바꾸고 index.html을 새로고침한다. 주제마다 HTML·CSS·SVG를 수정하거나 설치·빌드하지 않는다. 큰 강조값은 focus가 가리키는 자료에서 계산하며 별도 숫자 사본을 쓰지 않는다. 예제는 공유 상수에서 관련 값을 계산하지만 독립 장 하나에는 해당 visual만 넣으면 된다. 기존 다섯 Markdown 원고는 선택형으로 보존했다.

[실행 스타터](../../../examples/visual-starter/index.html)는 폴더 전체를 다른 위치에 복사하면 `file://`로 동작한다. runtime/에 공통 다섯 파일을 포함한다. [한 파일 스타터](../../../examples/visual-starter.js)·[사용 안내](../../../examples/visual-starter/README.md)도 연결했다. 선택형 build-examples는 직접 content.js를 덮어쓰지 않고 HTML 참조만 갱신한다.

JSON 편집을 적용하면 현재 발표의 plot·강조값·읽기 표가 함께 바뀐다. 상단 **표**와 도움말의 현재 표 링크는 현재 편집값의 읽기 표로 이동한다. 별도 data.html은 디스크의 같은 content.js를 읽으며 임시 브라우저 저장을 다른 페이지에 자동 공유하지 않는다. 별도 표에 반영할 때는 내보낸 content.js로 교체한 뒤 새로고침한다. 닫는 장은 파일에 보관한 원본 표임을 표시한다.

## 실제 검증

- 전체 자동 검사 **185/185 통과**, 실패·취소·skip 0. 무관한 기존 검사는 보존했고 고정 스키마 13개 검사를 새 직접 작성 계약 7개로 교체했다. 런타임의 새 회귀는 10개다.
- 직접 원본 불변 갱신, standalone 복사·폴더 내부 참조·runtime 다섯 파일 일치, 원본 객체를 JSON clone하기 전 Infinity/NaN/누락 입력 진단과 이전 HTML 보존, 선택형 visual Markdown, 기존 다섯 원고 불변·결정적 생성을 검사했다.
- [생성 근거](evidence/authoring-build.json): 여섯 발표 47장·모델 진단 0, 선택형 갱신 19출력의 두 번 생성 결과 동일, root·기존 다섯 Markdown·직접 원본의 갱신 중 변경 0.
- [정합 근거](evidence/authoring-links.json): root·예제·표·스타터·갤러리의 로컬 HTML 참조 82개 누락 0, query hash 불일치 0, 현재 가이드 링크 누락 0. Node 구문·공백 검사 통과.
- 매니저가 독립 실행한 전체 185검사와 protected13파일 변경 0·복사 runtime 다섯 SHA 일치를 전달받았다. 실제 편집·내보내기·발표자·모바일·키보드 웹 검수는 매니저·총괄의 별도 근거로 구분한다. 작성 담당은 이번 단계 브라우저를 조작하지 않았다.

| 최종 공통 파일 | SHA-256 앞 12자리 |
| --- | --- |
| app.js | `7e774f101b16` |
| styles.css | `66752a982bf1` |
| deck-model.js | `398ae06f5ea5` |
| visual.js | `8b6c81cb0cf7` |
| visual.css | `a135350a6268` |

제품·원고·생성물·작성 안내는 편집 종료했다. 이 취합 문서도 매니저에게 소유권을 인계한다. 추가 생성이나 제품 변경을 수행하지 않는다. WORK_LOG·Git·최종 PNG·비교 페이지는 총괄 소유이며 이 실무에서 수정하지 않았다.
