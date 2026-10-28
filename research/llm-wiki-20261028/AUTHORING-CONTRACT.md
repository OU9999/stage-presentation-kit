# 이번 발표의 작성·인수 계약

사용자 확정: Zoom에서 가볍게 하는 AI 스터디, 약 20분. 한국어. 하나의 작은 예를 반복하며 질문할 틈을 둔다. 기술 백과/제품 비교/검증되지 않은 생산성 수치를 넣지 않는다.

## 원본과 공개 산출물

- talks/llm-wiki/slides.md 단일 원고. source YAML title/footer 가능, --- 장 분리. 발표와 read 전문은 같은 원고에서 생성.
- 자체 자산 assets/*.svg, 공유용 자료 assets/*.txt. 첨부는 원고에서 링크해야 생성물에 복사된다. 임의 .md 첨부 링크는 지원하지 않는다.
- 발표 진행 가이드는 별도 텍스트 첨부로 공개한다. 비공개 speaker notes 기능은 없으므로 개인/기밀 정보 금지.
- 출처는 실제 접근한 primary source와 claim/source ID를 연결한다. 화면의 짧은 source 링크 + 상세 첨부 근거로 접근 가능하게 한다. URL만 존재한다는 사실을 주장 검증으로 대신하지 않는다.
- 합성 예제의 출처/가상 결정/템플릿은 실제 조사 사실과 명시적으로 구분한다.

## 사용 가능한 기존 디자인

runtime/CSS 변경 없이 Stage 팔레트 blue/orange/purple/green/yellow/neutral, 넓은 여백, 큰 메시지, bento/editorial/icon-wall/media/split 등을 선택한다. 장당 한 메시지, 짧은 문장. 사진은 실사 출처가 필요하므로 의미 없는 스톡 사진을 추가하지 않는다. 개념·흐름은 직접 만든 SVG, 기존 아이콘과 그리드로 표현 가능하다.

stage-slide 는 장의 첫 내용 앞. compose: auto/message/split/media/gallery/mosaic/editorial/bento/icon-wall/quote/closing/document. stage-group 은 다음 H2 범위에만 적용. bento 1..12개 H2, 대표 primary 최대1개, tone/icon 선택. header 앞/밖의 문단이 있으면 document fallback 위험. icon-wall은 목록1개, 목록 뒤 별도 문단 불가, icons 수와 항목수 동일, builtin20개. 엄격 문법은 MARKDOWN-FIRST.md 확인.

Zoom 가독성을 위해 많은 출처/설명/긴 코드는 첨부로 옮기되 핵심 주장과 한계는 실제 화면에도 남긴다. 긴 제목·caption·표가 잘리지 않는지 실제 브라우저에서 검사한다. 그림 안 글자는 읽기 모바일에서도 확인 가능해야 하며 필요시 같은 내용을 alt/설명으로 제공한다.

## 인수

연구팀 source/claim 동의 → 발표팀 시간표·이야기·원고/시각사양 → 엔지니어링 자산/첨부·기술검수, 서로 직접 검토. 파일 소유권은 이전 writer 종료 후 인계. root만 WORK_LOG·최종 build/browser/Git/Pages. 원본/기존 화면 SHA 보존을 대조한다.
