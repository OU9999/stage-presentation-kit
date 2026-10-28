# 공개 배포 확인

- 기능 커밋: 824cf3ae70412074b4927eccfee4ef4d942a38e6. main에 push 완료.
- GitHub Pages run [40657676998](https://github.com/OU9999/stage-presentation-kit/actions/runs/40657676998): 동일 head SHA, completed/success. Pages build API도 동일 SHA/built, 오류 없음.
- 공개 주소: [발표](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/index.html), [읽기](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/read.html), [12장 화면 모음](https://ou9999.github.io/stage-presentation-kit/research/llm-wiki-20261028/).
- HTTP36파일 전부200 및 로컬 SHA/바이트 일치. 새 덱/자산·공통runtime·manifest/모음·루트/기존제품예제·화면보드/12PNG를 포함한다. txt4개 MIME은 text/plain; charset=utf-8이다.
- 실제 공개 브라우저12장: 동일원고 revision 23145e8c452a041ef55d7489c8fd00da96914a1e98b03d3ad03d423f52fcde58, 오류/이미지실패/본문넘침/진단0. 공개390px읽기12장·범위예문·가로넘침0·저장접근0을 확인했다.
- 공개 마지막 장의 첨부4개를 실제 클릭해 열었다. UTF-8 한국어 본문 전체가 생성물과 일치했다. 로컬 검수는 기존4323서버가 txt를 octet-stream으로 제공해 다운로드로 검증했고, 공개에서는 정상 본문 열기를 확인했다.
- TaskSpace76에서 계측용p1을 정리하고 계측 없는 공개5장(p4)만 남겨 finish를 정확히1회 완료했다. 다른 사용자 Space와 기존 서버4323은 보존했다. 새 서버/패키지/브라우저 업그레이드는 하지 않았다.

근거: [HTTP/해시](evidence/public-http.json), [공개 화면/첨부](evidence/public-browser.json), [Pages build](evidence/pages-build.json), [workflow](evidence/pages-run.json), [브라우저 전달](evidence/browser-handoff.json).

검증 기록만 후속 커밋으로 전달한다. 발표 원고·자산·생성물·runtime은 위 기능 커밋과 동일하다. 후속 커밋도 push한 뒤 최신 Pages SHA와 built 상태를 최종 확인한다.
