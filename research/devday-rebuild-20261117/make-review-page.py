from pathlib import Path
import json, sys

base = Path(__file__).resolve().parent
capture = sys.argv[1]
slides = [int(n) for n in sys.argv[2].split(',')] if len(sys.argv) > 2 else [1, 2, 3, 4]
deck = sys.argv[3] if len(sys.argv) > 3 else 'prototypes/site/first-look/'
assert len(slides) == 4 and '..' not in capture
scenes = [
    ('큰 타이포', 'XkKdbPhIvbY', 1200, 3),
    ('작업창의 비교', 'XkKdbPhIvbY', 90, 5),
    ('자료와 인용', 'Fls_onRviPM', 1440, 15),
    ('실제 결과물', 'Fls_onRviPM', 1500, 13),
]
data = []
for slide, (label, video, second, previous) in zip(slides, scenes):
    for width in [1920, 1280]:
        assert (base / capture / f'present-{width}/slide-{slide:02}.png').is_file()
    data.append(dict(label=label, slide=slide,
                     reference=f'../devday-fidelity-20261116/evidence/official-{video}-{second}.png',
                     video=f'https://www.youtube.com/watch?v={video}&t={second}s',
                     previous=f'../devday-fidelity-20261116/main-04/present-1920/slide-{previous:02}.png'))
html = '''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>DevDay · 실제 화면 대조</title><style>
*{box-sizing:border-box}body{margin:0;background:#0c0c0c;color:#f5f4f0;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo",sans-serif;word-break:keep-all}main{max-width:1900px;margin:auto;padding:42px 30px}h1{font-size:40px;font-weight:450;letter-spacing:-.045em;margin:12px 0 20px}p{color:#b8b7af;line-height:1.65}a{color:inherit;text-underline-offset:4px}nav{display:flex;gap:8px;flex-wrap:wrap;margin:30px 0 22px}button,select{font:inherit;background:#191919;color:#eee;border:1px solid #3c3c38;border-radius:5px;padding:10px 14px}button{cursor:pointer}button[aria-pressed=true]{background:#eeeae1;color:#181818}select{margin-left:auto}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}figure{margin:0;min-width:0}figcaption{font-size:14px;margin-bottom:12px;color:#c8c5bc}figure img{display:block;width:100%;aspect-ratio:16/9;object-fit:contain;background:#080808}footer{margin-top:26px;display:flex;gap:22px;flex-wrap:wrap;font-size:15px}.note{font-size:13px;margin-top:24px;max-width:1000px}@media(max-width:1050px){.grid{grid-template-columns:1fr}main{padding:28px 18px}h1{font-size:32px}}
</style><main><p>OPENAI DEVDAY · VISUAL COMPARISON</p><h1>원본 옆에서 보는 실제 화면</h1><p>원본, 반려된 이전본, 새로 렌더한 시안을 같은 자리에서 비교합니다.</p>
<nav id="tabs"><select id="width" aria-label="발표 화면 크기"><option value="1920">1920 × 1080</option><option value="1280">1280 × 720</option></select></nav>
<section class="grid"><figure><figcaption>참고 원본 · 방송 프레임</figcaption><a id="referenceLink"><img id="reference" alt="OpenAI DevDay 참고 화면"></a></figure><figure><figcaption>반려된 이전본 · main04</figcaption><a id="previousLink"><img id="previous" alt="반려된 이전 발표 화면"></a></figure><figure><figcaption id="currentCaption"></figcaption><a id="currentLink"><img id="current" alt="새 입력으로 렌더한 실제 화면"></a></figure></section>
<footer><a id="deck">현재 입력 미리보기 ↗</a><a id="video">원본 영상 ↗</a><a href="RESULT.md">변경과 현재 판정</a></footer><p class="note">이미지를 누르면 원래 크기로 볼 수 있습니다. 원본은 무대·발표자가 포함된 방송 캡처이며 공식 폰트나 제작값을 추정한 자료가 아닙니다. 시안 이미지는 표시한 캡처 시점으로 고정되어 있습니다.</p></main>
<script>const data=__DATA__,capture=__CAPTURE__,deck=__DECK__;let selected=0;const el=id=>document.getElementById(id);data.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s.label;b.onclick=()=>{selected=i;render()};el('tabs').insertBefore(b,el('width'))});function set(id,url){el(id).src=url;el(id+'Link').href=url}function render(){const s=data[selected],w=el('width').value;set('reference',s.reference);set('previous',s.previous);set('current',capture+'/present-'+w+'/slide-'+String(s.slide).padStart(2,'0')+'.png');el('currentCaption').textContent='실제 렌더 시안 · '+capture;el('deck').href=deck+'#'+s.slide;el('video').href=s.video;[...el('tabs').querySelectorAll('button')].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)))}el('width').onchange=render;render();</script></html>'''
html = html.replace('__DATA__', json.dumps(data, ensure_ascii=False)).replace('__CAPTURE__', json.dumps(capture)).replace('__DECK__', json.dumps(deck))
(base / 'index.html').write_text(html)
print({'page': str(base / 'index.html'), 'capture': capture, 'slides': slides})
