# R4 국소 기하 구현과 round-02 교차 검토

A 담당은 `/root/typography_engineering_manager/common_typography_engineer`다. 최신 교체 AGENTS·WORK_LOG 진행절·DESIGN 타이포/현재판검수와 [1차 반려 R1–6](../review/FINAL_VERDICT.round-01.md), [기존 current 결과](../round-01/technical/current-1280.json)를 읽었다. 목표·담당·결정·미완료의 정본은 root 소유 WORK_LOG다. A 소유는 새 `scripts/llm-wiki-geometry-qa.cjs`, 기존과 분리한 `tests/llm-wiki-geometry-qa.test.cjs`, 이 문서뿐이다. 공통 CSS/runtime/정본문서·원고/자산·BmainQA/fixture·브라우저·빌드/생성물·WORK_LOG는 편집하지 않는다.

## 실제 구현과 한계

`evaluateGeometry(svgObservation, role.geometry)`는9·10장의 원래3개 노드/3개 무방향 관계와 지정 라벨만 검사하는 순수 함수다. B가 fixture에서 nodes/relations/labels를 소유한다. root collector는 root SVG viewBox 좌표로 노드중심·polyline 정확정점·실text bbox와 strokeWidth/visible/opacity/방향marker를 수집한다. 함수는 pair/anchor와 관측의 누락·중복을 `contract-invalid`, 단절·프레임밖/숨김·방향마커와 지정 bbox교차를 `regression`으로 구별한다. 선분과 bbox는 stroke반폭까지 반영해 검사한다.

지정 bbox와 선의 교차는 알려진 회귀 후보이며 실제 ink 관통이나 미감의 자동 승인이 아니다.5의 범주/설명 묶음은 이 기하계약에 포함하지 않았고, 다른 도식 전체의 선·모든짧은행을 검사하는 도구로 확대하지 않았다. 이미지 가림/선 삭제/새 화살표로 통과시키는 예외는 두지 않는다. 범용 SVG path parser나 제품 경고 UI는 추가하지 않았다. 작은 `linearPoints`는 보존된 역사 SVG의 단일 absolute M/L/H/V 직선 경로를 정확히 읽는 test/probe용이며 곡선·compound/lowercase 경로는 거부한다.

## 보존된 반려판의 독립 실패 재현

테스트는 `round-01/source/talks/llm-wiki/assets/typography/wiki-path.svg`와 `ingest-map.svg`의 실제 bytes SHA를 같은 라운드 SVGmetrics의 assetSha256과 대조한 뒤 그 `d`와 circle 위치를 읽는다. 당시 metadata가 없으므로 snapshot의 관계path3개/원순서circle3개의 정확 대응을 테스트에 명시했다. 당시 실 `texts[].bbox`를 그대로 결합하며 원래 캡처·source·QA 결과를 변경하지 않는다.

- 9: source `1f7639a18a54dc7601cefdbf3229eedfcb45506f1179f505dbf5185c218fceb4`. plan으로 향하는 두 사선이 `우리 스터디 계획` bbox와 교차한다.
- 10: source `3042c55378c0d777207115c3ddc80501c37752a9166e268e8e1ff46af3c78322`. 오른 수직선은 `기존 설명과 연결`·`현재 계획` bbox와 교차하며 다른 두 사선도 요약/입구/계획의 지정bbox와 겹친다. 세 관계의 anchor/추적은 유지된 채 label 회귀가 재현된다.

이는 과거70항/44회귀나68항/2회귀를 덮어쓴 수치가 아니다. 당시 미포함이었던 R4의 추가 범위를 같은 실BBox/보존source로 검사한 독립 probe다. 교정 가상기하의 pass는 helper의 수용 반례이고 새 실제관측의 after pass가 아니다.

## 직접 교환

root/B/매니저에게 파일소유와 관측 필드를 직접 제안했다. root가 `geometry.coordinateSpace='root-svg-viewBox'`와 nodes/relations·text bbox의 동일좌표계를 수용했고 B는 새9/10의3개관계를 polyline+data-relation-id/from/to, circle data-node-id로 작성했다. endpoint는 circle중심에 연결하여 표면r=10과 helper중심허용2의 불일치를 피했다.

A가10의 수직선만 우회하면 기존 두 사선/라벨충돌이 남는 반례를 실제 역사BBox로 직접 전달했다. B는 summary/concept-comparison/plan의 새노드와 위/아래label을 함께 재배치해 삼각관계의 바깥으로 분리했다. A는 새 source의3노드/3pair/label전문을 직접 읽고 원관계·무방향·전체텍스트 보존을 확인했다. 이는 root의새 실제bbox/PNG 확인 전인 source 검토다.

B가 실제candidate 경로도 교차점이 없는지 source-layout probe를 요청했다. A의 `tests/llm-wiki-geometry-qa.test.cjs` 안 `sourceLayoutProbe(slide)`는 snapshot/current SVG실파일을 읽고 g의font-family/spacing와 각text의 font-size/weight/anchor가 같은지 assert한다. 당시 실BBox를 source x/y delta만큼 평행이동하고 현재circle/polyline 정확좌표를 읽어 같은helper에 넣는다. 현candidate9/10은 이 제한적 가정에서 모두pass다. labelbbox 재계산·새글꼴·새화면관측이 아니며 실제 after pass로 보고하지 않는다. 반면 역사재현은9의2개/10의3개 bbox회귀후보와6개trace pass를 assert한다. 두 probe의입력·역할·한계를 구분했다.

원고의19·22변경은반려판과 공백정규화한 전문이 같고 의미행만 나눴다.3은필수원자료/다섯대상·관계와두하단문장유지,48라벨확대,5는3wiki범주/설명과4rules보존 및대응열441폭이x1000에서1441까지남음,8은세원자료/질문·세근거출처·답전문44크기유지를source에서 확인했다.9재읽기행/3무방향관계,10원자료입구/기존설명/여러자료종합·3pair도 그대로다. 이 계산과원문대조는원본실화면검수를대신하지 않는다.

## 다음 인수

`node --test tests/llm-wiki-geometry-qa.test.cjs`는10개모두 통과했다. 역사실패/교정가상반례·actualcandidate제한가정probe·stroke범위·누락/중복·hidden/marker/단절·프레임밖·collapse·지원안되는path와 역할범위 제외를 검증했다. BmainQA가 같은capture/source SHA를 먼저 확인하고 이 helper의 current9/10 결과를 합치는 경계도 직접 읽었다. B의 새22관리/19공부 fixture와실제실패줄3,8답문장의 bbox/실glyphRows보완도 직접 인수했다. 단일text안의다중tspan은2실glyph행으로 실패하고 행관측없음은invalid이며, 과거분리text실BBoxfallback은역사probe에서만명시한다.

최종 직접 실행은 B23+A10 총33관련unit과기존공통42를합친75unit 모두pass/0fail, `git diff --check` 통과다. 실제npm baseline을확장fixture로무output실행한결과는exit1/72checks/45regression/invalid0/visualApproval=false다. 기존70/44나round01현재68/2파일은덮어쓰지 않았다. B의 `round-01-expanded-probes.json`은기존77snapshot검증뒤새로지정한7범위실패를남겼으며R4의5bbox후보/6tracepass와각입력SHA가A의독립재현과일치함을읽어인수했다. 이새범위결과를기존범위의이력과구별해B에게직접전달했다.

root가 writer종료 후 새 현재입력의 발표두크기/읽기두크기·SVG기하를 수집하고 current QA를 실행한다. 독립 발표팀이 실제 선·라벨과 전26장 흐름을 확인하며 기준을 낮추지 않는다. 현재 after pass와 제품/지침 시각 승인은 미확인이다.

최종 `B_ROUND02_IMPLEMENTATION.md`와 `ENGINEERING_HANDOFF.md`의round02절 전문을 읽고 위75검사/확장범위/실관측한계 및직접반론해소를 인수해B와매니저에게직접회신했다. 최종읽기대상 SHA는 Ahelper `d91c81698e173d6a40ef8e4169a6ff0eec23514aae93520cde32d06c8665967f`, Atest `cce7f71395a445c7cfb9db8afba9202c24a975b492c958cb3fd5f571445ce5da`, BmainQA `5d8c684979dde9f67a901f77ceb5fd77f047e35008e4177f73db815271cf11f0`, Btest `a14d5ad795697195a400801fe8bfe35c981210f39ceb53859306aab19894fd8f`, fixture `94e5ccdd91ebda96b1bcfb8e5de7ed1724dd51654067e4d468a43d5df06da003`이다. A는3소유파일의writer를종료한다. 실제새관측에서수정요구가나오면담당소유를재배정한후재개한다.
