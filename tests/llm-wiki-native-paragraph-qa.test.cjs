'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {nativeParagraphChecks}=require('../scripts/llm-wiki-keynote-qa.cjs');
const contract=require('../talks/llm-wiki/qa/keynote-current.json').nativeParagraphs.find(p=>p.id==='selection-quote-meaning-row');
const before=require('../research/llm-wiki-keynote-reset-20261113/main-04/read-390/reading-metrics.json').supportDocuments.find(d=>d.sourcePath===contract.path);
const status=checks=>checks.some(c=>c.status==='contract-invalid')?'contract-invalid':checks.some(c=>c.status==='regression')?'regression':'pass';
// A synthetic complete-row case tests checker behavior; it is not an observed after capture.
const fixedQuote=structuredClone(before.paragraphs.find(p=>p.section===contract.section&&p.isQuote));
fixedQuote.lines[1].text='스터디의 진행안을 만들고 싶어서';
fixedQuote.lines[2].text='이 메모를 골랐다.’';
const after={sourcePath:contract.path,paragraphs:[fixedQuote]};
test('frozen main-04 actual quote reproduces the predicate tail while a complete synthetic meaning row passes',()=>{
 const old=nativeParagraphChecks(before,contract);assert.equal(status(old),'regression');assert.ok(old.filter(c=>c.id!=='meaning-row').every(c=>c.status==='pass'));assert.equal(old.find(c=>c.id==='meaning-row').status,'regression');
 const current=nativeParagraphChecks(after,contract);assert.equal(status(current),'pass');assert.equal(current.find(c=>c.id==='meaning-row').status,'pass');
});
test('missing, duplicate, wrong-section or incomplete exact native paragraph glyph observations cannot pass',()=>{
 for(const mutate of [d=>delete d.sourcePath,d=>delete d.paragraphs,d=>d.paragraphs.push(structuredClone(d.paragraphs[0])),d=>d.paragraphs[0].section='다른-유효-절',d=>d.paragraphs[0].isQuote=false,d=>d.paragraphs[0].text=d.paragraphs[0].text.replace('골랐다','썼다'),d=>delete d.paragraphs[0].fontSize,d=>delete d.paragraphs[0].wordBreak,d=>delete d.paragraphs[0].lines,d=>d.paragraphs[0].lines.pop(),d=>delete d.paragraphs[0].lines[0].x]){const d=structuredClone(after);mutate(d);assert.equal(status(nativeParagraphChecks(d,contract)),'contract-invalid');}
});
test('shrinking the quote or splitting the same complete phrase across measured rows remains a regression',()=>{
 for(const mutate of [n=>n.fontSize='16px',n=>n.wordBreak='normal',n=>{const last=n.lines.at(-1);n.lines.splice(-1,1,{...last,text:'이 메모를',width:70},{...last,text:'골랐다.’',y:last.y+34.2,width:54});}]){const d=structuredClone(after);mutate(d.paragraphs[0]);assert.equal(status(nativeParagraphChecks(d,contract)),'regression');}
});
