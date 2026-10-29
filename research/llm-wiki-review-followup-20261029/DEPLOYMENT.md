# 수정본 배포와 확인 범위

기능·재검토 기록은 `e7f7ff18c7929900035766499762326988c57f81`로 main에 commit/push했다. 원격 main도 같은 SHA임을 확인했다. [Pages40852119451](https://github.com/OU9999/stage-presentation-kit/actions/runs/40852119451)은 같은 SHA로 success, Pages API는 built였다. [API 기록](./evidence/publication.json)에 있다.

이 커밋의 제품40파일·당시 연구102파일·전후 비교의 이전8이미지, 총150파일을 공개 GET으로 확인했다. 모두200이며 응답 전체 바이트가 로컬과 일치했다. [파일별 HTTP·SHA](./evidence/public-http.json)에 검토 커밋/시간을 기록했다. 이후 검수 기록을 더하는 커밋은 발표 원고/자산/자료56파일을 바꾸지 않는다.

## 실제 수행한 화면 검수

로컬에서 새 소유 TaskSpace122 p1만 사용해40장 전체 렌더·변경8장 실독,29장 기본 진행/5개 심화 링크·개요/presenter·390px 전문/anchor11,25장 실제 실습 이동/starter 다운로드,39장1440/960의 네 행 글자 크기,전후비교1440/390의8장16이미지를 검수했다. QA/ENG의 새 실무는 현재40PNG와 정확 발언을 순차 실독한 뒤 이전8PNG와 비교하고 내부·팀 간 회의를 마쳤다. 새SVG2의 글자 경계/겹침과 독립복사·이동41출력 동일도 확인했다.

## 공개 브라우저 라운드의 실제 한계

09:47:46UTC에 같은 TaskSpace122를 재개하려 했으나 `Error: task space not found: 122`로 페이지 조작 전 중단됐다. 이어 읽기 전용 등록 조회에서 ID/이름의 일치 공간이 없었다. 소실 원인은 확인하지 못했으며 사용자 조작이라고 단정하지 않는다. 따라서 **새 공개 라이브 브라우저의 화면·이동 검수는 수행하지 못했다.** HTTP/로컬 검수를 그 공개 브라우저 실행으로 바꾸어 보고하지 않는다. [실제 오류 기록](./evidence/public-browser-attempt.json)을 남겼다.

[ego-browser SKILL.md](/Users/ou9999-wdl/.agents/skills/ego-browser/SKILL.md)가 따르게 하는 [읽은 사용 가이드](/tmp/llm-wiki-followup-ego-guide.txt)는 “Never use a new TaskSpace to recover”를 명시한다. 같은 목적의 새 공간이나 다른 사용자 공간으로 우회하지 않았다. 소실된122에 finish를 실행했다고도 기록하지 않는다. 기존 사용자 공간/서버를 조작하지 않고 브라우저 작업을 멈췄다.

완료한 공개 확인은 동일SHA 배포와 정적파일150개의 전체 바이트 일치다. 실제 음성·20분 소요·사람 효과, 개인도구의 LLM 작성/재독·복구·운영 효과 역시 이번 검수의 성과가 아니다.

[수정본 발표](https://ou9999.github.io/stage-presentation-kit/presentations/llm-wiki/) · [전후 비교](./index.html) · [수정·재검토 결과](./RESULT.md)
