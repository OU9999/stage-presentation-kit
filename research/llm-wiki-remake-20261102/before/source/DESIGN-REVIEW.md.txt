# 현재 판 디자인 검수 기록

시각 판단의 정본은 [DESIGN.md](DESIGN.md)입니다. 이 안내는 실제 화면의 판정과 현재 입력·증거를 묶는 기록 형식과 명령을 설명합니다. 자동 검사는 파일의 실재·최신성·범위 대응을 확인하며, 실제 열람이나 디자인 판단의 옳음을 증명하지 않습니다.

## 작성과 확인

저장소 루트에서 Node.js 20 이상과 `npm ci`로 설치한 패키지를 사용합니다. `--source`와 `--record`는 저장소 상대 경로이며 발표별로 명시합니다. 새 발표를 현재 LLM Wiki 기록에 덮어쓰지 않습니다.

```sh
node scripts/design-review.cjs draft --source talks/my-topic/slides.md --record talks/my-topic/design-review.json --mode presentation-stage-only --viewport 1440x1000 --owner reviewer-name
```

이 명령은 입력 fingerprint와 원고 전체 장수에 맞는 `unreviewed` 초안만 만듭니다. `--slides 2-5` 또는 `--slides 2,4,5`로 범위를 좁히고 `--dpr 2`로 DPR을 지정할 수 있습니다. 기본 DPR은1입니다. 기존 기록은 덮어쓰지 않습니다. 승인·검토자·판정 이유를 생성하지 않습니다.

1. [DESIGN의 변경·검수 계약](DESIGN.md#변경과-현재-판-검수)에 따라 변경 영향과 보존할 의미·자료를 정합니다.
2. 필요한 실제 화면을 캡처하고 장·모드·viewport와 캡처 입력을 대응시킵니다. 현재 checker는 장별 원본 PNG와 아래 manifest 형식을 사용합니다.
3. 화면을 직접 검토한 담당자가 `reviews`에 실제 검토자·시점·구체 이유·근거와 상태를 기록합니다. 개선 필요나 미확인에는 담당·다음 행동을 남깁니다.
4. 기록을 검사하고 기술 결과와 시각 판정을 따로 보고합니다.

```sh
node scripts/design-review.cjs check --source talks/my-topic/slides.md --record talks/my-topic/design-review.json
node scripts/design-review.cjs check --source talks/my-topic/slides.md --record talks/my-topic/design-review.json --require-approved
```

`npm run design:review -- check ...`도 같은 도구를 실행합니다. 빌드·테스트·`verify:site`와 별도 명령입니다.

발표의 시각 승인을 보고할 때는 `--require-approved`를 통과한 명시 범위만 승인으로 표현하고, 재점검·교정 명세 작업의 `needs-changes` 완료는 본편 승인과 구분한다.

| 결과 | 일반 `check` | `check --require-approved` |
| --- | --- | --- |
| 현재 근거와 모든 판정이 유효, 명시 범위 전부 승인 | 종료0 | 종료0 |
| 현재 근거와 모든 판정이 유효, 개선 필요가 있음 | 종료0, 제품 시각 승인 미완료 표시 | 종료1 |
| 미확인 범위가 있음 | 종료1, 검토 미완료 표시 | 종료1 |
| 필수 입력·증거 누락, 변조, 범위 불일치, 오래된 근거 | 종료1 | 종료1 |

저장할 판정은 `approved`·`needs-changes`·`unreviewed`입니다. `stale`은 검사 시 fingerprint 불일치로 드러나는 상태입니다. 이전 기록을 보존하고 영향 범위의 입력·캡처·판정을 갱신합니다. hash만 새 값으로 덮어써 이전 승인을 재사용하지 않습니다. 명시한 일부 장·모드의 성공을 덱 전체·다른 화면·모션의 승인으로 확대하지 않습니다.

## 기록 형식

형식 이름은 `stage-design-review-v1`이며 SHA256은 파일 바이트의 소문자 hex입니다. 실제 완성 예시는 [현재 LLM Wiki 기록](research/design-governance-20261102/engineering/llm-wiki.review.json)에 있습니다.

| 필드 | 내용 |
| --- | --- |
| `source`, `design` | `{path, sha256}`. 원고 정본은 `slides.md`, 기준은 루트 `DESIGN.md` |
| `inputs` | 도구가 수집한 필수 렌더 입력의 `{path: sha256}`. 누락·추가·변경 파일을 현재 값과 대조 |
| `scope` | `{slides, mode, viewport}` 배열. viewport는 `width`, `height`, `devicePixelRatio`. 장·모드·크기 조합 중복 금지 |
| `capture.designSha256`, `capture.inputs` | 캡처 당시 기준과 제품 입력. 현재 검토 입력과 구별 |
| `capture.manifest` | `{path, sha256}`. manifest의 `revision`, `captureMode`, `hashes['DESIGN.md']`, 장별 `observations`를 대조 |
| `capture.evidence` | `{path, sha256, slides:[장번호], mode, viewport}` 배열. 각 PNG와 manifest의 장·경로·viewport·원고 revision을 대조. stage-only PNG는 실제 stage 크기와 대조 |
| `capture.supportingEvidence` | 선택 `{path,sha256}` 배열. 선언한 전체 보드 등 보조근거의 실재·hash만 확인하며 장별 PNG의 scope 검사는 별도로 유지 |
| `reviews` | 범위마다 `{slide, mode, viewport, status}`. 확인한 판정에는 `reviewer`, `reviewedAt`, `reason`, 해당 PNG 경로의 `evidence` 배열이 필요 |
| `owner`, `nextAction` | `needs-changes`와 `unreviewed` 판정에 필수 |
| `reviewSource` | 기존 감사에서 이관할 때 선택 `{path, sha256}`. 지정하면 원문의 실재·hash도 확인 |
| `recordAuthor`, 그 밖의 설명 | 기록 작성자와 실제 검토자를 구별하는 metadata. 자동 검사로 진술의 사실성을 증명하지 않음 |

`reviewedAt`은 파싱 가능한 날짜 또는 시각입니다. 정확한 검토 시각을 모르면 확인 날짜를 쓰고 그 한계를 명시합니다. 과거 감사의 판정·이유를 옮길 때 출처와 실제 검토자를 보존하며, 기록 작성자를 새 시각 검토자로 바꾸지 않습니다.

manifest의 장별 관측은 0부터 시작하는 `index`, PNG `filename`, `viewport`, `revision`, `stage.width/height`를 가집니다. 현재 한 기록의 capture.manifest는 한 모드·viewport를 대응합니다. 다른 모드·viewport의 검토는 별도 기록으로 남깁니다.

현재 캡처 형식의 예시는 [before manifest](research/design-governance-20261102/evidence/before/manifest.json)이며, 캡처 자동화·브라우저 사용 자체는 이 CLI의 기능이 아닙니다.

## 입력과 캡처 이력

입력 수집은 원고, 연결된 로컬 자산·자료, config, 공통 runtime/CSS, template, 빌드 코드와 lock을 포함합니다. 참조는 빌드의 Markdown parser로 읽습니다. 보수적으로 `scripts/`의 JavaScript 빌드 파일 전체를 포함하고 검수 도구 자체는 제외합니다. 새 빌드 helper나 공통 파일 변경도 다시 검토할 계기가 됩니다. 원격 자료의 내용과 외부 환경 변화는 로컬 hash로 확인하지 못합니다.

`package.json`의 운영 명령·설명 변경은 화면 입력에서 분리합니다. 대신 `package-lock.json` 바이트를 필수 입력으로 묶고, `package.json`의 dependencies·optionalDependencies·devDependencies·peerDependencies·peerDependenciesMeta·engines가 lock의 root entry와 같은지 직접 확인합니다. 의존성만 바꾸고 lock을 갱신하지 않은 상태도 실패합니다.

기존 캡처의 입력 목록을 연결하려면 `capture.inputManifest:{path,sha256}`를 지정합니다. `capture.inputs`는 그 역사 목록과 정확히 같아야 합니다. 당시 목록에 없던 필수 파일을 보강할 때는 `capture.supplemental:{revision,inputs}`를 별도로 씁니다. checker가 해당 Git revision의 실제 blob과 현재 SHA256을 대조합니다. 이는 확인 가능한 동일성 보강이며, 과거 캡처 입력을 추측하거나 목록의 hash를 바꾸는 기능이 아닙니다. 해당 Git revision이 없는 환경에서는 이 보강 검사를 통과할 수 없습니다.

DESIGN만 달라지고 제품 입력이 같다면 [DESIGN 계약](DESIGN.md#변경과-현재-판-검수)에 따른 직접 재검토를 `reReview:{reviewer,reviewedAt,reason}`로 남깁니다. 캡처 당시 기준 hash와 현재 기준 hash는 각각 보존합니다. 제품 입력이 달라지면 영향 화면을 다시 캡처합니다.

현재 예시는 [디자인 감사](research/design-governance-20261102/design/LLM_WIKI_AUDIT.md)의 정지 화면26장 판정을 이관한 기록입니다. 실제 검토자는 `/root/design_manager/audit_designer`이며 기록 작성자는 별도입니다. 일반 검사는 승인21·개선필요5(10·17·18·20·24)를 유효한 재점검으로 확인하고 승인 완료 명령은 실패합니다. [실제 명령 결과와 반례](research/design-governance-20261102/engineering/verification.json), [구현 인계](research/design-governance-20261102/engineering/ENGINEERING_HANDOFF.md)에서 검증 범위와 한계를 확인할 수 있습니다.
