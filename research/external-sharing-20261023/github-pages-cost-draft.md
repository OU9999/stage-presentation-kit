# GitHub Pages 비용과 운영 검토

확인일: 2026-10-23 · 코드 기준: `f9553170e56bcca24909d22e7ebd0f8d7df01f0d` · 담당: `/root/engineering_manager/deployment_engineer`

**현재 요청에는 GitHub Pages가 충분하며, 새 호스팅 요금을 낼 필요가 없다.** 비공개 원본 저장소는 유지하고, 공개할 발표 결과물만 새 PUBLIC 배포 저장소에 올리면 GitHub Free에서도 `github.io`로 제공할 수 있다. 앞선 제안은 PRIVATE 저장소에서 Pages를 직접 켤 때의 플랜 조건을 강조했으며, 이 무료 분리 방식을 기본안으로 충분히 평가하지 않았다. 현재 무료·기존 GitHub 도구·단순 운영 선호에 맞춰 기본 권고를 수정한다. [Pages 사용 가능 플랜](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## 돈이 필요한 경우와 필요 없는 경우

| 방식 | 요금 판단 | 공개되는 범위 |
| --- | --- | --- |
| 기존 PRIVATE 원본 + 새 PUBLIC 배포 저장소의 Pages | **GitHub Free로 가능.** 기본 `github.io` 주소에 별도 도메인 구매 불필요 | 새 배포 저장소의 현재 파일·Git 이력과 웹 제공 파일. 원본 PRIVATE 저장소는 그대로 비공개 |
| 현재 PRIVATE 원본 저장소에서 직접 Pages | 개인 계정은 Pro 등 PRIVATE Pages 지원 플랜 필요. 이미 해당 플랜이면 별도 호스팅 가입 없이 쓸 수 있음 | 저장소는 비공개여도 Pages에서 제공하는 HTML·JS·사진은 공개 |
| custom domain | 선택 사항. 도메인 구입·유지 비용은 별도 | 자료 공개 범위는 같은 설정을 따름 |
| 향후 로그인·실시간 원격 진행·서버 공동 편집 | Pages가 지원하는 정적 제공 범위를 벗어나므로 별도 설계 필요 | 현재 공유 요구에 추가하지 않음 |

공식 조건은 Free의 PUBLIC 저장소 지원과 유료 플랜의 PRIVATE 저장소 지원이다. 계정이 Free라고 추정할 필요 없이 첫 경로는 가능하다. root가 현재 GitHub 사용자 `OU9999`·원본 PRIVATE를 확인했으나 user API에 plan이 반환되지 않아 **현재 Free/Pro 여부는 미확인**이다. 이번 조사에서는 새 저장소 생성·공개 전환·설정 변경·배포·가입을 하지 않았다. [Pages 생성 조건](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Pages 공개 사이트의 범위](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 현재 규모와 서비스 제한

코드에서 C를 포함한 현장 예제7장과 고유 사진6개를 다시 읽었다. 사진1,831,368bytes, 루트HTML+공통runtime178,060bytes, 예제content11,933bytes로 합계 **2,021,361bytes**다. 이것은 발행 전 원본 구성의 크기이며, 실제 패키저에서 노트를 제거하고 index/경로/credit를 정리하면 최종 크기는 달라진다. 최대 사진은585,525bytes다. [직접 실측](evidence/github-pages-cost.json)

공식 Pages 한도는 게시 사이트1GB, 월100GB의 soft bandwidth, 배포10분 timeout, 시간당10회의 soft build 한도다(맞춤 Actions 배포는 해당 build 횟수 제한에서 제외). 현재 약2MB의 정적 자료는 이 규모에 여유가 있고, 현 단계에 유료 CDN이나 서버를 도입할 근거가 없다. soft 한도는 무제한 약속이 아니며 많은 영상·사진이나 대규모 유입으로 바뀌면 다시 판단한다. [Pages 한도](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

## Actions 비용은 발행 방식별로 구분

첫 발행은 로컬에서 공개 번들을 만들고 기존 Git 인증으로 새 PUBLIC 배포 저장소에 push하면 된다. Pages는 설정한 branch의 파일을 배포한다. `.nojekyll`을 넣어 기존 HTML/CSS/JS를 정적으로 제공할 수 있고, 별도 프레임워크나 Cloudflare CLI 설치가 필요 없다. branch 발행도 최종 배포는 Pages의 Actions workflow로 실행되며, **PRIVATE 원본의 별도 CI가 필요 없다는 의미**다. [Pages 발행 source와 정적 파일](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [정적 파일·Jekyll 비활성화](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

PUBLIC 저장소의 표준 GitHub-hosted runner와 Pages용 표준 runner는 무료다. 큰 runner는 공개 저장소에서도 과금되므로 이 발표에 쓰지 않는다. 향후 PRIVATE 원본 저장소에서 별도의 일반 Actions 작업으로 번들 생성·다른 저장소 전송을 자동화하면 그 작업·artifact 저장은 계정의 포함량과 사용량을 확인해야 한다. Free의 일반 PRIVATE Actions 포함량 예시는 월2,000분·artifact500MB이며, 현재 계정 플랜과 다른 작업의 잔여량은 확인하지 않았다. 로컬에서 번들 생성·push로 시작하면 이 PRIVATE CI 비용·새 CI credential 관리가 필요 없다. [Actions 과금 공식 문서](https://docs.github.com/en/billing/concepts/product-billing/github-actions)

따라서 현재 제안은 **PUBLIC Pages 호스팅 추가 비용 없이 로컬 발행으로 시작**하는 것이다. 기존 계정 구독료가 없다는 뜻이나 향후 모든 Actions·도메인·부가 서비스가 영구 무제한 무료라는 뜻으로 확대하지 않는다.

## 실제로 시작하기 쉬운 구조

1. `OU9999/stage-presentation-kit`은 PRIVATE 원본·연구·원고 저장소로 유지한다.
2. 새 PUBLIC 저장소(예: `stage-talks`)에는 notes를 제거한 선택 발표의 HTML/content/runtime, 실제 필요한 사진·credit만 담는다. **기존 저장소를 clone한 Git 이력은 이 저장소로 가져오지 않는다.**
3. Pages를 이 배포 저장소의 branch/root로 설정한다. 초반에는 로컬에서 번들 검수→업로드/commit/push를 명시적으로 수행한다. 한 명령 발행으로 묶더라도 이 구조를 그대로 재사용한다.
4. 예시 청중 링크는 `https://ou9999.github.io/stage-talks/talks/<slug>/index.html#4`다. 이는 제안 주소이며 저장소·사이트를 생성하지 않았다. 프로젝트 사이트이므로 `ou9999.github.io` 전용 user-site 저장소를 선점할 필요도 없다.
5. 같은 발표를 다시 발행하면 같은 경로만 갱신하고 다른 발표 폴더는 보존한다. Pages 성공 상태와 실제 URL을 확인한 뒤 공유한다. push 후 반영까지 최대10분 정도 걸릴 수 있어 commit 성공만으로 발행 완료라고 표시하지 않는다.

여러 발표를 한 PUBLIC 저장소의 `talks/<slug>/`로 관리하면 도구·계정 하나로 유지하기 쉽다. 링크는 폴더별로 나뉘지만 공개 Git 저장소를 통해 **그 저장소에 둔 모든 발표와 과거 버전**을 찾을 수 있다는 전제가 있다. 특정 발표만 별도 공개 이력으로 관리하려면 발표별 배포 저장소를 쓸 수 있다. [프로젝트 사이트 경로](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [게시 지연과 상태 확인](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

현재 Markdown compiler는 index/content만 쓰며 예제 HTML은 `../../app.js` 등 저장소 공통 파일을 참조한다. 따라서 예제 폴더만 수동으로 올리는 것은 완성된 배포 방식이 아니다. 공통 패키저가 runtime·선언 미디어를 복사하고 링크·content hash를 다시 작성해야 한다. 이 부분은 호스팅을 Pages로 바꿔도 동일하며, 보안·공개 데이터 경계는 [사용 흐름 담당의 검토](public-sharing-security-draft.md)와 함께 평가한다. 현재는 구현하지 않았다.

## 자동화 권한은 후속 단계

로컬 발행은 사용자의 기존 Git 인증으로 PRIVATE 소스를 읽고 PUBLIC 배포 저장소에 push한다. 인증 정보를 공개 번들이나 PUBLIC 저장소에 넣는 방식이 아니다. 지금 단순히 정적 발표를 공유하는 데 새 PAT나 deploy key를 만들 필요는 없다.

PRIVATE source의 Actions가 PUBLIC deploy 저장소에 직접 push하는 후속 자동화는 별개다. 자동 생성 `GITHUB_TOKEN`은 workflow가 있는 저장소로 권한이 제한되므로 다른 저장소 쓰기를 그대로 할 수 없다. 그때 선택지는 다음과 같다. [GITHUB_TOKEN의 저장소 범위](https://docs.github.com/en/actions/concepts/security/github_token)

| 후속 수단 | 정확한 경계 |
| --- | --- |
| fine-grained PAT | 배포 저장소 하나·필요한 Contents 쓰기로 한정하고 만료·secret 보관을 설정. 계정이 실제로 가진 권한 이상을 부여하지 못함. workflow 파일 자체를 수정하지 않는 정적 결과 push로 범위를 좁힘 |
| write deploy key | 배포 저장소 하나에 연결한 SSH key의 쓰기를 허용하고 private key는 PRIVATE source의 CI secret에 보관. 기본 read-only이므로 쓰기를 켜야 하고 기본 만료가 없어 폐기·회전 관리가 필요 |
| GitHub App | 장기·여러 저장소 자동화가 필요할 때 더 세밀한 설치 권한·단기 token을 사용. 지금의 첫 공유에는 설정 부담이 큼 |

근거: [PAT 선택 저장소·권한](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens), [deploy key의 단일 저장소·쓰기·수명](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys), [추가 권한의 App/PAT](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token).

배포 저장소 안에서 Pages artifact를 게시하는 workflow는 그 저장소의 `GITHUB_TOKEN`으로 `pages:write`·`id-token:write` 등 필요한 권한을 둘 수 있지만, 이것이 PRIVATE source를 읽는 권한을 주는 것은 아니다. `GITHUB_TOKEN`으로 push한 commit은 Pages build를 자동 유발하지 않는다는 공식 제한도 있으므로 후속 자동화는 대상 repo workflow를 명시적으로 dispatch하거나 Pages artifact 배포 흐름까지 검증해야 한다. 첫 로컬 push 경로에는 이 토큰 기원 문제가 없다. [Pages 배포 workflow 권한](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Pages workflow와 token push 제한](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [토큰이 만든 이벤트](https://docs.github.com/en/actions/concepts/security/github_token)

## 회사 발표와 business/SaaS 제한 해석

GitHub Pages는 온라인 사업·전자상거래 사이트를 운영하거나 거래 성사·상용 SaaS 제공을 주목적으로 하는 무료 호스팅으로 쓰지 못하며, 비밀번호·카드정보 등 민감 거래에도 쓰지 못한다고 안내한다. 이것을 **회사나 제품이 등장하는 정적 발표자료까지 전부 금지**한다고 확대할 근거는 해당 문서에 없다. [공식 사용 제한](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

지금 요청은 작성자가 준비한 정적 발표자료를 링크로 읽는 것이며 결제·회원 서비스·서버 기반 협업 도구 운영이 아니다. 따라서 현재 목적에 Pages가 부적절하다고 판단할 구체 조건은 확인되지 않았다. 이는 문서와 현재 기능에 근거한 적용 판단이고 GitHub의 별도 사용 승인이나 법적 판정은 아니다. 앞으로 이 사이트 자체를 유료 발표 SaaS로 운영하거나 주문·결제를 받는 기능을 넣으면 해당 범위에서 다시 판단한다.

## 확인 기록·한계

- 상호 검수: 발표 흐름 담당이 제기한 “PUBLIC Git 이력 때문에 Workers가 필요한가”를 검토했다. PRIVATE 이력을 복제하지 않고 공개 결과만 새 이력에 넣으면 현재 공개 요구에는 Pages가 충분하고, Workers도 이미 배포받은 복제본 회수를 보장하지 않는다는 데 합의했다.
- 발표 흐름 담당의 `public-sharing-security-draft.md`를 실제 읽고, viewer 편집 UI 제거를 서버 원본 보호의 필수 보안 조치로 확대하지 말고 배포본 일관성·편의로 구분하자고 제안했다. 상대가 수용했다. 공개 데이터의 notes·임의 확장 필드 제외는 실제 공개 범위 조치로 유지한다.
- 상대는 이 비용 초안과 JSON을 직접 읽고, 초기 로컬 발행에 새 secret이 필요 없으며 Pages Actions와 PRIVATE 일반 CI를 구분한 점을 확인했다. 상대 지적에 따라 보안 보고서 링크와 비용의 “추가 비용” 표현을 고쳤다. 두 담당이 실제로 검토한 문서·논점·해결 내용이며, 배포 실행으로 간주하지 않는다.

- `WORK_LOG.md`를 읽고 직접 `main`·HEAD `f955317`·변경 없음으로 작업을 시작했다.
- root의 현재 통지: GitHub 사용자 `OU9999`, source PRIVATE, plan 필드 미반환. 현재 플랜·사용량·새 저장소 생성 권한·Pages 정책은 미확인이다.
- 위 공식 URL은 모두 2026-10-23 직접 열었다. GitHub 문서에는 별도 갱신일이 보이지 않아 확인일을 기준으로 삼았다.
- 새 보고서와 실측 JSON만 작성했다. 기존 보고서·제품·README·WORK_LOG·Git index/commit/remote·계정·사이트 설정은 수정하지 않았다.
- 실제 공개 Pages 링크, HTTPS 재생·미디어·캐시·반영시간·배포 성공·타기기 검증은 하지 않았다. 다음 구현·발행 때 검사할 결과다.
