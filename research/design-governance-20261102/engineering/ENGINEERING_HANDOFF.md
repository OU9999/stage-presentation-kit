# 디자인 검수 예방 장치 — 엔지니어링 인계

2026-11-02 · 기준 HEAD `2a95f37` · 매니저 `/root/engineering_manager` · 실무 A `/root/engineering_manager/review_engineer` · 실무 B/취합 `/root/engineering_manager/docs_integrator`

이번 구현은 작성 진입점에서 DESIGN을 읽고, 현재 입력·화면 근거·판정의 대응을 검사하도록 연결한다. 발표 제품을 수정하지 않았으며 현재 감사의 승인21장·개선필요5장을 그대로 보존한다. **유효한 재점검 기록과 제품 시각 승인 완료는 별개다.** 본편10·17·18·20·24장 교정은 이번 범위 밖의 후속 발표 수정 권고다.

## 산출과 소유

| 담당 | 실제 산출 |
| --- | --- |
| A | [검수 CLI](../../../scripts/design-review.cjs), [package script](../../../package.json), [targeted 검사](../../../tests/design-review.test.cjs) |
| B | [영구 사용 안내](../../../DESIGN-REVIEW.md), AGENTS·README·MARKDOWN-FIRST·Markdown 스타터·LLM Wiki README의 작성 진입점 연결, [현재26장 JSON](llm-wiki.review.json), [실행 근거](verification.json), 이 취합 |
| 매니저 | 공용 계약 검수·독립 반례 검증·root 인계. WORK_LOG 편집은 root만 수행 |

세 담당은 root의2026-11-02 05:24 UTC 공식 release/runtime snapshot을 재사용했다. 정확 모델은 `gpt-6.1-sol` / reasoning `high` / `fork_turns=none`이다. A는 build 참조와 검수 의미를 함께 판단하고 B는 감사 이관·문서·취합을 판단하므로 Sol을 선택했다. 독립 초기 실질 산출 뒤 직접 협업했으며 별도 팀 상태 로그를 만들지 않았다.

## 직접 협업과 채택한 계약

- B는5진입문서를 먼저 실제 작성했다. A는 CLI/기록 schema와 초기 코드를 먼저 작성했다. B가 A의 전체 초기 코드와 build 참조를 읽고, A에게 실제 검토자/recordAuthor 분리·감사 date-only 허용·역사111과 필수render입력 분리·누락 입력의 Git blob 보강을 직접 제안했다. A가 이를 수용했다.
- B→A 반론: `reviewSource`가 자유 metadata이면 감사 원문 누락·변조를 놓친다. A는 선택 필드가 존재하면 파일·hash를 검증하도록 수정했다. B가 실제 감사 hash변조 반례에서 실패를 확인했다.
- 매니저·root·B가 package.json 전체 hash와 새 npm script 추가의 충돌을 지적했다. A는 package-lock의 바이트를 필수 입력으로 묶고 package.json의 dependencies·optionalDependencies·devDependencies·peerDependencies·peerDependenciesMeta·engines를 lock root와 직접 대조했다. scripts/설명 변경은 화면 입력에서 분리하며 신규 의존성은 없다.
- 상태 `stale`은 fingerprint 불일치로 검사가 실패하는 파생상태이며 저장 판정은 approved/needs-changes/unreviewed다. 두 실무자가 문서 표현에 합의했다. 일반 check는 최신 개선 필요 기록을 허용하고 --require-approved는 실패한다. API는 구조 valid와 완료 gate passed를 구별한다.
- root가 지속사용 안내를 루트 DESIGN-REVIEW.md로 확정했다. B가 dated engineering/README 초안을 이전·삭제하고5진입문서 링크도 교체했다. 시각 규칙은 DESIGN 단일 정본을 유지한다.

## 현재26장 기록의 출처와 최신성

[JSON](llm-wiki.review.json)은 [디자인 감사](../design/LLM_WIKI_AUDIT.md)의26행 역할·주역·대상·판정·구체 이유·보존/조치를 정확히 옮긴 기록이다. B가 새 미감 판정이나 승인 이유를 생성하지 않았다. 실제 검토자는 `/root/design_manager/audit_designer`, 기록 작성자는 `/root/engineering_manager/docs_integrator`다. 감사에 정확 시각이 없어 reviewedAt은 확인 날짜2026-11-02이며 이 한계를 metadata에 썼다.

- 현재 DESIGN SHA256 `75e405eb4d1695fc5b4d5301d9393a2b3a0f938a3288dd3c9807e2845ca90817`, 원고 SHA256 `6df65ff95f74d48df3845d212d4bd36b111980e077d9ff332299c9bba7728b09`.
- 캡처 DESIGN SHA256 `247fe734bcdea3b21a3af1c37d7390e63cc228ad4589e491ae35887b5422656f`를 덮어쓰지 않았다. 감사가 새 DESIGN 전체와 전26장 PNG를 직접 재검토한 사실과 범위·이유를 reReview에 이관했다.
- 전장흐름을 본 근거인4contact JPG도 capture.supportingEvidence에 실경로/SHA로 고정했다. 보조근거는 실재/hash만 검사하며 장별 PNG scope 검사와 구별한다.
- manifest SHA256 `fa51b511bdc22b93e2d670d0a8632713925b928d6410798eadafa88c505b38ab`, 감사 SHA256 `5af3802bafcca71a7f9490c0c6d96a8260818a7ccf4a0648b3a34123dd6f6265`.26장 모두1440×1000/DPR1, 실제 stage PNG1344×756이며 동일 invocation의 관측과 대응한다.
- 역사 입력111항은 capture.inputs와 inputManifest로 원형 보존했다. 현재 실제 렌더입력은62항이다. 그중 baseline에 없던 lock·빌드 helpers·materials renderer/template/CSS9항은 HEAD2a95f37의 실제 Git blob SHA256과 현재 파일이 일치함을 직접 검산해 supplemental로 분리했다. checker도 git show로 이를 검증한다.
- B의 진입점 편집 뒤 역사111 비교는109동일/2차이(DESIGN, talks/llm-wiki/README)다. 감사 당시110동일/1차이 기록은 당시 사실로 보존했다. 현재 README는 빌드가 읽지 않는 작성 안내이며 필수render입력에서 제외한다. DESIGN은 별도 재검토 기준이다. 발표 원고·runtime/CSS·모든 자산·대본은 바꾸지 않았다.

## 실제 실행과 판정

B의 명령·출력·exit code는 [verification.json](verification.json)에 있다. fixture는 임시 기록만 만들고 finally로 삭제했으며 제품·PNG 원본은 수정하지 않았다.

```sh
node scripts/design-review.cjs check --source talks/llm-wiki/slides.md --record research/design-governance-20261102/engineering/llm-wiki.review.json
node scripts/design-review.cjs check --source talks/llm-wiki/slides.md --record research/design-governance-20261102/engineering/llm-wiki.review.json --require-approved
```

첫 명령은 종료0: 최신성·scope 유효, 검토완료·승인21·개선5·미확인0, 제품시각승인 미완료다. 둘째는 같은 기록을 읽고 종료1로 승인 완료를 거부한다. B의 targeted10실행에서 근거PNG경로누락·PNG해시변조·CSS오래된해시·필수templatehash누락·장판정누락·감사hash변조는 모두 종료1이다. draft는26개unreviewed만 만들고 reviewer/reason이 없음을 확인했으며 그 초안 check는 미완료 종료1이었다. 원문26행의6필드와 JSON의 정확 대응도 별도 검산했다.

A와 매니저는 `node --test tests/design-review.test.cjs`의 targeted17검사 통과를 각각 확인했다. 매니저는 실제 current기록 기반 임시 저장소 fixture에서 원고/styles/app/template/ingest-mapSVG/manifest/PNG변조7종, PNG누락, app필수hash누락, 다른장PNG대응, currentSVGhash만갱신한옛capture승계, DESIGN변경, 새가이드reReview누락 및 선언된 감사 원문 변조까지 총14반례가 모두 실패함을 독립 확인했다. 매니저는 감사26행의7필드/실제reviewer 정확일치와 capture.inputs111의원형보존·기준분리도 assert로 검산했다. 매니저는 일반/API gate 결과도 다시 대조했고 원본 수정 없이 fixture를 finally로 삭제했다.

전체 npm test·build:site·verify:site의 최종 실행은 root 담당이다. 이 문서의 targeted 결과를 전체 회귀나 실제 발표 화면의 새 시각 승인으로 보고하지 않는다.

## 확인 한계와 후속

이번에는 960×900·읽기 모드·전체 모션·발표 현장·전 기기·청중 이해 효과를 새로 확인하지 않았다. 자동 검사는 실제 열람·사유의 진실성·미감 정답을 증명하지 못한다. Git 보강을 사용하는 기록은 해당 Git revision이 있어야 검증할 수 있으며 원격 자산 내용은 로컬 fingerprint로 고정하지 못한다.

다음 발표 수정 담당자와 root가5장 교정을 채택할 때 [audit 교정 계약](../design/LLM_WIKI_AUDIT.md#장별-교정-계약)의 의미·원자료·도식·링크를 보존하고 영향 장·인접 흐름·필요 읽기 화면을 재캡처·재검토한다. 이번 예방 장치 완료를 이 후속 제품 작업의 구현 완료로 확대하지 않는다.

A는 최종5진입문서·영구매뉴얼·이 취합 전체를 읽고 npm alias오타와 DPR범위 설명을 직접 반론했다. B는 alias를 `design:review`로 교정한 뒤 실제 npm 명령의 일반종료0/승인gate종료1을 확인했고, 다른 모드·viewport는 별도기록 사용을 명시했다. A는 stage PNG의 CSS크기×DPR 검사를 보완했다. B가 최종 CLI·package·targeted검사 전체를 다시 읽고 17/17검사 통과를 직접 확인했다. 진입5문서/매뉴얼/취합의 실제 로컬 링크122개는 모두 실재하며 AGENTS 기존4규칙도 그대로 보존했다.

보조근거4시트의 실재/hash 검사까지 포함한 최종 범위를 양 실무자가 인수했다. A·B writer가 모두 종료했으며 전체 회귀는 root가 실행한다.

최종 보조근거 추가 인수:4contact JPG 실경로/SHA를 current JSON에 고정하고, 선언된 보조근거만 파일·hash 검사하도록 A가 작은 검사를 추가했다. 양 실무자가 추가 코드/기록/영구매뉴얼/취합을 다시 읽었다. A와 B가 최종 `node --test tests/design-review.test.cjs` 17/17 통과를 각각 직접 확인했으며, B의 보조근거경로누락·hash변조 CLI2반례도 종료1이었다. A는 최종4보드 포함 current API 일반passed:true/승인gate passed:false를 재확인했다. A·B 최종 writer 종료. root의 최종 전체 회귀가 남는다.
