# 공개 발표 링크의 보안·공개 범위 검토

확인일 2026-10-23 · 현재 코드 `f9553170e56bcca24909d22e7ebd0f8d7df01f0d` · 조사만 수행. 제품 코드·계정·배포·Git 공개 범위를 바꾸지 않았다.

## 판단

사용자가 정한 **누구나 열 수 있는 공개 발표**에는 `github.io`를 써도 무리가 없다. GitHub Free에서 PUBLIC 저장소로 Pages를 만들 수 있으므로 비공개 원본은 유지하고, **새 PUBLIC 배포 저장소에 공개 결과만 넣는 방식**을 권고한다. 현재 계정의 요금제가 확인되지 않았어도 이 무료 경로는 성립한다. [GitHub Pages 공식 조건](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

이번 코드에서 먼저 다뤄야 할 문제는 호스팅 업체 이름보다 **어떤 파일·내용을 공개하느냐**다. GitHub Pages와 Workers 모두 청중에게 재생용 HTML·JS·사진을 보낸다. 공개 페이지에서 내려받은 데이터에 남은 노트를 숨길 수는 없다. 청중에게 배포한 자료를 복사하지 못하게 하는 기능도 이 정적 공유 방식에는 없다.

## 현재 코드에 따른 실제 영향

| 항목 | 직접 확인 | 공개할 때의 조치 |
| --- | --- | --- |
| 발표자 노트 | `app.js` 953–957행은 원본 `rawDeck` 전체를 JSON으로 내보내고, 1013행은 `notes`를 렌더링한다. `?presenter=1`은 인증이 아니다. 현장 구성 7장 모두 노트가 있다. | 원본을 통째로 배포하지 않는다. 공개 데이터를 생성할 때 노트를 실제로 빼고, 로컬 원본/발표자 창에는 남긴다. |
| 확장 필드·연구 자료 | 모델 검증은 원문을 보존한다. 합성 입력으로 `notes`와 임의 `extension.memo`가 검증 후에도 남는 것을 확인했다. 저장소에는 연구 파일 310개가 추적돼 있다. | 표시하는 필드만 투영하고 선택한 발표의 자산만 복사한다. 원본 저장소 전체 복제·연구 파일 통째 업로드를 발행 방식으로 쓰지 않는다. |
| 사진·PDF | 사진은 로컬 파일이며 사용 자산과 credit가 [크레딧 파일](../../assets/CREDITS.md)에 구분돼 있다. 연구용 원본 사진은 재사용 예제 자산과 별도다. 현재 Git에는 PDF 6개도 있다. | 선택한 발표에 실제 쓰인 공개 가능한 사진/credit만 넣는다. PDF도 배포하면 파일 전체를 누구나 받으므로 선택한 공개본만 넣는다. 연구 원본·다른 발표 PDF를 함께 공개하지 않는다. |
| 화면 편집 | `app.js` 44–60·887–899행의 저장은 해당 origin/브라우저 `localStorage`이고, 내보내기는 다운로드다. 앱에 서버 쓰기 API 호출은 없다. | 청중의 화면 편집으로 다른 사람의 발표 원본이 바뀌는 구조는 아니다. 공개 viewer에서 작성 UI와 로컬 편집본 복원을 제외하는 작업은 배포본 일관성·편의를 위한 것이다. 서버 원본 보호를 위한 긴급 보안 수정으로 해석하지 않는다. 비공개 작성은 기존 localhost/파일 원본에서 한다. |
| 발표자 동기화 | 원래 창과 `opener`/`postMessage`로 연결된다. | 외부 청중에게 발표자의 노트/장 이동이 자동 전송되는 기능으로 설명하지 않는다. 공개용 데이터에서는 노트를 제외한다. |
| PDF 노트 | `styles.css` 896–916행의 인쇄 스타일이 발표자 영역을 숨긴다. | 이 PDF 동작과 JS 파일의 노트 공개는 다르다. PDF에서 안 보여도 같은 사이트의 원본 JS에 있으면 공개돼 있다. |

근거: [app.js](../../app.js), [deck-model.js](../../deck-model.js), [원문 보존 회귀](../../tests/deck-model.test.cjs), [인쇄 CSS](../../styles.css), [읽기 전용 조사 영수증](evidence/public-sharing-security.json). 이 조사는 전면 보안 감사나 모든 파일의 비밀 정보 검사를 수행한 것이 아니다. 현재 노트가 존재한다는 관찰을 실제 기밀 유출 사고로 해석하지 않는다.

## GitHub 배포 저장소에서 추가로 고려할 차이

PUBLIC 배포 저장소는 웹사이트뿐 아니라 **커밋된 파일과 과거 버전도 공개**한다. 발표에서 삭제한 문장이 이전 커밋에는 남을 수 있다. 따라서 새 배포 저장소는 원본 저장소를 복제해 remote만 바꾸는 방식으로 시작하지 않고, 공개 결과만 담는 새 이력으로 시작한다. 한 번 공개된 자료의 복제본까지 나중에 회수할 수 있다고 안내하지 않는다. [GitHub의 저장소 이력·복제본 설명](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

이 차이는 **현재 자료와 이후 모든 공개 버전을 공개해도 되는 발표**에는 운영상 수용할 수 있다. 공개 후 이전 버전의 존재까지 숨겨야 하는 자료라면 PUBLIC 배포 저장소가 그 요구에 맞지 않는다. 다만 Workers로 옮겨도 이미 방문자가 받은 공개 자료를 회수하는 문제까지 해결되지는 않는다.

## HTTPS와 로컬 컴퓨터의 관계

`github.io`의 새 Pages 사이트는 자동 HTTPS를 제공한다. HTTPS는 전송 중 도청·변조를 줄이는 기능이며, 방문자 인증이나 자료 비공개화를 뜻하지 않는다. GitHub도 Pages 사이트는 원본 저장소가 비공개여도 기본적으로 인터넷에 공개된다고 설명한다. [GitHub HTTPS 공식 설명](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

GitHub 서버에 정적 파일을 올리는 방식은 현재 사용자의 localhost 서버를 인터넷에 개방하는 방식과 다르다. 발표 컴퓨터의 포트를 외부로 열거나 켜둘 필요가 없다. 현재 로컬 서버 공개용 터널을 만드는 방안은 권고하지 않는다.

## 공개 발표와 기밀 발표

- 이번 요구처럼 누구나 볼 공개 발표는 공개용 데이터·자산만 선별해 GitHub Pages로 제공한다.
- 로그인한 특정 사람만 볼 기밀 발표는 이번 공개 링크 방식의 대상이 아니다. 긴 URL이나 검색 차단으로 접근을 제한했다고 하지 않는다. GitHub의 비공개 Pages 접근 제어도 일반적인 PUBLIC 무료 Pages와 다른 기능이다. [비공개 Pages의 Enterprise 조건](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site).

## 비용·자동화 담당과 협의할 초안

보안 관점에서는 **PRIVATE 작성 원본 + PUBLIC 결과 저장소 + GitHub Pages**에 동의한다. 초기에는 기존 Git 인증으로 공개 결과를 검토한 뒤 배포 저장소에 수동 발행하는 절차가 단순하다. private 원본의 Actions가 다른 public 저장소에 자동 쓰는 구성은 별도 권한이 필요하므로 첫 공유 링크의 필수 조건으로 넣지 않는다. 공식 비용·Actions 권한은 배포 담당의 검증과 합쳐 최종 보고한다.

공통 공개 packager는 기존 Workers 제안에도 필요했던 준비 작업이다. 작은 viewer 모드로 작성 버튼을 정리하는 일은 후속 편의 선택이며 첫 공개 링크의 보안 전제조건이 아니다. GitHub Pages를 고른다고 새 서버·로그인·편집 백엔드를 만들 필요는 없다. 아직 packager·공개 viewer·Pages 설정·실제 외부 링크는 구현하거나 배포하지 않았다.

## 직접 협의 결과

배포 담당이 이 초안을 읽고 PUBLIC 이력의 추가 공개가 Workers 유지의 필수 이유인지 반론했다. 공개본만 담은 새 이력으로 시작하면 원본 PRIVATE 이력을 노출하지 않으므로 현재 공개 발표 조건에서는 Pages를 배제할 이유가 없다는 데 합의했다. 반대로 과거 공개본도 비공개로 만들 요구라면 다른 조건으로 다시 판단한다.

본인은 배포 담당의 [비용 초안](github-pages-cost-draft.md)을 직접 읽고, 초기 수동 push에 private CI나 새 cross-repo secret이 필수로 들어갔는지 확인했다. 기존 Git 인증을 쓰는 초기 발행과 후속 자동화 권한이 분리돼 있어 해당 우려는 해소됐다. 상대의 추가 반론에 따라 viewer UI 정리는 서버 원본 보호가 아니라 사용 편의·배포본 일관성으로 명확히 구분했다.
