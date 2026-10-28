# 재사용 배치 구현의 디자인 인수

2026-10-28 · 디자인 매니저. WORK_LOG의 이번 실제 구현 승인과 manager skill을 읽었다. 기준 f1f76a9와04:08~04:11UTC 공식/실제 catalog 스냅샷을 공유한 기존 gpt-6.1-sol/high/초기 none 담당자를 사용했다. root만 공통 로그·브라우저·Git 전달을 소유한다.

## 직접 결정한 경계

엔지니어링 매니저와 실제 제안·반례·수정·최종 수신 확인 후 [구현 계약](implementation-contract.md)을 작성했다. 기존 gallery/mosaic/editorial 기본은 보존하고 사진의 portraits/strip/staggered, 혼합 bento, icon-wall을 간단 Markdown에 연결한다. 기존12 seoul/recap과 수량 유연한 balanced를 구분한다. 자료 수를 preset에 맞추기 위한 빈 자료는 요구하지 않는다.

공통 model의 pure planner가 위치만 정하고 CSS와 preview/read가 같은 계획을 소비한다. icon path20개도 model의 단일 원본을 legacy app/blocks가 공유한다. 본문·이미지·값·라벨을 별도 JSON에 재작성하지 않는다. 미지 키/값의 형식 오류와 유효 설정의 자료 수 부적합·공간 부족을 구분한다. fallback의 원문 보존은 발표 미감 합격과 다르다.

root의 추가 사용자 아이콘 요구는 일반 image-first 목록이라는 두 번째 경로로 인수했다. builtin은 icons 배열, custom은 목록 이미지의 원 AST만 사용하며 혼합/null schema를 먼저 늘리지 않는다. root에게 supportasset 범위를 확인한 뒤 B의 새 talk 하위 자체 SVG3개 소유를 확장했다. 외부 다운로드·새 runtime은 없다.

## 실질 배정과 독립 교정

엔지니어링 매니저의 슬롯 반환 후 기존 A/B를 각각 canonical follow-up으로 재개했다. A는 blocks.css와 시각 계약을 실제 구현하고 B는 신규 사진 에세이8장·동네 전시9장과 자체 SVG3개·작성 기록을 실제 작성하며 취합한다. 두 담당의 직접 원고/CSS 반례 교환을 요구했고 매니저도 두 원고와 실제 CSS를 읽었다.

- portraits/strip은 기존 flex1/height0 이미지 규칙을 해제하지 않으면 aspect-ratio 선언만으로 원하는 비율이 되지 않는다고 지적했다. A의 명시 해제와 외부 캡션 구분을 읽었다. 제목·긴 캡션이 있는6열의 높이와 실제 프레임 비율은 최종 PNG에서 확인한다.
- 같은 landscape4개에 focus만 바꾸면4:3 프레임에서 차이가 작고 zoom 기능도 없다는 반례를 B에게 전달했다. B는 서로 다른4사진을 써서 같은 비율에 다른 장면을 놓는 원고로 바꿨다. 지원하지 않는 배율을 예제의 성능으로 소개하지 않는다.
- 사진 에세이의 staggered 마지막 인물에 세로 portraits의 focus28%를 복사하면 가로 span2에서 얼굴이 잘릴 수 있음을 원본 기하로 지적했다. B가 그 한 값만49%0%로 교정하고 세로 장은 유지했다. 실제 얼굴 판정은 후속 PNG로 한다.
- wall 항목별 tone이 부모에서 계산된 accent로 굳을 가능성을 발견해 A에게 item 수준 재선언/neutral 예외를 요청했다. H1을 wall 중앙 copy에 한 번만 넣는 renderer 경계도 직접 인계했다.
- root가 지적한 역전 quote/text 면의 아이콘 대비 위험을 A에게 직접 전달했다. A는 해당 두 종류의 장식 아이콘만 accent30%와 역전 본문색70%를 섞고 read에서는 기본 accent로 복구했다. Stage/Paper 실제 대비 통과는 후속 화면으로 확인한다.
- custom3의 자체 제작 조건을 목록 뒤에서 중앙으로 무단 이동하면 원고 순서가 달라진다고 지적했다. B가 저자 편집으로 같은 문단을 H1 뒤·목록 앞으로 옮겼다. 목록 뒤 본문이 있는 일반 입력의 보존·fallback 검증은 남긴다.
- 큰 기존 작품 이미지를 작은 로고로 축소하는 대신 정확한 역할의 자체64viewBox SVG3개를 작성하도록 root와 협의했다. XML 유효·텍스트 본문 없음과 기존 두16장 원고의 baseline SHA 불변을 독립 확인했다.

## 후속 실제 인수

이번 단계는 실제 CSS·원고·자산 구현의 인수다. parser/model/renderer 연결과 새17장, 혼합5/8/12·아이콘5/12/22·custom3, portrait2:5·strip4:3의 실측, 사진 초점, Paper,390px read, 실제 source 변경과 저장·복구, overview/presenter·기존 회귀, 공개 화면은 엔지니어링/root의 다음 단계다. 수량별 모델 통과나 이 문서를 미감 합격으로 취급하지 않는다.

두 실무자의 최종 산출물·직접 수신 확인·편집 종료를 모두 인수했다. 최종 CSS는 `ea5ca9a97c274435472497b2535a79d99c49ad8f05ed3f9938944e74da3ba08b`, 사진 원고는 `4c9dcefb6832841129eafc25812c19172c1578b5b26e3104322148136841b9ac`, 전시 원고는 `e60d2b2b60624784d9a68ab4cdb88f9aeef0372ec11280e1c77cb14894bac8fe`다. 중간 대비 교정의 SHA는 최종 실본으로 대체했다. 원고17장의 배치 명시8/미지정9와 색·crop 포함 장 메타11개를 구분하며 H2 메타12개·선택 icon8개·builtin 배열12항목·custom3개라는 실제 설정 부담도 읽고 인수했다.

매니저는 CSS·두 원고·다섯 디자인 문서와 SVG 원문을 실제 읽고 로컬 참조·공백·기존 원고 불변을 독립 대조했다. 전체 제품 테스트나 실제 브라우저 적합성을 이번 정적 인수로 대신하지 않는다. blocks.css를 엔지니어링 B에게 단독 이양하며 디자인 매니저도 편집을 종료한다. 최종 실제 화면을 받아 독립 후검수할 때만 다시 제품 결함을 보고한다.
