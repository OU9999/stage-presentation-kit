# 현재 저장소 PUBLIC·GitHub Pages — 총괄 실배포 확인

2026-10-23 · 담당 `/root`. 별도 저장소 없이 기존 `OU9999/stage-presentation-kit`를 PUBLIC으로 전환하고 같은 저장소의 Pages를 활성화했다. 사용자 승인 범위에 공개 전환·배포·화면 열기·커밋/푸시가 모두 포함된다.

- [선택한 C안 바로 열기](https://ou9999.github.io/stage-presentation-kit/examples/devday-compositions/index.html#4)
- [예제 갤러리](https://ou9999.github.io/stage-presentation-kit/examples/)
- [20장 양식 모음](https://ou9999.github.io/stage-presentation-kit/)
- [원고 작성부터 같은 URL 갱신까지](../../DEPLOYMENT.md)

## 실제 배포

설정 커밋 `87396f0ae76e3deac530f13c7a4f840a4175d6b1`을 `origin/main`에 push하고 원격 SHA 일치를 확인했다. GitHub CLI로 PRIVATE→PUBLIC 전환, Pages API로 `main`·`/`·`build_type: legacy`를 설정했다. HTTPS 강제가 켜져 있다. 별도 저장소·사용자 정의 Actions 파일·추가 backend·계정은 만들지 않았다.

최초 [Pages 실행39935622992](https://github.com/OU9999/stage-presentation-kit/actions/runs/39935622992)은 `completed/success`, Pages build는 같은 커밋의 `built`, error message는 null이었다. [정리한 GitHub 근거](evidence/github.json)는 무인증 repository API의 `private: false`와 Pages 설정·배포 커밋을 기록한다.

이 보고서와 사용 가이드는 배포된 제품 바이트를 바꾸지 않는 후속 문서다. 최종 전달 시 문서 커밋까지 push하고 해당 HEAD의 Pages 성공·원격 SHA 일치를 다시 확인한다. 저장소의 기존 `main` push가 이후에도 같은 사이트를 갱신한다. [공식 branch 발행 설명](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 외부 HTTP·브라우저

| 실제 검사 | 결과 |
| --- | --- |
| 인증 없는 공개 파일 | 기존 HTML71·미디어58참조와 진입/PDF를 합친 고유58URL을 Authorization·쿠키 없이 요청했다. 모두200이며 로컬 SHA-256과 일치했다. [요청별 근거](evidence/http.json). |
| C안 직접 링크 | 외부 `#4`에서 Field Notes, 12타일·편집 필드43개, `04 / 07`과 원본 상태를 확인했다. 데크의 사진7개 모두 로딩됐다. [실제 화면](evidence/desktop-c.png). |
| 탐색·전체 보기 | 다음 버튼으로5번, 키보드로4번 복귀, 전체 보기7장과 C안 재선택을 실제 조작했다. |
| 발표자 창 | 실제 HTTPS 팝업에서4/7을 표시하고 원래 화면→발표자5번, 발표자→원래 화면4번의 양방향 이동을 확인했다. 팝업은 검증 후 닫았다. 원격 청중의 장 동기화 기능을 뜻하지 않는다. |
| 6개 발표 진입 | 루트20장과 예제5개×7장, 총55개의 DOM 생성·제목/카운터와 각 발표의 Home/End 조작을 확인했다. 이번에는55장 모두를 순차 육안 검수한 것은 아니다. |
| 갤러리 | 카드5개·미리보기5개 로딩, 현장 구성 카드 클릭→실제 C안4번 이동을 확인했다. |
| 모바일 |390×844 읽기 모드에서12타일·43필드, 사진 로딩·단일 열과 문서 가로폭390px을 확인했다. [앞부분](evidence/mobile-c.png)·[표지](evidence/mobile-cover-c.png)·[가운데](evidence/mobile-middle-c.png)·[마지막](evidence/mobile-end-c.png)을 실제 스크롤해 캡처·육안 확인했다. |
| Console·Network | C안·탐색·6개 진입·갤러리의 관찰 이벤트에서 runtime exception, console/log 오류·경고, loading failure와 HTTP400이상 응답0. [브라우저 근거](evidence/browser.json). |
| 회귀 | `node --test tests/*.test.cjs` 163개 통과. 제품 런타임·원고·생성 HTML·자산은 이번 배포에서 수정하지 않았다. |

브라우저는 ego-browser Space11/p1을 사용했다. 최종 전달 때 공개 C안 탭을 사용자에게 남긴다. 이전 사용자용 Space4/5/8과 기존 localhost4317 서버(PID67305)는 보존했다. PDF6개는 외부 파일 바이트를 대조했으며, 이번에6개 전체를 다시 렌더·육안 검수한 것은 아니다.

## 팀 인계와 사용 경계

실제 엔지니어 매니저·배포 담당·발표 흐름 담당이 준비·협의·독립 검수 후 편집을 종료했다. [팀 검수](manager-review.md)와 [검사 기록](manager-check.json), [정적 사전 검사](deployment-check.json)를 총괄의 실제 외부 증거와 구분한다. 총괄은 사용자 승인에 따른 GitHub mutation과 최종 Git 전달·외부 동작을 직접 확인했다.

화면 편집은 방문자 자신의 브라우저 저장이며 공개 원고를 즉시 수정하지 않는다. 실제 발표 내용을 갱신하려면 원고/params·필요한 사진을 반영해 생성·commit/push하고 Pages 성공을 확인한다. 공개 링크는 청중이 각자 넘겨 보는 발표이며 원격 진행 연동은 기존 제품 범위 밖이다. 공개된 전체 저장소의 파일·노트·이력 범위는 사용자가 선택한 그대로 유지했다.
