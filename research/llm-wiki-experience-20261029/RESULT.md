# LLM Wiki 40장 발표 보강 검수

이전 14장보다 사진·원문 인용·청중 참여·실제 파일 내용이 부족하다는 피드백을 반영했다. 사용자가 요청한 **40장**으로 구성하고, 발표와 별도 학습 자료의 연결을 유지했다.

- 발표: 친숙한 공부 노트 → 근거를 고르는 참여 → 실제 파일 교정 → 새 질문에서 재사용 → 보류·대체 결정 → 자기 자료 적용
- 사진: 로컬 JPEG 4개, 가로 도입·세로 분할·3사진 strip에 사용. 작가/출처/이용 조건과 초점 기록
- 인용: Karpathy와 Vannevar Bush 원문 각 12단어, 저자·맥락·번역·원문 링크 확인
- 정보: 기존 구조 도식과 새 SVG 4개, 실제 승인 항목·삭제/추가 문장·파일 관계·결정 변경·파일 검사 수치
- 참여: 12→13과 23→24의 A/B·답 공개·질문 복귀·이어가기, 35장의 자기 질문 작성
- 학습 자료: 기존 학습서·실습 해설·참고 자료 유지, 40장 대본과 새 실제 파일 기록을 포함한 6개 문서

발표 원본은 `talks/llm-wiki/slides.md`, 심화 자료는 같은 폴더의 `materials/`, 실행 묶음은 `demo/llm-wiki-demo.zip`이다. 일반 Markdown과 자체 자산으로 구성하며 공통 core/CSS 변경은 없다. 1~39장 30분과 Q&A 별도 2분은 리허설 전 배분안이다.

## 실제 확인

| 범위 | 결과 | 근거 |
| --- | --- | --- |
| 원고/대본 | 40장, 제목·순서·시간 구간 1:1, 구도 계획 경고 0 | `design/source-check.json` |
| 실제 발표 화면 | 최신 revision 40장 전체 캡처, 본문 넘침·진단·오류·깨진 이미지 0 | `evidence/slides.json`, `evidence/screens/` |
| 참여 | A·B·답 공개와 복귀/이어가기 10번 실제 클릭 | `evidence/navigation.json` |
| 발표자/overview | 40개, preview 내부 링크 0, 발표자 양방향 동기화 | `evidence/navigation.json` |
| 모바일 읽기 | 390px, 40장 원고 순서/본문 누락 0, 본문 18px, 이미지 contain·alt, 가로 넘침 0 | `evidence/navigation.json` |
| 학습 문서 | 6개 × 1440/390px, 전문 누락 0, revision 일치·18px·JS 0·가로 넘침 0 | `evidence/documents.json` |
| 자료 사용 | 발표→목차→40장 대본→읽기, 모바일 목차 Enter·코드 ArrowRight | `evidence/navigation.json`, `evidence/documents.json` |
| 실제 다운로드 | 덱에서 ZIP 클릭·저장, 23,952B 원본 SHA 일치, 압축 해제 후 check→apply→check 통과 | `evidence/download.json` |
| 원고 재사용 | 주제 폴더만 별도 프로젝트로 복사해 생성, 이동 후 30개 출력 바이트 동일 | `evidence/portable.json` |
| 전체 사이트 | build:site·비수정 verify:site 성공, 회귀 261/261 통과 | `evidence/tests.txt` |

최종 원고 revision: `489b05e48bd8ab93fc2c66e136aa175371fbebf26588fd8de3b8b8616b8e0710`.

## 화면에서 찾아 고친 점

정적 파싱 통과 뒤에도 실제 화면에서 33·37장의 긴 아이콘 라벨이 경계를 넘었다. 라벨을 줄이고 긴 의미는 대본에 유지했다. 17장의 긴 diff는 삭제·추가 평문 열로 바꿔 가로 스크롤 없이 읽게 했다. 23장의 초안과 선택을 같은 행에 배치하고, 31장의 작은 숫자가 든 큰 카드를 열린 수치 위계로 바꿨다. 최종 40장은 새 revision으로 다시 캡처해 경고가 없음을 확인했다.

발표의 사진 초점, 큰 인용, 도식과 gallery는 실제 PNG로 검수했다. 전체 화면은 `evidence/final-board-1.jpg`부터 4개에 있고, 대표 화면은 [result-board.jpg](./evidence/result-board.jpg)에 모았다. 초안 실패 화면/JSON은 `draft-*`로 분리했다.

검수 도구의 중복 링크 선택자를 실제 A/B·공개 링크 각각을 고르는 방식으로 수정했다. 재사용 검사도 없는 manifest 장수 필드 대신 실제 생성 deck의 장수를 읽게 수정했다. 이 두 항목은 검수 도구 교정이며 제품 코드 결함으로 집계하지 않는다.

## 근거의 범위

데모는 교육용 오류와 고정 승인 교정안을 재현한다. 실제 모델 오답·자동 검색·LLM 생성의 성공 실험이 아니다. 확인한 8쪽·25링크·10불변 파일은 해당 예제의 파일 검사 수치다. 의미 검토는 원문 대조와 별도로 남겼다. 실제 사용자 조직의 성과나 모델 정확도·시간 절감은 측정하지 않았다.

개인 스터디 후기 5개에서 발표 구성 기준만 참고했고 원문·실명은 공개 자료에 복제하지 않았다. 참조 저장소는 수정하지 않았다. 연구·디자인 양 팀은 직접 인계와 교차검토 후 전원 편집을 종료했고, root가 최종 조판·전체 화면·동작 검수를 수행했다.

unified diff의 빈 문맥 줄에 필요한 공백 표식을 보존하기 위해 `.gitattributes`는 `talks/llm-wiki/demo/changes.diff` 한 경로만 바이트/공백 변환에서 제외한다. 다른 원고·코드의 공백 검사는 유지하며 staged diff 검사도 통과했다.

공개 배포 검수는 commit/push 후 `DEPLOYMENT.md`에 별도로 기록한다.
