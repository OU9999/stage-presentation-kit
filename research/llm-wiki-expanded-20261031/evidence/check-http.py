"""Verify generated deck routes and all local HTML references against the dev server."""
import json
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote
from urllib.request import urlopen
from html.parser import HTMLParser

root = Path(__file__).resolve().parents[3]
published = root/'presentations'
base='http://127.0.0.1:4320/'
class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]
    def handle_starttag(self,tag,attrs):
        for k,v in attrs:
            if k in ('src','href') and v:
                self.links.append(v)
urls=set()
for p in (published/'llm-wiki').rglob('*.html'):
    url=base+p.relative_to(published).as_posix(); urls.add(url)
    parser=Links();parser.feed(p.read_text())
    for ref in parser.links:
        resolved=urljoin(url,ref); parsed=urlparse(resolved)
        if parsed.netloc=='127.0.0.1:4320' and parsed.path.startswith(('/llm-wiki/','/_runtime/')):
            urls.add(resolved.split('#',1)[0])
for p in (published/'llm-wiki'/'assets').rglob('*'):
    if p.is_file(): urls.add(base+p.relative_to(published).as_posix())
checks=[]
for url in sorted(urls):
    with urlopen(url) as response:
        data=response.read(); status=response.status
    local=published/unquote(urlparse(url).path.lstrip('/'))
    match=None if local.suffix=='.html' else data==local.read_bytes()
    checks.append({'url':url,'status':status,'localMatch':match})
assert all(c['status']==200 and c['localMatch'] is not False for c in checks)
out={'checks':checks,'checked':len(checks),'failed':0}
(Path(__file__).parent/'http.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'checked':len(checks),'failed':0}))
