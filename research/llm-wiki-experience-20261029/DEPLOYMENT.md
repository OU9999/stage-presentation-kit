# 40장 발표 공개 배포 검수

검수일: 2026-10-29. 기능 커밋 [`5a5e4366f2642e74deac2e0b72800619b3162e72`](https://github.com/OU9999/stage-presentation-kit/commit/5a5e4366f2642e74deac2e0b72800619b3162e72)을 main에 push했다.

[GitHub Pages 실행 40797372002](https://github.com/OU9999/stage-presentation-kit/actions/runs/40797372002)이 같은 head SHA로 성공했다. Pages build API도 같은 커밋의 `built`와 오류 없음을 확인했다. 원본 응답은 `evidence/pages-run.json`·`pages-build.json`이다.

- [발표](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/)
- [슬라이드 읽기](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/read.html)
- [학습 자료 6개](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/materials/index.html)
- [40장 대본](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/materials/speaker-script.html)
- [실제 파일 읽기·ZIP 실행 안내](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/materials/demo-log.html)

## 공개 사이트에서 직접 확인한 범위

| 검사 | 실제 결과 | 근거 |
| --- | --- | --- |
| HTTP | 발표/자료/자산/공유 runtime/목차·manifest 29개 모두 200, 로컬 전체 바이트 일치 | `evidence/public-http.json` |
| 발표 | 40장 전체 최신 원고 revision 일치, 본문 넘침·진단·JS 오류·이미지 실패 0 | `evidence/public-slides.json` |
| 참여 | 두 A/B 각각과 공개 링크·복귀·이어가기 총 10번 실제 클릭 | `evidence/public-navigation.json` |
| 발표 기능 | overview40·preview 링크0, presenter 양방향 동기화 | 같은 파일 |
| 자료 이동 | 발표→자료→대본40장→읽기40장 실제 이동 | 같은 파일 |
| 모바일 읽기 | 390px, 40장 본문 순서/누락 0·18px·가로 넘침0·이미지 contain/alt | 같은 파일, `screens/public-mobile-read.png` |
| 독립 학습 자료 | 6개×1440/390px, 전문/순서 누락0·revision 일치·18px·JS0·가로 넘침0 | `evidence/public-documents.json` |
| 문서 키보드 | 모바일 목차 Enter 열기/닫기, 긴 코드 ArrowRight 이동 | 같은 파일 |
| 다운로드와 재현 | 공개 발표에서 ZIP 클릭·저장, 23,952B SHA 일치, 압축 해제 check→apply→check 모두 통과 | `evidence/public-download.json` |

공개 원고 revision은 `489b05e48bd8ab93fc2c66e136aa175371fbebf26588fd8de3b8b8616b8e0710`이다. ZIP SHA는 `9c0a83b5bf0a2b22e9c9102ed0d26c81ce683d4fc0589ce96a741f998f6a44f2`이며 공개 다운로드에서도 같았다. 재현은 고정 승인 예제의 8쪽·25링크·10불변 파일 검사로, 모델 성능 실험을 실행한 것은 아니다.

사진 gallery의 얼굴/손·책, 숫자 위계, 모바일 원본 이미지·학습 문서 진입을 공개 PNG에서도 직접 열어 확인했다. 대표 공개 화면은 `evidence/public-result.png`이고, 다른 화면은 `evidence/screens/public-*`에 있다.

## 브라우저 인계와 기록

새 Ego TaskSpace88의 계측용 p1과 발표자 팝업을 정리했다. 계측을 넣지 않은 공개 발표 p4(40장·최신 revision·편집 노드0)를 열어 두고 `finish({keep:['p4']})`를 정확히 한 번 호출했다. 종료 후에는 브라우저를 다시 조작하지 않았다. 기존 사용자 Space84/76과 서버4323은 보존했다. 근거는 `evidence/browser-finish.json`이다.

이 배포 검수 후에는 작업 로그와 공개 검증 기록만 후속 커밋한다. 제품·원고·생성물은 검수한 기능 커밋과 같게 유지하고, 후속 push의 최신 Pages 상태를 마지막으로 확인한다.
