# 새 DevDay 원본 관측

root가 2026-11-16에 공식 영상 두 편을 Ego TaskSpace4/p1에서 열었다. player의 video_id·제목·OpenAI 채널을 확인하고 실제 Play 입력으로 unstarted thumbnail을 벗어난 뒤 seek했다. 성공한 아래11개 PNG를 root가 각각 직접 열어 발표 내용 화면임을 확인했다. 전체 프레임은 방송의 무대/발표자까지 포함하므로 구도 판단은 실제 발표 스크린에 한정한다. 원근을 공식 CSS px·HEX·font 값으로 환산하지 않는다.

| 원본 / 역할 | 새 실제 프레임 |
| --- | --- |
| [Keynote20:30](https://www.youtube.com/watch?v=Fls_onRviPM&t=1230s), 중앙 선언 | [1230](official-Fls_onRviPM-1230.png) |
| [Keynote21:00](https://www.youtube.com/watch?v=Fls_onRviPM&t=1260s), 큰 이름·짧은 보충 | [1260](official-Fls_onRviPM-1260.png) |
| [Keynote23:00](https://www.youtube.com/watch?v=Fls_onRviPM&t=1380s), 일관된 범주 기호와 색 라벨 | [1380](official-Fls_onRviPM-1380.png) |
| [Keynote24:00](https://www.youtube.com/watch?v=Fls_onRviPM&t=1440s), 원문 정체성과 확대 인용 | [1440](official-Fls_onRviPM-1440.png) |
| [Keynote24:15](https://www.youtube.com/watch?v=Fls_onRviPM&t=1455s), 보라 이름 | [1455](official-Fls_onRviPM-1455.png) |
| [Keynote25:00](https://www.youtube.com/watch?v=Fls_onRviPM&t=1500s), 짧은 주장 옆 실제 서로 다른 작업면 | [1500](official-Fls_onRviPM-1500.png) |
| [Keynote25:50](https://www.youtube.com/watch?v=Fls_onRviPM&t=1550s), 하나의 비교축·선택 막대 강조 | [1550](official-Fls_onRviPM-1550.png) |
| [Keynote47:50](https://www.youtube.com/watch?v=Fls_onRviPM&t=2870s), 다른 크기/표면의 결과물 회수 | [2870](official-Fls_onRviPM-2870.png) |
| [Keynote48:30](https://www.youtube.com/watch?v=Fls_onRviPM&t=2910s), 피사체가 주역인 사진군 | [2910](official-Fls_onRviPM-2910.png) |
| [Codex03:30](https://www.youtube.com/watch?v=XkKdbPhIvbY&t=210s), 열린 관계와 가까운 구체 이름 | [210](official-XkKdbPhIvbY-210.png) |
| [Codex20:00](https://www.youtube.com/watch?v=XkKdbPhIvbY&t=1200s), 두 의미행과 아래 색 강조 | [1200](official-XkKdbPhIvbY-1200.png) |

actual time·decoded video 크기·rect·viewport·제목/채널은 [10프레임 관측](official-frames.json)과 [추가24:00 관측](official-frames-extra.json)에 있다. 시점 seek이며 전편 시청·연속 재생·모션 timing 확인이 아니다. 원본의 캐릭터·로고·별 배경·성과 수치를 프로젝트의 자산/효과로 복제하는 권한으로 쓰지 않는다.

첫 실물 반려 뒤 [Codex01:30](https://www.youtube.com/watch?v=XkKdbPhIvbY&t=90s)도 같은 공간에서 새 seek/실제 내용으로 수집하고 root가 직접 열었다: [프레임](official-XkKdbPhIvbY-90.png)·[식별 관측](official-frames-comparison.json). 준비 단계11개와 구별되는 추가1개이며 이후 비교 보드에 사용한다. 첫 round의 보관01:30 기반 보드/판정은 덮어쓰지 않는다.

첫10개 crop은 unstarted video.top=-756px를 잘못 캡처하여 내용이 없었다. `failed-attempts/official-crop-01/`에 보존했고 유효 프레임/검수 근거에서 제외했다. Play 이후 교정한 현재11개와 구분한다. 진단용 전체 viewport도 품질/발표 근거가 아니다.

[intake-source-qa.json](intake-source-qa.json)은 수정 전1211항의 기술 통과이며 visualApproval=false다. 같은 현재판을 새 검증관 두 명이 DevDay 미감 기준에서 needs-changes로 판정했다. 이 기술 결과는 그 반려를 해제하지 않는다.
