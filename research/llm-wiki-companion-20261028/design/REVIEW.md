# 발표·자료 조판 인수 검수

2026-10-28 · 디자인 manager `/root/companion_design_manager` · 기준 `main 4c2e2fa`.

## 실제 판정과 구현

두 실무자가 기존 native 비교 4화면과 이전 발표 12장 PNG를 직접 열고 각각 초안을 만들었다. manager도 `reference-{7,11,14,19}.png`와 이전 3·4·6·10·11장을 직접 확인했다. 이전 6장의 질문 한 문장에 배정한 거대한 밝은 면, 10장의 작은 관계도와 반복 하단 설명, 11장의 분산된 비교가 핵심 내용의 위계를 약하게 했다. 기존의 열린 검은 면·구분선·큰 유형·역할을 가진 색을 되살리는 쪽으로 판정했다.

- 발표를 14장으로 재작성했다. 실제 RAG·LoRA·LLM Wiki 읽기 → 개념 → 동일 질문의 비교 → 질문 답 저장 → 오류 교정 → index/log → 정책 선택 → 운영 부담으로 이어진다. 일정 변경은 발표에서 빼고 학습서의 보조 예제로 보존했다.
- `speaker-script.md`의 14개 장과 연속 시간표를 1~13장 1,080초, 14장 120초로 맞췄다. 발화·전환 인용문은 1~13장 약 6,404자다. 이는 배분안과 문자 수이며 실제 낭독 측정이 아니다.
- SVG 3개를 1200×450, 표시 글자 32~48px, 열린 면과 큰 관계로 교체했다. 원자료/위키 옆의 schema, 근거→개념→비교→질문, 일반화 삭제→원문 대조→범위 교정이 각각 한 그림의 주역이다.
- `templates/materials.css`를 실제 구현했다. 18px 본문·800px 읽기 너비, 문서 목록·긴 목차, 코드와 표의 자체 스크롤, 링크·키보드 초점·인쇄를 처리한다. 자료 본문은 밝은 종이색과 구분선으로 조판하며 카드 목록으로 만들지 않았다.

콘텐츠 manager와 직접 인수 회의 후 콘텐츠 writer 전원의 종료를 확인하고 작업했다. 학습서·목차의 본문은 동일하게 보존했고, 참고 자료의 이전 발표 설명/장번호와 실습의 발표 복귀 링크만 최소 교정했다. 실제 원문 근거와 가상의 학습자·파일·질문·수정·선택을 구분하며 성능 우위나 절감 효과를 새로 주장하지 않았다.

## 직접 교차 검토와 교정

A는 원고/대본을 실질 제작하고 B의 SVG/CSS/template를 직접 검토해 취합했다. B도 원고/대본을 읽어 가로 도식을 ‘위/아래’로 설명하던 문구를 읽는 방향으로 교정하게 했다. manager가 발견한 재저장 화살표와 설명의 의미 차이는 ‘질문 페이지에 답 저장, 개념·비교에 연결’로 바로잡았다. manager는 최종 SVG와 동일 revision의 임시 PNG 3개를 직접 열어 큰 라벨·관계·겹침을 확인했다.

원고의 editorial 마지막 그룹에 공통 주석이 몰리는 문제를 발견해 각 열의 역할에 맞게 분배했다. 13장의 icon-wall 라벨이 공통 CSS에서 17px인 점을 A/B가 함께 발견해 열린 3단 실행 구성으로 바꿨다.

root가 만든 실제 자료 prototype의 desktop/mobile PNG를 manager도 직접 열었다. desktop은 읽기 위계가 뚜렷했다. 초기 mobile에서는 탐색이 약 600px를 차지했으므로 root가 HTML에 native `details.material-mobile-nav`를 추가하고 B가 CSS를 대응했다. 개선 PNG에서는 제목과 첫 본문이 첫 화면에 보인다. root의 실제 계측은 390px 가로 넘침 0, H1 top 264px·본문 top 437px, summary의 Enter 열기/닫기와 열린 메뉴의 단일 내부 스크롤 통과다. 이는 prototype 조판 검수이며 최종 생성물의 링크 완결 검수와 구분한다.

root가 새 6장의 실제 prototype에서 동등 3열의 작은 본문을 지적했고 manager도 `draft-6.png`와 CSS를 직접 대조했다. 원문 구조를 이미 정리한 뒤에도 3그룹 규칙이 primary 유무와 관계없이 22px/28px로 축소했다. root의 명시적 범위 확장에 따라 B가 `blocks.css`만 추가 소유해 교정했다. manager가 실제 diff를 검토했다. 기존 primary 보조 열은 22px/28px로 유지하고 primary 없는 동등 3열만 본문 32px·H2 40px·행간 1.5로 바꿨다. 색·열 배치·숫자 크기를 보존했다. 읽기의 `#slideStage` 규칙이 18px/26px로 우선하는 것도 코드에서 확인했다. 최종 화면과 회귀는 root가 검사한다.

## 확인한 범위와 인계

manager가 최종 원고를 독립 파싱했다. 14장, planner 경고 0, message 2 / media 3 / editorial 7 / quote 1 / closing 1이다. 자료 5개의 로컬 참조 62개에 대해 파일·한글 fragment·발표 장 범위 누락 0을 확인했다. A는 원고를 포함한 로컬 참조 77개 누락 0도 확인했다. 경고 0을 최종 미감 합격으로 판정하지 않는다.

SVG 3개는 XML·title/desc/aria·외부 실행 자원 없음과 표시 글자 크기를 확인했다. CSS는 실제 template DOM, 모바일 details, focus/print 선택자와 대응한다. root가 code/pre의 키보드 스크롤을 위해 helper에 tabindex/region/label을 추가했으며 B의 CSS와 충돌하지 않는다.

A와 B는 모두 final 및 편집 종료했다. `blocks.css` 소유권은 root, 자료 CSS와 root helper/template는 후속 엔지니어링 A에 인계한다. 원고/대본/도식은 종료 상태로 인계한다. 자료 빌더 통합, 전체 발표·읽기·모바일·발표자 화면, 4·6·11·13장의 확대 조판과 기존 primary 보조 열, 전체 회귀·최종 생성물·공개 배포 검수는 아직 후속 범위다.

| 최종 소스 | SHA-256 |
| --- | --- |
| `talks/llm-wiki/slides.md` | `4b0484e0763d24d3811af1b14e69dc34571a9e1ca4b33e03e7ec09b2f1edc83c` |
| `materials/speaker-script.md` | `724aa9c3a8098577bc660a213a5aa4a920d6abc390e47fc03cbaabd11154e9db` |
| `templates/materials.css` | `1b61ac3b3119aa9aae8a080ea24e63eb0080abf0ce5749d469e2cf0977a0b702` |
| `blocks.css` | `53e410e9bb90c436482208f7e721a8fd2d3e4dc45bbda4b6d5c75c2753d4d355` |
| `assets/wiki-layers.svg` | `9de04be0b94dbd0b736c6643068a5b09baba791ba960f5fb7f3215528fdd9dd8` |
| `assets/knowledge-map.svg` | `07411af0788bfcd8c06ff8c2b0fc026a16659892762aefb568248ee6b40cd109` |
| `assets/change-trace.svg` | `5efc5a198e7f6479ebced5f155635eeeefce5f409a8881ce28afcdd4b87b417f` |
