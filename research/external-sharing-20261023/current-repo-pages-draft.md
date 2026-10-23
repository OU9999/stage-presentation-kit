# 현재 저장소를 공개해서 Pages를 쓰는 방법

확인일: 2026-10-23 · 기준: `main` / `f9553170e56bcca24909d22e7ebd0f8d7df01f0d` · 담당: `/root/engineering_manager/deployment_engineer` · 조사만 수행

**가능하다. 이 저장소의 코드·예제·문서·연구와 Git 이력을 공개하려는 목적이면, 현재 저장소를 PUBLIC으로 바꾸고 같은 저장소의 GitHub Pages를 쓰는 것이 가장 단순하다.** 별도 배포 저장소를 만들어야만 무료가 되는 것은 아니다. GitHub Free도 PUBLIC 저장소의 Pages를 지원한다. 이전의 PRIVATE 원본 유지·별도 PUBLIC 배포 저장소는 발표 결과만 공개하려는 경우의 선택지이며 절대 조건이 아니다. [Pages 공식 지원 조건](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

다만 **저장소 공개 전환과 Pages 활성화는 서로 다른 작업**이다. 공개 전환은 GitHub에서 코드를 볼 수 있게 하는 설정이며, 발표 URL은 Pages의 발행 source를 정하고 배포가 성공해야 생긴다. 현재 질문을 이 두 설정의 실행 승인으로 해석하지 않았고 아무 설정도 바꾸지 않았다. [공개 범위 설정](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility), [Pages 발행 source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 현재 코드에서 직접 확인한 배포 적합성

| 관찰 | 코드 근거 | 의미 |
| --- | --- | --- |
| 이미 HTML·CSS·JS로 재생 | [루트 index](../../index.html) 10–13행에서 같은 폴더의 styles/content/model/app 로드 | 공개 호스팅에 새 앱 서버·DB를 만들 필요 없음 |
| 저장소 전체 배포에서는 예제 의존성이 함께 존재 | [C예제 index](../../examples/devday-compositions/index.html) 10–13행의 `../../styles.css`·`../../deck-model.js`·`../../app.js`, content 안의 `../../assets/photos/...` | 현재 폴더 구조를 그대로 두면 project URL 아래에서도 공통 자원에 도달 |
| 생성기가 상대 경로를 작성 | [Markdown compiler](../../scripts/markdown-deck.cjs) 267–279행의 `path.relative`·내용/런타임 hash | 저장소 이름이 URL 앞에 붙는 Pages project site와 맞는 구조 |
| 기본 진입은 루트 원고 | [app.js](../../app.js) 14행은 `window.PRESENTATION`,63행은 `#` 장 번호 읽음. 루트content는20장 | 기본 URL이 C예제7장이나 예제 갤러리로 자동 바뀌지 않음 |
| 정적 HTML·CSS와 현재 원고에 앱 서버 통신 의존성 없음 | 현재 app의 `fetch(` 호출 없음, 외부 script/style/font import 없음. SVG의 `http://www.w3.org/2000/svg`는 namespace | localhost 서버를 인터넷에 열거나 발표 컴퓨터를 계속 켜둘 필요 없음 |

`https://ou9999.github.io/stage-presentation-kit/`를 가정한 URL 해석으로 루트·갤러리·예제5개의 HTML 참조71개와 원고6개의 로컬 미디어 참조58개를 확인했다. 로컬 파일 누락0, 저장소 project base 이탈0이었다. 이는 **코드 경로·파일 존재 검사**이며 실제 Pages HTTP 응답·브라우저 렌더·CDN·전체 연구 페이지의 동작 검증은 아니다. [실측 JSON](evidence/current-repo-pages.json)

HEAD의 추적 파일383개는 합계122,171,167bytes(약122MB)다. 앞선 약2MB는 C를 포함한 현장 예제7장의 사용 파일만 계산한 값이며 저장소 전체 크기가 아니다. 두 값 모두 정적 제공 규모를 비교하는 수치이고 방문자 한 명이 사이트를 열 때 저장소 전체122MB를 자동으로 받는다는 뜻은 아니다. 실제 게시 크기는 Pages source·생성 설정에 따라 달라진다.

| 용도 | 공개 후 예상 주소 | 실제 연결 내용 |
| --- | --- | --- |
| 루트 | `https://ou9999.github.io/stage-presentation-kit/` | 현재 루트content의20장 양식 모음 |
| 예제 고르기 | `https://ou9999.github.io/stage-presentation-kit/examples/` | 예제 갤러리 |
| 사용자가 고른 C안 | `https://ou9999.github.io/stage-presentation-kit/examples/devday-compositions/index.html#4` | 현장 구성 예제7장 중4번 |

주소들은 예상 형태이며 이번에 생성·활성화한 실제 서비스 URL이 아니다. `<owner>.github.io/<repository>/`는 공식 project site 주소 형식이다. `ou9999.github.io`라는 별도 user-site 저장소로 이름을 바꾸거나 새로 만들 필요 없다. [Pages 사이트 유형](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

## 실행한다면 필요한 최소 작업

1. 도구 전체 공개 의도에 맞게 현재 추적 파일·이력을 검토한다. 노트가 있다는 이유만으로 비밀이라고 가정하지 않고, 실제 내용과 공개하려는 범위로 결정한다.
2. 현재 저장소를 PUBLIC으로 전환한다. 관리 권한·계정/조직 정책의 허용 여부가 전제다.
3. 기존 생성된 정적 파일을 그대로 제공하려면 루트에 빈 `.nojekyll`을 추가하는 방식을 권고한다. 현재 파일은 없다. branch Pages의 기본 Jekyll 변환을 끄는 공식 방법이며, 별도 프레임워크 설치·서버 개발은 필요 없다.
4. Pages에서 `Deploy from a branch`·`main`·`/(root)`를 source로 선택한다. 코드 공개만으로 자동 수행되는 단계는 아니다. 최종 배포는 Pages의 Actions workflow로 동작한다.
5. 성공한 배포 URL에서 루트·갤러리·C4번·사진·한글·직접 장 링크를 확인한다. push 성공과 Pages 발행 완료를 구분한다. 이후 원고 변경은 기존 생성 명령으로 결과를 갱신하고 commit/push 후 새 배포를 확인한다.

근거: [`.nojekyll`과 정적 파일 제공](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [branch/root source와 내부 Actions 배포](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

현재 `.github/`·`.nojekyll`·`CNAME`은 로컬에 없고 추적 symlink는0개다. 이 관찰을 원격 Pages 사이트가 없다는 확정으로 확대하지 않는다. 이번에는 `.nojekyll` 추가·빌드·서버 실행·Pages 설정·실제 배포를 하지 않았다.

전체 저장소와 현재 예제 노트를 의도적으로 공개·같은 구조로 발행한다면, **별도 packager·노트 제거·새 viewer를 먼저 구현해야만 Pages가 가능하다는 전제는 필요 없다.** 반대로 공개할 발표만 선별하려면 패키저가 유용하다. 화면 편집은 브라우저 저장이므로 공개 URL에서 바꾼 문구가 원격 원고를 자동 갱신하는 것은 아니다. 이 사용법은 호스팅 방식과 별개다.

## 두 선택지의 차이

| 공개 의도 | 단순한 선택 | 유지할 경계 |
| --- | --- | --- |
| 발표도구·예제·원고·연구와 그 이력까지 공유 | 현재 저장소 PUBLIC + 같은 저장소 Pages | 현재 파일·과거 버전·해당 Actions 이력의 공개를 수용하고 자료별 권리 확인 |
| 청중에게 발표 결과만 공개 | 원본 PRIVATE + 새 PUBLIC 결과 저장소 Pages | 공개 가능한 결과만 새 Git 이력에 넣고 원본 이력은 가져오지 않음 |

PUBLIC 원본 저장소에서 Pages artifact만 선별한다고 GitHub의 원본 파일·이력이 숨겨지지는 않는다. artifact 선별은 웹사이트의 구성·동선 정리에는 유용하지만 원본의 공개 여부를 되돌리는 수단이 아니다. 공개 전환 시 누구나 코드를 보고 fork할 수 있고 Actions 이력·로그도 공개된다. [GitHub 공개 전환의 결과](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility)

소스 공개와 재사용 라이선스 부여도 별개다. 공개 저장소에서 view/fork할 수 있다는 사실이 모든 코드·사진·보도 원본을 일괄 자유 재사용하도록 허용한다는 뜻은 아니다. 라이선스 유무와 자산 권리의 실제 검토는 [공개 범위 담당의 초안](current-repo-disclosure-draft.md)에서 다룬다. [GitHub 라이선스 공식 설명](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)

## 실제 상호 검수와 합의

발표 흐름 담당의 `current-repo-disclosure-draft.md`를 실제로 읽었다. 상대가 “발표 링크만 필요하다는 말이383파일·연구310파일·WORK_LOG·10커밋 전체 공개까지 뜻하느냐”는 반론을 제기했고, 이를 수용해 전체 도구 공개와 결과만 공개를 분리했다. Pages artifact 선별로 PUBLIC Git 원본을 숨길 수 없다는 점도 두 문서에 유지했다.

반대로 이 담당자는 “노트·LICENSE·연구 원문 확인사항이 기술적으로 PUBLIC/Pages 불가라는 확정인가”를 물었다. 상대가 예제 노트62문자열을 실제로 읽고 가상·작성 안내임을 확인했으며, 노트 제거를 전체 공개의 필수 조건으로 두지 않았다. LICENSE 부재도 Pages의 기술적 장벽이 아니고, 보도 원문 권리는 출처 기록과 포괄 재배포 허락 확인을 구별하는 사안으로 한정했다. 따라서 **전체 공개를 원하면 같은 저장소 PUBLIC+Pages가 최소 운영, 결과만 공개하려면 별도 공개 결과 저장소**라는 조건부 결론에 합의했다. 상대의 제한적 자격증명 검사0건을 보안 위험0이라는 보장으로 확대하지 않기로 요청했다.

## 확인 범위와 다음 판단

- 현재 사실: `main`·HEAD `f955317`, 추적383개, 원격PRIVATE(root실측통지). 이전 요청의 `WORK_LOG`·보고서 변경과 미추적6파일을 보존했다.
- 확인한 공식 문서는 모두 2026-10-23 직접 읽었다. 현재 저장소에서 Pages를 실제 활성화할 권한·설정·배포 상태는 검증하지 않았다.
- 제품 코드·README·WORK_LOG·기존 보고서·Git index/commit/remote·계정 공개 범위는 수정하지 않았다. 이 초안과 근거 JSON만 작성했다.
- 현재 사용자 질문에는 “가능하며 단순한 경로다”가 답이다. 전부 공개하려는지 발표 결과만 공개하려는지에 따라 위 두 경로를 고르면 된다. 별도 저장소를 무조건 권하거나, 전체 공개를 보안 위험0으로 단정하지 않는다.
