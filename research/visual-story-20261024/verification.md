# 숫자·그래프·도식 예제 통합 검증

2026-10-24 · 총괄 `/root`

[12장 발표](../../examples/visual-story/index.html) · [전체 미리보기](../../examples/previews/visual-story-overview.png) · [PDF](../../output/pdf/visual-story.pdf) · [읽을 수 있는 표](../../examples/visual-story/data.html) · [수정 안내](../../examples/visual-story/README.md)

## 완성한 자료

가상의 첫 경험 개선 프로젝트를 **12장·아홉 가지 시각 표현**으로 구성했다. 큰 KPI, 퍼널, 12주 추세, 인터뷰 구성비, 전환율 비교 막대, 여정 흐름도, 우선순위 매트릭스, 간트형 일정, 투입 히트맵을 하나의 이야기로 연결한다. 마지막 두 장은 다음 검증과 데이터 표로 이어진다.

입력은 `examples/visual-story/data.json` 하나다. 원본 정수에서 수치와 문구·SVG 8개·생성 Markdown·실제 HTML 표 10개·실행 파일을 함께 생성한다. 생성한 Markdown과 그림을 수동 원본으로 안내하지 않는다. 기존 다섯 예제의 Markdown 작성 방식은 유지한다.

```sh
node scripts/build-visual-story.cjs
node scripts/build-examples.cjs
```

두 번째 명령으로 전체 **6개 예제·47장**을 갱신한다. PDF·PNG는 최종 렌더에서 별도로 생성한다.

SVG 참조에도 최종 그림 바이트의 SHA 버전을 붙여, 데이터를 다시 생성했을 때 바뀐 그림을 새 URL로 읽도록 했다. 동일 입력은 같은 주소를 만들고 바뀌지 않은 그림의 주소는 유지한다.

## 총괄의 실제 확인

| 검사 | 결과 | 근거 |
| --- | --- | --- |
| 자동 회귀 | 기존 168 + 데이터/생성 경계 13 = **181개 통과**, 실패·취소·skip 0 | `node --test tests/*.test.cjs`, [새 회귀](../../tests/visual-story.test.cjs) |
| 실제 발표 | 12장 순차 탐색, native 필드의 본문 경계 이탈 0·이미지 실패 0 | [최종 브라우저 JSON](evidence/final-browser.json) |
| SVG | 8개 모두 실제 브라우저 XML 파싱·title/desc, 텍스트 183개의 viewBox 이탈 0 | [최종 브라우저 JSON](evidence/final-browser.json) |
| 모바일 읽기 | 390px 화면·문서 폭 390px, 12장 모두 표시·효과 0, 상단 표 링크에서 실제 데이터 문서 진입 | [읽기 화면](evidence/mobile-read.png), [JSON](evidence/final-browser.json) |
| 실제 데이터 표 | 표·caption 각 10개, 10앵커, scope 누락 0, 셀 16px·문서 넘침 0, 키보드 가로 스크롤 | [표 화면](evidence/mobile-data.png), [JSON](evidence/final-browser.json) |
| 수치 연결 | 기간별 420/1200=35%, 546/1200=45.5%, 660/1200=55%, 차이 +20%p·투입 18인·주 | [브라우저의 실제 표 값](evidence/final-browser.json), [리서치 독립 검수](research/final-product-review.md) |
| 갤러리 | 6개 카드·47장 안내, 미리보기 로딩 실패 0·새 예제 3장 실제 이동 | [최종 브라우저 JSON](evidence/final-browser.json) |
| 오프라인·출력 | file://에서 12장·8SVG 로드 후 1600×900 캡처, 인쇄 효과 0·12장 표시, 실제 PDF 12페이지 | [출력 조건](evidence/artifact-render.json), [PDF 페이지 검사](evidence/pdf-info.json) |
| 인쇄 시각 확인 | 대표 전환율 비교 장의 제목·막대·축·수치·설명이 모두 표시됨 | [PDF 6장 렌더](evidence/pdf-step-rates.png) |
| 기존 동작 보존 | 공통 런타임·루트·기존 다섯 원고/생성 결과 20파일 SHA 불변 | [기준 SHA](engineering/evidence/baseline-hashes.json), [최종 정적 검사](evidence/static-checks.json) |

최종 정적 검사는 로컬 링크 293개 누락 0, JSON 18개 파싱, 공통/내용 query 28개·그림 query 8개·갤러리 미리보기 query 6개의 실제 SHA 일치를 확인했다. SVG 버전 보완 전 팀 JSON의 값도 보존했고 총괄이 최종 해시·그림 참조를 별도로 갱신했음을 기록했다.

정확한 작은 SVG 라벨을 390px에서 모두 읽을 수 있다고 주장하지 않는다. native 메시지와 짧은 alt, 실제 HTML 표의 진입·내용·키보드 스크롤을 함께 확인했다. 모션은 기존 fade/rise/stagger를 사용하며 SVG 내부 전용 엔진을 추가하지 않았다.

엔지니어링 매니저는 별도 임시 `file://` 복사본에서 12장·그림 8개·모바일·실제 편집→다운로드→재로딩과 원본 보존을 독립 확인했다. native 문구 내보내기는 발표용 복사본이고 JSON·SVG·표로 역반영되지 않는다. [구현·독립 검수](engineering/implementation.md)에 해당 증거와 지원 범위를 기록했다. 총괄은 실제 예제의 표 진입·로컬 자원·출력을 따로 검증했다.

## 교차 검수에서 바로잡은 것

- 공통 출처 helper가 모든 그림에 기준·후반 비교 기간을 붙이던 오류를 제거했다. 인터뷰·12주 추세·계획 자료 각각의 기간과 종류는 해당 메시지·SVG·표에서 유지한다. 회귀를 추가해 실패 후 통과를 확인했다.
- 최초 전체보기와 닫는 장의 PNG가 일부 비어 있어 전달 대상에서 제외했다. 개별 장은 효과 종료·제목/장 opacity 1과 렌더 프레임을 기다려 캡처했고, 모음은 검증한 PNG를 독립 HTML 격자로 배치해 다시 만들었다. [전체 모음의 실제 HTML](evidence/overview-sheet.html), [네 그림 모음의 실제 HTML](evidence/preview-sheet.html).
- 로컬 HTTP에서 한 SVG 요청이 중단되는 현상을 확인해 이번 세션이 소유한 미리보기 서버만 같은 포트의 Node 정적 서버로 교체했다. 최종 HTTP 검사에서는 이미지 실패·HTTP 오류 0이었다. 제품의 공통 런타임이나 오프라인 재생 조건은 변경하지 않았다.

리서치·디자인 매니저가 최종 수치·실제 표·출처와 12장 PNG·SVG를 직접 대조했다. [리서치 최종 결과](research/final-product-review.md), [디자인 최종 결과](design/final-product-review.md). 최초의 출력 누락을 완료로 처리하지 않고 재생성 후 두 매니저가 다시 확인했다.

## 범위

수치와 기획은 설명용 가상 데이터이며 실제 회사의 성과·통계적 유의성·인과 효과가 아니다. 현재 macOS Chromium·390px 에뮬레이션과 대표 PDF 장의 검증이다. 물리 기기·프로젝터·전체 보조기기·다른 브라우저의 전면 검증을 뜻하지 않는다. 제작 검증 단계에서는 로컬 변경으로 보관했다. 이후 커밋 상태와 사용자 피드백·담당자·후속 지시는 루트 `WORK_LOG.md`의 최신 기록을 따른다.
