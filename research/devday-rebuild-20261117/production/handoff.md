# 첫 4장 실물 제작 인계

2026-11-17 · 제작 manager `/root/devday_creation_manager`. 새 prototype의 실행 가능한 입력을 인계한다. **현재 본편 main04는 needs-changes이며 이번 시안도 미감 미승인이다.** 원본 본편 이행은 하지 않았다. 실제 합성 화면과 원본의 비교·독립 검증·root 최종 판단이 남아 있다.

최신 사용자 권한은 내용 충실도보다 미감 우선이다. OpenAI DevDay와 거의 차이가 없는 완성도를 목표로 문구의 재작성·선택·요약·생략, 순서·장수·매체·구도 변경을 허용한다. 이전 긴 제목·전문·세 필드·한 행·박스의 발표면 보존을 채택 조건으로 되살리지 않는다. 원자료와 필요한 맥락은 별도 공개 자료에 보존했다. MODEL.json의 2026-11-17T01:12:16Z 공식 최신/catalog5/동시4 확인과 정확 gpt-6.1-sol/xhigh/none을 A/B에게 직접 공유했고 수신을 확인했다.

## 실행과 동결 입력

저장소 루트에서 root가 실행한다.

```sh
node bin/ou-presentation.cjs build --config research/devday-rebuild-20261117/prototypes/ou.config.json
node bin/ou-presentation.cjs verify --config research/devday-rebuild-20261117/prototypes/ou.config.json
```

- 원고: `prototypes/talks/first-look/slides.md`
- 출력: `prototypes/site/first-look/index.html`, 읽기 `read.html`
- 원고 SHA256: `3fc324b8e4b18ea6be29959bd5612384fb233430820a0b843c1df140332f5aa5`
- DESIGN SHA256: `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`
- A의 SVG/HTML 자산과 B의 원고/config/materials·공용 조판 코드·문법 문서는 모두 HOLD다. A/B 각각 actual FINAL과 전체 writer 종료를 직접 확인했다. manager도 이 인계 마감 뒤 writer를 종료하며 반려에 따른 새 배정 전에는 입력을 변경하지 않는다.

이 문서의 상대 경로는 별도 언급이 없으면 `research/devday-rebuild-20261117/` 기준이다. 브라우저·build·전체 테스트·실캡처·Git·WORK_LOG는 root 단독 소유이며 제작팀은 실행하지 않았다.

## 실제 바뀐 네 화면

| 장 | 새 실물과 참조 원본 | 이전 반려본에서 바꾼 성질 |
| --- | --- | --- |
| 1 | native 두 의미행, 주황색 강조. Codex1200의 타이포 폭·강조 참고 | 긴 선택 이유와 보조 두 문단을 대신해 새 메시지 ‘답변을 넘어, / 다음 질문으로.’를 큰 호흡으로 편집했다. 원문 이유는 원팩에 남긴다. |
| 2 | 동일 720×420의 두 작업창, 하단 native 라벨. Codex90 참고 | 공통 입력/출력 상자·분기·절차 문장·긴 계획 발췌를 없애고 한 답의 연속 흔적과 여러 연결 문서의 내부 형태로 비교한다. |
| 3 | 어두운 기사면과 밝은 native 인용 카드. Keynote1440 참고 | 밝은 빈 메모·목적 prefix 반복·지시선·검정 바탕의 전문 계단행을 바꿨다. 정확한 연속 부분 구절만 세 행으로 선택하고, 원문 전문·가상 조건은 공개 자료로 옮겼다. |
| 4 | 기존 results의 왼쪽 native 두 행 주장과 오른쪽 네 실제 작업면. Keynote1500 참고 | 긴 제목·부제·세 필드·한 행을 확대한 표 대신 활동안·개념 지도·질문 노트·한 장 요약을 서로 다른 자료 표면으로 편집했다. |

manager도 지정 공식 90/210/1200/1440/1455/1500 여섯 PNG, 현재 main04의 20장 보드 세 개와 5/13/15 개별을 실제 열었다. A/B의 실독과 직접 협의를 확인했다. root의 초기 기사 자산 지적을 A에게 직접 전달해 59px/500/왼쪽 제목을 52px/400/중앙 제목과 좌정렬 본문으로 수정했다. 4장의 상단 제목+media 초안은 원본1500과 비례가 다르다는 반론 후 기존 results로 바꿨다. 단일 montage가 results 첫 셀만 채우는 실제 제약을 B가 확인해 root의 개별 네 PNG로 연결했다.

## 소유와 정확한 제품 파일

- A 단독 작성: `prototypes/assets/answer-window.svg`, `wiki-window.svg`, `condition-article.svg`, `output-plan.html`, `output-map.html`, `output-question.html`, `output-brief.html`, `output-montage.html`; 취합 `production/visual-intent.md`.
- root 실캡처: 같은 assets의 `output-plan.png`, `output-map.png`, `output-question.png`, `output-brief.png`. 각 HTML 1000×640/DPR1 전체이며 원문 SHA 전후 동일·가로 넘침0을 root가 확인했다. 검토 대안인 `work-surfaces.png`와 montage HTML은 보존하되 최종 원고는 참조하지 않는다.
- B 단독 작성: `prototypes/ou.config.json`, `prototypes/talks/first-look/slides.md`, `prototypes/talks/first-look/materials/notes.md`, `prototypes/talks/first-look/materials/source-pack.txt`, `prototypes/source-proof.cjs`, `prototypes/source-proof.json`, `production/integration.md`.
- B 최소 공용 확장: `lib/markdown-document.cjs`, `deck-model.js`, `blocks.js`, `blocks.css`, `CONFIG.md`, `MARKDOWN-FIRST.md`, `tests/blocks-composition.test.cjs`. 다른 공용 코드·의존성·현재 본편·QA와 과거 자료/검수/캡처는 수정하지 않았다.
- manager 단독 작성: 이 `production/handoff.md`.

공용 확장은 새 명시 `split + quote-card`와 `gallery + comparison`에 한정한다. quote-card는 원본 AST의 이미지 먼저·단일 blockquote·짧은 문단 조건을 재사용하고 발표 모드만 반전색 카드로 만든다. 작은 파란 인용부호는 원본1440을 따른 국소 예외이며 기본 Stage 장식을 바꾸지 않는다. comparison은 독립된 이미지 문단 정확 두 개를 같은 크기와 원본 비율로 놓고 title을 하단 native 라벨로 표시한다. 일반 split/evidence/gallery/strip/auto·읽기·순서·sourceLine을 보존하며 LLM Wiki id나 한국어 문구 allowlist를 공용 코드에 넣지 않았다. 중요한 소유 변경과 예외를 root/A/B에게 직접 전달하고 수신을 확인했다.

## 내용 지위와 실제 검증

비교 창은 설명용 도식이며 실제 UI 캡처가 아니다. 기사면은 자작 가상 조건 메모의 새 편집이다. 네 결과면은 A가 실제 작성한 HTML 자료를 root가 캡처한 것이며 모델 실행·사용자 활동·성과 측정이 아니다. 공개 `materials/notes.md`에 각 지위, 비교의 비우열, 원문 목적 구절, 입문자/준비된 메모/별도15분 맥락을 두고 원팩을 byte 그대로 복사했다. 1–3은 공개 절에 직접 연결되고 4의 상세는 자료 모음/공개 해설 목차의 ‘다음 작업의 모양’에 있다.

B는 `node --test tests/blocks-composition.test.cjs tests/markdown-document.test.cjs tests/deck-model.test.cjs`를 실행해 88/88 통과를 보고했다. manager는 새 read-only source proof를 별도로 실제 실행해 9/9와 `visualApproval:false`, `observedRender:false`를 확인하고 저장된 현재30입력을 다시 해시하여 불일치0을 확인했다. 시작104입력 중 명시 공용4파일을 제외한100입력도 byte 동일이다. 별도로 실제 현재 원고를 parse/model/plan하여 4장, issue0, warning0, message/gallery-comparison/split-quote-card/results(4 items), local reference10 누락0을 확인했다. 첫 heading의 native br1과 인용의 br2도 확인했다. 큰 메시지는 multiline setext H1이며 ATX 제목 끝 backslash 우회가 아니다.

## 아직 판단해야 할 차이

비교의 글줄/아이콘은 실제 앱의 구체 작업 대신 개념을 그린 도식이다. 기사면은 실제 외부 기사가 아니며 원본과 언어·제목 길이·본문 밀도가 다르다. 네 자료면도 서로 다른 실제 앱 작업과는 다르게 자작 활동 자료다. 이 차이를 의미 정확성이나 자작 지위로 미감 면제하지 않는다. root의 합성 화면에서 창/라벨 비례·안쪽 선밀도, 기사 제목/본문의 질, 카드의 밝기·반경·광학 패딩·세 행의 무게, 결과 네 면의 구별과 설득력, 연속 흐름을 직접 판정해야 한다. 현재는 이를 승인하지 않았다.

제품 입력 HOLD와 전원 writer 종료를 인계한다. root가 양 발표폭 실캡처와 독립 검증을 진행한다. 독립 검증의 작은 어색함도 실제 교정 대상으로 인수하며, 반려 시 같은 제작팀을 재개한다. 본편/읽기 전체 이행·기술 회귀·시각 승인은 이 첫 prototype의 완료와 구별한다.
