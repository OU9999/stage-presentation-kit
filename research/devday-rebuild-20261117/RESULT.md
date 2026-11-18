# LLM Wiki · DevDay 시각 재제작

현재 로컬 본편은 11장입니다. 발표 화면은 구두 설명에 맞춰 편집했고, 사례 전문·근거·예제는 읽기와 공개 해설에서 해당 절로 연결했습니다. 35분 발표와 5분 질의 진행은 현재 대본에 반영했습니다. [발표](../../presentations/llm-wiki/index.html) · [읽기](../../presentations/llm-wiki/read.html) · [대본](../../talks/llm-wiki/materials/speaker-script.md) · [원본과 현재 화면 대조](index.html)

## 편집 결정

- 큰 선언, 두 작업창의 비교, 어두운 기사와 밝은 인용, 네 작업 결과물로 화면의 주역과 자료 밀도를 바꿉니다. 비교의 창과 라벨은 짝을 유지하고 작은 글자가 있는 기사와 결과물에는 정확한 전문 경로를 뒀습니다.
- 사람과 AI의 기여를 한 준비 기록으로 모으고, 같은 계획의 전후를 같은 축에 배치했습니다. 세 문서의 관계는 짧은 연결선으로 읽고 현재 계획이 먼저 잡히도록 조판했습니다.
- 최종 교정에서 이름의 크기·정의 간격과 마지막 세 장의 간격을 조정했습니다. 관계도의 오른쪽 연결을 한 세로축에 맞췄습니다. 읽기에서는 기사에 가상 사례임을 표시하고, 모바일 결과물의 전문을 첫 자료 앞에 배치했습니다.
- 다른 발표에서도 작업창 비교, 자료와 인용, 공동 기록, 동일 대상의 갱신에 공통 Markdown 조판을 쓸 수 있습니다. [작성법](../../MARKDOWN-FIRST.md) · [구성 값](../../CONFIG.md)

## 현재 판 검수

제작·검증 매니저와 실무자를 GPT‑6.2 Sol high로 배정했습니다. 검증팀은 제작에 참여하지 않았고, 각자 현재 캡처와 공식 DevDay 영상 프레임을 대조한 뒤 초기 판정을 동결했습니다. 앞선 main-06과 main-08의 반려는 각각 보존했습니다. main-08에서 교정이 필요했던 11개 범위를 수정한 뒤 변경 장, 인접 흐름, 공유 관계도의 읽기 화면을 다시 확인했습니다. [공식 영상 프레임](../devday-fidelity-20261116/evidence/README.md) · [main-06 검수](review/main-06/MANAGER.md) · [main-08 검수](review/main-08/MANAGER.md) · [main-10 최종 검수](review/main-10/MANAGER.md)

| 화면 | 등록된 시각 승인 | 현재 실측 검사 | 실제 전체 흐름 |
| --- | ---: | ---: | --- |
| 발표 1920×1080 | 11/11 | 2281/2281 | [1–8장](main-10/present-1920/contact-01-08.jpg) · [9–11장](main-10/present-1920/contact-09-11.jpg) |
| 발표 1280×720 | 11/11 | 2281/2281 | [1–8장](main-10/present-1280/contact-01-08.jpg) · [9–11장](main-10/present-1280/contact-09-11.jpg) |
| 읽기 1440×1000 | 11/11 | 2141/2141 | [1–8장](main-10/read-1440/contact-01-08.jpg) · [9–11장](main-10/read-1440/contact-09-11.jpg) |
| 읽기 390×844 | 11/11 | 2143/2143 | [1–8장](main-10/read-390/contact-01-08.jpg) · [9–11장](main-10/read-390/contact-09-11.jpg) |

원고 SHA-256은 `4d4ade76b7d83c0ac938bdb34f81425cb5db8b74d37d2f934790cd0fceb19c2e`입니다. 네 범위의 `--require-approved`가 각각 종료 코드 0을 반환했습니다. 승인 범위는 해당 입력의 로컬 정지 화면입니다. [105개 렌더 입력](main-10/source-snapshot.json) · [시각 승인 명령 결과](main-10/approval-cli.json) · [공연장·다른 기기·모션 범위](review/main-10/MANAGER.md)

사이트 생성·검증과 전체 테스트 375개가 통과했습니다. 네 화면의 실제 관측에서 회귀와 필수 증거 누락은 0건입니다. 양 읽기 화면에서 모든 장의 전문 링크에 22회 도착했고, 4장의 Tab·Enter와 발표 이동 키 및 전체 보기를 확인했습니다. [실제 링크·키보드 기록](main-10/support-navigation.json) · [비교 화면 동작](main-10/comparison-browser.json)
