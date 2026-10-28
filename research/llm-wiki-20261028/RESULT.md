# LLM Wiki · 20분 Zoom AI 스터디

[발표](../../presentations/llm-wiki/index.html) · [읽기](../../presentations/llm-wiki/read.html) · [전체 화면](index.html) · [수정할 원본](../../talks/llm-wiki/slides.md)

12장, 발표 18분과 질문 2분으로 구성했다. 원자료와 연결된 위키, 출처가 지원하는 범위, 사람이 선택한 이유, 새 정보로 바뀐 결정의 이력을 하나의 합성 스터디 예제로 설명한다. 20분은 진행표의 계산값이며 실제 발표 리허설 실측은 아니다.

## 팀의 실제 결과와 합의

- 리서치 manager/A/B: Karpathy의 LLM Wiki 아이디어, Nygard의 ADR 원문, W3C PROV 비규범 개요, RAG 원논문을 직접 확인했다. 4출처와 주장10개를 대조하고 근거 없는 효과·제품 일반화를 제외했다. [출처](research/sources.md), [주장](research/claim-ledger.md), [취합](research/synthesis.md).
- 발표 manager/A/B: 실제 Markdown 12장, 자체 SVG3개, 공개 진행 가이드를 제작했다. 연구 manager와 18+2분·사실/제안/합성 경계를 직접 합의하고 실무자가 서로 원고/그림을 검토했다. [시각 기획](presentation/visual-plan.md), [시간·이야기](presentation/story-plan.md), [직접 인수](presentation/ENGINEERING-HANDOFF.md).
- 엔지니어링 manager/A/B: 출처·결정 예제·시작 템플릿3첨부를 제작하고 독립 복사 빌드/자산·링크/의미 보존을 검사했다. 실제 화면에서 root가 발견한 작은 타일을 3개 동등폭/5개 혼합 타일로 고쳤다. [검수](engineering/manager-review.md), [실행 근거](engineering/verification.json).
- 세 manager와 실무자6명 모두 편집 종료했고 최종 소유권은 root에게 인계했다. root가 생성물·실브라우저·회귀·Git·배포를 담당한다. 동시4슬롯에 맞춰 팀별 실무를 순차 실행했다.

## 최종 로컬 검증

- 전체 build:site / verify:site 통과. 전체 250/250 회귀 통과. 새 발표로 기존 '4개 원고' 고정 검사2개가 실패해 실제 원고 목록과 manifest의 목록을 비교하도록 교정했다. runtime/CSS 변경은 없다.
- 12장 전체 Stage 화면·본문/타일 범위·이미지·진단·실행 오류·편집/저장 접근을 확인했다. 오류·넘침·누락0. 교정5장의 PNG를 직접 다시 열어 비교했다. [최종 DOM/PNG](evidence/local-slides.json), [초기 비교](evidence/initial-slides.json).
- Paper5/7/8/11장 실제 화면 확인. 390px 읽기12장 모든 원고 텍스트 순서 보존·가로넘침0·본문18px·이미지3개 alt/contain·hash7 위치약90px 확인. SVG의 작은 내부 라벨은 동일 핵심 본문·alt·원본열기로 보완한다. [읽기 근거](evidence/reading.json).
- overview12장/preview상호작용링크0, 발표자 현재/다음 각1개와 양방향 이동, 첨부4개 실제 클릭→다운로드/생성물 SHA 일치 확인. 로컬 기존 정적 서버4323이 txt를 octet-stream으로 보내 다운로드 동작이며 공개 Pages MIME/열기는 배포 후 별도 확인한다. [실행 근거](evidence/controls.json).
- 기존 runtime7·공통template·루트index·기존4원고 총13파일 SHA 불변. [보존](evidence/preservation.json). 새 발표의 7자산은 자체 폴더에 있어 다른 예제를 복사할 필요가 없다.
- 촬영은 생성물 revision과 브라우저 revision을 대조했다. 같은 경로의 hash 이동만으로는 기존 문서가 다시 로드되지 않으므로 검수 URL에 revision을 넣어 수정 후 화면을 재검증했다. 계측은 각 Ego 실행에서 새로 적용했다.

## 범위와 남은 확인

실제 wiki 앱 구현·운영 효과/정확도/시간 절감 측정은 이번 발표 제작 범위가 아니다. S1의 별도 수정일·revision SHA는 확보하지 못했으며 출처 대장에 표시했다. 합성 날짜·인물·결정은 실제 운영 이력이 아니다. 공개 배포 후 동일 revision/자산/읽기/첨부와 Pages SHA를 확인한다.
