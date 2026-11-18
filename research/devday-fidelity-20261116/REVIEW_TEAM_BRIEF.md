# DevDay 미감 검증관팀 인계

작업 루트 `/Users/ou9999-wdl/Documents/devday-presentation-kit`, HEAD `fca44a239eec36fcd3a96fd4997adc6b03d020cd`. 변경 많은 공유 workspace이므로 기존 변경을 되돌리거나 커밋하지 않는다. 공통 작업 로그는 `/Users/ou9999-wdl/Documents/devday-presentation-kit/WORK_LOG.md` 하나이며 root만 기록한다.

사용자 최신 확정: main-05는 정보량을 줄였지만 가장 중요한 OpenAI DevDay 발표 미감이 사라졌다. 프로젝트 역사·시각 자료·공식 DevDay 발표 리서치·최신 오픈소스 발표 도구를 통해 **검증관팀부터 준비한 뒤** 제작 루프를 재개한다. 기존 내부 승인·358테스트·80범위 합격은 이 요구 충족의 근거가 아니다. 장수20·검정+큰 글자·수치 계약 통과를 미감 합격으로 삼지 않는다.

## 팀/소유와 실제 실행

실제 검증 manager 1명 + 상보적인 실무 2명. root 포함 동시4이므로 이 팀 준비 중 다른 팀은 실행하지 않는다. manager는 `$manager`를 읽고 두 실무에게 모두 실질적인 초기 연구/판정을 배정한다. A=DevDay 아트디렉션/시각 역사 검증관, B=발표 도구/재현성과 원본 대조 검증관 겸 취합. 모델은 model-snapshot.json의 정확 gpt-6.1-sol/xhigh/none과 확인 시각/근거를 공유한다. 실제 도구가 거부하면 실패·현재 writer를 보고하고 조용한 fallback/중복 생성을 하지 않는다. 부모/실무 연락 경로를 서로 직접 전달하고 초기 판정 후 구체 반론을 직접 교환한다.

manager는 `review/TEAM.md`, `review/READY.md` 소유. A는 `review/art-direction*`, B는 `review/tooling*`, `review/acceptance*`, `review/current-verdict*` 소유. 팀 공통 상태 로그는 만들지 않는다. 제품 원고·자산·런타임·DESIGN 및 과거 증거는 읽기전용이다. 브라우저·빌드·현재 캡처는 root만 한다. 팀은 자체 web 검색/원문 읽기·로컬 view_image를 사용할 수 있다. 필요한 새 프레임·영상구간은 root에게 정확히 요청한다. 사진/공식 영상의 내용 화면과 행사 branding/방송 무대/파트너 슬라이드는 구별한다.

## 독립 초기 실무

A는 프로젝트 역사에서 무엇이 퇴색했는지 실제 이미지로 판별하고 공식 DevDay 원본의 역할별 구성 언어를 재구성한다. 공식 본편/세션의 기존 캡처와 해당 원문을 확인하고 현재20장을 전부 본다. 검정+큰 글자로 환원하지 말고 글꼴 비례/굵기·주장의 위치·실제 자료 크기/표면/색·비대칭/여백·구체성·일관된 icon/선·시퀀스의 리듬을 대조한다. 관찰·프로젝트 제안·추측을 구분한다. 원본을 그대로 베낀 전혀 다른 내용이나 사진 장식 추가도 해법으로 삼지 않는다.

B는 최신 **공식 저장소/문서/릴리스**로 reveal.js, Slidev, Marp 등 실제 현재 관련 도구를 조사한다. 최신 버전·확인시각·license·근거와 현재엔진에 필요한 기능/학습만 정리한다. star 수·새 dependency/전면 교체 자체를 품질로 삼지 않는다. 독립적으로 원본/현재 이미지도 읽어 이전 review가 놓친 취약점과 현재 코드/작성계약이 만든 동질화를 찾고, 실제 적용/비적용 권고와 실패 예를 먼저 작성한다. 이후 A 결과를 근거로 취합한다. 단순 대기·전달 역할 금지.

## 반드시 읽을 정본/증거

- AGENTS.md, WORK_LOG.md 상단, DESIGN.md 전부(특히 역할/색/자료표면/한글/현재검수), MARKDOWN-FIRST.md 관련 문법, CONFIG.md 관련 구성, DESIGN-REVIEW.md.
- `research/devday-session-analysis.md`, `devday-color-photo-analysis.md`, `devday-visual-reaudit-20261023.md`, `seoul-devday-visual-research-20261023.md`, `visual-implementation-diff-20261023.md`, `reusable-layouts-20261028/`, `evidence/devday/`, `evidence/color-devday/`, `evidence/reaudit-devday/`, `evidence/seoul-devday/`.
- `research/llm-wiki-keynote-reset-20261113/RESULT.md`, `review/main-05/`, `main-05/present-1920/slide-01..20.png` 및 contact, 원자료48장 `talks/llm-wiki/assets/archive/48-slide-original/`와 `research/llm-wiki-devday-20261031/evidence/screens/`, `talks/llm-wiki/slides.md`, `assets/keynote/`. 초기 전달의 존재하지 않는 `talks/llm-wiki/archive/` 경로는 manager가 실제 파일을 확인해 정정했고 두 실무에게 직접 전달했다.
- 공식 원본 https://www.youtube.com/watch?v=Fls_onRviPM (keynote), https://www.youtube.com/watch?v=XkKdbPhIvbY (Codex) 및 공식 DevDay 페이지. 기존 연구 출처·타임코드도 실제 재확인한다. 최신 문서/도구 조사는 새 네트워크 조회가 필요하다.

## 준비 완료 조건

1. A/B가 원본·현재를 실제 시각 열람한 경로/범위와 모르는 부분을 명시한다. 이전 approved를 먼저 정답으로 읽지 않는다.
2. 역할별 원본→현재 실패→다음 시안에서 볼 차이를 구체 화면으로 연결한다. 현 main-05는 사용자 반려본이다. 단순 잘림·font·링크 QA로 재합격시키지 않는다. 부족한 것은 현재 scope의 needs-changes로 남긴다.
3. 첫 제작은 작은 **서로 다른 역할 3~4장**을 요청하되 역할수/색수/반려횟수를 영구 할당량으로 만들지 않는다. 원본과 동일 역할의 side-by-side 비교·전후 흐름·실제 발표 크기에서 검증한다. 빈 무대/문장만 크게 놓기·논문식 미니문서·동일 카드 도식 반복을 현재 반례로 따져본다.
4. 엄격함은 점수 가중치보다 독립 veto로 운영한다. 반려는 관찰/원본근거/이해영향/구조수정/재확인 범위를 포함한다. 모든 reviewer가 핵심 쟁점을 납득하지 않으면 manager가 평균내어 승인하지 않는다. 원본 전부의 공식 font/수치/제작 tool을 추정해 강요하지 않는다.
5. READY는 연구/검증 준비의 완료일 뿐 본편 승인 아님. 제작 미참여·책임/소유·실제 루프 호출·향후 검수 입력/현재해시·디자인 변경시 관측갱신·명시 --require-approved 운영을 합의한다. 남은 연구와 제작 차단 여부/근거를 적는다. root가 인수하기 전 제품 변경 금지.

결과는 root에게 경로·실제 판정·직접 협업의 중요 합의/이견·writer 종료/남은 일을 알려준다. manager는 형식적 팀원 수로 품질을 보고하지 않고 실제 아트디렉션 기준과 예시를 검증한다.
