# DevDay 미감 검증관팀 작업 계약

이 문서는 검증관의 책임과 산출물 소유를 정한다. 공통 진행 기록은 루트의 `WORK_LOG.md` 하나이며 root만 갱신한다. 연구 준비는 본편의 시각 승인이 아니다.

## 최신 목표와 기준

사용자는 main-05에서 OpenAI DevDay 발표의 미감이 사라졌다고 재반려했다. 정보량을 줄이거나 검정 배경·큰 글자를 유지한 사실, 과거 358테스트와 80범위 승인은 현재 요구 충족의 증거가 아니다. 공식 내용 화면과 프로젝트의 실제 화면을 역할별로 비교하여 다음 작은 제작 루프에 사용할 독립 판단을 준비한다. 최신 사용자 반려가 과거 내부 판정의 현재 효력을 대체하며 과거 원문은 보존한다.

읽은 정본은 `AGENTS.md`, 현재 `DESIGN.md`, `MARKDOWN-FIRST.md`, `CONFIG.md`, `DESIGN-REVIEW.md`와 `REVIEW_TEAM_BRIEF.md`다. Stage의 검정 바탕·큰 타이포·넓은 여백·한 시각 중심을 유지하면서 자료의 고유색·표면·역할별 밀도와 구도를 보존한다. 모든 장을 검정 위 한 문장으로 환원하지 않는다. 행사 branding·방송 무대·파트너 자료·실제 발표 내용면을 구별한다. 공식 font·정확한 수치·제작 tool의 미확인을 추정으로 메우지 않는다.

## 실제 실행과 소유

작업 루트는 `/Users/ou9999-wdl/Documents/devday-presentation-kit`, 기준 HEAD는 `fca44a239eec36fcd3a96fd4997adc6b03d020cd`다. 이 공유 workspace의 기존 변경을 되돌리거나 커밋하지 않는다. root+manager+A+B의 실제 동시4슬롯이며 하위 팀은 만들지 않는다.

| 담당과 직접 연락 경로 | 실질 초기 작업 | 쓰기 소유 |
| --- | --- | --- |
| root `/root` | 공통 로그, 브라우저, 빌드와 캡처, 최종 통합 | WORK_LOG·제품·빌드·신규 캡처. 검증 준비 인수 전 제품 변경 금지 |
| manager `/root/devday_verification_manager` | 역할 배정, 독립 판정과 직접 반론 확인, 산출물 실물 검증, 준비 판정 | 이 `TEAM.md`, `READY.md` |
| A `/root/devday_verification_manager/art_direction` | 원본/현재의 독립 실물 판정, 시각 역사와 공식 DevDay 아트디렉션 대조 | `review/art-direction*` |
| B `/root/devday_verification_manager/tooling_integrator` | 최신 공식 OSS 조사, 현재 엔진/작성계약의 동질화와 원본의 독립 대조, 초기 작업 이후 취합 | `review/tooling*`, `review/current-verdict*`, `review/acceptance*` |

두 실무는 모두 초기 연구와 판정을 직접 작성한 뒤 서로 관찰·근거·반론·다음 행동을 전달한다. B의 취합은 A의 독립 veto를 평균 점수로 지우는 권한이 아니다. manager는 실제 산출물과 직접 협업 내용을 확인한다. 준비 완료 뒤 모든 writer의 종료를 root에게 보고하고, 다음 시안 검수 때는 제품 제작에 참여하지 않은 검증관을 다시 호출한다.

제품 원고·자산·공통 CSS/runtime·DESIGN·과거 근거는 팀에 읽기전용이다. 브라우저·빌드·캡처는 root만 수행한다. 실무는 새 web 검색/공식 원문과 로컬 `view_image`를 사용하고, 필요한 새 영상 장면은 타임코드와 이유를 root에게 요청한다. 같은 파일의 동시 편집과 팀별 상태 로그는 만들지 않는다.

## 모델·맥락 근거

정확한 모델은 manager/A/B 모두 `gpt-6.1-sol`, effort `xhigh`, fork `none`이다. 두 실무는 이 조합으로 실제 생성했다. `model-snapshot.json`의 2026-11-16T05:49:30Z 공식 최신 release/목록 조회와 현재 runtime catalog를 공유받아 확인했다. 공식 확인 출처는 OpenAI의 GPT-6.1 Sol 출시문과 developers 모델 목록/해당 모델 문서이며, 가용 catalog는 `gpt-6.1-sol`, `gpt-6-astra`, `gpt-6.1-terra`, `gpt-6-sol`, `gpt-6-luna`다. 이 작업 안의 공유 snapshot을 사용하며 영구 기본값으로 삼지 않는다.

반복된 내부 승인과 최신 사용자 반려 사이의 아트디렉션·증거 판단 충돌이 남아 `xhigh`를 선택했다. 연구는 핵심 인계로 분리 가능하여 `none`을 선택했다. 도구 거부 시 조용한 모델 대체·중복 writer 생성 없이 실패와 기존 소유를 root에게 보고한다.

## 인수할 근거와 준비 판정

1. A/B의 실제 원본·현재 화면 열람 경로/범위와 한계를 확인한다. 이전 승인 결론을 초기 판단의 정답으로 사용하지 않는다.
2. 같은 역할의 원본→현재 실패→첫 시안에서 볼 구조 차이를 이어 쓴다. 빈 무대의 문장만, 논문식 미니문서, 동일 카드 도식 반복을 현재 실물의 반례로 살핀다. 역할수·색수·장수·반려횟수 할당량은 만들지 않는다.
3. 서로 다른 역할 3~4장의 첫 시안 요청을 인수하고, 보존할 의미/자료와 원본에서 옮기지 않을 표면을 명시한다. side-by-side·앞뒤 흐름·실제 발표 크기에서 다시 본다.
4. 독립 veto마다 관찰·원본 근거·이해 영향·구조 수정·재확인 범위를 남긴다. 미해결 핵심 반론이 있으면 승인하지 않는다.
5. 신규 제품 입력에는 새 관측·캡처·fingerprint가 필요하다. 현재 입력 회귀와 수동 시각 판정을 분리하며 본편 승인은 명시 범위의 `--require-approved` 성공 뒤에만 표현한다.

원본 48장 텍스트의 실제 보존 경로는 `talks/llm-wiki/assets/archive/48-slide-original/`이며 이미지 근거는 `research/llm-wiki-devday-20261031/evidence/screens/slide-01..48.png`다. brief의 `talks/llm-wiki/archive/`는 존재하지 않아 두 실무에게 이 경로를 직접 정정 전달했다.

새 공식 프레임의 첫 수집은 root가 실제 PNG에서 video rect.y=-688의 잘못된 crop을 확인했다. 최초 unstarted thumbnail의 `style.top=-756px`가 원인이었고, 실제 Play 입력 뒤 player video_id·seek·decoded·전체 viewport 안의 rect를 확인해 재수집했다. 최초 무효 시도는 `evidence/failed-attempts/official-crop-01/`에 보존하며 유효 대조 근거로 쓰지 않는다. root는 재수집한 10개 PNG 전부를 직접 열어 내용 화면을 확인했고 A/B에게 유효 통보를 직접 전달했다. 정본은 `evidence/official-frames.json`이다. 추가 keynote 24:00은 `evidence/official-Fls_onRviPM-1440.png`, `official-frames-extra.json`에 별도로 남겼다. 이들은 새 seek 관찰이며 전편·구간 연속 재생으로 표현하지 않는다. 각 검증관의 실제 재열람 범위는 자기 산출물에 기록한다.
