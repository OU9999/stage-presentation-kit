# 무료 공유·보안·github.io — 팀 논의 결과

> **현재 저장소 전체를 공개하는 대안도 가능하다.** [저장소 공개 범위 후속 토론](repo-visibility.md)은 도구·예제·연구·Git 이력까지 공개하려는 경우 현재 저장소의 PUBLIC 전환과 같은 저장소 Pages가 더 단순하다고 정리한다. 아래 PRIVATE 원본+PUBLIC 결과 저장소 권고는 발표 결과만 공개하려는 범위를 위한 선택이다.

확인일 2026-10-23 · 코드 기준 `f9553170e56bcca24909d22e7ebd0f8d7df01f0d` · 비용/운영 담당과 공개 범위/사용 흐름 담당이 각각 조사하고 서로의 초안을 읽어 협의한 취합안. 제품·계정·공개 배포는 변경하지 않았다.

## 추천을 GitHub Pages로 수정한다

**현재처럼 누구나 읽는 공개 발표에는 `github.io`면 충분하다. 새 호스팅 요금을 내거나 Cloudflare에 가입할 필요 없이 시작할 수 있다.** 원본 `stage-presentation-kit`은 PRIVATE로 유지하고, **공개 발표 결과만 담는 새 PUBLIC 배포 저장소**에서 GitHub Pages를 사용한다. GitHub Free도 이 방식을 지원한다. [Pages 사용 가능 조건](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

앞선 Workers 권고는 정적 제공과 향후 확장에 초점을 뒀고, PRIVATE 원본과 PUBLIC 배포 저장소를 나누는 GitHub 무료 경로를 기본안으로 충분히 평가하지 않았다. **기존 GitHub 도구·무료·단순 운영을 우선하는 이번 요구에는 GitHub Pages가 더 잘 맞는다.** Workers 정적 자산도 무료 범위가 있어 비용 때문에 배제하는 것은 아니다. 추가 계정·CLI 없이 시작할 수 있다는 점에서 Pages를 선택한다. [Workers 정적 과금](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/).

## 돈이 필요한가

| 조건 | 판단 |
| --- | --- |
| PRIVATE 원본 + PUBLIC 배포 저장소 + 기본 `github.io` 주소 | Pages 호스팅 추가비용 없이 시작할 수 있다. 별도 도메인 구매가 필요하지 않다. |
| 현재 PRIVATE 저장소에서 바로 Pages 활성화 | PRIVATE 저장소 Pages를 지원하는 Pro 등의 플랜이 필요하다. 이미 해당 플랜이면 새 PUBLIC 저장소 없이도 가능하지만 현재 계정 플랜은 미확인이다. |
| 초기에 로컬에서 번들 생성·검수 후 PUBLIC 저장소에 push | PRIVATE CI 작업을 만들 필요가 없다. Pages 배포의 표준 GitHub-hosted runner는 무료다. Pages가 내부적으로 Actions를 사용하므로 “Actions를 전혀 쓰지 않는다”고 설명하지 않는다. |
| 이후 일반 PRIVATE CI·큰 runner·도메인·별도 서버 기능 추가 | 해당 사용량·포함량·비용을 그때 확인한다. 이번 공개 발표의 필수 조건이 아니다. |

root가 사용자 `OU9999`와 원본 PRIVATE를 확인했지만 API에 plan 필드가 반환되지 않아 Free/Pro를 단정하지 않았다. PUBLIC 배포 저장소 경로는 이 미확인점과 관계없이 Free에서 가능한 경로다. [Pages 플랜](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Actions의 public/Pages 표준 runner 무료 조건](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

현재 현장 구성은 7장·사진 6개이고 원본 HTML/JS/CSS/사진 합계는 **2,021,361bytes(약2MB)**다. 최종 공개 패키지를 만들면 노트 제거·경로·credit 때문에 크기는 달라진다. Pages의 사이트1GB·월100GB soft bandwidth 한도에 비해 현재 규모는 작다. 무제한 이용 약속은 아니며 큰 동영상이나 사용량이 크게 늘면 다시 판단한다. [직접 실측](evidence/github-pages-cost.json), [Pages 한도](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## 보안상 실제로 주의할 것은 공개 내용이다

GitHub Pages든 Workers든 청중은 재생에 필요한 HTML·JS·사진을 받는다. HTTPS는 전송 중 도청·변조를 줄이며, 공개 자료에 접근 제한을 걸어주는 기능은 아니다. `github.io`는 자동 HTTPS를 제공한다. GitHub 서버에 정적 파일을 올리므로 사용자의 localhost 포트를 인터넷에 열거나 발표 컴퓨터를 켜둘 필요도 없다. [HTTPS와 공개 Pages의 범위](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

현재 코드에서 확인한 공개 경계는 다음 세 가지다.

- **노트와 숨은 데이터:** 예제7장 모두 `notes`가 원본 JS에 있다. `?presenter=1`은 인증이 아니고, 원본 내보내기도 전체 `rawDeck`을 보존한다. 공개용 데이터는 표시 필드만 투영해 노트·임의 확장 메모를 실제로 제외해야 한다. 화면에서만 숨기면 JS 파일에는 남는다.
- **사진·원문·PDF:** 선택한 발표에 쓰는 사진·credit·런타임만 공개한다. 연구 원본 사진·WORK_LOG·Markdown 원문·다른 발표의 PDF를 통째로 올리지 않는다. 배포한 PDF나 사진도 누구나 저장할 수 있다.
- **PUBLIC 저장소의 이력:** 새 배포 저장소는 공개 결과만 담는 새 이력으로 시작한다. 원본 저장소를 clone해 remote만 바꾸면 비공개 원본 이력까지 가져올 수 있다. PUBLIC 저장소에서는 삭제 전 발표가 과거 커밋에 남을 수 있고 이미 받은 복제본까지 회수할 수 없다. [GitHub의 이력·복제본 설명](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

청중이 현재 편집 버튼으로 바꾸는 내용은 자기 브라우저 `localStorage`에만 저장되며 서버 원본을 덮어쓰지 않는다. 따라서 공개 viewer에서 편집/저장복원을 제외하는 일은 **배포본을 일관되게 보여주는 편의 작업**이다. 실제 공개 데이터에서 노트를 빼는 작업과 구분한다. 비공개 작성·발표자 노트는 기존 로컬 원본에 남긴다. [코드 분석](public-sharing-security-draft.md), [실측 근거](evidence/public-sharing-security.json).

이번처럼 공개할 발표에는 이 경계가 맞다. 로그인한 특정 사람만 볼 기밀 발표라면 일반 PUBLIC Pages는 요구에 맞지 않는다. 긴 URL·검색 차단·비공개 소스 저장소만으로 청중 접근이 제한된다고 하지 않는다. 이번 조사로 보안 위험이 전혀 없다고 보장하거나 실제 유출 사고가 발견됐다고 주장하지 않는다.

## 가장 단순한 실행 순서

1. 기존 PRIVATE 저장소에서 작성·미리보기한다. 화면 수정은 내보낸 params 또는 Markdown 원문에 반영한다.
2. 선택한 발표 하나의 공개 데이터·사진·런타임·credit를 독립 폴더로 모은다. **노트를 제외하는 공통 패키저는 아직 구현할 작업**이다. 현재 예제 폴더만 올리면 `../../app.js` 같은 공통 경로가 끊긴다. 재생에는 기존 런타임을 재사용한다.
3. 새 PUBLIC 배포 저장소에 **결과만** 넣고 검수·commit·push한다. 기존 Git 인증으로 시작하며 새 PAT/배포 secret이나 PRIVATE source CI는 첫 발행의 전제조건이 아니다.
4. 그 저장소의 Pages를 branch/root로 설정하고 `.nojekyll`로 기존 HTML/JS/CSS를 제공한다. 별도 프레임워크나 서버를 만들지 않는다. [Pages 발행 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
5. 예를 들어 `https://ou9999.github.io/stage-talks/talks/my-talk/index.html#4` 같은 링크를 공유한다. **현재 생성된 주소가 아닌 예시**다. Pages 배포 성공과 실제 HTTPS·사진·모바일·장 직접 링크를 확인한 뒤 공유한다. push 성공만으로 발행 완료라고 표시하지 않는다.
6. 같은 발표를 수정하면 해당 폴더만 갱신해 같은 링크를 유지하고 다른 발표는 보존한다. 이미 열린 탭은 새로고침한다. 발표자는 노트가 있는 로컬 원본/팝업과 화면 공유를 쓰고 청중 링크는 각자 넘겨 본다.

최소 개발·설정은 **노트 없는 독립 공개 패키지·새 PUBLIC 배포 저장소·실제 링크와 재발행 검증**이면 된다. 처음에는 로컬 명령+명시적 push로 시작한다. 반복 절차가 확인되면 검증→패키징→push→실제 URL 확인을 한 명령으로 묶고, 작성 버튼을 정리하는 청중 모드는 후속 UX 편의로 선택한다. 발표 A를 재발행해도 발표 B의 링크·내용·사진이 보존되는 것을 검사한다.

PRIVATE source의 Actions가 다른 PUBLIC 배포 저장소에 자동 쓰는 후속 구성에서는 저장소 범위의 `GITHUB_TOKEN`만으로 충분하지 않다. 그때 한정된 PAT·GitHub App·write deploy key 중 하나를 별도 선택한다. 이 권한 관리는 첫 정적 링크의 필수 요구로 확대하지 않는다. [GITHUB_TOKEN 범위](https://docs.github.com/en/actions/concepts/security/github_token).

## 팀이 실제로 논의한 쟁점

| 반론 | 확인과 합의 |
| --- | --- |
| 공개 배포 repo의 과거 발표까지 보이므로 Workers를 유지해야 하는가? | 두 담당이 서로의 초안을 읽었다. 공개 결과만 새 이력으로 시작하면 PRIVATE 원본 이력을 노출하지 않는다. 현재 공개 발표 요구에서는 Pages를 배제할 사유가 아니며, Workers도 방문자가 받은 자료를 회수하지는 못한다. |
| 청중의 편집 버튼이 서버 발표를 훼손할 위험인가? | 비용/운영 담당이 과장 가능성을 지적했고 사용 흐름 담당이 코드로 재확인했다. 서버 쓰기가 없으므로 로컬 편집과 배포본 일관성 문제로 한정했다. 노트의 실제 데이터 제거는 별도 공개 경계로 유지했다. |
| private→public 자동화에 새 secret이 필요하니 처음부터 복잡한가? | 사용 흐름 담당이 비용 초안을 직접 검수했다. 초기 로컬 push는 기존 인증을 쓰며, cross-repo CI 권한은 후속 선택이다. 표준 public/Pages Actions 무료와 일반 private CI 포함량도 구분했다. |

GitHub의 사업·전자상거래·상용 SaaS 호스팅 제한을 회사나 제품이 등장하는 정적 발표까지 전부 금지한다고 확대하지 않았다. 현재 공개 발표자료 열람은 그 제한에 해당한다고 판단할 구체 조건을 확인하지 못했다. 이는 공식 문서와 현재 용도에 따른 적용 판단이며 사이트 자체를 유료 SaaS·결제 서비스로 바꾸면 다시 검토한다. [Pages 공식 사용 제한](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

새 저장소 생성 권한·실제 Pages 설정/조직 정책·현재 계정 플랜·쿼터·외부 URL은 미확인이다. 이번에는 코드/공식 문서 조사와 합의까지만 완료했다. 가입·유료 활성화·공개 전환·배포·새 기능 구현은 수행하지 않았다. 공식 문서는 모두 2026-10-23 확인했다. 상세 비용 초안과 출처는 [배포 담당 분석](github-pages-cost-draft.md)에 있다.
