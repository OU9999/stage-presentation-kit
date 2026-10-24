"use strict";

const { periodSummary, funnelSeries, rate, largestChangeIndex } = require("./theme.cjs");

// This example has a deliberately bounded 12-week design, rather than a chart editor.
const LIMITS = Object.freeze({ weeks: 12, periods: 3, stages: 4, categories: 4, initiatives: 4, interventions: 3, tasks: 3, roles: 3, plans: 3, count: 1_000_000, personWeeks: 999 });
const PERIODS = ["baseline", "rollout", "followup"];
const STAGES = ["registered", "started", "drafted", "activated"];
const isRecord = value => value !== null && typeof value === "object" && !Array.isArray(value);

function validateData(data) {
  const issues = [];
  const add = (path, message) => issues.push({ path, message });
  function object(value, path) {
    if (!isRecord(value)) { add(path, "객체를 입력하세요."); return {}; }
    return value;
  }
  function list(value, length, path) {
    if (!Array.isArray(value)) { add(path, `${length}개 항목의 배열을 입력하세요.`); return []; }
    if (value.length !== length) add(path, `현재 SVG 양식은 ${length}개 항목을 지원합니다. 개수를 바꾸려면 생성 양식도 수정하세요.`);
    return value;
  }
  function text(value, path, maximum = 160) {
    if (typeof value !== "string" || !value.trim()) { add(path, "빈 값이 아닌 문자열을 입력하세요."); return false; }
    if (Array.from(value).length > maximum) add(path, `현재 양식의 글자 영역에 맞게 ${maximum}자 이내로 입력하세요. 긴 설명은 상세 표에 두세요.`);
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ud800-\udfff\ufffe\uffff]/u.test(value)) add(path, "XML에 쓸 수 없는 제어 문자·짝 없는 Unicode 문자를 제거하세요.");
    return true;
  }
  function integer(value, path, minimum = 0, maximum = LIMITS.count) {
    if (!Number.isSafeInteger(value) || value < minimum || value > maximum) { add(path, `${minimum} 이상 ${maximum} 이하의 정수를 입력하세요.`); return false; }
    return true;
  }
  function fixed(value, expected, path) { if (value !== expected) add(path, `현재 데이터 계약은 ${JSON.stringify(expected)} 값을 사용합니다.`); }
  function id(value, path) {
    if (text(value, path, 64) && !/^[a-z][a-z0-9-]*$/.test(value)) add(path, "소문자로 시작하는 영문·숫자·하이픈 ID를 사용하세요.");
  }
  function unique(items, key, path) {
    const seen = new Set();
    items.forEach((item, index) => {
      if (!isRecord(item)) return;
      const value = item[key];
      if (seen.has(value)) add(`${path}.${index}.${key}`, "중복된 식별값을 제거하세요.");
      seen.add(value);
    });
  }
  function reference(value, available, path) { if (!available.has(value)) add(path, "원본에 존재하는 ID를 참조하세요."); }
  function derivedCopies(value, keys, path) {
    for (const key of keys) if (Object.prototype.hasOwnProperty.call(value, key)) add(`${path}.${key}`, "계산된 합계·비율을 중복 저장하지 마세요. 원본 정수에서 함께 생성합니다.");
  }
  if (!isRecord(data)) { add("$", "가상 데이터 객체를 입력하세요."); return issues; }
  const allowed = new Set(["schemaVersion", "meta", "measurement", "weeklyCohorts", "periods", "funnel", "interviews", "initiatives", "journeyMap", "roadmap", "effortAllocation", "nextValidation"]);
  for (const key of Object.keys(data)) if (!allowed.has(key)) add(key, "지원하지 않는 최상위 필드입니다. 계산된 끝값은 원본 정수에서 생성합니다.");
  fixed(data.schemaVersion, 1, "schemaVersion");
  const meta = object(data.meta, "meta");
  id(meta.id, "meta.id");
  text(meta.title, "meta.title", 60);
  fixed(meta.fictional, true, "meta.fictional");
  text(meta.disclosure, "meta.disclosure", 160);
  text(meta.studyDesign, "meta.studyDesign", 300);
  text(meta.reportingCutoff, "meta.reportingCutoff", 40);
  text(meta.weekLabels, "meta.weekLabels", 160);
  const measurement = object(data.measurement, "measurement");
  for (const key of ["population", "cohortAssignment", "activation", "activationRateDenominator", "displayRounding"]) text(measurement[key], `measurement.${key}`, 240);
  fixed(measurement.outcomeWindowDays, 7, "measurement.outcomeWindowDays");
  fixed(measurement.percentageDecimals, 1, "measurement.percentageDecimals");
  fixed(measurement.relativeChangeDecimals, 1, "measurement.relativeChangeDecimals");
  fixed(measurement.differenceUnit, "percentagePoints", "measurement.differenceUnit");

  const weeks = list(data.weeklyCohorts, LIMITS.weeks, "weeklyCohorts");
  weeks.forEach((value, index) => {
    const week = object(value, `weeklyCohorts.${index}`);
    fixed(week.week, index + 1, `weeklyCohorts.${index}.week`);
    const registered = integer(week.registered, `weeklyCohorts.${index}.registered`, 1);
    const activated = integer(week.activated, `weeklyCohorts.${index}.activated`);
    derivedCopies(week, ["rate", "activationRate", "percentage"], `weeklyCohorts.${index}`);
    if (registered && activated && week.activated > week.registered) add(`weeklyCohorts.${index}.activated`, "활성 인원은 같은 주 신규 가입 인원을 넘을 수 없습니다.");
  });
  const periods = list(data.periods, LIMITS.periods, "periods");
  periods.forEach((value, index) => {
    const period = object(value, `periods.${index}`);
    fixed(period.id, PERIODS[index], `periods.${index}.id`);
    text(period.label, `periods.${index}.label`, 8);
    fixed(period.fromWeek, index * 4 + 1, `periods.${index}.fromWeek`);
    fixed(period.toWeek, index * 4 + 4, `periods.${index}.toWeek`);
    derivedCopies(period, ["registered", "activated", "rate", "activationRate", "percentage"], `periods.${index}`);
  });
  const validWeeks = weeks.length === LIMITS.weeks && weeks.every((week, index) => isRecord(week) && week.week === index + 1 && Number.isSafeInteger(week.registered) && week.registered > 0 && Number.isSafeInteger(week.activated) && week.activated >= 0 && week.activated <= week.registered);
  const totals = validWeeks ? Object.fromEntries(PERIODS.map((key, index) => [key, weeks.slice(index * 4, index * 4 + 4).reduce((sum, week) => ({ registered: sum.registered + week.registered, activated: sum.activated + week.activated }), { registered: 0, activated: 0 })])) : null;
  if (totals && totals.baseline.activated === 0) add("weeklyCohorts", "기준 활성 인원이 0이면 상대 변화의 분모가 0입니다. 이 양식의 상대 변화 문구를 수정한 뒤 사용하세요.");

  const funnel = object(data.funnel, "funnel");
  text(funnel.kind, "funnel.kind", 100);
  text(funnel.window, "funnel.window", 100);
  text(funnel.denominatorRule, "funnel.denominatorRule", 240);
  const stages = list(funnel.stages, LIMITS.stages, "funnel.stages");
  stages.forEach((value, index) => {
    const stage = object(value, `funnel.stages.${index}`);
    fixed(stage.id, STAGES[index], `funnel.stages.${index}.id`);
    fixed(stage.source, index === 0 ? "periodRegistered" : index === 3 ? "periodActivated" : "intermediateCounts", `funnel.stages.${index}.source`);
    text(stage.label, `funnel.stages.${index}.label`, 16);
  });
  const intermediate = list(funnel.intermediateCounts, 2, "funnel.intermediateCounts");
  intermediate.forEach((value, index) => {
    const entry = object(value, `funnel.intermediateCounts.${index}`);
    const period = ["baseline", "followup"][index];
    fixed(entry.period, period, `funnel.intermediateCounts.${index}.period`);
    const started = integer(entry.started, `funnel.intermediateCounts.${index}.started`, 1, 4 * LIMITS.count);
    const drafted = integer(entry.drafted, `funnel.intermediateCounts.${index}.drafted`, 1, 4 * LIMITS.count);
    for (const key of Object.keys(entry)) if (!["period", "started", "drafted"].includes(key)) add(`funnel.intermediateCounts.${index}.${key}`, "가입·공유 끝값을 중복 저장하지 마세요. 주별 원본 정수를 합산합니다.");
    if (totals && started && drafted) {
      if (!(totals[period]?.registered >= entry.started && entry.started >= entry.drafted && entry.drafted >= totals[period]?.activated)) add(`funnel.intermediateCounts.${index}`, "가입 ≥ 시작 ≥ 초안 ≥ 공유의 중첩 인원 순서를 지키세요. 가입·공유는 주별 합계에서 계산됩니다.");
    }
  });

  const survey = object(data.interviews, "interviews");
  text(survey.kind, "interviews.kind", 46);
  text(survey.period, "interviews.period", 12);
  integer(survey.sampleSize, "interviews.sampleSize", 1);
  text(survey.sampling, "interviews.sampling", 300);
  text(survey.coding, "interviews.coding", 240);
  const categories = list(survey.categories, LIMITS.categories, "interviews.categories");
  categories.forEach((value, index) => {
    const category = object(value, `interviews.categories.${index}`);
    id(category.id, `interviews.categories.${index}.id`);
    text(category.label, `interviews.categories.${index}.label`, 34);
    integer(category.count, `interviews.categories.${index}.count`);
    derivedCopies(category, ["share", "percent", "percentage"], `interviews.categories.${index}`);
  });
  unique(categories, "id", "interviews.categories");
  if (categories.every(item => isRecord(item) && Number.isSafeInteger(item.count)) && categories.reduce((sum, item) => sum + item.count, 0) !== survey.sampleSize) add("interviews.categories", "대표 원인별 인원 합계는 인터뷰 응답자 수와 같아야 합니다.");

  const initiatives = object(data.initiatives, "initiatives");
  text(initiatives.kind, "initiatives.kind", 100);
  fixed(initiatives.scoresAreMeasuredOutcomes, false, "initiatives.scoresAreMeasuredOutcomes");
  const scale = object(initiatives.scoreScale, "initiatives.scoreScale");
  fixed(scale.min, 1, "initiatives.scoreScale.min"); fixed(scale.max, 5, "initiatives.scoreScale.max");
  text(scale.impactMeaning, "initiatives.scoreScale.impactMeaning", 160); text(scale.effortMeaning, "initiatives.scoreScale.effortMeaning", 160);
  const items = list(initiatives.items, LIMITS.initiatives, "initiatives.items");
  const coordinates = new Set();
  items.forEach((value, index) => {
    const item = object(value, `initiatives.items.${index}`);
    id(item.id, `initiatives.items.${index}.id`); text(item.label, `initiatives.items.${index}.label`, 14);
    text(item.priority, `initiatives.items.${index}.priority`, 10);
    integer(item.impactScore, `initiatives.items.${index}.impactScore`, 1, 5);
    integer(item.effortScore, `initiatives.items.${index}.effortScore`, 1, 5);
    const coordinate = `${item.impactScore}:${item.effortScore}`;
    if (coordinates.has(coordinate)) add(`initiatives.items.${index}`, "현재 번호점 도식은 동일 점수 좌표의 겹침을 지원하지 않습니다. 데이터를 왜곡하지 말고 도식 배치를 변경하거나 별도 표로 제시하세요.");
    coordinates.add(coordinate);
  });
  unique(items, "id", "initiatives.items");
  const initiativeIds = new Set(items.filter(isRecord).map(item => item.id));
  const reasonIds = new Set(categories.filter(isRecord).map(item => item.id));

  const journey = object(data.journeyMap, "journeyMap");
  text(journey.kind, "journeyMap.kind", 90);
  const nodes = list(journey.nodes, LIMITS.stages, "journeyMap.nodes");
  nodes.forEach((value, index) => {
    const node = object(value, `journeyMap.nodes.${index}`);
    fixed(node.id, STAGES[index], `journeyMap.nodes.${index}.id`); text(node.label, `journeyMap.nodes.${index}.label`, 16);
    if (isRecord(stages[index]) && node.label !== stages[index].label) add(`journeyMap.nodes.${index}.label`, "같은 단계 ID의 퍼널 라벨과 일치시켜 서로 다른 이름이 남지 않게 하세요.");
  });
  list(journey.path, LIMITS.stages, "journeyMap.path").forEach((value, index) => fixed(value, STAGES[index], `journeyMap.path.${index}`));
  const interventions = list(journey.interventions, LIMITS.interventions, "journeyMap.interventions");
  interventions.forEach((value, index) => {
    const entry = object(value, `journeyMap.interventions.${index}`);
    reference(entry.initiative, initiativeIds, `journeyMap.interventions.${index}.initiative`);
    reference(entry.atStage, new Set(STAGES), `journeyMap.interventions.${index}.atStage`);
    reference(entry.interviewReason, reasonIds, `journeyMap.interventions.${index}.interviewReason`);
    const reason = categories.find(item => isRecord(item) && item.id === entry.interviewReason);
    if (reason && Array.from(reason.label || "").length > 18) add(`interviews.categories.${categories.indexOf(reason)}.label`, "여정 도식에 연결한 마찰 문구는 두 줄에 맞게 18자 이내로 입력하세요.");
  });
  unique(interventions, "initiative", "journeyMap.interventions"); unique(interventions, "atStage", "journeyMap.interventions");

  const roadmap = object(data.roadmap, "roadmap");
  text(roadmap.kind, "roadmap.kind", 40); text(roadmap.unit, "roadmap.unit", 8);
  fixed(roadmap.inclusiveEndpoints, true, "roadmap.inclusiveEndpoints");
  const tasks = list(roadmap.tasks, LIMITS.tasks, "roadmap.tasks");
  tasks.forEach((value, index) => {
    const task = object(value, `roadmap.tasks.${index}`);
    id(task.id, `roadmap.tasks.${index}.id`); text(task.label, `roadmap.tasks.${index}.label`, 24);
    const from = integer(task.fromWeek, `roadmap.tasks.${index}.fromWeek`, 1, 12), to = integer(task.toWeek, `roadmap.tasks.${index}.toWeek`, 1, 12);
    if (from && to && task.toWeek < task.fromWeek) add(`roadmap.tasks.${index}.toWeek`, "종료 주는 시작 주보다 앞설 수 없습니다.");
  });
  unique(tasks, "id", "roadmap.tasks"); text(roadmap.followupNote, "roadmap.followupNote", 96);

  const allocation = object(data.effortAllocation, "effortAllocation");
  text(allocation.kind, "effortAllocation.kind", 24); fixed(allocation.unit, "인·주", "effortAllocation.unit"); text(allocation.definition, "effortAllocation.definition", 240);
  derivedCopies(allocation, ["total", "columnTotals"], "effortAllocation");
  list(allocation.periodOrder, LIMITS.periods, "effortAllocation.periodOrder").forEach((value, index) => fixed(value, PERIODS[index], `effortAllocation.periodOrder.${index}`));
  const roles = list(allocation.items, LIMITS.roles, "effortAllocation.items");
  roles.forEach((value, index) => {
    const role = object(value, `effortAllocation.items.${index}`);
    id(role.id, `effortAllocation.items.${index}.id`); text(role.label, `effortAllocation.items.${index}.label`, 9);
    derivedCopies(role, ["total"], `effortAllocation.items.${index}`);
    list(role.personWeeksByPeriod, LIMITS.periods, `effortAllocation.items.${index}.personWeeksByPeriod`).forEach((amount, column) => integer(amount, `effortAllocation.items.${index}.personWeeksByPeriod.${column}`, 0, LIMITS.personWeeks));
  });
  unique(roles, "id", "effortAllocation.items");
  const effortValues = roles.filter(isRecord).flatMap(role => Array.isArray(role.personWeeksByPeriod) ? role.personWeeksByPeriod : []);
  if (effortValues.length && effortValues.every(value => Number.isSafeInteger(value) && value >= 0) && effortValues.every(value => value === 0)) add("effortAllocation.items", "모든 셀이 0이면 색의 척도를 정의할 수 없습니다. 투입량을 입력하거나 정적 표로만 표시하세요.");

  const next = object(data.nextValidation, "nextValidation");
  text(next.kind, "nextValidation.kind", 160); text(next.period, "nextValidation.period", 180); text(next.note, "nextValidation.note", 240);
  const plans = list(next.plans, LIMITS.plans, "nextValidation.plans");
  plans.forEach((value, index) => {
    const plan = object(value, `nextValidation.plans.${index}`);
    reference(plan.initiative, initiativeIds, `nextValidation.plans.${index}.initiative`);
    for (const key of ["question", "method", "measure", "decision"]) text(plan[key], `nextValidation.plans.${index}.${key}`, 180);
  });
  unique(plans, "initiative", "nextValidation.plans");
  return issues;
}

function assertValidData(data) {
  const issues = validateData(data);
  if (issues.length) {
    const error = new Error(issues.map(issue => `${issue.path}: ${issue.message}`).join("\n"));
    error.issues = issues;
    throw error;
  }
  return data;
}

function deriveData(data) {
  assertValidData(data);
  const periods = data.periods.map(period => periodSummary(data, period.id));
  const baseline = periods.find(period => period.id === "baseline"), followup = periods.find(period => period.id === "followup");
  const funnels = { baseline: funnelSeries(data, "baseline"), followup: funnelSeries(data, "followup") };
  const stepRates = funnels.baseline.slice(1).map((stage, index) => {
    const from = funnels.baseline[index];
    const before = { numerator: stage.value, denominator: from.value, rate: rate(stage.value, from.value) };
    const after = { numerator: funnels.followup[index + 1].value, denominator: funnels.followup[index].value, rate: rate(funnels.followup[index + 1].value, funnels.followup[index].value) };
    return { from: from.id, to: stage.id, label: `${from.label} → ${stage.label}`, baseline: before, followup: after, difference: after.rate - before.rate };
  });
  const rows = data.effortAllocation.items.map(item => ({ id: item.id, label: item.label, values: [...item.personWeeksByPeriod], total: item.personWeeksByPeriod.reduce((sum, value) => sum + value, 0) }));
  const columns = data.effortAllocation.periodOrder.map((id, index) => ({ id, label: periods.find(period => period.id === id).label, total: rows.reduce((sum, row) => sum + row.values[index], 0) }));
  return {
    periods, baseline, followup,
    activationDifference: followup.rate - baseline.rate,
    relativeChange: (followup.rate - baseline.rate) / baseline.rate * 100,
    weekly: data.weeklyCohorts.map(week => ({ ...week, rate: rate(week.activated, week.registered) })),
    funnels, stepRates,
    maxStepDifference: stepRates[largestChangeIndex(stepRates.map(item => item.difference))],
    interviews: data.interviews.categories.map(category => ({ ...category, share: rate(category.count, data.interviews.sampleSize) })),
    effort: { rows, columns, total: rows.reduce((sum, row) => sum + row.total, 0) }
  };
}

// Validate the local SVG subset emitted by these modules without adding an XML package.
// Deliberately rejects DTDs, processing instructions, scripts and remote resources.
function assertSvg(svg, file = "SVG") {
  const fail = message => { throw new Error(`${file}: ${message}`); };
  if (typeof svg !== "string" || !svg.startsWith("<svg")) fail("로컬 SVG 문자열이 필요합니다.");
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ud800-\udfff\ufffe\uffff]/u.test(svg)) fail("XML 제어 문자·짝 없는 Unicode 문자가 있습니다.");
  const tags = new Set(["svg", "title", "desc", "rect", "text", "line", "polyline", "circle", "path", "g", "defs", "linearGradient", "stop", "clipPath"]);
  const stack = [], found = new Set();
  let roots = 0, position = 0;
  function entities(value) {
    const remainder = value.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);/g, entity => {
      if (entity.startsWith("&#")) {
        const code = entity.startsWith("&#x") ? parseInt(entity.slice(3, -1), 16) : Number(entity.slice(2, -1));
        if (!(code === 9 || code === 10 || code === 13 || code >= 32 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) && code !== 0xfffe && code !== 0xffff)) fail("XML에서 허용하지 않는 문자 참조입니다.");
      }
      return "";
    });
    if (remainder.includes("&")) fail("이스케이프하지 않은 XML 엔티티가 있습니다.");
  }
  while (position < svg.length) {
    if (svg[position] !== "<") {
      const end = svg.indexOf("<", position), next = end < 0 ? svg.length : end;
      const value = svg.slice(position, next);
      entities(value);
      if (value.includes("]]>")) fail("XML 텍스트에 잘못된 종료 문자가 있습니다.");
      if (!stack.length && value.trim()) fail("SVG 바깥에 텍스트가 있습니다.");
      position = next;
      continue;
    }
    let end = position + 1, quote = null;
    for (; end < svg.length; end++) {
      const character = svg[end];
      if (quote) { if (character === quote) quote = null; }
      else if (character === "\"" || character === "'") quote = character;
      else if (character === ">") break;
    }
    if (end === svg.length) fail("XML 태그가 닫히지 않았습니다.");
    const token = svg.slice(position, end + 1);
    position = end + 1;
    const closing = /^<\/([A-Za-z][\w.-]*)\s*>$/.exec(token);
    if (closing) { if (stack.pop() !== closing[1]) fail("XML 시작·종료 태그가 일치하지 않습니다."); continue; }
    const opening = /^<([A-Za-z][\w.-]*)([\s\S]*?)(\/?)>$/.exec(token);
    if (!opening || !tags.has(opening[1])) fail("지원하지 않는 SVG 태그·DTD·스크립트가 있습니다.");
    const name = opening[1], attributes = opening[2], seen = new Set();
    if (!stack.length) { if (++roots !== 1 || name !== "svg") fail("SVG 루트는 하나여야 합니다."); }
    const matches = /\s+([A-Za-z_][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/gy;
    let offset = 0;
    while (offset < attributes.length && attributes.slice(offset).trim()) {
      matches.lastIndex = offset;
      const match = matches.exec(attributes);
      if (!match) fail("SVG 속성은 따옴표로 감싸고 공백으로 구분하세요.");
      const key = match[1], value = match[2] === undefined ? match[3] : match[2];
      if (seen.has(key)) fail("중복된 SVG 속성이 있습니다.");
      seen.add(key); entities(value);
      if (value.includes("<")) fail("SVG 속성의 < 문자를 이스케이프하세요.");
      if (/^on/i.test(key) || key === "href" || key === "xlink:href" || key === "style" || /url\(\s*['"]?(?!#)/i.test(value)) fail("SVG 실행 코드·외부 자원은 지원하지 않습니다.");
      if (name === "svg" && key === "xmlns" && value !== "http://www.w3.org/2000/svg") fail("SVG namespace가 올바르지 않습니다.");
      if (/^(?:x|y|x1|x2|y1|y2|cx|cy|r|rx|width|height|font-size|stroke-width|opacity)$/.test(key) && !Number.isFinite(Number(value))) fail("SVG 좌표·크기는 유한한 수여야 합니다.");
      offset = matches.lastIndex;
    }
    if (name === "svg" && (!seen.has("xmlns") || !seen.has("viewBox"))) fail("SVG namespace와 viewBox가 필요합니다.");
    found.add(name);
    if (!opening[3]) stack.push(name);
  }
  if (stack.length || roots !== 1 || !found.has("title") || !found.has("desc")) fail("완성된 SVG와 title·desc가 필요합니다.");
  return svg;
}

module.exports = { LIMITS, validateData, assertValidData, deriveData, assertSvg };
