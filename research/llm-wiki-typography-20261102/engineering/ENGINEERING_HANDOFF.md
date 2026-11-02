# 타이포 교정 엔지니어링 취합 인계

취합자는 B `/root/typography_engineering_manager/deck_qa_integrator`다. 초기 구현은 A/B가 각각 실질 수행했고 서로의 원고·9SVG·공통 코드·검사·정본문서 전문을 직접 읽고 반론했다. 최신 목표/담당/미완료의 정본은 root 소유 [WORK_LOG](../../../WORK_LOG.md), 팀간 실행 계약은 [MEETING](MEETING.md)이다. [A 공통 구현](A_IMPLEMENTATION.md)과 [B 원고·자산·QA 구현](B_IMPLEMENTATION.md)을 함께 인수한다. **현재 상태는 구현/기술검사 완료, 새 실제 화면·current QA·독립 시각 승인은 미확인**이다.

## 통합된 최종 구현

공통 조판은 document본문·표32/도입인용40,quote·media필수p32,centered동등그룹34/제목48을 시작 역할로 사용한다. 별도순수탐색p22–24와 혼합필수p/인용안링크/강조CTA를 구별한다. 원고·AST를 바꾸지 않고 renderer가 직접 문단 역할을 붙이며 읽기에서는 일반18로 복원한다. centered의 선행공통행은 두H2그룹 밖에 있고 폭상한을 풀며2열·36행간·64열간을 쓴다. parser/H1신규문법·전용slide좌표·자동축소는 없다.

LLM Wiki는 4/6/12/21/22의 의미행,6의선행공통소속,17/18큰인용과필수설명,24의네요청native전문,26의청중질문호흡을 교정했다. 7/13/23의표/질문·순서역할은 공용크기와공간을 적용한다.9도식은 새`assets/typography/`경로에 재조판했고5/11/20의흰재구성면을검정열린구도로 바꿨다. 원래19SVG·이전remake2·archive·원자료·demo·사용자test.md는 보존했다. 대본6의순서와9절의현재그림/원본접근,README의최신검토경로를 맞췄다. 26제목·35+5 배분은 유지했다.

AGENTS/DESIGN/MARKDOWN-FIRST는 필수역할/메타·실제증거면/설명재구성·본문br/H1현지원·원고/DOM소속·actualglyph/contain·before/current 기술검사와시각판정구별을 연결한다. 자기제품의실제UI도원본증거면이면고유표면보존대상이다. 모든밝은면/3열/짧은행을금지하거나글자하한을전역강제하지 않는다.

## 실행과 실증 상태

```sh
npm run qa:llm-wiki-typography -- --mode baseline --manifest research/llm-wiki-typography-20261102/before/present-1280/manifest.json --source research/llm-wiki-typography-20261102/engineering/fixtures/slides-before.md --svg-metrics research/llm-wiki-typography-20261102/before/present-1280/svg-metrics.json --output research/llm-wiki-typography-20261102/engineering/before-qa.json
```

실제 결과 exit1/70checks/44regression/invalid0,visualApproval=false다. 같은 판정기의 current 실행은 root가 수집할 새manifest/SVG관측으로 이어간다.

```sh
npm run qa:llm-wiki-typography -- --mode current --manifest PATH_TO_CURRENT_MANIFEST --source talks/llm-wiki/slides.md --svg-metrics PATH_TO_CURRENT_SVG_METRICS --output PATH_TO_CURRENT_QA_RESULT
```

current는 전체실입력hash+AGENTS/DESIGN,SVG관측의동일capturehash/manifest파일SHA·viewport/sourceassetSHA/분류/전체라벨inventory를 강제한다. 실제glyph행,의도br앞뒤y·강조,역할font,24몸체기하,6소속/전폭/두열기준선,9도식contain크기를검증한다. source/target삭제·중복·관측누락·stale관측은invalid이며역사baseline은따로명시한다. 19개프로젝트unit과A공통42 합61개통과/실패0,공백검사통과. 이는 실브라우저의최종관계/위계승인이 아니다.

## 직접 반론 해소와 후속 수용조건

A의5wiki28baseline겹침반론은48/54간격으로 재배분했다. B의media필수p증가→contain축소반론은9도식실투영관측을필수화했다. B의6공통p43em폭상한반론은공용max-width:none으로수정했다. A의SVG측정생략/일부라벨누락/누락기하throw/삭제source throw와매니저의current전체hash·옛CSS SVG관측혼입반론은invalid/전체inventory·동일capturehash로해소했다. standalone링크가필수행동일수있는반례는강조CTA/혼합본문역할보존과공용테스트로인수했다. A는최종QA19+공통42를직접재실행하고수용회신했다.

source동결뒤root가생성물/두발표1920×1080·1280×720/읽기1440·390/공통변경대표화면을단독수집한다. current QA가필수관측누락을보고하면collector나입력대응을수정하며기준을낮추지않는다. 실제줄·크기회귀가남으면소유자를재개해수정/동결/새캡처를반복한다. 6의전폭/기준선·17/18호흡/32본문·24전문/실기하·9도식관계/라벨·전26장흐름은발표팀이새원본으로독립판정한다. 아직현장프로젝터/객석거리/실낭독은미확인이다.

B제품소스·QA구현은동결하여root에인계한다. 실제after결과가나오면이문서의후속근거만추가하며소스변경은명시재개후수행한다. 새시각승인은독립검수와명시범위`--require-approved`를통과한뒤에만보고한다.

## Round 02 인계 — 1차 반려 R1–R6 국소교정

앞 절은 첫 구현판의 인계 이력이다. root 실제 round01 current는68항/회귀2/invalid0이었고,독립 발표팀은3필수폰트·22내용/관리·8/19호흡·9/10선라벨을 반려했다. 이번 현재 인계는 [B_ROUND02_IMPLEMENTATION](B_ROUND02_IMPLEMENTATION.md)과 [A_ROUND02_REVIEW](A_ROUND02_REVIEW.md)를 따른다. 새 after/시각승인은 여전히 미확인이다.

B는3필수48과5관계/라벨위치,5wiki대응열,8답의축소없는한호흡폭,9/10의3무방향pair와라벨/선경로,19/22의명시호흡을 실제 수정했다. A는9/10의국소기하helper와10회귀를 실질 구현했고 B가 mainQA/fixture에 통합했다. 공통CSS·정본문서·24/26은 이번에 수정하지 않았다.

기존70/44 baseline와68/2 round01결과는 그대로 보존한다. 확장baseline은 별도72항/45회귀/invalid0이며,77snapshot원바이트를검증한추가round01probe의7범위가모두fail이다. 이는 새 full current나시각판정이 아니다. A의현재source/역사bbox이동가정probe도actualafter와구별한다. 확장current는원기술계약에관리/공부꼬리,8실glyphRows한행/우측경계,9/10실node/연속polyline/3무방향pair/모든segment와지정bbox교차를 추가한다. 원문/관측삭제·중복·실glyphRows누락은invalid다.

A/B상호전문교차와직접반론해소뒤 관련75개(B23+A10+공통42)테스트를통과했다. R5단일text/bbox가두tspan행을숨기는반례는root실glyphRows필수로교정했다. 실제 새폰트/선기하/행·전26흐름/읽기와행동/정본지침의 최종판정은root새관측과발표팀독립재검수에남는다. 그전`--require-approved`나본편승인을선언하지않는다.
