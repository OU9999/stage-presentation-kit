# 첫 실물 독립 검증 재호출

준비 정본 READY/acceptance-final의 기준을 실제로 적용한다. 현재 본편05/07/13/15에 대응하는 격리 시안1/2/3/4를 현재 공용 엔진으로 렌더했다. 본편20장 이행이나 시각 승인은 아직 없다. 검증관은 제작에 참여하지 않았고 제작팀의 미감 승인은0이다. root/제작자 판단·테스트 수를 초기 독립 판정의 정답으로 읽지 않는다. `evidence/round-01/root-first-look.md`는 A/B 초기 판정 뒤 직접 반론 단계에서만 읽는다.

## 현재 입력과 실제 화면

- 원고 `prototypes/talks/round-01/slides.md` SHA `fa6bd281ce7b88825141e335ead2f21bdca93749e08c53dde5c015cc61173cc4`. prefix는 `research/devday-fidelity-20261116/`다.
- DESIGN 현재 `0a9a91d39c1b362221208f8817a51abab3c0c563a7f90474fb430542adb644f0`. 준비 당시 old 기준 SHA는 보존했으며 새 시안은 새 기준으로 캡처했다.
- `evidence/round-01/present-1920/`와 `present-1280/`: 각 slide-01..04.png, manifest.json, contact-01-04.jpg, reference-before-after.jpg, context-storyboard.jpg 및 provenance JSON, 실제 svg-metrics.json. PNG는 stage-only, viewport1920×1080/1280×720·DPR1이며 실제 Stage 약1557×876/917×516이다. 현재 source/CSS/runtime/assets 전체는 `evidence/round-01/source/`에 byte 동결했다.
- 원본은 evidence/README.md의 공식11seek프레임 및 보관 Codex01:30. 첫 잘못된 crop은 제외한다. 원본/이전/새보드에서 실제 발표 스크린을 판정하고 방송무대/발표자/원본성과·브랜드자산을 복제하지 않는다.
- context-storyboard는 **새4실물과 기존16PNG를 섞은 명시적 문맥 검토자료**다. 새 본편을 빌드/전편 캡처했다고 주장하지 않는다. provenance JSON이 각각의 실제 경로를 밝힌다. 현재02는 비수정 대조, 해당 변경 장의 앞뒤와 전체 흐름을 본다.
- 공용 확장은 명시 `compose:split / variant:evidence`의 image-first+단일nativeblockquote/짧은p만이다. 기존 split/auto/읽기/source AST와 순서는 유지했다. 기술 결과는 초기 실물 판정 뒤 확인한다. source-proof와 production/HANDOFF는 의미/구현 확인이며 미감 승인서가 아니다.

## 재개와 산출물 소유

manager는 같은 A/B를 follow-up하여 두 독립 초기 판정·직접 반론을 관리한다. root+manager+A+B 동시4를 지킨다. 제품·원고·자산·공통코드·기존근거·WORK_LOG 수정 금지, 브라우저/추가캡처 root만. 소유는 manager `review/round-01/manager-summary.md`, A `art-direction*`, B `reading-meaning*`·`integration*`; 서로의 파일을 덮어쓰지 않는다. 두 실무 모두 독립 초기 실물 판정을 하고 B가 후속 취합한다.

1. 각자 새8개별·원본 대응·이전4·양폭4보드/명시문맥을 실제 읽고 그 경로/범위를 기록한다. A는 타이포 비례/주역/매체·구도/흐름, B는 같은 역할의 시각 대조와 정확 원문/관계/지위/공개지원·재현성의 독립 판정을 맡는다. B도 문서 취합만 하지 않는다. 기술 결과/제작자·root 판정은 그 뒤에 본다.
2. 큰질문과 실제 대상의 무게, 반복 설명·조건·예시 표지가 주역을 밀어내는지까지 본다. 명확해진 국소 장점과 남은 구체 veto를 구분하며 승인/반려 횟수를 할당하지 않는다.
3. 초기 후 A/B가 직접 근거·반론·필요 구조 수정·전후 재확인 범위를 교환한다. root 첫 판정도 그때 반론 대상으로 읽는다. unresolved veto가 하나라도 있으면 평균내어 승인하지 않는다. 13이 현재보다 나아지지 않으면 보존 선택도 허용한다.
4. 새8 PNG의 판정을 각자 원문 JSON으로 남긴다. A `art-direction.reviews.json`, B `reading-meaning.reviews.json`: 각 `{reviews:[{slide:1..4,mode:'presentation-stage-only',viewport:{width,height,devicePixelRatio:1},status,reviewer,reviewedAt,reason,evidence:[저장소상대PNG경로],owner,nextAction}]}`. 두 폭 각4로 총8행, 실제 본 범위만 판정. owner/nextAction은 needs-changes/unreviewed 필수다. 이 record 이름의 reading은 B 전문성이지 읽기 모드 승인 뜻이 아니다. 이번 formal scope는 발표 두 폭뿐이다.
5. 근거 최신성·현재 해시·기술 관측은 실물 판단 뒤 검사한다. 부족한 새 화면/읽기는 root에게 구체 요청하고 독립 업무는 계속한다. root가 원문을 바꾸지 않고 CLI에 기계적으로 연결할 예정이며 source snapshot/기존 원문은 보존한다. 전체 본편 승인은 주장하지 않는다.

manager가 반려 구조수정 목록·수용/이견·실제 검토 범위·필요 다음 캡처·모든 writer 종료/actual 상태를 root에 인계하면 제작팀을 재개한다. 긴 연구 추가로 첫 구조 반려를 뒤로 미루지 않는다. 원본 공식 font/수치/tool/전편 모션·현장효과는 여전히 미확인이다.
