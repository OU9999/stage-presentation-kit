'use strict';

function makeDeck({ id, topic, theme }) {
  const image = { src: 'assets/topic.jpg', alt: `${topic} 현장`, fit: 'cover', focalPoint: '40% 35%' };
  const items = count => Array.from({ length: count }, (_, index) => ({ ...image, label: `${topic} ${index + 1}`, caption: `관찰 ${index + 1}` }));
  return {
    id, title: `${topic} 발표`, speaker: `${topic} 발표자`, date: '2027. 02. 01.', footer: `${topic} 기록`, theme,
    slides: [
      { layout: 'cover', align: 'center', title: [topic, '다음 장면'], subtitle: '함께 관찰합니다.', notes: '주제를 소개합니다.' },
      { layout: 'statement', align: 'center', title: ['관찰이', '이해를 바꿉니다.'], tone: 'orange', highlight: '이해를 바꿉니다.' },
      { layout: 'section', title: topic, surface: 'butter', number: '01' },
      { layout: 'compare', title: `${topic} 비교`, left: { label: '이전', points: ['조건 A', '조건 B'] }, right: { label: '이후', points: ['결과 A', '결과 B'] } },
      { layout: 'metric', value: '73', unit: '%', label: '한 가지 변화', source: '측정 자료', tone: 'green' },
      { layout: 'image', title: `${topic} 사진`, ...image, caption: '관찰한 장면' },
      { layout: 'demo', title: `${topic} 시연`, ...image, steps: ['조건 선택', '실행', '결과 확인'], url: 'https://example.com/demo' },
      { layout: 'quote', quote: '관찰은 질문에서 시작됩니다.', attribution: '발표자', support: '양식 예시' },
      { layout: 'steps', title: '다음 행동', steps: [{ title: '준비', description: '조건을 정합니다.' }, { title: '실행', description: '함께 확인합니다.' }, { title: '기록', description: '다음으로 연결합니다.' }] },
      { layout: 'closing', align: 'center', title: '다음 장면으로', takeaway: '한 가지 질문을 남깁니다.', action: '질문을 받습니다.' },
      { layout: 'chart', title: '같은 기준의 비교', chart: { title: '소요 시간', max: 200, unit: 'ms', rows: [{ label: 'A', value: 47 }, { label: 'B', value: 136, highlight: true }] }, source: '양식용 가상 자료' },
      { layout: 'media', ...image, zoom: 1.5, caption: `${topic} 전체 장면` },
      { layout: 'gallery', variant: 'portraits', title: `${topic} 사람들`, items: items(6), source: '사진 크레딧' },
      { layout: 'mosaic', title: `${topic} 결과`, items: [2, 1, 1, 1, 1, 2].map(span => ({ ...image, span })), source: '자체 제작' },
      { layout: 'results', title: `${topic}의 가능성`, items: items(4), source: '결과 자료' },
      { layout: 'categories', title: '서로 다른 역할', items: ['blue', 'green', 'orange', 'purple'].map((tone, index) => ({ symbol: String(index + 1), label: `${topic} 역할 ${index + 1}`, tone, description: '설명을 함께 읽습니다.' })) },
    ],
  };
}

function clone(value) { return JSON.parse(JSON.stringify(value)); }

function singleSlide(slide) {
  return { id: 'input-contract', title: '입력 계약', slides: [slide] };
}

module.exports = {
  makeDeck, clone, singleSlide,
  normalDecks: [
    makeDeck({ id: 'water-field-notes', topic: '도시 물길', theme: 'paper' }),
    makeDeck({ id: 'platform-release', topic: '릴리스 운영', theme: 'midnight' }),
  ],
};
