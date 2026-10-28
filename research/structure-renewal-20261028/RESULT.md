# 재사용 프로젝트 구조 개선

[구조 점검](../structure-audit-20261028/RESULT.md)의 세 개선을 구현했다. 전체 사이트의 생성·검증 명령을 통합하고, 공개 HTML과 공통 템플릿을 분리했으며, 자체 자료를 갖춘 Markdown 스타터와 현재 폴더 안내를 제공한다.

[스타터 발표6장](../../starters/markdown/presentations/my-talk/) · [같은 원고 읽기](../../starters/markdown/presentations/my-talk/read.html) · [복사 안내](../../starters/markdown/README.md)

## 작성과 배포

```sh
# kit 저장소 루트에서 새 원고 복사
cp -R starters/markdown/talks/my-talk talks/my-new-talk
npm run dev

# 현재 Markdown 프로젝트 생성
npm run build

# 전체 공개 결과 생성·검증
npm run build:site
npm run verify:site
npm test
```

`build:site`는 현재 원고4개, 기존 예제8개, 루트20장 모음과 독립 스타터를 함께 갱신한다. 모든 입력을 먼저 검사하고 생성 뒤 다시 검증한다. `verify:site`는 임시 경로에서 예상 결과를 만들고 비교하며, 오래된 내용·캐시 주소·runtime 사본·누락·불필요 생성물을 검출한다. 불일치 시 CLI는 실패하고 공개 결과를 수정하지 않는다.

공통 DOM 원본은 [presentation.html](../../templates/presentation.html), runtime 목록·해시·참조 처리는 [runtime.cjs](../../scripts/runtime.cjs), 전체 사이트 조정은 [build-site.cjs](../../scripts/build-site.cjs)에서 맡는다. 새/기존 Markdown 빌더와 직접 원본 예제, dev watcher가 같은 템플릿을 사용한다. 새 Markdown 빌드는 공개 root index에 의존하지 않는다. 전체 사이트 생성에서는 현재 루트20장 결과를 템플릿과 content.js에서 다시 만든다.

## 복사할 폴더

스타터는 config, talks/my-talk/slides.md, 같은 폴더의 사진3장·읽기 첨부·출처 안내, 생성 presentations를 갖췄다. 다른 덱이나 저장소 공용 자산에 의존하지 않는다. 현재 저장소에는 원고 폴더만 talks 아래로 복사한다. 별도 프로젝트는 스타터 전체를 복사한 뒤 kit에서 `--config`로 같은 엔진을 재사용한다. 공유할 때에는 그 프로젝트의 presentations 전체를 전달한다.

[README](../../README.md), [작성 안내](../../MARKDOWN-FIRST.md), [배포 안내](../../DEPLOYMENT.md)에 현재 원고·공통 엔진·템플릿·생성물·기존 작성 경로를 구분했다. 기존 예제의 공개 URL과 runtime7개, 현재 원고4개는 유지한다.

## 검증과 후속 점검

- 전체 자동 검사 **250개 통과**. 새5개 검사는 전체 갱신·반복 재현, 오래된 원고/runtime·누락/추가 파일 검출, 검증의 비수정 동작과 CLI 실패, 템플릿 독립성, 사전 입력 오류 시 기존 결과 보존, 스타터 복사·이동을 확인한다. dev의 템플릿 변경 감지도 검수했다. [검사 출력](evidence/tests.txt)
- 실제 사이트/예제120파일에서 검증의 비수정 동작과 전체 빌드 반복 바이트 동일을 확인했다. 비수정 회귀는 파일 내용과 수정 시각을 모두 비교한다. runtime·root content/index·4원고 총13파일의 SHA도 기준4d1adfa와 같다. 이전 조사 근거는 변경하지 않았다. [통합 확인](evidence/verification.json)
- 실제 브라우저에서 새6장·기존 대표9화면·Paper2화면을 확인했다. 기존 사진·모자이크·혼합 타일·아이콘월6화면은 이전 최종 PNG와 **바이트까지 동일**하다. [화면 기록](evidence/local-browser.json)
- 390px 읽기의6장 전문·alt·원본 contain·저장 호출0, 전체 보기6장·타일5개·아이콘5개·preview 링크0, 발표자 현재/다음·양방향 이동을 확인했다.
- 별도 프로젝트를 실제 CLI로 생성하고 폴더를 옮겨17파일을 동일하게 다시 만들었다. 원고에서 혼합 자료5→8개, 아이콘5→12개, 제목·사진을 바꿔 자동 반영과 정상 배치를 확인했다. 누락 이미지 경로는 마지막 정상8타일을 유지했고, 원고 복구 뒤 자동 회복했다. [작성 화면](evidence/usage-browser.json) · [CLI·이동·수정](evidence/usage.json)

스타터는 스톡 사진과 가상 진행 계획임을 원고와 출처 안내에 명시한다. 일반 원고는 같은 폴더의 assets와 함께 복사하며, 공통 엔진의 설치·실행은 kit에서 재사용한다. 발표 작성에 research 이력을 복사할 필요는 없다.

공개 전달 결과는 [배포 확인](DEPLOYMENT.md)에 기록한다. 이 검수는 모든 운영체제·임의 원고의 자동 fit·접근성 인증을 뜻하지 않는다.
