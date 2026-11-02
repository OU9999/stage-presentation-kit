# 공통 타이포 계약 구현과 교차 검토

담당은 `/root/typography_engineering_manager/common_typography_engineer`다. 목표·현재 지침·담당·미완료의 정본은 root 소유 [WORK_LOG](../../../WORK_LOG.md)이며 이 문서는 공통 구현과 인수 근거다. HEAD `bf3cce13fcab66a6e44896241f508f4fe2d3793e`의 AGENTS·DESIGN·MARKDOWN-FIRST·CONFIG와 발표 명세/직접 회의를 읽고 시작했다. 현재 제품의 시각 승인은 미확인이다.

## 실제 공통 변경

- `blocks.css`: document 본문/목록32·표1em(32), 직접 인용40/1.5로 질문/인용→실행 본문의 위계를 만든다. quote·media의 직접 필수p는32로 시작하고 밝기도 본문으로 복구했다. message/closing의 두 번째 문단을 순서만으로24로 낮추던 규칙은 제거했다. 다른 구도의 모든 글자에32하한을 적용하지 않았다. 코드26을 전역으로 키우지 않으며 B의24는 전문을 native 네 문단으로 바꾼다.
- `blocks.js`: 직접 본문/그룹 문단에서 링크와 공백/`·`/`|`/`/`만 있는 행을 `md-meta`·`data-copy-role="navigation"`, 나머지는 `data-copy-role="body"`로 구분한다. 탐색 행은24(media22), 읽기에서는18이다. 혼합 문장은 필수 본문으로 남고 인용 내부 링크 주장은 분류하지 않는다. 이는 의미 추론이 아닌 좁은 구조 추론이므로 링크 자체가 필수 설명이면 같은 문단의 설명과 실제 역할을 확인한다. AST·원고·링크/강조 순서를 바꾸지 않는다.
- centered editorial의 `.markdown-body > .md-group` 선택자로 기본3그룹의32/40보다 centered34/48이 우선하도록 수정했다. 실제 computed 결과는 root 관측으로 확인해야 한다. 선행 공통p가 있으면 `data-has-prelude="true"`, 두H2는 `data-group-count="2"` 그대로이고 기존 전폭 행을 쓴다. 열간격64/행간격36, 공통 bodyp32를 사용한다. 특정 장 번호/문구/좌표 CSS는 추가하지 않았다.
- AGENTS·DESIGN·MARKDOWN-FIRST에는 실제 원본 증거면(자기제품 UI 포함)/설명용 재구성 예시, 필수 본문/탐색 메타, soft/hard/H1 현지원, 실제 glyph/표시값/소속/기준선의 인수와 기술/시각 판정 구별을 기록했다. CONFIG·parser는 변경할 필요가 없었다.

## 기술 검증

`node --test tests/blocks-composition.test.cjs tests/blocks-runtime.test.cjs tests/markdown-document.test.cjs`는42개 통과/실패0이다. 추가한 의미 회귀는 혼합 링크 필수본문과 인용 내부 링크 주장/독립 탐색의 구별, 원고를 동결한 채 원문/preview 순서 보존, 공통p가 두그룹 밖에 남는 소속, 본문·인용의br/강조순서, 일반softbreak와H1 literal/후속p 구별이다. 새 H1 문법·경고 UI·라이브러리는 추가하지 않았다. 첫 테스트 작성 중 parser가 보존한 빈 text node를 의미 node로 오판한 검증식을 고쳤으며 제품 AST를 지워 테스트를 맞추지 않았다.

이 테스트는 브라우저 실제 줄·CSS computed 크기·SVG contain·현장 가독성을 승인하지 않는다. root가 생성물/실브라우저를 단독 소유하므로 A는 빌드·생성물 수동편집·브라우저·WORK_LOG 편집을 수행하지 않았다.

## 직접 반론과 해소

1. B에게 파일 소유권과 nav/mixed/native24 계약을 직접 보냈고 B는24 H3 제거·전문 네 native문단·하단 순수링크를 수용했다. B가 필수32+탐색22로 그림 높이가 줄어 SVG44도 실제논리30 아래일 수 있다는 반례를 냈다. A는 수용했고 원도식의 동일 의미 중복만 통합하며 실제 contain 관측을 완료조건으로 남겼다.
2. 매니저가 선행 공통p가 그룹 밖에서29를 상속한다는 반례를 냈다. A는 `p[data-copy-role="body"]`에32를 명시했고 nav를 같이 키우지 않았다. B도 직접 수용했다. B는 이후32×43em=1376이body1416보다40좁아지는 실제공용p max-width 반례를 냈고 A가 공통행p의`max-width:none`으로 실제전폭박스를 복구했다. 문자열별 좌표 보정은 없다.
3. 매니저의13 질문 위계 반론을 B와 직접 검토했다. B가 document 직속blockquote40의 공통 역할을 수용해 title72/질문40/실행32로 구현했다. 다른 덱의 긴 인용 영향은 새 대표 화면에서 확인한다.
4. B 원고와 새9SVG를 A가 직접 읽었다.6공통선행p·17/18br·24전문native·26질문br는 의미 보존으로 수용했다.5/11에서 반복 하단 설명을 그림에 통합하고 원자료·관계를 유지한 범위를 확인했다. A는 새5 wiki44폰트의237→265/312→340 baseline28 간격이 겹칠 수 있음을 B에게 직접 반론했다. B가174/222/276/324/378/426의48·54간격과rules460/515/575로 교정했고 A가 source를 직접 재확인했다. 실glyph 겹침/contain 성공은 root의 새 관측에서 확인한다.
5. B 프로젝트 판정기 전문을 읽고 세 반례를 직접 전달했다. SVG실측 생략 시 검사skip으로 통과할 수 있는 경로,6의기하 box누락 시TypeError로 끝나는 경로,SVG실측 일부텍스트만 남아도 통과할 수 있는 경로다. B가 누락을contract-invalid로 다루고source별text inventory와실측을1:1대응하도록 보완한다. 매니저의현재입력fingerprint/역사baseline분리·npm실행연결 요구도 함께 인수한다.
6. root의 단독링크도 핵심CTA일 수 있다는 반례를 매니저로 인수했다. 기존 `**[지금 시작하기](...)**` 입력은body역할을 유지함을audience/preview 의미회귀에 포함해42검사를 재통과했고 정본작성예에도 연결했다. 단독링크를 언제나 비필수라고 단정하지 않는다.

B의 보강본16 unit을 A가 독립 실행해 모두 통과했다. npm의 명시baseline 명령도 직접 실행하여exit1/70checks/44regression/invalid0/visualApproval=false를 확인했다. SVG필수·원본/신규label multiset·assetSHA/path·현재전체입력hash/명시역사baseline의 대응을 전문에서 재확인했다. 추가probe의1장source가`undefined.blocks`를throw하는 반례와 sharedObs.logicalBox 누락guard를 B에게 전달했다. B가 source-count earlyreturn과 해당box guard·빈currentInputs거부·SVG실측의CSS/runtime hash대응까지 보완했고 A가 최신전문을 재확인했다. 이어 root의 다른viewport/manifest 관측혼입 반례를 B가 `captureManifest.sha256`·`viewport` 대조로 차단했다. A가 최종공통42+B19 합61 unit을 직접 실행해 모두 통과했고 최종npm baseline도exit1/70/44/invalid0으로 재확인해 B에게 직접 인계했다. A는B QA파일을 직접 편집하지 않았다.

마지막 읽기검토는 B가 직접 전달한 동결 SHA와 실파일을 대조했다. QA script `a7b1740d078b4bff67446056c78de97758c1eb16ab795384ebf966c38e84d1d8`, project test `48ee242837f599366188ab4bbd336a8c548dbb429350ba56b96db713b4240ffb`, role fixture `3faa5ba91d28d1e5d47039f0021e70669ac162e08222111dd9b5278a7b165727`이 모두 일치했다. B_IMPLEMENTATION/ENGINEERING_HANDOFF의61검사·capture identity 인계도 전문에서 확인했다. 공통제품 source/정본문서 동결은 유지했다.

보존 검증은 `bf3cce13fcab66a6e44896241f508f4fe2d3793e`의 각 Git blob과 현재 파일의 SHA256을 직접 비교했다. 원19SVG·기존remake2SVG·48장보관4파일·demo전체25파일·사용자test.md1·자작팩txt/zip9파일 총60항이 모두 동일하다. 원고parser 대조는26제목/26주제 불변,17/18의 전체필수본문 불변(공백 정규화),24의기존PRE 전문과새4문단 전문 동일을 확인했다.9본편이미지는 모두새typography경로이며 원본 파일은 그대로 남았다.

## 다음 실제 확인

root의 새 발표 두크기/읽기 두크기와 공통 영향 대표 화면에서32/34/40의 실제 computed값, 6의전폭 소속·동등2열폭·첫 본문 기준선·행간격, 17/18의br경계 앞뒤 glyph-y/강조순서, 새SVG의contain 후 필수라벨·관계/겹침을 관측한다. B 프로젝트 QA의before fail 재현과누락·중복 contract-invalid/허용짧은행 반례는 A가 교차 검토해 인수했다. current after pass는 root 새 실제 관측에서 실행해야 한다. 알려진 회귀 통과 뒤에도 발표팀의 새 실제 화면 판정과 `--require-approved` 전에는 승인으로 보고하지 않는다.

A는공통source/정본문서/이문서의 편집을 종료하고 B에게 취합을 인계한다. 생성물·실화면·현재판승인 기록은 root/후속 발표팀의 소유다. 새 관측에서 구체 수정요구가 오면 매니저가 writer소유를 다시 배정한다.
