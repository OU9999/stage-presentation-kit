# 재사용 배치와 Markdown 통합 — 디자인팀 인계

취합 B `/root/design_manager/story_designer` · 2026-10-28 · 기준 f1f76a9. A는 실제 [blocks.css](../../../blocks.css)와 [시각 계약](visual-contract.md), B는 [사진 에세이](../../../talks/photo-essay/slides.md)·[전시 준비](../../../talks/community-exhibit/slides.md)·자체 SVG3개와 [작성 기록](authoring-stories.md)을 맡았다. [공통 구현 계약](implementation-contract.md)을 기준으로 각각 실질 초안을 먼저 작성한 뒤 직접 읽고 반례를 주고받았으며 A의 최종 CSS/spec를 B가 직접 읽어 수신 확인했다. 기존 두 원고16장·이전 연구·공통 로그는 편집하지 않았다.

## 실제 작성한 결과와 범위

사진 에세이8장은 시선→다른 프레임→사진 사이의 흐름→관찰의 한계→함께 남길 질문을 다룬다. 전시 준비9장은 만날 장면→표지의 약속→자료 회수→동선 점검→함께 할 일과 표식→다음 질문으로 이어진다. 같은 기능 목록을 두 주제에 반복하지 않았고 모든 N을 본문에 억지로 넣지 않았다.

| 실제 원고에서 사용하는 가족 | 조판·내용 |
| --- | --- |
| 사진2 gallery/portraits | H1 없는6열,2:5 프레임,한두 단어 caption,사진별 focus |
| 사진3 gallery/strip | 서로 다른4사진,4:3 프레임,각 focus. 줌·같은 경험/촬영 전후 비교가 아님 |
| 사진5 mosaic/staggered |6사진의2+1+1/1+1+2 가족. 넓은 장면과 작은 단서를 다른 면적으로 편집 |
| 전시5 bento/seoul | H2그룹12개를 단 한 장의 C가족 혼합 타일로 구성. primary는4번째 밝은 포스터 |
| 전시7 builtin icon-wall | 일반 li12개를 내용 권위로 쓰고 icons12배열로 기존 의미 아이콘을 대응 |
| 전시8 allcustom icon-wall | image-first li3개,정확한 alt·라벨1회. icons 힌트·혼합/null schema 없음 |

C12는 가상 작품12점·질문3개·함께 읽는 시간2회,사진·포스터·문서·인용·도형·짧은 목록과 선택 icon8개를 섞었다. 전시 첫 장과 값 라벨에 가상 계획임을 남기고,직후6장에 서로 다른 작업 단위·비실적/비전환율 조건을 명시했다. 타일 안의 긴 글을 자동 숨기거나 임의 수치를 채우지 않았다. 기존 fixed12 프리셋을 좋은 선택지로 쓰되 balanced5/8/12·recap12·wall5/12/22는 root의 독립 fixture에서 추가 검수할 범위다.

## 본문 한 번과 실제 작성 부담

제목·문장·값·단위·사진 경로·alt·caption·인용·목록 라벨은 일반 Markdown에 작성했다. JSON/HTML/CSS에 같은 본문을 다시 쓰지 않았다. 사진2는 H1을 요구하지 않고 caption은 원래 문구로 남는다. bento는 기존 H2 경계와 작은 group 메타만 사용한다. source 문단 수·빈 타일·12칸 채우기를 기본 작성 요구로 만들지 않는다.

17장 중 compose 명시8장·미지정9장,variant4개,stage-slide 블록11개,stage-group 블록12개다. 그룹 icon8개·tone5개·primary1개,내장 wall 배열12개와 custom image-first li3개를 썼다. 각 필드는 중첩되므로 합산해 클릭 수로 해석하지 않는다. compose8회가 총 설정 부담8회라는 뜻도 아니다. 실제 초보 사용자의 시간/오류 비용과 자동 분류 성공은 아직 측정하지 않았다.

builtin wall의 라벨·링크·rich inline은 li 안에만 있다. 목록을 재배열하면 대응하는 icons 항목도 같은 위치로 옮겨야 하는 부담이 있다. custom은 이미지 경로와 라벨을 같은 li에서 함께 옮기므로 별도 배열 대응이 없다. 새 icon 이름을 runtime에 추가하거나 label을 metadata에 중복 작성하지 않았다.

## 자체 자산과 색·사진

manager/root의 명시 소유 확장으로 [look.svg](../../../talks/community-exhibit/icons/look.svg),[ask.svg](../../../talks/community-exhibit/icons/ask.svg),[leave-note.svg](../../../talks/community-exhibit/icons/leave-note.svg)를 신규 작성했다.64×64 viewBox의 단순 눈·질문 말풍선·메모지이며 고유색 파랑/보라/주황을 쓴다. 텍스트 본문·외부 참조·스크립트가 없고 기존 복잡한 문서를 작은 아이콘으로 억지 축소하지 않았다. 원고가 자체 제작 안내 SVG·비브랜드 성격을 직접 설명한다.

기존7개 로컬 Pexels 사진과 자체 poster/report/shape를 재사용했다. 사진은 스톡이고 실제 전시 참여자/기록·공동 경험으로 소개하지 않는다. 두 원고의 크레딧은 기존 공개 자산 문서로 연결하고 새3SVG의 제작 성격은 사용 장과 작성 기록에 남겼다. 의미색은 장면/질문/작업 범주를 구분하는 지점에 쓰고 중립 사진·인용·실행 장으로 돌아온다. 모든 색을 모든 장에 순환시키지 않는다. Stage/Paper palette 대응과 매체의 원래 색은 유지한다.

## A의 실제 CSS와 renderer 인수

B가 실제 CSS와 시각 계약을 읽고 다음 연결을 대조했다. 새 규칙은 `.layout-blocks[data-composition][data-variant]` 범위에 있으며 기존 기본 gallery/mosaic/editorial·legacy planner를 새 구도로 덮지 않는다.

- gallery는 사진 img의2:5/4:3과 caption 높이를 분리한다. 제목 없는6사진도 planner columns로 배치한다.
- staggered/bento는 grid의 `--md-columns/--md-rows`,자식의 column/row/span 변수를 소비한다. 기하는 후속 shared pure planner가 정하며 source DOM·read 순서는 원래대로 남긴다.
- bento는 `.md-group.md-tile[data-kind]`로 image/value/quote/list/text/mixed의 자체 면을 구분한다. 값은 기존 md-value hook·중립 단위,작은 quote는 tile 범위의 typography를 쓴다. 선택 icon은26px 우상단에 두고 별도 label을 만들지 않는다.
- wall은 `.md-wall-copy`와 `.md-wall-items`의 grid layer를 사용한다. H1은 copy 안에 한 번만 만든다. 원래 list 앞의 연속 본문만 copy에 넣고 list 뒤 문단은 무단 재배열하지 않는다.
- read는 grid·overlay·고정 사진 비율을 해제하고 원본 이미지 contain·H2/본문/목록/label/caption/링크를 문서 흐름으로 복구한다. preview/presenter도 같은 DOM과 계획을 사용한다.
- custom img는 중립 어두운 well에 contain으로 넣어 원색을 보존한다. quote/text의 reverse면 장식 icon만 반전 본문색 쪽으로 조정하고 read에서 authored accent로 복구한다. 실제 Stage/Paper 대비의 합격은 후속 실측에 남긴다.

이 항목은 CSS/계약 인수이며 실제 planner/renderer 연결·cascade·픽셀 비율·가독성 인수의 성공 주장이 아니다.

## 직접 반례와 실제 수정

| 반례·보낸 담당 | 수정·검수 경계 |
| --- | --- |
| A: portraits6의 제목/긴 caption이 사진 면적을 다시 작게 만듦 | B는 H1 없이 짧은 caption과 사진별 focus로 작성. 정확한 프레임/높이는 최종 PNG로 측정 |
| manager: 같은 landscape의 focus4변형은 실제 차이가 작고 줌처럼 오해 가능 | B는 서로 다른4사진으로 strip을 다시 작성. 확대 키/배율은 추가하지 않음 |
| manager: staggered 가로 span2의 portrait-two에 세로 초점을 복사하면 얼굴이 잘릴 수 있음 | B는 해당 장의 마지막 focus만49%0%로 변경,portraits의49%28%는 유지. A에게 직접 통지·각 얼굴 PNG 확인 필요 |
| A: C값 타일의 icon+H2+값+본문 세로 적층은 공간을 낭비 | 작은 우상단 icon 분리를 수용. B는3단계/목록 원문을 유지하고 숨김 대신 실제 면적 검수를 남김 |
| A: custom 원색 선과 흰 plate의 대비가 약할 수 있음 | 필터/재색칠 없이 custom만 중립 어두운 well+contain을 쓰는 방향 수용. Stage/Paper 실제 색 검수 필요 |
| manager: custom list 뒤의 성격 문단을 중앙으로 끌어오면 원순서를 바꿈 | B가 원문 그대로 H1 뒤·list 앞으로 저자 이동. tail 일반 입력은 별도 edge 검수 |

## 정적 확인과 후속 실제 게이트

B는 yaml/markdown-it으로8+9장·11 stage-slide·12 H2 group·내장 icon12 이름/순서 개수·25개 image 참조와 상대 링크 존재를 확인했다. 새SVG3개는 XML 파싱/64viewBox/텍스트 노드0을 확인했다. 기존 product/team MD는 f1f76a9와 diff0으로 불변을 대조했다. A 최종 파일의 실제 SHA도 전달값과 일치했다. 새 variant/compose가 아직 연결 전이므로 현재 parser의 성공/거절을 새 구현 인수로 사용하지 않는다. 브라우저·서버·최종 생성·Git는 root 소유로 조작하지 않았다.

후속 실제 게이트는 portraits2:5/strip4:3·caption/focus·staggered span과 얼굴,balanced5/8/12와seoul/recap12의 혼합 표면·읽을 크기·빈 타일 없음,builtin5/12/22와custom3의 중앙/외곽 균형·label1회·원색·Paper 대비다. 또한 자료 수/사진/아이콘 교체·배열 이동의 실제 작성 비용,390px read 전문/논리 순서·링크·overview/presenter·기존 legacy/native 회귀를 확인해야 한다. 입력 검사 수·CSS 존재만으로 미감/편의 통과를 선언하지 않는다.

디자인 파일 인수 후 CSS 소유권은 엔지니어링 B에 이양하고 parser/model/planner/renderer를 연결한다. root의 최종 PNG가 나오면 디자인 매니저가 독립 후검수한다. 이 문서 자체는 실제 개선 화면·배포 완료를 주장하지 않는다.
