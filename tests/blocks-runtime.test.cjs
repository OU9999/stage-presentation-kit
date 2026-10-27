'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const model = require('../deck-model.js');
const {parseDocument} = require('../scripts/markdown-document.cjs');
class Node {
  constructor(tag) { this.tagName=tag;this.children=[];this.attrs={};this.dataset={};this.className='';this.style={};this.classList={add:name=>{this.className+=' '+name;}}; }
  append(node) { if(node.tagName==='#fragment') this.children.push(...node.children);else this.children.push(node); }
  setAttribute(key,value){this.attrs[key]=value;}
  addEventListener(){}
  get textContent(){return this.value||this.children.map(n=>n.textContent).join('');}
}
const context={window:{},document:{createElement:tag=>new Node(tag),createTextNode:value=>Object.assign(new Node('#text'),{value}),createDocumentFragment:()=>new Node('#fragment')}};
vm.runInNewContext(fs.readFileSync(require.resolve('../blocks.js'),'utf8'),context);
const blocks=context.window.StageBlocks;
const all=node=>[node,...node.children.flatMap(all)];
const source='# **원고**와 링크\n\n본문 *강조*와 [자료](https://example.com).\n\n```js\na < b\n---\n```\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n![설명](image.png)';
test('compiled semantic Markdown validates and renders without dropping content or duplicating the promoted heading',()=>{
 const deck=parseDocument(source,{sourcePath:'talks/demo/slides.md',id:'demo'});const before=structuredClone(deck);
 assert.deepEqual(model.validateDeck(deck),[]);
 const slide=deck.slides[0];const heading=blocks.renderNode(slide.heading);const body=blocks.renderNodes(slide.blocks);
 assert.equal(heading.textContent,'원고와 링크');assert.equal(all(heading).filter(n=>n.tagName==='strong').length,1);
 assert.ok(!body.textContent.includes('원고와 링크'));assert.ok(body.textContent.includes('a < b\n---\n'));
 assert.equal(all(body).filter(n=>n.tagName==='table').length,1);assert.equal(all(body).find(n=>n.tagName==='img').attrs.alt,'설명');
 assert.ok(all(body).filter(n=>n.className.includes('blocks-scroll')).every(n=>n.tabIndex===0));assert.deepEqual(deck,before);
});
test('overview and presenter copies retain semantics and source positions without interactive links or scroll focus',()=>{
 const deck=parseDocument(source,{id:'demo'});const body=blocks.renderNodes(deck.slides[0].blocks,{preview:true});
 assert.ok(!all(body).some(n=>n.tagName==='a'||n.attrs.id));assert.ok(all(body).filter(n=>n.className.includes('blocks-scroll')).every(n=>n.tabIndex===-1));
 assert.ok(all(body).some(n=>Number(n.dataset.sourceLine)>1));
});
test('unknown elements, script URLs, event attributes and malformed trees are diagnosed while input stays intact',()=>{
 for(const node of [
 {type:'element',tag:'script',children:[]},
 {type:'element',tag:'a',attrs:{href:'javascript:alert(1)'},children:[]},
 {type:'element',tag:'a',attrs:{href:'java\nscript:alert(1)'},children:[]},
 {type:'element',tag:'img',attrs:{src:'x',onerror:'alert(1)'},children:[]},
 {type:'element',tag:'p',children:'lost'},
 {type:'text',value:4}
 ]) {const before=structuredClone(node);assert.ok(model.validateBlocks([node],'blocks',0).length);assert.deepEqual(node,before);}
 const cycle={type:'element',tag:'p',children:[]};cycle.children.push(cycle);assert.ok(model.validateBlocks([cycle],'blocks',0).length);
});
test('renderer refuses executable URLs even outside the validated player path',()=>{
 const node={type:'element',tag:'a',attrs:{href:'javascript:alert(1)',onclick:'bad'},children:[{type:'text',value:'safe text'}]};
 const el=blocks.renderNode(node);assert.equal(el.textContent,'safe text');assert.equal(el.attrs.href,undefined);assert.equal(el.attrs.onclick,undefined);
});
