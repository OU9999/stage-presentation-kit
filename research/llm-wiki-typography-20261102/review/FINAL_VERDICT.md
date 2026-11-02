# LLM Wiki 타이포·배치 교정 최종 인수

최종 판정은 **아래 명시한 현재104개 화면 조합 승인**이다. A/B의 직접 작성 판정과 실제 근거를 root가 그대로 통합했고 네 기록의 `--require-approved`가 모두 exit0으로 통과했다. 과거104승인·기술검사 성공을 새 시각 승인으로 대신하지 않았다. 현재 원고·자산·공통 입력과 해당 네 범위에만 적용한다.

통합매니저 `/root/presentation_recovery_manager`, 2026-11-02. A `/root/presentation_recovery_manager/presentation_current_auditor`는 발표52원본, B `/root/presentation_recovery_manager/reading_policy_auditor`는 읽기52원본·상세접근·공통대표·정본지침을 독립 검토했다. [같은 작업 모델 스냅샷](../model-snapshot.json)의 정확 `gpt-6.1-sol`/high/none을 유지했다. 중단 전 실제 감사를 인수했고 자동 모델 변경·중복 writer를 만들지 않았다.

## 현재 입력과 실제 열람

- 원고 SHA256: `72f3e1a1a04cab86c82b82162dd5915203069e04fb51f4908603cb503759d5dd`.
- 상세관계 원고 SHA256: `76b96c491447497412147b795533723533578532b0b05d6b0075d22ded411cda`. 마지막 native8 도입의 강조 기호만 정상화했고 질문·세근거·현재답·병용 뜻을 보존했다. 기존 비차단 표기흠의 마감 교정이지 새 반려를 인위적으로 추가한 것이 아니다.
- AGENTS `c1c6ff5ae1a73eab252d92065219bcd9cf58acd3a2f27fc55931bfa5203108a7`, DESIGN `ca0f0277c4c260b77e756b17272e8a90388cedf9780c8d916963563adfd519c6`, MARKDOWN-FIRST `ff0afb67e577ecf0273c38755d35b1faeacec16dbb03376fa9889a81a1f9f85f`.
- blocks.css `a55a412ea27eae15e1989f97cf185246c3e3484245a12879fc81021155a77ee4`, blocks.js `ae8deef84bacbbf75d9423413a445b51ebd5b73f68209ac11447a246342db09a`. Round02 이후 공통 두 파일과 정본지침은 바뀌지 않았다.

최종 근거는 [발표1280](../round-03/present-1280/manifest.json)·[발표1920](../round-03/present-1920/manifest.json)·[읽기1440](../round-03/read-1440/manifest.json)·[읽기390](../round-03/read-390/manifest.json)의 각26장이다. 모드는 presentation-stage-only/read-slide-crop, DPR1, viewport는1280×720/1920×1080/1440×1000/390×844다. 실제 발표stage917.333×516/1557.333×876과1600×900 논리배율·SVG contain배율을 구별했다.

root는 마지막 자료 수정 뒤 네 범위를 실제 재캡처했다. [비교 정본](../round-03/technical/capture-comparison.json)의104개 중63개는 실독 원본과 byte동일이고41개는 상이하다. A는 발표의 상이39개를 모두 새 원본으로 다시 열었다.1280상이20은footer띠지만1920상이19에는 본문·선·링크 영역도 있어 전체footer-only라고 보고하지 않는다. B는 읽기 미동일1440#11/390#9 두 현재 원본을 새로 열었고 나머지50개는 동일성과 현재입력을 직접 인수했다. 차이 원인은 단정하지 않는다. native8 새목적지 양폭start/end도 직접 읽었다.

상세 판정은 [A 발표 검토](PRESENTATION_REVIEW.md)와 [B 읽기·정책 검토](READING_POLICY_REVIEW.md)다. 매니저도 양발표 핵심13장씩26원본, 읽기 양폭5/7/10/18/20/24와 현재 미동일11/9, native8 및 상세관계·공통대표를 직접 교차했다. 실무의 전수 실독을 매니저 자신의104개 전수 열람으로 바꾸어 표현하지 않는다.

## 실제 교정의 수용 이유

| 항목 | 실제 화면과 보존 판단 |
| --- | --- |
| 3 필수 도식 | contain후 최소33.585논리px와 실제 라벨을 확인했다. 원자료3·지식대상5·기존5관계·두하단필수문장을 남기고 현재이해/계획/다음질문 라벨을 선에서 분리했다. source48 선언이나 하한 완화로 통과시키지 않았다. |
| 4/6/12/21/22 행과 소속 | 목적어·부사구와 서술어를 함께 읽는다.22내용의 가능성/관리의 시간비용을 모두 남겨 있습니다./듭니다. 고립을 없앴다.6공통p는 두H2 앞 source/DOM 공통소속이고 전폭·같은두열폭·첫baseline이 실제로 맞는다. |
| 8/19 호흡 | 8은 ‘세 메모를 엮어 / 스터디 계획을 정리합니다.’,19는 ‘읽은 자료를 / 개념과 질문으로 연결하기’로 동작을 묶었다. 공통질문·세입력/세근거출처/현재답과 동등한세활용처를 보존했다.19의 강조 확장은 의미 보존이며 새 원고byte불변이라는 주장이 아니다. |
| 9/10 선과 라벨 | 실제 라벨과 선이 분리되고 세무방향pair를 노드끝까지 추적한다.10외곽우회는 면/화살표/새출력노드가 아니라 기존관계를 잇는 선이다. 선삭제·가림·새인과/필수생성순서로 회피하지 않았고9재읽기행도 남았다. |
| 5/11/20 면과 위계 | 지정 재구성면을 검정열린구도로 바꿨다.5범주/설명 대응열과raw보존/wiki갱신/rules공통약속,11한자료/여러자료축·근거3/연결2,20네시간/활동·자작팩·발췌/비실측한계가 읽힌다. 실제 증거면·자기제품UI의 고유색 삭제 권한으로 확대하지 않는다. |
| 17/18/24/26 필수 역할 | 17/18 두호흡과 필수책임/조건·기록구분32본문이 읽힌다.24네요청32native/굵은라벨이 탐색24보다 먼저 읽힌다.26질문30논리px는 양실원본의 굵은중앙두행을 실제읽어 수용한 판단이며 필수역할 면책이나 전역32하한으로 일반화하지 않는다. |

[1차 반려 원문](FINAL_VERDICT.round-01.md)과 [77입력 snapshot](../round-01/source-snapshot.json)은 보존했다. 같은경로 자산이 바뀌어도 당시반례를 복원할 수 있다. 과거승인을 방어하지 않고 실제 반례를 엔지니어에게 직접 인계해 교정했다.

## 읽기·행동·공통 영향

390 인라인SVG의 모든 세부를 작은전체이미지 자체에서 읽는다고 승인하지 않는다. 화면의맥락/자료실재와 읽을수있는상세링크, 같은관계를 native문서에서 읽는 실제접근을 함께 수용했다. [최신18왕복](../round-03/reading-actions.json)·양폭목적지·각절start/end·20표좌우를 대조했고20모바일표는 시간4행/남길것4행을 좌우로 읽으며scrollLeft262=max262에 도달했다.7/23인라인표도 전행을 확인했다.

좁은18px연속본문의2/6/10/18/24 일부자동행은 남는다. A의10 ‘문서·목차·링크 / 갱신하기’ 후보를 B와 대조해 같은p·인접행간·화살표순서/책임귀속으로 이어읽히므로 고정발표분리열의 고립서술어와 다르게 비차단 리듬한계로 판단했다. 링크 성공으로caption을 면책하거나 모든짧은행을 금지한 것이 아니다.

[최종행동](../round-03/final-actions.json)은390/1440 네요청DOMRange선택에서 전문을 보존한다. 클립보드 쓰기 결과로 확대하지 않는다. 팩/워크숍/부록/학습/설계원문5실클릭,UTF8·부록19이미지,실키1→26/Home·End/overview26·17선택을 인수했다. [공통12대표](../round-02/common/verification.json)는 실제PNG 실독과 main/CSS/다른덱 동일 범위의 제한적 재사용이다. 타주제표·질문·인용·사진·bento·밝은자작자료·390읽기·감소모션2대표에 새차단반례가 없다. 밝은자작보고서를 원본증거라고 오분류하지 않고LLMWiki국소검정지시를 다른덱에 전역적용하지 않는다.

## 기술 검사와 지침의 별도 판정

매니저는 최신작성안내 명령을 최종 두발표manifest/SVG관측으로 각각 직접 실행했다. [1280](../round-03/technical/current-1280.json)·[1920](../round-03/technical/current-1920.json) 모두exit0/83checks/invalid0/regression0,visualApproval=false다. [명시 확장baseline](../round-02/technical/baseline-expanded.json)은72checks/45회귀/invalid0이다. 원래70/44·Round01 current68/2·[추가7범위 역사probe](../engineering/round-01-expanded-probes.json)와 구별하며 과거결과를 덮지 않았다. 지정 원문/국소기하의 before실패→현재통과는 기술근거이며 일반한국어/미감승인기가 아니다.

root build/verify·전체317테스트는 인수한 기술근거다. [보호파일](../round-03/technical/final-preservation.json)은101중97동일,의도4변경(원고/README/상세관계/대본)이며 원19SVG·48원고·demo·test.md를 보존한다.26주제·35+5계획을 현재원고/대본과대조했지만 실제35분낭독은 하지 않았다.

**정본지침 별도 판정도 적합, 추가 수정 요구0이다.** B의 현재SHA별표와 최종 전문을 매니저가 독립 인수했다. 위 AGENTS/DESIGN/MARKDOWN-FIRST의 기존br/H1제약·필수역할/메타/강조CTA반례·실원본/재구성·source/DOM소속·glyph/contain·현재전체해시/관측누락invalid·지정회귀/전문가판정분리가 실제제작과검수에 연결됐다. 이는 이번 교정과 관측·반례 운영범위의 적합성이며 제품104화면 판정과 별도다. 모든미래발표의품질/재발불가보증으로 확대하지 않는다.

## 직접 반론과 마감

A/B는 독립초안뒤 서로전문을실독하고 일대일로 반론했다. B의26필수역할면책금지·19강조확장을byte불변이라고하지말라는지적, A의핵심교차/전수실독구별과390caption후보는 구체이유로 수용/비차단판정을 정리했다. source/정본/생성물/브라우저/WORK_LOG는 root소유이며 검토팀은 제품을 수정하지 않았다.

A/B는 소유 문서와 네수동판정JSON의 writer종료·최종SHA를 직접 통지했다. 매니저는 두 최종 전문·해시·각26행/고유장/실검토자·실근거를 읽고 인수했다. root는 상태/이유를 수정하지 않고 기계취합했으며 아래 [실행 결과 정본](../final/approval-checks.json)을 매니저가 직접 읽었다.

| 승인 범위 | 현재 기록 | 실제 require-approved 결과 |
| --- | --- | --- |
| 발표1280×720/DPR1 전26장 | [present-1280](../final/present-1280.review.json) | exit0,26approved,needs-changes0/unreviewed0,valid/approved/passed=true |
| 발표1920×1080/DPR1 전26장 | [present-1920](../final/present-1920.review.json) | exit0,26approved,needs-changes0/unreviewed0,valid/approved/passed=true |
| 읽기1440×1000/DPR1 전26장 | [read-1440](../final/read-1440.review.json) | exit0,26approved,needs-changes0/unreviewed0,valid/approved/passed=true |
| 읽기390×844/DPR1 전26장 | [read-390](../final/read-390.review.json) | exit0,26approved,needs-changes0/unreviewed0,valid/approved/passed=true |

검토팀의 현재 제품·지침 추가 수정 요구는0이며 매니저도 이 문서 writer를 종료한다. 전체 목표·담당·결정의 단일 로그와 최종 사용자 보고는 root가 마감한다. 현장프로젝터·객석거리·다른OS/브라우저·실35분낭독·청중효과·일반모션 전편미감은 검증범위밖이다. 모바일 인라인세부/자동행 리듬의 위 한계도 유지한다. 이번 새변경의 커밋·푸시·공개배포를 완료한 것으로 보고하지 않는다.
