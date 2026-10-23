# 현장 시각자료 → STAGE 구현 diff

확인일: 2026-10-23. 비교 기준: `740817555e069ad1642616cc5d4e48b013edb303`의 예제와 실제 발표 화면. 판단과 CSS 담당을 렌더러·콘텐츠 담당에서 분리했다. 아래 원본 이미지는 직접 `view_image`로 열어 비교했다. 영상을 이번 담당이 재생했다고 주장하지 않는다.

## 관찰에서 구현으로 옮긴 항목

| 원본에서 확인한 구성 | 기존 STAGE | 변경 | 수용 기준 |
| --- | --- | --- | --- |
| [SF 키노트 48:30](https://www.youtube.com/watch?v=Fls_onRviPM&t=2910s): 짧은 상단 설명 + 같은 높이의 세로 사진 6개. 글로벌 큰 제목·개별 하단 캡션 없음 | 큰 제목·상단 라벨·하단 캡션·출처가 사진과 경쟁. `기록` 사진에서 휴대폰이 잘림 | 제목 없는 portraits에서는 좌우 64px, 사진 비율 2:5, 24px 간격, 8px 라운드. 사진 그룹을 세로 중앙에 두고 불필요한 텍스트는 콘텐츠에서 제거. 행위가 실제 보이는 크롭으로 교체 | 사진 6장 상하단 일치, 상단 설명 기준선 일치. 첫 사진의 휴대폰과 시선이 함께 보임. 색 보정·회색조 없음. 원본의 초광폭 무대 비율을 16:9에 기계적으로 적용하지 않음 |
| [SF 키노트 23:00](https://www.youtube.com/watch?v=Fls_onRviPM&t=1380s): 가운데 제목 + 같은 선 굵기의 의미 있는 SVG형 픽토그램 + 원형과 같은 색 이름. 흰 범주 포함 | 좌측 제목, 운영체제 글꼴에 따라 달라지는 `◉ ↔ ✳ ↗`, 추가 설명 | 중앙 제목, 같은 24 viewBox·1.8px 둥근 선의 독자 SVG 키. 파랑·녹색·주황·보라 외에 중립 흰색도 지원. 기존 symbol 입력 호환 | 실제 SVG가 원 안에서 같은 광학 크기를 가짐. 원·이름 색 대응. 설명 없는 간결한 예제. 문장마다 임의로 색을 붙이지 않음 |
| [서울 현장 보도](https://www.digitaltoday.co.kr/news/articleView.html?idxno=709421), [도쿄 참석자 원본](https://zenn.dev/elith/articles/devday-exchange-tokyo-2026): 사진·UI·수치·제품 시각물의 혼합, 오른쪽 높은 주역 타일 | 고정 4열×2행, 가로 span만 있는 작품 모음 | 별도 `bento` 추가. `seoul`은 12열×6행의 고정 12슬롯: 상단 3개 + 오른쪽 높은 주역, 중간 작은 타일, 하단 4개. `recap`은 6열×3행으로 왼쪽 높은 주역을 가진 독자 프리셋. 원래 `mosaic` 유지 | 12개 입력이 모두 보임. 서로 다른 폭·높이 존재. 수치·사진·UI·원본 SVG가 섞임. 빈칸·겹침 없음. 검정 바탕·얇은 경계·12px 거터·18px 라운드. 숫자는 가상 예시로 명시 |
| [서울신문 현장 사진](https://m.go.seoul.co.kr/news/economy/industry/2026/10/22/20261022500319): 가운데 메시지를 비우고 앱 로고의 밝은 타일이 외곽을 둘러쌈 | 대응 양식 없음; 범주 한 줄만 존재 | 별도 `icon-wall`: 8열×5행, 중앙 6열×3행을 비우는 최대 22개 주변 슬롯. 자체 SVG 또는 사용자가 가진 이미지 지원 | 가운데 문장과 아이콘 겹침 없음. 외곽 타일 크기·간격 일치. 이미지 로고는 원래 색 유지. 예제는 독자 의미 아이콘이며 실제 협력사·브랜드 목록으로 보이게 하지 않음 |
| 같은 서울신문의 파랑·주황 두 수치 사진: 같은 위계의 두 주장, 각각의 흰 라벨 | 수치 한 개의 `metric`만 있음 | 별도 `metric-pair`: 두 컬러 수치와 두 라벨을 같은 기준선에 배치 | 두 값의 위계·기준선 동일. 색이 비교 대상을 구분. 불필요한 카드 외곽선·표 없음. 두 값 모두 가상 수치라는 출처 표시 |
| [SF 키노트 25:00](https://www.youtube.com/watch?v=Fls_onRviPM&t=1500s): 주장 옆 문서·UI 등 결과물 2×2 | 구조는 적용됐지만 부제·라벨·출처 층이 많고 가로 포스터에 큰 레터박스 | 기존 `results`를 유지하면서 콘텐츠를 줄이고 비율이 맞는 가상 UI·문서로 근거의 면적 확보 | 미디어 안 글자·핵심 결과가 잘리지 않음. 주장과 결과 4개가 바로 읽힘. 실제 업무 성과로 오인할 회사명·수치 없음 |

`recap`, `seoul`, 패딩·거터·폰트 크기·라운드 수치는 **STAGE의 1600×900 구현 판단**이다. 원근·노출이 섞인 사진에서 OpenAI 공식 CSS·HEX·px 값을 추출했다고 표현하지 않는다. `seoul`이라는 이름은 확인한 배치 출처를 가리키며 서울에만 쓰인 구성이라는 뜻이 아니다. 도쿄 현장 사진에서도 동일한 계열의 화면을 확인했다.

## 실제로 열어 본 증거

- SF: `evidence/reaudit-devday/portraits-4830.png`, `icons-2300.png`, `collage-4750.png`.
- 이전 STAGE: `evidence/reaudit-current/photos.png`, `icons.png`, `mosaic.png`.
- 서울: `evidence/seoul-devday/seoul-presentation-seoulnews.webp`, `seoul-kim-openai.jpeg`, `seoul-kim-yonhap.webp`.
- 도쿄: `evidence/completed-cities/tokyo-keynote-bento.jpg`, `tokyo-manager-icons.jpg`, `tokyo-ranking-icons.jpg`.
- 외부 구분: `evidence/reaudit-external/figma-18m01-live.png`. 기존 4×2 작품 모음과 가까운 것은 Figma 제품 데모다. 이 양식을 DevDay 현장 bento의 충실한 복제라고 묶지 않는다.

원문 날짜·행사일·credit·SHA는 [서울 조사](seoul-devday-visual-research-20261023.md), [완료 도시 조사](completed-cities-visual-research-20261023.md), [DevDay 재검토](devday-visual-reaudit-20261023.md), [외부 출처 구분](visual-origin-reaudit-20261023.md)을 따른다. 이번 담당이 외부 페이지의 날짜를 독립 재검색했다고 주장하지 않는다.

## 역할·자산·재사용 계약

- 렌더러 담당: 새 layout·입력 검증·Markdown 변환·프리셋 슬롯·SVG key 매핑.
- 디자인 담당: `styles.css`, `assets/stage/`, 이 diff 문서.
- 매니저: 예제 내용·사용법·미리보기·실제 브라우저 및 PDF 검수·저장소 전달.

새 레이아웃은 기존 렌더러의 수정 가능한 텍스트 필드와 `media()` 경로를 재사용한다. `bento`는 임의 좌표 엔진을 추가하지 않고 프리셋을 선택한다. 슬라이드 코드 생성이나 온라인 AI 호출이 필요하지 않다. 모바일 읽기에서는 bento를 입력 순서로 한 열에 놓고, 아이콘월은 문장 다음 4열 아이콘으로 풀어 쓴다. 인쇄와 발표자 창은 원래 16:9 구성이다. 기존 16개 레이아웃과 감소된 모션 설정을 유지한다.

독자 자산:

- `assets/stage/shape-study.svg`: 컬러 입체 도형. 720×960.
- `assets/stage/work-panel.svg`: 가상 프로젝트 UI. 960×720.
- `assets/stage/signal-study.svg`: 가상 제품의 유리 고리 시각물. 720×1080.

세 SVG는 직접 작성했으며 title/description과 sample/fictional 표식을 포함한다. 외부 사진·원래 앱 로고·캐릭터를 예제 자산으로 복사하지 않았다. 연구용 현장 사진과 예제 자산을 구분한다.

## 확인 상태와 한계

- XML 파싱과 Quick Look 렌더로 세 SVG를 확인했다. Quick Look 썸네일은 정사각 크롭이므로 전체 화면 검증으로 계산하지 않는다.
- `git diff --check -- styles.css` 통과. 매니저가 실제 브라우저에서 캡처한 `/tmp/stage-cities-implementation-qa-20261023/new-2.png`부터 `new-6.png`까지 직접 열어 비교했다. 사진의 상단 설명·여섯 사진 정렬·라운드, SVG 범주의 동일 선과 흰 범주, bento 12개 노출·오른쪽 높은 주역·다른 타일 높이, 아이콘월 22개와 중앙 여백, 두 수치 기준선·색 대응을 확인했다. 이 담당이 브라우저를 직접 조작한 검수라고 표현하지 않는다.
- 첫 사진의 75% 초점은 휴대폰이 나타나지만 눈이 왼쪽 경계에 걸렸다. 원본 1600×1067에서 2:5 프레임의 가로 크롭 폭은 약 427px이다. 초점 68%로 옮긴 최종 `devday-compositions-2.png`를 직접 확인했다. 눈·코·입의 일부와 휴대폰 상단을 함께 담아 인물의 시선과 기록 행위가 이전보다 명확하다. 사진 전체를 보여 주는 구성은 아니며, 의도한 세로 크롭이다.
- 상단 도형 타일을 `cover`, `50% 58%`로 바꾼 최종 `devday-compositions-4.png`를 직접 확인했다. 도형이 타일 면을 채우고 문서/UI는 `contain`을 유지한다. 조형물의 끝 일부와 SVG의 부수적인 상·하단 글자는 의도적으로 잘린다. 가상 예시·원작 자산 표시는 슬라이드 출처와 자산 메타데이터에 남는다.
- **최종 시각 수용: PASS.** 보정된 사진·bento, PDF 7장 전체(`/tmp/stage-cities-implementation-qa-20261023/pdf/new-1.png`–`new-7.png`), 390px 모바일 전체 읽기 캡처와 [모바일 아이콘월](evidence/implementation/mobile-icons.png)을 직접 열어 확인했다. PDF에서 6열 사진, SVG 범주, 오른쪽 높은 bento, 22개 아이콘월, 두 수치가 16:9 구성으로 유지된다. 모바일은 사진·bento를 입력 순서의 한 열, 아이콘월을 메시지 다음 4열로 풀어 쓴다. 긴 세로 스크롤은 읽기 모드의 의도이며 발표용 화면을 그대로 축소한 결과가 아니다. 추가 CSS 보정은 필요하지 않다.
- 매니저의 실제 키보드 탐색 결과인 `desktop.json`을 읽어 6개 덱·55장, 경고 0·미디어 로드 실패 0·오류 0을 확인했다. `mobile-offline.json`에서 6개 덱의 390px `scrollWidth === width`, 깨진 이미지 0, bento 입력 순서 0–11, 아이콘월 22개·4열, 오프라인 외부 리소스 요청 0을 확인했다. 브라우저 조작·Network/Runtime 수집은 매니저가 수행했고, 이 담당은 결과 파일과 화면을 독립 대조했다. 전체 키보드·네트워크 검증을 이 담당이 다시 실행했다고 주장하지 않는다.

최종 비교용 화면은 [사진](evidence/implementation/photos.png), [SVG 범주](evidence/implementation/icons.png), [혼합 bento](evidence/implementation/bento.png), [아이콘월](evidence/implementation/icon-wall.png), [두 수치](evidence/implementation/metric-pair.png)에 보존한다.

다음 경계는 PASS 판정 후에도 유지한다.
- 새 스톡 사진 촬영 시리즈를 제작하지 않았다. 사진 크롭·정보 위계를 개선하는 작업이며, 원본 6명의 조명·배경·피사체 크기까지 재현했다는 판정은 하지 않는다.
- 도쿄 T3의 관계도 노드, T4의 작은 좌상단 라인 아이콘과 하단 라벨 카드는 다른 아이콘 역할의 근거다. 이번 범주 한 줄·아이콘월을 그 관계도·카드 양식의 복제라고 설명하지 않는다. 전용 관계도·중립 카드 레이아웃은 이번 변경에 포함하지 않는다.
- 벵갈루루 B2의 3열 수치는 발표자·디자인 소속이 미확인이다. 이번 2열 수치의 결정적 출처는 서울이며 B2를 OpenAI 공식 제작 규칙이라고 일반화하지 않는다.
- 정지 현장 사진으로 전환·애니메이션·발표 전체의 구성 규칙을 확인하지 않았다.
