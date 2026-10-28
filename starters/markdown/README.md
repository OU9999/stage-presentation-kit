# Markdown 발표 스타터

[발표 모음](presentations/) · [발표6장](presentations/my-talk/) · [같은 원고의 읽기](presentations/my-talk/read.html) · [수정할 원고](talks/my-talk/slides.md)

이 작은 프로젝트는 원고·사진·첨부·설정과 공유할 생성 결과를 함께 갖췄습니다. 다른 발표의 파일이나 저장소 공용 사진 경로를 참조하지 않습니다. 공통 STAGE 디자인은 kit의 엔진으로 생성합니다.

처음 kit를 받았다면 kit 저장소 루트에서 `npm ci`를 한 번 실행합니다.

## 이 저장소에 새 발표 추가

kit 저장소 루트에서 새 이름으로 원고 폴더를 복사합니다.

```sh
cp -R starters/markdown/talks/my-talk talks/my-new-talk
npm run dev
```

`talks/my-new-talk/slides.md`의 제목·문장·사진을 바꿉니다. 같은 폴더의 assets도 함께 복사됐으므로 새 발표를 등록하거나 JSON·HTML·CSS에 본문을 다시 적지 않아도 됩니다. 새 이름의 폴더를 사용하세요.

## 별도 프로젝트로 사용

kit 저장소 루트에서 새 경로로 프로젝트 전체를 복사합니다.

```sh
cp -R starters/markdown ../my-presentation
npm run dev -- --config ../my-presentation/stage.config.json
npm run build -- --config ../my-presentation/stage.config.json
```

실행 명령은 kit 저장소에서 사용합니다. kit의 공통 엔진과 패키지 설치를 재사용하고, 원고·설정·결과는 새 프로젝트에 둡니다. 별도 프로젝트를 이동해도 config 기준 상대 경로를 유지하면 다시 생성할 수 있습니다.

## 고칠 파일과 공유할 파일

```text
stage.config.json              프로젝트 제목·테마·입출력 위치
talks/my-talk/
   slides.md                   수정할 원고
   assets/                     이 발표의 사진·첨부
   README.md                   원고 작성과 사진 출처
presentations/                생성 결과 · 직접 편집하지 않음
   index.html                  발표 모음
   my-talk/                    발표·읽기·데이터·참조 자산
   _runtime/                   공통 재생 엔진
```

config의 sourceDir는 talks, outputDir는 presentations입니다. 공유할 때에는 이 프로젝트의 **presentations 전체**를 HTTP 정적 호스팅에 올립니다. 미리 생성된 폴더는 Node 설치 없이 볼 수 있습니다. 원고를 고친 뒤에는 다시 build하세요. my-talk 폴더만 떼면 _runtime이 빠집니다.

kit 전체의 공통 엔진이나 template을 바꾼 경우에는 kit에서 `npm run build:site`와 `npm run verify:site`로 공개 예제와 이 스타터의 결과까지 갱신·검증합니다. verify는 오래된 생성물을 수정하지 않고 알려 줍니다.
