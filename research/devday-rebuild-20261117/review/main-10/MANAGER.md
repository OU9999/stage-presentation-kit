# main-10 독립 시각 재검수

## 현재 실물과 검토자

main-08에서 발표 8개, 읽기 3개 범위에 요구한 교정을 같은 검수팀이 다시 확인했다. A는 Stage의 1920×1080과 1280×720, B는 Read의 1440×1000과 390×844에서 각 11장과 이웃 장의 흐름을 맡았다. 모든 viewport의 DPR은 1이다. 두 담당자를 사용자 지정 `gpt-6.2-sol` high 기존 세션으로 각각 재개했다. 현재 시각 의견과 기능 결과는 두 초기 파일을 동결한 뒤 공유했고, 두 담당자가 직접 교차 검토했다. [모델 확인](../../MODEL-20261118.json) · [main-08 교정 명세](../main-08/MANAGER.md) · [공식 프레임](../../../devday-fidelity-20261116/evidence/README.md)

원고 SHA-256 `4d4ade76b7d83c0ac938bdb34f81425cb5db8b74d37d2f934790cd0fceb19c2e`와 기준 SHA-256 `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`에 현재 PNG 44개를 연결했다. 매니저가 105개 동결 입력의 보존 사본과 현재 파일 해시, 네 manifest의 원고와 각 PNG 대응을 확인했다. main-08과 비교해 Stage 양폭 05·07·09·10, Read 1440의 03·04·07, Read 390의 02·03·04·07이 달랐다. 이 15개는 현재 PNG를 직접 열었다. 나머지 29개는 PNG 바이트가 같아 해당 검토자의 이전 실물 관찰을 현재 개별 PNG에 연결했다. Read 390의 02는 74픽셀이 달라 현재 장에서 두 작업창과 가까운 라벨을 다시 확인했다. main-09의 Stage 1920 전 11개는 main-10과 바이트가 같아 선행 열람도 그 동일성에 연결했다. [동결 입력](../../main-10/source-snapshot.json) · [PNG 비교](../../main-10/preceding-pixel-comparison.json) · [Stage 1920](../../main-10/present-1920/manifest.json) · [Stage 1280](../../main-10/present-1280/manifest.json) · [Read 1440](../../main-10/read-1440/manifest.json) · [Read 390](../../main-10/read-390/manifest.json)

| 초기 파일 | 동결 SHA-256 |
| --- | --- |
| [A 초기](A.initial.md) | `4e1b7910fa06c1fa6e099457a6fd86e58d0a66550c4597bf73679ed4cf7e6022` |
| [B 초기](B.initial.md) | `4046da18774dfcdd5510a8f89677a4609a4f16fea587e36c2a2b4367cf5e0bf1` |

## 교정된 실제 화면

| 범위 | 직접 확인한 변화 |
| --- | --- |
| Stage 05 양폭 | `LLM Wiki`가 정의보다 넓고 획이 커 한눈에 들어온다. 정의는 이름 아래의 짧은 한 행으로 붙는다. 04의 네 결과물 뒤 한 이름에 시선이 머물고 06의 준비 기록으로 넘어가는 쉼이 생긴다. [1920](../../main-10/present-1920/slide-05.png) · [1280](../../main-10/present-1280/slide-05.png) · [공식 이름 장면](../../../devday-fidelity-20261116/evidence/official-Fls_onRviPM-1260.png) |
| Stage·Read 07 양폭 | 오른쪽 두 문서의 외곽과 세로 연결이 같은 축으로 읽힌다. 희미해진 요약 테두리에서 오른쪽으로 이어지는 두 사선이 분명하고, ‘현재 계획’은 이름과 획으로 먼저 읽힌다. 작은 읽기 화면에서도 세 연결이 각각 끝점에 닿고 세 이름이 남는다. 06의 주체에서 연결을 지나 08의 실제 변경으로 시선이 이동한다. [Stage 1920](../../main-10/present-1920/slide-07.png) · [Stage 1280](../../main-10/present-1280/slide-07.png) · [Read 1440](../../main-10/read-1440/slide-07.png) · [Read 390](../../main-10/read-390/slide-07.png) · [공식 관계 장면](../../../devday-fidelity-20261116/evidence/official-XkKdbPhIvbY-210.png) |
| Stage 09 양폭 | 제목과 아래 세 행동이 가까워져 제목에서 같은 왼쪽 기준의 주황 ‘고르기’로 바로 넘어간다. 세 설명은 한 줄씩 남고 열린 열 사이 여백이 구분을 만든다. [1920](../../main-10/present-1920/slide-09.png) · [1280](../../main-10/present-1280/slide-09.png) · [공식 범주 장면](../../../devday-fidelity-20261116/evidence/official-Fls_onRviPM-1380.png) |
| Stage 10 양폭 | 회색 ‘첫 요청’이 발화 첫 행 위로 내려와 한 왼쪽 축을 공유한다. 요청 두 행과 주황 기록 조건의 세 의미행이 그대로 이어지고, 11의 가운데 질문이 또렷한 닫힘으로 남는다. [1920](../../main-10/present-1920/slide-10.png) · [1280](../../main-10/present-1280/slide-10.png) · [공식 선언 장면](../../../devday-fidelity-20261116/evidence/official-XkKdbPhIvbY-1200.png) |
| Read 03 양폭 | ‘가상 사례 기사와 예제 팩 원문’이 기존 위치의 한 행을 차지한다. 인용의 세 호흡을 끊지 않고 편집 기사와 원자료의 역할을 보여 준다. 390에서는 링크와 기사 그림이 인용 아래 한 열에 선다. [1440](../../main-10/read-1440/slide-03.png) · [390](../../main-10/read-390/slide-03.png) · [공식 기사 장면](../../../devday-fidelity-20261116/evidence/official-Fls_onRviPM-1440.png) |
| Read 04 양폭 | 390 첫 화면에서는 두 행 제목, 전문 링크, 일정표 순서로 보인다. 1440에서는 오른쪽 첫 열에 링크 시작선을 맞춰 2×2 결과물 묶음의 전문임을 드러낸다. 네 자료면의 순서와 표면이 이어진다. [1440](../../main-10/read-1440/slide-04.png) · [390 전체](../../main-10/read-390/slide-04.png) · [390 첫 화면](../../main-10/read-390/tiles/slide-04-01.png) · [공식 네 화면](../../../devday-fidelity-20261116/evidence/official-Fls_onRviPM-1500.png) |

총괄의 기능 관측에서 04의 링크는 두 폭 모두 첫 figure 전에 한 개다. 직전 03 자료 링크에서 Tab으로 이동하고 Enter를 누르면 ‘네 가지 작업 결과’에 도착했다. 이 관측은 현재 시각 판정을 보완한다. [자료 링크·키보드 관측](../../main-10/support-navigation.json)

## 판정

총괄이 현재 두 최종 원문의 44개 판정을 각각의 manifest와 묶어 일반 검사와 `--require-approved`를 실행했다. 두 Stage와 두 Read 명시 범위 모두 종료 코드 0이며, 각각 11장 승인·개선 필요 0·미확인 0이다. 이 승인은 저장소의 현재 로컬 정지 캡처에 적용한다. 공연장 투사, 다른 OS·기기와 모션은 현 범위에서 관측하지 않았다. [승인 명령 결과](../../main-10/approval-cli.json)

두 검토자는 최종 판정을 저장하고 쓰기를 종료했다. A 최종 SHA-256은 `e707db29a2573761df6cbf80ef6acd28e5e21a307d0ef4e9b317c7b57bed7505`, B 최종은 `d20f33cf9a990eb3def2d40bf34c4b489e6c750e8759af730bafaccb5e1923b9`다. 매니저가 초기 두 해시, 최종 44개 고유 범위와 현재 개별 PNG, 승인 기록에서 같은 검토자·판정·이유·근거의 연결을 확인했다. [A 최종](A.final.md) · [B 최종](B.final.md)
