(function(){
'use strict';
const corpus=window.TypeLayoutCorpus,cases=corpus.slides.concat(corpus.counterexamples),surface=document.querySelector('#surface'),selector=document.querySelector('#case');
function el(tag,name,text){const n=document.createElement(tag);if(name)n.className=name;if(text!==undefined)n.textContent=String(text);return n;}
function label(s){return Array.isArray(s.title)?s.title.join(' '):s.title;}
cases.forEach((s,i)=>{const o=el('option','',(i+1)+' · '+label(s));o.value=i;selector.append(o);});
function render(index){
const slide=cases[index],stage=el('article','editorial-stage'),copy=el('header','editorial-copy'),title=el('h1','claim');stage.dataset.case=slide.id;if(slide.visual&&slide.visual.kind==="flow")stage.classList.add("is-flow");
if(slide.layout==='cover'){stage.classList.add('is-cover');slide.title.forEach(t=>title.append(el('span','',t)));}else title.textContent=label(slide);
title.contentEditable='true';title.setAttribute('aria-label','제목 직접 편집');copy.append(title);
if(slide.subtitle){const p=el('p','context',slide.subtitle);p.contentEditable='true';p.setAttribute('aria-label','설명 직접 편집');copy.append(p);}
if(slide.body){const p=el('p','body-copy',slide.body);p.contentEditable='true';copy.append(p);stage.classList.add('is-prose');}
stage.append(copy);const evidence=el('div','evidence');
if(slide.visual){const result=StageVisual.render(slide.visual);if(result.hero){const f=el('div','focus'),number=el('div','focus-number'),value=el('span','focus-value',StageVisual.format(result.hero.value));number.append(value,el('span','unit',result.hero.unit));f.append(number,el('div','focus-label',result.hero.label));evidence.append(f);}evidence.append(result.plot);const d=el('details','details');d.open=matchMedia('(max-width:760px)').matches;d.append(el('summary','','같은 자료의 상세 표'),StageVisual.tableNode(result.table));stage.append(evidence,d);}else stage.append(evidence);
const foot=el('footer','stage-footer');foot.append(el('span','','가상 자료 · 실제 성과 아님'),el('span','',String(index+1).padStart(2,'0')+' / '+String(cases.length).padStart(2,'0')));stage.append(foot);surface.replaceChildren(stage);selector.value=String(index);history.replaceState(null,'','#'+index);window.AnthropicTypeCase={index,slide};fitValue();return stage;}
function fitValue(){const n=surface.querySelector('.focus-number'),v=surface.querySelector('.focus-value');if(!n||!v)return;n.classList.remove('is-long');const u=n.querySelector('.unit'),unitWidth=u?u.getBoundingClientRect().width+parseFloat(getComputedStyle(u).marginLeft||0):0;if(v.getBoundingClientRect().width+unitWidth>n.getBoundingClientRect().width)n.classList.add('is-long');}
window.addEventListener('resize',fitValue);
selector.addEventListener('change',()=>render(Number(selector.value)));document.querySelector('#replay').addEventListener('click',()=>{const s=surface.firstElementChild;s.classList.remove('replay');void s.offsetWidth;s.classList.add('replay');});window.AnthropicTypeShow=render;render(Math.max(0,Math.min(cases.length-1,Number(location.hash.slice(1))||0)));
})();
