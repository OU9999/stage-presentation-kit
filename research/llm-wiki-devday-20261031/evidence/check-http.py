from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import quote
from urllib.request import urlopen
import json
import re

root = Path('presentations/llm-wiki')
paths = sorted(p for p in root.rglob('*') if p.is_file())


def check(path):
    relative = path.relative_to(root).as_posix()
    try:
        with urlopen('http://127.0.0.1:4320/llm-wiki/' + quote(relative), timeout=15) as response:
            data = response.read()
            return {
                'path': relative,
                'status': response.status,
                'bytes': len(data),
                'matches_local': data == path.read_bytes() if path.suffix != '.html' else None,
                'youtube_url': bool(re.search(rb'https?://(?:www\.)?(?:youtube\.com|youtu\.be)', data)),
            }
    except Exception as error:
        return {'path': relative, 'error': str(error)}


with ThreadPoolExecutor(max_workers=6) as pool:
    rows = list(pool.map(check, paths))
out = Path('research/llm-wiki-devday-20261031/evidence/http.json')
out.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'files': len(rows), 'issues': [r for r in rows if r.get('status') != 200 or r.get('matches_local') is False or r.get('youtube_url')]}, ensure_ascii=False))
