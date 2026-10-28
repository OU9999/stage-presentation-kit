# 두 새 이야기의 실제 Markdown 작성 기록

작성 B `/root/design_manager/story_designer` · 2026-10-28 · 기준 f1f76a9. [공통 계약](implementation-contract.md)을 읽고 신규 원고2개·support SVG3개를 실제 작성했다. 기존 제품/학습16장과 이전 감사는 편집하지 않는다. 상태는 [WORK_LOG](../../../WORK_LOG.md) 하나에서 관리한다.

## 두 서사와 배치 선택

[사진 에세이](../../../talks/photo-essay/slides.md)는 시선→프레임→사진 사이의 흐름→관찰과 짐작의 경계→함께 남길 질문으로 이어지는8장이다. [작은 전시 준비](../../../talks/community-exhibit/slides.md)는 관람자가 만날 장면→표지의 약속→준비물의 회수→동선 점검→함께 할 일과 표식→다음 질문으로 이어지는9장이다. 같은 기능 목록을 두 주제로 반복하지 않았고 모든 수량을 본 서사에 억지로 넣지 않았다.

| 원고·장 | 실제 내용·배치 | 작성 선택 |
| --- | --- | --- |
| 사진1 | 시선의 약속 | 일반 제목/문단+blue |
| 사진2 | 기록·듣기·적기·관찰·일상·거리의6시선 | H1 없는 gallery/portraits,2:5,6개 focus |
| 사진3 | 휴대폰·헤드폰·노트·호수의 다른 장면 | gallery/strip,4:3,4개 focus |
| 사진4 | 질문이 달라지는 원칙 | 일반 blockquote |
| 사진5 | 넓은 장면에서 단서를 지나 바깥으로 | mosaic/staggered,6사진,각 focus |
| 사진6~7 | 사진이 말하지 않는 것·함께 읽고 남기기 | 일반 목록·링크 |
| 사진8 | 다음 장면에서 다시 보기 | closing+blue |
| 전시1~4 | 전시 약속·준비 장면·표지·질문의 원칙 | 일반 제목/문단·사진목록·큰 포스터·blockquote |
| 전시5 | 작품·질문·사진·문서·안내·시간·행동의12자료 | H1 없는 bento/seoul,H2그룹12개,primary4번째 |
| 전시6 | 계획의 동선 점검 | 일반 순서 목록·수치 성격 문단 |
| 전시7 | 모으기에서 이어가기까지12가지 일 | icon-wall+내장 icons12개,목록 라벨1회 |
| 전시8 | 보기·묻기·남기기의 표식 | icon-wall+image-first li3개,icons 힌트 없음 |
| 전시9 | 관람자의 질문으로 복귀 | closing+purple |

balanced5/8·recap12·22아이콘 등은 이 이야기의 필수 장면이 아니므로 별도 독립 fixture에서 검수한다. 다양한 N을 지원하는 계약과 모든 N을 원고에 나열하는 일은 구분한다.

## 본문 권위와 자료의 성격

H2 자료의 제목·값·단위·문장·이미지·인용·목록은 모두 일반 Markdown에 한 번 썼다. JSON/HTML/CSS에는 본문을 재입력하지 않는다. 전시5의12점·3개 질문·2회는 가상 계획이며 서로 다른 작업 단위, 비실적·비전환율임을 직후6장에 저자가 명시했다. 작은 타일 안의 글을 무단으로 숨겨 얻는 공간이 아니다. 장의 앞뒤를 넘겨도 작품/운영 계획의 가상 성격은 첫 장과 값의 라벨에 남는다.

기존7개 로컬 Pexels 사진을 재사용하며 사진 속 인물을 실제 참여자/조사 대상으로 소개하지 않는다. strip은 서로 다른4사진을 같은4:3 프레임으로 보여 준다. 같은 사진의 줌·전후·촬영 조건 비교를 주장하지 않는다. 모든 title caption은 짧은 원래 설명이고 제어 문자열이 아니다. 작가·원본은 두 원고의 크레딧 링크로 이어진다. 기존 poster/report/shape는 자체 제작 가상 자료로 표시했다.

두 원고는 서로 등록 MD로 연결하고, 기존 `team-learning/reading.txt`·`product-notes/checklist.txt`를 실제 질문/동선 점검에 사용한다. 해당 파일과 이미지 참조가 실제 존재하는지 정적으로 확인했다. 출력 자산 URL/등록 원고 read 재작성·실제 링크 이동은 후속 builder/browser 검수 대상이다.

## 자체 SVG3개와 custom 목록

manager/root의 명시 소유 확장을 받아 다음 support asset을 작성했다. 모두64×64 viewBox·단순 선/면·외부 참조/스크립트/텍스트 본문이 없는 SVG다. 원고의 img alt가 정확한 형태와 색을 설명하며 li 라벨은 각각 한 번만 쓴다.

| 자산 | 고유색·역할 | MD 라벨 |
| --- | --- | --- |
| [look.svg](../../../talks/community-exhibit/icons/look.svg) | 파랑 눈 모양·관찰 | 보기 |
| [ask.svg](../../../talks/community-exhibit/icons/ask.svg) | 보라 질문 말풍선·질문 | 묻기 |
| [leave-note.svg](../../../talks/community-exhibit/icons/leave-note.svg) | 주황 메모지·기록 | 남기기 |

기존 복잡한 포스터/보고서를 작은 아이콘으로 줄이지 않았다.3개는 이 키트의 새 자체 제작 안내 표식이며 실제 브랜드 로고가 아니라고 원고에 명시했다. allcustom은 표준 목록의 이미지 경로와 라벨을 함께 옮기며 별도 icons 배열이 없다. builtin12는 icons 배열의 각 항목이 원래 li 순서에 대응하므로 목록을 재배열하면 같은 위치의 배열 항목도 함께 옮겨야 한다. 이 동기화 부담을 숨기지 않는다. builtin/custom 혼합이나 null schema는 추가하지 않았다.

## 실제 설정 비용

| 항목 | 사진8장 | 전시9장 | 합계 |
| --- | ---: | ---: | ---: |
| stage-slide 블록 |5|6|11|
| compose 명시 |4|4|8|
| compose 미지정 |4|5|9|
| variant 명시 |3|1|4|
| stage-group 블록 |0|12|12|
| group icon |0|8|8|
| group tone |0|5|5|
| primary:true |0|1|1|
| 내장 wall icons 배열 항목 |0|12|12|
| custom image-first li |0|3|3|
| 이미지 참조 |16|9|25|

각 행은 중첩되는 필드라 합산해 조작 수로 해석하지 않는다. 전체 설정 부담을 compose8회만으로 축소하지 않는다. 제목·본문·라벨을 별도 구조에 중복 입력하지 않은 사실과,12그룹에 작은 메타를 붙이는 비용을 모두 공개한다. 시간/클릭·초보 사용자의 오류 비용은 아직 측정하지 않았다. compose 미지정9장의 auto 분류도 후속 연결의 예정값이며 실제 렌더 성공 증거가 아니다.

## 독립 초안 뒤 직접 반례 교환

A는 portraits6의 긴 caption과 bento12의 긴 설명이 다시 작은 thumbnail/넘침을 만들 수 있다고 제안했다. B는 portraits를 H1 없이 한두 단어 caption으로 쓰고 긴 수치 성격·출처는 별도 읽을 장으로 남겼다. manager는 같은 landscape를4번 반복해 focus만 바꾸면 차이가 작다는 반례를 보냈고, B는 서로 다른4사진의 같은 비율 비교로 바꿨다. 줌 키나 확대 배율을 임의로 추가하지 않았다.

manager의 얼굴 초점 반례를 받아 staggered 마지막 portrait-two만 `49% 0%`로 바꿨다. 세로 portraits의 `49% 28%`는 유지했다. 같은 피사체라도2:5와가로 span2의 초점은 다를 수 있어 최종 PNG에서 각각 얼굴을 확인해야 한다. A에게 이 수정과 검수 경계를 직접 알렸다.

A는 bento value 타일에서 icon+H2+값+설명을 세로로 쌓으면 본문 높이를 잃는다고 지적했다. B는 라벨 중복 없는 작은 우상단 icon 분리를 수용했고 짧은3단계/3항목 원문은 유지했다. 실제 행간·tile 크기는 root의 화면 검수 대상으로 남겼다.

custom3의 밝은 색 선을 흰 plate에 놓으면 Stage/Paper에서 대비가 약할 수 있다는 A 반례를 받아, 필터/재색칠 없이 custom 이미지에만 중립 어두운 well+contain을 쓰는 방향을 수용했다. 실제 styles.css에서 `--chrome-bg:#111111`은 Paper에서도 유지되는 것을 읽었다. SVG 렌더/대비는 실제 PNG로 확인해야 한다. SVG를 view_image로 직접 보는 것은 환경이 지원하지 않아 외형 검수를 완료했다고 주장하지 않는다.

manager의 custom 목록 뒤 조건 문단 반례도 수용해 자체 제작/비브랜드 문장을 H1 뒤·목록 앞에 원문 그대로 저자 이동했다. renderer가 꼬리 문단을 무단으로 끌어올리지 않는다. tail이 있는 일반 입력의 보존/fallback은 별도 edge 검수로 남겼다.

## 검증·인계 범위

yaml/markdown-it으로17장,11개 stage-slide,12개 H2 stage-group,내장 icon 이름/배열12대응,25개 이미지와 상대 참조의 존재를 확인했다. SVG3개는 XML 파싱·viewBox0 0 64 64·텍스트 노드0을 확인했고 기존 product/team MD는 f1f76a9와 diff0으로 대조했다. 새 variant/compose는 아직 연결 중이므로 현재 parser의 거절을 원고 결함이나 구현 성공으로 오인하지 않는다. 새 서버·브라우저·공통 로그를 조작하지 않았다.

새 parser/model/planner/renderer 연결, 실제2:5·4:3·staggered span·C12 혼합 면적·5/8/12와5/12/22 수량 변경·custom 원색/label·Paper·390px read·링크·overview/presenter·기존 회귀는 후속 엔지니어링/총괄의 실제 인수 범위다. A 최종 CSS/시각 사양을 직접 읽고 custom darkwell·reverse면 장식 아이콘/read 색 복구까지 수신 확인했다. 종합은 같은 폴더 synthesis에 기록한다.
