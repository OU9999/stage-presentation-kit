# 40장 발표 디자인·원고 인수 검수

검수 범위: `talks/llm-wiki/slides.md`, 학습 자료, 자체 SVG, 로컬 사진과 참여 링크. 기준 `main 3a58a4c`, 2026-10-29. 이 문서는 산출물 인수 근거이며 작업 상태는 root 소유 `WORK_LOG.md` 한 곳에 기록한다.

## 구현 전 독립 관찰

매니저가 manager skill, coordinate 모델 선택 절, 현재 WORK_LOG, ACCEPTANCE, RESEARCH_HANDOFF, media/SOURCES, 기존 원고 14장과 demo README/review/receipt를 실독했다. 기존 심화자료는 보존하고 새 40장에 맞춘 대본과 새 데모 읽기 문서를 추가하는 범위다. 40장은 사용자 응답에 따른 구현 목표이며 40분 발표로 해석하지 않는다. 30분 설명·참여 + 2분 Q&A는 리허설 전 배분안이다.

직접 `view_image`로 확인한 기존 native 화면:

- `research/reusable-layouts-20261028/evidence/screens/photo-02-paper.png`: 6장의 세로 사진, 넓은 바깥 여백과 짧은 아래 캡션. 사진의 내용에 따라 초점을 다르게 보존한다.
- `exhibit-05.png`: 색 있는 정보 타일·사진·자체 문서·큰 문장을 다른 크기로 엮은 bento. 같은 텍스트 카드를 반복하지 않는다.
- `exhibit-07.png`: 둘레의 행동 아이콘과 중앙의 큰 한 문장. 아이콘은 실제 행동을 뜻한다.
- `case-06.png`: 가로 photo strip과 짧은 역할 라벨. 행의 높이와 바깥 여백이 메시지의 일부다.

로컬 JPEG 4장도 각각 직접 보았다. open-books는 창 아래 책/노트가 보이는 `50% 75%`, study-table은 원자료와 노트가 함께 남는 세로 구도 `50% 72%`, library는 서가와 통로, writing은 얼굴과 펜 든 손 `44% 54%`가 적합하다. 사진의 인물은 원저자/발표자/참여자의 실제 기록으로 표시하지 않는다. 최종 crop·문자 가독성은 root의 실제 덱 화면 검수 대상이다.

## 매니저 독립 검증

최종 source parse/plan, 40장·대본시간·참여번호·자료 링크·SVG 내용의 정합성을 직접 실행했다. 결과는 아래 최종 인수와 source-check.json에 기록한다. root만 최종 생성물·전체 build·브라우저·Git을 소유한다. 정적 검사 통과를 실제 브라우저 통과로 보고하지 않는다.

## 인계 전 확인 경계

연구팀이 확정한 40장 storyboard와 ZIP을 직접 인수했고 A/B 실질 초기 산출물·직접 교차검토·source/plan 검증을 완료했다. root의 전체 최종 브라우저·모바일·공개 배포는 이 문서의 매니저 검수 범위와 구별한다.

## 초기 실물 독립 검수

초기 실제 원고 40장 전부와 새 SVG 4개의 XML 본문, CREDITS, visual-plan을 읽었다. `parseDocument` 40장과 `validateDeck` 오류 0을 직접 확인했다. 11장 quote 앞의 일반 문단, 37장 icon-wall 뒤의 일반 문단이 구도 fallback 경고를 만들었고 3장 사진 작가가 SOURCES와 달랐다. A에게 근거와 교정 위치를 직접 통보했다. 34장 사진 캡션은 사진의 행동에 맞게 바꾸도록 함께 요청했다. 이 결과는 초기 source 범위이며 최종 통과가 아니다.

새 도식 4개는 `sips`로 `/tmp`에 PNG를 만들고 `view_image`로 각각 직접 확인했다. 1200×450 전체 구도, 큰 ID·상태·행동의 관계, C1/Q1에서 Q2로 재사용하는 입력, D1→D2와 당시 맥락 보존, 현행/보류의 정책이 서로 다른 역할로 읽힌다. 새 도식 text는 32~48px다. Quick Look은 SVG를 square thumbnail로 잘라 보였으므로 이 잘림을 실제 SVG의 결함으로 판정하지 않았고, 정확한 1200×450 `sips` 변환으로 재확인했다. 제품 원본/공통 코드/브라우저/최종 생성물은 변경하지 않았다.


## 최종 source 인수

매니저가 `node research/llm-wiki-experience-20261029/design/source-check.cjs`를 최종 교정 뒤 직접 실행했다. 현재 source SHA와 장별 구성·이미지·링크, 자료별 구조는 [source-check.json](source-check.json)에 있다.

- 실제 40장, validate 오류 0, plan 경고 0. 구도는 media 6·document 3·split 2·editorial 15·message 5·quote 4·bento 1·icon-wall 2·gallery 1·closing 1이다. 수량은 다양성의 보조 자료이며 실제 가독성의 보증으로 삼지 않는다.
- 원고 참조 45개와 자료 6개를 파싱했다. 로컬 파일 존재와 자료 내부/상호 앵커, 발표 복귀 번호, 두 인용의 정확한 문구와 각각 한 번 사용, 사진 4개의 사용을 검사했다.
- 대본의 실제 40개 장 제목이 원고와 일치한다. 대본 시간표 40개와 speaker-guide 시간표 40개의 번호·제목·시작/종료·장별 초가 확정 storyboard와 일치한다. 1~39장 1,800초, 40장 Q&A 별도 120초는 리허설 전 계획이다.
- 참여 12→13, 13→12/14, 23→24, 24→23/25 링크를 source에서 확인했다. 실제 클릭/발표자 동기화는 root 범위다.
- 새 SVG 4개는 font-size 최솟값 32px 이상이다. 직접 PNG로 확인한 의미 관계와 XML 문구를 실제 before/after/review/diff의 문장에 대조했다. `demo-log`는 모바일에서도 같은 정보를 표·문단으로 읽고 원본 SVG를 열 수 있는 경로를 제공한다.

새 대본 40장 전부를 매니저가 읽었다. 일반 장은 실제 발화·진행·전환을 갖추고 Q2·보류·결정 대체와 운영 부담으로 주제가 이동한다. 참여 12/23과 자기노트 활동35는 명시한 대기 시간에 비해 초안 발화가 길어 A에게 축약을 요청했다. 최종은 12/23 약 60음절의 상황·선택 안내와 35의 짧은 안내·정리로 바뀌었으며 대기 시간·무응답 분기를 유지한다. 낭독 리허설을 했다고 주장하지 않는다. 공개 대본의 내부 사용자 지시 이력과 사진 면책의 반복 낭독은 삭제하고, 10장의 학습용 고정 예제 경계와 31장의 검사 범위는 유지했다.

`demo-log` 전문, index, topic README, speaker-guide, reference-library 새 미디어 절과 기존 guide/workshop 보충을 직접 읽었다. 실제 Q1/C1/review/diff·Q2의 구성 판단 입력·pending의 이유/후속 행동·D1 superseded/D2의 비용·같은 v4 읽기 범위 확장·판 교체는 향후 운영법이라는 경계를 대조했다. guide는 52,073→52,935바이트, workshop은 23,745→24,599바이트로 기존 깊이를 유지하고 새 실행 자료 경로를 보충했다.

## 직접 교차검토와 최종 화면 인계

A는 SVG 4개·CREDITS·visual-plan과 정확한 1200×450 PNG 4개를 직접 검수해 B에게 회신했다. B는 실제 slides 40장·speaker-script 40장·demo-log 전문을 읽고 사진 작가/초점, C1 정확 문장, 17장 평문 diff, 22장 도식 방향, 34장 본문 수량의 진행 지시를 A에게 직접 요청했다. A가 수정한 뒤 B가 해당 문장을 재독하고 마감했다.

root의 첫 전체 40장 실화면 검수에서 33/37장 icon-wall의 두 줄 라벨이 item 경계를 넘은 것을 보고받았다. 매니저도 `evidence/draft-33.png`, `draft-37.png`를 직접 열어 확인하고 동일 A를 좁은 source 교정으로 재개했다. 최종 라벨은 33장 “점검하기 · lint”, 37장 “결정 이력 남기기”이며 제목·시간·긴 대본 설명·공통 코드는 보존한다. 최종 source 검사를 재실행해 통과했다. 이 교정 뒤 fresh revision으로 실제 40장 runtime 경고와 가독성을 다시 확인하는 일은 root에 인계한다.

A/B는 모두 편집 종료했다. 새 source·자료·자체 자산은 freeze 상태다. manager는 WORK_LOG/Git/브라우저/최종 생성물/공통 CSS를 편집하지 않았다. 남은 최종 전체 build·비수정 verify·회귀·40장/모바일/read/presenter·답 공개/복귀 실제 클릭·ZIP 다운로드/공개 배포는 root가 수행한다.

## root의 최종 조판 교정 소유권

팀 writer freeze 뒤 root가 실제 `evidence/draft-board-3.jpg`, `draft-board-4.jpg`에서 23/31장 조판 문제를 추가 발견했다. 매니저도 두 보드를 직접 열어 동의했다. 23장의 H2 이전 도입 문단이 별도 grid row를 점유해 선택 A/B가 하단으로 밀리고 중앙이 비었다. 도입을 첫 H2 “근거 부족 초안” 그룹으로 만들고 A/B와 동등 세 열로 모으는 원고 교정에 합의했다. 31장은 거대하고 밝은 카드 안의 수치가 작은 H2로 표시돼 정보가 약했다. 열린 editorial 세 열에서 독립 문단 `**8** 쪽`·`**25** 개`·`**10** 파일`을 사용하면 기존 renderValue와 72px 수치 위계를 사용할 수 있음을 `blocks.js`/`blocks.css`에서 확인했다. 검사 범위·5+3·5+5의 실제 정보는 유지한다.

이 두 장과 해당 대본 진행 문장은 root가 단독 최종 교정한다. A/B에게 각각 소유권 이전과 writer freeze 유지를 직접 알렸다. 매니저/A/B는 원고를 다시 편집하지 않는다. 위 구도 수와 source-check.json은 팀 freeze 시점 결과이며, root 교정 뒤 새 source에서 source-check를 다시 실행하면 결과가 갱신된다. 최종 공개 통과 판정은 root의 fresh revision 전체 재검증을 따른다.
