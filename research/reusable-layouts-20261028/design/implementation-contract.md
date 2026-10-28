# 재사용 배치의 실제 작성·표현 계약

2026-10-28 · 양 매니저 직접 구현회의에서 제안·수정·수신 확인한 계약. 기준 f1f76a9, 공식/가용 모델04:08~04:11UTC 스냅샷을 공유한다. 기존16장과 이전 감사는 보존하며 이번 신규 원고와 scoped CSS를 구현한다.

## 입력

- 기존 `stage-slide`에 `variant`를 추가한다. `compose: gallery`의 `portraits`는2:5, `strip`은4:3 사진 프레임이다. H1은 의무가 아니며 제목 없는6열 세로 사진 구성도 가능하다. 기존 기본 gallery를 바꾸지 않는다.
- `compose: mosaic`, `variant: staggered`는 기존6장2+1+1/1+1+2 계열이다. 기본 주역+보조 mosaic와 구분한다.
- 새 `compose: bento`는 H2 그룹을 혼합 타일로 쓴다. `variant: balanced`가 기본이며 자료수5/8/12에서 빈 자료 없이 균형을 검수한다. 기존12개 `seoul`/`recap`도 명시 옵션으로 유지한다. 새 `editorial`의 자료열과 기존 C계열 혼합타일을 같은 구도라고 부르지 않는다.
- 기존 `stage-group`에는 `icon`만 선택 추가한다. tone/primary/fit/focus와 원래 H2 범위를 재사용하며 사진·값·인용·목록·문서를 AST에 한 번만 작성한다.
- 새 `compose: icon-wall`은 일반 목록 한 개를 내용 권위로 쓴다. 장 `icons: [search, {icon: code, tone: blue}, ...]`를 원래 목록 순서에 대응시킨다. 이름·링크·rich inline은 li 본문에만 쓴다. 기존20개 아이콘명만 허용하며 별도 아이콘을 새로 만들지 않는다. 목록을 옮기면 대응 배열도 옮기는 부담을 작성 안내에 명시한다.
- root의 추가 지침으로, `icons` 배열 없이 모든 li가 표준 Markdown 이미지 노드로 시작하는 목록도 같은 wall에 쓴다. 원본 이미지·라벨·링크를 한 번만 작성하며 contain과 고유색을 유지한다. builtin과 custom을 섞는 새 null/혼합 schema는 이번 최소 계약에 넣지 않는다.
- 미지 키/enum/아이콘은 입력 오류다. 알려진 설정이지만 자료 수·선택 preset·배열 수가 맞지 않는 것은 형식 오류와 구분해 원문 document fallback과 원고 줄 경고를 제공한다. 고정12개를 맞추기 위한 빈 타일을 강요하지 않는다.

기존 palette5색+neutral, 사진별 focus 배열, 이미지 title의 caption 역할, 원문·링크·alt·순서/read 전체를 유지한다. 임의 회전·얼굴 인식·성과/인과·사실 계산을 추가하지 않는다.

## 공통 표현 API

`renderSlide`는 기존 `{body, composition, quiet}`에 `variant`만 추가한다. root가 article의 `data-variant`를 연결한다. preview/presenter/read는 같은 내용과 계획을 사용한다.

gallery/mosaic는 기존 `.md-grid > .md-media`를 재사용한다. CSS는 `.layout-blocks[data-composition][data-variant]`로 제한한다. bento의 `.markdown-body`가 grid이고 직접 `.md-group.md-tile[data-kind]`를 배치한다. 종류는 AST 표면 구조의 image/value/quote/list/text/mixed이며 내용 의미를 추론하지 않는다. 기존 value hook를 재사용한다.

grid 부모는 `--md-columns`, `--md-rows`, 타일은 `--md-column`, `--md-row`, `--md-col-span`, `--md-row-span`을 쓴다. 공유 pure planner가 위치·크기만 전달한다. 기존 legacy `bentoPreset`/`packMosaic`/`iconWallSlots`는 바꾸지 않으며 staggered의6장 span은 `[2,1,1,1,1,2]`다.

icon-wall hook는 `.md-wall`, `.md-wall-copy`, `.md-wall-items`, `.md-wall-item`, `.md-wall-icon`, `.md-wall-label`이다. wall copy는 H1/목록 앞 연속 본문만 묶고 목록 뒤 본문을 앞으로 당기지 않는다. ul/ol 태그와 DOM 원래 순서를 유지하고 CSS가 중앙/외곽 공간을 배치한다. 부모와 목록은 같은 grid 영역, 중앙 copy와 각 li는 같은 위치 변수를 소비한다. SVG는 중복 라벨을 만들지 않으며 li 본문·링크는 그대로 남긴다. bento의 선택 아이콘은 `.md-tile-icon`이다. icon path20개는 `model.iconPaths`에 공유 export해 legacy app와 blocks가 같은 원본을 쓴다. 새 pure 함수는 `model.planBento(count,{variant,primaryIndex})`, `model.planIconWall(count)`를 기준으로 한다.

## 실제 분담과 인수

디자인 A는 `blocks.css`와 시각 사양·수량별 구도 근거를 실질 작성한다. 디자인 B는 신규 talks2개와 작성 기록·취합을 실질 작성한다. 두 담당은 직접 수량 변경·긴 캡션·사진 초점·혼합매체/아이콘 읽기 반례를 교환한다. root만 공통 로그·브라우저·최종 생성/Git를 소유한다.

새 두 이야기에 모든 N과 기능을 억지 반복하지 않는다. 서로 다른 서사 안에 세로6사진·strip·staggered·C계열12개 혼합 시각 가족·아이콘월을 실제로 사용하고 나머지5/8/12·5/12/22 변경은 root의 독립 fixture에서 검수할 수 있다. 자료는 기존 로컬 자산과 정확한 링크/스톡·가상 성격을 쓰고 JSON/HTML/CSS에 본문을 복제하지 않는다.

디자인 writer 종료와 SHA/소유권 인수 후 CSS를 engineering B에게 이양한다. root의 실제 최종 PNG가 나오면 디자인 매니저가 독립 후검수한다. 이 계약 문서 자체를 미감·작성편의 합격으로 취급하지 않는다.
