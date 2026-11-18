# 실제 구현의 독립 디자인 검수 인수

최신 사용자 목표는 직접 구현·테스트·실제 검증을 반복해 디자인 예시 수준으로 만드는 것입니다. 미감이 부족하면 다시 교정합니다. root가 WORK_LOG를 단독 관리하며, engineering A/B/manager의 writer 종료와 최종 응답을 확인했습니다. 제품·DESIGN·QA 계약은 round-02 입력으로 동결합니다. 이번 단계에서는 디자인팀이 제품을 수정하지 않고 독립 판정/구체 교정 명세를 작성합니다.

기준은 현재 DESIGN.md(특히 역할별 주역, 자료면/의미색, 한국어·읽기, 현재 판 검수)와 MARKDOWN-FIRST/CONFIG입니다. Stage 검정 무대·큰 타이포·여백·한 중심, 원본자료와 필수 의미/원문·소속·관계·실제 링크를 보존합니다. 설명용 재구성과 원본 증거면/실행 결과를 구분합니다. 색/사진/양식/실패 장수 할당량은 없습니다. 개선필요를 억지 승인하거나 보존 권고를 면책으로 삼지 않습니다.

현재 HEAD와 모델 근거는 before/starting-state.json 및 model-snapshot.json입니다. 같은 작업의 정확 gpt-6.1-sol/high/none 재개 설정·07:48:39Z 공식 최신/실가용 목록 스냅샷을 유효성 확인 후 재사용합니다. 실제 동시 한도4(root+design manager+실무2)입니다. 기존 매니저/실무를 재개하며 중복 팀·writer·브라우저를 만들지 않습니다. manager skill로 아트디렉션/발표 시각과 한국어 서사/읽기/지침 전문성을 나누고 후자를 취합 담당으로 지정하세요. 두 실무는 독립 초기 판정 후 직접 교차 반론을 교환합니다.

## 현재 실제 증거

- round-02/present-1280 및 present-1920: 각각26장 PNG,4 contact 보드,manifest,현재93입력,9 SVG의 실제 glyph/contain/관계 측정. viewport1280×720의 실제 stage 약917×516,1920×1080은약1557×876입니다. 두 viewport를 실제 슬라이드 크기로 혼동하지 않습니다.
- round-02/read-1440 및 read-390: 각각26장 실제 스크롤 픽셀 타일과 조립 PNG,4보드,manifest. viewport1440×1000/390×844, DPR1. sticky UI 아래 실제 픽셀만 이어 붙였고 제품 CSS/DOM을 캡처용으로 숨기지 않았습니다. 두 화면 모두 가로 넘침0입니다.
- round-02/qa-{1280,1920}.json: 각각119/0invalid/0regression, visualApproval:false. engineering/ENGINEERING_HANDOFF.md에 전체331테스트·역사45회귀 재현과 이번교정전83pass/5needs를 구별했습니다.
- round-02/final-actions.json 및 technical/: 요청문 선택2크기,실제자료9링크,키보드26장/Home/End/overview26검증. 변경3/5/10/12의390모바일 관계읽기 실제 anchor와 화면 technical/detail-N-390.png를 포함합니다. 작은 SVG의 모바일 조판만으로 가독성을 면책하지 말고 실제 상세 읽기 경로도 함께 보세요.
- round-02/before-after-1280.png, 직전 감사 evidence/compare/의 실제 디자인 예시. 표/인용/사진·다른크기 자료면의 주역/거리/리듬 원리를 비교하며 사진/타일수/수치를 이식하지 않습니다. 이전 감사의 승인/반려나 old reason을 새 입력 판정으로 자동 승계하지 않습니다.
- round-01/: 첫 시안은5글자min28.588logical,10입구 라벨 관통,12하단 링크 분량 경고로 root가 반려했습니다. 첫 전체 캡처는 중단되어 현재 승인 증거가 아닙니다. 원고는 정확 역패치+관측revision일치 복원 방법까지 기록했고 생성물·prototype을 보존했습니다.

## 판단할 변경과 남은 우려

3은 목적 메모의 정확한 구절→현재 이해·다음 질문과5무방향 관계,5는raw 목적/선택이유와wiki 개념 구절/세파일/요지·이유·질문/네 rules 약속/공통 native 마크다운 정의,10은작은 요약입구와큰 기존문서·3무방향 관계/별도 작업 화살표,12는기존3문서 관계를 짚고 질문으로 전환하는 실제 표,15는두 판단 H2안두H3+실행H2입니다. 원본19/이전 typography9/archive/demo/test.md와 의미를 보존합니다.6·7·8/9·14·16·17/18·19/21/22·20·24도 자동 승인 없이 전26장 흐름에서 새로 보세요.

root와 엔지니어링팀은5의 파일명/발췌/요지/rules 위계가 여전히 빽빽하고 평평한지,3의 하단 메모명→예시표지→결과문장 위계와 그림의 주역이 충분한지 우려합니다.5 bbox는요지bottom519.5→rules제목top522.5의3SVGpx,separator y526은제목bbox안,마지막glyph619.5/620입니다. 기술 하한 통과를 미감 충분성으로 쓰지 않습니다. 이 우려만 검토 대상으로 제한하거나 반려를 강제하지 않고 전체 역할/가독성/리듬을 독립 판단합니다.

## 산출물과 완료 조건

디자인 소유 경로는 design/ 아래입니다. 실무 A는 발표1280/1920의 전26장 원본·보드/모음 비교와 두 JSON, B는읽기1440/390 전26장 원본/상세 실제 경로·한국어/지침 검토와 두 JSON 및 팀 취합을 소유합니다. 매니저는교차반론·최종 인계/근거를 통합합니다. 본편·자산·CLI·기존감사/승인·before/round01/02 증거·WORK_LOG를 쓰지 않습니다. 새로운 관측은 root에게 직접 요청합니다. reviewer가 PNG를 실제로 연 범위만 판정합니다.

각 JSON 배열의26개 판정은 {slide,mode,viewport:{width,height,devicePixelRatio:1},status,reviewer,reviewedAt,reason,evidence:[repo상대PNG]}이며 mode는presentation-stage-only/read-slide-crop입니다. 파일명은 design/{present-1280,present-1920,read-1440,read-390}.reviews.json입니다. 반려/미확인은owner와nextAction을 추가하세요. 기존 같은 모양의 schema는 scripts/design-review.cjs를 참고하되 원문 reason을 복사하지 않습니다. 사람의 이유는 바뀐 표면/크기/거리→먼저 읽히는 것→줄어든 오독/남은 문제→채택/보류의 실제 판단을 담습니다. root는 원문을 수정하지 않고 기계 취합·require-approved를 수행합니다.

미감 반려는 구체 증거·유지 의미·해결 방향·다음 소유자를 전달한 뒤 writer 종료하고 기존 엔지니어링 소유자가 다음 판을 구현합니다. 모든 명시 범위의 실제 현재 승인과 기술 검증까지 반복하며 미구현 교정을 승인으로 바꾸지 않습니다. 이번 팀은시각 판정 자체를 수행하고 실제프로젝터/다른OS/실낭독/청중효과를 확인했다고 주장하지 않습니다.
