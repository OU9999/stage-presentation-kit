# 첫 DevDay 복원 시안 제작 인계

실행 전 root의 `review/READY.md` 인수와 검증팀 전원 writer 종료를 확인한다. 그 전에는 제품을 작성하지 않는다. 공통 로그는 `/Users/ou9999-wdl/Documents/devday-presentation-kit/WORK_LOG.md`, root 단독 기록이다. HEAD `fca44a239eec36fcd3a96fd4997adc6b03d020cd`, 기존 변경 많은 공유 workspace를 보존한다. 모델·배정 근거는 `model-snapshot.json`의 정확 gpt-6.1-sol/xhigh/none·2026-11-16T05:49:30Z와 현재 spawn 계약이다.

최신 사용자 반려: main-05에서도 OpenAI DevDay 미감이 사라졌다. 검정·큰 글자·적은 정보·기술 통과를 합격으로 삼지 않는다. 준비 정본 `review/READY.md`, `acceptance-final.md`, `art-direction-final.md`, `tooling-initial.md`와 AGENTS·DESIGN·MARKDOWN-FIRST·CONFIG를 먼저 읽는다. 화면의 주역/비례·구체 자료의 정체성·읽는 구절·의미색/고유 표면·전후 흐름이 실제 원본과 대응해야 한다.

## 이번 소유와 완료 조건

제작 manager는 `$manager`로 실무2명을 관리한다. A는 시각 편집/네 자료 자산의 실질 초안을, B는 원고·원문 의미/예시 지위·공개 해설과 입력 정합의 실질 초기 작업 및 취합을 맡는다. 상대와 직접 구도·정확 구절·새 읽을 경로를 협의한다. 두 실무 모두 제작자이므로 자기 시안의 미감 승인을 하지 않는다.

- 격리 프로젝트 `research/devday-fidelity-20261116/prototypes/` 아래 `ou.config.json`(sourceDir=talks, outputDir=site), `talks/round-01/slides.md` **4장**과 assets/materials를 작성한다. B가 config/slides/materials·source proof script/JSON, A가 assets·시각 의도 문서를 단독 소유한다. manager는 production/HANDOFF.md 소유다.
- 실제 대응 순서는 본편05/07/13/15. 각 원문·예시 지위·보존 의미·정확 원본 대조는 acceptance-final의 네 행을 따른다. **02는 수정하지 않는 선언 문맥**,13은 보존 후보와 비교,15는 반드시 높은 불확실성을 시험한다. 다음 발표에도 4장을 강제하는 규칙은 아니다.
- 기존 본편/해설/자산·공통 CSS/runtime/parser·과거 근거는 이번 checkpoint에서 읽기전용이다. 새로운 dependency/전면교체를 하지 않는다. 기존 Markdown 구성과 자료면을 먼저 사용한다. 막힌 구도가 있으면 실물/정확 입력 제약과 최소 재사용 확장을 root에게 제시하고 독립 작업을 계속한다.
- 모든 장을 통째 텍스트 SVG로 옮기거나 회색 패널의 색만 바꾸는 것으로 해결하지 않는다. 비교는 같은 질문에서 남는 작업 대상, 관계는 가까운 실제 문서명과 세 무방향선,13은 진행안 정체성과 읽을 한 행,15는 식별되는 조건 메모와 목적 구절의 다른 무게가 보여야 한다. 읽을 핵심을 작게 만들거나 원문/예시 지위를 숨기지 않는다.
- 원본 star/로고/캐릭터/제품/수치·가짜 UI/실제 AI실행/학습효과를 만들지 않는다. raw도 발표팀 자작 설명예다. `expanded-study.txt` 경로명은 한 팩의 논리 구간이며 독립 파일 실재를 주장하지 않는다. 필요한 문맥/조건은 공개 notes의 정확 절과 실제 팩 전문으로 연결한다. 원문은 A가 자산에 옮기기 전에 B와 정확히 대조한다.
- 자료의 `data-material-kind="explanatory-reconstruction"` 등 의미지위와 실제 태그/대체텍스트를 인수한다. SVG는 source별 텍스트 역할·최소 크기·실배율·선/영역 연결을 설명한다. 문서와 확대 영역은 불필요한 동일 caption 층을 쌓지 않는다. 검정 Stage 기본과 국소 문서 표면 선택을 구분한다.
- B는 source proof에서 정확 발췌가 원래 팩에 존재함, 사용한 논리 구간/원문/예시 지위, 원래 세 관계 대응, support label/실제 anchor, 4장 역할/현재 원문을 검증한다. 좋은 시안을 옛 레이아웃 min-font에 억지로 맞추거나 과거 QA를 교정해 통과시키지 않는다. 정적 검사와 실제 화면 승인을 구별한다.
- build/capture/브라우저/Git/WORK_LOG는 root만 한다. 매니저와 두 실무의 writer hold/종료를 확인하면 root가 현재 공용 엔진으로 build/verify·1920/1280 stage4장·원본 대조/전후 문맥 보드를 수집한다. 전체 본편 QA 마감을 기다리며 첫 반려를 늦추지 않는다.

이번 인수는 실제 4장 소스·자산·공개 읽을 경로와 원문 정합 검증·변경 파일 목록·writer 종료·남은 위험이다. 검증관은 `/root/devday_verification_manager`와 그 A/B를 root가 별도로 재개한다. 시각 veto는 실제 구조 수정 후 재검수로만 해제하며 제작팀 매니저가 평균내어 승인하지 않는다. 승인된 시안의 본편 이행은 별도 다음 단계이며, 연구/시안 완료를 본편 전체 승인으로 부르지 않는다.

## 실제 제약 확인 뒤의 소유 범위 추가

15의 기존 split은 copy를 p/ul/ol로 제한하고30px로 조판하여 정확 목적 구절을 native blockquote로 크게 분리할 수 없었다. manager/B가 이 코드/입력 제약을 직접 보고한 뒤 root가 **B 단일 writer**에 다음 최소 확장을 인계했다. A/B 각각 수신 확인 후 구현을 재개하며 A의 자산 소유는 유지한다.

`lib/markdown-document.cjs`, `deck-model.js`, `blocks.js`, `blocks.css`, 해당 문법의 `CONFIG.md`·`MARKDOWN-FIRST.md` 최소 예와 기존 관련 tests. 명시 `compose: split / variant: evidence`에서만 image-first 뒤 단일 blockquote와 짧은 p를 지원한다. 기본 split/auto, 원문 AST·순서·sourceLine·읽기 문서는 보존한다. 발표 scope 안에서 blockquote54–58논리px/1.35와 p32로 역할을 나눈다. 큰 구절을 만들기 위해 H2/meta로 의미를 바꾸거나 전체 strong으로 처리하지 않는다. 부정 경로/기존 동작·원문/개행/소속 검증을 실행하고 root가 실제 glyph·가독성·영향 회귀를 확인한다. 다른 공통 파일·dependency·DESIGN·과거 QA·본편/과거 자산·WORK_LOG의 쓰기 금지는 유지한다.
