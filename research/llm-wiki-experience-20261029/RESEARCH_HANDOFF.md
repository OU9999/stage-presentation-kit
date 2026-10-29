# LLM Wiki 경험 보강 인계

## 범위와 기준

2026-10-29, 기준 main `3a58a4c`. root만 공통 WORK_LOG·Git·브라우저·최종 생성물을 쓴다. 이 문서는 리서치/경험 팀의 산출물과 검수 근거이며 별도 진행 로그가 아니다. manager는 `manager` skill 및 `coordinate`의 모델 선택 절을 적용했다. root가 직접 확인한 2026-10-29 00:26 UTC 공식 release/runtime snapshot을 같은 작업 안에서 공유했고, 두 실무자를 `gpt-6.1-sol` / `high` / `fork_turns=none`으로 실제 배정했다. 근거 해석과 이야기 통합이 필요한 범위다.

사용자의 추가 지시로 **약 40장, 구현 목표 정확히 40장**을 확정했다. 이전 27장 초안을 대체한다. 40분 발표를 요구한 뜻은 아니다. 시간은 **설명·참여 30분 초안 + Q&A 별도**로 추정하며 실제 리허설 시간은 아직 측정하지 않았다. 이전 14장/18+2분 판정으로 새 요구 충족을 대신하지 않는다. 개인 스터디 후기에서 전달받은 원칙은 쉬운 비유·직접 확인·한 장에서 질문에 답하기·다양한 그림·자기 사례와 근거다. 원문/실명은 이 산출물에 복제하지 않는다.

## 다음 구현에서 쓸 실물

- 사진·인용: [media/SOURCES.md](./media/SOURCES.md), `talks/llm-wiki/assets/photos/`의 로컬 JPEG 4장.
- 스토리/참여: [experience/storyboard.md](./experience/storyboard.md).
- 실제 파일 교정: `talks/llm-wiki/demo/README.md`에서 시작한다. 학습용으로 심은 초기 오류라는 표시는 발표와 배포물에 유지한다.

쉽게 읽은 노트에서 시작해 한 질문의 문장·근거·검토·diff·다음 새 질문의 재사용으로 이어간다. 주제는 LLM Wiki를 왜·어떻게 쓰고 운영하는가다. RAG/LoRA는 한 번의 오해 교정에만 사용하고 후반은 근거·검토·결정의 재사용, 상충과 보류, 대체된 결정의 보존에 배정한다. 정의와 RAG/LoRA 분류표가 첫 구간을 차지하지 않게 한다. 사진은 지식 축적 비유와 직접 써보는 장면에 배치하고, 파일 변화/표/도식은 설명 정보로 사용한다. 사진을 실제 발표자/스터디 참여자/서비스 보증자로 소개하지 않는다.

## manager 독립 확인

- [Karpathy의 원문](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): 본문 Core idea·Architecture·Operations·Indexing and logging을 직접 열었다. 원자료/위키/운영규칙과 ingest/query/lint, 질문 답의 재저장이라는 제안은 확인했다. 댓글의 타인 주장이나 운영 제품 효과를 원저자 설명으로 인용하지 않는다. 원문은 아이디어 파일이다.
- [RAG v4 §2.4](https://arxiv.org/html/2005.11401v4#S2.SS4): 검색과 생성에 학습 절차가 있는 원논문임을 확인했다. 문서 인코더/인덱스를 고정하고 질의 인코더와 BART 생성기를 미세조정한다. 따라서 외부 파일을 사용한다는 사실만으로 학습 유무를 일반화하지 않는다.
- [LoRA v2 §4.1](https://arxiv.org/html/2106.09685v2#S4.SS1): 기본 가중치를 고정하며 A/B 행렬에 학습 가능한 매개변수가 있음을 확인했다. 파일 교정과 그 학습 절차를 구분한다.
- [Nygard 원문](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions): Context/Decision/Status/Consequences와 대체된 결정의 보존을 직접 확인했다. 스터디에 이를 적용하는 일은 우리의 설계 선택이다.
- JPEG 4장을 `view_image`로 각각 직접 열었다. `open-books`는 창가의 책과 메모, `study-table`은 책·필기도구·공부 노트, `library`는 서가 통로, `writing`은 노트에 쓰는 인물이 확인된다. 최종 crop/문자 겹침은 실제 덱 검수에서 확인해야 한다. `study-table`은 세로 사진이므로 큰 가로 cover에 무리하게 자르지 않는다.
- `app.js` 54/1042~1054/1345~1347을 읽어 1부터 시작하는 `#장번호`와 hashchange→goTo를 확인했다. 실제 브라우저의 링크 클릭/발표자 동기화는 root가 후속 확인한다.
- `scripts/stage.cjs` 107~137의 참조 규칙을 읽었다. `demo/README.md` 같은 임의 Markdown은 발표에서 직접 링크하면 빌드가 거절된다. **배포 ZIP** 또는 등록된 자료 문서에서 연결하고, 실제 파일은 ZIP 안에 보존한다. 일반 바이너리 링크는 자산으로 복사하는 기존 경로를 쓸 수 있다.

## 구현·최종 확인의 경계

지금 사진과 자료 조사, 실행 가능한 교정 예제를 제공한다. 실제 AI 모델 실행 결과·성능 실험·참가자 투표 통계는 아니다. 파일 스크립트 검사는 의미의 진실성을 보증하지 않는다. 원문 대조를 따로 유지한다. Zoom 참여는 발표자가 채팅 A/B를 읽고 다음 장의 답을 공개한다. 가짜 응답수·자동집계 그래프를 넣지 않는다.

장 수가 바뀌면 참여장/공개장/대본의 1-based 숫자를 함께 갱신한다. 확정 40장 스토리보드의 참여는 **12→13(답 공개)→14(다음 흐름)**, **23→24(답 공개)→25(다음 흐름)**다. 질문 화면으로 돌아가는 `#12`/`#23` 링크도 답 화면에서 제공하는 계약을 디자인 manager가 수신했다. 이전 27장 초안의 7→8, 13→14는 대체됐다. 기존 심화 자료 5개는 보존하고 대본·목차·연결만 새 발표와 맞춘다.


- 사진 출처 독립검수: Pexels 사진 4개 원본 페이지와 License를 manager도 직접 열어 작가/내용/허용범위를 대조했다. `photo-manifest.json`의 4 SHA-256·바이트 수와 로컬 실물을 독립 계산해 일치했고 `writing.jpg`는 기존 `assets/photos/write.jpg`와 바이트가 같다.
- 인용 독립검수: Karpathy/Bush 원문 해당 문장을 manager도 직접 열어 SOURCES.md와 대조했다. 각각 공백 기준 12단어이며 따옴표 내 문구는 정확하다. 발표팀 번역과 역사적/설계 맥락 표시는 유지한다.

## 고정 원문의 추가 확인

root가 gist의 Revisions → View file을 실제로 열어 유일한 revision `ac46de1ad27f92b28ac95459c782c07f6b8c964a`를 확인했다. 후속 출처에는 [고정 revision 원문](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f/ac46de1ad27f92b28ac95459c782c07f6b8c964a)을 쓸 수 있다. media/SOURCES.md의 고정 SHA 미확인은 A의 확인 당시 범위이며 이 root 추가 확인으로 현재는 확인된 값이다. 기존 demo의 불변 메모·receipt를 나중에 바꿀 필요는 없다.

## 파일 교정의 독립 실행 검수

manager가 `talks/llm-wiki/demo/`를 별도 임시 폴더에 복사한 뒤 `node run-demo.cjs --check` → `node run-demo.cjs` → `node run-demo.cjs --check`를 직접 실행했다. 세 명령 모두 exit 0, `model_invoked: false`, 변경 8쪽(기존 5쪽 갱신 + 3쪽 생성), 최종 8쪽, 로컬 링크 25개, 불변 파일 10개를 확인했다. 이 숫자는 해당 예제의 파일 수이며 지식 정확도나 생산성 지표가 아니다.

승인안과 스크립트만 서로 맞는지 확인하는 데 그치지 않고, 별도 `before/` 복사본에 `patch -p1 -i changes.diff`를 실제 실행해 exit 0과 `after/` 8개 파일의 전체 바이트 일치를 독립 대조했다. diff SHA-256은 `1658ca53ae3a46f655e541c2abf11891d8105d460b5a4222cb30d891d8515489`다. 원래 작업 폴더/receipt에는 이 manager 재실행으로 쓰지 않았다.

manager는 review 승인 내용과 before/after/source-notes/diff를 읽고 실제 공개 원문과 의미를 따로 대조했다. Q2는 C1/Q1/D1을 다시 읽고 저장 정책을 판단하며, D1은 superseded로 보존하고 D2로 연결된다. 검토 근거가 부족한 주장은 pending에 남고 다음 행동이 적혀 있다. 같은 RAG 논문의 최초 §2.3 메모와 추가 §2.4 메모는 읽기 범위가 달라진 사례이며 논문 원문 자체가 바뀐 사례로 소개하지 않는다.

양방향 교차검토의 실제 확인 범위는 media/CROSS-REVIEW.md를 읽었다. B는 A의 사진 해시/출처와 Bush/Pexels 원문을 확인했고, A는 B의 script/review/Q2/D1/D2/pending 전문과 `--check`를 실행했다. 40장 최종표/최종화면은 A 확인 범위에 포함하지 않는다.

## 확정 40장과 ZIP 인수

[40장 스토리보드](./experience/storyboard.md) 전문과 [기계 판독 계약](./experience/storyboard.json)을 manager가 읽었다. 40개 장 번호가 1~40 순차이고 제목이 모두 다르며 누적 시작 시각과 장별 시간이 맞는다. 1~39장의 설명·참여 합은 1,800초(30분), 40장 Q&A는 별도 120초다. 합계 32분은 진행 초안이며 리허설 측정값이 아니다. 참여는 12→13, 23→24이며 두 번째 B는 이 구성 예제의 운영 선택이다.

사진 P1/P3/P2/P4는 1/3/9/34장, Karpathy/Bush 인용은 7/30장에 배치한다. 친숙한 도입 → 원문/설명 구분 → 초안 예측과 확인 → 실제 diff → Q2 재사용 → 보류·결정 대체 → 원문 교체/상충의 운영법 → 내 자료 적용으로 이어진다. 28장의 서로 다른 원문 판 대조는 제안하는 절차이며 실제 원문 교체를 실행한 증거가 아니다. 35장의 자기 질문 작성은 20초를 포함하고 채팅 제출은 선택이다.

ZIP 실물은 `talks/llm-wiki/demo/llm-wiki-demo.zip`이며 [패키지 manifest](./experience/package-manifest.json)에 기록돼 있다. manager가 23,952바이트·SHA-256 `9c0a83b5bf0a2b22e9c9102ed0d26c81ce683d4fc0589ce96a741f998f6a44f2`·24개 항목을 독립 확인했다. 내부 경로는 `llm-wiki-demo/` 아래에 있고 모든 항목이 저장소 원본과 바이트가 같다. ZIP을 다른 임시 폴더에 실제 압축해제해 `--check` → apply → `--check`를 실행했으며 모두 exit 0이었다. 결과는 위의 8쪽·25링크·10불변·동일 diff SHA와 같다. 추가 패키지/API/네트워크 없이 실행됐다.

`starter.txt`에는 자료 하나의 보존·근거 위치·기존 질문 연결·변경 diff·승인 전 반영 보류 요청과 여섯 작업 규칙이 들어 있다. 이 요청은 실제 LLM 실행 결과가 아니며 활용 시작 문구다. 데모 Q2의 “다시 읽은 파일”은 고정 승인 구성 예제의 판단 입력을 뜻한다. 스크립트가 자동 검색/의미 판정/LLM 새 답 생성에 성공했다는 표현으로 바꾸지 않는다.

후속 디자인 manager `/root/experience_design_manager`와 직접 인수 논의를 했고, 사진 crop·인용 원문·실제 예제/모델 실험 경계·ZIP 참조 규칙·참여와 복귀 해시·40장/시간 분리를 전달했다. 디자인 manager도 최종 md/json40장을 직접 읽고 번호/시간 계약을 확인했다. 실제 발표 원고·대본·시각 구현·브라우저·빌드·배포는 그 팀과 root가 이어 수행한다.

## 편집 종료와 소유권 인계

A·B는 각 소유 파일 편집을 명시적으로 종료했다. manager도 이 문서의 최종 검수를 마치고 편집을 종료한다. 후속 디자인 manager가 이 문서와 B의 experience/handoff.md를 모두 읽고 40장·시간·참여·ZIP·원문 읽기 범위·모델 실험 경계·질문 복귀 계약을 직접 인수 확인했다. 연구 자료/사진/demo는 인계 완료 기준본으로 사용하고 실제 원고·대본·사진 crop·링크 동작·공개 배포는 후속 writer와 root가 검수한다. 연구 팀은 slides/materials/core/build/Git/브라우저/WORK_LOG를 쓰지 않았다.
