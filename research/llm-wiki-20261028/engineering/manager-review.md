# LLM Wiki 엔지니어링 인수 검수

2026-10-28. 발표팀의 한국어 12장 원고·자체 SVG 3개·공개 진행 가이드를 직접 인수하고, 공개 첨부 3개를 제작했으며 독립 임시 프로젝트의 실제 빌드를 확인했다. 최종 화면 재검수·전체 회귀·Git·Pages는 root가 이어서 수행한다.

## 담당과 직접 인수

- manager: `/root/llm_engineering_manager`. 연구 sources/claim-ledger/synthesis, 공통 작성 계약, 발표 HANDOFF와 실제 원고·가이드·SVG를 읽고 presentation_manager와 직접 인수회의를 마쳤다. 발표팀 전원의 편집 종료를 확인한 뒤 두 실무자를 시작했다.
- A: `/root/llm_engineering_manager/source_materials`. `assets/sources.txt`, `decision-example.txt`, `starter-template.txt`를 독립 제작하고 B의 검증 결과를 취합했다. 다른 파일은 편집하지 않았다.
- B: `/root/llm_engineering_manager/integration_reviewer`. 원고·도식·가이드의 정적 계약 검수, 독립 복사 CLI 빌드, root의 실제 화면 검수에 따른 원고 교정을 담당했다. guide/SVG는 변경하지 않았다.
- A와 B는 서로 실물을 직접 읽고 교정 요청 0건을 회신했다. A는 B의 실제 verification.json도 읽고 취합했다. 후속 화면 교정 결과는 B가 A와 manager에게 직접 알렸다.
- 두 실무자는 `gpt-6.1-sol / high / fork none`이다. 근거 구분·공용 콘텐츠 계약·통합 판단이 필요해 이 구성을 사용했다. root가 2026-10-28 07:50 UTC에 실제 확인한 공식 모델 페이지와 runtime catalog 스냅샷을 공유받았다. 상세 기준은 공통 WORK_LOG를 따른다.

## 공개 첨부의 실제 내용

| 파일 | 확인한 내용 |
| --- | --- |
| `talks/llm-wiki/assets/sources.txt` | 실제 S1/S10/S11/S12의 원문 URL·확인일·메타데이터 한계, C01~C10의 직접 지원/해석/제안과 화면 대응 |
| `talks/llm-wiki/assets/decision-example.txt` | 합성 E1~E4·EC1~EC2·ED1~ED2 전체, 결정의 배경·선택과 이유·대안·결과·상태·담당·날짜·재검토 조건과 이전/후속 연결 |
| `talks/llm-wiki/assets/starter-template.txt` | raw/wiki/옆의 schema, 최소 자료·주장·결정 카드, index 찾기/log 이력, 사람이 검토할 항목을 요청하는 프롬프트 |

manager가 3개 첨부를 모두 독립 실독했다. 실제 출처와 합성 예제, 문장 지원과 출처 링크, 자료에서 읽은 사실과 사람이 선택한 행동이 구분되어 있다. S1은 설계 아이디어이고 특정 제품·공식 표준·성능 실험으로 표시하지 않았다. S1 별도 수정일/revision SHA의 미확인, S11 비규범 Note, S12의 실험 조건과 fine-tuning 한계를 유지했다. 파일 저장과 가중치 학습을 구분하며 wiki와 RAG의 병행 가능성을 남겼다.

합성 E1의 11월 5일 20:00은 '매주'를 지원하지 않는다. E2의 명시적 변경을 확인한 뒤 같은 날짜의 20:30만 채택한다. ED1은 당시 accepted, ED2 승인 후 superseded by ED2로 연결해 보존한다. 초대장 점검은 남은 일이며 실제 외부 안내물을 수정했다는 성과로 쓰지 않았다. 템플릿과 프롬프트는 실무 제안이고 공식 표준·오류 방지 보장이 아니다.

## 실제 화면 피드백의 원고 반영

root의 최초 12장 브라우저 캡처는 오류·넘침·진단 0이었으나, 실제 PNG 열람에서 좁은 카드의 글자가 Zoom에 작게 보였다. B는 5/7/8/9/11장 PNG를 직접 열어 확인했다. manager도 최초 7/11장 PNG를 직접 열어 좁은 2칸 카드의 문제를 확인했다.

- 7/8/9장: primary 힌트 3줄을 제거해 3그룹을 각각 4/4/4칸으로 배치했다.
- 5장: index와 log를 각각 H2로 나누어 기존 5그룹 planner를 사용했다.
- 11장: 확인 필요와 도입 효과 미측정을 각각 H2로 나누어 기존 5그룹 planner를 사용했다.
- 5장의 한 문장은 독립 카드에 맞게 '`index`는 페이지 목록입니다.'와 '`log`는 무엇을 언제 바꿨는지 남깁니다.'로 나눴다. 그 외 control/H2 구조를 제외한 본문은 보존했음을 B가 정규화 비교로 확인했다. 근거·범위·한계·합성 표시는 삭제하지 않았다.

최종 원고는 8,710 bytes, SHA-256 `23145e8c452a041ef55d7489c8fd00da96914a1e98b03d3ad03d423f52fcde58`이다. 가이드·SVG·첨부 해시는 그대로다. 최종 교정 후 화면 재촬영의 합격을 이 정적 검수로 대신하지 않는다.

## 독립 복사와 manager의 실제 확인

B는 새 원고와 자산만 OS 임시 프로젝트에 복사하고 별도 stage.config.json으로 실제 CLI를 실행했다. 공통 엔진은 현재 저장소 것을 재사용하지만, 원고의 로컬 자산 dependency 7개는 모두 복사 프로젝트 내부이며 원래 talks 폴더에 의존하지 않는다.

명령: `node scripts/stage.cjs build --config <temporary-project>/stage.config.json`. 결과는 발표 1개 생성, exit 0이다. B의 임시 검증 프로그램은 최종 원고로 다시 실행해 exit 0이었다. manager는 해당 검증 프로그램을 전체 읽고 최종 결과에 직접 재실행하여 exit 0을 확인했다. 원본과 비교한 해시·구도·전후 구조의 영구 결과는 [verification.json](verification.json)에 있다.

| 검증 | 최종 결과 |
| --- | --- |
| 실제 parser/model/planner | 12장, model issue 0, composition warning 0 |
| composition | message 2 / media 3 / bento 6 / closing 1 |
| 원본→임시 입력 복사 | 원고+자산 총 8개 SHA 일치 |
| 생성 데이터 | 경로 치환을 제외한 AST·본문 동일, 외부 URL 보존 |
| 로컬 참조 | 11참조→SVG 3+txt 4 정확히 7자산, hash/bytes 일치 |
| HTML 상대 참조 | 모음/발표/읽기 3개 HTML, 29참조가 출력 내부에서 해결 |
| 공통 runtime | 7파일 hash 일치 |
| check 모드 | 재생성 differences 0 |
| 임시 출력 | 20파일 / 439,687 bytes |

manager는 최종 원고의 7개 고유 자산 존재와 4개 실제 원문 URL, model/planner 결과도 별도 확인했다. 진행 가이드의 12개 시간 구간을 파싱해 구간 연속·발표 1,080초+질문 120초=1,200초를 확인했다. 이는 시간표 계산이며 실제 낭독 리허설 실측이 아니다. 신규 unit test는 만들지 않았다.

## 소유권 인계와 남은 확인

A는 첨부 3개, B는 원고·가이드·SVG의 편집 종료를 직접 통지하고 final을 마쳤다. 두 writer 모두 종료 상태로 root에게 소유권을 인계한다. manager는 이 검수와 verification.json만 작성했고 runtime/CSS/기존 원고·공개 URL·최종 생성물·브라우저·Git은 편집/조작하지 않았다.

root의 후속 범위는 교정한 최종 원고의 Stage·읽기·390px·발표자/첨부 실제 화면, 전체 사이트 생성·250개 회귀·기존 파일 보존, commit/push와 공개 Pages 확인이다. 연구의 실제 운영 효과·정확도·절감 시간·유지비는 이번에 측정하지 않았으며, S1 별도 수정일/revision SHA도 미확인 상태다.
