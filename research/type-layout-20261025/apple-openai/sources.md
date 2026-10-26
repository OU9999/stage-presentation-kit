# 실제 발표 장면 관찰 — A

담당 `/root/design_manager/apple_openai_typographer`. 아래는 직접 본 소수 장면의 관찰이다. 실제 회사 경력·내부 규칙·기업 전체의 고정 스타일을 주장하지 않는다. 회사 홈페이지의 타이포를 발표자료 근거로 대체하지 않았다.

| 공식 원본 | 직접 관찰한 화면과 범위 | 이번 시안으로 옮긴 판단 |
| --- | --- | --- |
| [Apple WWDC24 Keynote](https://developer.apple.com/videos/play/wwdc2024/101/), **1:05:50** | 공식 Apple Developer 영상에서 video.currentTime=3950, paused=true, readyState=4를 확인. [직접 캡처](evidence/apple-65m50.png). Powerful/Intuitive/Integrated/Personal/Private 다섯 키워드가 중앙축에서 일정 행간으로 쌓인다. 설명문·각주·이미지가 없는 집중 장면이다. | 단어 밀도가 낮은 선언은 큰 하나의 글 덩어리로 묶는다. 목록이 다섯 줄이라는 이유만으로 긴 본문까지 동일 크기로 만드는 규칙은 도출하지 않는다. |
| 같은 원본 **1:07:15** | video.currentTime=4035, readyState=4. [직접 캡처](evidence/apple-67m15.png). 발표자 옆 큰 Apple Intelligence 한 줄 제목과 넓은 빈 공간. 처음 파일 생성 시 writing-tools라는 가제였으나 실제 장면은 Apple Intelligence 공개 장면이므로 여기서 정확히 정정한다. | 모든 장에 작은 제목+자료 구도를 반복하지 않고, 표지의 메시지는 장 전체 무대를 차지하게 한다. 색·서체 복제는 이번 범위가 아니다. |
| [OpenAI DevDay 2026 Keynote](https://www.youtube.com/watch?v=Fls_onRviPM&t=1550s), **25:50** | 기존 검증 영수증의 공식 OpenAI 채널 `UCXZCJLdBC09xxGZ6gcdrc6A` / currentTime 1550.536을 참조하고 [기존 실제 프레임](../../color-motion-20261024/research/evidence/color/keynote-25m50.png)을 이번에 직접 열어 관찰. 새로 영상을 전편 재생하지 않았다. Computer-use safety stress test 제목·lower is better가 왼쪽, 비교 차트가 오른쪽. 수치는 막대 가까이, 제한 설명은 주장 아래에 있다. | 제목과 비교조건을 하나의 읽기 묶음으로 유지하고 차트는 옆에서 근거가 되게 한다. split은 왼쪽 글의 너비를 숫자 길이에 종속시키지 않는다. |
| 같은 공식 원본 **23:00** | [기존 실제 프레임](../../color-motion-20261024/research/evidence/color/keynote-23m00.png)을 직접 열었다. 큰 상단 제목 아래 범주 아이콘과 라벨 다섯 개가 병렬 정렬된다. | 도식은 상단 문장을 읽은 뒤 관계를 수평으로 따라가게 한다. OpenAI에도 다양한 정보 밀도·정렬이 있으므로 모든 장의 중앙정렬로 일반화하지 않는다. |

Apple의 위 두 장면은 집중 선언만을 뒷받침한다. 이번 조사로 Apple의 긴 설명형 자료·모든 WWDC 세션을 검증한 것은 아니다. OpenAI 장면은 실제 발표장의 카메라 프레임이며 원본 슬라이드 파일의 픽셀 치수·정확한 폰트 크기를 측정한 자료가 아니다. CSS 수치는 아래 시안에서 프로젝트의 1600×900 무대와 한국어 원고를 위해 새로 정했다. 기존 검증 영수증: [keynote-receipts.json](../../color-motion-20261024/research/evidence/color/keynote-receipts.json).
