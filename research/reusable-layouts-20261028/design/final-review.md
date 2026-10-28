# 재사용 배치 실제 화면의 독립 디자인 인수

2026-10-28 · 디자인 매니저. WORK_LOG 현재 구현절과 동일 작업의 모델/소유 계약을 읽었다. 새 자식·모델·브라우저를 사용하지 않고 root가 저장한 최종 stage PNG를 `view_image`로 직접 열었다. 제품/CSS/원고는 수정하지 않았다. 본인 소유 [visual-contract](visual-contract.md)의 `staggered6의12grid cell` 한 오기만4×2·span합8에 맞게 `8grid cell`로 교정했다.

## 직접 확인한 범위

직접 열어 본 화면은 최초33개와 최종 색 교정2개, 합35개다. 두 신규 서사17장, 수량별 혼합/아이콘8장, Paper 대표8장과 마지막 색 교정 Stage/Paper2장을 구분한다. [원고 화면 관찰](../evidence/stories-browser.json), [수량 관찰](../evidence/counts-browser.json), [테마·읽기 관찰](../evidence/themes-read-browser.json)의 측정과 직접 눈으로 본 구도를 함께 대조했다. 자동245개 검사·런타임 복사·경고0은 root의 기능 근거이며 이 검수의 미감 판단을 대체하지 않는다.

| 직접 열람 | 파일과 범위 |
| --- | --- |
| 사진 에세이8장 | `evidence/screens/photo-01.png`부터 `photo-08.png`까지 전부 |
| 전시 준비9장 | `evidence/screens/exhibit-01.png`부터 `exhibit-09.png`까지 전부 |
| 수량/선택8장 | `case-08.png`~`case-15.png`: balanced5/8/12, seoul12, recap12, builtin wall5/12/22 |
| Paper8장 | photo02/03/05, exhibit05/07/08, bento8, wall22의 `*-paper.png` |
| 최종 색 교정2장 | wall22의 `wall-22-stage-final.png`와 `wall-22-paper-final.png` |

## 두 서사와 사진

사진 에세이는 큰 선언→제목 없는 세로6사진→가로4사진→큰 인용→엇갈린6사진→해석의 경계→함께 읽기→맺음으로 이어진다. 전시는 약속→준비 장면과 질문→큰 포스터→원칙→12혼합자료→동선 점검→함께 할 일→자체 표식→관람자의 질문으로 끝난다. 사진의 비율을 비교하는 이야기와 전시의 준비물을 회수하는 이야기가 서로 다르며 같은 기능 나열을 반복하지 않는다. 중립 목록·인용의 여백은 자료를 매 장 빽빽하게 채우는 대신 흐름을 멈추고 읽게 한다.

[제목 없는 portraits6](../evidence/screens/photo-02.png)는 같은 높이의 여섯 세로 프레임과 외부 짧은 caption으로 기존 사진 계열의 미감을 되살린다. 관찰 JSON의 img181.44×453.60은2:5다. 화면에서 기록·듣기·적기·돋보기·일상·거리라는 차이가 보인다. 첫/넷째 사진은 얼굴 전체보다 눈·기기/돋보기를 좁게 잡은 crop이며 모든 얼굴을 자동으로 통째 보존한 결과라고 하지 않는다.

[strip4](../evidence/screens/photo-03.png)는 서로 다른 사진 네 장을 같은4:3 프레임에 놓는다. img282.24×211.68 실측을 읽었고 얼굴·기록 동작·풍경과 각 caption이 분리돼 보였다. 새 zoom 기능이나 같은 인물/장소의 촬영 전후 비교를 암시하지 않는다.

[staggered6](../evidence/screens/photo-05.png)는2+1+1/1+1+2의 엇갈린 두 행으로, 직전의 큰 주역+보조 mosaic와 실제로 다른 구도다. 원고 순서의 사진·caption을 유지하며 마지막 넓은 타일의 인물은 머리·얼굴·안경이 남았다. 세로 portraits의28%를 가로 타일에 복사하지 않고0%로 바꾼 저자 선택이 실제 결과에 연결됐다. 임의 사진의 얼굴 탐지·자동 초점 보장은 없다.

## 혼합 타일과 수량 변화

[전시 seoul12](../evidence/screens/exhibit-05.png)에서는 수치/중립 단위, 사진, 밝은 인용/안내 면, 도형과 문서의 고유 표면, 작은 장식 아이콘, 짧은 순서/목록이 함께 보인다. 네 번째 포스터는 세로로 긴 주역 공간을 유지하고 타일이 모두 같은 어두운 문서 상자로 평준화되지 않았다. 가상 계획은 첫 장/값 라벨과 [동선 점검](../evidence/screens/exhibit-06.png)에 남는다. 포스터·보고서 내부의 작은 영문 메타까지 관객이 읽어야 하는 세부 자료로 승인한 것은 아니다.

별도 [balanced5](../evidence/screens/case-08.png), [balanced8](../evidence/screens/case-09.png), [balanced12](../evidence/screens/case-10.png)를 직접 봤다. 자료 수가 늘어도 빈 타일을 저자에게 채우게 하지 않으며 사진 주역·중립 값·밝은 인용/설명·목록이라는 재료 차이가 남는다. [seoul12](../evidence/screens/case-11.png)와 [recap12](../evidence/screens/case-12.png)의 고정 구도도 다른 주역 면적을 가진 선택지로 성립한다. 제한 없는 모든 길이의 본문을 이 면적에 맞춘다는 판정은 아니다.

## 아이콘월과 색

[전시 builtin12](../evidence/screens/exhibit-07.png)는 중앙 문장을 둘러싸는 분산 배치이며 아이콘과 실제 목록 라벨이 구분된다. [custom3](../evidence/screens/exhibit-08.png)는 위 중앙·아래 양쪽의 세 표식이 중앙 문장을 지지한다. 파랑 눈·보라 질문·주황 메모의 고유색이 어두운 well 위에 남고 자체 제작/비브랜드 성격도 읽힌다. 표준 Markdown 이미지+라벨 경로가 실제 화면으로 연결됐으며 큰 기존 문서를 작은 로고처럼 축소하지 않았다.

[wall5](../evidence/screens/case-13.png), [wall12](../evidence/screens/case-14.png), [wall22](../evidence/screens/case-15.png)를 직접 봤다.5개는 완전한 좌우 대칭 대신 주변에 분산하고,12/22는 위아래·양옆으로 확장한다. 기존 소수 입력의 상단 한 줄만 채우는 모양과 달리 중앙 주역을 위한 균형을 계획한다. 각 라벨·링크와 색의 이름/위치 대응이 있고 색만으로 읽게 하지 않는다. 본문 순서는 발표의 공간적 시선 경로와 구분한다.

Paper8개도 직접 열어 사진의 고유색·프레임·초점, 수치/중립 단위, 역전된 text/quote 면의 글자·작은 장식 아이콘, builtin의 어두운 plate와 custom 고유색을 확인했다. 예로 [Paper seoul12](../evidence/screens/exhibit-05-paper.png), [Paper balanced8](../evidence/screens/bento-8-paper.png), [Paper custom3](../evidence/screens/exhibit-08-paper.png), [Paper wall22](../evidence/screens/wall-22-paper.png)를 대조했다. 모든 장을 모든 색으로 순환시키지 않았고 사진·인용·목록에서는 중립으로 돌아온다. 색은 기존 STAGE 팔레트이며 공식 행사 HEX 규격의 재현 주장과 다르다.

## 정량 색 교정과 최종 경계

위33원시 화면의 배치·서사 검수에서 추가 필수 미감 결함은 발견하지 못했다. 다만 root의 별도 정량 후검수는 Stage wall22의 노란 builtin stroke/밝은 plate 대비2.7975를 발견했다. 이를 눈으로 읽힌다는 판정과 구분해 필수 색 교정으로 인수했다. 엔지니어링 매니저가 기존 color-mix70%를65%로 조정했고 custom 고유색·기하·원고는 보존했다.

이후 [최종 Stage](../evidence/screens/wall-22-stage-final.png)와 [최종 Paper](../evidence/screens/wall-22-paper-final.png)를 각각 직접 다시 열었다.5색 아이콘과 라벨·중앙 메시지·외곽 배치가 유지되며 노랑 선도 식별된다. [최종 색 실측 JSON](../evidence/final-color-browser.json)을 직접 읽어 Stage5색 stroke/plate 최소3.182647(노랑), Paper 최소5.109290·노랑5.561469를 확인했다. 측정 범위의 해당 색 교정을 인수하며 root의 전체 접근성 인증으로 확대하지 않는다. 최종 CSS는 `b513e16205a1f900a16d0dcbc4ae44000d3e561428f0264b500138ba1463f5a9`다.

이번35개 화면에서 추가 필수 미감 교정은 없다. 사진 비율·엇갈린 배치·혼합매체·수량 변화·색/테마·간단 Markdown 연결의 대표 결과를 독립 시각 인수한다. root와 엔지니어링 매니저에게 실제 범위·정량 교정의 완료와 한계를 직접 전달하고 디자인 편집을 종료한다. Git/공개 전달 완료를 이 디자인 인수만으로 주장하지 않는다.

이 문서는 임의 원고의 fit, 모든 사진의 전체 얼굴 보존, 작품 이미지 내부 모든 글자의 독해, 정량 접근성 인증을 보장하지 않는다. 제목/캡션 길이·자료 비율·서사에 맞는 선택이 필요하다.19입력의 모든 정상·실패 장면을 직접 시각 검수했다고 하지 않으며 의도된 실패 입력의 전역 경고를 정상 slide 결함으로 세지 않는다.390px read 전문·alt/링크·contain·저장 호출0, 실제 Markdown 수정/복구, overview/presenter·기존 회귀·공개 전달은 root의 별도 검증 범위다.
