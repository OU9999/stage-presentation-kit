# main-08 독립 시각 검수

## 검수 범위

`/root/devday_recheck_sol62/a_stage`는 발표 1920×1080 및 1280×720, `/root/devday_recheck_sol62/b_reading`은 읽기 1440×1000 및 390×844에서 1–11장씩을 검토했다. 네 범위 모두 DPR 1이다. 각 검토자는 장별 PNG 22개, 전후 흐름 보드와 역할이 대응하는 공식 프레임을 직접 열었다. B는 두 채널의 최종 취합도 맡았다. 두 독립 초기 파일의 해시를 확인한 뒤 서로와 총괄의 현재 판정을 전달했다. 두 담당자 모두 사용자 지정 `gpt-6.2-sol` high로 실제 배정했으며, `fork_turns=none`으로 각자에게 검수 범위와 제약을 인계했다. 공식 릴리스와 실제 런타임 카탈로그는 2026-11-18T00:38:44Z에 총괄이 확인했다. [모델 확인](../../MODEL-20261118.json) · [공식 프레임](../../../devday-fidelity-20261116/evidence/README.md)

원고 SHA-256은 `a44cb9d1a06a868aa316a4374906c5091adce561782ab070e7761c0af371e834`, DESIGN SHA-256은 `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`이다. 매니저가 동결 목록의 105개 파일 해시를 보존 사본과 현재 입력에서 대조하고, 네 manifest의 44개 실제 PNG가 장·모드·viewport·원고에 대응함을 확인했다. main-07과 main-08의 Stage PNG 22개가 바이트 단위로 같아 최초 관찰을 현재 Stage PNG에 연결했다. Read는 main-08의 실제 새 이미지를 양폭 전수 열람했다. [동결 목록](../../main-08/source-snapshot.json) · [Stage 이미지 대조](../../main-08/preceding-stage-comparison.json) · [Stage 1920](../../main-08/present-1920/manifest.json) · [Stage 1280](../../main-08/present-1280/manifest.json) · [Read 1440](../../main-08/read-1440/manifest.json) · [Read 390](../../main-08/read-390/manifest.json)

| 초기 파일 | 동결 SHA-256 |
| --- | --- |
| [A 초기](A.initial.md) | `32fffe3b450863b39afc418345dadce92a925dc7339a60f812c27488ca9a6d2d` |
| [B 초기](B.initial.md) | `d99483e793080d812c408482128ade11ab5581e1b44568313c86ad7ece472bda` |

## 실제 화면과 교정 인계

| 판정 범위 | 관찰, 교정과 보존 |
| --- | --- |
| Stage 05 양폭 | 04의 네 결과물 뒤 무대를 비우는 전환은 유지한다. 현재 이름과 정의의 끝선이 거의 같고 어두운 틈이 커서 단일 공개 장면의 무게가 약하다. 이름의 실제 높이와 획 무게를 올리고 정의를 당겨 두 행을 한 시야에 둔다. 별도 장식 없이 중앙축과 정의 문장을 보존한다. [1920](../../main-08/present-1920/slide-05.png) · [1280](../../main-08/present-1280/slide-05.png) · [공식 이름 장면](../../../devday-fidelity-20261116/evidence/official-Fls_onRviPM-1260.png) |
| Stage 07 양폭 | 오른쪽 두 문서의 왼쪽 테두리는 수직 기준을 공유하지만 두 문서를 잇는 선에는 약한 경사가 남아 있다. 1280 viewport의 실제 Stage PNG에서 위아래 접점이 약 13px 어긋난다. 공통 세로축에서 연결하고 입구의 경계를 낮춰 선과 이름이 함께 읽히게 한다. 세 문서와 세 무방향 연결, ‘현재 계획’의 우선순위를 보존한다. 공유 SVG의 새 선·대비는 Read에서도 확인한다. [1920](../../main-08/present-1920/slide-07.png) · [1280](../../main-08/present-1280/slide-07.png) · [Read 390](../../main-08/read-390/slide-07.png) · [공식 관계 장면](../../../devday-fidelity-20261116/evidence/official-XkKdbPhIvbY-210.png) |
| Stage 09 양폭 | 제목 아래의 넓은 검은 면을 지난 뒤 세 행동이 별도 층으로 시작한다. 세 열을 제목과 가까운 한 읽기 단위로 모은다. 세 동사의 기준선, 주황 ‘고르기’와 한 줄 설명, 열린 좌우 간격을 보존한다. [1920](../../main-08/present-1920/slide-09.png) · [1280](../../main-08/present-1280/slide-09.png) · [공식 범주 장면](../../../devday-fidelity-20261116/evidence/official-Fls_onRviPM-1380.png) |
| Stage 10 양폭 | 좌측 상단의 회색 ‘첫 요청’이 세 행 발화와 떨어져 별도 탐색 제목처럼 떠 있다. 보조 표제를 발화 첫 행 가까이 두고 왼쪽 축을 일치시킨다. 흰 두 행의 실행 요청과 주황 마지막 행의 기록 조건, 이어지는 11장의 여백을 보존한다. [1920](../../main-08/present-1920/slide-10.png) · [1280](../../main-08/present-1280/slide-10.png) · [공식 선언 장면](../../../devday-fidelity-20261116/evidence/official-XkKdbPhIvbY-1200.png) |
| Read 03 양폭 | 파란 선 오른쪽의 인용 세 행과 기사 미리보기는 각 역할이 읽힌다. 밑줄의 ‘원문과 기사 전문’은 인용의 대상이 편집된 가상 사례이고 별도 예제 팩 원문이 있다는 점을 전달하지 못한다. 같은 링크 한 행에서 ‘가상 사례 기사와 예제 팩 원문’처럼 구별하고 현 인용·도착점·자료면을 보존한다. 발표 대본은 Stage에서 사례 지위를 구두로 명시하므로 Read의 독립 문맥과 따로 판단했다. [1440](../../main-08/read-1440/slide-03.png) · [390](../../main-08/read-390/slide-03.png) · [발표 대본](../../../../talks/llm-wiki/materials/speaker-script.md) · [공식 기사 장면](../../../devday-fidelity-20261116/evidence/official-Fls_onRviPM-1440.png) |
| Read 04 390 | 네 결과면은 고유색·비율과 문서 종류가 선명하다. 작은 글자를 읽기 어려울 때 전문 링크는 네 번째 자료를 지난 뒤에야 나온다. 390에서는 제목 바로 뒤 첫 결과 직전에 기존 전문 링크 한 개로 도착하게 하며 읽기·DOM·키보드 순서를 맞춘다. 데스크톱에서 링크가 네 결과물에 속하는 배치와 원비율·배열을 보존한다. [390 전체](../../main-08/read-390/slide-04.png) · [첫 타일](../../main-08/read-390/tiles/slide-04-01.png) · [다음 타일](../../main-08/read-390/tiles/slide-04-02.png) · [1440](../../main-08/read-1440/slide-04.png) · [공식 네 화면](../../../devday-fidelity-20261116/evidence/official-Fls_onRviPM-1500.png) |

Stage의 선언→비교→기사 인용→결과 회수와 뒤의 행동→실제 발화→마지막 질문이라는 역할 변화는 유지한다. Read의 05는 왼쪽 문서 흐름에서 이름과 정의가 자연스럽게 이어지고, 09와 10의 제목·본문 간격도 직접 읽기에 맞는다. 07의 작은 오른쪽 선은 현재 Read에서 끝점을 잇지만 색 대비 여유가 크지 않으므로 공유 SVG를 변경하면 390에서 다시 열어 확인한다. [Stage 전반](../../main-08/present-1280/contact-01-08.jpg) · [Stage 후반](../../main-08/present-1280/contact-09-11.jpg) · [Read 전반](../../main-08/read-390/contact-01-08.jpg) · [Read 후반](../../main-08/read-390/contact-09-11.jpg)

## 최종 판정

| 범위 | 직접 검토 | 개선 필요 | 심사 후보 |
| --- | ---: | ---: | ---: |
| Stage 1920×1080 | 11 | 4 | 7 |
| Stage 1280×720 | 11 | 4 | 7 |
| Read 1440×1000 | 11 | 1 | 10 |
| Read 390×844 | 11 | 2 | 9 |
| 합계 | 44 | 11 | 33 |

현재 판정은 `needs-changes`다. 두 검토자의 범위별 이유와 기계 입력용 결과는 최종 원문에 있다. 총괄이 기록과 승인 명령을 담당하며 이 검수의 실행 범위는 로컬 정지 캡처다. 실제 공연장 투사, 다른 OS·기기의 조판, 모션은 아직 확인하지 않았다. [Stage 최종](A.final.md) · [Read 최종](B.final.md)

두 담당자는 검수 원문을 마감하고 쓰기를 종료했다. A가 전달한 최종 파일은 `b6a87e949a926a14799d091891c680a1f5e77999aa49595b0e50e7c822f92cb6`이고, 개선 필요 8개 행에 행별 `owner`와 `nextAction`이 없었다. 총괄과 매니저가 검증에서 확인한 뒤 매니저가 위 교정 명세로 두 필드만 보강했다. 현재 A 최종 SHA-256은 `a748c989bc00f2b7f6d7e89671e7f302918d0af57727d9884c3345957d661779`이고, B 최종은 `81f55b2693a76b7913e17e96b3c1a8bad0972a1448f81df74a81e9f182719be0`이다. 동결 초기의 해시와 A의 기존 범위·검토자·판정·이유·근거를 보존했다. [A 초기](A.initial.md) · [A 최종](A.final.md) · [B 초기](B.initial.md) · [B 최종](B.final.md)

제작팀이 위 항목을 교정하면 총괄이 새 입력을 동결하고 실캡처한다. 새 판에서 변경 장과 인접 흐름, 공유 자산이 미치는 두 읽기 폭, 04 모바일 전문 링크의 Tab 순서와 실제 도착점을 재검수한다. 본편의 개별 판정은 해당 입력과 실물에 귀속한다.
