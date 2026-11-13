# ou-presentation 변경과 현재 판 검증

2026-11-13, 구현·검수 담당 `/root`. 디자인 기준은 변경하지 않은 루트 DESIGN.md의 현재 바이트다. 정확한 기준·원고·자산·공통 CSS/runtime·빌드 입력 SHA256은 [현재 manifest](present-1280/manifest.json)와 [검토 기록](presentation-sample.review.json)에 있다.

## 변경과 보존

프로젝트·패키지·화면 이름을 `ou-presentation`으로 변경했다. 재사용 엔진은 `lib/`, CLI는 `bin/`, 새 원고/프로젝트 템플릿은 `templates/`에 둔다. `init/new/build/verify/dev`와 JavaScript API를 제공하고 `ou.config.json`을 기본 설정으로 사용한다. 기존 `stage.config.json`, scripts 진입점, 브라우저 globals와 생성 형식은 호환한다. 정적 예제의 기존 상대 URL을 보존하려고 브라우저 runtime의 루트 위치는 유지했다.

기존 발표 원고/자산과 일곱 공통 브라우저 runtime/CSS 등126파일은 시작 바이트와 동일하다. [보존 결과](protected-result.json), [시작 해시](protected-before.json)를 대조한다. 제품명은 HTML template/모음에 반영했고, 모바일 헤더에서 긴 이름이 꺾이는 문제는 template의14px 단일 행 표시로 교정했다. 기존 슬라이드 문구·이미지·배치 CSS를 수정하지 않았다.

GitHub 저장소명·배포 URL·활성 워크스페이스 폴더명과 원격 상태는 기존 그대로다. 이번 작업은 커밋/푸시 또는 배포를 포함하지 않는다.

## 기술 결과

| 검사 | 결과·근거 |
| --- | --- |
| 전체 회귀 | [324테스트 통과](tests.txt), 실패/skip0 |
| 전체 사이트 | build:site 통과, [verify:site 통과](verify-site.txt), 기존 예제8개·현재발표5개·사진스타터1개 |
| 패키지 독립 실행 | [독립 tarball 설치](portable-install.json),33파일 모두 현재 소스와 바이트 일치. 원고/예제/연구 없이 init/new/build/verify 실행 |
| 현재 LLM Wiki 실관측 |1280×720 전26장·9SVG. [83항목 통과](typography-result.json), regression0/contract-invalid0. [실행 결과](typography-check.txt) |
| 실제 브라우저 | [입력 해시와 관측](browser-smoke.json). 데스크톱1280×720/읽기390×844의 확인 대상에서 가로 넘침·깨진 표시 이미지·JS오류0. 독립3장 스타터의 ArrowRight/End 이동 확인 |

원래 알려진 타이포 교정의 역사 baseline은 수정하지 않았으며 이번 구조 변경에서 새 baseline 교정을 주장하지 않는다. 현재 모드의 실제 입력 대조와 관측을 사용했다. 패키지에는 원고·공유 자산·예제·연구·테스트·사이트 scripts·생성 발표를 넣지 않는다. 설치 프로젝트의 로컬 file 의존성/이동 방법과 tarball 전달법은 루트 README에 있다.

캡처 중 한 문서에서 실패한 자원 요청(responseStatus0)과 `StageBlocks` 누락을 관측했다. 파일 바이트와 직접 HTTP200을 확인했고, 같은 문서의 hash 이동이 실패 상태를 유지하는 것도 확인했다. 해당 캡처를 통과 근거로 쓰지 않았다. 새 문서 로드·필수 runtime·이미지 로딩 검사를 거친26장과 정확히9개의 SVG 실관측으로 현재 manifest를 다시 만들었다. [before-mobile-label](before-mobile-label/note.json)은 모바일 이름 교정 전의 역사 자료이며 현재 승인에 사용하지 않는다.

## 실제 화면 판단과 범위

새 공식 승인은 LLM Wiki1·6·17·24장의 presentation-stage-only1280×720 네 범위뿐이다. `/root`가 해당 PNG를 직접 확인하고 다음 이유를 [검토 기록](presentation-sample.review.json)에 남겼다. [require-approved 결과](review-check.txt)는 네 범위 승인이다.26장 기술 통과나 전체 보드를 본 사실을 덱 전체의 새 시각 승인으로 확대하지 않는다.

| 현재 화면 | 실제 판단 |
| --- | --- |
| [1장](present-1280/slide-01.png) | 검정 바탕과 중앙 제목, 부제·설명이 하나의 시각 중심과 위계를 유지한다. |
| [6장](present-1280/slide-06.png) | 공통 안내가 두 열 앞에 남고, 사람/AI의 시작선과 동등 역할 설명이 분리된다. |
| [17장](present-1280/slide-17.png) | 작은 맥락 제목·설명 뒤 큰 두 행 질문과 아래 보충이 구분된다. |
| [24장](present-1280/slide-24.png) | 네 요청 본문이 같은 위계를 유지하고 자료 탐색 링크는 아래에 분리된다. |

[전체 보드](present-1280/contact.png)는 흐름과 밀도 참고 자료다.

아래는 별도 UI/템플릿 smoke의 실제 열람 이유이며, LLM Wiki 전체 읽기의 새 공식 승인은 아니다.

- [데스크톱 헤더](llm-chrome.png): 새 이름과 자료 탐색/테마/모드 조작이 겹치지 않고 슬라이드가 중심에 남는다.
- [모바일 읽기](llm-read-mobile.png): 전체 이름이 한 행에 들어가고, 큰 질문과 보충이 문서 흐름으로 읽힌다. 가로 넘침이 없다.
- [모바일 자료](material-mobile.png): 새 이름과 기존 밝은 문서 표면, 제목·본문·표의 위계가 유지된다.
- 독립 스타터 [표지](portable-stage.png)·[근거](portable-step2.png)·[다음 행동](portable-step3.png): 공통 엔진으로 큰 한 문장→근거 목록→다음 행동의 구도 변화가 만들어진다. [모바일 읽기](portable-read.png)는 같은 순서와 의미를 보존한다.

실제 프로젝터·다른OS·전체 읽기/다른viewport 재승인·공개 배포는 검증하지 않았다. 기존 과거 승인의 입력 해시나 판정을 새 값으로 덮어쓰지 않았다. root의 단일 Ego TaskSpace77은 검증 종료 후 finish로 닫았다.
