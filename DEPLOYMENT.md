# GitHub Pages로 발표하고 갱신하기

현재 `OU9999/stage-presentation-kit` 저장소를 공개하고, 같은 저장소의 `main`·루트에서 GitHub Pages를 발행하는 방식입니다. 별도 저장소나 앱 서버를 만들지 않습니다.

**공개 배포 완료:** 저장소 공개와 `main`·루트의 Pages 발행을 완료했습니다. 아래 주소에서 바로 발표를 열 수 있습니다.

## 발표 주소

| 용도 | 주소 |
| --- | --- |
| Markdown 발표·읽기 모음 | [원고에서 생성한 발표 모음](https://ou9999.github.io/stage-presentation-kit/presentations/) |
| 복사용 Markdown 스타터 | [독립 스타터6장](https://ou9999.github.io/stage-presentation-kit/starters/markdown/presentations/my-talk/) |
| 사용자가 고른 C안 | [현장 구성 예제 4번](https://ou9999.github.io/stage-presentation-kit/examples/devday-compositions/index.html#4) |
| 예제를 골라 시작하기 | [예제 갤러리](https://ou9999.github.io/stage-presentation-kit/examples/) |
| 기존 양식을 모두 살펴보기 | [20장 양식 모음](https://ou9999.github.io/stage-presentation-kit/) |
| Vite·React 검토와 편집 시제품 | [검토 결과 화면](https://ou9999.github.io/stage-presentation-kit/research/vite-react-20261027/) · [공개 배포 검증](research/vite-react-20261027/DEPLOYMENT.md) |

루트 주소의 내용은 20장 양식 모음입니다. C안은 현장 구성 7장 중 4번이므로 위 직접 링크를 공유하세요. `#4`는 처음 보여줄 장을 정합니다. 청중은 설치·GitHub 로그인 없이 링크를 열어 각자 장을 넘겨 봅니다. Pages 발행 후에는 사용자의 로컬 서버나 컴퓨터를 켜둘 필요가 없습니다.

## 전체 사이트의 생성·검증

공통 runtime·template·원고·예제를 수정한 뒤 저장소 루트에서 실행합니다.

```sh
npm ci
npm run build:site
npm run verify:site
npm test
```

build:site는 공통 templates/presentation.html에서 루트20장과 기존 예제를 만들고, 현재 talks와 독립 Markdown 스타터의 발표/읽기를 생성합니다. 모든 입력을 먼저 검사하고 생성 후 다시 일치를 검증합니다. verify:site는 live 결과를 수정하지 않고 stale content/hash/runtime 사본·누락·불필요 생성물을 알려 주며, 불일치가 있으면 실패합니다. 오류를 해결하고 다시 build한 뒤 원본과 생성 결과를 함께 commit/push합니다.

현재 Pages는 main/루트의 정적 파일을 발행합니다. Pages가 이 Node 빌드를 대신 실행하지 않으므로 생성 결과도 커밋해야 합니다. 공개 주소는 유지합니다. root index.html과 각 발표 HTML은 생성물이며 공통 DOM 수정은 templates/presentation.html에서 합니다.

## 새 Markdown 원고의 배포

새 작성 흐름은 [MARKDOWN-FIRST.md](MARKDOWN-FIRST.md)를 따릅니다. `talks/주제/slides.md`를 수정하고 `npm ci` 후 `npm run dev`에서 확인합니다. `npm run build`로 만든 `presentations/` 전체와 원본·설정·바뀐 참조 자산을 함께 커밋하고 푸시합니다. GitHub Pages가 Node 빌드를 대신 실행하지 않으므로 생성물을 함께 반영해야 합니다. 이 저장소의 공개 원고 `talks/`와 공유 결과 `presentations/`는 구분됩니다.

`presentations/` 아래 발표·읽기 화면은 읽기 전용입니다. 오류가 나면 원고를 수정해 다시 생성하세요. 자체 미리보기 서버는 생성 결과만 제공하며 원본 Markdown을 자동 내려받기로 노출하지 않습니다. 저장소 전체를 Pages에 게시하므로 저장소에 추가한 원고 자체는 공개됩니다. 아래 절차는 기존 `examples/` 전용 문법·직접 `content.js` 작성 방식의 호환 안내입니다.

## 1. 원고를 고친다

**Markdown 발표:** 가까운 예제의 `slides.md`를 수정합니다. C안은 [현장 구성 원고](examples/devday-compositions/slides.md)의 4번입니다. 문법과 입력 제한은 [MARKDOWN.md](MARKDOWN.md)·[CONFIG.md](CONFIG.md)에 있습니다.

현재 5개 예제를 다시 생성하려면 저장소 루트에서 실행합니다. Node.js가 필요하며 패키지 설치는 없습니다.

```sh
node scripts/build-examples.cjs
```

C예제만 다시 만들거나 새 발표를 다른 폴더에 만들 때에는 다음 명령을 사용합니다.

```sh
# 기존 C예제 갱신
node scripts/markdown-deck.cjs examples/devday-compositions/slides.md examples/devday-compositions

# 복사해 작성한 새 원고를 별도 발표 폴더에 생성
node scripts/markdown-deck.cjs examples/my-talk/slides.md examples/my-talk
```

변환은 각 발표 폴더의 `index.html`·`content.js`를 만들고, 공통 JS/CSS와 미디어의 상대 경로를 연결합니다. 생성 파일만 고치면 다음 빌드에 덮어써지므로 Markdown을 원본으로 관리하세요. 새 발표는 저장소 기준 `examples/my-talk/index.html`에 생성되며, 공개 주소는 `https://ou9999.github.io/stage-presentation-kit/examples/my-talk/index.html`입니다. 갤러리 카드는 자동 추가되지 않습니다.

**Params 발표:** 루트 [content.js](content.js)를 직접 수정합니다. [한 장 스타터](examples/editorial-starter.js)로 시작할 수도 있습니다. 이 방식은 Markdown 빌드가 필요하지 않습니다. 이미지도 저장소에 함께 넣고 경로를 맞춥니다. 원고와 내용·사진을 바꿨다면 필요한 PDF·미리보기 이미지도 별도로 갱신하세요. 빌드가 이 산출물까지 자동으로 만들지는 않습니다.

## 2. 로컬에서 미리 본다

`index.html`이나 해당 예제의 HTML을 직접 열 수 있습니다. HTTP로 보려면 저장소 루트에서 아래 서버를 실행합니다. 같은 폴더의 서버가 이미 실행 중이면 기존 서버를 사용하세요.

```sh
python3 -m http.server 4317 --bind localhost
```

[로컬 C안](http://localhost:4317/examples/devday-compositions/index.html#4)에서 문장·사진·이전/다음·전체 보기·좁은 화면의 읽기 모드를 확인합니다. 입력이나 공통 런타임을 바꿨다면 기존 검사도 실행하세요.

```sh
node --test tests/*.test.cjs
```

## 3. 원본과 생성 결과를 함께 commit/push한다

현재 브랜치와 변경을 확인하고, 이번 발표에 해당하는 파일만 선택합니다. 예를 들어 C예제의 Markdown을 수정했다면 다음 세 파일을 함께 반영합니다. 사진·공통 파일·PDF 등을 실제로 바꿨다면 그 경로도 별도로 추가하세요.

```sh
git status --short
git diff -- examples/devday-compositions/slides.md examples/devday-compositions/content.js examples/devday-compositions/index.html
git add examples/devday-compositions/slides.md examples/devday-compositions/content.js examples/devday-compositions/index.html
git commit -m "Update presentation content"
git push origin main
```

Params만 수정한 경우에는 바꾼 `content.js`와 사진을 선택합니다. Markdown 생성 HTML은 내용/공통 파일 해시를 자동 갱신합니다. Params의 `content.js`를 직접 바꿀 때에는 루트 `index.html`의 `content.js?v=...` 값도 새 내용의 식별값으로 갱신하면 이전 브라우저 캐시와 구분하기 쉽습니다. 해당 HTML도 함께 반영하세요.

다른 사람이나 에이전트의 작업을 함께 올리지 않도록 변경 목록을 확인합니다. 현재 Pages는 `main`을 발행하므로 다른 브랜치에 push한 변경은 `main`에 반영되기 전까지 사이트에 나오지 않습니다.

## 4. Pages 성공과 실제 링크를 확인한다

[저장소 Actions](https://github.com/OU9999/stage-presentation-kit/actions)에서 해당 커밋의 Pages 배포가 성공했는지 확인한 뒤 발표 링크를 엽니다. `git push` 성공만으로 Pages 배포까지 끝났다고 보지는 않습니다. 생성·반영에는 시간이 걸릴 수 있습니다.

배포가 성공하면 같은 발표 URL을 유지한 채 내용이 갱신됩니다. 이미 열린 청중 탭은 새로고침해야 새 원고를 읽습니다. 새 문구·사진이 보이는지 확인하고, 이전 내용이 남으면 강력 새로고침이나 다른 브라우저에서도 배포본을 확인하세요. 사진/JS가 404인지, Console 오류가 있는지도 함께 봅니다.

설정 기준은 [Settings → Pages](https://github.com/OU9999/stage-presentation-kit/settings/pages)의 `Deploy from a branch`·`main`·`/(root)`입니다. 루트의 `.nojekyll`은 기존 HTML/JS/CSS를 그대로 제공하도록 기본 Jekyll 변환을 끕니다. 최초 설정은 배포 담당이 수행하며, 이후 같은 source를 유지하면 `main`의 새 커밋이 배포됩니다. [공식 발행 source 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 화면 편집·발표자 창을 사용할 때

화면의 **내용 편집**은 해당 브라우저에만 저장됩니다. **내용 내보내기**는 현재 데이터를 `content.js`로 내려받는 기능이며 GitHub에 업로드하지 않습니다. Params로 쓰는 발표는 내려받은 파일을 해당 원본에 반영하고 commit/push합니다. Markdown 발표라면 수정 내용을 `slides.md`에도 옮겨 다시 생성해야 다음 빌드에 남습니다. Markdown 역변환은 없습니다.

발표자 창은 현재 브라우저의 원래 슬라이드 창과 연결해 노트·다음 장을 보여줍니다. 행사장이나 화상회의에는 원래 슬라이드 창을 공유하세요. 링크 방문자의 장을 원격으로 동시에 넘기는 기능은 현재 없습니다. 작은 화면의 청중은 읽기 모드를 이용할 수 있습니다.

이 저장소는 원고·노트·연구·이력도 공개하는 방식입니다. 현재 예제 노트는 가상 예제와 작성 안내이며, 향후 비공개로 둘 개인 발표 원고·노트는 별도로 관리합니다. 사진과 외부 연구 자료의 조건은 [크레딧](assets/CREDITS.md)과 해당 조사 기록을 따릅니다.
