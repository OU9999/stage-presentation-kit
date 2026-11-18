# Round05 정확 인용의 의미행 회귀

B production은 stable hold입니다. A와 직접 합의해 notes의 한 정확 인용에 기존 지원 hard break 하나를 넣었습니다. CSS·폰트·새 parser/API·원고·큰 구조를 바꾸지 않았습니다. main-04 snapshot과 직접 비교해 notes의 유일한 변경이 이 한 br임을 확인했습니다.

실제 HTML은 한 blockquote/한 P 안의 `…만들고 싶어서<br>\n이 메모를 골랐다.’`이며 정규 공백 원문 전체·단어 순서·18px 역할·작성 주체/가상 예제 지위·한계·`선택-이유-메모` anchor와26주제 coverage를 보존합니다. A도 HTML br1·전체 원문·anchor·지위를 독립적으로 확인했습니다. [HTML 근거](./native-html.json)

## 실제 관측에 연결한 계약

`keynote-current.json.nativeParagraphs[0]`은 실제 공개 sourcePath, 정확 section, exact 전체 인용, isQuote:true,minReading18,wordBreak:keep-all, sameRowPhrase:`이 메모를 골랐다`를 명시합니다. 현재 읽기 QA는 실제 `supportDocuments[].paragraphs[]`의 문서/절/인용 하나를 식별하고 computed font·word-break·완전한 실제 Range glyph행과 한 의미행을 검사합니다. 문단·행·좌표·글자 누락/중복은 contract-invalid이며 관측된 축소·의미구 분절은 regression입니다. source의 raw backslash를 내용 누락으로 오인하지 않도록 공용 material parser의 semantic inline/soft·hardbreak/인라인 코드/복사 요청 fence 문자로 전체 의미를 비교합니다. 원문이나 요청 코드 전문은 줄이지 않았습니다.

동결 main-04의 actual 문단은 같은 checker에서 font/keep-all/전체glyph pass, meaning-row만 regression입니다. 새 main-05의 **정식** `read-390/reading-metrics.json`은 실제 sourcePath·44문단을 담으며 manifest SHA가 일치하고 현재104입력 불일치0입니다. 이 actual 문단을 같은 helper로 검사해 네 항목 모두 pass를 확인했습니다. [before/정식 after](./native-before-after.json)

작은 `native-probe-390.json`은 렌더4SHA/URL/18px/행의 부분 근거로만 기록했습니다. sourcePath를 소급 관측으로 추가하지 않았고 정식 after로 사용하지 않았습니다. 테스트의 양성 분절 예시는 명시적인 synthetic fixture이며 actual after 판정을 대신하지 않습니다.

## 실행과 경계

정확 명령·exit·SHA는 [verification.json](./verification.json)에 있습니다. 현재 source 정적1211항/0invalid/0regression exit0([결과](./current-source.json)), 기존 현재QA14+새 의미 있는 native 회귀3개의 집중17/17검사가 exit0입니다([로그](./tests.log)). 새 검사는 실제 before-fail과 정확 source/section/quote 누락·중복/불완전 glyph·축소·의미구 분절을 다룹니다. 전역 한국어 점수기나 CSS 문자열 검사를 만들지 않았고 전체355를 불필요하게 반복하지 않았습니다.

제품 hold는 보고서보다 먼저 root/manager에 직접 통보했습니다. 그 뒤 생산물 추가 쓰기는 없으며 main-04 source104·PNG·판정·기술 결과를 덮어쓰지 않았습니다. 이 인계의 실제 after pass는 native 인용 컴포넌트의 회귀 판정입니다. 전4범위 currentQA·12클릭·6/13표양끝·요청 선택·새 독립 시각/읽기와 명시 require-approved는 root의 main-05 현재 근거에서 별도로 완료합니다. source 정적·작은 probe·기술 컴포넌트 결과를 전체 승인으로 확대하지 않습니다.
