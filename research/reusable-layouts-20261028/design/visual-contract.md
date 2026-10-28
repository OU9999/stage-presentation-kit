# 재사용 배치 CSS 구현과 시각 인수 계약

디자인 A `/root/design_manager/visual_auditor` · 기준 `f1f76a9` · 2026-10-28. [WORK_LOG.md](../../../WORK_LOG.md)의 현재 구현 지침과 양 매니저의 [구현 계약](implementation-contract.md)을 읽고 실제 [blocks.css](../../../blocks.css)를 수정했다. 기존16장 원고·legacy/native·이전 연구는 변경하지 않는다. 이 문서는 실질 CSS와 후속 renderer 인수 기준이며 별도 상태 로그가 아니다.

## 실제 초기 구현

기존 기본 gallery/mosaic/editorial을 덮어써 같은 구도로 합치지 않았다. `data-composition`과 `data-variant`를 조합한 선택형 CSS를 추가했다. palette는 현재 공통 토큰 `--tone-color/--slide-*`만 사용하고 새 색상 HEX를 CSS에 복제하지 않는다.

| 선택 | 실제 CSS | 저작·검증 경계 |
| --- | --- | --- |
| gallery / portraits | `.md-grid > .md-media > img`에2:5 프레임. 기존 flex1/height0을 명시 해제하고 caption을 프레임 밖에 둔다. planner의 columns를 사용하며 제목 없는6열을 지원 | 사진의 중요한 행동·얼굴은 각 focus로 선택. 제목 없는6사진의 기존 미감을 대표로 검수 |
| portraits / 제목·소수 사진 | figure는232px 이하, H1이 있으면200px 이하로 폭을 제한하고 열 안 중앙 정렬 |2~6사진·제목·caption 높이와 정확한2:5의 양립을 실제 측정해야 함. CSS aspect-ratio 존재만으로 합격 처리하지 않음 |
| gallery / strip | 같은 planner columns의 한 행에서 img 자체4:3, caption은 별도. 기존 기본gallery와 구분 | 서로 다른 사진의 같은 프레임 비교이며 자동 zoom·촬영 전후를 추론하지 않음 |
| mosaic / staggered | planner의 columns/rows와 각 이미지 좌표/span을 소비. 기존 주역+보조 mosaic 규칙은 staggered를 명시 제외 |6사진의2+1+1/1+1+2를 같은 원순서로 배치. count별 기존 nth-child가 planner를 덮는 cascade를 방지 |
| bento / balanced,seoul,recap | `.markdown-body`가 planner grid, 직접 `.md-group.md-tile[data-kind]`가 좌표/span 사용. H2는 작은 tile label | balanced5/8/12와 고정12seoul/recap을 별도 검수. 빈 타일·내용 복제·일회성 ID selector 없음 |
| bento / image | 사진·문서의 고유 표면, 전체figure에 남은 높이 할당. H2는 작은 overlay, 원래 image title caption은 아래 실제 표시 | UI·문서는 contain, 사진은 저자가 cover/focus 선택. caption 숨김 없음 |
| bento / value | 큰 의미색 값과 중립 단위, 중립 H2 label. 기존 md-value hook 사용 | 값 계산·인과 추론 없음. 원문과 같은 숫자·단위 표시 |
| bento / quote,text,list,mixed | 밝은 인용/문서 면, 의미색이 약하게 들어간 목록 면, 열린 mixed 자료를 구분 | 모든 재료를 같은 어두운 카드로 감싸지 않음. Paper에서는 공통 밝기 토큰에 따라 면과 잉크 대비도 반전 |
| icon-wall | `.md-wall`의 중앙 copy와 같은 전체 grid layer의 `.md-wall-items`, 원순서 li에 planner 좌표를 적용 |5/12/22와 custom3을 균형 perimeter로 계획. CSS가 임의 좌표·아이콘 의미를 계산하지 않음 |

## renderer에 넘기는 정확한 hook

grid 부모의 `--md-columns`, `--md-rows`; 자식의 `--md-column`, `--md-row`, `--md-col-span`, `--md-row-span`을 사용한다. 기하는 공유 pure planner만 결정한다. source DOM과 읽기 순서는 그대로이며 CSS로 주역의 면적만 달리한다. 임의 회전·원본 재작성은 없다.

portraits/strip의 `.md-grid`에는 renderer가 **실제 이미지 수2~6을 `--md-columns`로 반드시 전달**한다. CSS fallback6은 연결 전 임시 안전값이지4사진에 빈2열을 허용하는 계약이 아니다.232/200px 폭 상한도 시안값이며 실제 프레임 비율·caption/제목 높이의 최종 판정은 root의 실측으로 한다.

bento의 종류는 H2 뒤 AST 표면 구조에 따라 image/value/quote/list/text/mixed로 표시한다. H2·본문·figure·value hook는 기존 의미 노드에서 한 번 렌더한다. `.md-tile-icon`은 선택 장식 SVG이며 별도 label을 반복하지 않는다. 아이콘을 본문 위에 쌓으면 작은2행 슬롯을 낭비하므로26px 우상단에 두고 H2 오른쪽 여백을 확보한다. read에서는 정상 흐름으로 복구한다. SVG20path는 후속 model의 공유 export만 사용한다.

wall은 `.md-wall > .md-wall-copy + .md-wall-items`의 두 grid layer를 사용한다. copy도 같은 column/row/span 변수로 중앙에 놓인다. **H1은 `.md-wall-copy` 안에서 한 번만 렌더한다.** 기존 `.markdown-composition`의 바깥 제목과 wall100%를 둘 다 남기면 높이가 넘치므로 두 번 생성하지 않는다. copy에는 H1과 원래 목록 앞의 연속 본문만 넣고 목록 뒤 본문은 원래 뒤 위치를 유지한다. ul/ol의 원래 태그를 보존한다.

각 `.md-wall-item[data-tone]`은 `--md-accent:var(--tone-color)`를 다시 결속한다. root만 장 tone을 바꿔도 자식 `--md-accent`가 그 상태로 굳는 상속 반례를 manager가 제시했고 실제 수정했다. neutral은 `--slide-text`로 명시한다. builtin SVG는 아이콘 면의56%, custom img는100% contain이며 필터·tint·이미지 경로별 CSS를 쓰지 않는다. custom은 `icons` 배열이 없는 image-first li만의 경로이고 mixed/null schema는 이번 계약이 아니다.

## 읽기와 preview

read는 모든 variant grid를 block 문서 흐름으로 되돌린다. 사진 프레임의 aspect-ratio와 고정높이를 해제하고 contain으로 원본 전체를 보여준다. 타일의 배경·overlay H2·축소 typography를 해제해 H2·본문·caption·링크·alt가 원순서로 이어진다. wall의 원래 목록은 ul이면 bullet, ol이면 decimal로 복구하고 실제 label/rich inline은 한 번만 남긴다. custom SVG도 read에서 원본 비율을 유지한다.390px에서 표·코드의 지역 스크롤은 기존 계약대로 유지한다.

preview/presenter도 같은 DOM/계획과 CSS를 사용해야 한다. 새 runtime이나 별도 body JSON, image path를 반복하는 스타일 파일은 만들지 않는다. `.stage-document-links`의 기존 공통 header 예외를 제외하면 추가 발표 규칙은 `.layout-blocks`에 격리한다.

## 실제 원고와 직접 반례

B가 독립 작성한 [사진 에세이8장](../../../talks/photo-essay/slides.md)과 [전시 준비9장](../../../talks/community-exhibit/slides.md)을 실제 읽었다. 사진 에세이는 H1 없는 portraits6→strip4→인용→staggered6→관찰의 한계를 설명하는 순서다. 전시는 준비 장면→큰 포스터→원칙→seoul12혼합→실행→builtin12 wall→custom3 wall→마무리로 다른 서사를 사용한다. 두 이전8장 원고는 보존했다.

A는 portraits6의 긴caption·H1이 전체 높이를 소비한다는 반례를 B에게 직접 전달했고 B는 no-H1·한 단어 caption·사진별 focus를 택했다. strip에 같은 풍경을 반복하면 실제 줌 비교로 오해할 수 있는 반례도 B가 저자 편집으로 서로 다른4사진과 비전후 안내를 사용했다. 원고의 `노트に` 조각은 A가 실제 읽고 지적했고 B가 `노트에`로 교정해 직접 수신 확인했다.

seoul12에서 H2+아이콘+큰값+본문을 모두 세로로 쌓으면 작은 슬롯 높이를 넘길 수 있다는 반례를 A가 전달했고 B가 우상단 아이콘 분리를 수용했다. 원래3단계/3목록·숫자는 유지하며 숨김·축약으로 해결하지 않는다. quote의 큰70px 전용 구도가 bento에 누출되지 않도록 tile quote를 자체 container 폭에 따른20~40px로 격리했다.

custom3 SVG는 원문을 직접 읽어64viewBox·단순stroke·텍스트 없음·색3역할을 확인했다. `view_image`의 SVG 직접 입력은 unsupported여서 실제 appearance를 봤다고 주장하지 않는다. 원색 stroke와 tile 면의 대비는 후속 root의 Stage/Paper PNG에서 인수한다.

B는 밝은 원색 outline을 builtin의 밝은 plate 위에 놓으면 대비가 약해질 수 있다는 A의 반례를 수용했다. custom img만 공통 `--chrome-bg` 중립 어두운 면에100% contain으로 두고, SVG 색 자체는 수정하지 않는다. Paper에서도 같은 중립 면을 써 원색을 보존한다. read에서도 같은 면과 원본 비율을 유지한다. 이는 실제 대비 측정 완료 주장이 아니다.

root의 후속 정적 반례도 반영했다. reverse quote/text 타일에서는 Stage의 밝은 면과 Paper의 어두운 면에 같은 accent 아이콘을 그대로 놓지 않고, 해당 두 kind의 장식 아이콘만 `color-mix(in srgb,var(--md-accent) 30%,var(--slide-bg))`로 역전 본문색에 가깝게 조정한다. authored tone은 그룹의 면과 의미 대응에 남으며 모든 아이콘을 일괄 흰색으로 만들지 않는다. read에서 면을 평탄화할 때는 아이콘도 다시 `--md-accent`로 복구한다. 실측 대비 판정은 여전히 후속이다.

B는 staggered의 마지막 가로 span2에 portraits의 focus를 그대로 복사하면 얼굴이 잘릴 수 있다는 manager 반례를 수용해 마지막사진만 `49% 0%`로 저자 수정했다. portraits의 `49% 28%`는 유지한다. 두 프레임의 실제 얼굴·행동 가시성은 후속 PNG에서 각각 확인한다.

## 후속 실화면 게이트

이 단계는 실제 CSS와 사양 구현이다. renderer/planner가 아직 새 hook을 만들기 전이므로 실제 배치·픽셀 비율·사진 crop·가독성·작성 편의가 통과했다고 보고하지 않는다. 브라우저·서버를 직접 조작하지 않는다.

필수 후속은 (1) portraits6의 img 실제2:5와 caption/제목 추가 높이, (2) strip4 실제4:3과 각 focus, (3) staggered6의8grid cell 점유·caption, (4) balanced5/8/12와seoul/recap12의 각매체 면·원문·읽을 크기, (5) builtin5/12/22와custom3의 중앙메시지/외곽분산·label/링크1회, (6) Stage/Paper5색+neutral·custom 원색 대비, (7)390px read/overview/presenter·사진/아이콘/자료수 변경의 독립 검수다. 입력 검증 통과나 geometry 수만으로 미감 합격을 대신하지 않는다.

최종 정적 검수는 CSS rule line212개에서 기존 header 예외 외 예상 밖 전역 selector0, 블록 괄호 균형 정상, 신규 palette HEX0, variant/planner/wall/tile hook 존재를 확인했다. 문서 로컬 참조5개 누락0과 `git diff --check`도 통과했다. 이는 CSS 전체 문법 파싱·계산된 cascade·실제 배치 적합성 검증을 대신하지 않는다. A는 여기서 CSS 편집을 종료하고 manager가 인수한 뒤 engineering B가 해당 파일을 단독 통합한다.
