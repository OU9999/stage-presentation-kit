# 본편 독립 검수 인수

검증 전담 manager와 A/B는 제작에 참여하지 않았다. 최신 사용자 목표는 OpenAI DevDay 원본의 미감 복원이다. 검정·큰 타이포만으로 판정하거나 이전 시안/기술 승인으로 본편을 승인하지 않는다. WORK_LOG.md의 현재 지침과 DESIGN.md(0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0), review/acceptance-final.md, READY/TEAM의 원본 연구와 의미 보존 기준이 정본이다.

root가 지정하는 새 main round의 실제 source-snapshot/manifest와 그20개별 PNG를 대상으로 한다. 리뷰 초안에서는 root·제작 결론과 qa.json/기술 수치를 읽기 전에 실제 원본/현재 화면을 읽는다. 이전 pilot 판정은 현 본편 승인으로 승계하지 않는다. 초안을 각자 저장한 뒤 직접 반론을 교환한다. manager가 양쪽 초기 동결 시각/sha 확인 뒤 root에게 통보하면 root가 자기 관찰과 기술 검사를 제공한다.

A art_direction은 발표1920×1080와1280×720의 전40 PNG를 실제 읽어 같은 역할 공식 프레임·이전 반려본과 대조하고 전체20장 흐름을 판정한다. B tooling_integrator는 native읽기1440×1000와390×844 전40 PNG와 현재 native 지원 해설을 실제 읽는다. B도 발표 전체보드와 변경3/5/6/7/10/13/15의 실제 발표 개별을 교차 확인하고 A는 변경 native 인용/선택 이유/지원 글을 교차 확인한다. B는 자신의 독립 초기 시각 판단을 먼저 마친 뒤 A 결과의 기계적 취합도 맡는다. manager는 범위별20행의 원문 판정을 검증한다.

필수 질문: 주역 자료/변화/관계가 실제로 읽히는가; 기본 tone이 아닌 목적/판단/재사용의 무게를 갖는가; 자료 표면이 진짜 원본 캡처인 척하지 않는가; 3 선택 이유와15 원자료 구절의 지위가 분명한가; 5→6은 같은 계획에서 무엇이 유지/변경되는지 보이는가; 7 세 무방향 관계와13 한 실제 활동 행의 읽기 대상이 명확한가; 14의 읽기/고치기/다시쓰기 recap은 앞뒤 구체 자료 뒤에 유효한가 또는 구체 후속질문 사례가 필요한가. 유효 동등 범주12/18·짧은 메시지는 다양성 수량 때문에 폐기하지 않는다. 순수출처caption과 필수조건/목적/관계 설명을 구분하며 작은 메타로 숨긴 본문을 승인하지 않는다.

core veto는 평균/기술 pass로 해제하지 않는다. 반려 시 현재 문제·남겨야 할 의미·구체 수정·재관측 범위를 직접 인계한다. 제안만 된 교정은 승인으로 바꾸지 않는다. 두 초기 동결 뒤 직접 협의/반론과 manager 판정에서 미해결 핵심 반려를 별도 명시한다. 파일은 review/<main-round>/ 아래 담당별 *.initial.md / *.final.md, 두 발표폭과 두 읽기폭의 *.reviews.json, manager-summary.md를 작성한다. 원본 review/기존 round/제품/WORK_LOG/Git/브라우저는 수정하지 않는다.

JSON은 기존 review/round-02/*.reviews.json 형식을 참고하되 main 범위마다 실제20 slides를 명시한다. mode는 presentation-stage-only 또는 read-slide-crop, viewport는 manifest 실제 값(DPR1), reviewer는 실제 담당자, status/reason은 작성자 판단 원문이다. supportingEvidence는 직접 읽은 해당 PNG/원본/자료와 현재 sha를 지목한다. 승인 수 할당량은 없다. 최종 CLI/빌드/현재 해시와 기록 조립은 root 단독이다.

완료는 실제 팀원 A/B manager FINAL·전원 writer 종료와 각40 실독+교차확인+독립초기/반론/최종 기록의 대응이다. 사용자 미감/다른OS/실발표기기는 검증하지 않은 범위다.
