# 학습 자료와 발표 개선 계약

사용자: 발표만으로 정보가 부족하므로 공부 자료·대본·정보 모음을 따로 제공하고 디자인팀이 스타일을 판단한다. 가벼운 Zoom 발표는 약20분, 상세 학습서는 발표 시간에 억지로 맞추지 않는다.

## 작성과 생성

- 원본: talks/<주제>/slides.md + 선택 materials/*.md. 현재 주제 자료5개: index.md, study-guide.md, speaker-script.md, reference-library.md, workshop.md.
- 일반 Markdown·선택YAML title/description/order, 코드·표·인용·H2/H3 목차. raw HTML 실행 금지. 파일 이름은 소문자 영문/숫자/-/_로 제한 가능. 중첩 자료 폴더는 이번 필수 범위가 아니다.
- 생성: presentations/<주제>/materials/<이름>.html. index.md→index.html. 자료없는 덱은 기존출력/기능 유지. 자료들은 발표 장으로 카운트하지 않는다.
- 자료 상호 .md 링크와 한글/영문 heading fragment는 .html#fragment로 변환한다. 제목slug NFKC·소문자·공백-·기호제거, 중복-2 방식. 같은 문서 anchor도 지원한다. ../slides.md#숫자는 ../read.html#숫자. 일반 slide의 ./materials/index.md 링크도 허용한다. 다른 임의.md 링크의 기존거절은 유지한다.
- 자료의 로컬 자산은 기존내용hash 복사/상대참조를 사용하고 dependencies/watch·오류진단·last-good/verify 드리프트·portable project를 포함한다. 외부 https출처는 그대로 링크한다. 문서 frontmatter/본문/출처는 공개할 내용만 쓴다.
- 자료가 있으면 발표/read/모음/manifest에 '학습 자료' 진입점을 둔다. 새 프로젝트에서 자료 폴더를 추가하는 것만으로 생성돼야 한다. 주제명 hardcode와 직접생성HTML수작업은 금지한다.

## 공통 문서 조판 인터페이스

root가 공통 scripts/materials.cjs(파싱/렌더 API)와 templates/material.html을 먼저 작성한다. 엔지니어링 A는 프로젝트 빌더/참조/watch/manifest 통합, B는 경계 검증/문서 사용 안내를 소유한다. 디자인이 templates/materials.css를 먼저 작성하고 종료 후 엔지니어링에 인계한다. 공통 CSS는 자료가 있는 프로젝트의 _runtime/materials.css에 한번 복사하고 해시를 붙인다. 기존 runtime7 배열/배포참조는 그대로 유지 가능하다. materials.css/template 변경도 dev가 감지한다.

DOM: body.material-page, .material-skip, header.material-header, .material-header-nav, main.material-shell, aside.material-sidebar, nav.material-doc-nav(.is-current), nav.material-toc, article.material-article, header.material-intro(h1,p), div.material-content, .material-table-scroll, footer.material-footer. ToC와 문서목록/발표복귀를 키보드로 사용할 수 있어야 한다. 코드/표는 자체가로스크롤, 390px에서 body가로넘침0. 본문은 읽기너비/행간/18px이상(각주별도), print도 본문을누락하지않는다. 정적HTML+CSS, 강제JS앱불필요. 미세색/배치/문서색상은 디자인팀 판단으로 정한다.

## 내용과 디자인 인수

학습서는 개념의 작동과 실제파일/변경/실패예를 설명하고 근거를 문장근처에 단다. 대본은 실제말할문장·전환·청중질문·장시간·예상답변을 갖춘다. 정보모음은 제목/링크나열을 넘어서 무엇을 읽고 무엇은 입증하지않는지/학습순서/용어를 제공한다. 실습은 입력·진행·기대결과·해설·잘못된예를 포함한다. 일정변경만으로 지식축적을 설명하지 않는다.

발표는 반복되는 거대한 색상카드/빈면적/작은도식/자료ID와주의문구밀도를 디자인팀이 실제기존예제와대조한다. 페이지마다내용에맞게 message/media/split/editorial/quote/bento등을선택하고 주요개념/관계는화면에서충분히크게읽혀야한다. 라이브러리의사진/아이콘/색은의미있을때사용한다. 자료팀의핵심지식사례를보여주며20분은말하기시간기준으로다시맞춘다.

## 소유권

root: WORK_LOG·이계약·최종browser/생성물/Git·안내. 콘텐츠팀: materials 원문5개, 종료뒤디자인팀에내용/대본인계. 디자인팀: slides.md/자체SVG·materials.css, 필요대본동기화는콘텐츠writer종료후명시인계. 엔지니어링팀: 프로젝트builder통합/테스트·사용안내, CSS인계후필요조정. 동시파일writer금지. 모든조사는새research폴더에증거만보관하고단일상태로그는WORK_LOG만사용한다.

## 공통 helper 인계 API (root 작성 후 동시 편집 없음)

scripts/materials.cjs: parseMaterial(source,{sourcePath}) → title/description/order/sourcePath/revision/headingIds/references(tokens)/tokens/headings. renderMaterial(material,(originalValue,ref)=>rewrittenValue) → {body,toc}, headingHtml도 참조 갱신 후 재계산. ref={token,attribute,value,kind,line}. materialPage(template,material,{body,toc,navigation,deckTitle,deckUrl,readUrl,indexUrl,stylesheet}) → 최종HTML. escape/slugify도 export. 자료 소스 수집·등록Map·참조해결/자산복사·공통CSS/template읽기·manifest/탐색·watch는 엔지니어A 담당. templates/material.html은 위 DOM 계약과 일치한다. root helper smoke에서중복한글heading/code안---/링크/HTMLescape/표wrapper/template슬롯검사통과. 엔지니어링인수뒤필요helper교정은A단독소유로넘긴다.

## 디자인 판정용 실제 비교 근거

기존 native의색/비교/단계: evidence/screens/reference-7.png,reference-14.png,reference-19.png,모자이크reference-11.png. 현발표: ../llm-wiki-20261028/evidence/screens/slide-01..12.png. root는기존의열린검은면/큰색표식/구분선/비교와달리이번원고가밝은거대카드6장에의존하고도식10이작게압축되는점을관찰했다. 최종스타일판정은디자인manager/실무가직접이미지를열고내린다. 단순overflow0을미감합격으로보지않는다. 자료원문은심화설명·실습을담고,발표는큰관계/사례/시선을보여주는역할로다시조판한다. 발표장수는내용에맞게조정가능하나20분시간표와대본을반드시같이갱신한다.

자료 index.md는선택이다. 없으면 등록자료목록을가리키는 materials/index.html을자동생성해자료1개만추가해도탐색이성립한다. 소스 index.md가있으면그원문을사용한다. 없는 index.md의Markdown링크를유령파일로허용하지않고,자동hub진입은상단탐색/모음에서제공한다. 새자료자산과template/style은 dependencies에포함한다.

발표상단모바일주의: 기존 .app-header는390px에서70px높이/nowrap이며새링크를무작정길게추가하면좁아진다. 자료가있는덱의stage-document-links를'발표 모음 · 학습 자료'두진입점으로간결히하고기존읽기/발표모드버튼을사용하는방식도허용한다. 자료없는기존덱출력은동일하게둔다. 실제390px에서링크/모드/테마가겹치지않는지root검수한다.
