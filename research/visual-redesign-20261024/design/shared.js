(function () {
  "use strict";
  var colors = {bg:"#080808",text:"#f6f6f4",muted:"#939391",line:"#292929",blue:"#24a8ff",green:"#69cf82",purple:"#a080ff",orange:"#ff7a3d"};
  function el(tag,className,text) { var node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=String(text);return node; }
  function svg(tag,attrs) {var node=document.createElementNS("http://www.w3.org/2000/svg",tag);Object.keys(attrs||{}).forEach(function(key){node.setAttribute(key,String(attrs[key]));});return node;}
  function svgText(x,y,value,opts) {opts=opts||{};var node=svg("text",{x:x,y:y,"font-size":opts.size||24,fill:opts.fill||colors.text,"text-anchor":opts.anchor||"start"});node.textContent=String(value);return node;}
  function rootSvg(width,height,label) {var node=svg("svg",{viewBox:"0 0 "+width+" "+height,role:"img","aria-label":label});var title=svg("title");title.textContent=label;node.append(title);return node;}
  function format(value,unit) {if(value===null||value===undefined||!Number.isFinite(Number(value)))return "–";return Number(value).toLocaleString("en-US",{maximumFractionDigits:1})+(unit||"");}
  function normalizeSeries(v) {if(Array.isArray(v.series))return v.series.map(function(s,index){return{label:s.label||"계열 "+(index+1),values:(s.values||[]).slice()};});if(Array.isArray(v.numerators))return[{label:v.label||"값",values:v.numerators.map(function(n,index){var d=(v.denominators||[])[index];return n===null||!Number.isFinite(n)||!Number.isFinite(d)||d===0?null:n*100/d;})}];return[{label:v.label||"값",values:(v.values||[]).slice()}];}
  function focusIndices(v,count) {var raw=Array.isArray(v.focus)?v.focus:v.focus===undefined?(v.emphasis==="focus"?[count-1]:[]):[v.focus];return raw.filter(function(index){return Number.isInteger(index)&&index>=0&&index<count;});}
  window.VisualDesign={colors:colors,el:el,svg:svg,svgText:svgText,rootSvg:rootSvg,format:format,normalizeSeries:normalizeSeries,focusIndices:focusIndices};
})();
