# 구현 매니저 독립 검수

2026-10-28. 현재 목표·담당·결정은 [WORK_LOG](../../../WORK_LOG.md)에서 관리한다. 이번 작업은 앞선 감사를 반복하는 대신 일반 Markdown의 기본 조판·사진·그리드·색을 실제로 연결하는 제품 구현이다. 이전 감사 자료는 보존한다.

## 배정과 실제 계약

디자인 매니저와 `stage-slide`/`stage-group`, `renderSlide`, 원고 순서의 DOM과 읽기 복원, 기본 자동 조판과 작은 선택을 직접 합의했다. 디자인 실무자와 매니저의 편집 종료를 확인한 뒤 CSS를 정식 인수하고 기존 엔지니어링 두 담당을 재개했다.

- A는 [parser](../../../scripts/markdown-document.cjs)·[모델](../../../deck-model.js)과 해당 검증을 구현했다.
- B는 [renderer](../../../blocks.js)·[인수 CSS](../../../blocks.css)·작성 안내·통합 검증을 구현하며 취합을 맡는다.
- root는 app 연결·생성물·브라우저와 전체 회귀·최종 전달을 소유한다. 팀은 default 출력을 생성하거나 공유 브라우저를 조작하지 않았다.

기존 `gpt-6.1-sol/high`와 초기 `fork_turns=none` 요약 인계 설정을 재사용했다. root가 확인한 2026-10-28 02:25 UTC 공식 Sol 페이지와 실제 다섯 모델 catalog 스냅샷을 같은 구현 작업에 적용했다. 첫 매니저 재개 실패 뒤 canonical follow-up 한 번으로 복구했고 새 팀·모델을 자동 생성하지 않았다.

## 직접 확인한 구현

제어 줄은 빈줄로 치환하므로 원고 전체의 위치와 첫 의미 H1 승격을 유지한다. 본문과 그룹 내용은 하나의 `heading`/`blocks` AST를 참조하며 설정에 복제하지 않는다. 그룹은 최종 `blocks`의 H2 시작 포함·다음 H2 직전 끝 제외 범위다. 새 tone의 `neutral`은 blocks에만 적용하고 legacy의 기존 허용값·경고 정책은 바꾸지 않았다.

renderer는 안전한 본문 형태를 기준으로 조판하고 수치에서 성과·차트를 추론하지 않는다. 사진 title은 caption으로 유지한다. 복수 사진은 빈줄 없이 같은 문단에 쓴 경우도 원래 순서대로 처리하며, 일반 문구가 섞인 문단이나 링크로 감싼 이미지는 의미 있는 원래 구조를 유지한다. 유효하지만 맞지 않는 선택은 본문 전체를 문서형으로 표시하고 app에 전달할 경고와 원고 줄을 남긴다.

실제 두 원고의 구조 분류는 다음과 같다. 이는 시각 합격과 구분한다.

| 원고 | 실제 분류 순서 |
| --- | --- |
| 제품 개선 | message → split → document → editorial → quote → message → document → closing |
| 팀 학습 | message → media → gallery → mosaic → quote → editorial → document → closing |

## 매니저 실행 근거

[독립 재현 스크립트](evidence/manager-check.cjs)와 [결과](evidence/manager-check.json)는 Node VM에서 26개 입력·40장을 검수한다. 실제 두 원고 16장과 다음 반례를 포함한다.

- 이미지 앞뒤 본문·이미지와 문자 혼합·링크 이미지의 원문과 관계 보존.
- editorial 앞 안내와 마지막 사실 조건의 순서 보존.
- 표 또는 긴 한국어에 부적합한 명시 구도의 원문 보존과 경고.
- gallery/mosaic 2~6개, 빈줄 없는 같은 이미지 문단의 처리.
- 입력 AST 불변, 원문 text 순서, 이미지 src/alt/title, caption 원고 줄, 제목 한 번 생성, preview 링크·스크롤의 비상호작용.
- 사진별 focus 배열의 원순서 적용, 배열 수/구도 불일치의 문서형·contain 안전 표시와 원고 경고.

스크립트는 결과를 `/tmp`에만 쓰며 이 문서 폴더에는 인수한 JSON을 보관한다. 실행은 DOM 대역으로 의미·구조를 대조하므로 실제 CSS layout·사진 paint 면적·대비·미감·모바일 합격을 증명하지 않는다. 그 검증은 root 브라우저와 별도 디자인 후검수에서 수행한다.

## 직접 교차 검수와 인수 경계

A는 renderer를 읽고 모델에서 허용하는 focus의 탭/공백을 renderer도 허용해야 한다는 반례를 전달했다. B는 검증 범위를 맞추고 실제 style 값만 단일 공백으로 정규화했다. 매니저는 이미지가 같은 문단에 붙는 일반 Markdown 반례를 전달했고 B가 AST를 변경하지 않는 사진 목록 처리를 구현했다. editorial 앞 안내문 때문에 CSS가 그룹 개수를 잘못 판단하는 문제도 전용 `data-group-count`로 분리했다.

A의 첫 parser/model 독립 검증은 63/63 통과했다. 매니저는 해당 코드와 모델 경계를 직접 읽고 위 별도 probe를 실행했으며 소유 제품 파일의 공백 검사도 통과했다.

## 실제 화면 반례 뒤 좁은 교정

root의 첫 실제 화면에서 모자이크의 서로 다른 세 사진에 공통 focus를 쓰면 우하 인물의 얼굴 전체가 잘리는 문제가 드러났다. 매니저도 [해당 PNG](../evidence/early/team-04.png)를 직접 열어 확인했다. 디자인 매니저와 원본/실화면 근거를 교환하고 장 focus의 기존 문자열은 유지하며 gallery/mosaic에만 원순서 배열 1~6개를 선택할 수 있게 확장하는 데 합의했다. 개별 좌표 오류는 입력 오류, 유효한 배열과 원고의 사진 수/구도 불일치는 전체 원문·contain 문서형과 줄 경고로 처리한다. 자동 얼굴 인식·좌표 추정·새 사진으로 대체하지 않는다.

A 편집 종료 뒤 root가 허용한 소유권 이전으로 B가 parser/model과 해당 검증까지 단독 인수했다. 디자인 매니저는 원본 사진을 열고 team4의 focus 한 값만 `['50% 40%', '50% 25%', '50% 0%']`로 편집 후 종료했다. B는 이 선택을 처리하며 원고를 수정하지 않았다. blocks에 없는 eyebrow의 빈 예약은 비quiet의 `top:0/bottom:48px`로 회수하고 quiet 전체 영역과 read 문서 흐름은 보존했다.

교정 뒤 담당 네 테스트 파일은 79/79 통과했다(parser19/model44/새 composition12/기존 blocks4). 매니저는 새 freeze의 네 소스를 다시 읽고 26입력·40장 별도 probe를 재실행했다. 이 값은 root의 최종 전체 suite 또는 실제 화면 검수를 대신하지 않는다. root는 read 직접 진입에서도 composition 경고가 작성자 점검에 표시되도록 app 수집을 mode와 분리했다.

## 최종 엔지니어링 인계

A와 B는 실질 구현과 직접 전체 코드 교차 검수를 마친 뒤 편집 종료했다. B의 [최종 취합](synthesis.md)과 [작성 안내](../../../MARKDOWN-FIRST.md)를 매니저가 읽고 계약·검증 범위·미확인 항목이 실제 소스와 맞는지 확인했다. B는 79/79 담당 검사·문법·공백 검사와 가이드 실제 링크 3개 누락 0을 보고했다. 매니저는 별도 probe 결과와 네 제품 소스의 freeze SHA를 독립 대조했다.

| 파일 | 최종 코드 freeze SHA256 |
| --- | --- |
| scripts/markdown-document.cjs | e26b4089aebbd296dc39df9fb01a1a20ea640061a342d1cb9d5119aa6151bab8 |
| deck-model.js | 8edd4300080c79eb85fe5f30562b8cfd2515e69d3759ea8fc6eddc40c7cfec1d |
| blocks.js | 8072e64dae0732ca398e5aff24d5aa737846b454044d0a7ee420b7105b9300a7 |
| blocks.css | 2a4d6f9f0005ede94aa13d3cd7337a6f2ae8187e6890aa0ec4603cc63f220df2 |

이 시점의 엔지니어링 필수 미해결 문제는 없다. root의 남은 인수 항목은 실제 16장 사진/구도/색과 Paper, 390px 읽기, 원고만 수정하는 흐름과 오류 후 마지막 정상본, 기존 legacy20/native8·전체보기·발표자 회귀와 별도 디자인 후검수다. 새 문법 또는 테스트 수만으로 개선 완료를 선언하지 않는다. 추가 교정은 실제 QA 결함을 전달받은 뒤 단독 소유권을 확인하고 수행한다.
