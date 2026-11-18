# Round04 native 강조·교차 확인

B의 제품 수정은 `materials/keynote-notes.md`157행 한 구절의 CommonMark 강조 경계뿐입니다. `**“15분이니까 ‘읽기부터’?”**는`를 `“**15분이니까 ‘읽기부터’?**”는`으로 바꾸었습니다. 질문의 글자·원문·발표용 질문/판정/해석 지위·`선택의-근거-확인` 앵커는 보존합니다. parser·원고·역할 계약·26주제 coverage·원본/archive/의도한 코드 예시는 바꾸지 않았습니다.

`renderMaterial`의 실제 HTML은 `“<strong>15분이니까 ‘읽기부터’?</strong>”는`입니다. 전체 notes의 inline text token에서 의도치 않은 `**`/`__` 잔여0을 확인했습니다. 의도한 code token을 이 검사로 삭제하거나 변형하지 않았습니다. A도 같은 실제 HTML·앵커·정확 원자료·판정·전체 가상 조건·미실측 지위를 독립 read-only로 확인했습니다.

B는 A의 `templates/materials.css` 교정을 독립 대조했습니다. main-03 snapshot과 비교해 `.material-content`의 `word-break: normal`→`keep-all` 한 값만 변경됐습니다. 본문/인용/강조에 상속되며 `overflow-wrap:anywhere`,18px, 긴 URL/파일 경로의 비상 줄바꿈, pre code의 명시 normal/pre 흐름,620px 표와 내부 스크롤·print 예외를 보존했습니다. 이는 실제390 glyph 승인이나 두 표의 동작 확인을 대신하지 않습니다.

정확 명령·exit·SHA는 [verification.json](./verification.json), 전후 HTML은 [native-html.json](./native-html.json)에 있습니다. 현재 source 정적 검사는 exit0/1205checks/0invalid/0regression입니다([결과](./current-source.json)). 기존 material Markdown 렌더 검사 하나를 선택 실행해 exit0을 확인했습니다([로그](./material-render-test.log)). 새 테스트는 추가하지 않았고 전체355테스트를 이유 없이 반복하지 않았습니다.

제품 hold는 보고서 작성 전에 root/manager에 직접 통보했고 추가 제품 쓰기는 없습니다. main-03 source104·PNG·판정·기술 통과 기록을 소급 수정하지 않았습니다. root는 main-04 새 입력 해시의 발표/읽기4범위·지원12클릭·6/13 native표 양끝·요청 전문 선택·390의 `스터디`/`아닙니다` 실제 행과 강조 표시를 새로 확인합니다. 발표40의 과거 수동 판정은 읽기나 공식 `--require-approved`의 면책으로 사용하지 않습니다.
