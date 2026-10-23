# 현재 저장소를 PUBLIC으로 바꾸면 되는가 — 팀 합의

2026-10-23 · 검토 기준 `main` / `f9553170e56bcca24909d22e7ebd0f8d7df01f0d` · 현재 원격 PRIVATE(root 실측 통지). 매니저·기술 담당·공개 범위 담당의 조사·상호 반론 결과이며 공개 전환이나 배포를 실행하지 않았다.

## 답: 가능하다

**도구·예제·문서·연구와 그 이력까지 공개하려는 목적이면, 현재 저장소를 PUBLIC으로 바꾸고 같은 저장소의 GitHub Pages를 사용하는 것이 가장 단순하다.** 별도 배포 저장소를 만들어야만 무료가 되는 것은 아니다. PUBLIC 저장소의 Pages는 GitHub Free에서도 가능하다. [GitHub Pages 공식 조건](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

이전의 PRIVATE 원본+PUBLIC 결과 저장소 권고는 **발표 결과만 공개하고 개발 원본은 비공개로 두는 경우**였다. 현재 저장소 자체를 공개하는 방법을 기술적으로 막는 조건으로 고수하지 않는다.

다만 PUBLIC 전환은 GitHub의 파일·이력을 공개하는 설정이고, **발표 웹주소를 만드는 Pages 활성화는 별도**다. 설정한 source의 배포가 성공한 뒤 실제 주소를 확인해야 한다. [공개 전환 범위](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility), [Pages 발행 source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 현재 저장소에서 같이 공개되는 것

| 직접 확인한 범위 | 공개할 때의 의미 |
| --- | --- |
| 추적383파일·약122MB, 도달 가능한10커밋 | C예제 한 장이나 현재 화면만 공개하는 것이 아니다. 수정 전 파일과 작업 이력도 포함한다. 삭제 경로는0개였지만 과거 버전은 존재한다. |
| 연구310파일, 이미지/프레임226개, 웹 원문 HTML/텍스트 보관물5개 | 보도·현장사진, 영상 캡처와 자체 비교, 행사/참석기 원문 등이 코드와 함께 공개된다. 전체 저장소 크기가 매 방문마다 자동 다운로드된다는 뜻은 아니다. |
| `AGENTS.md`·`WORK_LOG.md`·PDF6개 | 작업 규칙·로컬 경로·에이전트/검증 기록과 다른 예제의 PDF까지 GitHub에서 볼 수 있다. |
| 예제·스타터 notes62개 | 모두 실제 읽었고 가상 예제·양식 작성·출처/사진 조건 안내였다. 현재 메모를 기밀이라고 추정하거나 무조건 제거해야 한다고 판단하지 않았다. |

현재 미커밋·미추적 조사 문서는 공개 전환만으로 GitHub에 새로 업로드되지 않는다. 이후 commit/push한 내용은 공개된다. Pages artifact나 발행 폴더를 선별해도 이미 PUBLIC인 Git 저장소의 나머지 파일·이력을 비공개로 숨길 수는 없다. [파일·이력 인벤토리](evidence/current-repo-disclosure.json), [범위 상세](current-repo-disclosure-draft.md).

향후 개인의 실제 발표에서 비공개로 둘 원고·노트를 같은 PUBLIC 저장소에 넣으면 함께 공개되므로, 그런 발표는 별도로 관리한다.

자료를 공개하고 싶지 않아 최신 트리에서 지우더라도 이전 커밋에는 남을 수 있다. 그 경우에는 공개할 새 이력/저장소로 분리하거나 승인받은 이력 정리를 검토할 문제다. 이번에는 파일 삭제·이력 변경을 하지 않았다.

## 현재 구조는 Pages에 맞는가

기술 담당이 예상 project base 아래에서 루트·갤러리·예제5개의 HTML 참조71개와 원고6개의 미디어 참조58개를 해석했다. **누락0·project base 이탈0**이었다. 현재 구조를 통째로 제공하면 예제의 `../../app.js`·사진 참조가 함께 있으므로 독립 패키저를 먼저 만들 필요가 없다. 노트·도구 전체를 의도적으로 공개한다면 노트 제거·새 viewer도 Pages의 선행 필수 조건이 아니다. [기술 조사](current-repo-pages-draft.md), [경로 근거](evidence/current-repo-pages.json).

실행한다면 공개 범위 검토 후 PUBLIC 전환, 기존 정적 파일을 위한 `.nojekyll`, Pages의 `main`·`/(root)` source 설정, 실제 배포 확인이면 된다. 새 서버·DB·Cloudflare 계정·전용 `ou9999.github.io` 저장소는 필요하지 않다. 이 파일 추가와 설정은 아직 수행하지 않았다.

예상 C안 주소는 `https://ou9999.github.io/stage-presentation-kit/examples/devday-compositions/index.html#4`다. **실제 활성화한 주소가 아닌 예상 형태**다. 루트 주소는 현재20장 양식 모음이고 `/examples/`가 갤러리다. 공개 후 사진·한글·탐색·장 직접 링크와 Console/Network를 실제 확인해야 한다. 이번 경로 검사는 외부 Pages 렌더 검증을 대신하지 않는다.

화면 편집은 현재처럼 개인 브라우저에 저장된다. 저장소를 공개하거나 Pages를 켜도 브라우저에서 바꾼 문장이 자동으로 원격 원고에 저장되는 기능은 생기지 않는다.

## 공개 전에 정할 두 범위

| 의도 | 맞는 선택 |
| --- | --- |
| 발표도구·예제·연구와 작업 이력까지 공개하고 함께 발전시키기 | **현재 저장소 PUBLIC+같은 저장소 Pages.** 운영이 단순하다. 공개할 자료 범위와 재사용 조건을 정리한다. |
| 청중에게 특정 발표 결과만 보여주기 | 기존 PRIVATE 원본+선별 결과만 새 PUBLIC 저장소. 개발·연구 이력을 공개하지 않을 수 있다. |

공개 자체와 오픈소스 라이선스 선택은 별개다. 현재 `LICENSE`류 파일은 없지만 이것이 PUBLIC/Pages를 막지는 않는다. 다른 사람에게 코드 사용·수정·재배포를 명시적으로 허용하려면 라이선스를 선택하는 편이 분명하다. 자기 코드의 라이선스가 외부 사진·기사/웹 원문의 권리 조건까지 바꾸지는 않는다. [GitHub 라이선스 공식 설명](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository).

예제의 스톡/자체 자산은 [크레딧](../../assets/CREDITS.md)에 구분돼 있다. 연구 자료는 출처·credit·비교 범위가 기록돼 있지만, 연구 사진·외부 프레임·웹 원문 전체의 포괄 재배포 허락을 확인한 기록까지는 검토 문서에서 찾지 못했다. **권한이 없거나 위법하다는 확정이 아니라 현재 확인 범위의 한계**다. 전체 공개를 원하면 해당 원본을 포함할지, 링크·자체 분석 중심으로 정리할지와 자료별 조건을 확인하면 된다.

## 실제 토론 결과와 한계

기술 담당은 “전체 공개 의도라면 기존 repo+Pages가 최소 운영이며, 별도 패키저·노트 제거가 필수인가”라고 반론했다. 공개 범위 담당이 notes62개와 현재 경로를 확인해 필수 조건으로 두지 않기로 했다. 공개 범위 담당은 “발표 링크 공개가 연구310개·작업로그·10커밋까지 공개할 의도를 뜻하는가”라고 반론했고, 기술 담당은 Pages 선별 게시가 Git 원본을 숨기지 않는다는 데 동의했다. 두 담당은 서로의 초안을 실제로 읽고 **기술적으로 YES, 공개하려는 범위에 따라 선택**으로 합의했다.

공개 전환 권한·실제 Pages 설정·외부 링크는 검증하지 않았다. 제한된 자격증명 형태 검사에서 일치는 없었지만 전면 secrets 감사나 공개 안전 보장은 아니다. 연구 자료의 권리 판정도 하지 않았다. 매니저와 두 실무자는 문서 검수와 최종 편집 종료를 확인한 뒤 총괄에게 인계하며, 이 질문을 공개 전환 실행 승인으로 해석하지 않는다. 공식 문서는 2026-10-23 확인했다.
