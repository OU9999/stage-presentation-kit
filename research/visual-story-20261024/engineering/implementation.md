# 숫자·그래프·도식 예제 구현

2026-10-24 · 작성·통합 취합 `/root/engineering_manager/authoring_engineer`

## 실제 결과

[새 발표](../../../examples/visual-story/index.html)는 가상 첫 경험 개선 프로젝트를 12장으로 설명한다. native KPI와 퍼널·12주 추세·인터뷰 구성비·직전 단계 비율·여정 관계·우선순위 매트릭스·일정·투입 히트맵의 아홉 가지 표현을 연결했다. 마지막에는 아직 수집하지 않은 후속 검증 계획과 [실제 HTML 데이터 표](../../../examples/visual-story/data.html)로 이어진다.

기존 19개 layout과 기존 모션을 그대로 사용했다. 표지·닫는 장은 rise, 다음 검증 단계는 stagger, KPI와 여덟 SVG는 fade다. 공통 app.js·styles.css·deck-model.js·루트 원고와 기존 다섯 예제를 바꾸지 않았다. 새 패키지·외부 폰트·CDN·네트워크 요청·SVG 내부 애니메이션 엔진을 추가하지 않았다.

## 하나의 수정 원본

실제 제품의 수정 원본은 [data.json](../../../examples/visual-story/data.json) 하나다. 연구 JSON은 초기 스냅샷이며 제품 생성 중 참조하지 않는다. 초기 제품 입력의 SHA와 스냅샷 일치는 [링크·입력 근거](evidence/authoring-links.json)에 기록했다.

```sh
node scripts/build-visual-story.cjs
node scripts/build-examples.cjs
```

첫 명령은 데이터 예제 하나, 둘째 명령은 기존 다섯 Markdown 예제와 데이터 예제를 함께 생성한다. 원본 정수에서 파생 수치를 계산해 숫자 포함 slides.md·여덟 SVG·data.html·content.js·index.html을 함께 갱신한다. 데이터 예제의 Markdown은 생성물이므로 손편집 원본으로 안내하지 않는다. 생성 content.js 첫 주석·HTML 도움말·예제 README·갤러리·전체 작성 가이드에 같은 차이를 명시했다.

브라우저의 native 문구 편집과 content.js 내보내기는 발표용 복사본이며 입력 JSON·SVG·표·생성 Markdown으로 역반영되지 않는다. 숫자·관계의 지속적인 수정은 JSON에서 한다. [예제 작성 가이드](../../../examples/visual-story/README.md)는 입력 구조·0의 처리·동일 좌표 제약·별도 출력과 오프라인 공유 범위를 설명한다.

## 실무 분담과 연결

| 실제 담당 | 작성·인수 범위 |
| --- | --- |
| `/root/engineering_manager/visualization_engineer` | data.cjs의 입력 검증·파생 계산·로컬 SVG 검사, 디자인의 theme/charts/diagrams 세 모듈 인수·경계 보완, 새 회귀 테스트 13개 |
| `/root/engineering_manager/authoring_engineer` | authoring/tables 모듈과 단일 build orchestrator, 제품 입력·12장 원고·표·생성 결과, build-examples 연결·갤러리·작성 문서와 이 보고서 취합 |

두 실무자는 validateData/deriveData와 buildVisualStory API·파일 소유권을 직접 합의했다. 시각화 담당이 모듈·테스트 편집 종료와 SHA를 전달한 뒤 작성 담당 한 명만 제품·전체 예제의 최종 생성을 실행했다.

`buildVisualStory(inputPath?, outputDir?, {repoRoot})`는 `{deck, issues, files, outputs}`를 반환한다. 생성 대상은 12파일이며 입력 data.json과 수동 README는 덮어쓰지 않는다. 입력·SVG·원고·표를 먼저 검증하고 최종 출력의 sibling staging에서 기존 Markdown compiler와 미디어·runtime 검사를 마친 뒤 결과를 교체한다. 입력과 생성 경로가 겹치거나 같은 실제 파일을 참조하는 symlink 충돌도 사전에 거절한다.

별도 출력 깊이에서도 runtime·실제 입력·가이드·갤러리까지의 상대 링크를 계산한다. 고정 `../index.html`이나 존재하지 않는 출력 내 JSON으로 잘못 연결하지 않는다. 입력을 복제하지 않으므로 별도 출력의 공유 시 입력·저장소와 상대 위치를 유지한다.

## 데이터·출력 검증

- 전체 `node --test tests/*.test.cjs`: **181개 통과**, 실패·취소·skip 0. 기존 168개와 새 의미 있는 데이터/생성 경계 13개다.
- 정수·양의 분모·중첩 퍼널·기간의 완전 분할·참조 ID·기획 점수·일정·인주 행렬과 지원 수량/텍스트 경계를 검증한다. 분모 0을 거짓 0%나 NaN으로 내보내지 않는다. 실제 0인 결과와 투입 셀은 허용되는 범위에서 보존한다.
- 35%·55%·+20%p, 81.25%의 81.3% 표시, 원본 인접 단계에서 계산한 +14.6%p, 18인·주 합계가 일치한다. 음수 데이터에서는 변화폭의 절댓값을 비교하면서 방향 부호를 SVG·표·원고 모두 보존한다.
- 같은 입력의 순수 SVG 출력·원본 불변·XML/HTML 인용 문자·작은 구성비 범례·다양한 투입값·입력 변경의 KPI/원고/SVG/표 동시 전파를 검사했다.
- 잘못된 입력·불완전/실행형 SVG·누락 미디어/runtime·입력/출력 경로 및 symlink 충돌 시 기존 생성 결과와 입력을 보존하는 실제 build 경계를 검사했다.
- [최종 빌드 근거](evidence/authoring-build.json): **6개 발표·47장·모든 입력 진단 0**. 기존 다섯 원고·content·index 15파일은 바이트 변화 0. 두 번 연속 전체 생성한 22출력의 바이트가 모두 같았다.
- `git diff --check`와 새 Node 모듈의 구문 검사를 통과했다. 새 HTML 두 파일의 로컬 자원·가이드·입력·갤러리 대상 누락은 없었다. 숫자 hash인 `#1`은 기존 런타임의 장 이동 경로로 구분했다.

## 접근 가능한 표와 작성 담당 브라우저 검수

data.html에는 periods/weekly/funnel/interviews/step-rates/journey/priorities/roadmap/effort/next-validation의 열 앵커가 있다. 각 구역에 요약·실제 table/caption·행/열 scope·단위·분모·기간·계산 설명을 제공한다. 상단 가상 데이터와 관찰 설계·집계 확정을 명시하고, 점수·투입·후속 검증은 관찰된 성과와 구분한다.

작성 담당은 TaskSpace 3의 전용 p4에서 별도 임시 출력의 `file://` 발표를 열었다. 390px에서 상단의 짧은 **표** 링크가 실제 data.html로 이동했고 발표 헤더·문서 너비는 모두 390px로 넘침이 없었다. 여덟 이미지의 원본 작은 라벨은 확대 없이 읽기 좋다고 주장하지 않는다.

[브라우저 근거](evidence/authoring-browser.json)에서 표 10개·caption 10개·scope 누락 0과 canonical 앵커 10개를 확인했다. 셀 글씨는 16px이고 열이 많은 표만 초점 가능한 자체 가로 스크롤 영역에서 모든 셀을 보존했다. 문서 전체 scrollWidth는 390px였다. 별도 출력의 입력·가이드 링크도 실제 원본까지 연결됐다. 이 검수는 작성 담당의 임시 출력·구조/모바일/오프라인 확인이며 매니저의 별도 검수와 총괄의 최종 제품·PDF 검수는 구분한다.

## 인계 범위

제품 코드·원고·생성 결과는 최종 빌드 뒤 잠금 상태로 매니저에게 먼저 인계했다. 이 문서 작성 후 취합 편집권도 매니저에게 인계한다. 갤러리는 여섯 예제·47장과 새 데이터 작성 흐름을 안내하며, 새 미리보기의 alt는 퍼널·추세·우선순위·히트맵 네 패널 모음으로 정했다.

새 PDF와 PNG·전체 overview·갤러리 preview hash는 총괄 소유다. 작성 담당 링크 검사 시점에 아직 없는 새 PDF는 예정 산출물로 분리했으며 누락 없는 최종 전달로 보고하지 않았다. 실제 최종 발표 탐색·편집/내보내기·발표자·전체 기기·PDF 렌더·화면의 상세 가독성은 매니저와 총괄 검증 범위를 따른다. Git commit/push·외부 배포는 실행하지 않았다. 목표·담당자·미완료 작업·결정의 단일 운영 기록은 루트 WORK_LOG.md다.

## 매니저 독립 검수

`/root/engineering_manager`는 두 실무자의 실제 완료·모든 편집 종료를 각각 확인했다. 작성 담당이 이 보고서의 편집을 중단한 뒤 소유권을 인수해 아래 결과를 추가했다. 최종 코드에서 전체 테스트 **181/181 통과**를 별도로 확인했다.

- [독립 정적 검사](evidence/manager-static.json): Python Decimal로 35%→55%의 +20%p, 마지막 단계 +14.6%p, 81.25%→81.3%, 총 18인·주를 따로 계산했다. 실제 제품 SVG 여덟 파일을 XML parser로 읽어 1280×640·title·desc를 확인했다. 기준으로 보관한 공통 런타임·루트·기존 다섯 원고/출력 총 20파일의 SHA는 모두 그대로였으며 새 덱 query 네 개도 실제 SHA와 일치했다.
- [실제 모바일 표](evidence/manager-data-mobile.json): 제품 data.html을 localhost에서 390px로 열어 표·caption 각 10개, scope 누락 0, canonical 앵커 10개 모두 존재함을 확인했다. 모든 표의 셀 글씨는 16px이며 문서 전체는 390px다. 넓은 표는 352px 영역 안에서 스크롤하고, 키보드로 직전 단계 표에 초점을 둔 뒤 ArrowRight로 실제 scrollLeft 40px 이동을 확인했다.
- [독립 오프라인 검수](evidence/manager-browser.json): 같은 최종 runtime과 새 예제를 고유 `/tmp` 경로·덱 ID로 복사해 `file://`로 열었다. 12장과 SVG 여덟 개가 모두 로드됐고, 390px 헤더·읽기 화면의 가로 넘침은 없었다. 읽기에는 전 장과 이미지가 모두 표시되고 실행 중 animation은 없었다. 상단 **표** 링크를 실제 클릭해 오프라인 data.html의 표 10개로 이동했다.
- [실제 다운로드](evidence/manager-export.js): 복사본의 native 제목을 편집하고 내보내기·새로고침을 수행했다. 다운로드를 node:vm으로 읽어 수정 제목·강조 문자열·rise, KPI 35/55, 여덟 이미지, 마지막 data.html 링크가 보존됨을 확인했다. 표·SVG·입력 JSON으로 역반영되는 기능으로 오해하지 않도록 안내를 대조했다. 제품 data.json과 공통 runtime의 SHA는 전후 동일하다. [복사본 식별값](evidence/manager-fixture.json)에 이를 기록했다.

검수는 기존 사용자 경로의 저장 상태를 바꾸지 않는 별도 복사본에서 편집·내보내기를 수행했다. 축소 SVG 안의 작은 라벨 전체 가독성, 실제 보조기기·물리 화면·PDF·프로젝터 검수로 확대하지 않는다. 제품 본 화면·갤러리·최종 PDF와 PNG는 총괄의 최종 검증과 구분한다. 팀 코드·생성물·문서의 편집권과 브라우저 p3·p4 정리는 총괄에게 인계한다.

최종 리서치 재검수에서 이미지 장의 발표자 노트에 비교 코호트 기간이 일괄 붙어 인터뷰·추세·계획의 기간으로 오해될 수 있음을 발견했다. 매니저가 고정 기간을 출처 helper에서 제거하고 같은 원본의 해당 상세 표로 연결했다. TC-VS08에 이 사례를 추가해 실패를 확인한 뒤 수정했으며 전체 181개가 다시 통과했다. data.html의 활성 정의 문장 조사도 교정했다. [최종 생성 근거](evidence/manager-final-build.json)는 교정 후 6개·47장, 22출력의 결정성과 보호한 20파일의 불변을 다시 확인한다. 위 브라우저·다운로드 근거는 이 노트/설명 교정 전의 동일 runtime·동일 native 본문/그림 검수이며, SVG·숫자·화면 본문은 교정으로 바뀌지 않았다.
