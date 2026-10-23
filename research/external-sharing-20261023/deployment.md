# 외부 발표 링크 — 배포 설계

확인일: 2026-10-23 · 코드 기준: `f2991dcd5454d570b97d436f018f7aaf44fdf740` · 작성: `/root/engineering_manager/deployment_engineer` · 상태: 조사·제안. 배포·계정 변경·CLI 설치를 실행하지 않았다.

사용자가 정한 범위는 **링크를 받은 사람이 로그인 없이 열람하는 공개 발표**다. 원본 GitHub 저장소 `OU9999/stage-presentation-kit`은 PRIVATE를 유지한다(총괄의 현재 실측 통지). 공개할 발표의 결과물만 별도 폴더로 만드는 방식이 맞다.

## 권고

기본안은 **Cloudflare Workers Static Assets의 정적 전용 배포**다. 작성은 기존 로컬 도구에서 하고, 선택한 발표를 발행 폴더로 만든 뒤 그 폴더만 올린다. 청중에게는 HTTPS 주소를 준다. 발표 컴퓨터의 서버나 전원을 유지할 필요가 없고, 청중은 설치·계정 없이 연다.

Cloudflare의 최신 Pages 개요는 새 프로젝트를 Workers에서 시작하도록 안내한다. 따라서 과거 관행대로 Pages를 기본값으로 정하지 않았다. Pages Direct Upload는 브라우저에서 폴더·zip을 올리는 절차가 더 중요한 경우의 차선안이다. [공식 Pages 개요](https://developers.cloudflare.com/pages/)

| 후보 | 이번 발표에 적용하는 조건 | 비용·제한 | 판단 |
| --- | --- | --- | --- |
| Workers Static Assets | Cloudflare 계정·발행 권한, Node/npm·Wrangler는 발행자 쪽에만 필요. 서버 코드 없이 `assets.directory`로 발행 폴더만 지정 | 정적 요청 무료·무제한, Assets 저장 추가 요금 없음. Free 기준 버전당 20,000파일·개별25MiB | 기본안. 향후 반복 발행·CI로 확장하기 쉽다 |
| Pages Direct Upload | Cloudflare 계정. 폴더·zip을 dashboard에 올리면 Node/CLI 없이도 호스팅 가능 | 정적 요청 무료·무제한. dashboard 업로드1,000파일·개별25MiB, Wrangler 업로드20,000파일·개별25MiB | 편의에 따른 차선안. Direct Upload 프로젝트를 Git integration으로 전환할 수 없어 나중에는 새 프로젝트 또는 외부CI가 필요 |
| GitHub Pages | 현재 PRIVATE 저장소에서 쓰려면 소유 계정의 Pro 이상 지원 플랜 확인 필요. 배포용 Actions artifact만 게시하도록 설정 | 공개 사이트1GB, 월100GB soft bandwidth. 계정 플랜·Actions 잔여량 미확인 | Cloudflare 계정 대신 GitHub만 관리하려는 경우의 조건부 대안. 저장소 공개 전환은 제안하지 않음 |

근거: [Workers 정적 과금](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), [Workers 한도](https://developers.cloudflare.com/workers/platform/limits/), [Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), [Pages 정적 과금](https://developers.cloudflare.com/pages/functions/pricing/), [GitHub Pages 생성 조건](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [GitHub Pages 한도](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

여기서 무료·무제한은 **정적 자산만 반환할 때**의 조건이다. 사용자 인증·원격 동기화 등을 Worker 코드로 처리하면 별도 Workers 요청 과금·Free 일100,000회 한도가 적용된다. 이번 기본안에는 Worker script·Functions·DB를 추가하지 않는다. 커스텀 도메인 구입 비용은 별도이며 첫 공유에 도메인 구입이 필수는 아니다. [정적 요청의 과금 경계](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), [Workers 요청 한도](https://developers.cloudflare.com/workers/platform/limits/)

## 코드에서 확인한 현재 상태

| 확인 | 실제 근거 | 발행에 미치는 영향 |
| --- | --- | --- |
| 정적 파일로 재생 | [루트 HTML](../../index.html) 10–13행의 CSS·content/model/app 네 파일 로딩, [README](../../README.md#시작하기) 3·15–22행 | API 서버를 외부에 열 필요가 없다 |
| 예제 폴더가 독립 번들은 아님 | [예제 HTML](../../examples/devday-compositions/index.html) 10–13행은 `../../styles.css`, `../../deck-model.js`, `../../app.js` 사용 | 예제 폴더만 올리면 런타임404. 루트 경로로 옮길 때 링크도 다시 작성해야 함 |
| 현재 Markdown 생성은 패키징과 다름 | [컴파일러](../../scripts/markdown-deck.cjs) 267–282행의 상대경로 생성, 308–313행은 index/content만 쓰기 | 사진·런타임을 포함한 별도 발행 패키저가 필요 |
| 저장·내보내기는 로컬 동작 | [app.js](../../app.js) 44–60·953–966행 | 브라우저에서 바꾼 문구는 자동으로 공개 서버에 올라가지 않음. 원고 반영→새 발행이 필요 |
| 노트도 동일 데이터에 포함 | [app.js](../../app.js) 953–957·1013행 | 공개용 `content.js`에서 노트를 제거. 화면에 숨기는 처리만으로는 공개 데이터에서 없어지지 않음 |
| 발표자 동기화는 같은 브라우저 창 연결 | [app.js](../../app.js) 969–984·1020–1045행 | 링크 방문자가 발표자의 장 넘김을 따라가는 기능은 현재 없음 |

행 번호는 현재 파일을 직접 읽어 확인했다. 공개 viewer·발행 UX 상세는 [작성·사용 흐름 보고](workflow.md)에서 다룬다.

이번 로컬 실측은 C를 포함한 현장 구성 **7장**, 고유 사진6개 **1,831,368bytes**, 최대 사진585,525bytes, 루트 HTML+app+styles+model **178,060bytes**, 원본content **11,933bytes**다. 사진은 `capture/listen/write/observe/portrait-one/portrait-two.jpg`이고 외부미디어URL은0개다. 전체 발행본은 새 HTML·노트 제거 등에 따라 크기가 달라지므로 약2MB라는 계획 추정만 가능하다. 현재 자료는 위 무료 한도 안에 충분히 들어간다. [로컬 실측 기록](evidence/deployment-local.json)

## 필요한 발행 산출물

제안하는 allowlist는 선택한 deck의 새 `index.html`, 공개용 `content.js`, 공통 `app.js`·`deck-model.js`·`styles.css`, 선언된 미디어만 복사한 `assets/`, 필요한 사진 credit, 발행 식별 정보다. 원문·연구 사진·WORK_LOG·QA·다른 발표를 통째로 올리는 방식은 쓰지 않는다. source 저장소 공개 여부와 관계없이 업로드한 JavaScript와 미디어는 청중이 받을 수 있다.

예시 구조는 `dist/talks/<slug>/` 아래에 독립 번들을 만들고 `/talks/<slug>/index.html#4`로 공유하는 방식이다. 첫 단계는 발표1개당 Worker 프로젝트1개로 분리하고 대상 이름을 slug별로 구분한다. `stage-talks`는 아래의 단일 발표 대상 예시다. 다른 발표를 만들 때 기존 프로젝트에 새 폴더만 덮어 배포하지 않으며, A의 재발행이 별도 발표 B의 URL·내용·자산을 바꾸지 않는지 확인한다. 한 Worker에 여러 발표를 모으는 후속 구조에서는 전체 발행 목록과 자산을 유지한 완전한 사이트 산출물로 배포하고 선택한 발표만 갱신해야 한다.

`dist/`는 제안 경로이며 아직 생성하거나 구현하지 않았다. 발표 선택·기존 파일 덮어쓰기·미디어 경로·해시·notes 제거·credit·발행manifest는 하나의 공통 패키저에서 처리한다. 현재 compiler를 또 만드는 대신 검증·미디어 필드 선언을 재사용하는 것이 적절하다.

Workers 설정의 최소 예시는 아래다. 이는 설정 제안이며 프로젝트 파일로 추가하지 않았다.

```json
{
  "name": "stage-talks",
  "compatibility_date": "2026-10-23",
  "workers_dev": true,
  "assets": { "directory": "./dist" }
}
```

`main`·Worker script·DB binding 없이 정적 폴더만 지정한다. 정적 파일이 있으면 Worker 코드를 호출하지 않고 반환하며, script도 파일도 없으면404다. `#4`는 브라우저의 기존 장 선택이므로 SPA fallback 설정은 필요하지 않다. [Static Assets 동작](https://developers.cloudflare.com/workers/static-assets/), [설정과 Bindings](https://developers.cloudflare.com/workers/static-assets/binding/)

실행 단계에서 Wrangler를 프로젝트 로컬 버전으로 고정하고, 인증 후 해당 설정을 지정한 `wrangler deploy`를 사용한다. `--assets <폴더>`도 공식 옵션이지만 반복 발행에서는 설정 파일에 발행 경로를 명시하는 편이 검토하기 쉽다. 사용자의 Git push만으로 자동 공개되지 않도록 첫 단계는 명시적인 발행으로 시작하고, 이후 동일 패키저를 CI에 연결한다. CI는 Cloudflare account ID·API token의 secret 설정이 필요하며 현재 구성·권한은 미확인이다. [Wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy), [GitHub Actions 연동](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)

## 공개 URL과 버전 관리

초기 주소 형태는 `https://stage-talks.<계정-subdomain>.workers.dev/talks/<slug>/index.html#4`다. 이름·계정 subdomain은 아직 예약·확인하지 않아 실제 주소가 아니다. 계정의 `workers.dev` route 활성화와 subdomain 설정이 필요하다. 활성화된 URL은 공개되며 방문자 로그인 없이 열 수 있다. Cloudflare는 업무에 중요한 production에는 route 또는 custom domain을 권고하므로, 반복해서 공식 행사에 쓰게 되면 `slides.<소유도메인>`으로 연결하는 방안을 추천한다. [workers.dev 설정·적용 범위](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)

발행manifest에는 source commit, 원고·런타임·미디어 hash, 발행시각과 Cloudflare version ID를 기록하는 것을 제안한다. 고정 주소는 다음 배포로 업데이트된다. Workers Version URL을 활성화하면 특정 버전을 따로 볼 수 있지만 이 주소도 공개이며, 기존 설정·연결 자원을 공유한다. 발표일에 고정할 자료는 별도 version URL 또는 버전 경로와 오프라인 사본을 보관한다. [Version URLs](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/)

문제 발생 시 정확한 version ID를 지정해 `wrangler rollback <VERSION_ID> --name stage-talks`로 이전 배포를 활성화할 수 있다. 공식 롤백 범위는 최근100개의 배포 버전이며, 외부DB 등 연결 자원의 상태까지 되돌리는 것은 아니다. 이번 정적 전용 설계는 해당 자원을 쓰지 않는다. 실제 배포를 한 뒤에는 **내용·미디어가 함께 이전 버전으로 돌아오는지**를 수용 검사로 확인해야 한다. 현재는 공식 동작 확인이며 실서비스 롤백 검증이 아니다. [Workers 롤백](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/), [정확한 CLI 문법](https://developers.cloudflare.com/workers/wrangler/commands/workers/#rollback)

## 현재 준비 상태와 수용 기준

**P0**는 기존 정적 파일·공통 모델을 재사용하는 경량 발행 패키저, 공개용 데이터에서 notes 제거, 읽기 전용 청중 화면, Workers 정적 설정, 실제 외부 링크·재발행 검증이다. **P1**은 사용자가 명시적으로 발행할 때 같은 명령으로 검증→번들→업로드→고정 링크를 출력하는 흐름과 정확 버전 복구다. 원격 동기화·공동 편집은 이번 구현 범위에 넣지 않는다.

- 가용: Node24.22.1·npm·GitHub CLI. 원격 URL은 `https://github.com/OU9999/stage-presentation-kit.git`.
- 미설정 관찰: PATH의 `wrangler`·`vercel`·`netlify` 없음. 저장소의 `.github`·Wrangler/Vercel/Netlify 설정 없음. 대표 Wrangler 설정 경로·관련 환경변수의 존재 여부만 검사했고 현재 셸에서는 발견하지 못했다. 인증 파일 내용·토큰 값은 읽거나 출력하지 않았다.
- 미확인: Cloudflare 계정 자체의 존재·로그인·역할·Workers 사용 권한·이름/subdomain·도메인 소유 여부, GitHub 요금제·Pages 기능·CI quota. 로컬 설정이 없다는 관찰을 계정이 없다는 결론으로 바꾸지 않는다.
- GitHub Pages API404는 총괄이 관찰했지만 사이트 부재와 현재 권한을 구별하지 못하므로 Pages 미설정을 확정하는 근거로 쓰지 않는다.
- 아직 수행하지 않음: 발행 패키저/public viewer 구현, 공개 배포, 실제 외부HTTPS·캐시·롤백·타기기 검사. root의 C안 커밋·푸시는 이 조사와 별도다.

구현의 수용 기준은 선택한 C예제7장이 외부 HTTPS에서 로그인 없이 열리고, localhost를 종료해도 열리며,6개사진·모바일읽기·장직접링크가 정상인 것이다. 공개용source·파일목록에서 노트·연구·다른발표가 빠지고, 로컬편집이 다른방문자에게 전파되지 않음을 확인한다. 새발행으로 바꾼 문구가 청중의 새로고침에 반영되고, 이전version복구 시 내용과자산이 일치해야한다. Console·Network·미디어실패도 함께 본다. 이 항목들은 아직 검사결과가 아닌 **다음 구현의 완료 조건**이다.

현재 공개 요구에는 인증 서비스를 추가하지 않는다. 이후 제한 공유로 바뀌면 인증은 별도 범위이며, 긴주소·검색차단을 접근제어로 취급하지 않는다. Workers는 Access로 production/version URL을 보호할 수 있지만 현재 요구에 적용하거나 계정을 설정하지 않았다. [Workers URL 접근제어](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/#manage-access-to-workersdev)

## 공식 자료 확인 기록

모두 2026-10-23 직접 열람했다. 가격·한도·기능은 확인일 기준이며 이후 발행 구현 시 다시 확인한다.

| 공식 문서 | 문서 표시 갱신일 | 이번에 적용한 조건 |
| --- | --- | --- |
| [Pages 개요](https://developers.cloudflare.com/pages/) | 2026-08-25 | 신규프로젝트 Workers 권고 |
| [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) | 2026-10-12 | 정적우선·script없는404·assets.directory |
| [Workers 정적 과금](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) | 2026-04-23 | 정적요청 무료무제한·저장추가비없음·script호출별도 |
| [Workers 한도](https://developers.cloudflare.com/workers/platform/limits/) | 2026-10-12 | Free20,000파일/버전·25MiB/파일·script일100,000요청 |
| [workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) | 2026-09-22 | 공개주소형태·계정subdomain·중요production권고·Access |
| [Version URLs](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/) | 2026-09-22 | version공개URL과유효조건 |
| [Rollbacks](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/) | 2026-07-15 | 정확버전복구·최근100버전·연결자원비복구 |
| [Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) | 2026-04-21 | dashboard/CLI파일한도·주소·Gitintegration전환불가 |
| [Pages Functions pricing](https://developers.cloudflare.com/pages/functions/pricing/) | 2026-09-08 | Functions없는정적요청무료무제한 |
| [GitHub Pages 생성](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) / [한도](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) | 페이지에 갱신일 미표시 | PRIVATE지원플랜·공개site·1GB/100GB한도 |
