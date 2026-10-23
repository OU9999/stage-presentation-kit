# 같은 저장소의 GitHub Pages 배포 — 팀 검수

2026-10-23. 사용자가 승인한 현재 저장소 PUBLIC 전환·같은 저장소 Pages 발행을 준비하고 실제 배포 근거를 검수했다. 이전 PRIVATE 원본·별도 배포 저장소 권고는 이번 실행 범위에서 대체했다.

## 변경과 담당

| 담당 | 직접 수행한 작업 |
| --- | --- |
| 배포 엔지니어 | 빈 루트 `.nojekyll` 추가, project base의 HTML·미디어·PDF·캐시 해시 검사와 [정적 근거](deployment-check.json) 작성. `.nojekyll` 편집 종료 후 총괄에게 소유권을 인계했다. |
| 발표 흐름 엔지니어·문서 취합 | [DEPLOYMENT.md](../../DEPLOYMENT.md) 초기 작성, [README](../../README.md)의 공개 발표 진입·발견 경로·작성/갱신 안내 수정. |
| 엔지니어 매니저 | 두 실무자 배정·직접 협의 확인, 코드 경로·문서·해시와 총괄의 원격 배포 근거를 독립 검수했다. |
| 총괄 | 단일 WORK_LOG, Git commit/push, 실제 저장소 PUBLIC 전환과 Pages API 설정, 외부 HTTP·브라우저 검증을 담당한다. |

기존 공통 런타임·모델·CSS·생성 예제·AGENTS·연구 원본은 이 팀의 수정 대상에서 제외했다. 별도 저장소·사용자 정의 workflow·앱 서버·새 발행 시스템은 추가하지 않았다.

## 직접 협의한 계약

- source는 같은 저장소의 `main`·`/(root)`, branch 발행(`legacy`)이다. `.nojekyll`로 기존 정적 파일을 그대로 제공한다.
- 루트는20장 양식 모음, `examples/`는 갤러리, 현장 구성 예제의 `#4`는 사용자가 선택한 C안이다.
- 배포 담당이 가이드의 `/examples/...`를 호스트 루트 경로로 해석하면 저장소 접두사가 빠질 수 있다고 지적했다. 문서 담당이 저장소 상대 경로와 전체 공개 URL로 교정했다.
- 문서 담당도 배포 담당의 JSON을 직접 읽어 로컬 정적 검사와 원격 검증의 차이를 확인했다. 화면 편집·내용 내보내기를 서버 발행으로 설명하지 않으며, Markdown 원문→생성→선택 commit/push→Pages 성공→실제 화면 확인 흐름을 일치시켰다.

## 확인한 결과

| 검사 | 결과와 범위 |
| --- | --- |
| 정적 배포 구성 | `.nojekyll` 0bytes, SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`. 구성 커밋 `87396f0ae76e3deac530f13c7a4f840a4175d6b1`에 반영됐다. |
| 상대 경로 | HTML71·미디어58, 총129참조의 project base URL 해석·로컬 파일 존재를 담당자와 매니저가 각각 확인했다. 누락·base 이탈0. |
| 캐시 식별값 | 실제 파일 바이트의 SHA-256과 query 해시30개가 일치했다. |
| PDF | 추적 PDF6개가 존재하고 `%PDF-` 헤더를 가진다. 이는6개 PDF 전체의 시각 검수라는 뜻이 아니다. |
| GitHub 설정 | 총괄의 [API 기록](evidence/github.json)을 읽어 저장소 `private: false`, Pages source `main`/`/`, `public: true`, `https_enforced: true`, status `built`를 확인했다. |
| 실제 외부 파일 | 총괄의 [무인증 HTTP 기록](evidence/http.json)을 읽어129참조와 진입/PDF를 포함한58개 고유 요청의 실패0·로컬 바이트 일치를 확인했다. 요청에는 Authorization·쿠키가 없었다. |

[배포 사용 가이드](../../DEPLOYMENT.md)는 원고 수정과 생성 결과를 함께 반영하는 방법, params·화면 편집의 저장 차이, Pages 성공 확인, 같은 URL 갱신과 캐시 확인을 설명한다. 문서의 상태 표현은 최초 배포 성공을 전달받은 뒤 확정했다.

공개 C안: <https://ou9999.github.io/stage-presentation-kit/examples/devday-compositions/index.html#4>

## 검증 경계

`deployment-check.json`은 `1cfc12392ab159d003d70ca65676bd5b89f3d58d` 시점의 정적 준비 영수증으로 남긴다. 당시 원격 상태의 PENDING 표시는 현재 사이트의 배포 실패를 뜻하지 않는다. 실제 PUBLIC 전환·최초 배포와 이후 브라우저 결과는 총괄의 원격 기록으로 구분한다.

매니저는 브라우저를 중복 조작하거나 계정·Git을 변경하지 않았다. 외부 화면의 탐색·모바일·Console/Network 및 최종 문서 커밋 뒤의 Pages 성공 확인은 총괄이 최종 전달 기록에 남긴다. 이 정적 검사만으로 브라우저 완료를 대신하지 않는다.
