# EX-COURSE — 가상 학습 메모의 입력과 전후 파일

학습자·강의메모·파일 출력은 모두 구성 예다. Wright 논문이 제공한 실제 wiki 출력이나 학생 실험 결과가 아니다. 기본 개념을 설명하되 특정 강의의 원문을 복제하지 않는다.

## 입력 · raw/week02.md / raw/week07.md

```markdown
# 가상 2주차: 회귀
연속값 예측에서 예측과 관측의 차이를 제곱한 오차의 합을 줄이는 예를 다룬다.
```

```markdown
# 가상 7주차: 회귀트리
영역마다 대표 예측값을 정하고, 분할 뒤 영역 안의 제곱오차 합이 작아지는 후보를 비교한다.
```

## 이전 위키 · wiki/concepts/squared-error.md

```markdown
# 제곱오차
관측과 예측의 차이를 제곱해 오차를 나타낸다.
2주차 회귀와 7주차 회귀트리에서 서로 다른 모델 구조에 사용한다.
주의: 트리 전체 종류로 일반화하지 않는다.
근거: raw/week02.md, raw/week07.md
연결: concepts/regression.md, concepts/regression-tree.md
```

## 새 입력 · raw/week08.md

```markdown
# 가상 8주차: 분류트리
이번 예에서는 범주 분류의 분할을 Gini 불순도로 비교한다.
7주차 회귀트리의 제곱오차 기준과 대조한다.
```

## 갱신 위키 · wiki/concepts/squared-error.md

```markdown
# 제곱오차
관측과 예측의 차이를 제곱해 오차를 나타낸다.
회귀와 회귀트리에서 쓰는 이 예의 기준이다.
8주차 분류트리 예는 Gini 불순도를 사용하므로 같은 기준으로 묶지 않는다.
근거: raw/week02.md, raw/week07.md, raw/week08.md
연결: concepts/regression.md, concepts/regression-tree.md,
      concepts/classification-tree.md, comparisons/tree-criteria.md
```

함께 작성·갱신할 파일: 세 강의의 source 요약, 회귀/회귀트리/분류트리 concept, `comparisons/tree-criteria.md`, 기존 질문 답의 범위, `index.md`, `log.md`. 새 입력이 기존 개념의 적용 범위를 명확하게 한다.

## 후속 질문과 재사용

“회귀와 회귀트리는 무엇이 같고, 분류트리는 어디서 다른가?” → 제곱오차/세 모델 concept/기준 비교를 읽고 다음 종합을 저장한다고 가정한다. 모델을 실행하지 않았다.

```markdown
# wiki/synthesis/error-and-trees.md
가상 2·7주차는 서로 다른 회귀 모델에서 제곱오차를 사용한다.
8주차의 분류트리 예는 Gini 불순도로 분할을 비교한다.
종합: 구조가 다른 모델이 같은 기준을 쓸 수 있고, 같은 트리 계열에서도 과제에 따라 기준이 다를 수 있다.
범위: 이 세 학습메모의 예. 모든 알고리즘·강의·학습효과로 일반화하지 않는다.
근거: raw/week02.md, raw/week07.md, raw/week08.md
연결: concepts/squared-error.md, comparisons/tree-criteria.md
다음 질문: 분할 기준을 바꾸면 어느 가정과 결과를 새로 확인해야 하나?
```

이 종합은 강의별 요약을 복사한 것이 아니라 공통 기준과 차이를 함께 설명한다. 개념·비교에서 종합으로 연결하고, 새 강의가 오면 종합의 적용 범위도 다시 검토한다. 기존 오류를 새로 만들 필요 없이 지식이 누적되는 장면이다.
