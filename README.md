# ou-presentation

Markdown 하나로 발표 화면과 읽기 자료를 만드는 재사용 가능한 발표 엔진입니다.
발표마다 원고와 자료를 독립적으로 관리하며, 공통 Stage 테마는 검정 바탕·큰 글자·넓은 여백을 유지합니다.
Node.js 20 이상이 필요하고, 생성한 발표를 재생할 때에는 Node.js나 패키지 설치가 필요하지 않습니다.

## 바로 시작하기

```sh
npm ci
npm run dev
# http://127.0.0.1:4320
```

현재 저장소의 `talks/<발표이름>/slides.md`를 수정하면 미리보기가 갱신됩니다.
새 발표는 공통 엔진이나 HTML을 복사하지 않고 추가합니다.

```sh
npm run new -- team-review --title "팀 회고"
npm run build
npm run verify
```

`talks/team-review/slides.md`와 `assets/`가 생성됩니다. `---`로 장을 나누고 제목·문단·목록·이미지·표를 작성하세요.
`presentations/` 전체가 공유할 결과물이며, 원고를 수정한 뒤 다시 빌드합니다.

작성은 [역할·주역·보존 brief](DESIGN.md#역할에서-시안으로-연결하기)에서 시작하고 [작은 재사용 레시피](MARKDOWN-FIRST.md#역할을-유지하는-작은-레시피)로 지원 문법을 고릅니다. 사진·연구 자료가 없어도 H2/H3 의미 그룹과 공통 안내, 읽을 구절·실제 링크로 시안화할 수 있습니다. 실제 크기에서 현재안과 비교한 뒤 기술 검사와 시각 판정을 따로 남깁니다. LLM Wiki의 현재 키노트는 [공개 해설](talks/llm-wiki/materials/keynote-notes.md)·[현재 대본](talks/llm-wiki/materials/speaker-script.md)으로 이어 읽고, [현재 역할·coverage 회귀 명령](MARKDOWN-FIRST.md#실제-관측의-프로젝트-회귀)으로 검사합니다.

## 다른 프로젝트에서 재사용하기

발표 콘텐츠만 갖는 별도 프로젝트를 만듭니다. 이 저장소의 예제나 연구 자료를 복사하지 않습니다.

```sh
# 엔진 저장소에서 실행
npm run init -- ../my-presentations --title "나의 발표 모음"
cd ../my-presentations
npm install
npm run dev
npm run new:talk -- product-update --title "제품 소식"
npm run build
```

새 프로젝트의 구조는 다음과 같습니다.

```text
my-presentations/
├── ou.config.json
├── package.json           # 공통 엔진을 devDependency로 참조
├── talks/
│   └── my-talk/
│       ├── slides.md
│       └── assets/
└── presentations/         # build로 생성, 폴더 전체를 공유
```

기본 의존성은 이 엔진 저장소를 가리키는 로컬 `file:` 상대 경로입니다. 해당 위치를 유지하면 여러 프로젝트가 같은 엔진을 사용합니다.
발표 프로젝트의 폴더를 옮긴 뒤에는 `package.json`의 경로를 맞추고 `npm install`을 실행하세요.

다른 기기로 엔진까지 전달하려면 tarball로 묶습니다. npm 레지스트리에 공개할 필요는 없습니다.

```sh
# 엔진 저장소에서 실행
npm pack
npm run init -- ../portable-talks --package file:./ou-presentation-1.0.0.tgz
cp ou-presentation-1.0.0.tgz ../portable-talks/
cd ../portable-talks
npm install
npm run build
```

패키지는 `bin/`, `lib/`, 공통 runtime, template, 작성 안내를 포함합니다.
원고·공유 자산·예제·연구·테스트·생성 발표는 포함하지 않습니다. 각 발표가 참조할 자산은 그 발표 프로젝트에서 관리합니다.

## 설정과 명령

`ou.config.json` 한 곳에서 프로젝트를 설정합니다.

```json
{
  "title": "나의 발표 모음",
  "theme": "stage",
  "sourceDir": "talks",
  "outputDir": "presentations"
}
```

테마는 `stage`, `paper`, `midnight` 중 선택합니다. 설정 경로를 지정하지 않으면 현재 폴더에서 상위로 탐색합니다.
기존 `stage.config.json`도 지원하며 같은 폴더에 두 설정이 있으면 `ou.config.json`을 사용합니다.
기존 출력의 설정 파일을 바꿀 때에는 생성 폴더의 `.stage-generated.json`에 기록된 `config` 상대 경로도 새 설정에 맞춰야 합니다.
직접 관리하던 폴더를 출력 폴더로 덮어쓰지 않습니다.

| 명령 | 동작 |
| --- | --- |
| `npm run init -- <폴더>` | 비어 있는 폴더에 별도 프로젝트 생성 |
| `npm run new -- <이름> --title "제목"` | 현재 프로젝트에 발표 추가 |
| `npm run dev -- --port 4321` | 원고·자산·공통 엔진 변경 미리보기 |
| `npm run build` | 현재 Markdown 프로젝트 생성 |
| `npm run verify` | 생성물의 최신성 검사, 파일 수정 없음 |
| `npm run build:site` | 이 저장소의 기존 예제·스타터까지 함께 생성 |
| `npm run verify:site` | 전체 사이트 생성물 비교 검사 |
| `npm test` | 입력·빌드·개발 서버·호환성·패키지 검사 |

설치된 패키지에서는 `npx ou-presentation build`처럼 같은 CLI를 직접 실행할 수 있습니다.
`build`, `verify`, `dev`, `new`에 `--config path/to/ou.config.json`을 붙여 다른 프로젝트를 지정할 수도 있습니다.
기존 `node scripts/stage.cjs build|dev` 명령도 유지합니다.

JavaScript에서 재사용하려면 다음 API를 사용합니다.

```js
const { buildProject, startDev } = require('ou-presentation');
buildProject({ configPath: '/path/to/ou.config.json' });
// const preview = await startDev({ configPath: '/path/to/ou.config.json', port: 4320 });
// await preview.close();
```

## 저장소 구조

| 위치 | 역할 |
| --- | --- |
| `bin/` | 사용자 CLI 진입점 |
| `lib/` | 재사용 엔진: 원고 해석, 자산 처리, 빌드, 개발 서버, 초기화 |
| `templates/` | 발표·자료 HTML과 새 원고/프로젝트 템플릿 |
| 루트 `app.js`, `*.css`, `deck-model.js`, `blocks.js`, `visual.js` | 공통 브라우저 runtime. 기존 정적 예제의 상대 URL을 위해 위치 유지 |
| `scripts/` | 저장소 사이트 생성·검수와 이전 실행 경로의 호환 어댑터 |
| `talks/` | 발표별 원고와 개별 자산 |
| `presentations/` | 현재 발표의 공유용 생성물 |
| `examples/`, `starters/` | 직접 작성 예제와 사진을 갖춘 Markdown 스타터 |
| `tests/` | 엔진·호환성 회귀 검사 |
| `research/` | 조사·결정·검수 이력 |

## 작성과 디자인

수정 전 [DESIGN.md](DESIGN.md)에서 변경 범위와 보존할 의미·자료를 확인합니다.
[Markdown 작성법](MARKDOWN-FIRST.md) · [세부 입력 계약](CONFIG.md) · [현재 판 검수](DESIGN-REVIEW.md)를 따릅니다.
빌드·생성물 검사와 실제 화면의 시각 승인은 별도로 기록합니다.

[발표 모음](presentations/) · [LLM Wiki](presentations/llm-wiki/) · [발표 예제](examples/index.html) · [사진 포함 스타터](starters/markdown/)

기존 `content.js` 직접 작성·화면 편집 방식과 과거 검증 근거는 [기존 작성 안내](docs/legacy-guide.md)에 있습니다.
프로젝트 표시 이름은 `ou-presentation`이며, 기존 GitHub 저장소와 공개 배포 URL은 [배포 안내](DEPLOYMENT.md)의 기존 주소를 유지합니다.
